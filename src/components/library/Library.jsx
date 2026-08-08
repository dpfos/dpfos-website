import "./Library.css";

const books = [
  {
    number: "01",
    title: "The DPF Constitution",
    description:
      "The foundational charter defining the identity, principles and governing logic of the DPF Operating System.",
    meta: "FOUNDATION · v1.0 · FINAL",
    status: "final",
  },
  {
    number: "02",
    title: "The DPF Way",
    description:
      "The philosophy, mindset and way of thinking that guide the DPF football environment.",
    meta: "FOUNDATION · v1.0 · FINAL",
    status: "final",
  },
  {
    number: "03",
    title: "DPF Blueprint",
    description:
      "The structural blueprint for translating DPF principles into a coherent football operating framework.",
    meta: "DESIGN · v1.0 · FINAL",
    status: "final",
  },
  {
    number: "04",
    title: "DPF Architectural Principles",
    description:
      "The principles governing structure, relationships, space, organization and system behavior.",
    meta: "DESIGN · v1.0 · FINAL",
    status: "final",
  },
  {
    number: "05",
    title: "DPF Institutional Framework",
    description:
      "The organizational architecture required to establish, operate and sustain DPF within football institutions.",
    meta: "INSTITUTION · v1.0 · FINAL",
    status: "final",
  },
  {
    number: "06",
    title: "The Game Model",
    description:
      "The football logic translating DPF principles into collective behavior, interaction and action.",
    meta: "FOOTBALL SYSTEM · IN PROCESS",
    status: "process",
  },
  {
    number: "07",
    title: "The Playbook",
    description:
      "The practical framework translating the DPF Game Model into implementation and coaching practice.",
    meta: "FOOTBALL SYSTEM · IN PROCESS",
    status: "process",
  },
  {
    number: "08",
    title: "DPF Role Atlas",
    description:
      "The functional role architecture defining positional responsibilities, behaviors and player requirements.",
    meta: "PLAYER ROLES · IN PROCESS",
    status: "process",
  },
  {
    number: "09",
    title: "DPF Business Model",
    description:
      "The commercial blueprint of the DPF ecosystem, covering products, education, technology, licensing, intellectual property and long-term growth.",
    meta: "BUSINESS & STRATEGY · v1.0 · FINAL",
    status: "final",
  },
  {
    number: "10",
    title: "DPF OS",
    description:
      "The integrated operating system connecting DPF knowledge, frameworks, methodologies, technology and organizational implementation.",
    meta: "OPERATING SYSTEM · v1.0 · FINAL",
    status: "final",
  },
];

const operationalBooks = [
  {
    title: "Coaching Manual",
    description:
      "The operational framework for coaching, implementation, practice design and DPF development environments.",
    meta: "OPERATIONS · IN PROCESS",
  },
  {
    title: "Academy & Youth",
    description:
      "The DPF framework for academy structures, youth development and long-term player pathways.",
    meta: "OPERATIONS · IN PROCESS",
  },
  {
    title: "Scouting",
    description:
      "The DPF approach to scouting intelligence, player evaluation and recruitment.",
    meta: "OPERATIONS · IN PROCESS",
  },
  {
    title: "Player Development",
    description:
      "The framework for structured individual and collective player development.",
    meta: "OPERATIONS · IN PROCESS",
  },
  {
    title: "Performance Labs",
    description:
      "The performance framework connecting physical, technical, tactical and analytical development.",
    meta: "PERFORMANCE · IN PROCESS",
  },
  {
    title: "KPI Framework",
    description:
      "The measurement framework supporting performance evaluation and continuous improvement.",
    meta: "PERFORMANCE · IN PROCESS",
  },
];

