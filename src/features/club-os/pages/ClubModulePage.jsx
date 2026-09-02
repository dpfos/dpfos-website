import { useState } from "react";
import { useParams, Link } from "react-router-dom";

import { useClubRuntime } from "../runtime/useClubRuntime";
import { getClubModuleById } from "../clubModules";
import { generateClubAI } from "../../../application/ai/club-ai.js";

import "../styles/ClubModulePage.css";


const QUICK_ACTIONS = [
  "Prepare tomorrow's training session",
  "Build a weekly training plan",
  "Review player development priorities",
  "Analyze the team's current needs",
  "Create a scouting framework",
  "Explain a DPF principle",
];

export default function ClubModulePage() {
  const { module } = useParams();

  const {
    club,
    teams,
    loading,
    error,
  } = useClubRuntime();

  const clubModule =
    getClubModuleById(module);

  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState(null);
  const [loadingAI, setLoadingAI] = useState(false);
  const [errorAI, setErrorAI] = useState("");

  if (loading) {
    return (
      <section className="club-module-page">
        <div className="club-module-empty">
          <span>DPF OS</span>

          <h1>Loading Club...</h1>

          <p>
            Resolving the Club OS environment.
          </p>
        </div>
      </section>
    );
  }

  if (error || !club) {
    return (
      <section className="club-module-page">
        <div className="club-module-empty">
          <span>DPF OS</span>

          <h1>Club Not Found</h1>

          <p>
            {error ||
              "The requested club environment does not exist."}
          </p>

          <Link to="/club">
            Return to Club OS
          </Link>
        </div>
      </section>
    );
  }

  if (!clubModule) {
    return (
      <section className="club-module-page">
        <div className="club-module-empty">
          <span>
            DPF OS / {club.metadata?.code}
          </span>

          <h1>Module Not Found</h1>

          <p>
            The requested Club OS module is not available.
          </p>

          <Link to={`/club/${club.id}`}>
            Return to Club Dashboard
          </Link>
        </div>
      </section>
    );
  }

  const isAIEngine =
    module === "ai-engine";

  async function askAI(customPrompt = null) {
    const userPrompt =
      customPrompt ?? prompt;

    if (!userPrompt.trim()) {
      return;
    }

    setLoadingAI(true);
    setErrorAI("");
    setResponse(null);

    try {
      const data =
        await generateClubAI({
          prompt: userPrompt,

          club,

          team: null,

          players: [],

          staff: [],

          currentModule:
            clubModule.id,

          requestContext: {
            source: "club_os",
            clubId: club.id,
            module: clubModule.id,
          },

          contextLimit: 8,
        });

      setResponse(data);
    } catch (requestError) {
      console.error(
        "[DPF Club AI]",
        requestError
      );

      setErrorAI(
        requestError.message ||
          "Unable to connect to DPF Club Intelligence."
      );
    } finally {
      setLoadingAI(false);
    }
  }

  if (isAIEngine) {
    return (
      <section className="club-module-page club-ai-page">

        <div className="club-module-header">

          <div>
            <div className="club-module-eyebrow">
              {club.metadata?.code} Â· CLUB INTELLIGENCE
            </div>

            <h1>
              DPF AI Engine
            </h1>

            <p>
              Intelligent football and operational
              decision support connected to the DPF OS
              knowledge system and this club environment.
            </p>
          </div>

          <div className="club-ai-live">
            <span />
            AI ENGINE
          </div>

        </div>


        <div className="club-ai-context">

          <div>
            <span>CLUB</span>

            <strong>
              {club.name}
            </strong>
          </div>

          <div>
            <span>TEAMS</span>

            <strong>
              {teams.length}
            </strong>
          </div>

          <div>
            <span>PLAYERS</span>

            <strong>â€”</strong>
          </div>

          <div>
            <span>ACTIVE MODULE</span>

            <strong>
              {clubModule.name}
            </strong>
          </div>

        </div>


        <div className="club-ai-workspace">

          <div className="club-ai-panel">

            <div className="club-ai-panel-header">

              <div>
                <span>DPF INTELLIGENCE</span>

                <h2>
                  Club Assistant
                </h2>
              </div>

              <div className="club-ai-live">
                <span />
                READY
              </div>

            </div>


            <div className="club-ai-actions">

              {QUICK_ACTIONS.map(
                (action) => (
                  <button
                    key={action}
                    type="button"
                    onClick={() => {
                      setPrompt(action);
                      askAI(action);
                    }}
                    disabled={loadingAI}
                  >
                    {action}
                  </button>
                )
              )}

            </div>


            <form
              className="club-ai-form"
              onSubmit={(event) => {
                event.preventDefault();
                askAI();
              }}
            >

              <textarea
                value={prompt}
                onChange={(event) =>
                  setPrompt(
                    event.target.value
                  )
                }
                placeholder={
                  "Ask DPF Intelligence about your club..."
                }
                disabled={loadingAI}
              />

              <div className="club-ai-form-footer">

                <span>
                  DPF OS Â· Authoritative Knowledge
                </span>

                <button
                  type="submit"
                  disabled={
                    loadingAI ||
                    !prompt.trim()
                  }
                >
                  {loadingAI
                    ? "THINKING..."
                    : "ASK DPF"}
                </button>

              </div>

            </form>

          </div>


          <div className="club-ai-output">

            <div className="club-ai-output-header">

              <div>
                <span>
                  DPF INTELLIGENCE OUTPUT
                </span>

                <h2>
                  Club Intelligence
                </h2>
              </div>

              {response && (
                <p className="club-ai-result-state">
                  {response.provider ??
                    "DPF"}
                  {" Â· "}
                  {response.model ?? ""}
                </p>
              )}

            </div>


            <div className="club-ai-output-body">

              {!loadingAI &&
                !response &&
                !errorAI && (
                  <div className="club-ai-empty">

                    <div className="club-ai-orbit">
                      AI
                    </div>

                    <h3>
                      Club Intelligence Ready
                    </h3>

                    <p>
                      Ask questions, prepare training,
                      analyze football operations, or
                      explore DPF knowledge within the
                      context of this club.
                    </p>

                  </div>
                )}


              {loadingAI && (
                <div className="club-ai-loading">

                  <div className="club-ai-loader">
                    <span />
                    <span />
                    <span />
                  </div>

                  <strong>
                    DPF Intelligence is thinking
                  </strong>

                  <p>
                    Resolving club context and
                    authoritative DPF knowledge...
                  </p>

                </div>
              )}


              {!loadingAI &&
                errorAI && (
                  <div className="club-ai-error">

                    <span>
                      INTELLIGENCE ERROR
                    </span>

                    <h3>
                      Unable to complete request
                    </h3>

                    <p>
                      {errorAI}
                    </p>

                  </div>
                )}


              {!loadingAI &&
                response &&
                !errorAI && (
                  <div className="club-ai-response">
                    {response.text}
                  </div>
                )}

            </div>

          </div>

        </div>


        <div className="club-module-footer">
          <Link to={`/club/${club.id}`}>
            ? Back to Club Dashboard
          </Link>
        </div>

      </section>
    );
  }


  return (
    <section className="club-module-page">

      <div className="club-module-header">

        <div>

          <div className="club-module-eyebrow">
            {club.metadata?.code} Â· CLUB OS
          </div>

          <h1>
            {clubModule.name}
          </h1>

          <p>
            {clubModule.description}
          </p>

        </div>

        <div className="club-module-status">
          <span className="status-dot" />
          {clubModule.status}
        </div>

      </div>


      <div className="club-module-context">

        <div>
          <span>CLUB</span>

          <strong>
            {club.name}
          </strong>
        </div>

        <div>
          <span>MODULE</span>

          <strong>
            {clubModule.name}
          </strong>
        </div>

        <div>
          <span>CATEGORY</span>

          <strong>
            {clubModule.category}
          </strong>
        </div>

      </div>


      <div className="club-module-workspace">

        <div className="workspace-placeholder">

          <div className="workspace-index">
            DPF OS
          </div>

          <h2>
            {clubModule.name} Workspace
          </h2>

          <p>
            This module is connected to the DPF OS
            operating architecture. Operational
            workflows, data structures and decision
            tools will be activated here.
          </p>

          <div className="workspace-meta">

            <div>
              <span>CLUB</span>

              <strong>
                {club.metadata?.shortName}
              </strong>
            </div>

            <div>
              <span>MODULE</span>

              <strong>
                {clubModule.id}
              </strong>
            </div>

            <div>
              <span>STATUS</span>

              <strong>
                {clubModule.status}
              </strong>
            </div>

          </div>

        </div>

      </div>


      <div className="club-module-footer">

        <Link to={`/club/${club.id}`}>
          ? Back to Club Dashboard
        </Link>

      </div>

    </section>
  );
}
