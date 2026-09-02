export default function evaluateTest012(responseText) {
  const lines = responseText
    .trim()
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const checks = [];

  // =========================================================
  // GROUND TRUTH
  // =========================================================
  //
  // A = 8 × 6 = 48
  // B = 6 × 9 = 54
  // C = 7 × 5 = 35
  // D = 4 × 8 = 32
  //
  // Highest priority = B
  // B mitigation cost = 5
  // Budget = 5
  // Therefore B is feasible and selected.
  // =========================================================

  // =========================================================
  // 1. LINE COUNT
  // =========================================================

  checks.push({
    id: "LINE_COUNT",
    name: "Exactly 6 output lines",
    passed: lines.length === 6,
    weight: 1,
    reason:
      lines.length === 6
        ? "Output contains exactly six lines."
        : `Expected 6 lines but received ${lines.length}.`,
  });

  // =========================================================
// 2. RISK SCORES
// =========================================================

const scoresMatch = lines[0]?.match(
  /^Risk Scores:\s*(.+)$/i
);

const scoresText = scoresMatch
  ? scoresMatch[1].replace(/\s+/g, "").toUpperCase()
  : "";

function extractScore(label) {
  const match = scoresText.match(
    new RegExp(`${label}=([0-9]+(?:\\.[0-9]+)?)`)
  );

  return match ? Number(match[1]) : null;
}

const scoreA = extractScore("A");
const scoreB = extractScore("B");
const scoreC = extractScore("C");
const scoreD = extractScore("D");

function scoreEquivalent(actual, expected) {
  if (actual === null) return false;

  return (
    Math.abs(actual - expected) < 0.001 ||
    Math.abs(actual - expected / 100) < 0.001
  );
}

const scoresCorrect =
  scoreEquivalent(scoreA, 48) &&
  scoreEquivalent(scoreB, 54) &&
  scoreEquivalent(scoreC, 35) &&
  scoreEquivalent(scoreD, 32);

checks.push({
  id: "RISK_SCORES",
  name: "Correct risk priority scores",
  passed: scoresCorrect,
  weight: 2,
  reason:
    scoresCorrect
      ? "All four Risk Priority Scores are correct, including normalized or percentage-equivalent representations."
      : "Expected A=48 (or 0.48), B=54 (or 0.54), C=35 (or 0.35), and D=32 (or 0.32).",
});

  // =========================================================
  // 3. HIGHEST PRIORITY
  // =========================================================

  const highestMatch = lines[1]?.match(
    /^Highest Priority Risk:\s*([A-D])$/i
  );

  const highestCorrect =
    !!highestMatch &&
    highestMatch[1].toUpperCase() === "B";

  checks.push({
    id: "HIGHEST_PRIORITY",
    name: "Identifies highest-priority risk",
    passed: highestCorrect,
    weight: 2,
    reason:
      highestCorrect
        ? "Risk B has the highest priority score of 54."
        : "Risk B has the highest priority score.",
  });

  // =========================================================
  // 4. FEASIBILITY
  // =========================================================

  const feasibleMatch = lines[2]?.match(
    /^Highest Priority Feasible:\s*(Yes|No)$/i
  );

  const feasibleCorrect =
    !!feasibleMatch &&
    feasibleMatch[1].toLowerCase() === "yes";

  checks.push({
    id: "FEASIBILITY",
    name: "Correctly evaluates mitigation feasibility",
    passed: feasibleCorrect,
    weight: 1.5,
    reason:
      feasibleCorrect
        ? "Risk B costs 5 points and the budget is 5 points."
        : "Risk B is feasible because its cost equals the budget.",
  });

  // =========================================================
  // 5. SELECTED RISK
  // =========================================================

  const selectedMatch = lines[3]?.match(
    /^Selected Risk:\s*([A-D])$/i
  );

  const selectedCorrect =
    !!selectedMatch &&
    selectedMatch[1].toUpperCase() === "B";

  checks.push({
    id: "SELECTED_RISK",
    name: "Selects the correct risk",
    passed: selectedCorrect,
    weight: 2,
    reason:
      selectedCorrect
        ? "Risk B is both highest priority and feasible."
        : "Risk B should be selected.",
  });

  // =========================================================
  // 6. MITIGATION COST
  // =========================================================

  const costMatch = lines[4]?.match(
    /^Mitigation Cost:\s*(\d+)\s*points?$/i
  );

  const costCorrect =
    !!costMatch &&
    Number(costMatch[1]) === 5;

  checks.push({
    id: "MITIGATION_COST",
    name: "Correct mitigation cost",
    passed: costCorrect,
    weight: 1,
    reason:
      costCorrect
        ? "Risk B requires 5 mitigation points."
        : "Risk B requires 5 mitigation points.",
  });

  // =========================================================
  // 7. DECISION BASIS
  // =========================================================

  const basisMatch = lines[5]?.match(
    /^Decision Basis:\s*(.+)$/i
  );

  const basisText = basisMatch
    ? basisMatch[1].toLowerCase()
    : "";

  const mentionsRiskB =
    basisText.includes("b") ||
    basisText.includes("risk b");

  const mentionsPriority =
    basisText.includes("priority") ||
    basisText.includes("score");

  const mentionsBudget =
    basisText.includes("budget") ||
    basisText.includes("feasible") ||
    basisText.includes("cost");

  const basisCorrect =
    mentionsRiskB &&
    mentionsPriority &&
    mentionsBudget;

  checks.push({
    id: "DECISION_BASIS",
    name: "Provides evidence-based decision rationale",
    passed: basisCorrect,
    weight: 1,
    reason:
      basisCorrect
        ? "The rationale references Risk B, priority, and budget feasibility."
        : "The rationale should reference Risk B, its priority, and budget feasibility.",
  });

  // =========================================================
  // 8. FORMAT
  // =========================================================

  const hasBullets = lines.some((line) =>
    /^[-*•]\s/.test(line)
  );

  const hasNumbering = lines.some((line) =>
    /^\d+[.)]\s/.test(line)
  );

  const formatCorrect =
    !hasBullets &&
    !hasNumbering;

  checks.push({
    id: "FORMAT",
    name: "Follows required output format",
    passed: formatCorrect,
    weight: 0.5,
    reason:
      formatCorrect
        ? "No bullets or numbering detected."
        : "Forbidden formatting detected.",
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