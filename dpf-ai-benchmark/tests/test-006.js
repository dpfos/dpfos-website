import evaluateTest006 from "../evaluators/test-006-evaluator.js";

export const test006 = {
  id: "TEST-006",

  name: "Decision Under Uncertainty",

  domain: "decision-making",

  capability: "decision making under uncertainty and trade-offs",

  difficulty: "intermediate",

  prompt: `
You are evaluating a decision-making problem.

Use ONLY the information provided below.

NORTHBRIDGE FC

The club must choose ONE of three recruitment strategies for the next transfer window.

STRATEGY A — Proven Veteran

Transfer Cost: 70 points
Probability of immediate performance improvement: 90%
Expected long-term resale value: 20 points
Financial Risk: Low
Time to impact: Immediate

STRATEGY B — Emerging Talent

Transfer Cost: 45 points
Probability of immediate performance improvement: 65%
Expected long-term resale value: 80 points
Financial Risk: Medium
Time to impact: Medium

STRATEGY C — High-Potential Prospect

Transfer Cost: 30 points
Probability of immediate performance improvement: 40%
Expected long-term resale value: 120 points
Financial Risk: High
Time to impact: Long

DECISION CONTEXT:

The club has exactly 70 available investment points.

The club's PRIMARY objective for the coming season is immediate competitive improvement.

The club's SECONDARY objective is maintaining long-term financial sustainability.

The club cannot spend more than 70 points.

IMPORTANT:

1. Immediate competitive improvement has higher priority than resale value.
2. A strategy that exceeds the 70-point budget is infeasible.
3. When comparing feasible strategies, prioritize the probability of immediate performance improvement.
4. If two strategies had equal immediate-performance probability, use long-term resale value as the tie-breaker.
5. The club must choose exactly ONE strategy.

TASK:

Select the strongest strategy for the stated decision context.

OUTPUT EXACTLY 4 LINES:

Selected Strategy: [A, B, or C]
Transfer Cost: [value]
Immediate Improvement Probability: [value]
Decision Rationale: [concise rationale]

Do not use bullets.
Do not use numbering.
Do not add a title.
Do not add an introduction.
Do not add a conclusion.
Do not recommend multiple strategies.
Do not add information not contained in the source.

Return ONLY the four lines.
`,

  evaluator: evaluateTest006,
};