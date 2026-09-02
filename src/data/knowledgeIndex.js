/*
============================================================
DPF OS — MASTER KNOWLEDGE INDEX
============================================================
*/

export const KNOWLEDGE_TYPES = [
  "book",
  "concept",
  "role",
  "skill",
  "method",
  "practice",
  "tool",
  "equipment",
  "metric",
  "technology",
  "ai",
  "framework",
  "process",
  "model",
  "research",
  "training",
  "performance",
  "organization",
  "resource",
];

export const KNOWLEDGE_LABELS = {
  book: "BOOK",
  concept: "CONCEPT",
  role: "ROLE",
  skill: "SKILL",
  method: "METHOD",
  practice: "PRACTICE",
  tool: "TOOL",
  equipment: "EQUIPMENT",
  metric: "METRIC",
  technology: "TECHNOLOGY",
  ai: "AI",
  framework: "FRAMEWORK",
  process: "PROCESS",
  model: "MODEL",
  research: "RESEARCH",
  training: "TRAINING",
  performance: "PERFORMANCE",
  organization: "ORGANIZATION",
  resource: "RESOURCE",
};

export const KNOWLEDGE_GROUPS = {
  football: [
    "concept",
    "role",
    "skill",
    "method",
    "practice",
    "training",
    "performance",
  ],

  system: [
    "book",
    "framework",
    "process",
    "model",
    "tool",
  ],

  technology: [
    "equipment",
    "metric",
    "technology",
    "ai",
  ],

  intelligence: [
    "research",
    "resource",
    "organization",
  ],
};

/*
============================================================
SEARCH SYNONYMS
============================================================
*/

export const SEARCH_SYNONYMS = {
  ceo: [
    "ceo",
    "executive leadership",
    "governance",
    "leadership",
  ],

  director: [
    "sporting director",
    "technical director",
    "football director",
    "director",
  ],

  talent: [
    "talent identification",
    "talent id",
    "scouting",
    "player evaluation",
  ],

  recruitment: [
    "recruitment",
    "scouting",
    "talent identification",
    "player profiling",
  ],

  training: [
    "training",
    "coaching",
    "training design",
    "session design",
  ],

  coach: [
    "coach",
    "coaching",
    "coaching methodology",
    "training",
  ],

  player: [
    "player",
    "player development",
    "individual growth",
  ],

  academy: [
    "academy",
    "youth development",
    "academy development",
    "pathway",
  ],

  role: [
    "role",
    "roles",
    "role atlas",
    "responsibilities",
    "behaviours",
  ],

  position: [
    "position",
    "role",
    "positional role",
    "positioning",
  ],

  tactics: [
    "tactics",
    "playbook",
    "tactical concepts",
    "game model",
  ],

  attack: [
    "attack",
    "attacking",
    "in possession",
    "game model",
  ],

  defense: [
    "defense",
    "defending",
    "out of possession",
    "game model",
  ],

  transition: [
    "transition",
    "transitions",
    "turnover",
    "game model",
  ],

  performance: [
    "performance",
    "performance labs",
    "measurement",
    "monitoring",
  ],

  data: [
    "data",
    "analytics",
    "intelligence",
    "evidence",
  ],

  analytics: [
    "analytics",
    "performance",
    "intelligence",
    "data",
  ],

  governance: [
    "governance",
    "institutional framework",
    "leadership",
    "structure",
  ],

  philosophy: [
    "philosophy",
    "the way",
    "football philosophy",
    "beliefs",
  ],

  culture: [
    "culture",
    "the way",
    "values",
    "mindset",
  ],

  structure: [
    "structure",
    "architecture",
    "blueprint",
    "institutional framework",
  ],

  system: [
    "system",
    "dpf os",
    "architecture",
    "operating model",
  ],

  technology: [
    "technology",
    "tech",
    "tracking",
    "analysis",
  ],

  camera: [
    "camera",
    "video camera",
    "match camera",
    "training camera",
    "video",
  ],

  gps: [
    "gps",
    "gps tracking",
    "player tracking",
    "tracking",
  ],

  ai: [
    "ai",
    "artificial intelligence",
    "computer vision",
    "machine learning",
  ],

  metrics: [
    "metrics",
    "measurement",
    "testing",
    "kpis",
    "monitoring",
  ],

  rondo: [
    "rondo",
    "possession game",
    "keep away",
  ],

  ssg: [
    "ssg",
    "small sided game",
    "small-sided game",
    "small sided games",
  ],

  trivela: [
    "trivela",
    "outside foot",
    "outside-foot strike",
    "outside of the foot",
  ],

  dribbling: [
    "dribbling",
    "dribble",
    "ball carrying",
    "1v1",
  ],

  skills: [
    "skills",
    "individual skills",
    "technical skills",
    "football skills",
    "technique",
  ],
};

