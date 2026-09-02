import { useState } from "react";
import { useTranslation } from "react-i18next";
import { generateDPFAI } from "../../application/ai/dpf-ai.js";
import "./Intelligence.css";

/* =========================================================
   MARKDOWN RENDERER
   Lightweight renderer for DPF Intelligence output.
   No external dependency required.
   ========================================================= */

   function renderInlineMarkdown(text = "") {
  let key = 0;

  const tokens = text.split(
    /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/
  );

  return tokens.map((token) => {
    if (!token) return null;

    if (
      token.startsWith("**") &&
      token.endsWith("**") &&
      token.length > 4
    ) {
      return (
        <strong key={key++}>
          {token.slice(2, -2)}
        </strong>
      );
    }

    if (
      token.startsWith("*") &&
      token.endsWith("*") &&
      !token.startsWith("**")
    ) {
      return (
        <em key={key++}>
          {token.slice(1, -1)}
        </em>
      );
    }

    if (
      token.startsWith("`") &&
      token.endsWith("`")
    ) {
      return (
        <code key={key++}>
          {token.slice(1, -1)}
        </code>
      );
    }

    return <span key={key++}>{token}</span>;
  });
}

/* =========================================================
   MARKDOWN BLOCK PARSER
   ========================================================= */

function MarkdownContent({ content }) {
  if (!content) return null;

  const lines = content.replace(/\r\n/g, "\n").split("\n");

  const elements = [];

  let paragraphBuffer = [];
  let listBuffer = [];
  let listType = null;

  function flushParagraph() {
    if (!paragraphBuffer.length) return;

    const text = paragraphBuffer.join(" ").trim();

    if (text) {
      elements.push(
        <p key={`p-${elements.length}`}>
          {renderInlineMarkdown(text)}
        </p>
      );
    }

    paragraphBuffer = [];
  }

  function flushList() {
    if (!listBuffer.length) return;

    const items = [...listBuffer];

    elements.push(
      <ul key={`ul-${elements.length}`}>
        {items.map((item, index) => (
          <li key={index}>
            {renderInlineMarkdown(item)}
          </li>
        ))}
      </ul>
    );

    listBuffer = [];
    listType = null;
  }

  lines.forEach((rawLine) => {
    const line = rawLine.trim();

    /* Empty line */

    if (!line) {
      flushParagraph();
      flushList();
      return;
    }


    /* =====================================================
       HEADINGS
       ===================================================== */

    const headingMatch = line.match(
      /^(#{1,4})\s+(.*)$/
    );

    if (headingMatch) {
      flushParagraph();
      flushList();

      const level = headingMatch[1].length;
      const headingText = headingMatch[2];

      if (level === 1) {
        elements.push(
          <h2 key={`h-${elements.length}`}>
            {renderInlineMarkdown(headingText)}
          </h2>
        );
      }

      if (level === 2) {
        elements.push(
          <h3 key={`h-${elements.length}`}>
            {renderInlineMarkdown(headingText)}
          </h3>
        );
      }

      if (level >= 3) {
        elements.push(
          <h4 key={`h-${elements.length}`}>
            {renderInlineMarkdown(headingText)}
          </h4>
        );
      }

      return;
    }


    /* =====================================================
       UNORDERED LIST
       ===================================================== */

    const unorderedMatch = line.match(
      /^[-*+]\s+(.*)$/
    );

    if (unorderedMatch) {
      flushParagraph();

      if (listType !== "unordered") {
        flushList();
        listType = "unordered";
      }

      listBuffer.push(
        unorderedMatch[1]
      );

      return;
    }


    /* =====================================================
       ORDERED LIST
       ===================================================== */

    const orderedMatch = line.match(
      /^\d+\.\s+(.*)$/
    );

    if (orderedMatch) {
      flushParagraph();

      if (listType !== "ordered") {
        flushList();
        listType = "ordered";
      }

      listBuffer.push(
        orderedMatch[1]
      );

      return;
    }


    /* =====================================================
       BLOCKQUOTE
       ===================================================== */

    const quoteMatch = line.match(
      /^>\s?(.*)$/
    );

    if (quoteMatch) {
      flushParagraph();
      flushList();

      elements.push(
        <blockquote key={`quote-${elements.length}`}>
          {renderInlineMarkdown(
            quoteMatch[1]
          )}
        </blockquote>
      );

      return;
    }


    /* =====================================================
       NORMAL PARAGRAPH
       ===================================================== */

    if (listBuffer.length) {
      flushList();
    }

    paragraphBuffer.push(line);
  });


  flushParagraph();
  flushList();


  return (
    <div className="dpf-markdown">
      {elements}
    </div>
  );
}


/* =========================================================
   MAIN COMPONENT
   ========================================================= */

export default function Intelligence() {
  const { t } = useTranslation();

  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  /* =======================================================
     GENERATE
     ======================================================= */

  async function handleGenerate() {
    if (!prompt.trim() || loading) return;

    setLoading(true);
    setAnswer("");
    setError("");

    try {
      const data =
        await generateDPFAI({
          prompt: prompt.trim(),
        });
      setAnswer(
        data.text || ""
      );
    } catch (err) {
      setError(
        err.message ||
          "Unable to connect to DPF Intelligence."
      );
    } finally {
      setLoading(false);
    }
  }


  /* =======================================================
     RENDER
     ======================================================= */

  return (
    <section className="home-intelligence">


      {/* =====================================================
          HEADER
          ===================================================== */}

      <div className="home-intelligence__header">

        <div className="home-intelligence__label">
          {t("intelligence.label")}
        </div>

        <div className="home-intelligence__index">
          08 / 08
        </div>

      </div>


      {/* =====================================================
          MAIN
          ===================================================== */}

      <div className="home-intelligence__main">


        {/* ===================================================
            VISUAL
            =================================================== */}

        <div className="home-intelligence__visual">

          <div
            className="
              intelligence-orbit
              intelligence-orbit--outer
            "
          />

          <div
            className="
              intelligence-orbit
              intelligence-orbit--middle
            "
          />

          <div
            className="
              intelligence-orbit
              intelligence-orbit--inner
            "
          />

          <div className="intelligence-core-glow" />


          <div className="intelligence-core">

            <span className="intelligence-core__label">
              FINAL OUTPUT
            </span>

            <strong>
              DPF OS
            </strong>

            <span className="intelligence-core__subtitle">
              FOOTBALL INTELLIGENCE
            </span>

          </div>

        </div>


        {/* ===================================================
            CONTENT
            =================================================== */}

        <div className="home-intelligence__content">

          <span className="home-intelligence__eyebrow">
            {t("intelligence.hero.eyebrow")}
          </span>


          <h2>

            {t(
              "intelligence.hero.title.line1"
            )}

            <br />

            <span>
              {t(
                "intelligence.hero.title.highlight"
              )}
            </span>

          </h2>


          <p className="home-intelligence__lead">
            {t(
              "intelligence.hero.description"
            )}
          </p>


          <p className="home-intelligence__description">
            {t(
              "intelligence.hero.secondary"
            )}
          </p>

        </div>

      </div>


      {/* =====================================================
          INTELLIGENCE FLOW
          ===================================================== */}

      <div className="home-intelligence__flow">


        {/* EVIDENCE */}

        <div className="intelligence-step">

          <span>
            {t(
              "intelligence.process.evidence.number"
            )}
          </span>

          <strong>
            {t(
              "intelligence.process.evidence.title"
            )}
          </strong>

          <small>
            {t(
              "intelligence.process.evidence.subtitle"
            )}
          </small>

        </div>


        <div className="intelligence-arrow">
          Ã¢â€ â€™
        </div>


        {/* INSIGHT */}

        <div className="intelligence-step">

          <span>
            {t(
              "intelligence.process.insight.number"
            )}
          </span>

          <strong>
            {t(
              "intelligence.process.insight.title"
            )}
          </strong>

          <small>
            {t(
              "intelligence.process.insight.subtitle"
            )}
          </small>

        </div>


        <div className="intelligence-arrow">
          Ã¢â€ â€™
        </div>


        {/* DECISION */}

        <div className="intelligence-step">

          <span>
            {t(
              "intelligence.process.decision.number"
            )}
          </span>

          <strong>
            {t(
              "intelligence.process.decision.title"
            )}
          </strong>

          <small>
            {t(
              "intelligence.process.decision.subtitle"
            )}
          </small>

        </div>


        <div className="intelligence-arrow">
          Ã¢â€ â€™
        </div>


        {/* ACTION */}

        <div
          className="
            intelligence-step
            intelligence-step--final
          "
        >

          <span>
            {t(
              "intelligence.process.action.number"
            )}
          </span>

          <strong>
            {t(
              "intelligence.process.action.title"
            )}
          </strong>

          <small>
            {t(
              "intelligence.process.action.subtitle"
            )}
          </small>

        </div>

      </div>


      {/* =====================================================
          FOOTER FLOW
          ===================================================== */}

      <div className="home-intelligence__footer">

        <span>
          {t(
            "intelligence.flow.knowledge"
          )}
        </span>

        <b>Ã¢â€ â€™</b>

        <span>
          {t(
            "intelligence.flow.intelligence"
          )}
        </span>

        <b>Ã¢â€ â€™</b>

        <span>
          {t(
            "intelligence.flow.decision"
          )}
        </span>

        <b>Ã¢â€ â€™</b>

        <span>
          {t(
            "intelligence.flow.action"
          )}
        </span>

        <b>Ã¢â€ â€™</b>

        <span className="is-final">
          {t(
            "intelligence.flow.evolution"
          )}
        </span>

      </div>


      {/* =====================================================
          LIVE DPF INTELLIGENCE ENGINE
          ===================================================== */}

      <div className="home-intelligence__engine">


        {/* ENGINE HEADER */}

        <div className="home-intelligence__engine-header">

          <div>

            <span className="home-intelligence__engine-label">
              DPF INTELLIGENCE ENGINE
            </span>

            <h3>
              Ask the Football System.
            </h3>

            <p>
              Query the DPF knowledge layer and
              receive an intelligence response
              grounded in authoritative DPF knowledge.
            </p>

          </div>


          <div className="home-intelligence__engine-status">

            <span />

            SYSTEM ONLINE

          </div>

        </div>


        {/* =================================================
            QUERY
            ================================================= */}

        <div className="home-intelligence__query">

          <textarea
            value={prompt}
            onChange={(event) =>
              setPrompt(
                event.target.value
              )
            }
            onKeyDown={(event) => {

              if (
                event.key === "Enter" &&
                !event.shiftKey
              ) {
                event.preventDefault();

                handleGenerate();
              }

            }}
            placeholder="Ask anything about football or the DPF system..."
            rows={4}
            disabled={loading}
          />


          <button
            type="button"
            onClick={handleGenerate}
            disabled={
              !prompt.trim() ||
              loading
            }
          >
            {loading
              ? "PROCESSING..."
              : "RUN INTELLIGENCE Ã¢â€ â€™"}
          </button>

        </div>


        {/* =================================================
            ERROR
            ================================================= */}

        {error && (

          <div className="home-intelligence__error">
            {error}
          </div>

        )}


        {/* =================================================
            PROCESSING
            ================================================= */}

        {loading && (

          <div className="home-intelligence__processing">

            <span className="intelligence-processing-dot" />

            RETRIEVING KNOWLEDGE

            <span>
              Ã¢â€ â€™
            </span>

            BUILDING CONTEXT

            <span>
              Ã¢â€ â€™
            </span>

            GENERATING RESPONSE

          </div>

        )}


        {/* =================================================
            ANSWER
            ================================================= */}

        {answer && !loading && (

          <div className="home-intelligence__answer">

            <div className="home-intelligence__answer-label">
              DPF INTELLIGENCE OUTPUT
            </div>


            <div className="home-intelligence__answer-content">

              <MarkdownContent
                content={answer}
              />

            </div>

          </div>

        )}

      </div>

    </section>
  );
}