"use client";

import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Copy,
  LockKeyhole,
  Printer,
  RefreshCcw,
  RotateCcw,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import { auditCategories, auditQuestions, careerContexts, ratingOptions } from "@/data/self-audit";
import {
  createEmptyAudit,
  describeCategory,
  formatAuditDate,
  getCategoryResults,
  getCurrentCategory,
  getRankedSkills,
  getReviewDate,
  isAuditComplete,
  parseStoredAudit,
  SELF_AUDIT_STORAGE_KEY,
} from "@/lib/self-audit";
import { cn } from "@/lib/utils";
import type { AuditRating, StoredAudit } from "@/types/self-audit";

function plusDays(date: Date, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result.toISOString().slice(0, 10);
}

function categoryNumberForQuestion(index: number) {
  return auditCategories.findIndex((category) => category.id === auditQuestions[index].categoryId);
}

function persistAudit(audit: StoredAudit) {
  try {
    window.localStorage.setItem(SELF_AUDIT_STORAGE_KEY, JSON.stringify(audit));
  } catch {
    // The assessment remains usable when browser storage is unavailable.
  }
}

async function copyTextToClipboard(text: string) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // Use the browser fallback below when clipboard permission is unavailable.
    }
  }

  const textarea = document.createElement("textarea");
  const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  textarea.style.pointerEvents = "none";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  textarea.setSelectionRange(0, textarea.value.length);

  try {
    if (!document.execCommand("copy")) throw new Error("Copy command was rejected");
  } finally {
    textarea.remove();
    previouslyFocused?.focus();
  }
}

