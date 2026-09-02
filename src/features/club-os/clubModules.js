export const clubModules = [
  {
    id: "club",
    name: "Club",
    category: "Club Operations",
    description:
      "Club structure, organizational setup and operating environment.",
    status: "Active",
  },

  {
    id: "teams",
    name: "Teams",
    category: "Football Operations",
    description:
      "Manage teams, squads and football structures across the club.",
    status: "Active",
  },

  {
    id: "players",
    name: "Players",
    category: "Player Development",
    description:
      "Player profiles, development pathways and individual football information.",
    status: "Development",
  },

  {
    id: "coaching",
    name: "Coaching",
    category: "Coaching Operations",
    description:
      "Technical workflows, coaching operations and staff processes.",
    status: "Development",
  },

  {
    id: "training",
    name: "Training",
    category: "Training Methodology",
    description:
      "Training planning, session architecture and training workflows.",
    status: "Development",
  },

  {
    id: "game-model",
    name: "Game Model",
    category: "Football Intelligence",
    description:
      "Club game model, principles, behaviours and football expression.",
    status: "Development",
  },

  {
    id: "performance",
    name: "Performance",
    category: "Performance Science",
    description:
      "Performance intelligence, monitoring and player development.",
    status: "Development",
  },

  {
    id: "scouting",
    name: "Scouting",
    category: "Talent Identification",
    description:
      "Talent identification, recruitment and scouting workflows.",
    status: "Development",
  },

  {
    id: "academy",
    name: "Academy",
    category: "Youth Development",
    description:
      "Academy operations, youth development and pathway management.",
    status: "Development",
  },

  {
    id: "knowledge",
    name: "Knowledge",
    category: "DPF OS Knowledge",
    description:
      "Connected DPF OS knowledge, principles and operational references.",
    status: "Development",
  },

  {
  id: "ai-engine",
  name: "AI Engine",
  category: "Football Intelligence",
  description:
    "DPF AI intelligence environment for football analysis, reasoning and decision support.",
  status: "Development",
},

  {
    id: "reports",
    name: "Reports",
    category: "Intelligence",
    description:
      "Operational reporting, analysis and club intelligence.",
    status: "Development",
  },
];

export function getClubModuleById(id) {
  return clubModules.find((module) => module.id === id);
}
