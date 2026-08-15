const books = [
  {
    number: "01",
    slug: "constitution",
    title: "The DPF Constitution",
    category: "FOUNDATION",
    status: "FINAL",
    version: "v1.0",
    description:
      "The foundational charter defining the identity, principles and governing logic of the DPF Operating System.",
    cover: "/covers/volume-01.png",
    pdf: "/books/constitution/01%20The%20DPF%20Constitution%20v1.0.pdf",
  },

  {
    number: "02",
    slug: "the-way",
    title: "The DPF Way",
    category: "PHILOSOPHY",
    status: "FINAL",
    version: "v1.0",
    description:
      "The philosophy, mindset and way of thinking that guide the DPF football environment.",
    cover: "/covers/volume-02.png",
    pdf: "/books/the-way/02%20The%20DPF%20Way%20v1.0.pdf",
  },

  {
    number: "03",
    slug: "blueprint",
    title: "The DPF Blueprint",
    category: "ARCHITECTURE",
    status: "FINAL",
    version: "v1.0",
    description:
      "The structural blueprint translating DPF principles into an integrated football operating system.",
    cover: "/covers/volume-03.png",
    pdf: "/books/blueprint/03%20DPF%20Blueprint%20v1.0.pdf",
  },

  {
    number: "04",
    slug: "architectural-principles",
    title: "DPF Architectural Principles",
    category: "SYSTEM",
    status: "FINAL",
    version: "v1.0",
    description:
      "The principles governing the design, organization and interaction of the DPF football environment.",
    cover: "/covers/volume-04.png",
    pdf: "/books/architectural-principles/04%20DPF%20Architectural%20Principles%20v1.0.pdf",
  },

  {
    number: "05",
    slug: "institutional-framework",
    title: "DPF Institutional Framework",
    category: "INSTITUTION",
    status: "FINAL",
    version: "v1.1",
    description:
      "The organizational framework connecting leadership, governance, operations and football development.",
    cover: "/covers/volume-05.png",
    pdf: "/books/institutional-framework/05%20DPF%20Institutional%20Framework%20v1.1.pdf",
  },

  {
    number: "06",
    slug: "game-model",
    title: "The DPF Game Model",
    category: "GAME MODEL",
    status: "FINAL",
    version: "v1.0",
    description:
      "The tactical architecture translating DPF philosophy and methodology into collective football behavior.",
    cover: "/covers/volume-06.png",
    pdf: "",
  },

  {
    number: "07",
    slug: "coaching-manual",
    title: "The DPF Coaching Manual",
    category: "COACHING",
    status: "FINAL",
    version: "v1.0",
    description:
      "A coaching framework connecting DPF methodology, learning, training design and daily practice.",
    cover: "/covers/volume-07.png",
    pdf: "",
  },

  {
    number: "08",
    slug: "playbook",
    title: "The DPF Playbook",
    category: "PRACTICE",
    status: "FINAL",
    version: "v1.0",
    description:
      "The collective tactical language that turns DPF principles into action.",
    cover: "/covers/volume-08.png",
    pdf: "",
  },

  {
    number: "09",
    slug: "role-atlas",
    title: "DPF Role Atlas",
    category: "PLAYER ROLES",
    status: "FINAL",
    version: "v1.0",
    description:
      "The functional role architecture defining positional responsibilities, behaviors and player requirements.",
    cover: "/covers/volume-09.png",
    pdf: "",
  },

  {
    number: "10",
    slug: "coach-operational-toolkit",
    title: "DPF Coach Operational Toolkit",
    category: "COACHING",
    status: "IN DEVELOPMENT",
    version: "v1.0",
    description:
      "A practical operational toolkit supporting coaches in applying DPF principles, planning work and managing daily football operations.",
    cover: "/covers/volume-10.png",
    pdf: "",
  },

  {
    number: "11",
    slug: "academy-youth",
    title: "DPF Academy & Youth",
    category: "DEVELOPMENT",
    status: "IN DEVELOPMENT",
    version: "v1.0",
    description:
      "The DPF framework for academy structures, youth development and long-term player pathways.",
    cover: "/covers/volume-11.png",
    pdf: "",
  },

  {
    number: "12",
    slug: "scouting",
    title: "DPF Scouting",
    category: "SCOUTING",
    status: "IN DEVELOPMENT",
    version: "v1.0",
    description:
      "The DPF approach to scouting intelligence, player evaluation and recruitment.",
    cover: "/covers/volume-12.png",
    pdf: "",
  },

  {
    number: "13",
    slug: "player-development",
    title: "DPF Player Development",
    category: "DEVELOPMENT",
    status: "IN DEVELOPMENT",
    version: "v1.0",
    description:
      "The framework for structured individual and collective player development.",
    cover: "/covers/volume-13.png",
    pdf: "",
  },

  {
    number: "14",
    slug: "performance-labs",
    title: "DPF Performance Labs",
    category: "PERFORMANCE",
    status: "IN DEVELOPMENT",
    version: "v1.0",
    description:
      "A performance framework connecting analysis, measurement, experimentation and continuous improvement.",
    cover: "/covers/volume-14.png",
    pdf: "",
  },

  {
    number: "15",
    slug: "kpi-framework",
    title: "DPF KPI Framework",
    category: "PERFORMANCE",
    status: "IN DEVELOPMENT",
    version: "v1.0",
    description:
      "A measurement framework defining how DPF organizations translate objectives, performance and outcomes into meaningful indicators.",
    cover: "/covers/volume-15.png",
    pdf: "",
  },

  {
    number: "16",
    slug: "intelligence",
    title: "DPF Intelligence",
    category: "INTELLIGENCE",
    status: "IN DEVELOPMENT",
    version: "v1.0",
    description:
      "The evolving intelligence layer connecting evidence, research, measurement and football knowledge.",
    cover: "/covers/volume-16.png",
    pdf: "",
  },

  {
    number: "17",
    slug: "business-model",
    title: "DPF Business Model",
    category: "BUSINESS",
    status: "IN DEVELOPMENT",
    version: "v1.0",
    description:
      "The business architecture connecting DPF OS knowledge, products, services, implementation and sustainable organizational value.",
    cover: "/covers/volume-17.png",
    pdf: "",
  },

  {
    number: "18",
    slug: "dpf-os",
    title: "DPF OS",
    category: "OPERATING SYSTEM",
    status: "FINAL",
    version: "v1.0",
    description:
      "The Football Operating System. The integrated operating architecture connecting philosophy, governance, people, processes, information and performance across the DPF ecosystem.",
    cover: "/covers/volume-18.png",
    pdf: "/books/dpf-os/18%20DPF%20OS.pdf",
  },
];

export function getBookBySlug(slug) {
  return books.find((book) => book.slug === slug);
}

export default books;