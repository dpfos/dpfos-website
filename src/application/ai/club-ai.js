const AI_RUNTIME_URL =
  import.meta.env.VITE_DPF_AI_RUNTIME_URL ||
  "http://localhost:8787";

export async function generateClubAI({
  prompt,
  club = null,
  team = null,
  players = [],
  staff = [],
  currentModule = null,
  requestContext = {},
  contextLimit = 8,
} = {}) {
  if (
    !prompt ||
    typeof prompt !== "string"
  ) {
    throw new Error(
      "AI prompt must be a non-empty string."
    );
  }

  const response =
    await fetch(
      `${AI_RUNTIME_URL}/club/generate`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          prompt,
          club,
          team,
          players,
          staff,
          currentModule,
          requestContext,
          contextLimit,
        }),
      }
    );

  let result = null;

  try {
    result =
      await response.json();
  } catch {
    result = null;
  }

  if (!response.ok) {
    throw new Error(
      result?.error ||
        "Unable to generate Club OS AI response."
    );
  }

  return result;
}

export default generateClubAI;
