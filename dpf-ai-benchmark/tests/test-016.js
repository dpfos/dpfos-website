import evaluateTest016 from "../evaluators/test-016-evaluator.js";

export const test016 = {
  id: "TEST-016",

  name: "Sequential Resource State Tracking",

  domain: "state-reasoning",

  capability:
    "sequential state tracking, cumulative updates, and resource accounting",

  difficulty: "intermediate",

  prompt: `
You are tracking the availability of a football club's training resources over one week.

Use ONLY the information provided below.

INITIAL STATE:
Available training hours: 20
Available analysis hours: 12
Available recovery units: 8

OPERATIONS:

1. Monday:
   - Training uses 5 hours.
   - Analysis uses 2 hours.
   - Recovery uses 1 unit.

2. Tuesday:
   - Training uses 4 hours.
   - Analysis uses 3 hours.
   - Recovery uses 2 units.

3. Wednesday:
   - Training adds 3 hours back to the available pool.
   - Analysis uses 1 hour.
   - Recovery adds 2 units back to the available pool.

4. Thursday:
   - Training uses 6 hours.
   - Analysis uses 2 hours.
   - Recovery uses 3 units.

TASKS:

1. Calculate the final available training hours.
2. Calculate the final available analysis hours.
3. Calculate the final available recovery units.
4. Identify which resource has the smallest final availability.
5. State whether all three resources remain available at the end of Thursday.

IMPORTANT:

- Track every operation in chronological order.
- Add resources when the operation says "adds back".
- Subtract resources when the operation says "uses".
- Do not invent any additional operations.
- Do not confuse initial availability with final availability.

OUTPUT EXACTLY 5 LINES:

Training Hours: [number]
Analysis Hours: [number]
Recovery Units: [number]
Lowest Resource: [resource name]
All Resources Available: [Yes/No]

Do not use bullets.
Do not use numbering.
Do not add a title.
Do not add explanations outside the five required lines.

Return ONLY the five lines.
`,

  evaluator: evaluateTest016,
};