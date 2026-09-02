/*
============================================================
DPF OS — CORE STORAGE INDEX
============================================================

Purpose
------------------------------------------------------------
Canonical public entry point for DPF OS storage services.

Storage implementations remain behind the repository layer.
Application code should prefer repositories over direct storage.
============================================================
*/

export {
  indexedDBStore,
} from "./indexed-db.js";

export {
  createLocalRepository,
} from "./local-repository.js";

export {
  getRepository,
  hasRepository,
  listRepositories,
  registerLocalRepositories,
} from "./local-repository-registry.js";
