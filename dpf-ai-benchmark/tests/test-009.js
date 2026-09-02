import evaluateTest009 from "../evaluators/test-009-evaluator.js";

export const test009 = {
  id: "TEST-009",

  name: "Resource Allocation Under Constraints",

  domain: "resource-allocation",

  capability:
    "constraint satisfaction, resource allocation, and value optimization",

  difficulty: "intermediate",

  prompt: `
You are solving a resource allocation problem.

Use ONLY the information provided below.

A football club has 10 development hours available this week.

Three players require individual development work:

Player A:
Required hours: 4
Performance value per hour: 8 points
Maximum allocation: 4 hours

Player B:
Required hours: 3
Performance value per hour: 7 points
Maximum allocation: 3 hours

Player C:
Required hours: 5
Performance value per hour: 6 points
Maximum allocation: 5 hours

RESOURCE CONSTRAINTS:

- Total available development time is exactly 10 hours.
- A player cannot receive more than their maximum allocation.
- Partial allocation is allowed.
- Every allocated hour produces the stated performance value.
- The objective is to maximize total performance value.

TASKS:

1. Determine the hours allocated to Player A.
2. Determine the hours allocated to Player B.
3. Determine the hours allocated to Player C.
4. Calculate the total performance value.
5. Identify whether any player's full requested allocation cannot be satisfied.

IMPORTANT:

- Use only the supplied information.
- The total allocation must not exceed 10 hours.
- The allocation should maximize total performance value.
- Since Player A has the highest value per hour, prioritize A before B, and B before C.
- Do not invent additional constraints.

OUTPUT EXACTLY 5 LINES:

Player A Hours: [number]
Player B Hours: [number]
Player C Hours: [number]
Total Performance Value: [number]
Unmet Request: [player or None]

Do not use bullets.
Do not use numbering.
Do not add a title.
Do not add explanations outside the five required lines.

Return ONLY the five lines.
`,

  evaluator: evaluateTest009,
};