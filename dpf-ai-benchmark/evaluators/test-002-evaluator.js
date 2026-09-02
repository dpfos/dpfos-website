export function evaluateTest002(responseText) {
  const raw = responseText.trim();
  const lines = raw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const checks = [];

  // =========================================================
  // 1. EXACTLY 5 LINES
  // =========================================================

  const exactlyFiveLines = lines.length === 5;

  checks.push({
    id: "LINE_COUNT",
    name: "Exactly 5 output lines",
    passed: exactlyFiveLines,
    weight: 2,
    reason: exactlyFiveLines
      ? "Output contains exactly five non-empty lines."
      : `Output contains ${lines.length} non-empty lines instead of five.`,
  });

  // =========================================================
  // 2. NO BULLETS / NUMBERING
  // =========================================================

  const hasForbiddenFormatting = lines.some((line) =>
    /^[-*•]\s/.test(line) ||
    /^\d+[.)]\s/.test(line)
  );

  const formattingCorrect = !hasForbiddenFormatting;

  checks.push({
    id: "FORMATTING",
    name: "No bullets or numbering",
    passed: formattingCorrect,
    weight: 1,
    reason: formattingCorrect
      ? "No bullets or numbering detected."
      : "Bullet or numbered formatting was detected.",
  });

  // =========================================================
  // 3. REQUIRED VALUES
  // =========================================================

  const requiredValuesCorrect =
    lines[0]?.includes("Northbridge FC") &&
    lines[1]?.includes("Premier Division") &&
    lines[2]?.includes("Bristol") &&
    lines[3]?.includes("Daniel Reed") &&
    lines[4]?.includes("24");

  checks.push({
    id: "REQUIRED_VALUES",
    name: "Required values appear in the correct lines",
    passed: requiredValuesCorrect,
    weight: 2,
    reason: requiredValuesCorrect
      ? "All required values appear in the required positions."
      : "One or more required values are missing or misplaced.",
  });

  // =========================================================
  // 4. FORBIDDEN INFORMATION
  // =========================================================

  const forbiddenInformation =
    raw.includes("1998") ||
    raw.includes("Academy") ||
    raw.includes("academy") ||
    raw.includes("7");

  const noForbiddenInformation = !forbiddenInformation;

  checks.push({
    id: "FORBIDDEN_INFORMATION",
    name: "Does not include forbidden information",
    passed: noForbiddenInformation,
    weight: 2,
    reason: noForbiddenInformation
      ? "Found no forbidden source information."
      : "The response includes information explicitly prohibited by the instructions.",
  });

  // =========================================================
  // 5. NO EXTRA CONTENT
  // =========================================================

  const extraContent =
    raw.toLowerCase().includes("title:") ||
    raw.toLowerCase().includes("introduction") ||
    raw.toLowerCase().includes("conclusion:") ||
    raw.toLowerCase().includes("here is") ||
    raw.toLowerCase().includes("sure") ||
    raw.toLowerCase().includes("certainly");

  const noExtraContent = !extraContent;

  checks.push({
    id: "NO_EXTRA_CONTENT",
    name: "Contains no extra commentary",
    passed: noExtraContent,
    weight: 1,
    reason: noExtraContent
      ? "No extra commentary or wrapper text detected."
      : "Extra commentary was detected.",
  });

  // =========================================================
  // 6. NO HALLUCINATED INFORMATION
  // =========================================================

  const allowedValues = [
    "Northbridge FC",
    "Premier Division",
    "Bristol",
    "Daniel Reed",
    "24",
  ];

  const suspiciousLines = lines.filter((line) => {
    return !allowedValues.some((value) =>
      line.includes(value)
    );
  });

  const noHallucination =
    suspiciousLines.length === 0;

  checks.push({
    id: "NO_HALLUCINATION",
    name: "Uses only allowed source values",
    passed: noHallucination,
    weight: 2,
    reason: noHallucination
      ? "All output lines use allowed source values."
      : "One or more lines contain unexpected information.",
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

  const status =
    score >= 8
      ? "PASS"
      : score >= 6
        ? "PARTIAL"
        : "FAIL";

  return {
    score,
    maxScore: 10,
    status,

    checks: {
      total: checks.length,
      passed: passedChecks,
      failed: checks.length - passedChecks,
    },

    details: checks,
  };
}
