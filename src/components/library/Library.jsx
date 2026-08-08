import "./Library.css";

export default function Library() {
  return (
    <main className="library-page">

      {/* HERO */}
      <section className="library-hero">
        <div className="library-container">

          <div className="library-label">
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


      {/* LIBRARY INTRO */}
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
                frameworks, methodologies and research that form the
                intellectual foundation of the DPF Operating System.
              </p>
            </div>

          </div>


          {/* BOOK GRID */}
          <div className="library-grid">

            <article className="library-card">
              <span>01</span>

              <h3>The Constitution</h3>

              <p>
                The foundational principles, identity and governing logic
                of the DPF Operating System.
              </p>
            </article>


            <article className="library-card">
              <span>02</span>

              <h3>The Way</h3>

              <p>
                The philosophy and way of thinking that guide the DPF
                football environment.
              </p>
            </article>


            <article className="library-card">
              <span>03</span>

              <h3>The Blueprint</h3>

              <p>
                The structural framework for designing and implementing
                the DPF system.
              </p>
            </article>


            <article className="library-card">
              <span>04</span>

              <h3>Architectural Principles</h3>

              <p>
                The principles governing relationships, structure,
                space and system behavior.
              </p>
            </article>


            <article className="library-card">
              <span>05</span>

              <h3>Institutional Framework</h3>

              <p>
                The organizational architecture required to operate DPF
                within football institutions.
              </p>
            </article>


            <article className="library-card">
              <span>06</span>

              <h3>The Game Model</h3>

              <p>
                The football logic translating DPF principles into
                collective behavior and action.
              </p>
            </article>

          </div>

        </div>
      </section>

    </main>
  );
}