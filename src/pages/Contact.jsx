import "./Contact.css";

export default function Contact() {
  return (
    <main className="contact-page">

      {/* HERO */}
      <section className="contact-hero">

        <div className="contact-label">
          DPF OS CONTACT
        </div>

        <h1>
          Build the
          <br />
          <span>Future of Football.</span>
        </h1>

        <p>
          Connect with the DPF Operating System to explore
          partnerships, implementation, research and
          opportunities across the football ecosystem.
        </p>

      </section>


      {/* CONTACT GRID */}
      <section className="contact-section">

        <div className="contact-intro">

          <div className="section-eyebrow">
            CONNECT WITH DPF OS
          </div>

          <h2>
            One conversation
            <br />
            can start a system.
          </h2>

          <p>
            Whether you represent a club, academy, federation,
            organization, research institution or technology
            company, DPF OS provides a framework for building
            better football environments.
          </p>

        </div>


        <div className="contact-grid">

          <article className="contact-card featured">

            <span className="contact-number">
              01
            </span>

            <h3>
              Partnerships
            </h3>

            <p>
              Explore strategic partnerships and opportunities
              to implement DPF OS across football environments.
            </p>

            <a href="mailto:contact@dpfos.com">
              Start a conversation
              <span>↗</span>
            </a>

          </article>


          <article className="contact-card">

            <span className="contact-number">
              02
            </span>

            <h3>
              Clubs & Academies
            </h3>

            <p>
              Discover how DPF OS can support football
              development, coaching, performance and
              institutional operations.
            </p>

            <a href="mailto:contact@dpfos.com">
              Contact DPF OS
              <span>↗</span>
            </a>

          </article>


          <article className="contact-card">

            <span className="contact-number">
              03
            </span>

            <h3>
              Research & Innovation
            </h3>

            <p>
              Connect around football research, education,
              technology and the continuous evolution of
              the DPF knowledge system.
            </p>

            <a href="mailto:research@dpfos.com">
              Explore research
              <span>↗</span>
            </a>

          </article>


          <article className="contact-card">

            <span className="contact-number">
              04
            </span>

            <h3>
              General Inquiries
            </h3>

            <p>
              For general questions, information and
              opportunities to engage with the DPF OS ecosystem.
            </p>

            <a href="mailto:contact@dpfos.com">
              Get in touch
              <span>↗</span>
            </a>

          </article>

        </div>

      </section>


      {/* CLOSING */}
      <section className="contact-closing">

        <div className="closing-eyebrow">
          DPF OS
        </div>

        <h2>
          Football is evolving.
          <br />
          <span>Build with it.</span>
        </h2>

        <p>
          A connected operating system for the next generation
          of football.
        </p>

      </section>

    </main>
  );
}