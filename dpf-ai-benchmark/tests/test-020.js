import evaluateTest020 from "../evaluators/test-020-evaluator.js";

export const test020 = {
  id: "TEST-020",

  name: "Integrated Strategic Decision",

  domain: "integrated-reasoning",

  capability:
    "integrated constraint reasoning, resource evaluation, risk assessment, and strategic decision-making",

  difficulty: "advanced",

  prompt: `
You are selecting ONE strategic performance project for a professional football club.

Use ONLY the information provided below.

PROJECT A
Performance Impact: 9
Available Performance Value: 86
Cost: 7 points
Implementation Time: 3 weeks
Risk: High

PROJECT B
Performance Impact: 8
Available Performance Value: 82
Cost: 5 points
Implementation Time: 2 weeks
Risk: Low

PROJECT C
Performance Impact: 10
Available Performance Value: 91
Cost: 6 points
Implementation Time: 4 weeks
Risk: Medium

PROJECT D
Performance Impact: 7
Available Performance Value: 78
Cost: 4 points
Implementation Time: 2 weeks
Risk: Low

CLUB CONSTRAINTS

- Maximum budget: 6 points.
- Maximum implementation time: 3 weeks.
- Risk must be Low or Medium.
- The club requires a minimum Available Performance Value of 80.
- The primary decision criterion is Performance Impact.
- Available Performance Value is the secondary criterion.
- If two projects are still tied, prefer the lower-risk project.

DECISION PROCESS

1. Eliminate every project that violates ANY hard constraint.
2. Among the remaining feasible projects, select the project with the highest Performance Impact.
3. If Performance Impact is tied, use Available Performance Value.
4. If still tied, use lower Risk.
5. Select exactly ONE project.

TASKS:

Determine:
- Which projects are feasible.
- Which project should be selected.
- Its Performance Impact.
- Its Available Performance Value.
- Its Cost.
- Why it is the correct decision under the stated rules.

IMPORTANT:

- Apply ALL hard constraints before comparing projects.
- Do not select an infeasible project even if it has a higher Performance Impact.
- Do not prioritize Available Performance Value over Performance Impact.
- Do not invent additional criteria.
- Select exactly ONE project.

OUTPUT EXACTLY 6 LINES:

Feasible Projects: [letters]
Selected Project: [letter]
Performance Impact: [number]
Available Performance Value: [number]
Cost: [number] points
Decision Basis: [concise explanation]

Do not use bullets.
Do not use numbering.
Do not add a title.
Do not add explanations outside the six required lines.

Return ONLY the six lines.
`,

  evaluator: evaluateTest020,
};