import "./Library.css";
import books from "../../data/books";

function BookCard({ book }) {
  const isFinal = book.status === "FINAL";

  return (
    <article
      className={`library-card ${
        !isFinal ? "library-card-soon" : ""
      }`}
    >
      <span>{book.number}</span>

      <div className="library-card-cover">
        <img
          src={book.cover}
          alt={`${book.title} cover`}
          loading="lazy"
        />
      </div>

      <h3>{book.title}</h3>

      <p>{book.description}</p>

      <div className="library-card-meta">
        {book.category} ·{" "}
        {book.version ? `${book.version} · ` : ""}
        {book.status}
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
          IN DEVELOPMENT
        </div>
      )}
    </article>
  );
}

function getBooks(numbers) {
  return numbers
    .map((number) =>
      books.find((book) => book.number === number)
    )
    .filter(Boolean);
}

function LibrarySection({
  number,
  label,
  title,
  bookNumbers,
}) {
  const sectionBooks = getBooks(bookNumbers);

  return (
    <>
      <div className="library-section-heading">
        <span>
          {number} — {label}
        </span>

        <h3>{title}</h3>
      </div>

      <div className="library-grid">
        {sectionBooks.map((book) => (
          <BookCard
            key={book.number}
            book={book}
          />
        ))}
      </div>
    </>
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
              01 — FOUNDATION
          ================================= */}

          <LibrarySection
            number="01"
            label="FOUNDATION"
            title="Foundational Knowledge"
            bookNumbers={["01", "02"]}
          />

          {/* ================================
              02 — DESIGN & INSTITUTION
          ================================= */}

          <LibrarySection
            number="02"
            label="DESIGN & INSTITUTION"
            title="System Architecture"
            bookNumbers={["03", "04", "05"]}
          />

          {/* ================================
              03 — FOOTBALL SYSTEM
          ================================= */}

          <LibrarySection
            number="03"
            label="FOOTBALL SYSTEM"
            title="The Football Knowledge Layer"
            bookNumbers={["06", "07", "08", "09"]}
          />

          {/* ================================
              04 — OPERATIONAL KNOWLEDGE
          ================================= */}

          <LibrarySection
            number="04"
            label="OPERATIONAL KNOWLEDGE"
            title="Implementation Library"
            bookNumbers={["10", "11", "12", "13", "14"]}
          />

          {/* ================================
              05 — RESEARCH & INTELLIGENCE
          ================================= */}

          <LibrarySection
            number="05"
            label="RESEARCH & INTELLIGENCE"
            title="Research & Intelligence"
            bookNumbers={["15", "16"]}
          />

          {/* ================================
              06 — OPERATING SYSTEM
          ================================= */}

          <LibrarySection
            number="06"
            label="OPERATING SYSTEM"
            title="DPF OS"
            bookNumbers={["17", "18"]}
          />
        </div>
      </section>
    </main>
  );
}