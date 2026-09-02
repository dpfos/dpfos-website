import {
  createCoreRuntime,
} from "../contracts/core-runtime.js";
import {
  isClubContext,
} from "../contracts/club-context.js";

import {
  clubRepository,
  teamRepository,
  seasonRepository,
  playerRepository,
  teamMembershipRepository,
} from "../repositories/index.js";

export class CoreEngine {
  constructor({
    repositories = {
      club: clubRepository,
      team: teamRepository,
      season: seasonRepository,
      player: playerRepository,
      teamMembership: teamMembershipRepository,
    },
  } = {}) {
    this.repositories = repositories;
  }

  getRepository(name) {
    const repository = this.repositories[name];

    if (!repository) {
      throw new Error(
        `Core repository "${name}" is not registered.`
      );
    }

    return repository;
  }

  resolveContext(context) {
    if (!isClubContext(context)) {
      throw new Error(
        "A valid ClubContext is required."
      );
    }

    return context;
  }

  async getClub(context) {
    const resolvedContext =
      this.resolveContext(context);

    return this.getRepository("club").getById(
      resolvedContext.clubId
    );
  }

  async getTeams(context) {
    const resolvedContext =
      this.resolveContext(context);

    const teams =
      await this.getRepository("team").list();

    return teams.filter(
      (team) =>
        team.clubId === resolvedContext.clubId
    );
  }

  async getSeasons(context) {
    const resolvedContext =
      this.resolveContext(context);

    const seasons =
      await this.getRepository("season").list();

    return seasons.filter(
      (season) =>
        season.clubId === resolvedContext.clubId
    );
  }

  async getPlayers(context) {
    const resolvedContext =
      this.resolveContext(context);

    const players =
      await this.getRepository("player").list();

    return players.filter(
      (player) =>
        player.clubId === resolvedContext.clubId
    );
  }

  async getTeamMemberships(context) {
    const resolvedContext =
      this.resolveContext(context);

    const memberships =
      await this.getRepository(
        "teamMembership"
      ).list();

    return memberships.filter(
      (membership) =>
        membership.teamId ===
        resolvedContext.teamId
    );
  }

  async loadClubRuntime(context) {
    const resolvedContext =
      this.resolveContext(context);

    const [
      club,
      teams,
      seasons,
      players,
    ] = await Promise.all([
      this.getClub(resolvedContext),
      this.getTeams(resolvedContext),
      this.getSeasons(resolvedContext),
      this.getPlayers(resolvedContext),
    ]);

        return createCoreRuntime({
      context: resolvedContext,
      club,
      teams,
      seasons,
      players,
    });
  }
}

export const coreEngine =
  new CoreEngine();

export default coreEngine;