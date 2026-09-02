import evaluateTest008 from "../evaluators/test-008-evaluator.js";

export const test008 = {
  id: "TEST-008",

  name: "Critical Path Analysis",

  domain: "temporal-reasoning",

  capability:
    "dependency analysis, critical path identification, and completion-time reasoning",

  difficulty: "intermediate",

  prompt: `
You are solving a project scheduling and dependency reasoning task.

Use ONLY the information provided below.

PROJECT TASKS

Task A:
Duration: 2 days
Dependency: None

Task B:
Duration: 3 days
Dependency: A must be completed before B starts.

Task C:
Duration: 1 day
Dependency: A must be completed before C starts.

Task D:
Duration: 2 days
Dependencies:
- B must be completed before D starts.
- C must be completed before D starts.

RULES

- Tasks may run concurrently when their dependencies allow it.
- A task can start only after all of its dependencies are completed.
- All durations are working days.
- Day 1 is the first working day.
- There are no resource constraints.
- Determine the earliest possible completion of the entire project.

TASKS:

1. Identify the critical path.
2. Calculate the total project duration.
3. Identify the earliest completion day.
4. Identify the non-critical task.
5. Calculate the slack of the non-critical task.

IMPORTANT:

- Use only the supplied task data.
- Do not invent additional constraints.
- The critical path is the longest dependency path through the project.
- Slack is the amount of time a non-critical task can be delayed without delaying final project completion.

OUTPUT EXACTLY 5 LINES:

Critical Path: [task sequence]
Project Duration: [number] days
Earliest Completion: Day [number]
Non-Critical Task: [task]
Slack: [number] days

Do not use bullets.
Do not use numbering.
Do not add a title.
Do not add explanations outside the five required lines.

Return ONLY the five lines.
`,

  evaluator: evaluateTest008,
};