export function SelfAuditExperience() {
  const [audit, setAudit] = useState<StoredAudit>(() => createEmptyAudit());
  const [hydrated, setHydrated] = useState(false);
  const [notice, setNotice] = useState("");
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle");
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const phaseHeadingRef = useRef<HTMLHeadingElement>(null);
  const copyResetTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const restoreTimer = window.setTimeout(() => {
      const restored = parseStoredAudit(window.localStorage.getItem(SELF_AUDIT_STORAGE_KEY));
      if (restored) {
        const safeRestored = restored.phase === "results" && !isAuditComplete(restored.answers)
          ? { ...restored, phase: "assessment" as const }
          : restored;
        setAudit(safeRestored);
      }
      setHydrated(true);
    }, 0);

    return () => window.clearTimeout(restoreTimer);
  }, []);

  useEffect(() => () => {
    if (copyResetTimerRef.current) window.clearTimeout(copyResetTimerRef.current);
  }, []);

  const commit = (update: StoredAudit | ((current: StoredAudit) => StoredAudit), message = "Progress saved on this device") => {
    setAudit((current) => {
      const nextValue = typeof update === "function" ? update(current) : update;
      const next = { ...nextValue, updatedAt: new Date().toISOString() };
      persistAudit(next);
      return next;
    });
    setNotice(message);
  };

  const focusPhase = () => window.requestAnimationFrame(() => phaseHeadingRef.current?.focus());
  const hasSavedProgress = hydrated && (audit.phase !== "intro" || Object.keys(audit.answers).length > 0);
  const currentQuestion = auditQuestions[audit.questionIndex];
  const currentCategory = getCurrentCategory(audit.questionIndex);
  const currentCategoryIndex = categoryNumberForQuestion(audit.questionIndex);
  const categoryResults = useMemo(() => getCategoryResults(audit.answers), [audit.answers]);
  const rankedSkills = useMemo(() => getRankedSkills(audit.answers), [audit.answers]);
  const selectedSkill = auditQuestions.find((question) => question.id === audit.selectedSkillId) ?? null;
  const progress = Math.round((Object.keys(audit.answers).length / auditQuestions.length) * 100);

  const beginNewAudit = () => {
    const now = new Date();
    const previous = audit.completedAt && isAuditComplete(audit.answers)
      ? { answers: audit.answers, completedAt: audit.completedAt }
      : audit.previous;
    commit({ ...createEmptyAudit(now), phase: "context", previous }, "New audit started");
    setShowResetConfirm(false);
    focusPhase();
  };

  const continueSavedAudit = () => {
    commit((current) => ({
      ...current,
      phase: current.completedAt && isAuditComplete(current.answers) ? "results" : current.context ? "assessment" : "context",
    }), "Saved audit restored");
    focusPhase();
  };

  const selectContext = (context: string) => commit((current) => ({ ...current, context }), "Career context saved");

  const beginQuestions = () => {
    if (!audit.context) return;
    commit((current) => ({ ...current, phase: "assessment" }), "Assessment started");
    focusPhase();
  };

  const chooseRating = (rating: AuditRating) => {
    commit((current) => ({
      ...current,
      answers: { ...current.answers, [currentQuestion.id]: rating },
    }));
  };

  const moveBack = () => {
    if (audit.questionIndex === 0) {
      commit((current) => ({ ...current, phase: "context" }), "Progress saved");
    } else {
      commit((current) => ({ ...current, questionIndex: current.questionIndex - 1 }), "Progress saved");
    }
    focusPhase();
  };

  const moveNext = () => {
    if (!audit.answers[currentQuestion.id]) return;

    if (audit.questionIndex < auditQuestions.length - 1) {
      commit((current) => ({ ...current, questionIndex: current.questionIndex + 1 }));
      focusPhase();
      return;
    }

    if (!isAuditComplete(audit.answers)) return;
    const completedAt = new Date().toISOString();
    commit((current) => ({
      ...current,
      phase: "results",
      completedAt,
      selectedSkillId: getRankedSkills(current.answers).growthAreas[0]?.id ?? null,
      targetDate: plusDays(new Date(completedAt), 30),
    }), "Audit complete and saved on this device");
    focusPhase();
  };

  const saveAndExit = () => {
    commit((current) => ({ ...current, phase: "intro" }), "Saved. You can continue on this device.");
    focusPhase();
  };

  const selectPriority = (skillId: string) => commit((current) => ({ ...current, selectedSkillId: skillId }), "Action plan updated");

  const copySummary = async () => {
    const strengths = rankedSkills.strengths.map((item) => item.skill).join(", ") || "More practical evidence needed";
    const growth = rankedSkills.growthAreas.map((item) => item.skill).join(", ") || "More responses needed";
    const profile = categoryResults.map((result) => `${result.title}: ${describeCategory(result.average)}`).join("\n");
    const plan = selectedSkill
      ? `\n30-day focus: ${selectedSkill.skill}\nOutcome: ${selectedSkill.actionPlan.outcome}\nEvidence: ${selectedSkill.actionPlan.evidence}`
      : "";
    const summary = `CCA Personal Skills Self-Audit\nCareer context: ${audit.context ?? "Not selected"}\nCompleted: ${audit.completedAt ? formatAuditDate(audit.completedAt) : "Not completed"}\n\nSkill profile\n${profile}\n\nStrengths: ${strengths}\nGrowth areas: ${growth}${plan}`;

    try {
      await copyTextToClipboard(summary);
      setCopyStatus("copied");
      setNotice("Summary copied to your clipboard");
    } catch {
      setCopyStatus("error");
      setNotice("Copy was unavailable. Please try again or use the PDF option.");
    }

    if (copyResetTimerRef.current) window.clearTimeout(copyResetTimerRef.current);
    copyResetTimerRef.current = window.setTimeout(() => setCopyStatus("idle"), 2600);
  };

  const clearAudit = () => {
    try {
      window.localStorage.removeItem(SELF_AUDIT_STORAGE_KEY);
    } catch {
      // Reset the in-memory experience even if storage is unavailable.
    }
    setAudit(createEmptyAudit());
    setShowResetConfirm(false);
    setNotice("Saved audit removed from this device");
    focusPhase();
  };

  const reviewDate = audit.completedAt ? getReviewDate(audit.completedAt) : null;
  const canRetake = reviewDate ? new Date() >= reviewDate : false;

  return (
    <section className="relative isolate overflow-hidden bg-white px-5 pb-20 pt-[168px] sm:pb-28 lg:pt-[190px]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden print:hidden">
        <div className="absolute -left-[320px] -top-[300px] size-[690px] rounded-full border-[80px] border-primary-deep/[0.045]" />
        <div className="absolute -right-[340px] top-[410px] size-[720px] rounded-full border-[90px] border-primary-bright/[0.045]" />
        <div className="absolute inset-x-0 top-0 h-[650px] bg-[radial-gradient(circle_at_50%_12%,rgba(253,242,248,.95),transparent_64%)]" />
      </div>

      <div className="mx-auto w-full max-w-[1180px]">
        <nav aria-label="Breadcrumb" className="mb-8 print:hidden">
          <ol className="flex flex-wrap items-center gap-2 font-body text-[13px] text-muted-foreground sm:text-[14px]">
            <li><Link href="/" prefetch={false} className="rounded-sm transition-colors hover:text-primary-deep">Home</Link></li>
            <li aria-hidden="true" className="text-primary/55">/</li>
            <li aria-current="page" className="font-medium text-primary-deep">Personal Skills Self-Audit</li>
          </ol>
        </nav>

        {audit.phase === "intro" ? (
          <IntroView
            headingRef={phaseHeadingRef}
            hasSavedProgress={hasSavedProgress}
            onStart={beginNewAudit}
            onContinue={continueSavedAudit}
            onReset={() => setShowResetConfirm(true)}
            showResetConfirm={showResetConfirm}
            onCancelReset={() => setShowResetConfirm(false)}
            onConfirmReset={clearAudit}
          />
        ) : null}

        {audit.phase === "context" ? (
          <ContextView
            headingRef={phaseHeadingRef}
            selected={audit.context}
            onSelect={selectContext}
            onContinue={beginQuestions}
            onBack={saveAndExit}
          />
        ) : null}

        {audit.phase === "assessment" ? (
          <AssessmentView
            headingRef={phaseHeadingRef}
            audit={audit}
            currentCategory={currentCategory}
            currentCategoryIndex={currentCategoryIndex}
            currentQuestion={currentQuestion}
            progress={progress}
            onRate={chooseRating}
            onBack={moveBack}
            onNext={moveNext}
            onSaveExit={saveAndExit}
          />
        ) : null}

        {audit.phase === "results" ? (
          <ResultsView
            headingRef={phaseHeadingRef}
            audit={audit}
            categoryResults={categoryResults}
            rankedSkills={rankedSkills}
            selectedSkill={selectedSkill}
            reviewDate={reviewDate}
            canRetake={canRetake}
            copyStatus={copyStatus}
            onSelectPriority={selectPriority}
            onCopy={copySummary}
            onPrint={() => window.print()}
            onRetake={beginNewAudit}
            onReset={() => setShowResetConfirm(true)}
            showResetConfirm={showResetConfirm}
            onCancelReset={() => setShowResetConfirm(false)}
            onConfirmReset={clearAudit}
          />
        ) : null}

        <p aria-live="polite" className="sr-only">{notice}</p>
      </div>
    </section>
  );
}