/*
============================================================
SYSTEM KNOWLEDGE
============================================================
*/

export const SYSTEM_KNOWLEDGE = [
  {
    id: "trivela",
    type: "glossary",
    knowledgeType: "skill",
    title: "Trivela",
    term: "Trivela",
    category: "SKILL · BALL STRIKING",
    definition:
      "An outside-of-the-foot striking action used to alter the ball's flight, angle or disguise the intended execution.",
    aliases: [
      "outside of the foot",
      "outside-foot strike",
    ],
    domain: [
      "technical",
      "ball striking",
      "skills",
    ],
    related: [
      "ball striking",
      "passing",
      "crossing",
      "finishing",
    ],
    tags: [
      "individual skills",
      "technique",
      "ball mastery",
    ],
  },

  {
    id: "rondo",
    type: "glossary",
    knowledgeType: "practice",
    title: "Rondo",
    term: "Rondo",
    category: "PRACTICE · TRAINING",
    definition:
      "A constrained possession practice designed to develop passing, receiving, support, scanning and pressure-related behaviours.",
    aliases: [
      "possession game",
      "keep-away",
    ],
    domain: [
      "training",
      "technical",
      "tactical",
    ],
    related: [
      "small-sided game",
      "positional play",
      "support",
      "scanning",
    ],
    tags: [
      "practice",
      "training",
      "possession",
    ],
  },

  {
    id: "small-sided-game",
    type: "glossary",
    knowledgeType: "practice",
    title: "Small-Sided Game",
    term: "Small-Sided Game",
    category: "PRACTICE · TRAINING",
    definition:
      "A reduced-player practice designed to reproduce selected game behaviours under controlled conditions.",
    aliases: [
      "SSG",
      "small sided game",
      "small-sided games",
    ],
    domain: [
      "training",
      "tactics",
      "development",
    ],
    related: [
      "game-based training",
      "rondo",
      "representative practice",
    ],
    tags: [
      "practice",
      "training",
    ],
  },

  {
    id: "individual-skills",
    type: "glossary",
    knowledgeType: "framework",
    title: "Individual Skills",
    term: "Individual Skills",
    category: "FRAMEWORK · PLAYER DEVELOPMENT",
    definition:
      "The technical action layer covering ball mastery, receiving, passing, carrying, dribbling, striking, finishing and 1v1 execution.",
    aliases: [
      "technical skills",
      "football skills",
      "individual technique",
    ],
    domain: [
      "player development",
      "technical",
      "skills",
    ],
    related: [
      "dribbling",
      "receiving",
      "passing",
      "1v1",
      "ball mastery",
    ],
    tags: [
      "player development",
      "technical",
    ],
  },

  {
    id: "one-v-one",
    type: "glossary",
    knowledgeType: "skill",
    title: "1v1",
    term: "1v1",
    category: "SKILL · INDIVIDUAL TACTICS",
    definition:
      "An individual duel in which a player attempts to gain an advantage over a direct opponent through action, timing, movement or technique.",
    aliases: [
      "one versus one",
      "1v1 duel",
      "individual duel",
    ],
    domain: [
      "technical",
      "individual tactics",
      "skills",
    ],
    related: [
      "dribbling",
      "isolation",
      "feints",
      "elimination",
    ],
    tags: [
      "individual skills",
      "duel",
    ],
  },

  {
    id: "performance-labs",
    type: "glossary",
    knowledgeType: "performance",
    title: "Performance Labs",
    term: "Performance Labs",
    category: "PERFORMANCE · SYSTEM",
    definition:
      "The DPF performance layer connecting assessment, measurement, monitoring, testing, evidence and player or team performance interpretation.",
    aliases: [
      "performance laboratory",
      "performance lab",
    ],
    domain: [
      "performance",
      "measurement",
      "monitoring",
    ],
    related: [
      "metrics",
      "testing",
      "GPS",
      "tracking",
      "performance analysis",
    ],
    tags: [
      "performance",
      "measurement",
    ],
  },

  {
    id: "coach-toolkit",
    type: "glossary",
    knowledgeType: "tool",
    title: "Coach Toolkit",
    term: "Coach Toolkit",
    category: "TOOLKIT · COACHING",
    definition:
      "A structured collection of tools used to plan, design, deliver, observe and review football coaching work.",
    aliases: [
      "coaching toolkit",
      "coach tools",
    ],
    domain: [
      "coaching",
      "training",
      "operations",
    ],
    related: [
      "session planner",
      "training design",
      "observation",
      "feedback",
    ],
    tags: [
      "toolkit",
      "coaching",
    ],
  },

  {
    id: "gps",
    type: "glossary",
    knowledgeType: "technology",
    title: "GPS",
    term: "GPS",
    category: "TECHNOLOGY · TRACKING",
    definition:
      "A positioning technology used in football environments to capture movement and workload information.",
    aliases: [
      "GPS tracking",
      "player tracking",
    ],
    domain: [
      "technology",
      "tracking",
      "performance",
    ],
    related: [
      "metrics",
      "load",
      "monitoring",
      "performance labs",
    ],
    tags: [
      "technology",
      "tracking",
    ],
  },

  {
    id: "video-analysis",
    type: "glossary",
    knowledgeType: "technology",
    title: "Video Analysis",
    term: "Video Analysis",
    category: "TECHNOLOGY · ANALYSIS",
    definition:
      "The structured use of recorded football footage to observe, classify and interpret player, team or opposition behaviour.",
    aliases: [
      "video analysis",
      "match video",
      "video scouting",
    ],
    domain: [
      "analysis",
      "technology",
      "scouting",
    ],
    related: [
      "match analysis",
      "opposition analysis",
      "performance analysis",
    ],
    tags: [
      "technology",
      "analysis",
    ],
  },

  {
    id: "artificial-intelligence",
    type: "glossary",
    knowledgeType: "ai",
    title: "Artificial Intelligence",
    term: "Artificial Intelligence",
    category: "AI · INTELLIGENCE",
    definition:
      "Computational methods that can support football knowledge retrieval, analysis, pattern recognition and decision support within defined football logic.",
    aliases: [
      "AI",
      "artificial intelligence",
    ],
    domain: [
      "AI",
      "intelligence",
      "technology",
    ],
    related: [
      "computer vision",
      "data",
      "analytics",
      "knowledge retrieval",
    ],
    tags: [
      "AI",
      "technology",
    ],
  },

  {
    id: "computer-vision",
    type: "glossary",
    knowledgeType: "ai",
    title: "Computer Vision",
    term: "Computer Vision",
    category: "AI · VIDEO",
    definition:
      "AI-based visual processing used to extract structured information from images or football video.",
    aliases: [
      "CV",
      "visual AI",
    ],
    domain: [
      "AI",
      "video",
      "tracking",
    ],
    related: [
      "video analysis",
      "tracking",
      "computer vision",
    ],
    tags: [
      "AI",
      "technology",
    ],
  },

  {
    id: "measurement",
    type: "glossary",
    knowledgeType: "metric",
    title: "Measurement",
    term: "Measurement",
    category: "METRIC · PERFORMANCE",
    definition:
      "The structured capture of observable or quantifiable information used to understand performance, development or operational state.",
    aliases: [
      "performance measurement",
      "assessment",
    ],
    domain: [
      "performance",
      "metrics",
      "assessment",
    ],
    related: [
      "testing",
      "monitoring",
      "KPIs",
      "performance labs",
    ],
    tags: [
      "metrics",
      "performance",
    ],
  },

  {
    id: "tools",
    type: "glossary",
    knowledgeType: "tool",
    title: "Tools",
    term: "Tools",
    category: "TOOLS · DPF OS",
    definition:
      "Operational instruments used to apply, assess, plan, implement or manage components of the DPF OS.",
    aliases: [
      "DPF tools",
      "football tools",
      "toolkit",
    ],
    domain: [
      "operations",
      "implementation",
      "coaching",
    ],
    related: [
      "coach toolkit",
      "assessment",
      "planning",
      "implementation",
    ],
    tags: [
      "tools",
      "operations",
    ],
  },

  {
    id: "equipment",
    type: "glossary",
    knowledgeType: "equipment",
    title: "Equipment",
    term: "Equipment",
    category: "EQUIPMENT · FOOTBALL",
    definition:
      "Physical equipment used in football training, measurement, tracking, testing, video capture or performance work.",
    aliases: [
      "training equipment",
      "performance equipment",
    ],
    domain: [
      "training",
      "performance",
      "technology",
    ],
    related: [
      "GPS",
      "camera",
      "testing",
      "measurement",
    ],
    tags: [
      "equipment",
    ],
  },

  {
    id: "camera",
    type: "glossary",
    knowledgeType: "equipment",
    title: "Camera",
    term: "Camera",
    category: "EQUIPMENT · VIDEO",
    definition:
      "A video capture device used to record training, matches or performance activities for later analysis.",
    aliases: [
      "video camera",
      "match camera",
      "training camera",
    ],
    domain: [
      "video",
      "analysis",
      "equipment",
    ],
    related: [
      "video analysis",
      "match analysis",
      "scouting",
    ],
    tags: [
      "equipment",
      "video",
    ],
  },
];

