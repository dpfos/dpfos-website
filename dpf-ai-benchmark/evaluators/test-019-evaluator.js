export default function evaluateTest019(responseText) {
  const lines = responseText
    .trim()
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const checks = [];

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
  // 2. FEASIBLE INTERVENTIONS
  // =========================================================

  const feasibleMatch = lines[0]?.match(
    /^Feasible Interventions:\s*(.+)$/i
  );

  let feasibleInterventions = [];

  if (feasibleMatch) {
    feasibleInterventions = feasibleMatch[1]
      .toUpperCase()
      .replace(/AND/g, ",")
      .split(/[,\s]+/)
      .map((value) => value.trim())
      .filter((value) => /^[A-D]$/.test(value));
  }

  const uniqueFeasible = [...new Set(feasibleInterventions)]
    .sort()
    .join(",");

  const feasibleCorrect =
    uniqueFeasible === "B,D";

  checks.push({
    id: "FEASIBLE_INTERVENTIONS",
    name: "Correct feasible interventions",
    passed: feasibleCorrect,
    weight: 2,
    reason:
      feasibleCorrect
        ? "Only interventions B and D satisfy the budget and risk constraints."
        : "The feasible interventions should be B and D.",
  });

  // =========================================================
  // 3. SELECTED INTERVENTION
  // =========================================================

  const selectedMatch = lines[1]?.match(
    /^Selected Intervention:\s*([A-D])$/i
  );

  const selectedCorrect =
    !!selectedMatch &&
    selectedMatch[1].toUpperCase() === "B";

  checks.push({
    id: "SELECTED_INTERVENTION",
    name: "Selects the most robust feasible intervention",
    passed: selectedCorrect,
    weight: 2,
    reason:
      selectedCorrect
        ? "Intervention B has the highest Worst-Case Impact among feasible options."
        : "Intervention B should be selected.",
  });

  // =========================================================
  // 4. WORST-CASE IMPACT
  // =========================================================

  const worstCaseMatch = lines[2]?.match(
    /^Worst-Case Impact:\s*(\d+(?:\.\d+)?)$/i
  );

  const worstCaseCorrect =
    !!worstCaseMatch &&
    Number(worstCaseMatch[1]) === 7;

  checks.push({
    id: "WORST_CASE_IMPACT",
    name: "Correct worst-case impact",
    passed: worstCaseCorrect,
    weight: 1.5,
    reason:
      worstCaseCorrect
        ? "Intervention B has a Worst-Case Impact of 7."
        : "Intervention B has a Worst-Case Impact of 7.",
  });

  // =========================================================
  // 5. BEST-CASE IMPACT
  // =========================================================

  const bestCaseMatch = lines[3]?.match(
    /^Best-Case Impact:\s*(\d+(?:\.\d+)?)$/i
  );

  const bestCaseCorrect =
    !!bestCaseMatch &&
    Number(bestCaseMatch[1]) === 8;

  checks.push({
    id: "BEST_CASE_IMPACT",
    name: "Correct best-case impact",
    passed: bestCaseCorrect,
    weight: 1,
    reason:
      bestCaseCorrect
        ? "Intervention B has a Best-Case Impact of 8."
        : "Intervention B has a Best-Case Impact of 8.",
  });

  // =========================================================
  // 6. COST
  // =========================================================

  const costMatch = lines[4]?.match(
    /^Cost:\s*(\d+(?:\.\d+)?)$/i
  );

  const costCorrect =
    !!costMatch &&
    Number(costMatch[1]) === 5;

  checks.push({
    id: "COST",
    name: "Correct intervention cost",
    passed: costCorrect,
    weight: 1,
    reason:
      costCorrect
        ? "Intervention B costs 5 points."
        : "Intervention B costs 5 points.",
  });

  // =========================================================
  // 7. DECISION BASIS
  // =========================================================

  const basis = lines[5] || "";
  const basisLower = basis.toLowerCase();

  const mentionsWorstCase =
    basisLower.includes("worst") ||
    basisLower.includes("downside") ||
    basisLower.includes("robust");

  const mentionsFeasibility =
    basisLower.includes("feasible") ||
    basisLower.includes("budget") ||
    basisLower.includes("constraint");

  const basisCorrect =
    mentionsWorstCase &&
    mentionsFeasibility;

  checks.push({
    id: "DECISION_BASIS",
    name: "Uses the stated robust decision framework",
    passed: basisCorrect,
    weight: 1,
    reason:
      basisCorrect
        ? "The rationale references feasibility and Worst-Case Impact."
        : "The rationale should reference feasibility and the primary Worst-Case Impact criterion.",
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