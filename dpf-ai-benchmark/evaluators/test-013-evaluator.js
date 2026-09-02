export default function evaluateTest013(responseText) {
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
  // The study is observational.
  //
  // Players were not randomly assigned.
  // Coaches selected players based on initial performance
  // and development needs.
  //
  // Therefore:
  //
  // Causality is NOT established.
  //
  // Main limitation:
  // non-random assignment / confounding / pre-existing
  // differences between groups.
  //
  // Supported:
  // Group A showed greater average improvement (+12%)
  // than Group B (+7%) under the observed conditions.
  //
  // Unsupported:
  // The new program caused the additional improvement.
  //
  // Evidence type:
  // Observational.
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
  // 2. CAUSAL CONCLUSION
  // =========================================================

  const causalMatch = lines[0]?.match(
    /^Causal Conclusion:\s*(.+)$/i
  );

  const causalText = causalMatch
    ? causalMatch[1].trim().toLowerCase()
    : "";

  const causalCorrect =
    causalText === "not established";

  checks.push({
    id: "CAUSAL_CONCLUSION",
    name: "Avoids unsupported causal claim",
    passed: causalCorrect,
    weight: 2,
    reason:
      causalCorrect
        ? "The observational data does not establish causation."
        : "The data does not establish that the training program caused the improvement.",
  });

  // =========================================================
  // 3. MAIN LIMITATION
  // =========================================================

  const limitationMatch = lines[1]?.match(
    /^Main Limitation:\s*(.+)$/i
  );

  const limitationText = limitationMatch
    ? limitationMatch[1].toLowerCase()
    : "";

  const mentionsNonRandom =
    limitationText.includes("non-random") ||
    limitationText.includes("nonrandom") ||
    limitationText.includes("not randomly") ||
    limitationText.includes("random");

  const mentionsConfounding =
    limitationText.includes("confound") ||
    limitationText.includes("pre-existing") ||
    limitationText.includes("preexisting") ||
    limitationText.includes("different before");

  const limitationCorrect =
    mentionsNonRandom ||
    mentionsConfounding;

  checks.push({
    id: "MAIN_LIMITATION",
    name: "Identifies the main methodological limitation",
    passed: limitationCorrect,
    weight: 2,
    reason:
      limitationCorrect
        ? "The response identifies non-random assignment or pre-existing/confounding differences."
        : "The main limitation is non-random assignment and potential confounding.",
  });

  // =========================================================
// 4. SUPPORTED FINDING
// =========================================================

const supportedMatch = lines[2]?.match(
  /^Supported Finding:\s*(.+)$/i
);

const supportedText = supportedMatch
  ? supportedMatch[1].toLowerCase()
  : "";

const mentionsGroupA =
  supportedText.includes("group a");

const mentionsGreater =
  supportedText.includes("greater") ||
  supportedText.includes("higher") ||
  supportedText.includes("more") ||
  supportedText.includes("improved") ||
  supportedText.includes("improvement");

const mentionsPerformance =
  supportedText.includes("performance") ||
  supportedText.includes("improvement");


const supportedCorrect =
  mentionsGroupA &&
  mentionsGreater &&
  mentionsPerformance;

checks.push({
  id: "SUPPORTED_FINDING",
  name: "States an evidence-supported finding",
  passed: supportedCorrect,
  weight: 1.5,
  reason:
    supportedCorrect
      ? "The response correctly states that Group A showed greater performance improvement; the exact 12% figure is optional."
      : "The response should state that Group A showed greater performance improvement.",
});

  // =========================================================
  // 5. UNSUPPORTED CONCLUSION
  // =========================================================

  const unsupportedMatch = lines[3]?.match(
    /^Unsupported Conclusion:\s*(.+)$/i
  );

  const unsupportedText = unsupportedMatch
    ? unsupportedMatch[1].toLowerCase()
    : "";

  const mentionsCausation =
    unsupportedText.includes("caus") ||
    unsupportedText.includes("caused") ||
    unsupportedText.includes("cause");

  const mentionsProgram =
    unsupportedText.includes("program") ||
    unsupportedText.includes("training");

  const unsupportedCorrect =
    mentionsCausation &&
    mentionsProgram;

  checks.push({
    id: "UNSUPPORTED_CONCLUSION",
    name: "Identifies the unsupported causal conclusion",
    passed: unsupportedCorrect,
    weight: 1.5,
    reason:
      unsupportedCorrect
        ? "The response correctly identifies causal attribution to the new program as unsupported."
        : "The unsupported conclusion is that the new program caused the improvement.",
  });

  // =========================================================
  // 6. EVIDENCE TYPE
  // =========================================================

  const evidenceMatch = lines[4]?.match(
    /^Evidence Type:\s*(Observational|Experimental)$/i
  );

  const evidenceCorrect =
    !!evidenceMatch &&
    evidenceMatch[1].toLowerCase() === "observational";

  checks.push({
    id: "EVIDENCE_TYPE",
    name: "Correctly identifies evidence type",
    passed: evidenceCorrect,
    weight: 1,
    reason:
      evidenceCorrect
        ? "The evidence is observational."
        : "The study is observational, not experimental.",
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