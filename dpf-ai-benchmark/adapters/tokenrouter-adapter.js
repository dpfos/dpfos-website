export class TokenRouterAdapter {
  constructor({
    apiKey,
    model,
    baseUrl = "https://api.tokenrouter.com/v1",
  }) {
    if (!apiKey) {
      throw new Error("TOKENROUTER_API_KEY is missing.");
    }

    if (!model) {
      throw new Error("TokenRouter model is missing.");
    }

    this.provider = "tokenrouter";
    this.enabled = true;
    this.apiKey = apiKey;
    this.model = model;
    this.baseUrl = baseUrl.replace(/\/$/, "");
  }

  async generate(prompt) {
    if (!prompt) {
      throw new Error("Prompt is required.");
    }

    const response = await fetch(
      `${this.baseUrl}/chat/completions`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
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
      throw new Error(
        JSON.stringify({
          code: response.status,
          message:
            data?.error?.message ||
            data?.message ||
            "TokenRouter API request failed.",
          status: data?.error?.type || "API_ERROR",
        })
      );
    }

    const content =
      data?.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error(
        "TokenRouter returned an empty model response."
      );
    }

    return content;
  }
}