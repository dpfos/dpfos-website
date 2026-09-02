import "./Auth.css";
import { useState } from "react";
import { useDPFAuth } from "../core/index.js";

function Auth() {
  const {
    signUp,
    signIn,
    signInWithOAuth,
    sendPasswordReset,
  } = useDPFAuth();

  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      if (mode === "signup") {
        const { error } = await signUp({
          email,
          password,
        });

        if (error) throw error;

        setMessage(
          "Account created. Please check your email to confirm your account."
        );
      } else {
        const { error } = await signIn({
          email,
          password,
        });

        if (error) throw error;

        setMessage("Signed in successfully.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const { error } = await sendPasswordReset(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      setMessage(
        "Password reset instructions have been sent to your email."
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const { error } = await signInWithOAuth(provider, {
        provider,
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      });

      if (error) throw error;
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleModeSwitch = () => {
    setMode(mode === "login" ? "signup" : "login");
    setMessage("");
    setError("");
    setPassword("");
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-kicker">
          DPF OS / ACCOUNT
        </div>

        <h1 className="auth-title">
          {mode === "login" ? "Sign in" : "Create account"}
        </h1>

        <p className="auth-subtitle">
          {mode === "login"
            ? "Access your DPF OS account and continue your journey."
            : "Create your DPF OS account and enter the system."}
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="email">Email</label>

            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="auth-field">
            <label htmlFor="password">Password</label>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              autoComplete={
                mode === "login" ? "current-password" : "new-password"
              }
            />
          </div>

          <button
            className="auth-submit"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Please wait..."
              : mode === "login"
                ? "Sign in"
                : "Create account"}
          </button>
        </form>

        <div className="auth-divider">
          <span>OR CONTINUE WITH</span>
        </div>

        <div className="auth-socials">
          <button
            type="button"
            className="auth-social"
            onClick={() => handleSocialLogin("google")}
            disabled={loading}
          >
            <span className="auth-social-icon">G</span>
            <span>Continue with Google</span>
          </button>

          <button
            type="button"
            className="auth-social"
            onClick={() => handleSocialLogin("facebook")}
            disabled={loading}
          >
            <span className="auth-social-icon">f</span>
            <span>Continue with Facebook</span>
          </button>

          <button
            type="button"
            className="auth-social"
            onClick={() => handleSocialLogin("x")}
            disabled={loading}
          >
            <span className="auth-social-icon">ð•</span>
            <span>Continue with X</span>
          </button>
        </div>

        {mode === "login" && (
          <button
            type="button"
            className="auth-forgot"
            onClick={handleForgotPassword}
            disabled={loading}
          >
            Forgot password?
          </button>
        )}

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

        <button
          className="auth-switch"
          type="button"
          onClick={handleModeSwitch}
          disabled={loading}
        >
          {mode === "login"
            ? "Create a new account"
            : "Already have an account? Sign in"}
        </button>
      </section>
    </main>
  );
}

export default Auth;