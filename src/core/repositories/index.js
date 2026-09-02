/*
============================================================
DPF OS — CORE REPOSITORIES INDEX
============================================================

Purpose
------------------------------------------------------------
Canonical public entry point for DPF OS domain repositories.

Repositories remain responsible for domain persistence access.
Storage implementations remain behind the repository layer.
============================================================
*/

export {
  clubRepository,
} from "./club-repository.js";

export {
  teamRepository,
} from "./team-repository.js";

export {
  seasonRepository,
} from "./season-repository.js";

export {
  playerRepository,
} from "./player-repository.js";

export {
  teamMembershipRepository,
} from "./team-membership-repository.js";
