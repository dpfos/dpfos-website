export default function evaluateTest009(responseText) {
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
  // Available hours = 10
  //
  // A = 4 hours × 8 = 32
  // B = 3 hours × 7 = 21
  // C = 3 hours × 6 = 18
  //
  // Total = 10 hours
  // Total value = 32 + 21 + 18 = 71
  //
  // Player C requests 5 hours but receives 3.
  // Therefore C has an unmet request.
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
  // 2. PLAYER A
  // =========================================================

  const playerAMatch = lines[0]?.match(
    /^Player A Hours:\s*(\d+(?:\.\d+)?)$/i
  );

  const playerACorrect =
    !!playerAMatch &&
    Number(playerAMatch[1]) === 4;

  checks.push({
    id: "PLAYER_A",
    name: "Correct Player A allocation",
    passed: playerACorrect,
    weight: 1.5,
    reason:
      playerACorrect
        ? "Player A receives 4 hours."
        : "Player A should receive 4 hours.",
  });

  // =========================================================
  // 3. PLAYER B
  // =========================================================

  const playerBMatch = lines[1]?.match(
    /^Player B Hours:\s*(\d+(?:\.\d+)?)$/i
  );

  const playerBCorrect =
    !!playerBMatch &&
    Number(playerBMatch[1]) === 3;

  checks.push({
    id: "PLAYER_B",
    name: "Correct Player B allocation",
    passed: playerBCorrect,
    weight: 1.5,
    reason:
      playerBCorrect
        ? "Player B receives 3 hours."
        : "Player B should receive 3 hours.",
  });

  // =========================================================
  // 4. PLAYER C
  // =========================================================

  const playerCMatch = lines[2]?.match(
    /^Player C Hours:\s*(\d+(?:\.\d+)?)$/i
  );

  const playerCCorrect =
    !!playerCMatch &&
    Number(playerCMatch[1]) === 3;

  checks.push({
    id: "PLAYER_C",
    name: "Correct Player C allocation",
    passed: playerCCorrect,
    weight: 1.5,
    reason:
      playerCCorrect
        ? "Player C receives the remaining 3 hours."
        : "Player C should receive 3 hours.",
  });

  // =========================================================
  // 5. TOTAL PERFORMANCE VALUE
  // =========================================================

  const valueMatch = lines[3]?.match(
    /^Total Performance Value:\s*(\d+(?:\.\d+)?)$/i
  );

  const valueCorrect =
    !!valueMatch &&
    Number(valueMatch[1]) === 71;

  checks.push({
    id: "TOTAL_VALUE",
    name: "Correct total performance value",
    passed: valueCorrect,
    weight: 2,
    reason:
      valueCorrect
        ? "Total performance value is 71 points."
        : "Total performance value should be 71 points.",
  });

  // =========================================================
  // 6. UNMET REQUEST
  // =========================================================

  const unmetMatch = lines[4]?.match(
    /^Unmet Request:\s*(.+)$/i
  );

  const unmetValue = unmetMatch
    ? unmetMatch[1].trim().toLowerCase()
    : "";

  const unmetCorrect =
    unmetValue === "player c" ||
    unmetValue === "c";

  checks.push({
    id: "UNMET_REQUEST",
    name: "Correct unmet request",
    passed: unmetCorrect,
    weight: 1.5,
    reason:
      unmetCorrect
        ? "Player C's full request cannot be satisfied."
        : "Player C is the player with an unmet request.",
  });

  // =========================================================
  // 7. RESOURCE CONSTRAINT
  // =========================================================

  let totalHours = null;

  if (
    playerAMatch &&
    playerBMatch &&
    playerCMatch
  ) {
    totalHours =
      Number(playerAMatch[1]) +
      Number(playerBMatch[1]) +
      Number(playerCMatch[1]);
  }

  const resourceConstraintCorrect =
    totalHours === 10;

  checks.push({
    id: "RESOURCE_CONSTRAINT",
    name: "Respects total resource constraint",
    passed: resourceConstraintCorrect,
    weight: 1.5,
    reason:
      resourceConstraintCorrect
        ? "The allocation uses exactly 10 available hours."
        : "The allocation must use exactly 10 available hours.",
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