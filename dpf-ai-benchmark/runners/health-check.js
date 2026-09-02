import "dotenv/config";

const providers = {
  OpenAI: process.env.OPENAI_API_KEY,
  Gemini: process.env.GEMINI_API_KEY,
  Kimi: process.env.KIMI_API_KEY,
};

console.log("\n=================================");
console.log("   DPF AI BENCHMARK | HEALTH");
console.log("=================================\n");

for (const [name, key] of Object.entries(providers)) {
  if (key && key.trim() !== "") {
    console.log(`✓ ${name}: API key detected`);
  } else {
    console.log(`○ ${name}: API key missing`);
  }
}

console.log("\nNo API requests were made.");
console.log("=================================\n");