import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function main() {
  console.log("\n=================================");
  console.log("   DPF AI | GEMINI CONNECTION");
  console.log("=================================\n");

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: "Reply with exactly: DPF GEMINI CONNECTION OK",
    });

    console.log("✓ Gemini API connection successful\n");
    console.log("Response:");
    console.log(response.text);

    console.log("\n=================================\n");
  } catch (error) {
    console.error("✗ Gemini API connection failed\n");
    console.error(error.message);
    process.exitCode = 1;
  }
}

main();