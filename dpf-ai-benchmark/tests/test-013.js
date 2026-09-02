import evaluateTest013 from "../evaluators/test-013-evaluator.js";

export const test013 = {
  id: "TEST-013",

  name: "Causal Inference from Observational Data",

  domain: "causal-reasoning",

  capability:
    "causal inference, confounding detection, and evidence-bounded interpretation",

  difficulty: "intermediate",

  prompt: `
You are analyzing observational performance data from a football academy.

Use ONLY the information provided below.

The academy observed two groups of players over one season.

GROUP A:
- Players used a new individual training program.
- Average weekly training load: 6 hours.
- Average improvement in performance score: +12%.

GROUP B:
- Players continued with the existing training program.
- Average weekly training load: 4 hours.
- Average improvement in performance score: +7%.

OBSERVATIONAL CONTEXT:

- Players were NOT randomly assigned to the two groups.
- Coaches selected players for the new program based on their initial performance level and development needs.
- The groups therefore differed before the program began.
- No controlled experiment was conducted.
- No other variables were held constant.

TASKS:

1. State whether the data establishes that the new training program caused the +12% improvement.
2. Identify the main methodological limitation.
3. State what the data DOES support.
4. State what cannot be concluded from the data.
5. Determine whether the evidence is observational or experimental.

IMPORTANT:

- Do not infer causality from the difference in improvement alone.
- Use only the supplied information.
- Distinguish correlation/association from causation.
- Do not invent additional experimental evidence.
- The fact that Group A improved more does not by itself prove the program caused the difference.

OUTPUT EXACTLY 5 LINES:

Causal Conclusion: [Causal/Not Established]
Main Limitation: [concise statement]
Supported Finding: [concise statement]
Unsupported Conclusion: [concise statement]
Evidence Type: [Observational/Experimental]

Do not use bullets.
Do not use numbering.
Do not add a title.
Do not add explanations outside the five required lines.

Return ONLY the five lines.
`,

  evaluator: evaluateTest013,
};