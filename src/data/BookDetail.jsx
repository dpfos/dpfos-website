import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./BookDetail.css";
import books from "./books";

export default function BookDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const book = books.find((item) => item.slug === slug);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, [slug]);

  if (!book) {
    return (
      <main className="book-detail book-detail--not-found">
        <div className="book-detail__not-found">
          <span>404</span>

          <h1>Volume not found.</h1>

          <p>
            The requested DPF OS knowledge volume does not exist in the
            Knowledge Library.
          </p>

          <Link
            to="/library"
            className="book-detail__button book-detail__button--gold"
          >
            ← Back to Knowledge Library
          </Link>
        </div>
      </main>
    );
  }

  const currentIndex = books.findIndex(
    (item) => item.slug === book.slug
  );

  const previousBook =
    currentIndex > 0 ? books[currentIndex - 1] : null;

  const nextBook =
    currentIndex < books.length - 1
      ? books[currentIndex + 1]
      : null;

  const purpose =
    book.purpose ||
    "This volume defines a distinct layer of the DPF OS knowledge architecture and contributes to the development of the complete operating system.";

  const themes =
    Array.isArray(book.themes) && book.themes.length > 0
      ? book.themes
      : [
          book.category,
          "DPF OS Architecture",
          "Football Knowledge",
          "System Development",
        ];

  const handlePreview = () => {
    const preview = document.getElementById("book-preview");

    if (preview) {
      preview.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleFullEdition = () => {
    navigate("/get-started");
  };

  return (
    <main className="book-detail">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="book-detail__hero">

        <div className="book-detail__hero-grid" />

        <div className="book-detail__hero-orbit book-detail__hero-orbit--one" />
        <div className="book-detail__hero-orbit book-detail__hero-orbit--two" />
        <div className="book-detail__hero-orbit book-detail__hero-orbit--three" />

        <div className="book-detail__container">

          <Link
            to="/library"
            className="book-detail__back"
          >
            ← BACK TO KNOWLEDGE LIBRARY
          </Link>

          <div className="book-detail__hero-meta">

            <div>
              <span className="book-detail__eyebrow">
                VOLUME
              </span>

              <strong className="book-detail__volume-number">
                {book.number}
              </strong>
            </div>

            <div>
              <span className="book-detail__eyebrow">
                CATEGORY
              </span>

              <strong>
                {book.category}
              </strong>
            </div>

            <div>
              <span className="book-detail__eyebrow">
                STATUS
              </span>

              <strong
                className={
                  book.status === "FINAL"
                    ? "is-final"
                    : "is-development"
                }
              >
                {book.status}
              </strong>
            </div>

          </div>

          <div className="book-detail__hero-content">

            <div className="book-detail__hero-copy">

              <div className="book-detail__label">
                DPF OS / KNOWLEDGE VOLUME
              </div>

              <h1>
                {book.title}
              </h1>

              <p className="book-detail__description">
                {book.description}
              </p>

              <div className="book-detail__hero-actions">

                {book.status === "FINAL" && book.pdf ? (
                  <button
                    type="button"
                    onClick={handlePreview}
                    className="book-detail__button book-detail__button--gold"
                  >
                    View Preview
                    <span>↓</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="book-detail__button book-detail__button--gold book-detail__button--disabled"
                  >
                    Preview Coming Soon
                  </button>
                )}

                {book.pdf ? (
                  <a
                    href={book.pdf}
                    target="_blank"
                    rel="noreferrer"
                    className="book-detail__button book-detail__button--outline"
                  >
                    Open Full PDF
                    <span>↗</span>
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={handleFullEdition}
                    className="book-detail__button book-detail__button--outline"
                  >
                    Full Edition
                    <span>→</span>
                  </button>
                )}

              </div>

            </div>

            <div className="book-detail__volume-core">

              <div className="book-detail__core-rings">
                <span />
                <span />
                <span />
              </div>

              <div className="book-detail__core">

                <small>
                  DPF OS
                </small>

                <strong>
                  {book.number}
                </strong>

                <span>
                  KNOWLEDGE
                  <br />
                  VOLUME
                </span>

              </div>

              <div className="book-detail__core-orbit">
                {book.category}
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          METADATA
      ===================================================== */}

      <section className="book-detail__metadata">

        <div className="book-detail__container">

          <div className="book-detail__metadata-grid">

            <div className="book-detail__meta-card">
              <span>VOLUME</span>
              <strong>{book.number}</strong>
            </div>

            <div className="book-detail__meta-card">
              <span>CATEGORY</span>
              <strong>{book.category}</strong>
            </div>

            <div className="book-detail__meta-card">
              <span>STATUS</span>
              <strong>{book.status}</strong>
            </div>

            <div className="book-detail__meta-card">
              <span>VERSION</span>
              <strong>
                {book.version || "IN DEVELOPMENT"}
              </strong>
            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          KNOWLEDGE OVERVIEW
      ===================================================== */}

      <section className="book-detail__knowledge">

        <div className="book-detail__container">

          <div className="book-detail__section-intro">

            <div>

              <span className="book-detail__section-label">
                DPF OS / VOLUME OVERVIEW
              </span>

              <h2>
                The knowledge
                <br />
                behind the volume.
              </h2>

            </div>

            <p>
              {book.description}
            </p>

          </div>


          <div className="book-detail__knowledge-grid">

            <article className="book-detail__purpose">

              <span className="book-detail__section-label">
                PURPOSE
              </span>

              <h3>
                Why this volume
                <br />
                exists.
              </h3>

              <p>
                {purpose}
              </p>

            </article>


            <article className="book-detail__themes">

              <span className="book-detail__section-label">
                CORE THEMES
              </span>

              <h3>
                The knowledge layer.
              </h3>

              <div className="book-detail__theme-list">

                {themes.map((theme, index) => (
                  <div
                    key={`${book.slug}-theme-${index}`}
                    className="book-detail__theme"
                  >
                    <span>+</span>
                    <strong>{theme}</strong>
                  </div>
                ))}

              </div>

            </article>

          </div>

        </div>

      </section>


      {/* =====================================================
          PDF PREVIEW
      ===================================================== */}

      {book.status === "FINAL" && book.pdf && (
        <section
          id="book-preview"
          className="book-detail__pdf-preview"
        >

          <div className="book-detail__container">

            <div className="book-detail__section-intro">

              <div>

                <span className="book-detail__section-label">
                  DPF OS / BOOK PREVIEW
                </span>

                <h2>
                  Explore the
                  <br />
                  volume.
                </h2>

              </div>

              <p>
                Preview this DPF OS knowledge volume before
                accessing the full edition.
              </p>

            </div>


            <div className="book-detail__pdf-frame">

              <iframe
                src={`${book.pdf}#page=1&toolbar=1&navpanes=0&scrollbar=1`}
                title={`${book.title} Preview`}
                loading="lazy"
              />

            </div>

            <div className="book-detail__pdf-actions">

              <a
                href={book.pdf}
                target="_blank"
                rel="noreferrer"
                className="book-detail__button book-detail__button--gold"
              >
                Open PDF
                <span>↗</span>
              </a>

            </div>

          </div>

        </section>
      )}


      {/* =====================================================
          VOLUME SIGNAL
      ===================================================== */}

      <section className="book-detail__signal">

        <div className="book-detail__container">

          <div className="book-detail__signal-box">

            <div className="book-detail__signal-number">
              {book.number}
            </div>

            <div className="book-detail__signal-copy">

              <span className="book-detail__section-label">
                DPF OS KNOWLEDGE ARCHITECTURE
              </span>

              <h2>
                One volume.
                <br />
                One layer of the system.
              </h2>

              <p>
                Every DPF OS volume has a distinct role within
                the wider operating system architecture.
              </p>

            </div>

            <div className="book-detail__signal-status">

              <span className="book-detail__status-dot" />

              <strong>
                {book.status}
              </strong>

              <small>
                VOLUME {book.number}
              </small>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          NAVIGATION
      ===================================================== */}

      <section className="book-detail__navigation">

        <div className="book-detail__container">

          <div className="book-detail__navigation-header">

            <span className="book-detail__section-label">
              KNOWLEDGE LIBRARY
            </span>

            <h2>
              Continue through
              <br />
              the system.
            </h2>

          </div>


          <div className="book-detail__navigation-grid">

            {previousBook ? (
              <Link
                to={`/library/${previousBook.slug}`}
                className="book-detail__nav-card"
              >

                <span>
                  ← PREVIOUS VOLUME
                </span>

                <small>
                  {previousBook.number}
                </small>

                <strong>
                  {previousBook.title}
                </strong>

                <em>
                  {previousBook.category}
                </em>

              </Link>
            ) : (
              <Link
                to="/library"
                className="book-detail__nav-card"
              >

                <span>
                  ← KNOWLEDGE LIBRARY
                </span>

                <strong>
                  Return to Library
                </strong>

                <em>
                  DPF OS
                </em>

              </Link>
            )}


            {nextBook ? (
              <Link
                to={`/library/${nextBook.slug}`}
                className="book-detail__nav-card book-detail__nav-card--next"
              >

                <span>
                  NEXT VOLUME →
                </span>

                <small>
                  {nextBook.number}
                </small>

                <strong>
                  {nextBook.title}
                </strong>

                <em>
                  {nextBook.category}
                </em>

              </Link>
            ) : (
              <Link
                to="/library"
                className="book-detail__nav-card book-detail__nav-card--next"
              >

                <span>
                  END OF ARCHITECTURE →
                </span>

                <strong>
                  Explore the Library
                </strong>

                <em>
                  DPF OS
                </em>

              </Link>
            )}

          </div>

        </div>

      </section>

    </main>
  );
}