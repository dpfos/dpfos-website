import {
  clubRepository,
} from "../repositories/index.js";

export async function getClubs({
  repositories = {},
} = {}) {
  const {
    club: clubRepo = clubRepository,
  } = repositories;

  return clubRepo.list();
}

export default getClubs;