import assert from "node:assert/strict";
import { describe, test } from "node:test";

import { auditQuestions } from "@/data/self-audit";
import {
  createEmptyAudit,
  getCategoryResults,
  getRankedSkills,
  isAuditComplete,
  parseStoredAudit,
} from "@/lib/self-audit";
import type { AuditRating } from "@/types/self-audit";

describe("personal skills self-audit", () => {
  test("requires a response for every question", () => {
    const answers = Object.fromEntries(auditQuestions.map((question) => [question.id, 3])) as Record<string, AuditRating>;
    assert.equal(isAuditComplete(answers), true);
    delete answers[auditQuestions[0].id];
    assert.equal(isAuditComplete(answers), false);
  });

  test("ignores practical exposure responses when averaging categories", () => {
    const firstCategoryAnswers = Object.fromEntries([
      [auditQuestions[0].id, 5],
      [auditQuestions[1].id, "not-yet"],
    ]) as Record<string, AuditRating>;
    const result = getCategoryResults(firstCategoryAnswers)[0];
    assert.equal(result.average, 5);
    assert.equal(result.exposureNeeded, 1);
  });

  test("ranks strengths, growth areas and exposure separately", () => {
    const answers = {
      [auditQuestions[0].id]: 5,
      [auditQuestions[1].id]: 1,
      [auditQuestions[2].id]: "not-yet",
      [auditQuestions[3].id]: 4,
      [auditQuestions[4].id]: 2,
    } satisfies Record<string, AuditRating>;
    const ranked = getRankedSkills(answers);
    assert.deepEqual(ranked.strengths.map((item) => item.rating), [5, 4, 2]);
    assert.deepEqual(ranked.growthAreas.map((item) => item.rating), [1, 2, 4]);
    assert.deepEqual(ranked.exposureAreas.map((item) => item.id), [auditQuestions[2].id]);
  });

  test("rejects invalid storage and sanitises unknown answers", () => {
    assert.equal(parseStoredAudit("not-json"), null);
    const audit = createEmptyAudit(new Date("2026-08-11T00:00:00.000Z"));
    const restored = parseStoredAudit(JSON.stringify({
      ...audit,
      answers: { [auditQuestions[0].id]: 4, unknown: 5, [auditQuestions[1].id]: 10 },
    }));
    assert.deepEqual(restored?.answers, { [auditQuestions[0].id]: 4 });
  });
});
