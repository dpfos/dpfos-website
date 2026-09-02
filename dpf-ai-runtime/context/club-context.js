/*
============================================================
DPF OS — CLUB CONTEXT
============================================================

Purpose:
Build the canonical operational context for Club Intelligence.

This layer does NOT:
- retrieve DPF knowledge
- call AI providers
- contain business logic
- duplicate club module definitions
- contain authentication logic

It only normalizes club-specific context for the AI layer.
============================================================
*/

export function buildClubContext({
  club = null,
  team = null,
  players = [],
  staff = [],
  currentModule = null,
  requestContext = {},
} = {}) {
  return {
    club: normalizeEntity(club),

    team: normalizeEntity(team),

    players: Array.isArray(players)
      ? players.map(normalizeEntity)
      : [],

    staff: Array.isArray(staff)
      ? staff.map(normalizeEntity)
      : [],

    currentModule,

    requestContext,
  };
}


/*
============================================================
ENTITY NORMALIZATION
============================================================
*/

function normalizeEntity(entity) {
  if (!entity || typeof entity !== "object") {
    return null;
  }

  return {
    ...entity,
  };
}


/*
============================================================
CONTEXT SUMMARY
============================================================
*/

export function summarizeClubContext(context = {}) {
  return {
    clubId:
      context.club?.id ?? null,

    teamId:
      context.team?.id ?? null,

    teamName:
      context.team?.name ?? null,

    playerCount:
      context.players?.length ?? 0,

    staffCount:
      context.staff?.length ?? 0,

    currentModule:
      context.currentModule ?? null,
  };
}