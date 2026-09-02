import evaluateTest007 from "../evaluators/test-007-evaluator.js";

export const test007 = {
  id: "TEST-007",

  name: "Performance Data Interpretation",

  domain: "data-interpretation",

  capability: "trend detection, comparative analysis, and evidence-based interpretation",

  difficulty: "intermediate",

  prompt: `
You are evaluating a data interpretation task.

Use ONLY the data provided below.

NORTHBRIDGE FC — TEAM PERFORMANCE DATA

Metric | Matchday 1 | Matchday 2 | Matchday 3 | Matchday 4

Possession % | 54 | 58 | 61 | 63
Shots | 10 | 12 | 15 | 18
Shots on Target | 3 | 4 | 6 | 8
Goals | 1 | 1 | 2 | 3
PPDA | 14 | 12 | 10 | 8

TASKS:

1. Identify the possession percentage change from Matchday 1 to Matchday 4.
2. Identify the shots change from Matchday 1 to Matchday 4.
3. Identify the goals change from Matchday 1 to Matchday 4.
4. Identify whether PPDA increased or decreased.
5. Identify which metric had the largest absolute numerical change between Matchday 1 and Matchday 4.
6. State the overall performance trend supported by the data.

IMPORTANT:

- Possession, shots, shots on target, and goals increasing represent increases in those metrics.
- PPDA decreasing represents a lower PPDA value.
- Do not invent causes for the observed changes.
- Do not claim that one metric caused another.
- The conclusion must be based only on the supplied data.

OUTPUT EXACTLY 6 LINES:

Possession Change: [value]
Shots Change: [value]
Goals Change: [value]
PPDA Trend: [Increased/Decreased], [value]
Largest Numerical Change: [metric], [value]
Overall Trend: [concise evidence-based conclusion]

Do not use bullets.
Do not use numbering.
Do not add a title.
Do not add explanations outside the six required lines.
Do not add information not present in the data.

Return ONLY the six lines.
`,

  evaluator: evaluateTest007,
};