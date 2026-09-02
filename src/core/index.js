/*
============================================================
DPF OS ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â CORE PUBLIC API
============================================================

Purpose
------------------------------------------------------------
Single canonical public entry point for the DPF OS Core.

Higher application layers should import Core capabilities
from this entry point whenever practical.

The Core remains independent from UI concerns.
============================================================
*/

export * from "./contracts/index.js";

export * from "./repositories/index.js";

export {
  indexedDBStore,
  createLocalRepository,
  getRepository,
  hasRepository,
  listRepositories,
  registerLocalRepositories,
} from "./storage/index.js";

export {
  CoreEngine,
  coreEngine,
} from "./engine/core-engine.js";


export {
  createCoreRuntime,
  isCoreRuntime,
} from "./contracts/core-runtime.js";


export {
  bootstrapClubRuntime,
} from "./operations/bootstrap-club-runtime.js";





export {
  getClubs,
} from "./operations/get-clubs.js";

export {
  getTeams,
} from "./operations/get-teams.js";

export {
  getSeasons,
} from "./operations/get-seasons.js";

export {
  getPlayers,
} from "./operations/get-players.js";


export {
  createClubOperation,
} from "./operations/create-club.js";


export {
  updateClubOperation,
} from "./operations/update-club.js";


export {
  createTeamOperation,
} from "./operations/create-team.js";


export {
  updateTeamOperation,
} from "./operations/update-team.js";


export {
  createSeasonOperation,
} from "./operations/create-season.js";

export {
  updateSeasonOperation,
} from "./operations/update-season.js";

export {
  createPlayerOperation,
} from "./operations/create-player.js";

export {
  updatePlayerOperation,
} from "./operations/update-player.js";

export {
  createTeamMembershipOperation,
} from "./operations/create-team-membership.js";

export {
  removeTeamMembershipOperation,
} from "./operations/remove-team-membership.js";


export {
  setupClub,
} from "./operations/setup-club.js";

export {
  archiveTeamOperation,
} from "./operations/archive-team.js";

export {
  archiveSeasonOperation,
} from "./operations/archive-season.js";

export {
  registerPlayerOperation,
} from "./operations/register-player.js";

export {
  assignPlayerToTeamOperation,
} from "./operations/assign-player-to-team.js";

export {
  removePlayerFromTeamOperation,
} from "./operations/remove-player-from-team.js";


export {
  refreshClubRuntime,
} from "./operations/refresh-club-runtime.js";

export {
  getTeamMemberships,
} from "./operations/get-team-memberships.js";

export {
  getTeamRoster,
} from "./operations/get-team-roster.js";

export {
  createOperationalContext,
  isOperationalContext,
} from "./contracts/operational-context.js";

export {
  resolveOperationalContext,
} from "./operations/resolve-operational-context.js";

export {
  canAccessPremium,
} from "./access/accessContext.js";

export {
  resolveClubAccess,
} from "./operations/resolve-club-access.js";

export {
  resolveEntitlements,
} from "./operations/resolve-entitlements.js";


export {
  DPFAuthProvider,
  DPFAuthContext,
  useDPFAuth,
} from "./auth/index.js";
