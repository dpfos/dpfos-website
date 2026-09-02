import {
  createTeamMembership,
} from "../contracts/team-membership.js";

import {
  teamMembershipRepository,
} from "../repositories/index.js";

export async function assignPlayerToTeamOperation({
  membership,
  repositories = {},
} = {}) {
  if (!membership?.id) {
    throw new Error(
      "Team membership data with an ID is required."
    );
  }

  const {
    teamMembership: membershipRepo =
      teamMembershipRepository,
  } = repositories;

  const createdMembership =
    createTeamMembership(
      membership
    );

  return membershipRepo.upsert(
    createdMembership
  );
}

export default assignPlayerToTeamOperation;