function BookCard({ book }) {
  const isFinal = book.status === "final";

  return (
    <article
      className={`library-card ${
        !isFinal ? "library-card-soon" : ""
      }`}
    >
      <span>{book.number}</span>

      <h3>{book.title}</h3>

      <p>{book.description}</p>

      <div className="library-card-meta">
        {book.meta}
      </div>

      {isFinal ? (
        <div className="library-card-actions">
          <button
            type="button"
            className="library-button library-button-primary"
          >
            View Preview
          </button>

          <button
            type="button"
            className="library-button library-button-secondary"
          >
            Full Edition
          </button>
        </div>
      ) : (
        <div className="library-process-status">
          IN PROCESS
        </div>
      )}
    </article>
  );
}

function ProcessCard({ book }) {
  return (
    <article className="library-card library-card-soon">
      <span>—</span>

      <h3>{book.title}</h3>

      <p>{book.description}</p>

      <div className="library-card-meta">
        {book.meta}
      </div>

      <div className="library-process-status">
        IN PROCESS
      </div>
    </article>
  );
}

export default function Library() {
  return (
    <main className="library-page">

      {/* ================================
          HERO
      ================================= */}

      <section className="library-hero">
        <div className="library-container">

          <div className="library-hero-label">
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

        </div>
      </section>


      {/* ================================
          INTRO
      ================================= */}

      <section className="library-intro">
        <div className="library-container">

          <div className="library-intro-grid">

            <div className="library-intro-title">
              <span>DPF OS LIBRARY</span>

              <h2>
                Knowledge
                <br />
                <strong>organized.</strong>
              </h2>
            </div>

            <div className="library-intro-text">
              <p>
                The DPF OS Knowledge Library brings together the principles,
                frameworks, methodologies, operational knowledge and strategic
                thinking that form the intellectual foundation of the DPF
                Operating System.
              </p>
            </div>

          </div>


          {/* ================================
              FOUNDATION
          ================================= */}

          <div className="library-section-heading">
            <span>01 — FOUNDATION</span>
            <h3>Foundational Knowledge</h3>
          </div>

          <div className="library-grid">
            {books.slice(0, 2).map((book) => (
              <BookCard
                key={book.number}
                book={book}
              />
            ))}
          </div>


          {/* ================================
              DESIGN & INSTITUTION
          ================================= */}

          <div className="library-section-heading">
            <span>02 — DESIGN & INSTITUTION</span>
            <h3>System Architecture</h3>
          </div>

          <div className="library-grid">
            {books.slice(2, 5).map((book) => (
              <BookCard
                key={book.number}
                book={book}
              />
            ))}
          </div>


          {/* ================================
              FOOTBALL SYSTEM
          ================================= */}

          <div className="library-section-heading">
            <span>03 — FOOTBALL SYSTEM</span>
            <h3>The Football Knowledge Layer</h3>
          </div>

          <div className="library-grid">
            {books.slice(5, 8).map((book) => (
              <BookCard
                key={book.number}
                book={book}
              />
            ))}
          </div>


          {/* ================================
              OPERATIONAL KNOWLEDGE
          ================================= */}

          <div className="library-section-heading">
            <span>04 — OPERATIONAL KNOWLEDGE</span>
            <h3>Implementation Library</h3>
          </div>

          <div className="library-grid">
            {operationalBooks.map((book) => (
              <ProcessCard
                key={book.title}
                book={book}
              />
            ))}
          </div>


          {/* ================================
              BUSINESS & STRATEGY
          ================================= */}

          <div className="library-section-heading">
            <span>05 — BUSINESS & STRATEGY</span>
            <h3>Ecosystem Strategy</h3>
          </div>

          <div className="library-grid">

            <BookCard
              book={books[8]}
            />

          </div>


          {/* ================================
              OPERATING SYSTEM
          ================================= */}

          <div className="library-section-heading">
            <span>06 — OPERATING SYSTEM</span>
            <h3>DPF OS</h3>
          </div>

          <div className="library-grid">

            <BookCard
              book={books[9]}
            />

          </div>

        </div>
      </section>

    </main>
  );
}