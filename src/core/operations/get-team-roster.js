import {
  getPlayers,
} from "./get-players.js";

import {
  getTeamMemberships,
} from "./get-team-memberships.js";

export async function getTeamRoster({
  clubId,
  teamId,
  userId = null,
  organizationId = null,
  seasonId = null,
  role = null,
  permissions = [],
  entitlements = [],
} = {}) {
  if (!teamId) {
    throw new Error(
      "Team ID is required."
    );
  }

  const [
    players,
    memberships,
  ] = await Promise.all([
    getPlayers({
      clubId,
      userId,
      organizationId,
      teamId,
      seasonId,
      role,
      permissions,
      entitlements,
    }),

    getTeamMemberships({
      clubId,
      userId,
      organizationId,
      teamId,
      seasonId,
      role,
      permissions,
      entitlements,
    }),
  ]);

  const playersById =
    new Map(
      players.map(
        (player) => [
          player.id,
          player,
        ]
      )
    );

  return memberships
    .filter(
      (membership) =>
        membership.status !== "archived"
    )
    .map(
      (membership) => ({
        membership,
        player:
          playersById.get(
            membership.playerId
          ) ?? null,
      })
    )
    .filter(
      ({ player }) => player !== null
    );
}

export default getTeamRoster;