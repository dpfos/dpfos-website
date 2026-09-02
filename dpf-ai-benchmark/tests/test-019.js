import evaluateTest019 from "../evaluators/test-019-evaluator.js";

export const test019 = {
  id: "TEST-019",

  name: "Robust Decision Under Uncertainty",

  domain: "uncertainty-reasoning",

  capability:
    "uncertainty analysis, downside-risk assessment, constraint filtering, and robust decision selection",

  difficulty: "advanced",

  prompt: `
You are selecting ONE performance intervention for a professional football club.

The club is uncertain about the exact performance impact of each intervention.
Each intervention therefore has an estimated impact range.

INTERVENTION A
Best-Case Impact: 10
Worst-Case Impact: 4
Cost: 5 points
Risk: High

INTERVENTION B
Best-Case Impact: 8
Worst-Case Impact: 7
Cost: 5 points
Risk: Low

INTERVENTION C
Best-Case Impact: 11
Worst-Case Impact: 5
Cost: 7 points
Risk: Medium

INTERVENTION D
Best-Case Impact: 7
Worst-Case Impact: 6
Cost: 4 points
Risk: Low

CLUB CONSTRAINTS

- Maximum budget: 6 points
- Risk must be Low or Medium
- The club is risk-sensitive.
- The primary decision criterion is the highest Worst-Case Impact.
- Best-Case Impact is the secondary criterion.
- If two interventions have the same Worst-Case Impact, prefer the lower-cost option.

DECISION RULE

First eliminate every intervention that violates a hard constraint.

Then compare the remaining feasible interventions using:
1. Worst-Case Impact as the primary criterion.
2. Best-Case Impact as the secondary criterion.
3. Cost only as a tie-breaker when the first two criteria are equal.

Select exactly ONE intervention.

OUTPUT EXACTLY 6 LINES:

Feasible Interventions: [letters]
Selected Intervention: [letter]
Worst-Case Impact: [number]
Best-Case Impact: [number]
Cost: [number]
Decision Basis: [short explanation]

IMPORTANT:
- Apply hard constraints before ranking.
- Do not select an infeasible intervention.
- Do not optimize for Best-Case Impact before Worst-Case Impact.
- Do not select multiple interventions.
- Do not invent additional criteria.
- Do not use bullets.
- Do not use numbering.
- Return ONLY the six required lines.
`,

  evaluator: evaluateTest019,
};
