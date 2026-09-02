import { createClub, createTeam } from "../../core/index.js";
import {
  clubRepository,
  teamRepository,
} from "../../core/repositories/index.js";
import { demoClubs } from "./demoClubs.js";

export async function initializeDemoData() {
  for (const demoClub of demoClubs) {
    const club = createClub({
      id: demoClub.id,
      name: demoClub.name,
      status: "active",
      metadata: {
        code: demoClub.code,
        shortName: demoClub.shortName,
        type: demoClub.type,
        description: demoClub.description,
        focus: demoClub.focus,
        demo: true,
      },
    });

    await clubRepository.upsert(club);

    for (const demoTeam of demoClub.teams ?? []) {
      const team = createTeam({
        id: `${demoClub.id}-${demoTeam.id}`,
        clubId: demoClub.id,
        name: demoTeam.name,
        category: demoTeam.category,
        ageGroup: null,
        status: "active",
        metadata: {
          demo: true,
        },
      });

      await teamRepository.upsert(team);
    }
  }

  return true;
}

export default initializeDemoData;
