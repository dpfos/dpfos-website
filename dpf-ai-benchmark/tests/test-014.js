import evaluateTest014 from "../evaluators/test-014-evaluator.js";

export const test014 = {
  id: "TEST-014",

  name: "Performance Anomaly Detection",

  domain: "anomaly-detection",

  capability:
    "outlier identification, comparative pattern recognition, and evidence-based anomaly detection",

  difficulty: "intermediate",

  prompt: `
You are analyzing weekly performance data for five football players.

Use ONLY the information provided below.

PLAYER A:
Week 1: 78
Week 2: 80
Week 3: 79
Week 4: 81

PLAYER B:
Week 1: 74
Week 2: 76
Week 3: 75
Week 4: 77

PLAYER C:
Week 1: 82
Week 2: 83
Week 3: 81
Week 4: 84

PLAYER D:
Week 1: 79
Week 2: 80
Week 3: 42
Week 4: 81

PLAYER E:
Week 1: 76
Week 2: 78
Week 3: 77
Week 4: 79

TASKS:

1. Identify the player with the clearest performance anomaly.
2. Identify the week in which the anomaly occurred.
3. State the anomalous performance value.
4. State the player's typical performance range outside the anomalous week.
5. Determine whether the data alone establishes the cause of the anomaly.

IMPORTANT:

- Compare the anomalous value with the same player's other weeks.
- Do not invent a cause for the anomaly.
- A sudden numerical deviation is evidence of an anomaly, not evidence of its cause.
- Use only the supplied data.
- Do not treat normal week-to-week variation as an anomaly.

OUTPUT EXACTLY 5 LINES:

Anomalous Player: [letter]
Anomalous Week: Week [number]
Anomalous Value: [number]
Typical Range: [range]
Cause Established: [Yes/No]

Do not use bullets.
Do not use numbering.
Do not add a title.
Do not add explanations outside the five required lines.

Return ONLY the five lines.
`,

  evaluator: evaluateTest014,
};