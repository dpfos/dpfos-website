import { DPFAgent } from "./dpf-agent.js";

export class DPFEngine {
  constructor({
    model,
    adapter,
  }) {
    if (!model) {
      throw new Error(
        "AI model is required."
      );
    }

    if (!adapter) {
      throw new Error(
        "AI adapter is required."
      );
    }

    this.model = model;
    this.adapter = adapter;

    this.agent =
      new DPFAgent({
        model,
        adapter,
      });
  }

  async run({
    prompt,
    contextOptions = {},
  }) {
    if (
      !prompt ||
      typeof prompt !== "string"
    ) {
      throw new Error(
        "Prompt must be a non-empty string."
      );
    }

    return this.agent.run({
      prompt,
      contextOptions,
    });
  }
}