export default function evaluateTest017(responseText) {
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
  // Feasible:
  // B, D
  //
  // Selected:
  // B
  //
  // Impact:
  // 8
  //
  // Cost:
  // 5
  //
  // =========================================================

  // =========================================================
  // 1. LINE COUNT
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

  const feasibleCorrect = uniqueFeasible === "B,D";

  checks.push({
    id: "FEASIBLE_INTERVENTIONS",
    name: "Correct feasible interventions",
    passed: feasibleCorrect,
    weight: 2,
    reason:
      feasibleCorrect
        ? "Only interventions B and D satisfy all constraints."
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
    name: "Selects the strongest feasible intervention",
    passed: selectedCorrect,
    weight: 2,
    reason:
      selectedCorrect
        ? "Intervention B has the highest Impact among feasible options."
        : "Intervention B should be selected.",
  });

  // =========================================================
  // 4. IMPACT
  // =========================================================

  const impactMatch = lines[2]?.match(
    /^Impact:\s*(\d+(?:\.\d+)?)$/i
  );

  const impactCorrect =
    !!impactMatch &&
    Number(impactMatch[1]) === 8;

  checks.push({
    id: "IMPACT",
    name: "Correct impact score",
    passed: impactCorrect,
    weight: 1.5,
    reason:
      impactCorrect
        ? "Intervention B has an Impact score of 8."
        : "Intervention B has an Impact score of 8.",
  });

  // =========================================================
  // 5. COST
  // =========================================================

  const costMatch = lines[3]?.match(
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
  // 6. DECISION BASIS
  // =========================================================

  const basis = lines[4] || "";
  const basisLower = basis.toLowerCase();

  const mentionsImpact =
    basisLower.includes("impact") ||
    basisLower.includes("highest");

  const mentionsFeasible =
    basisLower.includes("feasible") ||
    basisLower.includes("constraint") ||
    basisLower.includes("budget");

  const basisCorrect =
    mentionsImpact &&
    mentionsFeasible;

  checks.push({
    id: "DECISION_BASIS",
    name: "Uses the stated decision priority",
    passed: basisCorrect,
    weight: 1,
    reason:
      basisCorrect
        ? "The decision basis references feasibility and the primary Impact criterion."
        : "The rationale should reference feasibility and Impact priority.",
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