interface HeadingRefProps {
  headingRef: React.RefObject<HTMLHeadingElement | null>;
}

function IntroView({
  headingRef,
  hasSavedProgress,
  onStart,
  onContinue,
  onReset,
  showResetConfirm,
  onCancelReset,
  onConfirmReset,
}: HeadingRefProps & {
  hasSavedProgress: boolean;
  onStart: () => void;
  onContinue: () => void;
  onReset: () => void;
  showResetConfirm: boolean;
  onCancelReset: () => void;
  onConfirmReset: () => void;
}) {
  return (
    <div className="grid items-center gap-12 lg:grid-cols-[1fr_430px] lg:gap-16">
      <div className="max-w-[720px]">
        <h1 ref={headingRef} tabIndex={-1} className="font-sans text-[44px] leading-[1.05] font-semibold tracking-[-0.045em] text-primary-deep outline-none sm:text-[60px] lg:text-[72px]">
          Personal Skills <span className="text-primary-readable">Self-Audit</span>
        </h1>
        <p className="mt-7 max-w-[690px] font-body text-[17px] leading-8 text-muted-foreground sm:text-[19px]">
          Reflect honestly on how you communicate, solve problems and prepare for work. Leave with a clear picture of your strengths and one practical 30-day plan.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button type="button" onClick={hasSavedProgress ? onContinue : onStart} className="inline-flex min-h-14 items-center justify-center gap-3 rounded-[12px] bg-primary px-7 font-sans text-[15px] font-semibold text-white shadow-[0_12px_30px_rgba(192,38,211,.2)] transition duration-300 hover:-translate-y-0.5 hover:bg-primary-bright">
            {hasSavedProgress ? "Continue your audit" : "Start your audit"}
            <ArrowRight aria-hidden="true" className="size-5" />
          </button>
          {hasSavedProgress ? (
            <button type="button" onClick={onStart} className="min-h-12 rounded-[10px] px-5 font-sans text-[14px] font-semibold text-primary-deep transition-colors hover:bg-primary-bright/5 hover:text-primary-readable">
              Start again
            </button>
          ) : null}
        </div>

        {hasSavedProgress ? (
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 font-body text-[13px] text-muted-foreground">
            <span className="inline-flex items-center gap-2"><CheckCircle2 aria-hidden="true" className="size-4 text-emerald-600" />Saved progress found</span>
            <button type="button" onClick={onReset} className="rounded-sm font-medium text-primary-deep underline decoration-primary/25 underline-offset-4 hover:text-primary-readable">Remove saved audit</button>
          </div>
        ) : null}

        {showResetConfirm ? <ResetConfirmation onCancel={onCancelReset} onConfirm={onConfirmReset} /> : null}
      </div>

      <aside aria-label="About this self-audit" className="relative overflow-hidden rounded-[26px] border border-primary-deep/10 bg-white p-7 shadow-[0_24px_65px_rgba(41,12,63,.1)] sm:p-9">
        <div aria-hidden="true" className="absolute -right-16 -top-16 size-44 rounded-full border-[24px] border-primary-bright/[0.08]" />
        <div className="relative flex size-14 items-center justify-center rounded-2xl bg-hero text-primary-deep">
          <Target aria-hidden="true" className="size-7" />
        </div>
        <h2 className="mt-7 font-sans text-[24px] leading-tight font-semibold text-primary-deep">A useful starting point, not a test</h2>
        <p className="mt-3 font-body text-[15px] leading-7 text-muted-foreground">Rate your typical behaviour over the past few months. Choose “Not yet” when you have not had a fair opportunity to practise.</p>
        <ul className="mt-7 grid gap-4 border-t border-black/8 pt-6 font-body text-[14px] text-muted-foreground">
          <li className="flex items-center gap-3"><Clock3 aria-hidden="true" className="size-5 text-primary-readable" />About 8 minutes</li>
          <li className="flex items-center gap-3"><LockKeyhole aria-hidden="true" className="size-5 text-primary-readable" />Answers stay on this device</li>
          <li className="flex items-center gap-3"><TrendingUp aria-hidden="true" className="size-5 text-primary-readable" />Practical 30-day action plan</li>
        </ul>
      </aside>
    </div>
  );
}

