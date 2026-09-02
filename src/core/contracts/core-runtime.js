/*
============================================================
DPF OS — CORE RUNTIME CONTRACT
============================================================

Purpose
------------------------------------------------------------
Canonical result shape returned by the DPF Core Engine when
loading the operational runtime for a ClubContext.

This contract defines the runtime data shape only.

It does NOT:
- authenticate users
- authorize users
- access storage directly
- perform synchronization
- contain AI logic
============================================================
*/

export function createCoreRuntime({
  context,
  club = null,
  teams = [],
  seasons = [],
  players = [],
} = {}) {
  return {
    context,
    club,
    teams: Array.isArray(teams)
      ? teams
      : [],
    seasons: Array.isArray(seasons)
      ? seasons
      : [],
    players: Array.isArray(players)
      ? players
      : [],
  };
}

export function isCoreRuntime(runtime) {
  if (!runtime || typeof runtime !== "object") {
    return false;
  }

  if (!runtime.context) {
    return false;
  }

  if (!Array.isArray(runtime.teams)) {
    return false;
  }

  if (!Array.isArray(runtime.seasons)) {
    return false;
  }

  if (!Array.isArray(runtime.players)) {
    return false;
  }

  return true;
}