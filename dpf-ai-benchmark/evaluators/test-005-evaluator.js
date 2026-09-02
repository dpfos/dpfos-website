export default function evaluateTest005(responseText) {
  const lines = responseText
    .trim()
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const checks = [];

  // =========================================================
  // EXPECTED EARLIEST SCHEDULE
  // =========================================================
  //
  // A: Day 1-1
  // B: Day 2-3
  // C: Day 4-5
  // D: Day 4-5
  // E: Day 6-6
  // F: Day 7-8
  // G: Day 9-9
  //
  // Total = 9 days
  // =========================================================

  const expected = [
    { task: "A", start: 1, finish: 1 },
    { task: "B", start: 2, finish: 3 },
    { task: "C", start: 4, finish: 5 },
    { task: "D", start: 4, finish: 5 },
    { task: "E", start: 6, finish: 6 },
    { task: "F", start: 7, finish: 8 },
    { task: "G", start: 9, finish: 9 },
  ];

  // =========================================================
  // 1. EXACT LINE COUNT
  // =========================================================

  checks.push({
    id: "LINE_COUNT",
    name: "Exactly 8 output lines",
    passed: lines.length === 8,
    weight: 1,
    reason:
      lines.length === 8
        ? "Output contains exactly eight lines."
        : `Expected 8 lines but received ${lines.length}.`,
  });

  // =========================================================
  // 2-8. TASK SCHEDULE CHECKS
  // =========================================================

  for (let i = 0; i < expected.length; i++) {
    const item = expected[i];

    const pattern = new RegExp(
      `^${item.task}:\\s*Day\\s+(\\d+)\\s*-\\s*(\\d+)$`,
      "i"
    );

    const match = lines[i]?.match(pattern);

    const correct =
      !!match &&
      Number(match[1]) === item.start &&
      Number(match[2]) === item.finish;

    checks.push({
      id: `TASK_${item.task}`,
      name: `Correct schedule for Task ${item.task}`,
      passed: correct,
      weight: 1,
      reason: correct
        ? `Task ${item.task} is scheduled on the earliest valid days.`
        : `Task ${item.task} is not scheduled on the expected earliest valid days.`,
    });
  }

  // =========================================================
  // 9. PROJECT DURATION
  // =========================================================

  const durationMatch = lines[7]?.match(
    /^Project Duration:\s*(\d+)\s*days?$/i
  );

  const durationCorrect =
    !!durationMatch &&
    Number(durationMatch[1]) === 9;

  checks.push({
    id: "PROJECT_DURATION",
    name: "Correct total project duration",
    passed: durationCorrect,
    weight: 2,
    reason: durationCorrect
      ? "The earliest possible project duration is 9 days."
      : "The project duration is incorrect.",
  });

  // =========================================================
  // 10. DEPENDENCY VALIDATION
  // =========================================================

  const schedule = {};

  for (let i = 0; i < expected.length; i++) {
    const match = lines[i]?.match(
      /^[A-G]:\s*Day\s+(\d+)\s*-\s*(\d+)$/i
    );

    if (match) {
      const task = lines[i][0].toUpperCase();

      schedule[task] = {
        start: Number(match[1]),
        finish: Number(match[2]),
      };
    }
  }

  const dependenciesCorrect =
    schedule.A &&
    schedule.B &&
    schedule.C &&
    schedule.D &&
    schedule.E &&
    schedule.F &&
    schedule.G &&
    schedule.B.start > schedule.A.finish &&
    schedule.C.start > schedule.B.finish &&
    schedule.D.start > schedule.B.finish &&
    schedule.E.start > schedule.D.finish &&
    schedule.F.start > schedule.C.finish &&
    schedule.F.start > schedule.E.finish &&
    schedule.G.start > schedule.F.finish;

  checks.push({
    id: "DEPENDENCIES",
    name: "Respects all task dependencies",
    passed: dependenciesCorrect,
    weight: 2,
    reason: dependenciesCorrect
      ? "All task dependencies are respected."
      : "One or more task dependencies are violated.",
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