function ContextView({ headingRef, selected, onSelect, onContinue, onBack }: HeadingRefProps & {
  selected: string | null;
  onSelect: (context: string) => void;
  onContinue: () => void;
  onBack: () => void;
}) {
  return (
    <div className="mx-auto max-w-[820px]">
      <StepHeader eyebrow="Before you begin" title="What best describes where you are now?" description="This gives your reflection a little context. It does not change or score your answers." headingRef={headingRef} />
      <fieldset className="mt-10 grid gap-3 sm:grid-cols-2">
        <legend className="sr-only">Choose your current career context</legend>
        {careerContexts.map((context) => (
          <label key={context} className={cn("group flex min-h-[76px] cursor-pointer items-center gap-4 rounded-[16px] border bg-white px-5 py-4 shadow-[0_8px_28px_rgba(41,12,63,.045)] transition duration-200", selected === context ? "border-primary bg-hero/60 ring-2 ring-primary/10" : "border-black/10 hover:border-primary/45")}>
            <input type="radio" name="career-context" value={context} checked={selected === context} onChange={() => onSelect(context)} className="sr-only" />
            <span className={cn("flex size-10 shrink-0 items-center justify-center rounded-full border transition-colors", selected === context ? "border-primary bg-primary text-white" : "border-black/15 text-muted-foreground group-hover:border-primary/45")}>
              {selected === context ? <Check aria-hidden="true" className="size-5" /> : <BriefcaseBusiness aria-hidden="true" className="size-5" />}
            </span>
            <span className="font-sans text-[15px] font-semibold text-primary-deep">{context}</span>
          </label>
        ))}
      </fieldset>
      <div className="mt-9 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <button type="button" onClick={onBack} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[10px] px-5 font-sans text-[14px] font-semibold text-primary-deep transition-colors hover:bg-primary-bright/5"><ArrowLeft aria-hidden="true" className="size-4" />Save and exit</button>
        <button type="button" disabled={!selected} onClick={onContinue} className="inline-flex min-h-14 items-center justify-center gap-2 rounded-[11px] bg-primary px-7 font-sans text-[15px] font-semibold text-white transition duration-200 hover:bg-primary-bright disabled:cursor-not-allowed disabled:bg-black/15 disabled:text-black/45">Begin reflection<ArrowRight aria-hidden="true" className="size-5" /></button>
      </div>
    </div>
  );
}

