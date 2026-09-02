import { useState } from "react";
import { useDPFAuth } from "../core/index.js";

function ResetPassword() {
  const { updatePassword } = useDPFAuth();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await updatePassword(password);
if (error) throw error;

      setMessage("Your password has been updated successfully.");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card">

        <div className="auth-kicker">
          DPF OS / ACCOUNT
        </div>

        <h1 className="auth-title">
          Reset password
        </h1>

        <p className="auth-subtitle">
          Create a new password for your DPF OS account.
        </p>

        <form onSubmit={handleSubmit}>

          <div className="auth-field">
            <label htmlFor="password">
              NEW PASSWORD
            </label>

            <input
              id="password"
              type="password"
              placeholder="Enter your new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
            />
          </div>

          <div className="auth-field">
            <label htmlFor="confirmPassword">
              CONFIRM PASSWORD
            </label>

            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={8}
            />
          </div>

          <button
            className="auth-submit"
            type="submit"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update password"}
          </button>

        </form>

        {message && (
          <p className="auth-message">
            {message}
          </p>
        )}

        {error && (
          <p className="auth-error">
            {error}
          </p>
        )}

      </section>
    </main>
  );
}

export default ResetPassword;