import evaluateTest015 from "../evaluators/test-015-evaluator.js";

export const test015 = {
  id: "TEST-015",

  name: "Sequential Pattern Reasoning",

  domain: "pattern-reasoning",

  capability:
    "sequence analysis, pattern detection, and rule-based prediction",

  difficulty: "intermediate",

  prompt: `
You are analyzing a sequence of weekly football training loads.

Use ONLY the information provided below.

Observed training loads:

Week 1: 40
Week 2: 44
Week 3: 52
Week 4: 64
Week 5: 80

The sequence follows a consistent numerical rule.

TASKS:

1. Identify the numerical rule connecting consecutive weeks.
2. Predict the training load for Week 6.
3. Predict the training load for Week 7.
4. State the total increase from Week 1 to Week 7.
5. State whether the sequence is increasing or decreasing.

IMPORTANT:

- Use only the numerical sequence provided.
- Identify the simplest consistent rule.
- Do not invent external football or training assumptions.
- Week 6 and Week 7 must follow the same rule.

OUTPUT EXACTLY 5 LINES:

Rule: [concise numerical rule]
Week 6: [number]
Week 7: [number]
Total Increase: [number]
Direction: [Increasing/Decreasing]

Do not use bullets.
Do not use numbering.
Do not add a title.
Do not add explanations outside the five required lines.

Return ONLY the five lines.
`,

  evaluator: evaluateTest015,
};