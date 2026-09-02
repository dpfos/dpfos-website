export class OpenAIAdapter {
  constructor() {
    this.provider = "openai";
    this.enabled = false;
  }

  async generate() {
    throw new Error(
      "OpenAI adapter is registered but currently disabled."
    );
  }
}