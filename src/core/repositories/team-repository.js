/*
============================================================
DPF OS — TEAM REPOSITORY
============================================================

Purpose
------------------------------------------------------------
Canonical repository for Team domain entities.

Architecture
------------------------------------------------------------
Team Contract
      ↓
Team Repository
      ↓
Local Repository
      ↓
IndexedDB

Responsibilities
------------------------------------------------------------
- Validate Team entities
- Expose Team domain persistence operations
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
  createTeam,
  isTeam,
} from "../contracts/team.js";

import {
  getRepository,
} from "../storage/local-repository-registry.js";


/*
============================================================
DEPENDENCY
============================================================
*/

const repository =
  getRepository("team");

if (!repository) {
  throw new Error(
    'Team repository dependency "team" is not registered.'
  );
}


/*
============================================================
CREATE
============================================================
*/

export async function createTeamRecord(
  input
) {
  const team =
    createTeam(input);

  if (!team.id) {
    throw new Error(
      "Team requires an id before persistence."
    );
  }

  if (!team.clubId) {
    throw new Error(
      "Team requires a clubId."
    );
  }

  if (!team.name) {
    throw new Error(
      "Team requires a name."
    );
  }

  if (!isTeam(team)) {
    throw new Error(
      "Invalid Team entity."
    );
  }

  return repository.create(
    team
  );
}


/*
============================================================
GET BY ID
============================================================
*/

export async function getTeamById(
  id
) {
  const team =
    await repository.getById(id);

  if (!team) {
    return null;
  }

  if (!isTeam(team)) {
    throw new Error(
      `Stored Team "${id}" is invalid.`
    );
  }

  return team;
}


/*
============================================================
LIST
============================================================
*/

export async function listTeams() {
  const teams =
    await repository.list();

  return teams.filter(
    isTeam
  );
}


/*
============================================================
UPDATE
============================================================
*/

export async function updateTeamRecord(
  input
) {
  if (!input?.id) {
    throw new Error(
      "Team requires an id for update."
    );
  }

  const existing =
    await getTeamById(
      input.id
    );

  if (!existing) {
    throw new Error(
      `Team "${input.id}" does not exist.`
    );
  }

  const team =
    createTeam({
      ...existing,
      ...input,
    });

  if (!isTeam(team)) {
    throw new Error(
      "Invalid Team entity."
    );
  }

  return repository.update(
    team
  );
}


/*
============================================================
REMOVE
============================================================
*/

export async function removeTeam(
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

export async function upsertTeam(
  input
) {
  const team =
    createTeam(input);

  if (!team.id) {
    throw new Error(
      "Team requires an id."
    );
  }

  if (!isTeam(team)) {
    throw new Error(
      "Invalid Team entity."
    );
  }

  return repository.upsert(
    team
  );
}


/*
============================================================
PUBLIC API
============================================================
*/

export const teamRepository =
  Object.freeze({
    getById: getTeamById,
    list: listTeams,
    create: createTeamRecord,
    update: updateTeamRecord,
    remove: removeTeam,
    upsert: upsertTeam,
  });


/*
============================================================
DEFAULT EXPORT
============================================================
*/

export default teamRepository;
