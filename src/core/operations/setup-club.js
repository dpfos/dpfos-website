import {
  createClub,
} from "../contracts/club.js";

import {
  createTeam,
} from "../contracts/team.js";

import {
  createSeason,
} from "../contracts/season.js";

import {
  clubRepository,
  teamRepository,
  seasonRepository,
} from "../repositories/index.js";

export async function setupClub({
  club,
  teams = [],
  season = null,
  repositories = {},
} = {}) {
  if (!club?.id) {
    throw new Error(
      "Club data with an ID is required."
    );
  }

  const {
    club: clubRepo = clubRepository,
    team: teamRepo = teamRepository,
    season: seasonRepo = seasonRepository,
  } = repositories;

  const createdClub =
    await clubRepo.upsert(
      createClub(club)
    );

  const createdTeams = [];

  for (const team of teams) {
    const createdTeam =
      await teamRepo.upsert(
        createTeam({
          ...team,
          clubId: club.id,
        })
      );

    createdTeams.push(createdTeam);
  }

  let createdSeason = null;

  if (season) {
    createdSeason =
      await seasonRepo.upsert(
        createSeason({
          ...season,
          clubId: club.id,
        })
      );
  }

  return {
    club: createdClub,
    teams: createdTeams,
    season: createdSeason,
  };
}

export default setupClub;