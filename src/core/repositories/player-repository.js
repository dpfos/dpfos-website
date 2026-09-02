/*
============================================================
DPF OS — PLAYER REPOSITORY
============================================================

Purpose
------------------------------------------------------------
Canonical repository for Player domain entities.

Architecture
------------------------------------------------------------
Player Contract
      ↓
Player Repository
      ↓
Local Repository
      ↓
IndexedDB

Responsibilities
------------------------------------------------------------
- Validate Player entities
- Expose Player domain persistence operations
- Keep domain code independent from storage

Does NOT:
- authenticate users
- authorize users
- synchronize cloud data
- contain UI logic
- access IndexedDB directly
============================================================
*/

import {
  createPlayer,
  isPlayer,
} from "../contracts/player.js";

import {
  getRepository,
} from "../storage/local-repository-registry.js";


/*
============================================================
DEPENDENCY
============================================================
*/

const repository =
  getRepository("player");

if (!repository) {
  throw new Error(
    'Player repository dependency "player" is not registered.'
  );
}


/*
============================================================
CREATE
============================================================
*/

export async function createPlayerRecord(
  input
) {
  const player =
    createPlayer(input);

  if (!player.id) {
    throw new Error(
      "Player requires an id before persistence."
    );
  }

  if (!player.clubId) {
    throw new Error(
      "Player requires a clubId."
    );
  }

  if (!player.displayName) {
    throw new Error(
      "Player requires a displayName."
    );
  }

  if (!isPlayer(player)) {
    throw new Error(
      "Invalid Player entity."
    );
  }

  return repository.create(
    player
  );
}


/*
============================================================
GET BY ID
============================================================
*/

export async function getPlayerById(
  id
) {
  const player =
    await repository.getById(id);

  if (!player) {
    return null;
  }

  if (!isPlayer(player)) {
    throw new Error(
      `Stored Player "${id}" is invalid.`
    );
  }

  return player;
}


/*
============================================================
LIST
============================================================
*/

export async function listPlayers() {
  const players =
    await repository.list();

  return players.filter(
    isPlayer
  );
}


/*
============================================================
UPDATE
============================================================
*/

export async function updatePlayerRecord(
  input
) {
  if (!input?.id) {
    throw new Error(
      "Player requires an id for update."
    );
  }

  const existing =
    await getPlayerById(
      input.id
    );

  if (!existing) {
    throw new Error(
      `Player "${input.id}" does not exist.`
    );
  }

  const player =
    createPlayer({
      ...existing,
      ...input,
    });

  if (!isPlayer(player)) {
    throw new Error(
      "Invalid Player entity."
    );
  }

  return repository.update(
    player
  );
}


/*
============================================================
REMOVE
============================================================
*/

export async function removePlayer(
  id
) {
  return repository.remove(
    id
  );
}


/*
============================================================
UPSERT
============================================================
*/

export async function upsertPlayer(
  input
) {
  const player =
    createPlayer(input);

  if (!player.id) {
    throw new Error(
      "Player requires an id."
    );
  }

  if (!isPlayer(player)) {
    throw new Error(
      "Invalid Player entity."
    );
  }

  return repository.upsert(
    player
  );
}


/*
============================================================
PUBLIC API
============================================================
*/

export const playerRepository =
  Object.freeze({
    getById: getPlayerById,
    list: listPlayers,
    create: createPlayerRecord,
    update: updatePlayerRecord,
    remove: removePlayer,
    upsert: upsertPlayer,
  });


/*
============================================================
DEFAULT EXPORT
============================================================
*/

export default playerRepository;
