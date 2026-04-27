import { useState } from "react";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("All fields are required.");
      return;
    }
    if (password.length < 4) {
      setError("Password must be at least 4 characters.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin(username.trim());
    }, 1200);
  };

  return (
    <div className="login-root">
      {/* Animated grid background */}
      <div className="grid-bg" />
      <div className="scan-line" />

      <div className="login-wrapper">
        {/* Logo / Brand */}
        <div className="brand-block">
          <div className="shield-icon">
            <svg viewBox="0 0 48 56" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M24 2L4 10V28C4 39.05 12.8 49.36 24 52C35.2 49.36 44 39.05 44 28V10L24 2Z"
                fill="rgba(0,212,255,0.08)"
                stroke="#00d4ff"
                strokeWidth="1.5"
              />
              <path
                d="M24 12L12 17V28C12 34.63 17.28 40.78 24 42.4C30.72 40.78 36 34.63 36 28V17L24 12Z"
                fill="rgba(0,212,255,0.12)"
                stroke="#00d4ff"
                strokeWidth="1"
                opacity="0.7"
              />
              <text x="24" y="33" textAnchor="middle" fill="#00d4ff" fontSize="14" fontFamily="monospace" fontWeight="bold">AI</text>
            </svg>
          </div>
          <h1 className="brand-title">GUARDIAN<span>AI</span></h1>
          <p className="brand-sub">PERSONAL SAFETY SYSTEM v1.0</p>
        </div>

        {/* Login Card */}
        <div className="login-card">
          <div className="card-header">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
            <span className="card-header-title">SECURE ACCESS</span>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="field-group">
              <label className="field-label">USER IDENTIFIER</label>
              <div className="input-wrap">
                <span className="input-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className="cyber-input"
                  autoComplete="off"
                />
              </div>
            </div>

            <div className="field-group">
              <label className="field-label">ACCESS CODE</label>
              <div className="input-wrap">
                <span className="input-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="cyber-input"
                />
              </div>
            </div>

            {error && (
              <div className="error-msg">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {error}
              </div>
            )}

            <button type="submit" className={`login-btn ${loading ? "loading" : ""}`} disabled={loading}>
              {loading ? (
                <span className="btn-loading">
                  <span className="spinner" />
                  AUTHENTICATING...
                </span>
              ) : (
                "INITIATE SECURE LOGIN"
              )}
            </button>
          </form>

          <p className="login-hint">
            Demo: any username + password (min 4 chars)
          </p>
        </div>

        <p className="footer-text">
          GUARDIAN AI &copy; 2025 &nbsp;|&nbsp; ENCRYPTED CONNECTION
        </p>
      </div>
    </div>
  );
}