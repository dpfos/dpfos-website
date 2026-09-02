import {
  clubRepository,
} from "../repositories/index.js";

import {
  createClub,
} from "../contracts/club.js";

export async function createClubOperation({
  id,
  name,
  status = "active",
  metadata = {},
} = {}) {
  const club = createClub({
    id,
    name,
    status,
    metadata,
  });

  return clubRepository.upsert(club);
}

export default createClubOperation;