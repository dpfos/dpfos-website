import "dotenv/config";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.TOKENROUTER_API_KEY,
  baseURL: "https://api.tokenrouter.com/v1",
});

async function main() {
  console.log("================================");
  console.log("   DPF AI | NEMOTRON CONNECTION");
  console.log("================================\n");

  try {
    const response = await client.chat.completions.create({
      model: "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free",
      messages: [
        {
          role: "user",
          content: "Reply with exactly: DPF NEMOTRON CONNECTION OK",
        },
      ],
    });

    console.log("✓ Nemotron API connection successful\n");
    console.log("Response:");
    console.log(response.choices[0]?.message?.content);
    console.log("\n================================");
  } catch (error) {
    console.log("✗ Nemotron API connection failed\n");
    console.log(error?.message || error);
  }
}

main();