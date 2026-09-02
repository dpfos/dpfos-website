import {
  playerRepository,
} from "../repositories/index.js";

export async function updatePlayerOperation({
  id,
  firstName,
  lastName,
  dateOfBirth,
  nationality,
  status,
  metadata,
} = {}) {
  const existingPlayer =
    await playerRepository.getById(id);

  if (!existingPlayer) {
    throw new Error(
      `Player "${id}" was not found.`
    );
  }

  const updatedPlayer = {
    ...existingPlayer,
    ...(firstName !== undefined && {
      firstName,
    }),
    ...(lastName !== undefined && {
      lastName,
    }),
    ...(dateOfBirth !== undefined && {
      dateOfBirth,
    }),
    ...(nationality !== undefined && {
      nationality,
    }),
    ...(status !== undefined && { status }),
    ...(metadata !== undefined && {
      metadata,
    }),
  };

  return playerRepository.upsert(
    updatedPlayer
  );
}

export default updatePlayerOperation;