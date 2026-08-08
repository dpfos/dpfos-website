import "./Library.css";

const books = [
  {
    number: "01",
    title: "The Constitution",
    type: "FOUNDATION",
    description:
      "The foundational document defining the identity, principles and governing logic of DPF OS.",
  },
  {
    number: "02",
    title: "The Way",
    type: "PHILOSOPHY",
    description:
      "The philosophical pathway that defines how DPF understands football, learning and development.",
  },
  {
    number: "03",
    title: "The Blueprint",
    type: "ARCHITECTURE",
    description:
      "The structural blueprint translating DPF principles into an integrated football operating system.",
  },
  {
    number: "04",
    title: "Architectural Principles",
    type: "SYSTEM",
    description:
      "The principles governing the design, organization and interaction of the DPF football environment.",
  },
  {
    number: "05",
    title: "Institutional Framework",
    type: "INSTITUTION",
    description:
      "The organizational framework connecting leadership, governance, operations and football development.",
  },
  {
    number: "06",
    title: "The Game Model",
    type: "GAME MODEL",
    description:
      "The tactical architecture translating DPF philosophy and methodology into collective football behavior.",
  },
  {
    number: "07",
    title: "The Playbook",
    type: "PRACTICE",
    description:
      "The practical football reference connecting principles, situations, behaviors and actions on the pitch.",
  },
  {
    number: "08",
    title: "DPF Role Atlas",
    type: "PLAYER ROLES",
    description:
      "A role-based framework defining player responsibilities, behaviors and functional profiles.",
  },
  {
    number: "09",
    title: "Coaching Manual",
    type: "COACHING",
    description:
      "A coaching framework connecting methodology, learning, training design and daily practice.",
  },
  {
    number: "10",
    title: "Player Development",
    type: "DEVELOPMENT",
    description:
      "A structured pathway for developing players through DPF principles, roles, performance and learning.",
  },
  {
    number: "11",
    title: "Performance System",
    type: "PERFORMANCE",
    description:
      "The systems connecting performance analysis, measurement, development and continuous improvement.",
  },
  {
    number: "12",
    title: "Research & Intelligence",
    type: "RESEARCH",
    description:
      "The evolving knowledge layer connecting evidence, experimentation, research and football intelligence.",
  },
];

export default function Library() {
  return (
    <section className="library">
      <div className="library-container">

        <div className="library-header">

          <div className="library-label">
            DPF OS / KNOWLEDGE LIBRARY
          </div>

          <div className="library-heading">
            <h2>
              The Knowledge
              <br />
              Behind the System.
            </h2>

            <p>
              The DPF Knowledge Library is the intellectual foundation of
              the operating system, bringing philosophy, methodology,
              tactical design, coaching, development, performance and
              research into one evolving body of knowledge.
            </p>
          </div>

        </div>

        <div className="library-feature">

          <div className="library-feature-mark">
            DPF
          </div>

          <div className="library-feature-content">

            <span>KNOWLEDGE ARCHITECTURE</span>

            <h3>
              One Library.
              <br />
              One Operating System.
            </h3>

            <p>
              Each book represents a distinct layer of the DPF ecosystem,
              while together they form one coherent knowledge architecture.
            </p>

          </div>

          <div className="library-feature-index">
            <strong>12+</strong>
            <span>CORE VOLUMES</span>
          </div>

        </div>

        <div className="library-grid">

          {books.map((book) => (
            <article
              className="library-card"
              key={book.number}
            >

              <div className="library-card-top">

                <span className="library-number">
                  {book.number}
                </span>

                <span className="library-type">
                  {book.type}
                </span>

              </div>

              <div className="library-card-content">

                <h3>{book.title}</h3>

                <p>{book.description}</p>

              </div>

              <div className="library-card-bottom">
                <span>DPF OS</span>
                <span className="library-arrow">→</span>
              </div>

            </article>
          ))}

        </div>

        <div className="library-footer">

          <div>
            <span className="library-footer-label">
              CONTINUOUSLY EVOLVING
            </span>

            <h3>
              Knowledge becomes
              <br />
              infrastructure.
            </h3>
          </div>

          <p>
            DPF OS is designed as a living knowledge system. New research,
            frameworks, methodologies and practical insights continuously
            expand the library and strengthen the operating system.
          </p>

        </div>

      </div>
    </section>
  );
}
