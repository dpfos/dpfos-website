import { test001 } from "../tests/test-001.js";
import { test002 } from "../tests/test-002.js";
import { test003 } from "../tests/test-003.js";
import { test004 } from "../tests/test-004.js";
import { test005 } from "../tests/test-005.js";
import { test006 } from "../tests/test-006.js";
import { test007 } from "../tests/test-007.js";
import { test008 } from "../tests/test-008.js";
import { test009 } from "../tests/test-009.js";
import { test010 } from "../tests/test-010.js";
import { test011 } from "../tests/test-011.js";
import { test012 } from "../tests/test-012.js";
import { test013 } from "../tests/test-013.js";
import { test014 } from "../tests/test-014.js";
import { test015 } from "../tests/test-015.js";
import { test016 } from "../tests/test-016.js";
import { test017 } from "../tests/test-017.js";
import { test018 } from "../tests/test-018.js";
import { test019 } from "../tests/test-019.js";
import { test020 } from "../tests/test-020.js";

export const testRegistry = {
  "TEST-001": test001,
  "TEST-002": test002,
  "TEST-003": test003,
  "TEST-004": test004,
  "TEST-005": test005,
  "TEST-006": test006,
  "TEST-007": test007,
  "TEST-008": test008,
  "TEST-009": test009,
  "TEST-010": test010,
  "TEST-011": test011,
  "TEST-012": test012,
  "TEST-013": test013,
  "TEST-014": test014,
  "TEST-015": test015,
  "TEST-016": test016,
  "TEST-017": test017,
  "TEST-018": test018,
  "TEST-019": test019,
  "TEST-020": test020,
};

export function getTest(testId) {
  const test = testRegistry[testId];

  if (!test) {
    throw new Error(`Test "${testId}" is not registered.`);
  }

  return test;
}