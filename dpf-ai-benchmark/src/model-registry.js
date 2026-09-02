export const modelRegistry = {
  "gemini-3.6-flash": {
    provider: "google",
    adapter: "gemini",
    model: "gemini-3.6-flash",
    enabled: true,
  },

  "openai-placeholder": {
    provider: "openai",
    adapter: "openai",
    model: "pending",
    enabled: false,
  },

  "tokenrouter-nemotron": {
    provider: "tokenrouter",
    adapter: "tokenrouter",
    model: "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free",
    enabled: true,
  },
};