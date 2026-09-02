/*
============================================================
DPF OS — INDEXED DB STORAGE
============================================================

Purpose
------------------------------------------------------------
Browser-local persistence adapter for DPF Club OS.

Architecture
------------------------------------------------------------
Domain Contracts
      ↓
Local Store Contract
      ↓
IndexedDB Adapter
      ↓
Browser Local Persistence

Principles
------------------------------------------------------------
- Offline-first
- No domain logic
- No authentication
- No authorization
- No UI dependencies
- Promise-based API
- Single storage implementation
============================================================
*/

const DB_NAME = "dpf-os";
const DB_VERSION = 1;
const DEFAULT_STORE = "records";

let databasePromise = null;


/*
============================================================
DATABASE
============================================================
*/

function openDatabase() {
  if (databasePromise) {
    return databasePromise;
  }

  databasePromise = new Promise((resolve, reject) => {
    if (typeof indexedDB === "undefined") {
      reject(
        new Error(
          "IndexedDB is not available in this environment."
        )
      );

      return;
    }

    const request = indexedDB.open(
      DB_NAME,
      DB_VERSION
    );

    request.onupgradeneeded = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains(DEFAULT_STORE)) {
        db.createObjectStore(
          DEFAULT_STORE,
          {
            keyPath: "id",
          }
        );
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(
        request.error ||
          new Error(
            "Failed to open IndexedDB."
          )
      );
    };
  });

  return databasePromise;
}


/*
============================================================
TRANSACTION HELPER
============================================================
*/

async function withStore(
  mode,
  operation
) {
  const db =
    await openDatabase();

  return new Promise(
    (resolve, reject) => {
      const transaction =
        db.transaction(
          DEFAULT_STORE,
          mode
        );

      const store =
        transaction.objectStore(
          DEFAULT_STORE
        );

      let result;

      try {
        result =
          operation(store);
      } catch (error) {
        reject(error);
        return;
      }

      if (
        result &&
        typeof result.onsuccess !==
          "undefined"
      ) {
        result.onsuccess = () => {
          resolve(
            result.result
          );
        };

        result.onerror = () => {
          reject(
            result.error ||
              new Error(
                "IndexedDB operation failed."
              )
          );
        };
      } else {
        transaction.oncomplete =
          () => {
            resolve(result);
          };

        transaction.onerror =
          () => {
            reject(
              transaction.error ||
                new Error(
                  "IndexedDB transaction failed."
                )
            );
          };
      }
    }
  );
}


/*
============================================================
GET
============================================================
*/

export async function get(
  id
) {
  if (!id) {
    return null;
  }

  return withStore(
    "readonly",
    (store) =>
      store.get(id)
  );
}


/*
============================================================
LIST
============================================================
*/

export async function list() {
  const result =
    await withStore(
      "readonly",
      (store) =>
        store.getAll()
    );

  return Array.isArray(result)
    ? result
    : [];
}


/*
============================================================
PUT
============================================================
*/

export async function put(
  value
) {
  if (
    !value ||
    typeof value !== "object"
  ) {
    throw new Error(
      "IndexedDB value must be an object."
    );
  }

  if (!value.id) {
    throw new Error(
      "IndexedDB value requires an id."
    );
  }

  return withStore(
    "readwrite",
    (store) =>
      store.put(value)
  );
}


/*
============================================================
REMOVE
============================================================
*/

export async function remove(
  id
) {
  if (!id) {
    return false;
  }

  await withStore(
    "readwrite",
    (store) =>
      store.delete(id)
  );

  return true;
}


/*
============================================================
CLEAR
============================================================
*/

export async function clear() {
  await withStore(
    "readwrite",
    (store) =>
      store.clear()
  );

  return true;
}


/*
============================================================
COUNT
============================================================
*/

export async function count() {
  const result =
    await withStore(
      "readonly",
      (store) =>
        store.count()
    );

  return result ?? 0;
}


/*
============================================================
LOCAL STORE OBJECT
============================================================
*/

export const indexedDBStore =
  Object.freeze({
    get,
    list,
    put,
    remove,
    clear,
    count,
  });


/*
============================================================
DEFAULT EXPORT
============================================================
*/

export default indexedDBStore;
