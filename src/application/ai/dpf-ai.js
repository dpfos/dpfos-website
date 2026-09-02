const AI_RUNTIME_URL =
  import.meta.env.VITE_DPF_AI_RUNTIME_URL ||
  "http://localhost:8787";

export async function generateDPFAI({
  prompt,
  contextLimit = 5,
  type = null,
  category = null,
  domain = null,
  status = null,
  authoritativeOnly = true,
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
      `${AI_RUNTIME_URL}/generate`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          prompt,
          contextLimit,
          type,
          category,
          domain,
          status,
          authoritativeOnly,
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
        "DPF AI Runtime request failed."
    );
  }

  return result;
}

export default generateDPFAI;
