/*
============================================================
DPF OS — CLUB REPOSITORY
============================================================

Purpose
------------------------------------------------------------
Canonical repository for Club domain entities.

Architecture
------------------------------------------------------------
Club Contract
      ↓
Club Repository
      ↓
Local Repository
      ↓
IndexedDB

Responsibilities
------------------------------------------------------------
- Validate Club entities
- Expose Club domain persistence operations
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
  createClub,
  isClub,
} from "../contracts/club.js";

import {
  getRepository,
} from "../storage/local-repository-registry.js";


/*
============================================================
DEPENDENCY
============================================================
*/

const repository =
  getRepository("club");

if (!repository) {
  throw new Error(
    'Club repository dependency "club" is not registered.'
  );
}


/*
============================================================
CREATE
============================================================
*/

export async function createClubRecord(
  input
) {
  const club =
    createClub(input);

  if (!club.id) {
    throw new Error(
      "Club requires an id before persistence."
    );
  }


  if (!club.name) {
    throw new Error(
      "Club requires a name."
    );
  }

  if (!isClub(club)) {
    throw new Error(
      "Invalid Club entity."
    );
  }

  return repository.create(
    club
  );
}


/*
============================================================
GET BY ID
============================================================
*/

export async function getClubById(
  id
) {
  const club =
    await repository.getById(id);

  if (!club) {
    return null;
  }

  if (!isClub(club)) {
    throw new Error(
      `Stored Club "${id}" is invalid.`
    );
  }

  return club;
}


/*
============================================================
LIST
============================================================
*/

export async function listClubs() {
  const clubs =
    await repository.list();

  return clubs.filter(
    isClub
  );
}


/*
============================================================
UPDATE
============================================================
*/

export async function updateClubRecord(
  input
) {
  if (!input?.id) {
    throw new Error(
      "Club requires an id for update."
    );
  }

  const existing =
    await getClubById(
      input.id
    );

  if (!existing) {
    throw new Error(
      `Club "${input.id}" does not exist.`
    );
  }

  const club =
    createClub({
      ...existing,
      ...input,
    });

  if (!isClub(club)) {
    throw new Error(
      "Invalid Club entity."
    );
  }

  return repository.update(
    club
  );
}


/*
============================================================
REMOVE
============================================================
*/

export async function removeClub(
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

export async function upsertClub(
  input
) {
  const club =
    createClub(input);

  if (!club.id) {
    throw new Error(
      "Club requires an id."
    );
  }

  if (!isClub(club)) {
    throw new Error(
      "Invalid Club entity."
    );
  }

  return repository.upsert(
    club
  );
}


/*
============================================================
PUBLIC API
============================================================
*/

export const clubRepository =
  Object.freeze({
    getById: getClubById,
    list: listClubs,
    create: createClubRecord,
    update: updateClubRecord,
    remove: removeClub,
    upsert: upsertClub,
  });


/*
============================================================
DEFAULT EXPORT
============================================================
*/

export default clubRepository;
