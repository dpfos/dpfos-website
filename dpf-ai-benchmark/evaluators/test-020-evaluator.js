export default function evaluateTest020(responseText) {
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
  // A:
  // Cost 7 > 6
  // Risk High
  // => Infeasible
  //
  // B:
  // Cost 5 <= 6
  // Time 2 <= 3
  // Risk Low
  // Value 82 >= 80
  // => Feasible
  //
  // C:
  // Time 4 > 3
  // => Infeasible
  //
  // D:
  // Performance Value 78 < 80
  // => Infeasible
  //
  // Only B is feasible.
  //
  // Therefore:
  // Selected = B
  // Impact = 8
  // Value = 82
  // Cost = 5
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
  // 2. FEASIBLE PROJECTS
  // =========================================================

  const feasibleMatch = lines[0]?.match(
    /^Feasible Projects:\s*(.+)$/i
  );

  let feasibleProjects = [];

  if (feasibleMatch) {
    feasibleProjects = feasibleMatch[1]
      .toUpperCase()
      .replace(/AND/g, ",")
      .split(/[,\s]+/)
      .map((value) => value.trim())
      .filter((value) => /^[A-D]$/.test(value));
  }

  const uniqueFeasible = [...new Set(feasibleProjects)]
    .sort()
    .join(",");

  const feasibleCorrect =
    uniqueFeasible === "B";

  checks.push({
    id: "FEASIBLE_PROJECTS",
    name: "Correctly applies all hard constraints",
    passed: feasibleCorrect,
    weight: 2.5,
    reason:
      feasibleCorrect
        ? "Only Project B satisfies every hard constraint."
        : "Only Project B is feasible.",
  });

  // =========================================================
  // 3. SELECTED PROJECT
  // =========================================================

  const selectedMatch = lines[1]?.match(
    /^Selected Project:\s*([A-D])$/i
  );

  const selectedCorrect =
    !!selectedMatch &&
    selectedMatch[1].toUpperCase() === "B";

  checks.push({
    id: "SELECTED_PROJECT",
    name: "Selects the correct project",
    passed: selectedCorrect,
    weight: 2,
    reason:
      selectedCorrect
        ? "Project B is the only feasible project."
        : "Project B should be selected.",
  });

  // =========================================================
  // 4. PERFORMANCE IMPACT
  // =========================================================

  const impactMatch = lines[2]?.match(
    /^Performance Impact:\s*(\d+(?:\.\d+)?)$/i
  );

  const impactCorrect =
    !!impactMatch &&
    Number(impactMatch[1]) === 8;

  checks.push({
    id: "PERFORMANCE_IMPACT",
    name: "Correct performance impact",
    passed: impactCorrect,
    weight: 1,
    reason:
      impactCorrect
        ? "Project B has a Performance Impact score of 8."
        : "Project B has a Performance Impact score of 8.",
  });

  // =========================================================
  // 5. PERFORMANCE VALUE
  // =========================================================

  const valueMatch = lines[3]?.match(
    /^Available Performance Value:\s*(\d+(?:\.\d+)?)$/i
  );

  const valueCorrect =
    !!valueMatch &&
    Number(valueMatch[1]) === 82;

  checks.push({
    id: "PERFORMANCE_VALUE",
    name: "Correct available performance value",
    passed: valueCorrect,
    weight: 1,
    reason:
      valueCorrect
        ? "Project B has an Available Performance Value of 82."
        : "Project B has an Available Performance Value of 82.",
  });

  // =========================================================
  // 6. COST
  // =========================================================

  const costMatch = lines[4]?.match(
    /^Cost:\s*(\d+(?:\.\d+)?)\s*points?$/i
  );

  const costCorrect =
    !!costMatch &&
    Number(costMatch[1]) === 5;

  checks.push({
    id: "COST",
    name: "Correct project cost",
    passed: costCorrect,
    weight: 1,
    reason:
      costCorrect
        ? "Project B costs 5 points."
        : "Project B costs 5 points.",
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

  const mentionsFeasible =
    basisText.includes("feasible") ||
    basisText.includes("constraint");

  const mentionsImpact =
    basisText.includes("impact") ||
    basisText.includes("highest");

  const mentionsProjectB =
    basisText.includes("project b") ||
    /\bb\b/.test(basisText);

  const basisCorrect =
    mentionsFeasible &&
    mentionsImpact &&
    mentionsProjectB;

  checks.push({
    id: "DECISION_BASIS",
    name: "Explains the integrated decision",
    passed: basisCorrect,
    weight: 1,
    reason:
      basisCorrect
        ? "The rationale connects feasibility with the primary Performance Impact criterion."
        : "The rationale should explain that Project B is feasible and selected under the Performance Impact priority.",
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