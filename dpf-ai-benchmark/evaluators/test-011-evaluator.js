export default function evaluateTest011(responseText) {
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
  // Constraints:
  // Cost <= 6
  // Implementation Time <= 2 weeks
  //
  // A: Cost 8, Time 3 -> infeasible
  // B: Cost 5, Time 2 -> feasible
  // C: Cost 9, Time 4 -> infeasible
  // D: Cost 4, Time 1 -> feasible
  //
  // Feasible: B, D
  //
  // Primary priority = highest Impact
  //
  // B Impact = 8
  // D Impact = 7
  //
  // Selected = B
  // Cost = 5
  // Time = 2 weeks
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
  // 2. FEASIBLE INTERVENTIONS
  // =========================================================

  const feasibleMatch = lines[0]?.match(
    /^Feasible Interventions:\s*(.+)$/i
  );

  const feasibleText = feasibleMatch
    ? feasibleMatch[1]
        .replace(/\s+/g, "")
        .toUpperCase()
    : "";

  const feasibleCorrect =
    feasibleText === "B,D" ||
    feasibleText === "D,B";

  checks.push({
    id: "FEASIBLE_INTERVENTIONS",
    name: "Correct feasible interventions",
    passed: feasibleCorrect,
    weight: 2,
    reason:
      feasibleCorrect
        ? "Only interventions B and D satisfy both constraints."
        : "The feasible interventions are B and D.",
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
    /^Impact:\s*(\d+)$/i
  );

  const impactCorrect =
    !!impactMatch &&
    Number(impactMatch[1]) === 8;

  checks.push({
    id: "IMPACT",
    name: "Correct impact score",
    passed: impactCorrect,
    weight: 1,
    reason:
      impactCorrect
        ? "Intervention B has an Impact score of 8."
        : "Intervention B has an Impact score of 8.",
  });

  // =========================================================
  // 5. COST
  // =========================================================

  const costMatch = lines[3]?.match(
    /^Cost:\s*(\d+)$/i
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
        ? "Intervention B has a cost of 5."
        : "Intervention B has a cost of 5.",
  });

  // =========================================================
  // 6. IMPLEMENTATION TIME
  // =========================================================

  const timeMatch = lines[4]?.match(
    /^Implementation Time:\s*(\d+)\s*weeks?$/i
  );

  const timeCorrect =
    !!timeMatch &&
    Number(timeMatch[1]) === 2;

  checks.push({
    id: "IMPLEMENTATION_TIME",
    name: "Correct implementation time",
    passed: timeCorrect,
    weight: 1,
    reason:
      timeCorrect
        ? "Intervention B requires 2 weeks."
        : "Intervention B requires 2 weeks.",
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

  const mentionsImpact =
    basisText.includes("impact");

  const mentionsFeasibility =
    basisText.includes("feasible") ||
    basisText.includes("constraint");

  const basisCorrect =
    mentionsImpact &&
    mentionsFeasibility;

  checks.push({
    id: "DECISION_BASIS",
    name: "Uses stated decision priorities",
    passed: basisCorrect,
    weight: 1.5,
    reason:
      basisCorrect
        ? "The rationale recognizes feasibility and the primary Impact priority."
        : "The rationale should reference feasibility and Impact.",
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
