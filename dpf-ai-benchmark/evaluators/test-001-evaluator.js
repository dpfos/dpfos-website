export function evaluateTest001(responseText) {
  const text = responseText.toLowerCase();

  const checks = [];

  // =========================================================
  // 1. FINAL FEASIBILITY
  // =========================================================

  const feasibilityCorrect =
    text.includes("impossible") ||
    text.includes("not possible") ||
    text.includes("cannot") ||
    text.includes("no.");

  checks.push({
    id: "FEASIBILITY",
    name: "Correct feasibility conclusion",
    passed: feasibilityCorrect,
    weight: 2,
    reason: feasibilityCorrect
      ? "Model correctly identified the scheduling problem as infeasible."
      : "Model did not clearly identify the problem as infeasible.",
  });

  // =========================================================
  // 2. DURATION CHAIN
  // =========================================================

  const hasD2 =
    text.includes("d") &&
    text.includes("2 working days");

  const hasA2 =
    text.includes("a") &&
    text.includes("2 working days");

  const hasB2 =
    text.includes("b") &&
    text.includes("2 working days");

  const durationChainCorrect =
    hasD2 && hasA2 && hasB2;

  checks.push({
    id: "DURATION_CHAIN",
    name: "Recognizes D, A and B durations",
    passed: durationChainCorrect,
    weight: 1.5,
    reason: durationChainCorrect
      ? "Model correctly recognized the 2-day durations."
      : "One or more required project durations were not identified.",
  });

  // =========================================================
  // 3. DEPENDENCY CHAIN
  // =========================================================

  const dependencyCorrect =
    text.includes("d") &&
    text.includes("before") &&
    text.includes("a") &&
    text.includes("b");

  checks.push({
    id: "DEPENDENCIES",
    name: "Recognizes D → A → B dependency",
    passed: dependencyCorrect,
    weight: 1.5,
    reason: dependencyCorrect
      ? "Model recognized the required dependency ordering."
      : "Model failed to establish the required dependency chain.",
  });

  // =========================================================
// 4. RESOURCE CONFLICT
// =========================================================

const resourceConflictCorrect =
  text.includes("team 1") &&
  text.includes("team 2") &&
  (
    text.includes("cannot overlap") ||
    text.includes("cannot be overlap") ||
    text.includes("not overlap") ||
    text.includes("shared team") ||
    text.includes("shared resource") ||
    text.includes("resource conflict") ||
    text.includes("cannot be worked on simultaneously") ||
    text.includes("cannot be worked simultaneously") ||
    text.includes("cannot work on a and b concurrently") ||
    text.includes("cannot work on a and b simultaneously") ||
    text.includes("cannot work on projects a and b concurrently") ||
    text.includes("cannot work on projects a and b simultaneously") ||
    text.includes("one project per day") ||
    text.includes("only work on one project per day") ||
    text.includes("one project at a time") ||
    text.includes("4 distinct working days") ||
    text.includes("4 non-overlapping working days")
  );

checks.push({
  id: "RESOURCE_CONFLICT",
  name: "Recognizes Team 1 / Team 2 conflict",
  passed: resourceConflictCorrect,
  weight: 1.5,
  reason: resourceConflictCorrect
    ? "Model correctly identified the shared-resource conflict."
    : "Model did not clearly establish the resource conflict.",
});

  // =========================================================
// 5. FEASIBILITY CONTRADICTION
// =========================================================

const directSixDayProof =
  text.includes("6") &&
  (
    text.includes("days") ||
    text.includes("working days")
  ) &&
  text.includes("5") &&
  (
    text.includes("days") ||
    text.includes("working days")
  );

const windowProof =
  (
    text.includes("4") &&
    (
      text.includes("distinct days") ||
      text.includes("non-overlapping") ||
      text.includes("non overlapping") ||
      text.includes("total working days")
    )
  ) &&
  (
    text.includes("3") &&
    (
      text.includes("days remain") ||
      text.includes("days remaining") ||
      text.includes("3 days")
    )
  );

const arithmeticContradiction =
  (
    text.includes("4") &&
    text.includes("3") &&
    (
      text.includes("impossible") ||
      text.includes("cannot") ||
      text.includes("pigeonhole")
    )
  );

const feasibilityProof =
  directSixDayProof ||
  windowProof ||
  arithmeticContradiction;

checks.push({
  id: "FEASIBILITY_PROOF",
  name: "Establishes the scheduling contradiction",
  passed: feasibilityProof,
  weight: 1.5,
  reason: feasibilityProof
    ? "Model established a valid mathematical contradiction between required work and available time."
    : "Model did not establish a sufficient mathematical contradiction.",
});

  // =========================================================
  // 6. CONSTRAINT CHANGE
  // =========================================================

  const constraintChangeCorrect =
    text.includes("constraint 8") &&
    (
      text.includes("remove") ||
      text.includes("removed")
    );

  checks.push({
    id: "CONSTRAINT_CHANGE",
    name: "Proposes a valid single constraint change",
    passed: constraintChangeCorrect,
    weight: 1,
    reason: constraintChangeCorrect
      ? "Model proposed removing Constraint 8 as the feasibility change."
      : "Model did not clearly propose the expected constraint change.",
  });

  // =========================================================
  // SCORE
  // =========================================================

  const totalWeight = checks.reduce(
    (sum, check) => sum + check.weight,
    0
  );

  const earnedWeight = checks
    .filter((check) => check.passed)
    .reduce(
      (sum, check) => sum + check.weight,
      0
    );

  const score = Number(
    ((earnedWeight / totalWeight) * 10).toFixed(2)
  );

  const passedChecks = checks.filter(
    (check) => check.passed
  ).length;

  const status =
    score >= 8
      ? "PASS"
      : score >= 6
        ? "PARTIAL"
        : "FAIL";

  return {
    score,
    maxScore: 10,
    status,

    checks: {
      total: checks.length,
      passed: passedChecks,
      failed: checks.length - passedChecks,
    },

    details: checks,
  };
}