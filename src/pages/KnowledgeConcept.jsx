import { Link, useParams } from "react-router-dom";
import { findGlossaryConcept } from "../data/searchGlossary";
import "./KnowledgeConcept.css";

export default function KnowledgeConcept() {
  const { slug } = useParams();

  const concept = findGlossaryConcept(slug);

  if (!concept) {
    return (
      <main className="knowledge-concept knowledge-concept--not-found">
        <div className="knowledge-concept__not-found">

          <span className="knowledge-concept__eyebrow">
            DPF OS KNOWLEDGE
          </span>

          <h1>
            Knowledge concept
            <br />
            not found.
          </h1>

          <p>
            The requested concept does not exist in the
            DPF OS Knowledge Glossary.
          </p>

          <Link
            to="/library"
            className="knowledge-concept__back"
          >
            ← Back to Knowledge Library
          </Link>

        </div>
      </main>
    );
  }

  const aliases = concept.aliases || [];
  const related = concept.related || [];

  return (
    <main className="knowledge-concept">

      {/* ================================================= */}
      {/* BACK */}
      {/* ================================================= */}

      <div className="knowledge-concept__container">

        <Link
          to="/library"
          className="knowledge-concept__back"
        >
          ← BACK TO KNOWLEDGE LIBRARY
        </Link>


        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <section className="knowledge-concept__hero">

          <div className="knowledge-concept__eyebrow">
            DPF OS / KNOWLEDGE CONCEPT
          </div>


          <div className="knowledge-concept__domain">
            {concept.domain || "FOOTBALL KNOWLEDGE"}
          </div>


          <h1>
            {concept.term}
          </h1>


          {concept.definition && (
            <p className="knowledge-concept__definition">
              {concept.definition}
            </p>
          )}

        </section>


        {/* ================================================= */}
        {/* META */}
        {/* ================================================= */}

        <section className="knowledge-concept__meta">

          <div>
            <span>TYPE</span>
            <strong>CONCEPT</strong>
          </div>

          <div>
            <span>DOMAIN</span>
            <strong>
              {concept.domain || "FOOTBALL"}
            </strong>
          </div>

          <div>
            <span>STATUS</span>
            <strong>DPF OS KNOWLEDGE</strong>
          </div>

        </section>


        {/* ================================================= */}
        {/* ALIASES */}
        {/* ================================================= */}

        {aliases.length > 0 && (

          <section className="knowledge-concept__section">

            <span className="knowledge-concept__section-label">
              TERMINOLOGY
            </span>

            <h2>
              Also known as
            </h2>

            <div className="knowledge-concept__tags">

              {aliases.map((alias) => (
                <span key={alias}>
                  {alias}
                </span>
              ))}

            </div>

          </section>
        )}


        {/* ================================================= */}
        {/* RELATED */}
        {/* ================================================= */}

        {related.length > 0 && (

          <section className="knowledge-concept__section">

            <span className="knowledge-concept__section-label">
              KNOWLEDGE NETWORK
            </span>

            <h2>
              Related concepts
            </h2>

            <div className="knowledge-concept__related">

              {related.map((item) => (
                <div
                  key={item}
                  className="knowledge-concept__related-item"
                >
                  <span>•</span>
                  {item}
                </div>
              ))}

            </div>

          </section>
        )}


        {/* ================================================= */}
        {/* FUTURE DPF CONTEXT */}
        {/* ================================================= */}

        <section className="knowledge-concept__section knowledge-concept__future">

          <span className="knowledge-concept__section-label">
            DPF OS CONTEXT
          </span>

          <h2>
            Where this concept lives
            <br />
            inside the system.
          </h2>

          <p>
            This knowledge node will eventually connect
            this concept to DPF OS books, principles,
            roles, methodologies, game model structures,
            player development and related knowledge.
          </p>

        </section>


        {/* ================================================= */}
        {/* FUTURE RESEARCH */}
        {/* ================================================= */}

        <section className="knowledge-concept__research">

          <div>

            <span>
              FUTURE INTELLIGENCE LAYER
            </span>

            <h2>
              External research
              <br />
              will connect here.
            </h2>

          </div>

          <p>
            AI-assisted research and external web
            intelligence will become a separate layer
            of the DPF OS Search Engine.
          </p>

        </section>

      </div>

    </main>
  );
}