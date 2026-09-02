export default function evaluateTest018(responseText) {
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
  // 2. FEASIBLE PROGRAMS
  // =========================================================

  const feasibleMatch = lines[0]?.match(
    /^Feasible Programs:\s*(.+)$/i
  );

  let feasiblePrograms = [];

  if (feasibleMatch) {
    feasiblePrograms = feasibleMatch[1]
      .toUpperCase()
      .replace(/AND/g, ",")
      .split(/[,\s]+/)
      .map((value) => value.trim())
      .filter((value) => /^[A-D]$/.test(value));
  }

  const uniqueFeasible = [...new Set(feasiblePrograms)]
    .sort()
    .join(",");

  const feasibleCorrect =
    uniqueFeasible === "B,D";

  checks.push({
    id: "FEASIBLE_PROGRAMS",
    name: "Correct feasible programs",
    passed: feasibleCorrect,
    weight: 2,
    reason:
      feasibleCorrect
        ? "Only Programs B and D satisfy all hard constraints."
        : "The feasible programs should be B and D.",
  });

  // =========================================================
  // 3. SELECTED PROGRAM
  // =========================================================

  const selectedMatch = lines[1]?.match(
    /^Selected Program:\s*([A-D])$/i
  );

  const selectedCorrect =
    !!selectedMatch &&
    selectedMatch[1].toUpperCase() === "B";

  checks.push({
    id: "SELECTED_PROGRAM",
    name: "Selects the strongest feasible program",
    passed: selectedCorrect,
    weight: 2,
    reason:
      selectedCorrect
        ? "Program B has the highest Performance Impact among feasible programs."
        : "Program B should be selected.",
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
        ? "Program B has a Performance Impact score of 8."
        : "Program B has a Performance Impact score of 8.",
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
    name: "Correct program cost",
    passed: costCorrect,
    weight: 1,
    reason:
      costCorrect
        ? "Program B costs 5 points."
        : "Program B costs 5 points.",
  });

  // =========================================================
  // 6. LONG-TERM VALUE
  // =========================================================

  const valueMatch = lines[4]?.match(
    /^Long-Term Value:\s*(\d+(?:\.\d+)?)$/i
  );

  const valueCorrect =
    !!valueMatch &&
    Number(valueMatch[1]) === 8;

  checks.push({
    id: "LONG_TERM_VALUE",
    name: "Correct long-term value",
    passed: valueCorrect,
    weight: 1,
    reason:
      valueCorrect
        ? "Program B has a Long-Term Value score of 8."
        : "Program B has a Long-Term Value score of 8.",
  });

  // =========================================================
  // 7. DECISION BASIS
  // =========================================================

  const basis = lines[5] || "";
  const basisLower = basis.toLowerCase();

  const mentionsImpact =
    basisLower.includes("impact") ||
    basisLower.includes("performance");

  const mentionsFeasibility =
    basisLower.includes("feasible") ||
    basisLower.includes("constraint") ||
    basisLower.includes("budget");

  const basisCorrect =
    mentionsImpact &&
    mentionsFeasibility;

  checks.push({
    id: "DECISION_BASIS",
    name: "Uses the stated decision framework",
    passed: basisCorrect,
    weight: 1,
    reason:
      basisCorrect
        ? "The rationale references feasibility and Performance Impact."
        : "The rationale should reference feasibility and Performance Impact.",
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
    weight: 1,
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