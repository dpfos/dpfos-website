import {
  seasonRepository,
} from "../repositories/index.js";

export async function updateSeasonOperation({
  id,
  name,
  startDate,
  endDate,
  status,
  metadata,
} = {}) {
  const existingSeason =
    await seasonRepository.getById(id);

  if (!existingSeason) {
    throw new Error(
      `Season "${id}" was not found.`
    );
  }

  const updatedSeason = {
    ...existingSeason,
    ...(name !== undefined && { name }),
    ...(startDate !== undefined && {
      startDate,
    }),
    ...(endDate !== undefined && {
      endDate,
    }),
    ...(status !== undefined && { status }),
    ...(metadata !== undefined && {
      metadata,
    }),
  };

  return seasonRepository.upsert(
    updatedSeason
  );
}

export default updateSeasonOperation;