/*
============================================================
NORMALIZATION
============================================================
*/

export function normalizeKnowledge(value = "") {
  return value
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’']/g, "")
    .replace(/[-_/]/g, " ")
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function createKnowledgeId(value = "") {
  return normalizeKnowledge(value).replace(/\s+/g, "-");
}

/*
============================================================
QUERY EXPANSION
============================================================
*/

export function expandQueryTerms(query = "") {
  const normalized = normalizeKnowledge(query);

  if (!normalized) {
    return [];
  }

  const tokens = normalized
    .split(/\s+/)
    .filter(Boolean);

  const expanded = new Set(tokens);

  Object.entries(SEARCH_SYNONYMS).forEach(
    ([key, values]) => {
      const keyNorm = normalizeKnowledge(key);

      const keyMatches =
        normalized === keyNorm ||
        normalized.includes(keyNorm);

      const valueMatches = values.some(
        (value) => {
          const valueNorm =
            normalizeKnowledge(value);

          return (
            valueNorm === normalized ||
            valueNorm.includes(normalized)
          );
        }
      );

      if (keyMatches || valueMatches) {
        expanded.add(keyNorm);

        values.forEach((value) => {
          normalizeKnowledge(value)
            .split(/\s+/)
            .filter(Boolean)
            .forEach((token) => {
              expanded.add(token);
            });
        });
      }
    }
  );

  return [...expanded];
}

export default SYSTEM_KNOWLEDGE;