export class TokenRouterAdapter {
  constructor({
    apiKey,
    model,
    baseUrl = "https://api.tokenrouter.com/v1",
  }) {
    if (!apiKey) {
      throw new Error(
        "TOKENROUTER_API_KEY is missing."
      );
    }

    if (!model) {
      throw new Error(
        "TokenRouter model is missing."
      );
    }

    this.provider = "tokenrouter";
    this.enabled = true;
    this.apiKey = apiKey;
    this.model = model;
    this.baseUrl = baseUrl.replace(/\/$/, "");
  }

  async generate(prompt) {
    if (!prompt || typeof prompt !== "string") {
      throw new Error(
        "Prompt must be a non-empty string."
      );
    }

    const response = await fetch(
      `${this.baseUrl}/chat/completions`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization:
            `Bearer ${this.apiKey}`,
        },

        body: JSON.stringify({
          model: this.model,

          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],

          temperature: 0,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      const error = new Error(
        data?.error?.message ||
        data?.message ||
        "TokenRouter API request failed."
      );

      error.status = response.status;
      error.provider = this.provider;
      error.raw = data;

      throw error;
    }

    const content =
      data?.choices?.[0]?.message?.content;

    if (!content) {
      const error = new Error(
        "TokenRouter returned an empty model response."
      );

      error.provider = this.provider;

      throw error;
    }

    return {
      provider: this.provider,
      model: this.model,
      text: content,
      raw: data,
    };
  }
}