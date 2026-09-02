export default function evaluateTest010(responseText) {
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
  // Rule 1:
  // Every player selected for Match A must be registered.
  //
  // Statement 2:
  // Player X is selected.
  //
  // Statement 3:
  // Player X is not registered.
  //
  // Therefore X creates a direct contradiction.
  //
  // Statements 2 and 3 are the contradictory pair.
  //
  // Player Y is registered but not selected.
  // This creates no contradiction.
  //
  // Removing or changing either statement 2 or 3 resolves
  // the contradiction.
  //
  // Minimum changes = 1.
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
  // 2. CONSISTENCY
  // =========================================================

  const consistencyMatch = lines[0]?.match(
    /^Consistency:\s*(Consistent|Inconsistent)$/i
  );

  const consistencyCorrect =
    !!consistencyMatch &&
    consistencyMatch[1].toLowerCase() === "inconsistent";

  checks.push({
    id: "CONSISTENCY",
    name: "Correct consistency conclusion",
    passed: consistencyCorrect,
    weight: 2,
    reason:
      consistencyCorrect
        ? "The statements are logically inconsistent."
        : "The statement set is logically inconsistent.",
  });

  // =========================================================
  // 3. CONTRADICTORY PLAYER
  // =========================================================

  const playerMatch = lines[1]?.match(
    /^Contradictory Player:\s*(.+)$/i
  );

  const contradictoryPlayer = playerMatch
    ? playerMatch[1].trim().toLowerCase()
    : "";

  const playerCorrect =
    contradictoryPlayer === "player x" ||
    contradictoryPlayer === "x";

  checks.push({
    id: "CONTRADICTORY_PLAYER",
    name: "Identifies the contradictory player",
    passed: playerCorrect,
    weight: 2,
    reason:
      playerCorrect
        ? "Player X is involved in the contradiction."
        : "Player X is the player involved in the contradiction.",
  });

  // =========================================================
  // 4. CONTRADICTORY STATEMENTS
  // =========================================================

  const statementsMatch = lines[2]?.match(
    /^Contradictory Statements:\s*(.+)$/i
  );

  const statementsText = statementsMatch
    ? statementsMatch[1].replace(/\s+/g, "")
    : "";

  const statementsCorrect =
    statementsText === "2,3" ||
    statementsText === "2and3" ||
    statementsText === "2&3";

  checks.push({
    id: "CONTRADICTORY_STATEMENTS",
    name: "Identifies contradictory statements",
    passed: statementsCorrect,
    weight: 2,
    reason:
      statementsCorrect
        ? "Statements 2 and 3 create the contradiction."
        : "Statements 2 and 3 create the contradiction.",
  });

  // =========================================================
  // 5. PLAYER Y
  // =========================================================

  const playerYMatch = lines[3]?.match(
    /^Player Y Status:\s*(.+)$/i
  );

  const playerYStatus = playerYMatch
    ? playerYMatch[1].trim().toLowerCase()
    : "";

  const playerYCorrect =
    playerYStatus === "no contradiction";

  checks.push({
    id: "PLAYER_Y_STATUS",
    name: "Correctly evaluates Player Y",
    passed: playerYCorrect,
    weight: 1.5,
    reason:
      playerYCorrect
        ? "Player Y creates no contradiction."
        : "Player Y does not create a contradiction.",
  });

  // =========================================================
  // 6. MINIMUM CHANGES
  // =========================================================

  const changesMatch = lines[4]?.match(
    /^Minimum Changes:\s*(\d+)$/i
  );

  const changesCorrect =
    !!changesMatch &&
    Number(changesMatch[1]) === 1;

  checks.push({
    id: "MINIMUM_CHANGES",
    name: "Correct minimum change count",
    passed: changesCorrect,
    weight: 1,
    reason:
      changesCorrect
        ? "Changing or removing either contradictory statement resolves the contradiction."
        : "Only one statement needs to be changed or removed.",
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