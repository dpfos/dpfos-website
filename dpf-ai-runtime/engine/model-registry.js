export const modelRegistry = {
  "qwen3.5-4b": {
    provider: "ollama",
    adapter: "ollama",
    model: "qwen3.5:4b",
    enabled: true,
    local: true,
  },

  "gemini-3.6-flash": {
    provider: "google",
    adapter: "gemini",
    model: "gemini-3.6-flash",
    enabled: false,
  },

  "tokenrouter-nemotron": {
    provider: "tokenrouter",
    adapter: "tokenrouter",
    model:
      "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free",
    enabled: false,
  },

  "openai-placeholder": {
    provider: "openai",
    adapter: "openai",
    model: "pending",
    enabled: false,
  },
};