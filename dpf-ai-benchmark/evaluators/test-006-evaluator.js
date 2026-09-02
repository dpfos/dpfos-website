export default function evaluateTest006(responseText) {
  const lines = responseText
    .trim()
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const checks = [];

  // =========================================================
  // EXPECTED DECISION
  // =========================================================

  const expectedStrategy = "A";
  const expectedCost = 70;
  const expectedProbability = 90;

  // =========================================================
  // 1. EXACTLY 4 LINES
  // =========================================================

  checks.push({
    id: "LINE_COUNT",
    name: "Exactly 4 output lines",
    passed: lines.length === 4,
    weight: 1,
    reason:
      lines.length === 4
        ? "Output contains exactly four lines."
        : `Expected 4 lines but received ${lines.length}.`,
  });

  // =========================================================
  // 2. STRATEGY
  // =========================================================

  const strategyMatch = lines[0]?.match(
    /^Selected Strategy:\s*([ABC])$/i
  );

  const strategyCorrect =
    !!strategyMatch &&
    strategyMatch[1].toUpperCase() === expectedStrategy;

  checks.push({
    id: "STRATEGY",
    name: "Selects the strongest strategy",
    passed: strategyCorrect,
    weight: 2.5,
    reason:
      strategyCorrect
        ? "Strategy A is the strongest feasible decision under the stated priority."
        : "The selected strategy is not the strongest feasible decision.",
  });

  // =========================================================
  // 3. TRANSFER COST
  // =========================================================

  const costMatch = lines[1]?.match(
    /^Transfer Cost:\s*(\d+)/i
  );

  const costCorrect =
    !!costMatch &&
    Number(costMatch[1]) === expectedCost;

  checks.push({
    id: "COST",
    name: "Correct transfer cost",
    passed: costCorrect,
    weight: 1.5,
    reason:
      costCorrect
        ? "Transfer cost is correctly identified as 70 points."
        : "Transfer cost is incorrect.",
  });

  // =========================================================
  // 4. IMMEDIATE IMPROVEMENT PROBABILITY
  // =========================================================

  const probabilityMatch = lines[2]?.match(
    /^Immediate Improvement Probability:\s*(\d+)%?$/i
  );

  const probabilityCorrect =
    !!probabilityMatch &&
    Number(probabilityMatch[1]) === expectedProbability;

  checks.push({
    id: "PROBABILITY",
    name: "Correct immediate improvement probability",
    passed: probabilityCorrect,
    weight: 1.5,
    reason:
      probabilityCorrect
        ? "Immediate improvement probability is correctly identified as 90%."
        : "Immediate improvement probability is incorrect.",
  });

  // =========================================================
  // 5. RATIONALE
  // =========================================================

  const rationale = (lines[3] || "").toLowerCase();

  const recognizesImmediatePriority =
    rationale.includes("immediate") &&
    (
      rationale.includes("90") ||
      rationale.includes("performance")
    );

  const recognizesBudget =
    rationale.includes("70") ||
    rationale.includes("budget");

  const rationaleCorrect =
    recognizesImmediatePriority &&
    recognizesBudget;

  checks.push({
    id: "RATIONALE",
    name: "Provides decision rationale based on stated priorities",
    passed: rationaleCorrect,
    weight: 2.5,
    reason:
      rationaleCorrect
        ? "Rationale correctly prioritizes immediate performance while respecting the budget."
        : "Rationale does not clearly establish the decision logic.",
  });

  // =========================================================
  // 6. SINGLE DECISION / FORMAT
  // =========================================================

  const hasBullets = lines.some((line) =>
    /^[-*•]\s/.test(line)
  );

  const hasNumbering = lines.some((line) =>
    /^\d+[.)]\s/.test(line)
  );

  const mentionsMultipleStrategies =
    (responseText.match(/Strategy [ABC]/gi) || []).length > 2;

  const formatCorrect =
    !hasBullets &&
    !hasNumbering &&
    !mentionsMultipleStrategies;

  checks.push({
    id: "FORMAT",
    name: "Provides one decision without forbidden formatting",
    passed: formatCorrect,
    weight: 1,
    reason:
      formatCorrect
        ? "The response contains one decision and follows the required format."
        : "The response contains multiple decisions or forbidden formatting.",
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