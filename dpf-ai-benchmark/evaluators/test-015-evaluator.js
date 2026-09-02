export default function evaluateTest015(responseText) {
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
  // Sequence:
  // 40, 44, 52, 64, 80
  //
  // Differences:
  // +4, +8, +12, +16
  //
  // The difference increases by 4 each step.
  //
  // Week 6:
  // 80 + 20 = 100
  //
  // Week 7:
  // 100 + 24 = 124
  //
  // Total increase:
  // 124 - 40 = 84
  //
  // Direction:
  // Increasing
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
  // 2. RULE
  // =========================================================

  const ruleMatch = lines[0]?.match(
    /^Rule:\s*(.+)$/i
  );

  const ruleText = ruleMatch
    ? ruleMatch[1].toLowerCase()
    : "";

  const mentionsIncreasingDifference =
    ruleText.includes("difference") ||
    ruleText.includes("increment") ||
    ruleText.includes("increase");

  const mentionsFour =
    ruleText.includes("4");

  const ruleCorrect =
    mentionsIncreasingDifference &&
    mentionsFour;

  checks.push({
    id: "RULE",
    name: "Identifies the numerical rule",
    passed: ruleCorrect,
    weight: 2,
    reason:
      ruleCorrect
        ? "The rule correctly identifies that the increment increases by 4 each step."
        : "The sequence follows increments of +4, +8, +12, +16, then +20 and +24.",
  });

  // =========================================================
  // 3. WEEK 6
  // =========================================================

  const week6Match = lines[1]?.match(
    /^Week 6:\s*(\d+(?:\.\d+)?)$/i
  );

  const week6Correct =
    !!week6Match &&
    Number(week6Match[1]) === 100;

  checks.push({
    id: "WEEK_6",
    name: "Correct Week 6 prediction",
    passed: week6Correct,
    weight: 2,
    reason:
      week6Correct
        ? "Week 6 should be 100."
        : "The correct Week 6 value is 100.",
  });

  // =========================================================
  // 4. WEEK 7
  // =========================================================

  const week7Match = lines[2]?.match(
    /^Week 7:\s*(\d+(?:\.\d+)?)$/i
  );

  const week7Correct =
    !!week7Match &&
    Number(week7Match[1]) === 124;

  checks.push({
    id: "WEEK_7",
    name: "Correct Week 7 prediction",
    passed: week7Correct,
    weight: 2,
    reason:
      week7Correct
        ? "Week 7 should be 124."
        : "The correct Week 7 value is 124.",
  });

  // =========================================================
  // 5. TOTAL INCREASE
  // =========================================================

  const increaseMatch = lines[3]?.match(
    /^Total Increase:\s*(\d+(?:\.\d+)?)$/i
  );

  const increaseCorrect =
    !!increaseMatch &&
    Number(increaseMatch[1]) === 84;

  checks.push({
    id: "TOTAL_INCREASE",
    name: "Correct total increase",
    passed: increaseCorrect,
    weight: 1.5,
    reason:
      increaseCorrect
        ? "The total increase from Week 1 to Week 7 is 84."
        : "The total increase should be 84.",
  });

  // =========================================================
  // 6. DIRECTION
  // =========================================================

  const directionMatch = lines[4]?.match(
    /^Direction:\s*(Increasing|Decreasing)$/i
  );

  const directionCorrect =
    !!directionMatch &&
    directionMatch[1].toLowerCase() === "increasing";

  checks.push({
    id: "DIRECTION",
    name: "Correctly identifies sequence direction",
    passed: directionCorrect,
    weight: 1,
    reason:
      directionCorrect
        ? "The sequence is increasing."
        : "The sequence is increasing.",
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