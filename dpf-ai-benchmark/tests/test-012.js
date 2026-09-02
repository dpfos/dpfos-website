import evaluateTest012 from "../evaluators/test-012-evaluator.js";

export const test012 = {
  id: "TEST-012",

  name: "Risk Assessment and Mitigation",

  domain: "risk-reasoning",

  capability:
    "risk identification, comparative risk assessment, and constraint-based mitigation",

  difficulty: "intermediate",

  prompt: `
You are evaluating operational risks for a football academy.

Use ONLY the information provided below.

RISK A:
Probability: 8/10
Impact: 6/10
Mitigation Cost: 4 points

RISK B:
Probability: 6/10
Impact: 9/10
Mitigation Cost: 5 points

RISK C:
Probability: 7/10
Impact: 5/10
Mitigation Cost: 3 points

RISK D:
Probability: 4/10
Impact: 8/10
Mitigation Cost: 6 points

The academy has a mitigation budget of 5 points.

RISK PRIORITY RULE:

Risk Priority Score = Probability × Impact.

The academy must first identify the risk with the highest Risk Priority Score.

The academy may mitigate only one risk.

A mitigation action is feasible only if its Mitigation Cost is within the 5-point budget.

TASKS:

1. Calculate the Risk Priority Score for each risk.
2. Identify the highest-priority risk.
3. Determine whether that risk can be mitigated within the budget.
4. If it cannot be mitigated, select the highest-priority feasible risk instead.
5. State the selected risk's mitigation cost.

IMPORTANT:

- Calculate priority using Probability × Impact.
- Apply the budget constraint after determining priority.
- Do not invent additional criteria.
- Select exactly one risk.
- Use only the supplied information.

OUTPUT EXACTLY 6 LINES:

Risk Scores: [A=value, B=value, C=value, D=value]
Highest Priority Risk: [letter]
Highest Priority Feasible: [Yes/No]
Selected Risk: [letter]
Mitigation Cost: [number] points
Decision Basis: [concise statement]

Do not use bullets.
Do not use numbering.
Do not add a title.
Do not add explanations outside the six required lines.

Return ONLY the six lines.
`,

  evaluator: evaluateTest012,
};