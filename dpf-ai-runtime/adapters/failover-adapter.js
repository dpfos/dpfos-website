export class FailoverAdapter {
  constructor({
    adapters = [],
  }) {
    this.adapters =
      adapters.filter(Boolean);

    if (!this.adapters.length) {
      throw new Error(
        "At least one AI adapter is required."
      );
    }

    this.provider = "failover";
    this.enabled = true;
  }

  async generate(prompt) {
    if (!prompt || typeof prompt !== "string") {
      throw new Error(
        "Prompt must be a non-empty string."
      );
    }

    const failures = [];

    for (const adapter of this.adapters) {
      try {
        if (
          adapter.enabled === false
        ) {
          continue;
        }

        const result =
          await adapter.generate(prompt);

        if (
          !result ||
          typeof result.text !== "string" ||
          !result.text.trim()
        ) {
          throw new Error(
            "Adapter returned an empty response."
          );
        }

        return {
          ...result,

          failover: {
            attempted: failures.length,
            fallbackUsed:
              failures.length > 0,
          },

          failures,
        };

      } catch (error) {
        console.warn(
          `[DPF AI] ${adapter.provider} failed:`,
          error.message
        );

        failures.push({
          provider:
            adapter.provider ||
            "unknown",

          model:
            adapter.model ||
            null,

          status:
            error.status ||
            null,

          message:
            error.message ||
            "Unknown provider error.",
        });
      }
    }

    const finalError =
      new Error(
        "All configured AI providers failed."
      );

    finalError.failures = failures;

    throw finalError;
  }
}