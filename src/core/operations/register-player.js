import {
  createPlayer,
} from "../contracts/player.js";

import {
  playerRepository,
} from "../repositories/index.js";

export async function registerPlayerOperation({
  player,
  repositories = {},
} = {}) {
  if (!player?.id) {
    throw new Error(
      "Player data with an ID is required."
    );
  }

  const {
    player: playerRepo = playerRepository,
  } = repositories;

  const createdPlayer =
    createPlayer(player);

  return playerRepo.upsert(
    createdPlayer
  );
}

export default registerPlayerOperation;