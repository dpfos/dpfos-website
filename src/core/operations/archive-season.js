import {
  seasonRepository,
} from "../repositories/index.js";

export async function archiveSeasonOperation({
  id,
  repositories = {},
} = {}) {
  if (!id) {
    throw new Error(
      "Season ID is required."
    );
  }

  const {
    season: seasonRepo = seasonRepository,
  } = repositories;

  const existingSeason =
    await seasonRepo.getById(id);

  if (!existingSeason) {
    throw new Error(
      `Season "${id}" was not found.`
    );
  }

  const archivedSeason = {
    ...existingSeason,
    status: "archived",
  };

  return seasonRepo.upsert(
    archivedSeason
  );
}

export default archiveSeasonOperation;