import { evaluateTest002 } from "../evaluators/test-002-evaluator.js";

export const test002 = {
  id: "TEST-002",

  name: "Instruction Following Under Constraints",

  domain: "instruction-following",

  capability: "instruction-following",

  difficulty: "intermediate",

  prompt: `
You are being evaluated on instruction following.

Follow ALL instructions exactly.

Your task is to transform the information below into a final output.

SOURCE DATA:

Club: Northbridge FC
League: Premier Division
Founded: 1998
Home City: Bristol
Head Coach: Daniel Reed
Players: 24
Academy Players: 7

Instructions:

1. Output exactly 5 lines.
2. Do not use bullet points.
3. Do not use numbering.
4. Line 1 must contain the club name.
5. Line 2 must contain the league.
6. Line 3 must contain the home city.
7. Line 4 must contain the head coach.
8. Line 5 must contain the total number of players.
9. Do not mention the founding year.
10. Do not mention the number of academy players.
11. Do not add any information that is not present in the source data.
12. Do not add a title.
13. Do not add an introduction.
14. Do not add a conclusion.
15. Preserve the exact values from the source data.

Return only the final five-line output.
`,

  evaluator: evaluateTest002,
};
