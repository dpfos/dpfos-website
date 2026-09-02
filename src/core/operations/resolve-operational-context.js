import {
  coreEngine,
} from "../engine/core-engine.js";

import {
  createClubContext,
} from "../contracts/club-context.js";

import {
  createOperationalContext,
} from "../contracts/operational-context.js";

export async function resolveOperationalContext({
  clubId,
  teamId = null,
  seasonId = null,
  userId = null,
  organizationId = null,
  role = null,
  permissions = [],
  entitlements = [],
  repositories = {},
} = {}) {
  if (!clubId) {
    throw new Error(
      "Club ID is required."
    );
  }

  const context =
    createClubContext({
      userId,
      organizationId,
      clubId,
      teamId,
      seasonId,
      role,
      permissions,
      entitlements,
    });

  const {
    club: clubRepository =
      repositories.club,
    team: teamRepository =
      repositories.team,
    season: seasonRepository =
      repositories.season,
  } = repositories;

  const [
    club,
    teams,
    seasons,
  ] = await Promise.all([
    clubRepository
      ? clubRepository.getById(clubId)
      : coreEngine.getClub(context),

    teamRepository
      ? teamRepository.list()
      : coreEngine.getTeams(context),

    seasonRepository
      ? seasonRepository.list()
      : coreEngine.getSeasons(context),
  ]);

  const clubTeams =
    teamRepository
      ? teams.filter(
          (team) =>
            team.clubId === clubId
        )
      : teams;

  const clubSeasons =
    seasonRepository
      ? seasons.filter(
          (season) =>
            season.clubId === clubId
        )
      : seasons;

  if (!club) {
    throw new Error(
      `Club "${clubId}" was not found.`
    );
  }

  let team = null;

  if (teamId) {
    team =
      clubTeams.find(
        (item) =>
          item.id === teamId
      ) ?? null;

    if (!team) {
      throw new Error(
        `Team "${teamId}" does not belong to club "${clubId}".`
      );
    }
  }

  let season = null;

  if (seasonId) {
    season =
      clubSeasons.find(
        (item) =>
          item.id === seasonId
      ) ?? null;

    if (!season) {
      throw new Error(
        `Season "${seasonId}" does not belong to club "${clubId}".`
      );
    }
  }

  return createOperationalContext({
    context,
    club,
    team,
    season,
  });
}

export default resolveOperationalContext;
