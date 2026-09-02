import { search, analyzeQuery } from "./searchEngine";

/* =========================================================
   SEARCH ENGINE TEST SUITE
   ========================================================= */

function printTest(name, query, access) {
  const analysis = analyzeQuery(query);
  const results = search(query, access);

  console.log(`\n==============================`);
  console.log(name);
  console.log(`==============================`);

  console.log("QUERY:", query);
  console.log("ACCESS:", access);

  console.log("ANALYSIS:", analysis);

  console.log("INTENT:", analysis.intent);
  console.log("ACTION:", analysis.action);
  console.log("CONCEPT:", analysis.concept);
  console.log("DOMAIN:", analysis.domain);

  console.log("ENTITIES:", analysis.entities);

  console.log(
    "RESULTS:",
    results.map((result) => ({
      title: result.title,
      type: result.type,
      access: result.access,
      score: result.score,
    }))
  );
}

/* =========================================================
   PUBLIC SEARCH
   ========================================================= */

printTest(
  "PUBLIC — Third-Man Run",
  "3rd man run",
  "public"
);

printTest(
  "PUBLIC — Third-Man Run Exercises",
  "I need exercises for 3rd man run",
  "public"
);

printTest(
  "PUBLIC — Third-Man Run U18",
  "third man run for U18",
  "public"
);

printTest(
  "PUBLIC — Third-Man Run U18 Midfielders",
  "I need exercises for 3rd man run for U18 midfielders",
  "public"
);

printTest(
  "PUBLIC — Space Creation",
  "what is space creation",
  "public"
);

/* =========================================================
   PREMIUM SEARCH
   ========================================================= */

printTest(
  "PREMIUM — Game Model",
  "game model",
  "premium"
);

printTest(
  "PREMIUM — Coaching",
  "coaching methodology",
  "premium"
);

printTest(
  "PREMIUM — Training",
  "training session design",
  "premium"
);

printTest(
  "PREMIUM — U18 Training",
  "training exercises for U18",
  "premium"
);

/* =========================================================
   CLUB OS SEARCH
   ========================================================= */

printTest(
  "CLUB — Coaching",
  "coaching",
  "club"
);

printTest(
  "CLUB — Training",
  "training exercises",
  "club"
);

printTest(
  "CLUB — Player Development",
  "how do I develop a player",
  "club"
);

printTest(
  "CLUB — U18 Midfielder Development",
  "how do I develop U18 midfielders",
  "club"
);

/* =========================================================
   QUERY UNDERSTANDING
   ========================================================= */

console.log(`
================================================
QUERY UNDERSTANDING TEST
================================================
`);

const queryUnderstandingTests = [
  "3rd man run",
  "I need exercises for 3rd man run",
  "third man run for U18",
  "I need exercises for 3rd man run for U18 midfielders",
  "pressing exercises for U17",
  "build up exercises for center backs",
];

queryUnderstandingTests.forEach((query, index) => {
  const analysis = analyzeQuery(query);

  console.log(`\nTEST ${index + 1}`);
  console.log("--------------------------------");

  console.log("QUERY:", query);
  console.log("INTENT:", analysis.intent);
  console.log("ACTION:", analysis.action);
  console.log("CONCEPT:", analysis.concept);
  console.log("DOMAIN:", analysis.domain);
  console.log("ENTITIES:", analysis.entities);
});