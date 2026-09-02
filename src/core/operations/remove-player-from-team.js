import {
  teamMembershipRepository,
} from "../repositories/index.js";

export async function removePlayerFromTeamOperation({
  id,
  repositories = {},
} = {}) {
  if (!id) {
    throw new Error(
      "Team membership ID is required."
    );
  }

  const {
    teamMembership: membershipRepo =
      teamMembershipRepository,
  } = repositories;

  const existingMembership =
    await membershipRepo.getById(id);

  if (!existingMembership) {
    throw new Error(
      `Team membership "${id}" was not found.`
    );
  }

  await membershipRepo.remove(id);

  return true;
}

export default removePlayerFromTeamOperation;