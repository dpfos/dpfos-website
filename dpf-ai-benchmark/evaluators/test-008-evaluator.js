export default function evaluateTest008(responseText) {
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
  // A = 2 days
  // B = 3 days after A
  // C = 1 day after A
  // D = 2 days after B and C
  //
  // Critical path:
  // A -> B -> D
  //
  // Duration:
  // 2 + 3 + 2 = 7 days
  //
  // Earliest completion:
  // Day 7
  //
  // C is non-critical.
  //
  // Slack:
  // C normally finishes after Day 3.
  // C can finish as late as Day 5 without delaying D.
  // Therefore, C has 2 days of slack.
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
  // 2. CRITICAL PATH
  // =========================================================

  const criticalPathMatch = lines[0]?.match(
  /^Critical Path:\s*(.+)$/i
);

const criticalPath = criticalPathMatch
  ? criticalPathMatch[1]
      .replace(/\bTask\s+/gi, "")
      .replace(/\s*→\s*/g, "->")
      .replace(/\s*->\s*/g, "->")
      .replace(/\s+/g, "")
      .toUpperCase()
  : "";

const criticalPathCorrect =
  criticalPath === "A->B->D";

checks.push({
  id: "CRITICAL_PATH",
  name: "Correct critical path",
  passed: criticalPathCorrect,
  weight: 2,
  reason:
    criticalPathCorrect
      ? "The critical path is A → B → D."
      : "The critical path should be A → B → D.",
});

  // =========================================================
  // 3. PROJECT DURATION
  // =========================================================

  const durationMatch = lines[1]?.match(
    /^Project Duration:\s*(\d+)\s*days?$/i
  );

  const durationCorrect =
    !!durationMatch &&
    Number(durationMatch[1]) === 7;

  checks.push({
    id: "PROJECT_DURATION",
    name: "Correct project duration",
    passed: durationCorrect,
    weight: 2,
    reason:
      durationCorrect
        ? "The critical path requires 7 working days."
        : "The project duration should be 7 working days.",
  });

  // =========================================================
  // 4. EARLIEST COMPLETION
  // =========================================================

  const completionMatch = lines[2]?.match(
    /^Earliest Completion:\s*Day\s*(\d+)$/i
  );

  const completionCorrect =
    !!completionMatch &&
    Number(completionMatch[1]) === 7;

  checks.push({
    id: "EARLIEST_COMPLETION",
    name: "Correct earliest completion",
    passed: completionCorrect,
    weight: 1.5,
    reason:
      completionCorrect
        ? "The project can finish at the end of Day 7."
        : "The earliest possible completion is Day 7.",
  });

  // =========================================================
  // 5. NON-CRITICAL TASK
  // =========================================================

  const nonCriticalMatch = lines[3]?.match(
    /^Non-Critical Task:\s*(.+)$/i
  );

  const nonCriticalTask = nonCriticalMatch
    ? nonCriticalMatch[1]
        .replace(/\bTask\s+/gi, "")
        .trim()
        .toUpperCase()
    : "";

  const nonCriticalCorrect =
    nonCriticalTask === "C";

  checks.push({
    id: "NON_CRITICAL_TASK",
    name: "Correct non-critical task",
    passed: nonCriticalCorrect,
    weight: 1.5,
    reason:
      nonCriticalCorrect
        ? "Task C is the non-critical task."
        : "Task C is the non-critical task.",
  });

  // =========================================================
  // 6. SLACK
  // =========================================================

  const slackMatch = lines[4]?.match(
    /^Slack:\s*(\d+)\s*days?$/i
  );

  const slackCorrect =
    !!slackMatch &&
    Number(slackMatch[1]) === 2;

  checks.push({
    id: "SLACK",
    name: "Correct task slack",
    passed: slackCorrect,
    weight: 1.5,
    reason:
      slackCorrect
        ? "Task C has 2 days of slack."
        : "Task C should have 2 days of slack.",
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