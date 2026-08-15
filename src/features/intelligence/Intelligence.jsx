import "./Intelligence.css";
import { useTranslation } from "react-i18next";

export default function Intelligence() {
  const { t } = useTranslation();

  return (
    <section className="home-intelligence">

      {/* HEADER */}

      <div className="home-intelligence__header">

        <div className="home-intelligence__label">
          {t("intelligence.label")}
        </div>

        <div className="home-intelligence__index">
          08 / 08
        </div>

      </div>


      {/* MAIN */}

      <div className="home-intelligence__main">

        {/* VISUAL */}

        <div className="home-intelligence__visual">

          <div className="intelligence-orbit intelligence-orbit--outer" />
          <div className="intelligence-orbit intelligence-orbit--middle" />
          <div className="intelligence-orbit intelligence-orbit--inner" />

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


        {/* CONTENT */}

        <div className="home-intelligence__content">

          <span className="home-intelligence__eyebrow">
            {t("intelligence.hero.eyebrow")}
          </span>

          <h2>
            {t("intelligence.hero.title.line1")}
            <br />
            <span>
              {t("intelligence.hero.title.highlight")}
            </span>
          </h2>

          <p className="home-intelligence__lead">
            {t("intelligence.hero.description")}
          </p>

          <p className="home-intelligence__description">
            {t("intelligence.hero.secondary")}
          </p>

        </div>

      </div>


      {/* INTELLIGENCE FLOW */}

      <div className="home-intelligence__flow">

        <div className="intelligence-step">

          <span>
            {t("intelligence.process.evidence.number")}
          </span>

          <strong>
            {t("intelligence.process.evidence.title")}
          </strong>

          <small>
            {t("intelligence.process.evidence.subtitle")}
          </small>

        </div>


        <div className="intelligence-arrow">
          →
        </div>


        <div className="intelligence-step">

          <span>
            {t("intelligence.process.insight.number")}
          </span>

          <strong>
            {t("intelligence.process.insight.title")}
          </strong>

          <small>
            {t("intelligence.process.insight.subtitle")}
          </small>

        </div>


        <div className="intelligence-arrow">
          →
        </div>


        <div className="intelligence-step">

          <span>
            {t("intelligence.process.decision.number")}
          </span>

          <strong>
            {t("intelligence.process.decision.title")}
          </strong>

          <small>
            {t("intelligence.process.decision.subtitle")}
          </small>

        </div>


        <div className="intelligence-arrow">
          →
        </div>


        <div className="intelligence-step intelligence-step--final">

          <span>
            {t("intelligence.process.action.number")}
          </span>

          <strong>
            {t("intelligence.process.action.title")}
          </strong>

          <small>
            {t("intelligence.process.action.subtitle")}
          </small>

        </div>

      </div>


      {/* FOOTER FLOW */}

      <div className="home-intelligence__footer">

        <span>
          {t("intelligence.flow.knowledge")}
        </span>

        <b>→</b>

        <span>
          {t("intelligence.flow.intelligence")}
        </span>

        <b>→</b>

        <span>
          {t("intelligence.flow.decision")}
        </span>

        <b>→</b>

        <span>
          {t("intelligence.flow.action")}
        </span>

        <b>→</b>

        <span className="is-final">
          {t("intelligence.flow.evolution")}
        </span>

      </div>

    </section>
  );
}