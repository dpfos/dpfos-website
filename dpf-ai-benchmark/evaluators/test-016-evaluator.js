export default function evaluateTest016(responseText) {
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
  // Training:
  // 20 - 5 - 4 + 3 - 6 = 8
  //
  // Analysis:
  // 12 - 2 - 3 - 1 - 2 = 4
  //
  // Recovery:
  // 8 - 1 - 2 + 2 - 2 = 5
  //
  // Lowest resource:
  // Analysis
  //
  // All resources remain available:
  // Yes
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
  // 2. TRAINING HOURS
  // =========================================================

  const trainingMatch = lines[0]?.match(
    /^Training Hours:\s*(\d+(?:\.\d+)?)$/i
  );

  const trainingCorrect =
    !!trainingMatch &&
    Number(trainingMatch[1]) === 8;

  checks.push({
    id: "TRAINING_HOURS",
    name: "Correct final training availability",
    passed: trainingCorrect,
    weight: 2,
    reason:
      trainingCorrect
        ? "Final available training hours are 8."
        : "Final available training hours should be 8.",
  });

  // =========================================================
  // 3. ANALYSIS HOURS
  // =========================================================

  const analysisMatch = lines[1]?.match(
    /^Analysis Hours:\s*(\d+(?:\.\d+)?)$/i
  );

  const analysisCorrect =
    !!analysisMatch &&
    Number(analysisMatch[1]) === 4;

  checks.push({
    id: "ANALYSIS_HOURS",
    name: "Correct final analysis availability",
    passed: analysisCorrect,
    weight: 2,
    reason:
      analysisCorrect
        ? "Final available analysis hours are 4."
        : "Final available analysis hours should be 4.",
  });

  // =========================================================
  // 4. RECOVERY UNITS
  // =========================================================

  const recoveryMatch = lines[2]?.match(
    /^Recovery Units:\s*(\d+(?:\.\d+)?)$/i
  );

  const recoveryCorrect =
    !!recoveryMatch &&
    Number(recoveryMatch[1]) === 5;

  checks.push({
    id: "RECOVERY_UNITS",
    name: "Correct final recovery availability",
    passed: recoveryCorrect,
    weight: 1.5,
    reason:
      recoveryCorrect
        ? "Final available recovery units are 5."
        : "Final available recovery units should be 5.",
  });

  // =========================================================
  // 5. LOWEST RESOURCE
  // =========================================================

  const lowestMatch = lines[3]?.match(
    /^Lowest Resource:\s*(.+)$/i
  );

  const lowestResource = lowestMatch
    ? lowestMatch[1].trim().toLowerCase()
    : "";

  const lowestCorrect =
    lowestResource === "analysis" ||
    lowestResource === "analysis hours";

  checks.push({
    id: "LOWEST_RESOURCE",
    name: "Identifies the lowest resource",
    passed: lowestCorrect,
    weight: 1.5,
    reason:
      lowestCorrect
        ? "Analysis has the lowest final availability at 4 hours."
        : "Analysis has the lowest final availability.",
  });

  // =========================================================
  // 6. ALL RESOURCES AVAILABLE
  // =========================================================

  const availabilityMatch = lines[4]?.match(
    /^All Resources Available:\s*(Yes|No)$/i
  );

  const availabilityCorrect =
    !!availabilityMatch &&
    availabilityMatch[1].toLowerCase() === "yes";

  checks.push({
    id: "ALL_RESOURCES_AVAILABLE",
    name: "Correctly determines resource availability",
    passed: availabilityCorrect,
    weight: 1.5,
    reason:
      availabilityCorrect
        ? "All three resources remain above zero."
        : "All three resources remain available at the end of Thursday.",
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