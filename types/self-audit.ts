export type AuditRating = 1 | 2 | 3 | 4 | 5 | "not-yet";

export type AuditPhase = "intro" | "context" | "assessment" | "results";

export interface AuditActionPlan {
  outcome: string;
  weeks: readonly [string, string, string, string];
  evidence: string;
}

export interface AuditQuestion {
  id: string;
  prompt: string;
  skill: string;
  actionPlan: AuditActionPlan;
}

export interface AuditCategory {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  questions: readonly AuditQuestion[];
}

export interface CompletedAuditSnapshot {
  answers: Record<string, AuditRating>;
  completedAt: string;
}

export interface StoredAudit {
  version: 1;
  phase: AuditPhase;
  context: string | null;
  questionIndex: number;
  answers: Record<string, AuditRating>;
  completedAt: string | null;
  selectedSkillId: string | null;
  targetDate: string | null;
  previous: CompletedAuditSnapshot | null;
  updatedAt: string;
}

export interface CategoryResult {
  id: string;
  title: string;
  average: number | null;
  answered: number;
  exposureNeeded: number;
}
