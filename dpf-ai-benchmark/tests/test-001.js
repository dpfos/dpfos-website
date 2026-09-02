import { evaluateTest001 } from "../evaluators/test-001-evaluator.js";

export const test001 = {
  id: "TEST-001",

  name: "Five-Day Project Scheduling",

  domain: "constraint-reasoning",

  prompt: `
You are being evaluated on constraint reasoning.

Solve the scheduling problem below.

Projects:
A = Website
B = Mobile App
C = Data Migration
D = Security Audit

Teams:
Team 1 = Frontend
Team 2 = Backend
Team 3 = Data
Team 4 = Security

Constraints:

1. A requires Team 1 + Team 2.
2. B requires Team 1 + Team 2.
3. C requires Team 3.
4. D requires Team 4.
5. Team 1 cannot work on A and B simultaneously.
6. Team 2 cannot work on A and B simultaneously.
7. C must finish before B can start.
8. D must finish before A can start.
9. A must start before B.
10. Each project requires exactly 2 working days.
11. The available days are Monday, Tuesday, Wednesday, Thursday, Friday.
12. Each team can work on only one project per day.

Answer the following:

1. Is it possible to complete all four projects within the five-day week?
2. If yes, provide a valid day-by-day schedule.
3. If no, prove why it is impossible.
4. Identify the minimum single constraint change that would make the schedule feasible.
5. Do not introduce assumptions that are not stated in the problem.

Show your reasoning clearly and give a final conclusion.
`,

  evaluator: evaluateTest001,
};