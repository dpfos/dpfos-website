export default function evaluateTest003(responseText) {
  const response = responseText.trim();

  const lines = response
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const expected = [
    "Scouting Remaining: 45000",
    "Academy Remaining: 38000",
    "Performance Remaining: 30000",
    "Total Remaining: 113000",
    "All Projects Funded: Yes, Remaining After Funding: 68000",
    "High Priority Projects: Project Alpha, Project Gamma",
  ];

  const checks = [];

  // =========================================================
  // 1. EXACT LINE COUNT
  // =========================================================

  checks.push({
    id: "LINE_COUNT",
    name: "Exactly 6 output lines",
    passed: lines.length === 6,
    weight: 1.5,
    reason:
      lines.length === 6
        ? "Output contains exactly six lines."
        : `Expected 6 lines but received ${lines.length}.`,
  });

  // =========================================================
  // 2. SCOUTING
  // =========================================================

  checks.push({
    id: "SCOUTING",
    name: "Correct Scouting remaining budget",
    passed: lines[0] === expected[0],
    weight: 1.5,
    reason:
      lines[0] === expected[0]
        ? "Scouting remaining budget is correct."
        : "Scouting remaining budget is incorrect.",
  });

  // =========================================================
  // 3. ACADEMY
  // =========================================================

  checks.push({
    id: "ACADEMY",
    name: "Correct Academy remaining budget",
    passed: lines[1] === expected[1],
    weight: 1.5,
    reason:
      lines[1] === expected[1]
        ? "Academy remaining budget is correct."
        : "Academy remaining budget is incorrect.",
  });

  // =========================================================
  // 4. PERFORMANCE
  // =========================================================

  checks.push({
    id: "PERFORMANCE",
    name: "Correct Performance remaining budget",
    passed: lines[2] === expected[2],
    weight: 1.5,
    reason:
      lines[2] === expected[2]
        ? "Performance remaining budget is correct."
        : "Performance remaining budget is incorrect.",
  });

  // =========================================================
  // 5. TOTAL + PROJECT FUNDING
  // =========================================================

  const totalAndFundingCorrect =
    lines[3] === expected[3] &&
    lines[4] === expected[4];

  checks.push({
    id: "TOTAL_AND_FUNDING",
    name: "Correct total budget and project funding calculation",
    passed: totalAndFundingCorrect,
    weight: 2,
    reason:
      totalAndFundingCorrect
        ? "Total remaining budget and post-funding balance are correct."
        : "One or more total funding calculations are incorrect.",
  });

  // =========================================================
  // 6. HIGH PRIORITY PROJECTS
  // =========================================================

  checks.push({
    id: "PRIORITY",
    name: "Correct high-priority project identification",
    passed: lines[5] === expected[5],
    weight: 2,
    reason:
      lines[5] === expected[5]
        ? "Both High-priority projects were correctly identified."
        : "The High-priority project identification is incorrect.",
  });

  // =========================================================
  // 7. NO EXTRA TEXT
  // =========================================================

  const exactOutput =
    response === expected.join("\n");

  checks.push({
    id: "EXACT_OUTPUT",
    name: "Follows the required output format exactly",
    passed: exactOutput,
    weight: 1,
    reason:
      exactOutput
        ? "Output matches the required structure exactly."
        : "Output contains formatting or wording outside the required structure.",
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