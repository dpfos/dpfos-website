import { Link } from "react-router-dom";
import "./Library.css";
import books from "../data/books";

const sections = [
  {
    number: "01",
    eyebrow: "FOUNDATION",
    title: "Foundational Knowledge",
    description: "The constitutional and philosophical foundation of DPF OS.",
    books: ["01", "02"],
  },
  {
    number: "02",
    eyebrow: "DESIGN & INSTITUTION",
    title: "System Architecture",
    description: "The structural and institutional architecture of DPF OS.",
    books: ["03", "04", "05"],
  },
  {
    number: "03",
    eyebrow: "FOOTBALL SYSTEM",
    title: "The Football Knowledge Layer",
    description: "The football architecture connecting principles, game model and practice.",
    books: ["06", "07", "08", "09"],
  },
  {
    number: "04",
    eyebrow: "DEVELOPMENT & PERFORMANCE",
    title: "Operational Knowledge",
    description: "The development, performance and implementation layer of DPF OS.",
    books: ["10", "11", "12", "13", "14", "15"],
  },
  {
    number: "05",
    eyebrow: "RESEARCH & BUSINESS",
    title: "Intelligence & Strategy",
    description: "The knowledge, intelligence and value layer extending the system.",
    books: ["16", "17"],
  },
  {
    number: "06",
    eyebrow: "OPERATING SYSTEM",
    title: "DPF OS",
    description: "The integrated operating architecture connecting the complete ecosystem.",
    books: ["18"],
  },
];

function BookCard({ book }) {
  const isFinal = book.status === "FINAL";

  return (
    <article className={`library-card ${isFinal ? "is-final" : "is-development"}`}>
      <div className="library-card-top">
        <span className="library-card-number">{book.number}</span>

        <span className="library-card-category">
          {book.category}
        </span>
      </div>

      <div className="library-card-cover">
        <img
          src={book.cover}
          alt={`${book.title} cover`}
          loading="lazy"
        />
      </div>

      <div className="library-card-content">
        <div className="library-card-status">
          {isFinal ? "FINAL" : "IN DEVELOPMENT"}
        </div>

        <h3>{book.shortTitle || book.title}</h3>

        <p>{book.description}</p>
      </div>

      <div className="library-card-footer">
        <span>
          {book.version || "COMING SOON"}
        </span>

        {isFinal ? (
          <Link
            to={`/library/${book.slug}`}
            className="library-card-link"
            aria-label={`Open ${book.title}`}
          >
            VIEW VOLUME
            <span>→</span>
          </Link>
        ) : (
          <span className="library-card-link library-card-link--disabled">
            COMING SOON
          </span>
        )}
      </div>
    </article>
  );
}

function LibrarySection({ section }) {
  const sectionBooks = section.books
    .map((number) =>
      books.find((book) => book.number === number)
    )
    .filter(Boolean);

  return (
    <section className="library-section">
      <div className="library-section-header">
        <div className="library-section-heading">
          <span className="library-eyebrow">
            {section.number} — {section.eyebrow}
          </span>

          <h2>{section.title}</h2>
        </div>

        <p>{section.description}</p>
      </div>

      <div className={`library-grid library-grid--${sectionBooks.length}`}>
        {sectionBooks.map((book) => (
          <BookCard
            key={book.number}
            book={book}
          />
        ))}
      </div>
    </section>
  );
}

export default function Library() {
  return (
    <main className="library-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="library-hero">
        <div className="library-hero-grid" />

        <div className="library-container library-hero-inner">

          <span className="library-hero-eyebrow">
            DPF OS / KNOWLEDGE LIBRARY
          </span>

          <h1>
            The Knowledge
            <br />
            Behind the
            <br />
            System.
          </h1>

          <p>
            The knowledge architecture behind DPF OS, connecting philosophy,
            football methodology, development, performance and intelligence.
          </p>

        </div>
      </section>


      {/* =====================================================
          KNOWLEDGE ARCHITECTURE
      ===================================================== */}

      <section className="library-architecture">
        <div className="library-container">

          <div className="library-architecture-header">

            <div className="library-architecture-label">
              <span className="library-eyebrow">
                KNOWLEDGE ARCHITECTURE
              </span>

              <strong>DPF OS</strong>

              <small>
                ONE KNOWLEDGE SYSTEM
              </small>
            </div>

            <div className="library-architecture-title">
              <h2>
                One Library.
                <br />
                One Operating System.
              </h2>

              <p>
                Eighteen core volumes organize the knowledge architecture
                of DPF OS.
              </p>
            </div>

            <div className="library-volume-count">
              <strong>18</strong>
              <span>CORE VOLUMES</span>
            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          VOLUMES
      ===================================================== */}

      <section className="library-volumes">
        <div className="library-container">

          {sections.map((section) => (
            <LibrarySection
              key={section.number}
              section={section}
            />
          ))}

        </div>
      </section>


      {/* =====================================================
          FOOTER STATEMENT
      ===================================================== */}

      <section className="library-closing">
        <div className="library-container">

          <span className="library-eyebrow">
            DPF OS / KNOWLEDGE SYSTEM
          </span>

          <h2>
            Knowledge becomes
            <br />
            architecture.
          </h2>

          <p>
            A connected body of knowledge designed to build,
            operate and continuously evolve the DPF Operating System.
          </p>

        </div>
      </section>

    </main>
  );
}