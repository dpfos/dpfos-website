import evaluateTest010 from "../evaluators/test-010-evaluator.js";

export const test010 = {
  id: "TEST-010",

  name: "Logical Consistency and Contradiction Detection",

  domain: "logical-reasoning",

  capability:
    "constraint consistency checking, contradiction detection, and logical inference",

  difficulty: "intermediate",

  prompt: `
You are evaluating a set of football squad-management statements.

Use ONLY the information provided below.

RULES

1. Every player selected for Match A must be registered for the competition.
2. Player X is selected for Match A.
3. Player X is not registered for the competition.
4. Every registered player is eligible for Match A.
5. Player Y is registered for the competition.
6. Player Y is not selected for Match A.

TASKS:

1. Determine whether the complete set of statements is logically consistent.
2. Identify the player involved in the direct contradiction.
3. Identify the two statements that create the contradiction.
4. Determine whether Player Y creates a contradiction.
5. State the minimum number of statements that must be changed or removed to eliminate the contradiction.

IMPORTANT:

- Use only the supplied statements.
- A player being registered does not imply that the player must be selected.
- A player being eligible does not imply that the player must be selected.
- Focus on logical consistency, not football policy assumptions.
- Do not invent additional rules.

OUTPUT EXACTLY 5 LINES:

Consistency: [Consistent/Inconsistent]
Contradictory Player: [player]
Contradictory Statements: [statement numbers]
Player Y Status: [No Contradiction/Contradiction]
Minimum Changes: [number]

Do not use bullets.
Do not use numbering.
Do not add a title.
Do not add explanations outside the five required lines.

Return ONLY the five lines.
`,

  evaluator: evaluateTest010,
};