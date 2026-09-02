export default function evaluateTest004(responseText) {
  const lines = responseText
    .trim()
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const checks = [];

  // =========================================================
  // 1. EXACTLY 5 LINES
  // =========================================================

  checks.push({
    id: "LINE_COUNT",
    name: "Exactly 5 output lines",
    passed: lines.length === 5,
    weight: 1,
    reason:
      lines.length === 5
        ? "Output contains exactly five lines."
        : `Expected 5 lines but received ${lines.length}.`,
  });

  // =========================================================
// 2. STRATEGIC SELECTION
// =========================================================

const selectionText = (lines[0] || "").toLowerCase();

const selectsA =
  selectionText.includes("initiative a");

const selectsC =
  selectionText.includes("initiative c");

const selectsB =
  selectionText.includes("initiative b");

const selectionCorrect =
  selectsA &&
  selectsC &&
  !selectsB;

checks.push({
  id: "SELECTION",
  name: "Selects the strongest feasible combination",
  passed: selectionCorrect,
  weight: 2,
  reason:
    selectionCorrect
      ? "Initiatives A and C form the strongest feasible combination."
      : "The selected combination is not the expected strongest feasible combination.",
});

  // =========================================================
// 3. TOTAL INVESTMENT
// =========================================================

const investmentValue = lines[1]
  ?.match(/Total Investment:\s*(\d+)/i)?.[1];

const investmentCorrect =
  Number(investmentValue) === 100;

checks.push({
  id: "INVESTMENT",
  name: "Correct total investment",
  passed: investmentCorrect,
  weight: 1.5,
  reason:
    investmentCorrect
      ? "Total investment is correctly calculated as 100 points."
      : "Total investment is incorrect.",
});

  // =========================================================
// 4. UNUSED CAPACITY
// =========================================================

const capacityValue = lines[2]
  ?.match(/Unused Capacity:\s*(-?\d+)/i)?.[1];

const capacityCorrect =
  Number(capacityValue) === 0;

checks.push({
  id: "CAPACITY",
  name: "Correct unused capacity",
  passed: capacityCorrect,
  weight: 1.5,
  reason:
    capacityCorrect
      ? "Unused capacity is correctly calculated as 0 points."
      : "Unused capacity is incorrect.",
});

  // =========================================================
  // 5. OBJECTIVES
  // =========================================================

  const objectiveText = lines[3] || "";

  const objectivesCorrect =
    objectiveText.includes("1") &&
    objectiveText.includes("2") &&
    objectiveText.includes("3") &&
    objectiveText.includes("4") &&
    objectiveText.includes("5");

  checks.push({
    id: "OBJECTIVES",
    name: "Identifies satisfied strategic objectives",
    passed: objectivesCorrect,
    weight: 1.5,
    reason:
      objectivesCorrect
        ? "All five strategic objectives are satisfied."
        : "The response does not identify all satisfied objectives.",
  });

  // =========================================================
  // 6. STRATEGIC RATIONALE
  // =========================================================

  const rationale = (lines[4] || "").toLowerCase();

  const rationaleCorrect =
    rationale.includes("initiative a") &&
    rationale.includes("initiative c") &&
    (
      rationale.includes("first-team") ||
      rationale.includes("first team")
    ) &&
    (
      rationale.includes("talent") ||
      rationale.includes("long-term")
    );

  checks.push({
    id: "RATIONALE",
    name: "Provides valid strategic rationale",
    passed: rationaleCorrect,
    weight: 1.5,
    reason:
      rationaleCorrect
        ? "Rationale connects first-team performance with long-term talent development."
        : "Strategic rationale does not clearly establish the required trade-off.",
  });

  // =========================================================
  // 7. FORMAT
  // =========================================================

  const hasBullets = lines.some((line) =>
    /^[-*•]\s/.test(line)
  );

  const hasNumbering = lines.some((line) =>
    /^\d+[.)]\s/.test(line)
  );

  const formatCorrect =
    !hasBullets && !hasNumbering;

  checks.push({
    id: "FORMAT",
    name: "No bullets or numbering",
    passed: formatCorrect,
    weight: 1,
    reason:
      formatCorrect
        ? "No bullets or numbered formatting detected."
        : "Forbidden bullet or numbered formatting detected.",
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

  return {
    score,
    maxScore: 10,

    status:
      passedChecks === checks.length
        ? "PASS"
        : score >= 6
          ? "PARTIAL"
          : "FAIL",

    checks: {
      total: checks.length,
      passed: passedChecks,
      failed: checks.length - passedChecks,
    },

    details: checks,
  };
}