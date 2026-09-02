/*
============================================================
DPF OS — TEAM MEMBERSHIP REPOSITORY
============================================================

Purpose
------------------------------------------------------------
Canonical repository for Team Membership domain entities.

Architecture
------------------------------------------------------------
Team Membership Contract
          ↓
Team Membership Repository
          ↓
Local Repository
          ↓
IndexedDB

Responsibilities
------------------------------------------------------------
- Validate Team Membership entities
- Expose Team Membership persistence operations
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
  createTeamMembership,
  isTeamMembership,
} from "../contracts/team-membership.js";

import {
  getRepository,
} from "../storage/local-repository-registry.js";


/*
============================================================
DEPENDENCY
============================================================
*/

const repository =
  getRepository("team-membership");

if (!repository) {
  throw new Error(
    'Team Membership repository dependency "team-membership" is not registered.'
  );
}


/*
============================================================
CREATE
============================================================
*/

export async function createTeamMembershipRecord(
  input
) {
  const membership =
    createTeamMembership(input);

  if (!membership.id) {
    throw new Error(
      "Team Membership requires an id before persistence."
    );
  }

  if (!membership.clubId) {
    throw new Error(
      "Team Membership requires a clubId."
    );
  }

  if (!membership.teamId) {
    throw new Error(
      "Team Membership requires a teamId."
    );
  }

  if (!membership.playerId) {
    throw new Error(
      "Team Membership requires a playerId."
    );
  }

  if (!membership.seasonId) {
    throw new Error(
      "Team Membership requires a seasonId."
    );
  }

  if (!isTeamMembership(membership)) {
    throw new Error(
      "Invalid Team Membership entity."
    );
  }

  return repository.create(
    membership
  );
}


/*
============================================================
GET BY ID
============================================================
*/

export async function getTeamMembershipById(
  id
) {
  const membership =
    await repository.getById(id);

  if (!membership) {
    return null;
  }

  if (!isTeamMembership(membership)) {
    throw new Error(
      `Stored Team Membership "${id}" is invalid.`
    );
  }

  return membership;
}


/*
============================================================
LIST
============================================================
*/

export async function listTeamMemberships() {
  const memberships =
    await repository.list();

  return memberships.filter(
    isTeamMembership
  );
}


/*
============================================================
UPDATE
============================================================
*/

export async function updateTeamMembershipRecord(
  input
) {
  if (!input?.id) {
    throw new Error(
      "Team Membership requires an id for update."
    );
  }

  const existing =
    await getTeamMembershipById(
      input.id
    );

  if (!existing) {
    throw new Error(
      `Team Membership "${input.id}" does not exist.`
    );
  }

  const membership =
    createTeamMembership({
      ...existing,
      ...input,
    });

  if (!isTeamMembership(membership)) {
    throw new Error(
      "Invalid Team Membership entity."
    );
  }

  return repository.update(
    membership
  );
}


/*
============================================================
REMOVE
============================================================
*/

export async function removeTeamMembership(
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

export async function upsertTeamMembership(
  input
) {
  const membership =
    createTeamMembership(input);

  if (!membership.id) {
    throw new Error(
      "Team Membership requires an id."
    );
  }

  if (!isTeamMembership(membership)) {
    throw new Error(
      "Invalid Team Membership entity."
    );
  }

  return repository.upsert(
    membership
  );
}


/*
============================================================
PUBLIC API
============================================================
*/

export const teamMembershipRepository =
  Object.freeze({
    getById: getTeamMembershipById,
    list: listTeamMemberships,
    create: createTeamMembershipRecord,
    update: updateTeamMembershipRecord,
    remove: removeTeamMembership,
    upsert: upsertTeamMembership,
  });


/*
============================================================
DEFAULT EXPORT
============================================================
*/

export default teamMembershipRepository;
