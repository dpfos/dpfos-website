import { GeminiAdapter } from "../adapters/gemini-adapter.js";
import { OpenAIAdapter } from "../adapters/openai-adapter.js";
import { TokenRouterAdapter } from "../adapters/tokenrouter-adapter.js";

import { modelRegistry } from "./model-registry.js";

export function createModelAdapter(modelId, env) {
  const config = modelRegistry[modelId];

  if (!config) {
    throw new Error(`Model "${modelId}" is not registered.`);
  }

  if (!config.enabled) {
    throw new Error(`Model "${modelId}" is currently disabled.`);
  }

  switch (config.adapter) {
    case "gemini":
      return new GeminiAdapter({
        apiKey: env.GEMINI_API_KEY,
        model: config.model,
      });

    case "openai":
      return new OpenAIAdapter();

    case "tokenrouter":
      return new TokenRouterAdapter({
        apiKey: env.TOKENROUTER_API_KEY,
        model: config.model,
      });

    default:
      throw new Error(
        `No adapter implementation exists for "${config.adapter}".`
      );
  }
}