function AssessmentView({
  headingRef,
  audit,
  currentCategory,
  currentCategoryIndex,
  currentQuestion,
  progress,
  onRate,
  onBack,
  onNext,
  onSaveExit,
}: HeadingRefProps & {
  audit: StoredAudit;
  currentCategory: (typeof auditCategories)[number];
  currentCategoryIndex: number;
  currentQuestion: (typeof auditQuestions)[number];
  progress: number;
  onRate: (rating: AuditRating) => void;
  onBack: () => void;
  onNext: () => void;
  onSaveExit: () => void;
}) {
  const selectedRating = audit.answers[currentQuestion.id];
  const questionWithinCategory = currentCategory.questions.findIndex((question) => question.id === currentQuestion.id) + 1;

  return (
    <div>
      <div className="sticky top-[118px] z-20 -mx-5 mb-5 border-y border-primary-deep/8 bg-white/92 px-5 py-3 backdrop-blur-md lg:hidden print:hidden">
        <div className="mx-auto flex max-w-[760px] items-center justify-between gap-3">
          <span className="truncate font-sans text-[13px] font-semibold text-primary-deep">{currentCategory.shortTitle}</span>
          <span className="shrink-0 font-body text-[12px] text-muted-foreground">{audit.questionIndex + 1} of {auditQuestions.length}</span>
        </div>
        <div className="mx-auto mt-2 h-1 max-w-[760px] overflow-hidden rounded-full bg-primary-deep/8"><div className="h-full rounded-full bg-primary transition-[width] duration-500" style={{ width: `${progress}%` }} /></div>
      </div>

      <div className="grid items-start gap-8 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-10">
        <aside className="sticky top-[130px] hidden rounded-[22px] border border-primary-deep/10 bg-white p-5 shadow-[0_16px_50px_rgba(41,12,63,.07)] lg:block print:hidden">
          <div className="flex items-end justify-between gap-3">
            <div><p className="font-body text-[12px] font-medium text-muted-foreground">Your progress</p><p className="mt-1 font-sans text-[22px] font-semibold text-primary-deep">{progress}%</p></div>
            <span className="font-body text-[12px] text-muted-foreground">{audit.questionIndex + 1}/{auditQuestions.length}</span>
          </div>
          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-primary-deep/8" role="progressbar" aria-label="Audit progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}><div className="h-full rounded-full bg-primary transition-[width] duration-500" style={{ width: `${progress}%` }} /></div>
          <ol className="mt-6 space-y-2">
            {auditCategories.map((category, index) => {
              const completed = index < currentCategoryIndex;
              const active = index === currentCategoryIndex;
              return (
                <li key={category.id} className={cn("flex min-h-12 items-center gap-3 rounded-[12px] px-3 py-2 font-sans text-[12px] font-semibold", active ? "bg-hero text-primary-deep" : "text-muted-foreground")} aria-current={active ? "step" : undefined}>
                  <span className={cn("flex size-7 shrink-0 items-center justify-center rounded-full border text-[11px]", completed ? "border-emerald-600 bg-emerald-50 text-emerald-700" : active ? "border-primary bg-primary text-white" : "border-black/10")}>
                    {completed ? <Check aria-hidden="true" className="size-3.5" /> : index + 1}
                  </span>
                  {category.shortTitle}
                </li>
              );
            })}
          </ol>
          <button type="button" onClick={onSaveExit} className="mt-6 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-[9px] font-sans text-[12px] font-semibold text-primary-deep transition-colors hover:bg-primary-bright/5"><LockKeyhole aria-hidden="true" className="size-3.5" />Save and exit</button>
        </aside>

        <div className="overflow-hidden rounded-[24px] border border-primary-deep/10 bg-white shadow-[0_24px_70px_rgba(41,12,63,.09)]">
          <div className="border-b border-black/8 bg-[linear-gradient(110deg,rgba(253,242,248,.85),rgba(255,255,255,.98))] px-6 py-6 sm:px-9 sm:py-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-sans text-[13px] font-semibold text-primary-readable">Section {currentCategoryIndex + 1} of {auditCategories.length}</p>
              <p className="font-body text-[12px] text-muted-foreground">Question {questionWithinCategory} of {currentCategory.questions.length}</p>
            </div>
            <h1 ref={headingRef} tabIndex={-1} className="mt-3 font-sans text-[28px] leading-tight font-semibold tracking-[-0.025em] text-primary-deep outline-none sm:text-[36px]">{currentCategory.title}</h1>
            <p className="mt-2 max-w-[690px] font-body text-[14px] leading-6 text-muted-foreground sm:text-[15px]">{currentCategory.description}</p>
          </div>

          <div className="px-6 py-7 sm:px-9 sm:py-9">
            <p className="font-body text-[13px] font-medium text-muted-foreground">Think about your typical behaviour over the past few months.</p>
            <fieldset className="mt-5">
              <legend className="font-sans text-[21px] leading-[1.45] font-semibold text-[#2f153b] sm:text-[24px]">{currentQuestion.prompt}</legend>
              <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-5">
                {ratingOptions.map((option) => {
                  const checked = selectedRating === option.value;
                  return (
                    <label key={option.value} className={cn("group flex min-h-[104px] cursor-pointer flex-col items-center justify-center rounded-[14px] border px-2 py-3 text-center transition duration-200", checked ? "border-primary bg-hero ring-2 ring-primary/10" : "border-black/10 bg-white hover:border-primary/45 hover:bg-hero/35")}>
                      <input type="radio" name={`rating-${currentQuestion.id}`} value={option.value} checked={checked} onChange={() => onRate(option.value)} className="sr-only" />
                      <span className={cn("flex size-9 items-center justify-center rounded-full font-sans text-[15px] font-semibold transition-colors", checked ? "bg-primary text-white" : "bg-primary-deep/6 text-primary-deep group-hover:bg-primary/10")}>{option.value}</span>
                      <span className="mt-2 font-body text-[11px] leading-4 text-muted-foreground">{option.short}</span>
                    </label>
                  );
                })}
              </div>
              <label className={cn("mt-3 flex min-h-[58px] cursor-pointer items-center gap-3 rounded-[14px] border px-4 py-3 transition duration-200", selectedRating === "not-yet" ? "border-primary bg-hero ring-2 ring-primary/10" : "border-black/10 hover:border-primary/45 hover:bg-hero/35")}>
                <input type="radio" name={`rating-${currentQuestion.id}`} value="not-yet" checked={selectedRating === "not-yet"} onChange={() => onRate("not-yet")} className="sr-only" />
                <span className={cn("flex size-8 shrink-0 items-center justify-center rounded-full border", selectedRating === "not-yet" ? "border-primary bg-primary text-white" : "border-black/15 text-muted-foreground")}>{selectedRating === "not-yet" ? <Check aria-hidden="true" className="size-4" /> : "-"}</span>
                <span><span className="block font-sans text-[13px] font-semibold text-primary-deep">Not yet</span><span className="block font-body text-[11px] leading-4 text-muted-foreground">I have not had a fair opportunity to practise this.</span></span>
              </label>
            </fieldset>

            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-black/8 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <button type="button" onClick={onBack} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[10px] border border-black/10 px-5 font-sans text-[14px] font-semibold text-primary-deep transition-colors hover:border-primary/30 hover:bg-hero"><ArrowLeft aria-hidden="true" className="size-4" />Back</button>
              <div className="flex flex-col gap-2 sm:items-end">
                <button type="button" disabled={!selectedRating} onClick={onNext} className="inline-flex min-h-12 min-w-[150px] items-center justify-center gap-2 rounded-[10px] bg-primary px-6 font-sans text-[14px] font-semibold text-white transition duration-200 hover:bg-primary-bright disabled:cursor-not-allowed disabled:bg-black/15 disabled:text-black/45">{audit.questionIndex === auditQuestions.length - 1 ? "See my results" : "Continue"}<ArrowRight aria-hidden="true" className="size-4" /></button>
                <button type="button" onClick={onSaveExit} className="min-h-8 rounded-sm px-1 font-body text-[12px] font-medium text-primary-deep underline decoration-primary/25 underline-offset-4 hover:text-primary-readable lg:hidden">Save and exit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResultsView({
  headingRef,
  audit,
  categoryResults,
  rankedSkills,
  selectedSkill,
  reviewDate,
  canRetake,
  copyStatus,
  onSelectPriority,
  onCopy,
  onPrint,
  onRetake,
  onReset,
  showResetConfirm,
  onCancelReset,
  onConfirmReset,
}: HeadingRefProps & {
  audit: StoredAudit;
  categoryResults: ReturnType<typeof getCategoryResults>;
  rankedSkills: ReturnType<typeof getRankedSkills>;
  selectedSkill: (typeof auditQuestions)[number] | null;
  reviewDate: Date | null;
  canRetake: boolean;
  copyStatus: "idle" | "copied" | "error";
  onSelectPriority: (skillId: string) => void;
  onCopy: () => void;
  onPrint: () => void;
  onRetake: () => void;
  onReset: () => void;
  showResetConfirm: boolean;
  onCancelReset: () => void;
  onConfirmReset: () => void;
}) {
  const previousResults = audit.previous ? getCategoryResults(audit.previous.answers) : null;

  return (
    <div className="self-audit-results mx-auto max-w-[1040px] print:max-w-none">
      <div className="grid gap-6 print:break-inside-avoid lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
        <div>
          <p className="inline-flex items-center gap-2 font-sans text-[13px] font-semibold text-primary-readable"><Sparkles aria-hidden="true" className="size-4" />Your reflection</p>
          <h1 ref={headingRef} tabIndex={-1} className="mt-3 font-sans text-[38px] leading-[1.08] font-semibold tracking-[-0.04em] text-primary-deep outline-none sm:text-[52px]">Your skills picture</h1>
          <p className="mt-4 max-w-[700px] font-body text-[15px] leading-7 text-muted-foreground sm:text-[16px]">Use this as a starting point. Your ratings show where you feel confident today and where practice can create the most useful progress.</p>
        </div>
        <div className="grid w-full grid-cols-1 gap-2 min-[420px]:grid-cols-2 print:hidden lg:w-[360px]">
          <button
            type="button"
            onClick={onCopy}
            className={cn(
              "inline-flex min-h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-[11px] border px-4 font-sans text-[12px] font-semibold shadow-sm transition duration-200 hover:-translate-y-0.5",
              copyStatus === "copied" && "border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-50",
              copyStatus === "error" && "border-red-200 bg-red-50 text-red-800 hover:bg-red-50",
              copyStatus === "idle" && "border-primary/20 bg-white text-primary-deep hover:border-primary/45 hover:bg-hero",
            )}
          >
            {copyStatus === "copied" ? <CheckCircle2 aria-hidden="true" className="size-4" /> : <Copy aria-hidden="true" className="size-4" />}
            <span aria-live="polite">{copyStatus === "copied" ? "Copied" : copyStatus === "error" ? "Try copy again" : "Copy summary"}</span>
          </button>
          <button type="button" onClick={onPrint} className="inline-flex min-h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-[11px] bg-primary-deep px-4 font-sans text-[12px] font-semibold text-white shadow-[0_8px_20px_rgba(113,11,192,.16)] transition duration-200 hover:-translate-y-0.5 hover:bg-primary"><Printer aria-hidden="true" className="size-4" />Print or save PDF</button>
        </div>
      </div>

      <section aria-labelledby="skill-profile-heading" className="mt-9 break-inside-avoid rounded-[24px] border border-primary-deep/10 bg-white p-6 shadow-[0_22px_65px_rgba(41,12,63,.08)] sm:p-9 print:shadow-none">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="skill-profile-heading" className="font-sans text-[24px] font-semibold text-primary-deep">Your skill profile</h2>
          {audit.completedAt ? <p className="font-body text-[12px] text-muted-foreground">Completed {formatAuditDate(audit.completedAt)}</p> : null}
        </div>
        <div className="mt-7 space-y-6">
          {categoryResults.map((result) => {
            const width = result.average ? `${Math.max(result.average / 5 * 100, 6)}%` : "0%";
            const previous = previousResults?.find((item) => item.id === result.id);
            const delta = previous?.average != null && result.average != null ? result.average - previous.average : null;
            return (
              <div key={result.id}>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                  <h3 className="font-sans text-[14px] font-semibold text-[#2f153b]">{result.title}</h3>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 font-body text-[11px] text-muted-foreground">
                    <span>{describeCategory(result.average)}</span>
                    {result.exposureNeeded ? <span>{result.exposureNeeded} marked Not yet</span> : null}
                    {delta !== null && Math.abs(delta) >= 0.05 ? <span className={delta > 0 ? "text-emerald-700" : "text-amber-700"}>{delta > 0 ? "+" : ""}{delta.toFixed(1)} since last audit</span> : null}
                  </div>
                </div>
                <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-primary-deep/8" role="meter" aria-label={`${result.title}: ${describeCategory(result.average)}`} aria-valuemin={0} aria-valuemax={5} aria-valuenow={result.average ?? 0}>
                  <div className="h-full rounded-full bg-[linear-gradient(90deg,var(--primary-deep),var(--primary-bright))] motion-safe:transition-[width] motion-safe:duration-700" style={{ width }} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="mt-6 grid break-inside-avoid gap-6 md:grid-cols-2">
        <ResultList title="Strengths to use" icon={<CheckCircle2 aria-hidden="true" className="size-5" />} tone="strength" items={rankedSkills.strengths.map((item) => ({ id: item.id, label: item.skill }))} empty="Complete more rated responses to identify strengths." />
        <ResultList title="Growth areas" icon={<TrendingUp aria-hidden="true" className="size-5" />} tone="growth" items={rankedSkills.growthAreas.map((item) => ({ id: item.id, label: item.skill }))} empty="Complete more rated responses to identify growth areas." />
      </div>

      {rankedSkills.exposureAreas.length ? (
        <section aria-labelledby="exposure-heading" className="mt-6 break-inside-avoid rounded-[20px] border border-amber-200 bg-amber-50/55 p-6">
          <h2 id="exposure-heading" className="font-sans text-[18px] font-semibold text-[#4a3213]">Skills to explore through practice</h2>
          <p className="mt-2 font-body text-[13px] leading-6 text-[#6f542d]">“Not yet” is not a low rating. These are useful opportunities to seek through a project, class, volunteering or work experience.</p>
          <ul className="mt-4 flex flex-wrap gap-2">{rankedSkills.exposureAreas.map((item) => <li key={item.id} className="rounded-full border border-amber-200 bg-white px-3 py-2 font-sans text-[11px] font-semibold text-[#4a3213]">{item.skill}</li>)}</ul>
        </section>
      ) : null}

      <section aria-labelledby="action-plan-heading" className="mt-8 break-inside-avoid overflow-hidden rounded-[24px] border border-primary-deep/10 bg-white shadow-[0_22px_65px_rgba(41,12,63,.08)] print:break-before-page print:shadow-none">
        <div className="bg-[linear-gradient(110deg,rgba(253,242,248,.95),rgba(255,255,255,.98))] p-6 sm:p-9">
          <p className="font-sans text-[12px] font-semibold text-primary-readable">One focused next step</p>
          <h2 id="action-plan-heading" className="mt-2 font-sans text-[27px] leading-tight font-semibold text-primary-deep sm:text-[34px]">Your 30-day action plan</h2>
          <p className="mt-3 max-w-[700px] font-body text-[14px] leading-6 text-muted-foreground">Choose one priority. Small, visible evidence is more useful than trying to improve everything at once.</p>

          <fieldset className="mt-6 grid gap-3 md:grid-cols-3 print:hidden">
            <legend className="sr-only">Choose a growth area for your action plan</legend>
            {rankedSkills.growthAreas.map((item) => {
              const checked = selectedSkill?.id === item.id;
              return (
                <label key={item.id} className={cn("flex min-h-[70px] cursor-pointer items-center gap-3 rounded-[14px] border bg-white px-4 py-3 transition", checked ? "border-primary ring-2 ring-primary/10" : "border-black/10 hover:border-primary/45")}>
                  <input type="radio" name="action-priority" checked={checked} onChange={() => onSelectPriority(item.id)} className="sr-only" />
                  <span className={cn("flex size-7 shrink-0 items-center justify-center rounded-full border", checked ? "border-primary bg-primary text-white" : "border-black/15")}>{checked ? <Check aria-hidden="true" className="size-4" /> : null}</span>
                  <span className="font-sans text-[12px] leading-5 font-semibold text-primary-deep">{item.skill}</span>
                </label>
              );
            })}
          </fieldset>
        </div>

        {selectedSkill ? (
          <div className="p-6 sm:p-9">
            <div className="flex flex-col gap-4 border-b border-black/8 pb-6 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="font-body text-[12px] font-medium text-muted-foreground">Your focus</p>
                <h3 className="mt-1 font-sans text-[21px] font-semibold text-[#2f153b]">{selectedSkill.skill}</h3>
                <p className="mt-2 font-body text-[14px] leading-6 text-muted-foreground"><strong className="font-semibold text-[#2f153b]">Outcome:</strong> {selectedSkill.actionPlan.outcome}</p>
              </div>
              {audit.targetDate ? <p className="inline-flex shrink-0 items-center gap-2 rounded-full bg-hero px-4 py-2 font-body text-[12px] font-medium text-primary-deep"><CalendarDays aria-hidden="true" className="size-4" />Target {formatAuditDate(audit.targetDate)}</p> : null}
            </div>
            <ol className="mt-6 grid gap-4 sm:grid-cols-2">
              {selectedSkill.actionPlan.weeks.map((step, index) => (
                <li key={step} className="flex break-inside-avoid gap-3 rounded-[14px] border border-black/8 p-4">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-deep text-[12px] font-semibold text-white">{index + 1}</span>
                  <div><p className="font-sans text-[11px] font-semibold text-primary-readable">Week {index + 1}</p><p className="mt-1 font-body text-[13px] leading-5 text-muted-foreground">{step}</p></div>
                </li>
              ))}
            </ol>
            <div className="mt-5 flex items-start gap-3 rounded-[14px] bg-emerald-50 p-4 text-emerald-950">
              <ClipboardCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-emerald-700" />
              <p className="font-body text-[13px] leading-5"><strong className="font-semibold">Evidence of progress:</strong> {selectedSkill.actionPlan.evidence}</p>
            </div>
          </div>
        ) : null}
      </section>

      <div className="mt-8 rounded-[20px] border border-black/8 bg-white p-6 print:hidden">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-sans text-[17px] font-semibold text-primary-deep">Review, practise, repeat</h2>
            <p className="mt-1 font-body text-[13px] leading-5 text-muted-foreground">{reviewDate ? `Return around ${formatAuditDate(reviewDate)} to reflect again and compare your progress.` : "Return after 30 days to reflect again."}</p>
          </div>
          <button type="button" disabled={!canRetake} onClick={onRetake} className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-[10px] border border-primary/25 px-4 font-sans text-[12px] font-semibold text-primary-deep transition-colors hover:bg-hero disabled:cursor-not-allowed disabled:border-black/8 disabled:text-black/35"><RefreshCcw aria-hidden="true" className="size-4" />{canRetake ? "Retake audit" : "Available after 30 days"}</button>
        </div>
        <div className="mt-5 border-t border-black/8 pt-5">
          <button type="button" onClick={onReset} className="inline-flex items-center gap-2 rounded-sm font-body text-[12px] font-medium text-muted-foreground underline decoration-black/15 underline-offset-4 hover:text-primary-deep"><RotateCcw aria-hidden="true" className="size-3.5" />Remove audit data from this device</button>
          {showResetConfirm ? <ResetConfirmation onCancel={onCancelReset} onConfirm={onConfirmReset} /> : null}
        </div>
      </div>
    </div>
  );
}

function StepHeader({ eyebrow, title, description, headingRef }: HeadingRefProps & { eyebrow: string; title: string; description: string }) {
  return (
    <div className="text-center">
      <p className="font-sans text-[13px] font-semibold text-primary-readable">{eyebrow}</p>
      <h1 ref={headingRef} tabIndex={-1} className="mx-auto mt-3 max-w-[760px] font-sans text-[36px] leading-[1.12] font-semibold tracking-[-0.035em] text-primary-deep outline-none sm:text-[48px]">{title}</h1>
      <p className="mx-auto mt-4 max-w-[620px] font-body text-[15px] leading-7 text-muted-foreground">{description}</p>
    </div>
  );
}

function ResultList({ title, icon, tone, items, empty }: { title: string; icon: React.ReactNode; tone: "strength" | "growth"; items: { id: string; label: string }[]; empty: string }) {
  return (
    <section className={cn("break-inside-avoid rounded-[20px] border p-6", tone === "strength" ? "border-emerald-200 bg-emerald-50/45" : "border-primary/15 bg-hero/55")}>
      <h2 className={cn("flex items-center gap-2 font-sans text-[18px] font-semibold", tone === "strength" ? "text-emerald-900" : "text-primary-deep")}>{icon}{title}</h2>
      {items.length ? (
        <ul className="mt-5 space-y-3">{items.map((item) => <li key={item.id} className="flex items-center gap-3 font-body text-[13px] leading-5 text-[#394150]"><span className={cn("size-1.5 shrink-0 rounded-full", tone === "strength" ? "bg-emerald-600" : "bg-primary")} />{item.label}</li>)}</ul>
      ) : <p className="mt-4 font-body text-[13px] text-muted-foreground">{empty}</p>}
    </section>
  );
}

function ResetConfirmation({ onCancel, onConfirm }: { onCancel: () => void; onConfirm: () => void }) {
  return (
    <div role="alert" className="mt-4 flex flex-col gap-3 rounded-[12px] border border-red-200 bg-red-50 p-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="font-body text-[12px] leading-5 text-red-950">Remove this audit, its action plan and any previous comparison from this device?</p>
      <div className="flex shrink-0 gap-2">
        <button type="button" onClick={onCancel} className="min-h-9 rounded-[8px] px-3 font-sans text-[11px] font-semibold text-red-950 hover:bg-white">Cancel</button>
        <button type="button" onClick={onConfirm} className="min-h-9 rounded-[8px] bg-red-700 px-3 font-sans text-[11px] font-semibold text-white hover:bg-red-800">Remove data</button>
      </div>
    </div>
  );
}
