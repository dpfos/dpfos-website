import assert from "node:assert/strict";

import {
  CoreEngine,
} from "../core-engine.js";

import {
  createClubContext,
} from "../../contracts/club-context.js";

import {
  isCoreRuntime,
} from "../../contracts/core-runtime.js";

import {
  setupClub,
} from "../../operations/setup-club.js";

import {
  archiveTeamOperation,
} from "../../operations/archive-team.js";

import {
  archiveSeasonOperation,
} from "../../operations/archive-season.js";

import {
  registerPlayerOperation,
} from "../../operations/register-player.js";

import {
  assignPlayerToTeamOperation,
} from "../../operations/assign-player-to-team.js";

import {
  removePlayerFromTeamOperation,
} from "../../operations/remove-player-from-team.js";

import {
  resolveOperationalContext,
} from "../../operations/resolve-operational-context.js";

import {
  isOperationalContext,
} from "../../contracts/operational-context.js";

import {
  resolveClubAccess,
} from "../../operations/resolve-club-access.js";

import {
  resolveEntitlements,
} from "../../operations/resolve-entitlements.js";

const repositories = {
  club: {
    async getById(id) {
      return {
        id,
        name: "Test Club",
      };
    },
  },

  team: {
    async list() {
      return [
        {
          id: "team-01",
          clubId: "club-01",
          name: "First Team",
        },
        {
          id: "team-02",
          clubId: "club-02",
          name: "Academy Team",
        },
      ];
    },
  },

  season: {
    async list() {
      return [
        {
          id: "season-01",
          clubId: "club-01",
          name: "2026/27",
        },
        {
          id: "season-02",
          clubId: "club-02",
          name: "2026/27",
        },
      ];
    },
  },

  player: {
    async list() {
      return [
        {
          id: "player-01",
          clubId: "club-01",
          name: "Test Player",
        },
        {
          id: "player-02",
          clubId: "club-02",
          name: "Other Player",
        },
      ];
    },
  },

  teamMembership: {
    async list() {
      return [];
    },
  },
};

const engine =
  new CoreEngine({
    repositories,
  });

const clubContext =
  createClubContext({
    userId: "user-01",
    clubId: "club-01",
    role: "admin",
    permissions: ["club.read"],
    entitlements: ["club-os"],
  });

const club =
  await engine.getClub(clubContext);

assert.equal(
  club.id,
  "club-01"
);

const teams =
  await engine.getTeams(clubContext);

assert.equal(
  teams.length,
  1
);

assert.equal(
  teams[0].id,
  "team-01"
);

const seasons =
  await engine.getSeasons(clubContext);

assert.equal(
  seasons.length,
  1
);

assert.equal(
  seasons[0].id,
  "season-01"
);

const players =
  await engine.getPlayers(clubContext);

assert.equal(
  players.length,
  1
);

assert.equal(
  players[0].id,
  "player-01"
);

const runtime =
  await engine.loadClubRuntime(
    clubContext
  );

assert.equal(
  isCoreRuntime(runtime),
  true
);

assert.equal(
  runtime.context.clubId,
  "club-01"
);

assert.equal(
  runtime.club.id,
  "club-01"
);

assert.equal(
  runtime.teams.length,
  1
);

assert.equal(
  runtime.seasons.length,
  1
);

assert.equal(
  runtime.players.length,
  1
);

assert.throws(
  () => engine.resolveContext(null),
  /A valid ClubContext is required/
);

assert.throws(
  () =>
    engine.resolveContext({
      clubId: "club-01",
    }),
  /A valid ClubContext is required/
);

const setupRepositories = {
  club: {
    async upsert(club) {
      return club;
    },
  },

  team: {
    async upsert(team) {
      return team;
    },
  },

  season: {
    async upsert(season) {
      return season;
    },
  },
};

const setupResult = await setupClub({
  repositories: setupRepositories,

  club: {
    id: "club-setup",
    name: "Setup Club",
  },

  teams: [
    {
      id: "team-setup-01",
      name: "First Team",
    },
    {
      id: "team-setup-02",
      name: "Academy",
    },
  ],

  season: {
    id: "season-setup",
    name: "2026/27",
  },
});

assert.equal(
  setupResult.club.id,
  "club-setup"
);

assert.equal(
  setupResult.teams.length,
  2
);

assert.equal(
  setupResult.teams[0].clubId,
  "club-setup"
);

assert.equal(
  setupResult.teams[1].clubId,
  "club-setup"
);

assert.equal(
  setupResult.season.clubId,
  "club-setup"
);

const archiveTeamRepository = {
  async getById(id) {
    return {
      id,
      clubId: "club-01",
      name: "Reserve Team",
      status: "active",
    };
  },

  async upsert(team) {
    return team;
  },
};

const archivedTeam =
  await archiveTeamOperation({
    id: "team-archive-test",
    repositories: {
      team: archiveTeamRepository,
    },
  });

assert.equal(
  archivedTeam.id,
  "team-archive-test"
);

assert.equal(
  archivedTeam.status,
  "archived"
);

const archiveSeasonRepository = {
  async getById(id) {
    return {
      id,
      clubId: "club-01",
      name: "2025/26",
      status: "active",
    };
  },

  async upsert(season) {
    return season;
  },
};

const archivedSeason =
  await archiveSeasonOperation({
    id: "season-archive-test",
    repositories: {
      season: archiveSeasonRepository,
    },
  });

