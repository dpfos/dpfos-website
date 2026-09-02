export function evaluateTest(test, responseText) {
  if (!test || !responseText) {
    throw new Error("Test definition and response are required.");
  }

  if (typeof test.evaluator !== "function") {
    throw new Error(`No evaluator defined for ${test.id}.`);
  }

  const result = test.evaluator(responseText);

  return {
    testId: test.id,
    score: result.score,
    maxScore: result.maxScore ?? 10,
    status: result.status,
    checks: result.checks ?? null,
    details: result.details ?? [],
    evaluatedAt: new Date().toISOString(),
  };
}