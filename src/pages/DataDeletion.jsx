
import { useState } from "react";
import "./DataDeletion.css";

const CONTACT_EMAIL = "dpf.footballos@gmail.com";

export default function DataDeletion() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
        "DPF OS Data Deletion Request"
      )}`;
    }
  };

  return (
    <main className="data-deletion-page">
      <div className="data-deletion-container">
        <span className="data-deletion-eyebrow">
          DPF OS · PRIVACY & DATA
        </span>

        <h1>Data Deletion Request</h1>

        <p className="data-deletion-intro">
          You have the right to request deletion of personal data
          associated with your DPF OS account and your use of our services.
        </p>

        <section className="data-deletion-card">
          <h2>How to request deletion</h2>

          <p>
            Send an email to our support team using the email address below.
            Please include the email address associated with your DPF OS
            account and clearly state that you are requesting data deletion.
          </p>

          <a
            className="data-deletion-email"
            href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
              "DPF OS Data Deletion Request"
            )}`}
          >
            {CONTACT_EMAIL}
          </a>

          <button
            className="data-deletion-button"
            type="button"
            onClick={copyEmail}
          >
            {copied ? "Email address copied" : "Copy email address"}
          </button>
        </section>

        <section className="data-deletion-card">
          <h2>What happens next?</h2>

          <ol>
            <li>
              We will review your request and may ask you to verify your
              identity to protect your account.
            </li>
            <li>
              We will identify the personal data associated with your request.
            </li>
            <li>
              We will delete eligible personal data or explain any legal or
              security reasons that require certain records to be retained.
            </li>
          </ol>
        </section>

        <section className="data-deletion-card">
          <h2>Important information</h2>

          <p>
            Submitting a request does not itself delete your data. Deletion
            takes place after the request has been reviewed and processed.
            Some records may need to be retained where required by law or
            for legitimate security and operational purposes.
          </p>

          <p>
            For more information about how DPF OS handles personal data,
            please review our{" "}
            <a href="/privacy">Privacy Policy</a>.
          </p>
        </section>

        <footer className="data-deletion-footer">
          DPF OS · Dynamic Positional Football Operating System
        </footer>
      </div>
    </main>
  );
}
