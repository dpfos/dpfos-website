import {
  clubRepository,
} from "../repositories/index.js";

export async function updateClubOperation({
  id,
  name,
  status,
  metadata,
} = {}) {
  const existingClub =
    await clubRepository.getById(id);

  if (!existingClub) {
    throw new Error(
      `Club "${id}" was not found.`
    );
  }

  const updatedClub = {
    ...existingClub,
    ...(name !== undefined && { name }),
    ...(status !== undefined && { status }),
    ...(metadata !== undefined && {
      metadata,
    }),
  };

  return clubRepository.upsert(updatedClub);
}

export default updateClubOperation;