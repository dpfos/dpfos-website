/*
============================================================
DPF OS — LOCAL REPOSITORY REGISTRY
============================================================

Purpose
------------------------------------------------------------
Composition layer for the offline/local repository set.

Architecture
------------------------------------------------------------
Domain Contracts
      ↓
Repository Contract
      ↓
Local Repository
      ↓
IndexedDB Store

The canonical Repository Registry remains responsible only
for repository registration and discovery.

This module composes the local implementation.

It does NOT:
- authenticate users
- authorize users
- synchronize with cloud
- contain UI logic
- duplicate domain contracts
============================================================
*/

import indexedDBStore from "./indexed-db.js";

import createLocalRepository from "./local-repository.js";

import {
  registerRepository,
  getRepository,
  hasRepository,
  listRepositories,
} from "../contracts/repository-registry.js";


/*
============================================================
LOCAL REPOSITORIES
============================================================
*/

const clubRepository =
  createLocalRepository({
    store: indexedDBStore,
    prefix: "club",
  });


const teamRepository =
  createLocalRepository({
    store: indexedDBStore,
    prefix: "team",
  });


const seasonRepository =
  createLocalRepository({
    store: indexedDBStore,
    prefix: "season",
  });


const playerRepository =
  createLocalRepository({
    store: indexedDBStore,
    prefix: "player",
  });


const teamMembershipRepository =
  createLocalRepository({
    store: indexedDBStore,
    prefix: "team-membership",
  });


/*
============================================================
REGISTRATION
============================================================
*/

function registerLocalRepositories() {
  const repositories = [
    [
      "club",
      clubRepository,
    ],
    [
      "team",
      teamRepository,
    ],
    [
      "season",
      seasonRepository,
    ],
    [
      "player",
      playerRepository,
    ],
    [
      "team-membership",
      teamMembershipRepository,
    ],
  ];


  for (
    const [name, repository]
    of repositories
  ) {
    if (!hasRepository(name)) {
      registerRepository(
        name,
        repository
      );
    }
  }

  return repositories;
}


/*
============================================================
INITIALIZE
============================================================
*/

registerLocalRepositories();


/*
============================================================
PUBLIC API
============================================================
*/

export {
  getRepository,
  hasRepository,
  listRepositories,
  registerLocalRepositories,
};


/*
============================================================
DEFAULT EXPORT
============================================================
*/

export default Object.freeze({
  getRepository,
  hasRepository,
  listRepositories,
  registerLocalRepositories,
});
