/*
============================================================
DPF OS — SEASON REPOSITORY
============================================================

Purpose
------------------------------------------------------------
Canonical repository for Season domain entities.

Architecture
------------------------------------------------------------
Season Contract
      ↓
Season Repository
      ↓
Local Repository
      ↓
IndexedDB

Responsibilities
------------------------------------------------------------
- Validate Season entities
- Expose Season domain persistence operations
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
  createSeason,
  isSeason,
} from "../contracts/season.js";

import {
  getRepository,
} from "../storage/local-repository-registry.js";


/*
============================================================
DEPENDENCY
============================================================
*/

const repository =
  getRepository("season");

if (!repository) {
  throw new Error(
    'Season repository dependency "season" is not registered.'
  );
}


/*
============================================================
CREATE
============================================================
*/

export async function createSeasonRecord(
  input
) {
  const season =
    createSeason(input);

  if (!season.id) {
    throw new Error(
      "Season requires an id before persistence."
    );
  }

  if (!season.clubId) {
    throw new Error(
      "Season requires a clubId."
    );
  }

  if (!season.name) {
    throw new Error(
      "Season requires a name."
    );
  }

  if (!isSeason(season)) {
    throw new Error(
      "Invalid Season entity."
    );
  }

  return repository.create(
    season
  );
}


/*
============================================================
GET BY ID
============================================================
*/

export async function getSeasonById(
  id
) {
  const season =
    await repository.getById(id);

  if (!season) {
    return null;
  }

  if (!isSeason(season)) {
    throw new Error(
      `Stored Season "${id}" is invalid.`
    );
  }

  return season;
}


/*
============================================================
LIST
============================================================
*/

export async function listSeasons() {
  const seasons =
    await repository.list();

  return seasons.filter(
    isSeason
  );
}


/*
============================================================
UPDATE
============================================================
*/

export async function updateSeasonRecord(
  input
) {
  if (!input?.id) {
    throw new Error(
      "Season requires an id for update."
    );
  }

  const existing =
    await getSeasonById(
      input.id
    );

  if (!existing) {
    throw new Error(
      `Season "${input.id}" does not exist.`
    );
  }

  const season =
    createSeason({
      ...existing,
      ...input,
    });

  if (!isSeason(season)) {
    throw new Error(
      "Invalid Season entity."
    );
  }

  return repository.update(
    season
  );
}


/*
============================================================
REMOVE
============================================================
*/

export async function removeSeason(
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

export async function upsertSeason(
  input
) {
  const season =
    createSeason(input);

  if (!season.id) {
    throw new Error(
      "Season requires an id."
    );
  }

  if (!isSeason(season)) {
    throw new Error(
      "Invalid Season entity."
    );
  }

  return repository.upsert(
    season
  );
}


/*
============================================================
PUBLIC API
============================================================
*/

export const seasonRepository =
  Object.freeze({
    getById: getSeasonById,
    list: listSeasons,
    create: createSeasonRecord,
    update: updateSeasonRecord,
    remove: removeSeason,
    upsert: upsertSeason,
  });


/*
============================================================
DEFAULT EXPORT
============================================================
*/

export default seasonRepository;
