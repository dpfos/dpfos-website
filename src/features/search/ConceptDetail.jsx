import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { getBookBySlug } from "../../data/books";
import { getRelatedVolumes } from "../../data/glossaryRelations";

import "./ConceptDetail.css";

export default function ConceptDetail({
  concept,
  onClose,
  onBack,
}) {
  const navigate = useNavigate();

  const aliases = Array.isArray(concept?.aliases)
    ? concept.aliases
    : [];

  const related = Array.isArray(concept?.related)
    ? concept.related
    : [];

  /*
  ============================================================
  CONCEPT SLUG
  ============================================================
  */

  const conceptSlug = useMemo(() => {
    if (!concept) {
      return "";
    }

    return (
      concept.id ||
      concept.slug ||
      concept.term
        ?.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
    );
  }, [concept]);

  /*
  ============================================================
  RELATED VOLUMES
  ============================================================
  */

  const relatedBooks = useMemo(() => {
    const volumeSlugs =
      getRelatedVolumes(conceptSlug);

    return volumeSlugs
      .map((slug) => getBookBySlug(slug))
      .filter(Boolean);
  }, [conceptSlug]);

  /*
  ============================================================
  BOOK NAVIGATION
  ============================================================
  */

  const handleBookClick = (book) => {
    if (!book?.slug) {
      return;
    }

    onClose?.();

    navigate(`/library/${book.slug}`);
  };


  if (!concept) {
    return null;
  }


  return (
    <div className="concept-detail">

      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="concept-detail-header">

        <button
          type="button"
          className="concept-back"
          onClick={onBack}
        >
          ← BACK TO SEARCH
        </button>

        <button
          type="button"
          className="concept-close"
          onClick={onClose}
          aria-label="Close concept"
        >
          ESC
        </button>

      </div>


      {/* ======================================================
          IDENTITY
      ====================================================== */}

      <div className="concept-detail-identity">

        <span className="concept-kicker">
          DPF OS KNOWLEDGE
        </span>

        <h1>
          {concept.term}
        </h1>

        <div className="concept-meta">

          <span>
            GLOSSARY
          </span>

          {concept.category && (
            <>
              <span>·</span>

              <span>
                {concept.category}
              </span>
            </>
          )}

        </div>

      </div>


      {/* ======================================================
          DEFINITION
      ====================================================== */}

      <section className="concept-section">

        <span className="concept-section-label">
          DEFINITION
        </span>

        <p className="concept-definition">
          {concept.definition ||
            "No definition available yet."}
        </p>

      </section>


      {/* ======================================================
          ALIASES
      ====================================================== */}

      {aliases.length > 0 && (
        <section className="concept-section">

          <span className="concept-section-label">
            ALSO KNOWN AS
          </span>

          <div className="concept-tags">

            {aliases.map((alias, index) => (
              <span
                className="concept-tag"
                key={`${alias}-${index}`}
              >
                {alias}
              </span>
            ))}

          </div>

        </section>
      )}


      {/* ======================================================
          RELATED CONCEPTS
      ====================================================== */}

      {related.length > 0 && (
        <section className="concept-section">

          <span className="concept-section-label">
            RELATED CONCEPTS
          </span>

          <div className="concept-related-list">

            {related.map((item, index) => {

              const label =
                typeof item === "string"
                  ? item
                  : item?.term ||
                    item?.title;

              if (!label) {
                return null;
              }

              return (
                <div
                  className="concept-related-item"
                  key={`${label}-${index}`}
                >
                  <span>
                    {label}
                  </span>

                  <span className="concept-related-arrow">
                    →
                  </span>
                </div>
              );
            })}

          </div>

        </section>
      )}


      {/* ======================================================
          FOUND IN DPF OS
      ====================================================== */}

      <section className="concept-section">

        <span className="concept-section-label">
          FOUND IN DPF OS
        </span>

        {relatedBooks.length > 0 ? (

          <div className="concept-books">

            {relatedBooks.map((book) => (

              <button
                key={book.slug}
                type="button"
                className="concept-book"
                onClick={() =>
                  handleBookClick(book)
                }
              >

                <div className="concept-book-number">
                  {book.number}
                </div>

                <div className="concept-book-info">

                  <strong>
                    {book.title}
                  </strong>

                  <span>
                    {book.category}
                    {book.version
                      ? ` · ${book.version}`
                      : ""}
                  </span>

                </div>

                <div className="concept-book-arrow">
                  →
                </div>

              </button>

            ))}

          </div>

        ) : (

          <div className="concept-books-empty">
            This concept has not yet been mapped
            to a DPF OS volume.
          </div>

        )}

      </section>


      {/* ======================================================
          FOOTER
      ====================================================== */}

      <div className="concept-detail-footer">

        <span>
          DPF OS KNOWLEDGE GRAPH
        </span>

        <span>
          {relatedBooks.length > 0
            ? `${relatedBooks.length} VOLUME${
                relatedBooks.length === 1
                  ? ""
                  : "S"
              } CONNECTED`
            : "CONCEPT"}
        </span>

      </div>

    </div>
  );
}