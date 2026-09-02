import evaluateTest004 from "../evaluators/test-004-evaluator.js";

export const test004 = {
  id: "TEST-004",

  name: "Strategic Resource Allocation",

  domain: "strategic-reasoning",

  capability: "trade-off analysis and strategic decision making",

  difficulty: "intermediate",

  prompt: `
You are evaluating a strategic decision-making problem.

Use ONLY the information provided below.

NORTHBRIDGE FC

The club has a strategic investment fund of 100 points.

INITIATIVE A: First-Team Performance
Investment required: 60 points
Expected competitive impact: 9/10
Time to impact: Short
Risk: Medium

INITIATIVE B: Academy Development
Investment required: 50 points
Expected competitive impact: 7/10
Long-term development impact: 10/10
Time to impact: Long
Risk: Low

INITIATIVE C: Scouting Network
Investment required: 40 points
Expected competitive impact: 6/10
Talent identification impact: 9/10
Time to impact: Medium
Risk: Medium

STRATEGIC OBJECTIVES:

1. Improve first-team competitive performance within the next season.
2. Maintain long-term talent development.
3. Do not exceed 100 investment points.
4. At least one initiative must directly improve first-team performance.
5. At least one initiative must support long-term talent development.

IMPORTANT:

Initiative B and Initiative C both support long-term talent development.

TASK:

Choose the strongest FEASIBLE combination of initiatives.

Your answer must:

1. Identify the selected initiatives.
2. Calculate their total investment.
3. Calculate the unused investment capacity.
4. Identify which strategic objectives are satisfied.
5. Explain why the selected combination is strategically stronger than the main feasible alternatives.

OUTPUT EXACTLY 5 LINES:

Selected Initiatives: [names]
Total Investment: [value]
Unused Capacity: [value]
Objectives Satisfied: [objective numbers]
Strategic Rationale: [concise rationale]

Do not use bullets.
Do not add a title.
Do not add an introduction.
Do not add a conclusion.
Do not add information not contained in the source.

Return ONLY the five lines.
`,

  evaluator: evaluateTest004,
};