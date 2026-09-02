import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import search, {
  SEARCH_ACCESS,
} from "./engine/searchEngine";

import ConceptDetail from "./ConceptDetail";

import "./SearchOverlay.css";

/*
============================================================
DPF OS SEARCH OVERLAY
============================================================

UI / UX LAYER ONLY

The Search Overlay is responsible for:

- Search input
- Search presentation
- Result interaction
- Knowledge detail navigation
- Keyboard / overlay behaviour

The Search Engine is responsible for:

- Query analysis
- Matching
- Relevance scoring
- Ranking
- Real-match filtering
- Access classification

The Master Knowledge Registry / Search Index remain
data and discovery sources.

This component does NOT perform search scoring.
It does NOT contain protected book content.
It does NOT determine entitlement.
============================================================
*/

export default function SearchOverlay({
  open,
  onClose,
}) {
  /*
  ==========================================================
  STATE
  ==========================================================
  */

  const [query, setQuery] = useState("");

  const [selectedConcept, setSelectedConcept] =
    useState(null);

  const inputRef = useRef(null);

  const navigate = useNavigate();


  /*
  ==========================================================
  NORMALIZED QUERY
  ==========================================================
  */

  const normalizedQuery =
    query.trim();


  /*
  ==========================================================
  CANONICAL SEARCH
  ==========================================================

  SearchOverlay delegates ALL search logic to the
  canonical DPF OS Search Engine.

  Public Search is the default access layer.
  ==========================================================
  */

  const results =
    normalizedQuery
      ? search(
          normalizedQuery,
          SEARCH_ACCESS.PUBLIC
        )
      : [];


  /*
  ==========================================================
  OPEN / CLOSE BEHAVIOUR
  ==========================================================
  */

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const timer =
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);

    return () => {
      clearTimeout(timer);
    };
  }, [open]);


  /*
  ==========================================================
  CLOSE
  ==========================================================
  */

  const handleClose = useCallback(() => {
    setSelectedConcept(null);
    setQuery("");

    if (typeof onClose === "function") {
      onClose();
    }
  }, [onClose]);


  /*
  ==========================================================
  KEYBOARD BEHAVIOUR
  ==========================================================
  */

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        handleClose();
      }
    }

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [open, handleClose]);


  /*
  ==========================================================
  CLEAR SEARCH
  ==========================================================
  */

  function handleClear() {
    setQuery("");

    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  }


  /*
  ==========================================================
  CONCEPT / KNOWLEDGE DETAIL
  ==========================================================
  */

  function handleConceptBack() {
    setSelectedConcept(null);

    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  }


  /*
  ==========================================================
  RELATED BOOK NAVIGATION
  ==========================================================
  */

  function handleRelatedBookClick(book) {
    if (!book) {
      return;
    }

    const route =
      book.route ||
      (
        book.slug
          ? `/library/${book.slug}`
          : null
      );

    if (!route) {
      return;
    }

    handleClose();

    navigate(route);
  }


  /*
  ==========================================================
  RESULT CLICK
  ==========================================================
  */

  function handleResultClick(result) {
    if (!result) {
      return;
    }

    /*
    --------------------------------------------------------
    BOOK
    --------------------------------------------------------
    */

    if (result.type === "book") {
      const route =
        result.route ||
        (
          result.slug
            ? `/library/${result.slug}`
            : null
        );

      if (!route) {
        return;
      }

      handleClose();

      navigate(route);

      return;
    }


    /*
    --------------------------------------------------------
    KNOWLEDGE / CONCEPT
    --------------------------------------------------------

    Keep discovery inside the Search Overlay when a
    knowledge object can be displayed by ConceptDetail.
    */

    setSelectedConcept(result);
  }


  /*
  ==========================================================
  CLOSED
  ==========================================================
  */

  if (!open) {
    return null;
  }


  /*
  ==========================================================
  KNOWLEDGE DETAIL MODE
  ==========================================================
  */

  if (selectedConcept) {
    return (
      <div
        className="search-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="DPF OS Knowledge Concept"
        onMouseDown={(event) => {
          if (
            event.target ===
            event.currentTarget
          ) {
            handleClose();
          }
        }}
      >
        <div className="search-panel">

          <ConceptDetail
            concept={selectedConcept}

            onBack={
              handleConceptBack
            }

            onClose={
              handleClose
            }

            onRelatedBookClick={
              handleRelatedBookClick
            }
          />

        </div>
      </div>
    );
  }


  /*
  ==========================================================
  SEARCH MODE
  ==========================================================
  */

  return (
    <div
      className="search-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="DPF OS Search"
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          handleClose();
        }
      }}
    >

      <div className="search-panel">

        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="search-header">

          <div className="search-label">
            DPF OS SEARCH
          </div>

          <button
            type="button"
            className="search-close"
            onClick={handleClose}
            aria-label="Close search"
          >
            ESC
          </button>

        </div>


        {/* ==================================================
            INPUT
        ================================================== */}

        <div className="search-input-wrap">

          <svg
            className="search-icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >

            <circle
              cx="11"
              cy="11"
              r="6.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            />

            <path
              d="M16 16L21 21"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />

          </svg>


          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(
                event.target.value
              );
            }}
            placeholder="Search DPF OS..."
            autoComplete="off"
            spellCheck="false"
          />


          {query && (
            <button
              type="button"
              className="search-clear"
              onClick={handleClear}
              aria-label="Clear search"
            >
              ×
            </button>
          )}

        </div>


        {/* ==================================================
            CONTENT
        ================================================== */}

        <div className="search-content">

          {/* =================================================
              EMPTY STATE
          ================================================= */}

          {!normalizedQuery && (
            <div className="search-empty">

              <span className="search-empty-kicker">
                KNOWLEDGE DISCOVERY
              </span>


              <h2>
                Explore the
                <br />

                <strong>
                  DPF OS Knowledge.
                </strong>
              </h2>


              <p>
                Search across the DPF OS
                knowledge system and discover
                books, concepts, methods,
                tools, performance,
                technology and football
                knowledge.
              </p>

            </div>
          )}


          {/* =================================================
              RESULTS
          ================================================= */}

          {normalizedQuery &&
            results.length > 0 && (

              <div className="search-results">

                <div className="search-results-heading">

                  <span>
                    KNOWLEDGE
                  </span>

                  <small>
                    {results.length}{" "}
                    {results.length === 1
                      ? "result"
                      : "results"}
                  </small>

                </div>


                {results
                  .slice(0, 12)
                  .map(
                    (result, index) => (

                      <button
                        key={
                          result.id ||
                          `${result.type}-${result.slug || result.term || result.title}-${index}`
                        }
                        type="button"
                        className="search-result"
                        onClick={() =>
                          handleResultClick(
                            result
                          )
                        }
                      >

                        {/* =================================================
                            RESULT NUMBER / MARKER
                        ================================================= */}

                        <div className="search-result-number">

                          {result.type ===
                          "book"
                            ? (
                              result.number ||
                              String(
                                index + 1
                              ).padStart(
                                2,
                                "0"
                              )
                            )
                            : "·"}

                        </div>


                        {/* =================================================
                            RESULT INFORMATION
                        ================================================= */}

                        <div className="search-result-info">

                          {/* TITLE */}

                          <div className="search-result-title">

                            {result.title ||
                              result.term ||
                              result.name ||
                              "Untitled Knowledge"}

                          </div>


                          {/* META */}

                          <div className="search-result-meta">

                            {result.type ===
                            "book"
                              ? (
                                <>
                                  {result.category ||
                                    "BOOK"}

                                  {result.version
                                    ? ` · ${result.version}`
                                    : ""}
                                </>
                              )
                              : (
                                <>
                                  {(
                                    result.type ||
                                    "KNOWLEDGE"
                                  )
                                    .toString()
                                    .toUpperCase()}

                                  {result.domain
                                    ? ` · ${result.domain}`
                                    : ""}

                                  {result.category
                                    ? ` · ${result.category}`
                                    : ""}
                                </>
                              )}

                          </div>


                          {/* DESCRIPTION */}

                          <p>
                            {result.description ||
                              result.definition ||
                              "No description available yet."}
                          </p>


                          {/* ALIASES */}

                          {Array.isArray(
                            result.aliases
                          ) &&
                            result.aliases.length >
                              0 && (

                              <div className="search-result-aliases">

                                {result.aliases
                                  .slice(0, 4)
                                  .join(" · ")}

                              </div>

                            )}

                        </div>


                        {/* =================================================
                            ACCESS / TYPE
                        ================================================= */}

                        <div
                          className={
                            `search-result-access ` +
                            `search-result-access-${
                              result.type ||
                              "knowledge"
                            }`
                          }
                        >

                          {result.type ===
                          "book"
                            ? (
                              <>
                                {result.access ===
                                  "available" &&
                                  "PREVIEW"}

                                {result.access ===
                                  "preview" &&
                                  "PREVIEW"}

                                {result.access ===
                                  "coming-soon" &&
                                  "COMING SOON"}

                                {!result.access &&
                                  "BOOK"}
                              </>
                            )
                            : (
                              (
                                result.type ||
                                "KNOWLEDGE"
                              )
                                .toString()
                                .toUpperCase()
                            )}

                        </div>

                      </button>

                    )
                  )}

              </div>
            )}


          {/* =================================================
              NO RESULTS
          ================================================= */}

          {normalizedQuery &&
            results.length === 0 && (

              <div className="search-no-results">

                <span>
                  NO RESULTS
                </span>

                <h2>
                  Nothing found for
                  <br />

                  <strong>
                    “{query}”
                  </strong>
                </h2>

                <p>
                  Try another concept,
                  methodology, tool,
                  book or football term.
                </p>

              </div>

            )}

        </div>

      </div>

    </div>
  );
}