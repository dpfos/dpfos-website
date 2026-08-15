import { Link } from "react-router-dom";
import "./Library.css";

import books from "../data/books";


function BookCard({ book }) {
  const isFinal = book.status === "FINAL";

  return (
    <Link
      to={`/library/${book.slug}`}
      className={`library-card ${
        !isFinal ? "library-card-development" : ""
      }`}
    >

      <div className="library-card-top">

        <span className="library-number">
          {book.number}
        </span>

        <span className="library-type">
          {book.category}
        </span>

      </div>


      {book.cover && (
        <div className="library-card-cover">

          <img
            src={book.cover}
            alt={`${book.title} cover`}
          />

        </div>
      )}


      <div className="library-card-content">

        <h3>
          {book.title}
        </h3>

        <p>
          {book.description}
        </p>

      </div>


      <div className="library-card-bottom">

        <span>
          {book.status}
        </span>

        <span className="library-arrow">
          →
        </span>

      </div>

    </Link>
  );
}


function LibrarySection({
  number,
  label,
  title,
  description,
  books,
}) {
  return (

    <section className="library-section">

      <div className="library-section-heading">

        <div>

          <span>
            {number} — {label}
          </span>

          <h3>
            {title}
          </h3>

        </div>


        {description && (
          <p>
            {description}
          </p>
        )}

      </div>


      <div className="library-grid">

        {books.map((book) => (

          <BookCard
            key={book.slug}
            book={book}
          />

        ))}

      </div>

    </section>

  );
}


export default function Library() {

  const foundationBooks =
    books.slice(0, 2);

  const architectureBooks =
    books.slice(2, 5);

  const footballBooks =
    books.slice(5, 9);

  const developmentBooks =
    books.slice(9, 14);

  const intelligenceBooks =
    books.slice(14, 16);

  const operationsBooks =
    books.slice(16, 17);

  const operatingSystemBooks =
    books.slice(17, 18);


  return (

    <main className="library">

      <div className="library-container">


        {/* =========================
            HEADER
        ========================== */}

        <header className="library-header">

          <div className="library-label">
            DPF OS / KNOWLEDGE LIBRARY
          </div>


          <div className="library-heading">

            <h2>
              The Knowledge
              <br />
              Behind the System.
            </h2>


            <p>
              The intellectual foundation of the Dynamic
              Positional Football Operating System, bringing
              philosophy, architecture, football methodology,
              coaching, development, performance, intelligence
              and strategy into one evolving knowledge system.
            </p>

          </div>

        </header>



        {/* =========================
            FEATURE
        ========================== */}

        <section className="library-feature">

          <div className="library-feature-mark">
            DPF
            <small>OS</small>
          </div>


          <div className="library-feature-content">

            <span>
              KNOWLEDGE ARCHITECTURE
            </span>


            <h3>
              One Library.
              <br />
              One Operating System.
            </h3>


            <p>
              Eighteen core volumes form the intellectual
              architecture of DPF OS, from foundational
              philosophy through football methodology,
              coaching, development, performance,
              intelligence and operations.
            </p>

          </div>


          <div className="library-feature-index">

            <strong>
              18
            </strong>

            <span>
              CORE VOLUMES
            </span>

          </div>

        </section>



        {/* =========================
            01 FOUNDATION
        ========================== */}

        <LibrarySection
          number="01"
          label="FOUNDATION"
          title="Foundational Knowledge"
          description="The constitutional and philosophical foundation of the DPF Operating System."
          books={foundationBooks}
        />



        {/* =========================
            02 ARCHITECTURE
        ========================== */}

        <LibrarySection
          number="02"
          label="DESIGN & INSTITUTION"
          title="System Architecture"
          description="The structural and institutional architecture through which DPF OS is designed and implemented."
          books={architectureBooks}
        />



        {/* =========================
            03 FOOTBALL
        ========================== */}

        <LibrarySection
          number="03"
          label="FOOTBALL SYSTEM"
          title="The Football Knowledge Layer"
          description="The football architecture translating DPF philosophy into game behavior, coaching and player roles."
          books={footballBooks}
        />



        {/* =========================
            04 DEVELOPMENT
        ========================== */}

        <LibrarySection
          number="04"
          label="DEVELOPMENT"
          title="Player & Performance Development"
          description="The development layer connecting players, academies, scouting and performance environments."
          books={developmentBooks}
        />



        {/* =========================
            05 INTELLIGENCE
        ========================== */}

        <LibrarySection
          number="05"
          label="INTELLIGENCE"
          title="Intelligence"
          description="The evolving intelligence layer connecting evidence, research, measurement and football knowledge."
          books={intelligenceBooks}
        />



        {/* =========================
            06 OPERATIONS
        ========================== */}

        <LibrarySection
          number="06"
          label="OPERATIONS"
          title="Operational Knowledge"
          description="Practical instruments that help DPF practitioners implement and operate the system."
          books={operationsBooks}
        />



        {/* =========================
            07 OPERATING SYSTEM
        ========================== */}

        <LibrarySection
          number="07"
          label="OPERATING SYSTEM"
          title="DPF OS"
          description="The integrated operating system connecting the complete DPF knowledge architecture."
          books={operatingSystemBooks}
        />



        {/* =========================
            FOOTER
        ========================== */}

        <footer className="library-footer">

          <div>

            <span className="library-footer-label">
              CONTINUOUSLY EVOLVING
            </span>


            <h3>
              Knowledge becomes
              <br />
              infrastructure.
            </h3>

          </div>


          <p>
            DPF OS is designed as a living knowledge system.
            New research, frameworks, methodologies and
            practical insights continuously expand the
            library and strengthen the operating system.
          </p>

        </footer>


      </div>

    </main>
  );
}