import "./Cookies.css";

export default function Cookies() {
  return (
    <main className="cookies-page">
      <div className="cookies-container">

        <header className="cookies-hero">
          <div className="cookies-eyebrow">DPF OS LEGAL</div>

          <h1>Cookie Policy</h1>

          <p>
            This Cookie Policy explains how DPF OS may use cookies,
            local storage and similar technologies across its website
            and digital services.
          </p>

          <div className="cookies-meta">
            <span>Version 1.0</span>
            <span>Effective Date: August 17, 2026</span>
          </div>
        </header>


        <section className="cookies-section">
          <h2>1. What Are Cookies?</h2>

          <p>
            Cookies are small data files stored on your device by a
            website. They may allow a website to remember preferences,
            maintain sessions, provide security and understand how the
            service is being used.
          </p>

          <p>
            DPF OS may also use technologies that perform functions
            similar to cookies, including browser storage and related
            technologies.
          </p>
        </section>


        <section className="cookies-section">
          <h2>2. How DPF OS May Use Cookies</h2>

          <p>
            Depending on the services enabled on the platform, cookies
            and similar technologies may be used for:
          </p>

          <ul>
            <li>Authentication and account sessions.</li>
            <li>Security and fraud prevention.</li>
            <li>Language and interface preferences.</li>
            <li>Remembering user settings.</li>
            <li>Platform functionality.</li>
            <li>Performance monitoring.</li>
            <li>Analytics and product improvement.</li>
          </ul>
        </section>


        <section className="cookies-section">
          <h2>3. Categories of Cookies</h2>

          <div className="cookie-card">
            <span>01</span>
            <div>
              <h3>Strictly Necessary</h3>
              <p>
                These technologies may be necessary for authentication,
                security, navigation and core platform functionality.
              </p>
            </div>
          </div>

          <div className="cookie-card">
            <span>02</span>
            <div>
              <h3>Functional</h3>
              <p>
                These technologies may remember preferences such as
                language, interface settings and workspace configuration.
              </p>
            </div>
          </div>

          <div className="cookie-card">
            <span>03</span>
            <div>
              <h3>Analytics</h3>
              <p>
                Where enabled, analytics technologies may help us
                understand usage patterns, diagnose technical issues and
                improve the platform.
              </p>
            </div>
          </div>

          <div className="cookie-card">
            <span>04</span>
            <div>
              <h3>Third-Party Technologies</h3>
              <p>
                Certain service providers may place or access cookies or
                similar technologies when their services are integrated
                into DPF OS.
              </p>
            </div>
          </div>
        </section>


        <section className="cookies-section">
          <h2>4. Authentication and Private Workspaces</h2>

          <p>
            DPF OS may use browser storage and session technologies to
            maintain authenticated sessions and protect private areas
            such as Premium Workspace and Club OS.
          </p>

          <p>
            These technologies may be essential to maintaining the
            user's authorized session and enforcing access controls.
          </p>
        </section>


        <section className="cookies-section">
          <h2>5. Analytics</h2>

          <p>
            DPF OS may use analytics services to understand how the
            public website and platform are used.
          </p>

          <p>
            The specific analytics providers and technologies used in
            production will be identified in the applicable privacy and
            cookie disclosures when deployed.
          </p>
        </section>


        <section className="cookies-section">
          <h2>6. Managing Cookies</h2>

          <p>
            Most modern browsers allow users to view, delete or block
            cookies through browser settings.
          </p>

          <p>
            Blocking certain cookies may affect the availability or
            functionality of some DPF OS features, particularly
            authentication and private workspaces.
          </p>
        </section>


        <section className="cookies-section">
          <h2>7. Consent and Cookie Preferences</h2>

          <p>
            Where applicable law requires consent for non-essential
            cookies or similar technologies, DPF OS will provide an
            appropriate mechanism for users to manage their preferences.
          </p>

          <p>
            Essential technologies required for security, authentication
            or core service functionality may operate where legally
            permitted without optional analytics or marketing consent.
          </p>
        </section>


        <section className="cookies-section">
          <h2>8. Third-Party Websites</h2>

          <p>
            DPF OS may link to external websites, videos, articles,
            research resources or other third-party services.
          </p>

          <p>
            Those services may use their own cookies and tracking
            technologies. Their practices are governed by their own
            policies and not by this Cookie Policy.
          </p>
        </section>


        <section className="cookies-section">
          <h2>9. Changes to This Policy</h2>

          <p>
            We may update this Cookie Policy when our technology,
            analytics configuration, services or legal requirements
            change.
          </p>

          <p>
            The current version will be published on the DPF OS website
            together with its effective date.
          </p>
        </section>


        <section className="cookies-section">
          <h2>10. Contact</h2>

          <p>
            Questions regarding cookies or privacy practices may be
            submitted through the official DPF OS privacy or legal
            contact channel.
          </p>

          <p className="cookies-placeholder">
            Privacy Contact: [INSERT OFFICIAL PRIVACY EMAIL]
          </p>
        </section>


        <footer className="cookies-footer">
          <strong>DPF OS</strong>
          <span>Dynamic Positional Football Operating System</span>
          <span>Cookie Policy · Version 1.0</span>
        </footer>

      </div>
    </main>
  );
}