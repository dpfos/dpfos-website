/*
============================================================
DPF OS — TEAM MEMBERSHIP CONTRACT
============================================================

Purpose
------------------------------------------------------------
Canonical relationship between a Player and a Team within
a specific Season.

Membership is intentionally separate from Player and Team
entities so players can move between teams without mutating
their identity record.
============================================================
*/

export function createTeamMembership({
  id = null,
  clubId = null,
  teamId = null,
  playerId = null,
  seasonId = null,
  role = "player",
  status = "active",
  startDate = null,
  endDate = null,
  metadata = {},
} = {}) {
  return {
    id,
    clubId,
    teamId,
    playerId,
    seasonId,
    role,
    status,
    startDate,
    endDate,
    metadata:
      metadata &&
      typeof metadata === "object" &&
      !Array.isArray(metadata)
        ? metadata
        : {},
  };
}

export function isTeamMembership(value) {
  if (!value || typeof value !== "object") {
    return false;
  }

  if (!value.id) {
    return false;
  }

  if (!value.clubId) {
    return false;
  }

  if (!value.teamId) {
    return false;
  }

  if (!value.playerId) {
    return false;
  }

  if (!value.seasonId) {
    return false;
  }

  if (
    !value.metadata ||
    typeof value.metadata !== "object" ||
    Array.isArray(value.metadata)
  ) {
    return false;
  }

  return true;
}
