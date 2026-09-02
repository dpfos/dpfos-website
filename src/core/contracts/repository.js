/*
============================================================
DPF OS — REPOSITORY CONTRACT
============================================================

Purpose
------------------------------------------------------------
Canonical persistence boundary for DPF OS domain data.

The application and domain layers must not depend directly
on a specific storage provider.

A Repository may be implemented by:
- Local storage
- IndexedDB
- Cloud storage
- Synchronization layer
- Test / mock storage

The contract intentionally contains no persistence logic.
============================================================
*/

export function createRepositoryContract({
  getById,
  list,
  create,
  update,
  remove,
  upsert,
} = {}) {
  const operations = {
    getById,
    list,
    create,
    update,
    remove,
    upsert,
  };

  for (const [name, operation] of Object.entries(operations)) {
    if (typeof operation !== "function") {
      throw new Error(
        `Repository operation "${name}" must be a function.`
      );
    }
  }

  return Object.freeze(operations);
}

export function isRepositoryContract(repository) {
  if (!repository || typeof repository !== "object") {
    return false;
  }

  const requiredOperations = [
    "getById",
    "list",
    "create",
    "update",
    "remove",
    "upsert",
  ];

  return requiredOperations.every(
    (operation) =>
      typeof repository[operation] === "function"
  );
}
