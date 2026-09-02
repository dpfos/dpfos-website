export function validateTestDefinition(test) {
  const errors = [];

  if (!test || typeof test !== "object") {
    return {
      valid: false,
      errors: ["Test definition must be an object."],
    };
  }

  // =========================================================
  // ID
  // =========================================================

  if (!test.id || typeof test.id !== "string") {
    errors.push("Test must have a valid id.");
  }

  // =========================================================
  // NAME
  // =========================================================

  if (!test.name || typeof test.name !== "string") {
    errors.push("Test must have a valid name.");
  }

  // =========================================================
  // DOMAIN
  // =========================================================

  if (!test.domain || typeof test.domain !== "string") {
    errors.push("Test must have a valid domain.");
  }

  // =========================================================
  // PROMPT
  // =========================================================

  if (!test.prompt || typeof test.prompt !== "string") {
    errors.push("Test must have a valid prompt.");
  }

  // =========================================================
  // EVALUATOR
  // =========================================================

  if (typeof test.evaluator !== "function") {
    errors.push("Test must provide an evaluator function.");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}