export default function evaluateTest007(responseText) {
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
  // Possession: 63 - 54 = +9 percentage points
  // Shots: 18 - 10 = +8
  // Goals: 3 - 1 = +2
  // PPDA: 8 - 14 = -6 => Decreased
  //
  // Largest absolute numerical change = Possession (+9)
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
// 2. POSSESSION CHANGE
// =========================================================

const possessionMatch = lines[0]?.match(
  /^Possession Change:\s*([+-]?\d+)(?:\s*%|\s*percentage points?)?$/i
);

const possessionCorrect =
  !!possessionMatch &&
  Number(possessionMatch[1]) === 9;

checks.push({
  id: "POSSESSION",
  name: "Correct possession change",
  passed: possessionCorrect,
  weight: 1.5,
  reason:
    possessionCorrect
      ? "Possession increased by 9 percentage points."
      : "Possession change is incorrect.",
});

  // =========================================================
  // 3. SHOTS CHANGE
  // =========================================================

  const shotsMatch = lines[1]?.match(
    /^Shots Change:\s*([+-]?\d+)$/i
  );

  const shotsCorrect =
    !!shotsMatch &&
    Number(shotsMatch[1]) === 8;

  checks.push({
    id: "SHOTS",
    name: "Correct shots change",
    passed: shotsCorrect,
    weight: 1.5,
    reason:
      shotsCorrect
        ? "Shots increased by 8."
        : "Shots change is incorrect.",
  });

  // =========================================================
  // 4. GOALS CHANGE
  // =========================================================

  const goalsMatch = lines[2]?.match(
    /^Goals Change:\s*([+-]?\d+)$/i
  );

  const goalsCorrect =
    !!goalsMatch &&
    Number(goalsMatch[1]) === 2;

  checks.push({
    id: "GOALS",
    name: "Correct goals change",
    passed: goalsCorrect,
    weight: 1.5,
    reason:
      goalsCorrect
        ? "Goals increased by 2."
        : "Goals change is incorrect.",
  });

  // =========================================================
// 5. PPDA TREND
// =========================================================

const ppdaMatch = lines[3]?.match(
  /^PPDA Trend:\s*(Increased|Decreased),\s*([+-]?\d+)$/i
);

const ppdaCorrect =
  !!ppdaMatch &&
  ppdaMatch[1].toLowerCase() === "decreased" &&
  Math.abs(Number(ppdaMatch[2])) === 6;

checks.push({
  id: "PPDA",
  name: "Correct PPDA trend",
  passed: ppdaCorrect,
  weight: 1.5,
  reason:
    ppdaCorrect
      ? "PPDA decreased by 6."
      : "PPDA trend or magnitude is incorrect.",
});

  // =========================================================
  // 6. LARGEST NUMERICAL CHANGE
  // =========================================================

  const largestText = (lines[4] || "").toLowerCase();

  const largestCorrect =
    largestText.includes("possession") &&
    largestText.includes("9");

  checks.push({
    id: "LARGEST_CHANGE",
    name: "Identifies the largest numerical change",
    passed: largestCorrect,
    weight: 1.5,
    reason:
      largestCorrect
        ? "Possession had the largest absolute numerical change at 9."
        : "The largest numerical change was not correctly identified.",
  });

  // =========================================================
  // 7. OVERALL TREND
  // =========================================================

  const overall = (lines[5] || "").toLowerCase();

  const recognizesPositiveTrend =
    (
      overall.includes("improv") ||
      overall.includes("positive") ||
      overall.includes("increas") ||
      overall.includes("improved")
    ) &&
    (
      overall.includes("possession") ||
      overall.includes("shots") ||
      overall.includes("goals")
    );

  const avoidsUnsupportedCausality =
    !overall.includes("caused") &&
    !overall.includes("because") &&
    !overall.includes("due to") &&
    !overall.includes("resulted from");

  const overallCorrect =
    recognizesPositiveTrend &&
    avoidsUnsupportedCausality;

  checks.push({
    id: "OVERALL_TREND",
    name: "Provides an evidence-based overall trend",
    passed: overallCorrect,
    weight: 1.5,
    reason:
      overallCorrect
        ? "Conclusion reflects the observed data without inventing causality."
        : "Conclusion is unsupported, incomplete, or introduces unsupported causality.",
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