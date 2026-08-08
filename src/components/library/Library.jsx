import "./Library.css";

const books = [
  {
    number: "01",
    title: "The Constitution",
    category: "FOUNDATION",
    description:
      "The foundational principles, identity and governing logic of the DPF Operating System.",
  },
  {
    number: "02",
    title: "The Way",
    category: "PHILOSOPHY",
    description:
      "The principles, beliefs and way of thinking that shape the DPF football environment.",
  },
  {
    number: "03",
    title: "The Blueprint",
    category: "ARCHITECTURE",
    description:
      "The structural blueprint for translating DPF principles into an operating football system.",
  },
  {
    number: "04",
    title: "Architectural Principles",
    category: "SYSTEM DESIGN",
    description:
      "The principles governing relationships, structures, spaces and interactions across the system.",
  },
  {
    number: "05",
    title: "Institutional Framework",
    category: "INSTITUTION",
    description:
      "The organizational framework for implementing, governing and developing DPF environments.",
  },
  {
    number: "06",
    title: "The Game Model",
    category: "GAME MODEL",
    description:
      "The football logic defining collective behavior, relationships, spaces, actions and transitions.",
  },
  {
    number: "07",
    title: "The Playbook",
    category: "OPERATIONS",
    description:
      "The practical football reference for translating the DPF Game Model into repeatable actions.",
  },
  {
    number: "08",
    title: "DPF Role Atlas",
    category: "PLAYER ROLES",
    description:
      "A complete framework defining player roles, responsibilities, behaviors and functional profiles.",
  },
  {
    number: "09",
    title: "Coaching Manual",
    category: "COACHING",
    description:
      "The operational framework for coaching, learning, training design and football development.",
  },
  {
    number: "10",
    title: "Performance System",
    category: "PERFORMANCE",
    description:
      "The systems used to measure, understand and continuously improve individual and collective performance.",
  },
  {
    number: "11",
    title: "Research & Education",
    category: "KNOWLEDGE",
    description:
      "The research and education layer that allows the DPF system to continuously learn and evolve.",
  },
  {
    number: "12",
    title: "Academy & Youth",
    category: "DEVELOPMENT",
    description:
      "The framework for developing players and football environments across the youth pathway.",
  },
];

export default function Library() {
  return (
    <main className="library-page">

      {/* HERO */}

      <section className="library-hero">
        <div className="library-label">
          DPF OS KNOWLEDGE LIBRARY
        </div>

        <h1>
          The DPF OS
          <br />
          <span>Knowledge Library.</span>
        </h1>

        <p>
          The intellectual foundation of the Dynamic Positional Football
          Operating System.
        </p>
      </section>


      {/* INTRODUCTION */}

      <section className="library-intro">

        <div className="library-intro-label">
          THE KNOWLEDGE SYSTEM
        </div>

        <div className="library-intro-content">

          <h2>
            One body of knowledge.
            <br />
            <span>One operating language.</span>
          </h2>

          <p>
            The DPF OS Knowledge Library contains the principles, frameworks,
            methodologies and operational knowledge required to understand,
            implement and continuously evolve the DPF Operating System.
          </p>

        </div>

      </section>


      {/* BOOK LIBRARY */}

      <section className="library-books">

        <div className="library-section-heading">

          <div>
            <div className="library-section-label">
              THE DPF OS LIBRARY
            </div>

            <h2>
              The Core
              <br />
              <span>Knowledge Base.</span>
            </h2>
          </div>

          <p>
            A structured body of knowledge connecting philosophy, architecture,
            football methodology, coaching, development and performance.
          </p>

        </div>


        <div className="library-grid">

          {books.map((book) => (
            <article className="library-card" key={book.number}>

              <div className="library-card-top">
                <span>{book.number}</span>
                <small>{book.category}</small>
              </div>

              <h3>{book.title}</h3>

              <p>{book.description}</p>

              <button type="button">
                Explore Book
                <span>→</span>
              </button>

            </article>
          ))}

        </div>

      </section>


      {/* KNOWLEDGE ARCHITECTURE */}

      <section className="library-architecture">

        <div className="library-architecture-label">
          KNOWLEDGE ARCHITECTURE
        </div>

        <h2>
          From principles
          <br />
          <span>to practice.</span>
        </h2>

        <p>
          The DPF OS Library is designed as an interconnected knowledge
          architecture. Each book represents a distinct layer of the system,
          while together they form one coherent operating framework.
        </p>

        <div className="library-flow">

          <div>
            <span>01</span>
            <strong>Understand</strong>
            <small>Principles & Philosophy</small>
          </div>

          <div>
            <span>02</span>
            <strong>Design</strong>
            <small>Architecture & Methodology</small>
          </div>

          <div>
            <span>03</span>
            <strong>Develop</strong>
            <small>Coaching & Development</small>
          </div>

          <div>
            <span>04</span>
            <strong>Measure</strong>
            <small>Performance & Analysis</small>
          </div>

          <div>
            <span>05</span>
            <strong>Evolve</strong>
            <small>Research & Education</small>
          </div>

        </div>

      </section>


      {/* CTA */}

      <section className="library-cta">

        <div className="library-cta-label">
          DPF OS KNOWLEDGE SYSTEM
        </div>

        <h2>
          Enter the
          <br />
          <span>DPF OS Library.</span>
        </h2>

        <p>
          Explore the knowledge architecture behind the Dynamic Positional
          Football Operating System.
        </p>

        <button type="button">
          Explore the Library
          <span>→</span>
        </button>

      </section>

    </main>
  );
}