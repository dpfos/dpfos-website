export default function evaluateTest014(responseText) {
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
  // Player D:
  // Week 1 = 79
  // Week 2 = 80
  // Week 3 = 42
  // Week 4 = 81
  //
  // The anomalous value is 42 in Week 3.
  //
  // Normal observed range outside anomaly:
  // 79-81
  //
  // The data does not establish a cause.
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
  // 2. ANOMALOUS PLAYER
  // =========================================================

  const playerMatch = lines[0]?.match(
    /^Anomalous Player:\s*([A-E])$/i
  );

  const playerCorrect =
    !!playerMatch &&
    playerMatch[1].toUpperCase() === "D";

  checks.push({
    id: "ANOMALOUS_PLAYER",
    name: "Identifies anomalous player",
    passed: playerCorrect,
    weight: 2,
    reason:
      playerCorrect
        ? "Player D contains the clearest performance anomaly."
        : "Player D is the anomalous player.",
  });

  // =========================================================
  // 3. ANOMALOUS WEEK
  // =========================================================

  const weekMatch = lines[1]?.match(
    /^Anomalous Week:\s*Week\s*(\d+)$/i
  );

  const weekCorrect =
    !!weekMatch &&
    Number(weekMatch[1]) === 3;

  checks.push({
    id: "ANOMALOUS_WEEK",
    name: "Identifies anomalous week",
    passed: weekCorrect,
    weight: 1.5,
    reason:
      weekCorrect
        ? "The anomaly occurred in Week 3."
        : "The anomaly occurred in Week 3.",
  });

  // =========================================================
  // 4. ANOMALOUS VALUE
  // =========================================================

  const valueMatch = lines[2]?.match(
    /^Anomalous Value:\s*(\d+(?:\.\d+)?)$/i
  );

  const valueCorrect =
    !!valueMatch &&
    Number(valueMatch[1]) === 42;

  checks.push({
    id: "ANOMALOUS_VALUE",
    name: "Identifies anomalous value",
    passed: valueCorrect,
    weight: 1.5,
    reason:
      valueCorrect
        ? "The anomalous performance value is 42."
        : "The anomalous performance value is 42.",
  });

  // =========================================================
  // 5. TYPICAL RANGE
  // =========================================================

  const rangeMatch = lines[3]?.match(
    /^Typical Range:\s*(.+)$/i
  );

  const rangeText = rangeMatch
    ? rangeMatch[1]
        .replace(/\s+/g, "")
        .replace(/–/g, "-")
        .replace(/to/gi, "-")
    : "";

  const rangeCorrect =
    rangeText === "79-81" ||
    rangeText === "79–81";

  checks.push({
    id: "TYPICAL_RANGE",
    name: "Correctly identifies typical range",
    passed: rangeCorrect,
    weight: 1.5,
    reason:
      rangeCorrect
        ? "Player D's other observed values range from 79 to 81."
        : "Player D's typical observed range is 79-81.",
  });

  // =========================================================
  // 6. CAUSE
  // =========================================================

  const causeMatch = lines[4]?.match(
    /^Cause Established:\s*(Yes|No)$/i
  );

  const causeCorrect =
    !!causeMatch &&
    causeMatch[1].toLowerCase() === "no";

  checks.push({
    id: "CAUSE_ESTABLISHED",
    name: "Avoids unsupported causal inference",
    passed: causeCorrect,
    weight: 1.5,
    reason:
      causeCorrect
        ? "The data identifies an anomaly but does not establish its cause."
        : "The data does not establish the cause of the anomaly.",
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