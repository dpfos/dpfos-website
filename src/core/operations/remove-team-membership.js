import {
  teamMembershipRepository,
} from "../repositories/index.js";

export async function removeTeamMembershipOperation({
  id,
} = {}) {
  if (!id) {
    throw new Error(
      "Team membership ID is required."
    );
  }

  const existingMembership =
    await teamMembershipRepository.getById(id);

  if (!existingMembership) {
    throw new Error(
      `Team membership "${id}" was not found.`
    );
  }

  await teamMembershipRepository.remove(id);

  return true;
}

export default removeTeamMembershipOperation;