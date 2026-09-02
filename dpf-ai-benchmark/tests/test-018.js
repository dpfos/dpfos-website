import evaluateTest018 from "../evaluators/test-018-evaluator.js";

export const test018 = {
  id: "TEST-018",

  name: "Strategic Trade-off Decision",

  domain: "trade-off-reasoning",

  capability:
    "multi-factor trade-off analysis, constraint filtering, and strategic decision selection",

  difficulty: "advanced",

  prompt: `
You are advising a professional football club choosing ONE strategic development program.

The club has four options.

PROGRAM A
Performance Impact: 9
Cost: 7 points
Implementation Time: 2 weeks
Risk: High
Long-Term Value: 9

PROGRAM B
Performance Impact: 8
Cost: 5 points
Implementation Time: 3 weeks
Risk: Low
Long-Term Value: 8

PROGRAM C
Performance Impact: 10
Cost: 6 points
Implementation Time: 5 weeks
Risk: Medium
Long-Term Value: 10

PROGRAM D
Performance Impact: 7
Cost: 4 points
Implementation Time: 2 weeks
Risk: Low
Long-Term Value: 7

CLUB CONSTRAINTS

- Maximum budget: 6 points
- Maximum implementation time: 3 weeks
- Risk must be Low or Medium
- The club requires a strong immediate performance impact.
- Long-term value is the secondary decision criterion.
- If two programs are equally strong on the primary criterion, prefer the one with lower risk.

DECISION RULE

First eliminate every program that violates ANY hard constraint.

Among the remaining feasible programs:
1. Prioritize immediate Performance Impact.
2. Use Long-Term Value as the secondary criterion.
3. If still tied, prefer lower Risk.
4. Select exactly ONE program.

OUTPUT EXACTLY 6 LINES:

Feasible Programs: [letters]
Selected Program: [letter]
Performance Impact: [number]
Cost: [number]
Long-Term Value: [number]
Decision Basis: [short explanation]

IMPORTANT:
- Apply hard constraints before comparing programs.
- Do not select an infeasible program.
- Do not select multiple programs.
- Do not invent additional criteria.
- Do not use bullets.
- Do not use numbering.
- Return ONLY the six required lines.
`,

  evaluator: evaluateTest018,
};
