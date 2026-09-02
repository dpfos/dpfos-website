export class OllamaAdapter {
  constructor({
    model = "qwen3.5:4b",
    baseUrl = "http://localhost:11434",
  } = {}) {
    if (!model) {
      throw new Error("Ollama model is required.");
    }

    this.provider = "ollama";
    this.enabled = true;
    this.model = model;
    this.baseUrl = baseUrl.replace(/\/$/, "");
  }

  async generate(prompt) {
    if (!prompt || typeof prompt !== "string") {
      throw new Error("Prompt must be a non-empty string.");
    }

    const startedAt = Date.now();

    const response = await fetch(
      `${this.baseUrl}/api/generate`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          model: this.model,
          prompt,

          stream: false,
          think: false,
          keep_alive: "10m",

          options: {
            temperature: 0,

            // Faster response for interactive ASK requests
            num_predict: 256,

            // Avoid unnecessarily large context allocation
            num_ctx: 2048,
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data?.error ||
          "Ollama API request failed."
      );
    }

    const text = data?.response ?? "";

    if (!text.trim()) {
      throw new Error(
        "Ollama returned an empty model response."
      );
    }

    return {
      provider: this.provider,
      model: this.model,
      text,
      raw: data,

      performance: {
        totalMs: Date.now() - startedAt,
        promptTokens:
          data?.prompt_eval_count ?? null,
        outputTokens:
          data?.eval_count ?? null,
        promptEvalMs:
          data?.prompt_eval_duration
            ? Math.round(
                data.prompt_eval_duration / 1_000_000
              )
            : null,
        generationMs:
          data?.eval_duration
            ? Math.round(
                data.eval_duration / 1_000_000
              )
            : null,
      },
    };
  }
}