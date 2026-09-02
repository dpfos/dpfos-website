/*
============================================================
DPF OS — LOCAL STORE CONTRACT
============================================================

Purpose
------------------------------------------------------------
Canonical persistence contract for local/offline data.

The Local Store is the storage boundary used by the
Offline-First runtime.

The contract does NOT define:
- IndexedDB implementation
- Supabase implementation
- synchronization
- authentication
- authorization
- domain business logic

The implementation may use IndexedDB or another durable
browser-local storage mechanism.
============================================================
*/

export function createLocalStoreContract({
  get,
  list,
  put,
  remove,
  clear,
  count,
} = {}) {
  const operations = {
    get,
    list,
    put,
    remove,
    clear,
    count,
  };

  for (const [name, operation] of Object.entries(operations)) {
    if (typeof operation !== "function") {
      throw new Error(
        `Local store operation "${name}" must be a function.`
      );
    }
  }

  return Object.freeze(operations);
}

export function isLocalStoreContract(store) {
  if (!store || typeof store !== "object") {
    return false;
  }

  const requiredOperations = [
    "get",
    "list",
    "put",
    "remove",
    "clear",
    "count",
  ];

  return requiredOperations.every(
    (operation) =>
      typeof store[operation] === "function"
  );
}
