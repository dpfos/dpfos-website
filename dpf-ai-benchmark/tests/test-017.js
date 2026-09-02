import evaluateTest017 from "../evaluators/test-017-evaluator.js";

export const test017 = {
  id: "TEST-017",

  name: "Multi-Constraint Intervention Selection",

  domain: "constraint-reasoning",

  capability:
    "multi-step constraint filtering, trade-off analysis, and feasible decision selection",

  difficulty: "advanced",

  prompt: `
You are selecting one performance intervention for a professional football club.

The club has four candidate interventions.

INTERVENTION A
Impact: 9
Cost: 8 points
Implementation Time: 3 weeks
Risk: High

INTERVENTION B
Impact: 8
Cost: 5 points
Implementation Time: 2 weeks
Risk: Low

INTERVENTION C
Impact: 10
Cost: 9 points
Implementation Time: 5 weeks
Risk: Medium

INTERVENTION D
Impact: 7
Cost: 4 points
Implementation Time: 1 week
Risk: Low

CLUB CONSTRAINTS

- Maximum budget: 6 points
- Maximum implementation time: 3 weeks
- Risk must be Low or Medium
- The primary decision criterion is Impact
- If two feasible interventions have the same Impact, choose the lower-cost option

TASK

Determine which interventions are feasible under ALL constraints.

Then select the strongest feasible intervention based on the stated decision priority.

OUTPUT EXACTLY 5 LINES:

Feasible Interventions: [letters]
Selected Intervention: [letter]
Impact: [number]
Cost: [number]
Decision Basis: [short explanation]

IMPORTANT:

- Apply every constraint before comparing Impact.
- Do not select an intervention that violates even one constraint.
- Rank feasible interventions primarily by Impact.
- Do not recommend multiple interventions.
- Do not use bullets.
- Do not use numbering.
- Return ONLY the five required lines.
`,

  evaluator: evaluateTest017,
};
