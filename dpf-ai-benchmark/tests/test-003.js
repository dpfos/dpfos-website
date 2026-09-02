import evaluateTest003 from "../evaluators/test-003-evaluator.js";

export const test003 = {
  id: "TEST-003",

  name: "Resource Allocation Decision",

  domain: "analytical-reasoning",

  capability: "multi-step analytical reasoning",

  difficulty: "intermediate",

  prompt: `
You are being evaluated on analytical reasoning.

Use ONLY the information provided below.

ORGANIZATION:

Northbridge FC

DEPARTMENT BUDGETS:

Scouting
Budget: 120000
Current Spend: 75000

Academy
Budget: 100000
Current Spend: 62000

Performance
Budget: 80000
Current Spend: 50000

PROJECTS:

Project Alpha
Cost: 18000
Priority: High

Project Beta
Cost: 15000
Priority: Medium

Project Gamma
Cost: 12000
Priority: High

INSTRUCTIONS:

1. Calculate the remaining budget for Scouting.
2. Calculate the remaining budget for Academy.
3. Calculate the remaining budget for Performance.
4. Calculate the total remaining budget across all three departments.
5. Calculate the total cost of all three projects.
6. Determine whether all three projects can be funded from the total remaining budget.
7. Calculate the remaining budget after funding all three projects.
8. Identify all High-priority projects.

OUTPUT RULES:

Return exactly 6 lines.

Do not use bullets.
Do not use numbering.
Do not add a title.
Do not add explanations.
Do not add a conclusion.
Do not add calculations.

Use exactly this structure:

Scouting Remaining: [value]
Academy Remaining: [value]
Performance Remaining: [value]
Total Remaining: [value]
All Projects Funded: [Yes/No], Remaining After Funding: [value]
High Priority Projects: [names]

Return ONLY the six lines.
`,

  evaluator: evaluateTest003,
};