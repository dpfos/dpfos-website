import {
  playerRepository,
} from "../repositories/index.js";

import {
  createPlayer,
} from "../contracts/player.js";

export async function createPlayerOperation({
  id,
  clubId,
  firstName,
  lastName,
  dateOfBirth = null,
  nationality = null,
  status = "active",
  metadata = {},
} = {}) {
  const player = createPlayer({
    id,
    clubId,
    firstName,
    lastName,
    dateOfBirth,
    nationality,
    status,
    metadata,
  });

  return playerRepository.upsert(player);
}

export default createPlayerOperation;