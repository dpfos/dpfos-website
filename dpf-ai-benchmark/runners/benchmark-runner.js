import "dotenv/config";

import { getTest } from "../src/test-registry.js";

import { evaluateTest } from "../evaluators/evaluation-engine.js";

import { validateTestDefinition } from "../src/benchmark-schema.js";

import { createModelAdapter } from "../src/adapter-factory.js";

const TEST_ID = process.argv[2] || "TEST-001";
const MODEL_ID = process.argv[3] || "gemini-3.6-flash";

async function runTest() {
  console.log("\n=================================");
  console.log("      DPF AI BENCHMARK v1.0");
  console.log("=================================\n");

  // =======================================================
  // LOAD TEST FROM REGISTRY
  // =======================================================

  let test;

  try {
    test = getTest(TEST_ID);
  } catch (error) {
    console.error(`✗ ${error.message}`);
    process.exitCode = 1;
    return;
  }

  // =======================================================
  // TEST VALIDATION
  // =======================================================

  const validation = validateTestDefinition(test);

  if (!validation.valid) {
    console.error("✗ Invalid test definition\n");

    for (const error of validation.errors) {
      console.error(`- ${error}`);
    }

    process.exitCode = 1;
    return;
  }

  console.log("✓ Test definition validated\n");

  // =======================================================
  // TEST INFORMATION
  // =======================================================

  console.log(`Running: ${test.id}`);
  console.log(`Domain: ${test.domain}`);

  if (test.capability) {
    console.log(`Capability: ${test.capability}`);
  }

  if (test.difficulty) {
    console.log(`Difficulty: ${test.difficulty}`);
  }

  console.log(`Test: ${test.name}`);
  console.log(`Model: ${MODEL_ID}\n`);

  try {
    // =====================================================
    // MODEL ADAPTER
    // =====================================================

    const adapter = createModelAdapter(
      MODEL_ID,
      process.env
    );

    console.log("✓ Model adapter initialized\n");

    // =====================================================
    // MODEL EXECUTION
    // =====================================================

    const result = await adapter.generate(
      test.prompt
    );

    const output = result.text;

    console.log("✓ Model response received\n");

    console.log("---------------------------------");
    console.log(output);
    console.log("---------------------------------\n");

    // =====================================================
    // EVALUATION
    // =====================================================

    console.log("EVALUATING RESPONSE...\n");

    const evaluation = evaluateTest(
      test,
      output
    );

    // =====================================================
    // RESULTS
    // =====================================================

    console.log("=================================");
    console.log("         EVALUATION");
    console.log("=================================\n");

    console.log(`Score: ${evaluation.score}/10`);
    console.log(`Status: ${evaluation.status}`);

    console.log(
      `Checks: ${evaluation.checks.passed}/${evaluation.checks.total} passed`
    );

    console.log("\n---------------------------------");

    for (const check of evaluation.details) {
      console.log(
        `${check.passed ? "✓" : "✗"} ${check.name}`
      );

      console.log(`  ${check.reason}`);
    }

    console.log("---------------------------------\n");

    console.log("TEST COMPLETED");

  } catch (error) {
    console.error("\n✗ Benchmark execution failed\n");
    console.error(error.message);

    process.exitCode = 1;
  }
}

runTest();