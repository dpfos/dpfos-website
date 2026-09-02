import "dotenv/config";

export const config = {
  openaiKey: process.env.OPENAI_API_KEY,
  geminiKey: process.env.GEMINI_API_KEY,
  kimiKey: process.env.KIMI_API_KEY,
};