assert.equal(
  archivedSeason.id,
  "season-archive-test"
);

assert.equal(
  archivedSeason.status,
  "archived"
);


const playerRepositoryForTest = {
  async upsert(player) {
    return player;
  },
};

const registeredPlayer =
  await registerPlayerOperation({
    player: {
      id: "player-register-test",
      clubId: "club-01",
      firstName: "Test",
      lastName: "Player",
    },

    repositories: {
      player: playerRepositoryForTest,
    },
  });

assert.equal(
  registeredPlayer.id,
  "player-register-test"
);

assert.equal(
  registeredPlayer.clubId,
  "club-01"
);


const membershipRepositoryForTest = {
  async upsert(membership) {
    return membership;
  },

  async getById(id) {
    return {
      id,
      teamId: "team-01",
      playerId: "player-register-test",
      seasonId: "season-archive-test",
      status: "active",
    };
  },

  async remove() {
    return true;
  },
};

const assignedMembership =
  await assignPlayerToTeamOperation({
    membership: {
      id: "membership-test",
      teamId: "team-01",
      playerId: "player-register-test",
      seasonId: "season-archive-test",
      status: "active",
    },

    repositories: {
      teamMembership:
        membershipRepositoryForTest,
    },
  });

assert.equal(
  assignedMembership.id,
  "membership-test"
);

assert.equal(
  assignedMembership.teamId,
  "team-01"
);

assert.equal(
  assignedMembership.playerId,
  "player-register-test"
);


const removedMembership =
  await removePlayerFromTeamOperation({
    id: "membership-test",

    repositories: {
      teamMembership:
        membershipRepositoryForTest,
    },
  });

assert.equal(
  removedMembership,
  true
);

const operationalContext =
  await resolveOperationalContext({
    clubId: "club-01",
    teamId: "team-01",
    seasonId: "season-01",
    userId: "user-01",
    role: "admin",

    repositories: {
      club: {
        async getById(id) {
          return {
            id,
            name: "Test Club",
          };
        },
      },

      team: {
        async list() {
          return [
            {
              id: "team-01",
              clubId: "club-01",
              name: "First Team",
            },
            {
              id: "team-02",
              clubId: "club-02",
              name: "Academy Team",
            },
          ];
        },
      },

      season: {
        async list() {
          return [
            {
              id: "season-01",
              clubId: "club-01",
              name: "2026/27",
            },
            {
              id: "season-02",
              clubId: "club-02",
              name: "2026/27",
            },
          ];
        },
      },
    },
  });

assert.equal(
  isOperationalContext(
    operationalContext
  ),
  true
);

assert.equal(
  operationalContext.club.id,
  "club-01"
);

assert.equal(
  operationalContext.team.id,
  "team-01"
);

assert.equal(
  operationalContext.season.id,
  "season-01"
);

assert.equal(
  operationalContext.context.clubId,
  "club-01"
);

await assert.rejects(
  () =>
    resolveOperationalContext({
      clubId: "club-01",
      teamId: "team-02",

      repositories: {
        club: {
          async getById(id) {
            return {
              id,
              name: "Test Club",
            };
          },
        },

        team: {
          async list() {
            return [
              {
                id: "team-01",
                clubId: "club-01",
                name: "First Team",
              },
            ];
          },
        },

        season: {
          async list() {
            return [];
          },
        },
      },
    }),
  /does not belong to club/
);

const allowedClubAccess =
  resolveClubAccess({
    session: {
      isAuthenticated: true,

      user: {
        role: "club_admin",
      },

      entitlements: [
        "club_os",
      ],

      clubMemberships: [
        {
          clubId: "club-01",
        },
      ],
    },

    clubId: "club-01",
  });

assert.equal(
  allowedClubAccess.allowed,
  true
);

assert.equal(
  allowedClubAccess.clubId,
  "club-01"
);

assert.equal(
  allowedClubAccess.reason,
  null
);

const deniedClubAccess =
  resolveClubAccess({
    session: {
      isAuthenticated: true,

      user: {
        role: "club_admin",
      },

      entitlements: [
        "club_os",
      ],

      clubMemberships: [
        {
          clubId: "club-01",
        },
      ],
    },

    clubId: "club-02",
  });

assert.equal(
  deniedClubAccess.allowed,
  false
);

assert.equal(
  deniedClubAccess.reason,
  "CLUB_ACCESS_DENIED"
);

const missingSessionAccess =
  resolveClubAccess({
    clubId: "club-01",
  });

assert.equal(
  missingSessionAccess.allowed,
  false
);

assert.equal(
  missingSessionAccess.reason,
  "SESSION_REQUIRED"
);

const entitlementContext =
  resolveEntitlements({
    session: {
      user: {
        id: "user-01",
        role: "club_admin",
      },

      subscriptions: [],

      purchases: [],

      entitlements: [
        {
          id: "club_os",
          status: "active",
        },
      ],
    },
  });

assert.equal(
  entitlementContext.userId,
  "user-01"
);

assert.equal(
  entitlementContext.userTier,
  "club"
);

assert.equal(
  entitlementContext.entitlements.length,
  1
);

assert.equal(
  entitlementContext.entitlements[0].id,
  "club_os"
);

assert.ok(
  entitlementContext.matrix
);

console.log(
  "CoreEngine smoke test passed."
);