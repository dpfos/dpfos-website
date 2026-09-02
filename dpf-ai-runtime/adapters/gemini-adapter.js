import { GoogleGenAI } from "@google/genai";

export class GeminiAdapter {
  constructor({ apiKey, model }) {
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is missing.");
    }

    if (!model) {
      throw new Error("Gemini model is required.");
    }

    this.client = new GoogleGenAI({
      apiKey,
    });

    this.model = model;
    this.provider = "google";
    this.enabled = true;
  }

  async generate(prompt) {
    if (!prompt || typeof prompt !== "string") {
      throw new Error(
        "Prompt must be a non-empty string."
      );
    }

    const response =
      await this.client.models.generateContent({
        model: this.model,
        contents: prompt,
      });

    return {
      provider: this.provider,
      model: this.model,
      text: response.text ?? "",
      raw: response,
    };
  }
}