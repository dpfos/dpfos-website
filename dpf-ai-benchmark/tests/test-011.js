import evaluateTest011 from "../evaluators/test-011-evaluator.js";

export const test011 = {
  id: "TEST-011",

  name: "Priority-Based Decision Selection",

  domain: "prioritization",

  capability:
    "multi-criteria prioritization, constraint filtering, and ranked decision selection",

  difficulty: "intermediate",

  prompt: `
You are selecting one player-development intervention for a football academy.

Use ONLY the information provided below.

The academy has four possible interventions.

Intervention A:
Impact: 9
Urgency: 7
Cost: 8
Implementation Time: 3 weeks

Intervention B:
Impact: 8
Urgency: 9
Cost: 5
Implementation Time: 2 weeks

Intervention C:
Impact: 10
Urgency: 6
Cost: 9
Implementation Time: 4 weeks

Intervention D:
Impact: 7
Urgency: 8
Cost: 4
Implementation Time: 1 week

ACADEMY CONSTRAINTS:

- Maximum acceptable cost: 6
- Maximum acceptable implementation time: 2 weeks
- The primary decision priority is highest Impact.
- If two feasible interventions have the same Impact, prefer higher Urgency.
- If Impact and Urgency are equal, prefer lower Cost.

TASKS:

1. Identify which interventions are feasible.
2. Select the single best feasible intervention.
3. Identify its Impact score.
4. Identify its Cost.
5. Identify its implementation time.
6. State why the selected intervention is preferred based on the stated decision rules.

IMPORTANT:

- Apply the constraints before ranking the interventions.
- Do not select an intervention that violates either the cost or time constraint.
- Do not treat Cost or Urgency as more important than Impact unless the stated tie-break rules require it.
- Use only the supplied information.
- Do not invent additional criteria.

OUTPUT EXACTLY 6 LINES:

Feasible Interventions: [letters]
Selected Intervention: [letter]
Impact: [number]
Cost: [number]
Implementation Time: [number] weeks
Decision Basis: [concise statement]

Do not use bullets.
Do not use numbering.
Do not add a title.
Do not add explanations outside the six required lines.

Return ONLY the six lines.
`,

  evaluator: evaluateTest011,
};