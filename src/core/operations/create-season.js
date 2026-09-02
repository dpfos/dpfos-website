import {
  seasonRepository,
} from "../repositories/index.js";

import {
  createSeason,
} from "../contracts/season.js";

export async function createSeasonOperation({
  id,
  clubId,
  name,
  startDate = null,
  endDate = null,
  status = "active",
  metadata = {},
} = {}) {
  const season = createSeason({
    id,
    clubId,
    name,
    startDate,
    endDate,
    status,
    metadata,
  });

  return seasonRepository.upsert(season);
}

export default createSeasonOperation;