import "./Hero.css";
import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t, i18n } = useTranslation();

  const isRTL = i18n.language === "ar";

  return (
    <section
      className={`dpf-hero ${isRTL ? "dpf-hero--rtl" : ""}`}
      dir={isRTL ? "rtl" : "ltr"}
    >

      {/* =========================================
          DEEP SPACE ENVIRONMENT
      ========================================= */}
      <div className="dpf-hero__space" aria-hidden="true">
        <div className="dpf-hero__stars" />
        <div className="dpf-hero__nebula dpf-hero__nebula--blue" />
        <div className="dpf-hero__nebula dpf-hero__nebula--gold" />
      </div>


      {/* =========================================
          HERO CONTENT
      ========================================= */}
      <div className="dpf-hero__content">

        <h1 className="dpf-hero__title">

          <span>
            {t("home.hero.brand")}
          </span>

          <span className="dpf-hero__subtitle">
            {t("home.hero.subtitle")}
          </span>

          <span>
            {t("home.hero.title")}
          </span>

          <span className="dpf-hero__title-accent">
            {t("home.hero.highlight")}
          </span>

        </h1>


        <p className="dpf-hero__description">
          {t("home.hero.description")}
        </p>


        <div className="dpf-hero__actions">

          <a
            href="/platform"
            className="dpf-hero__button dpf-hero__button--primary"
          >
            {t("home.hero.explorePlatform")}
            <span>→</span>
          </a>

          <a
            href="/library"
            className="dpf-hero__button dpf-hero__button--secondary"
          >
            {t("home.hero.library")}
          </a>

        </div>


        <div className="dpf-hero__stats">

          <div className="dpf-hero__stat">
            <strong>10+</strong>
            <span>{t("home.hero.stats.knowledge")}</span>
            <small>{t("home.hero.stats.volumes")}</small>
          </div>

          <div className="dpf-hero__stat">
            <strong>100+</strong>
            <span>{t("home.hero.stats.frameworks")}</span>
            <small>{t("home.hero.stats.concepts")}</small>
          </div>

          <div className="dpf-hero__stat">
            <strong>∞</strong>
            <span>{t("home.hero.stats.system")}</span>
            <small>{t("home.hero.stats.evolution")}</small>
          </div>

        </div>

      </div>


      {/* =========================================
          CORE ENGINE
      ========================================= */}
      <div className="dpf-hero__core">

        <div className="dpf-hero__orbital dpf-hero__orbital--one">
          <div className="dpf-hero__planet dpf-hero__planet--1" />
          <div className="dpf-hero__planet dpf-hero__planet--2" />
        </div>

        <div className="dpf-hero__orbital dpf-hero__orbital--two">
          <div className="dpf-hero__planet dpf-hero__planet--3" />
          <div className="dpf-hero__planet dpf-hero__planet--4" />
        </div>

        <div className="dpf-hero__orbital dpf-hero__orbital--three">
          <div className="dpf-hero__planet dpf-hero__planet--5" />
          <div className="dpf-hero__planet dpf-hero__planet--6" />
        </div>


        {/* =========================================
            PLANETARY ORBIT SYSTEM
        ========================================= */}

        <div className="dpf-hero__planet-orbit dpf-hero__planet-orbit--one">
          <div className="dpf-hero__planet dpf-hero__planet--a" />
          <div className="dpf-hero__planet dpf-hero__planet--b" />
        </div>

        <div className="dpf-hero__planet-orbit dpf-hero__planet-orbit--two">
          <div className="dpf-hero__planet dpf-hero__planet--c" />
          <div className="dpf-hero__planet dpf-hero__planet--d" />
        </div>

        <div className="dpf-hero__planet-orbit dpf-hero__planet-orbit--three">
          <div className="dpf-hero__planet dpf-hero__planet--e" />
          <div className="dpf-hero__planet dpf-hero__planet--f" />
        </div>


        {/* =========================================
            ORBITAL CONNECTIONS
        ========================================= */}

        <div className="dpf-hero__connection dpf-hero__connection--one" />
        <div className="dpf-hero__connection dpf-hero__connection--two" />
        <div className="dpf-hero__connection dpf-hero__connection--three" />


        <div className="dpf-hero__core-sphere">

          <div className="dpf-hero__core-glow" />

          <div className="dpf-hero__core-label">
            <strong>{t("home.hero.core.engine")}</strong>
            <span>{t("home.hero.core.label")}</span>
          </div>

        </div>


        {/* =====================================
            ECOSYSTEM NODES
        ===================================== */}

        <div className="dpf-hero__node dpf-hero__node--clubs">
          <strong>{t("home.hero.nodes.clubs.title")}</strong>
          <span>{t("home.hero.nodes.clubs.subtitle")}</span>
        </div>

        <div className="dpf-hero__node dpf-hero__node--academies">
          <strong>{t("home.hero.nodes.academies.title")}</strong>
          <span>{t("home.hero.nodes.academies.subtitle")}</span>
        </div>

        <div className="dpf-hero__node dpf-hero__node--players">
          <strong>{t("home.hero.nodes.players.title")}</strong>
          <span>{t("home.hero.nodes.players.subtitle")}</span>
        </div>

        <div className="dpf-hero__node dpf-hero__node--federations">
          <strong>{t("home.hero.nodes.federations.title")}</strong>
          <span>{t("home.hero.nodes.federations.subtitle")}</span>
        </div>

      </div>


      {/* =========================================================
          DPF PITCH DATA ENVIRONMENT
          REAL FOOTBALL PITCH + DPF 18 FUNCTIONAL ZONES
      ========================================================= */}

      <div className="dpf-hero__pitch">

        <div className="dpf-hero__pitch-surface">

          <svg
            className="dpf-hero__pitch-svg"
            viewBox="0 0 1000 400"
            preserveAspectRatio="none"
            aria-hidden="true"
          >

            {/* PITCH SURFACE */}

            <rect
              className="dpf-pitch-surface-fill"
              x="100"
              y="60"
              width="800"
              height="280"
            />


            {/* FINE DATA GRID */}

            <g className="dpf-pitch-fine-grid">

              {Array.from({ length: 21 }).map((_, index) => (
                <line
                  key={`fine-v-${index}`}
                  x1={100 + index * 40}
                  y1="60"
                  x2={100 + index * 40}
                  y2="340"
                />
              ))}

              {Array.from({ length: 15 }).map((_, index) => (
                <line
                  key={`fine-h-${index}`}
                  x1="100"
                  y1={60 + index * 20}
                  x2="900"
                  y2={60 + index * 20}
                />
              ))}

            </g>


            {/* DPF 18 FUNCTIONAL ZONES */}

            <g className="dpf-pitch-zones">

              {Array.from({ length: 17 }).map((_, index) => {

                const x =
                  100 +
                  ((index + 1) * 800) / 18;

                return (
                  <line
                    key={`dpf-zone-${index + 1}`}
                    x1={x}
                    y1="60"
                    x2={x}
                    y2="340"
                  />
                );

              })}

            </g>


            {/* OUTER PITCH BOUNDARY */}

            <rect
              className="dpf-pitch-line"
              x="100"
              y="60"
              width="800"
              height="280"
            />


            {/* CENTER LINE */}

            <line
              className="dpf-pitch-line"
              x1="500"
              y1="60"
              x2="500"
              y2="340"
            />


            {/* CENTER CIRCLE */}

            <circle
              className="dpf-pitch-line"
              cx="500"
              cy="200"
              r="48"
            />

            <circle
              className="dpf-pitch-center-point"
              cx="500"
              cy="200"
              r="4"
            />


            {/* LEFT PENALTY AREA */}

            <rect
              className="dpf-pitch-line"
              x="100"
              y="125"
              width="120"
              height="150"
            />

            <rect
              className="dpf-pitch-line"
              x="100"
              y="165"
              width="55"
              height="70"
            />

            <circle
              className="dpf-pitch-dot"
              cx="180"
              cy="200"
              r="3"
            />

            <path
              className="dpf-pitch-line"
              d="M 220 158 A 48 48 0 0 0 220 242"
            />


            {/* RIGHT PENALTY AREA */}

            <rect
              className="dpf-pitch-line"
              x="780"
              y="125"
              width="120"
              height="150"
            />

            <rect
              className="dpf-pitch-line"
              x="845"
              y="165"
              width="55"
              height="70"
            />

            <circle
              className="dpf-pitch-dot"
              cx="820"
              cy="200"
              r="3"
            />

            <path
              className="dpf-pitch-line"
              d="M 780 158 A 48 48 0 0 1 780 242"
            />


            {/* LEFT GOAL */}

            <rect
              className="dpf-pitch-goal"
              x="72"
              y="170"
              width="28"
              height="60"
            />

            <line
              className="dpf-pitch-goal-net"
              x1="72"
              y1="185"
              x2="100"
              y2="185"
            />

            <line
              className="dpf-pitch-goal-net"
              x1="72"
              y1="200"
              x2="100"
              y2="200"
            />

            <line
              className="dpf-pitch-goal-net"
              x1="72"
              y1="215"
              x2="100"
              y2="215"
            />


            {/* RIGHT GOAL */}

            <rect
              className="dpf-pitch-goal"
              x="900"
              y="170"
              width="28"
              height="60"
            />

            <line
              className="dpf-pitch-goal-net"
              x1="900"
              y1="185"
              x2="928"
              y2="185"
            />

            <line
              className="dpf-pitch-goal-net"
              x1="900"
              y1="200"
              x2="928"
              y2="200"
            />

            <line
              className="dpf-pitch-goal-net"
              x1="900"
              y1="215"
              x2="928"
              y2="215"
            />

          </svg>


          {/* DATA / PLAYER POINTS */}

          <div className="dpf-hero__player p1" />
          <div className="dpf-hero__player p2" />
          <div className="dpf-hero__player p3" />
          <div className="dpf-hero__player p4" />
          <div className="dpf-hero__player p5" />
          <div className="dpf-hero__player p6" />
          <div className="dpf-hero__player p7" />
          <div className="dpf-hero__player p8" />
          <div className="dpf-hero__player p9" />
          <div className="dpf-hero__player p10" />
          <div className="dpf-hero__player p11" />

        </div>

      </div>


      {/* =========================================
          HERO SYSTEM LAYERS
      ========================================= */}

      <div className="dpf-hero__layer dpf-hero__layer--pitch">
        {t("home.hero.layers.pitch")}
      </div>

      <div className="dpf-hero__layer dpf-hero__layer--data">
        {t("home.hero.layers.data")}
      </div>

      <div className="dpf-hero__layer dpf-hero__layer--infra">
        {t("home.hero.layers.infrastructure")}
      </div>


      {/* =========================================
          SYSTEM MODULES
      ========================================= */}

      <div className="dpf-hero__modules">

        <div className="dpf-hero__module dpf-hero__module--gold">
          <span>01</span>
          <div>
            <strong>{t("home.hero.modules.game.title")}</strong>
            <small>{t("home.hero.modules.game.subtitle")}</small>
          </div>
        </div>

        <div className="dpf-hero__module dpf-hero__module--gold">
          <span>02</span>
          <div>
            <strong>{t("home.hero.modules.tactical.title")}</strong>
            <small>{t("home.hero.modules.tactical.subtitle")}</small>
          </div>
        </div>

        <div className="dpf-hero__module dpf-hero__module--gold">
          <span>03</span>
          <div>
            <strong>{t("home.hero.modules.player.title")}</strong>
            <small>{t("home.hero.modules.player.subtitle")}</small>
          </div>
        </div>

        <div className="dpf-hero__module dpf-hero__module--gold">
          <span>04</span>
          <div>
            <strong>{t("home.hero.modules.coaching.title")}</strong>
            <small>{t("home.hero.modules.coaching.subtitle")}</small>
          </div>
        </div>

        <div className="dpf-hero__module">
          <span>05</span>
          <div>
            <strong>{t("home.hero.modules.performance.title")}</strong>
            <small>{t("home.hero.modules.performance.subtitle")}</small>
          </div>
        </div>

        <div className="dpf-hero__module">
          <span>06</span>
          <div>
            <strong>{t("home.hero.modules.intelligence.title")}</strong>
            <small>{t("home.hero.modules.intelligence.subtitle")}</small>
          </div>
        </div>

        <div className="dpf-hero__module">
          <span>07</span>
          <div>
            <strong>{t("home.hero.modules.knowledge.title")}</strong>
            <small>{t("home.hero.modules.knowledge.subtitle")}</small>
          </div>
        </div>

        <div className="dpf-hero__module">
          <span>08</span>
          <div>
            <strong>{t("home.hero.modules.technology.title")}</strong>
            <small>{t("home.hero.modules.technology.subtitle")}</small>
          </div>
        </div>

      </div>


      {/* =========================================
          SYSTEM STATUS
      ========================================= */}

      <div className="dpf-hero__status">

        <span />

        <strong>
          {t("home.hero.status.online")}
        </strong>

        <small>
          {t("home.hero.status.synchronized")}
        </small>

      </div>


    </section>
  );
}