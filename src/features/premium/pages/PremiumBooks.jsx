export default function PremiumBooks() {
  return (
    <div>
      <h1 className="dpf-page-title">Books</h1>

      <p className="dpf-page-subtitle">
        Full protected editions available through premium access.
      </p>

      <div className="dpf-card-grid">
        <article className="dpf-workspace-card">
          <h3>DPF Game Model</h3>
          <p>Protected full edition.</p>
        </article>

        <article className="dpf-workspace-card">
          <h3>DPF Playbook</h3>
          <p>Protected full edition.</p>
        </article>

        <article className="dpf-workspace-card">
          <h3>DPF Player Development</h3>
          <p>Protected full edition.</p>
        </article>
      </div>
    </div>
  );
}
