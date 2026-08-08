import "./GetStarted.css";

export default function GetStarted() {
  return (
    <main className="get-started-page">
      <section className="get-started-hero">

        <div className="get-started-eyebrow">
          DPF OPERATING SYSTEM
        </div>

        <h1>
          Start exploring
          <br />
          <span>DPF OS.</span>
        </h1>

        <p>
          Enter the Dynamic Positional Football Operating System.
          Explore the methodology, knowledge, research and tools
          that form the DPF ecosystem.
        </p>

        <div className="get-started-actions">
          <a href="/platform" className="primary-action">
            Explore the Platform
          </a>

          <a href="/library" className="secondary-action">
            Explore the Library
          </a>
        </div>

      </section>
    </main>
  );
}