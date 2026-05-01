import { useState } from "react";

const features = [
  {
    id: "voice",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="23" />
        <line x1="8" y1="23" x2="16" y2="23" />
      </svg>
    ),
    label: "Voice Trigger",
    color: "#00d4ff",
    status: "STANDBY",
    page: null,
  },
  {
    id: "shake",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
    label: "Shake Alert",
    color: "#f59e0b",
    status: "ACTIVE",
    page: null,
  },
  {
    id: "contacts",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    label: "Contacts",
    color: "#10b981",
    page: "contacts",
  },
  {
    id: "location",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: "Live Location",
    color: "#8b5cf6",
    status: "SHARING",
    page: null,
  },
  {
    id: "reviews",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    label: "Safety Reviews",
    color: "#00d4ff",
    status: "ONLINE",
    page: null,
  },
  {
    id: "fakecall",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.65 3.18 2 2 0 0 1 3.63 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.81a16 16 0 0 0 6.29 6.29l.88-.88a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
        <line x1="23" y1="1" x2="17" y2="7" />
        <line x1="17" y1="1" x2="23" y2="7" />
      </svg>
    ),
    label: "Fake Call",
    color: "#f43f5e",
    status: "READY",
    page: null,
  },
  {
    id: "route",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    label: "Safe Route",
    color: "#10b981",
    status: "MAP READY",
    page: null,
  },
  {
    id: "history",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    label: "Alert History",
    color: "#f59e0b",
    status: "12 LOGS",
    page: null,
  },
];

export default function Home({ user, onLogout, navigate, contactCount, onSOS }) {
  const [status, setStatus] = useState("safe");
  const [sosActive, setSosActive] = useState(false);
  const [sosCountdown, setSosCountdown] = useState(null);

  const toggleStatus = () => setStatus((s) => (s === "safe" ? "atrisk" : "safe"));

  const handleSOS = () => {
    if (sosActive) return;
    setSosActive(true);
    let count = 3;
    setSosCountdown(count);
    const interval = setInterval(() => {
      count--;
      setSosCountdown(count);
      if (count === 0) {
        clearInterval(interval);
        setSosCountdown(null);
        setStatus("atrisk");
        
        if (onSOS) {
          onSOS(user);
        }

        setTimeout(() => setSosActive(false), 2000);
      }
    }, 1000);
  };

  const handleFeatureClick = (feature) => {
    if (feature.page) navigate(feature.page);
  };

  return (
    <div className="home-root">
      <div className="scan-line" />

      {/* SOS Overlay */}
      {sosActive && sosCountdown !== null && (
        <div className="sos-overlay">
          <div className="sos-modal">
            <div className="sos-pulse" />
            <p className="sos-label">SOS ACTIVATING IN</p>
            <p className="sos-count">{sosCountdown}</p>
            <p className="sos-sub">Alerting emergency contacts...</p>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="home-nav">
        <div className="nav-brand">
          <svg width="22" height="26" viewBox="0 0 48 56" fill="none">
            <path d="M24 2L4 10V28C4 39.05 12.8 49.36 24 52C35.2 49.36 44 39.05 44 28V10L24 2Z"
              fill="rgba(0,212,255,0.1)" stroke="#00d4ff" strokeWidth="1.5" />
            <text x="24" y="33" textAnchor="middle" fill="#00d4ff" fontSize="13" fontFamily="monospace" fontWeight="bold">AI</text>
          </svg>
          <span className="nav-title">GUARDIAN<b>AI</b></span>
        </div>
        <div className="nav-right">
          <span className="nav-user">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            {user}
          </span>
          <button className="logout-btn" onClick={onLogout}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        </div>
      </nav>

      <div className="home-content">
        {/* Status Banner */}
        <div
          className={`status-banner ${status === "safe" ? "status-safe" : "status-risk"}`}
          onClick={toggleStatus}
          title="Click to toggle status (demo)"
        >
          <div className="status-dot-wrap">
            <span className="status-blink" />
            <span className="status-dot-inner" />
          </div>
          <div className="status-text-block">
            <span className="status-label">CURRENT STATUS</span>
            <span className="status-value">
              {status === "safe" ? "● YOU ARE SAFE" : "⚠ AT RISK — ALERT READY"}
            </span>
          </div>
          <span className="status-badge">{status === "safe" ? "SECURE" : "DANGER"}</span>
        </div>

        {/* SOS Button */}
        <div className="sos-section">
          <div className="sos-ring-outer">
            <div className="sos-ring-inner">
              <button
                className={`sos-btn ${sosActive ? "sos-btn-active" : ""}`}
                onClick={handleSOS}
              >
                <span className="sos-btn-label">SOS</span>
                <span className="sos-btn-sub">PRESS & HOLD</span>
              </button>
            </div>
          </div>
          <p className="sos-hint">Instantly alerts your emergency contacts with your live location</p>
        </div>

        {/* Stats Row */}
        <div className="stats-row">
          <div className="stat-card" style={{ cursor: "pointer" }} onClick={() => navigate("contacts")}>
            <span className="stat-num">{contactCount}</span>
            <span className="stat-label">Contacts</span>
          </div>
          <div className="stat-card">
            <span className="stat-num" style={{ color: "#10b981" }}>98%</span>
            <span className="stat-label">Area Safety</span>
          </div>
          <div className="stat-card">
            <span className="stat-num" style={{ color: "#f59e0b" }}>12</span>
            <span className="stat-label">Alerts Logged</span>
          </div>
        </div>

        {/* Features Grid */}
        <div className="section-header">
          <span className="section-line" />
          <span className="section-title">SYSTEM MODULES</span>
          <span className="section-line" />
        </div>

        <div className="features-grid">
          {features.map((f) => (
            <button
              key={f.id}
              className="feature-card"
              style={{ "--accent": f.color }}
              onClick={() => handleFeatureClick(f)}
            >
              <div className="feature-icon" style={{ color: f.color }}>{f.icon}</div>
              <span className="feature-label">{f.label}</span>
              <span className="feature-status">
                {f.id === "contacts" ? `${contactCount} SAVED` : f.status}
              </span>
              {f.page && <span className="feature-arrow">›</span>}
              <div className="feature-corner" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}