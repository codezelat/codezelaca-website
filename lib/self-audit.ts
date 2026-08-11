import { auditCategories, auditQuestions } from "@/data/self-audit";
import type { AuditRating, CategoryResult, StoredAudit } from "@/types/self-audit";

export const SELF_AUDIT_STORAGE_KEY = "cca-personal-skills-self-audit-v1";

export function createEmptyAudit(now = new Date()): StoredAudit {
  return {
    version: 1,
    phase: "intro",
    context: null,
    questionIndex: 0,
    answers: {},
    completedAt: null,
    selectedSkillId: null,
    targetDate: null,
    previous: null,
    updatedAt: now.toISOString(),
  };
}

export function isAuditRating(value: unknown): value is AuditRating {
  return value === "not-yet" || value === 1 || value === 2 || value === 3 || value === 4 || value === 5;
}

export function parseStoredAudit(value: string | null): StoredAudit | null {
  if (!value) return null;

  try {
    const parsed = JSON.parse(value) as Partial<StoredAudit>;
    if (parsed.version !== 1 || typeof parsed.updatedAt !== "string" || !parsed.answers || typeof parsed.answers !== "object") return null;

    const answers = Object.fromEntries(
      Object.entries(parsed.answers).filter(([id, rating]) => auditQuestions.some((question) => question.id === id) && isAuditRating(rating)),
    ) as Record<string, AuditRating>;
    const questionIndex = Math.min(Math.max(Number(parsed.questionIndex) || 0, 0), auditQuestions.length - 1);
    const validPhases = ["intro", "context", "assessment", "results"];

    return {
      ...createEmptyAudit(new Date(parsed.updatedAt)),
      ...parsed,
      phase: validPhases.includes(parsed.phase ?? "") ? parsed.phase as StoredAudit["phase"] : "intro",
      questionIndex,
      answers,
      context: typeof parsed.context === "string" ? parsed.context : null,
      completedAt: typeof parsed.completedAt === "string" ? parsed.completedAt : null,
      selectedSkillId: typeof parsed.selectedSkillId === "string" ? parsed.selectedSkillId : null,
      targetDate: typeof parsed.targetDate === "string" ? parsed.targetDate : null,
      previous: parsed.previous && typeof parsed.previous.completedAt === "string" && parsed.previous.answers
        ? {
            completedAt: parsed.previous.completedAt,
            answers: Object.fromEntries(
              Object.entries(parsed.previous.answers).filter(([id, rating]) => auditQuestions.some((question) => question.id === id) && isAuditRating(rating)),
            ) as Record<string, AuditRating>,
          }
        : null,
    };
  } catch {
    return null;
  }
}

export function isAuditComplete(answers: Record<string, AuditRating>) {
  return auditQuestions.every((question) => isAuditRating(answers[question.id]));
}

export function getCategoryResults(answers: Record<string, AuditRating>): CategoryResult[] {
  return auditCategories.map((category) => {
    const categoryAnswers = category.questions.map((question) => answers[question.id]).filter(isAuditRating);
    const numericAnswers = categoryAnswers.filter((answer): answer is Exclude<AuditRating, "not-yet"> => answer !== "not-yet");
    const average = numericAnswers.length
      ? numericAnswers.reduce((total, answer) => total + answer, 0) / numericAnswers.length
      : null;

    return {
      id: category.id,
      title: category.title,
      average,
      answered: categoryAnswers.length,
      exposureNeeded: categoryAnswers.filter((answer) => answer === "not-yet").length,
    };
  });
}

export function getRankedSkills(answers: Record<string, AuditRating>) {
  const rated = auditQuestions
    .map((question, order) => ({ ...question, order, rating: answers[question.id] }))
    .filter((question): question is typeof question & { rating: Exclude<AuditRating, "not-yet"> } =>
      typeof question.rating === "number",
    );

  return {
    strengths: [...rated].sort((a, b) => b.rating - a.rating || a.order - b.order).slice(0, 3),
    growthAreas: [...rated].sort((a, b) => a.rating - b.rating || a.order - b.order).slice(0, 3),
    exposureAreas: auditQuestions.filter((question) => answers[question.id] === "not-yet"),
  };
}

export function getCurrentCategory(questionIndex: number) {
  const question = auditQuestions[questionIndex];
  return auditCategories.find((category) => category.id === question.categoryId) ?? auditCategories[0];
}

export function getReviewDate(completedAt: string) {
  const date = new Date(completedAt);
  date.setDate(date.getDate() + 30);
  return date;
}

export function formatAuditDate(value: string | Date) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(new Date(value));
}

export function describeCategory(average: number | null) {
  if (average === null) return "Needs practical exposure";
  if (average < 1.5) return "Needs support";
  if (average < 2.5) return "Building the basics";
  if (average < 3.5) return "Developing with guidance";
  if (average < 4.5) return "Working independently";
  return "Demonstrating confidently";
}
