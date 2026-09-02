import evaluateTest005 from "../evaluators/test-005-evaluator.js";

export const test005 = {
  id: "TEST-005",

  name: "Multi-Step Project Planning",

  domain: "planning-and-sequencing",

  capability: "dependency-aware planning and sequencing",

  difficulty: "intermediate",

  prompt: `
You are evaluating a project planning and sequencing problem.

Use ONLY the information provided below.

PROJECT: Northbridge FC Performance Department Launch

The department must complete seven tasks:

A — Define Performance KPIs
Duration: 1 day
Dependency: None

B — Select Data Sources
Duration: 2 days
Dependency: A

C — Configure Data Pipeline
Duration: 2 days
Dependency: B

D — Design Performance Dashboard
Duration: 2 days
Dependency: B

E — Validate Dashboard
Duration: 1 day
Dependency: D

F — Train Staff
Duration: 2 days
Dependency: C and E

G — Launch System
Duration: 1 day
Dependency: F

RULES:

1. A task cannot start until all of its dependencies are complete.
2. Tasks may be performed in parallel when their dependencies allow it.
3. The project must be completed as quickly as possible.
4. There is no resource limitation.
5. The project starts on Day 1.
6. The duration of a task means the number of consecutive working days required.
7. If two tasks are independent and can run in parallel, they should be scheduled in parallel when doing so reduces the total project duration.

TASK:

Create the earliest possible project schedule.

Determine:
- The start day of every task.
- The finish day of every task.
- The total project duration.

OUTPUT EXACTLY 8 LINES:

A: Day [start]-[finish]
B: Day [start]-[finish]
C: Day [start]-[finish]
D: Day [start]-[finish]
E: Day [start]-[finish]
F: Day [start]-[finish]
G: Day [start]-[finish]
Project Duration: [days]

Do not use bullets.
Do not add explanations.
Do not add a title.
Do not add any other text.

Return ONLY the eight lines.
`,

  evaluator: evaluateTest005,
};