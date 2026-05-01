import { useState } from "react";

export default function AlertHistory({ history, navigate }) {
  return (
    <div className="home-root" style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <div className="scan-line" />
      
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
          <button className="logout-btn" onClick={() => navigate("home")} style={{ width: "auto", padding: "0 12px", fontSize: "12px", letterSpacing: "1px" }}>
            BACK TO HOME
          </button>
        </div>
      </nav>

      <div className="home-content" style={{ flex: 1, overflowY: "auto", paddingTop: "20px" }}>
        <div className="section-header">
          <span className="section-line" />
          <span className="section-title">ALERT HISTORY</span>
          <span className="section-line" />
        </div>

        <div className="history-list" style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
          {history && history.length > 0 ? (
            history.map((alert) => (
              <div key={alert.id} className="history-card" style={{
                background: "rgba(245, 158, 11, 0.1)",
                border: "1px solid rgba(245, 158, 11, 0.3)",
                borderRadius: "8px",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "#f59e0b", fontWeight: "bold", fontSize: "16px", letterSpacing: "1px" }}>
                    ⚠ SOS ALERT
                  </span>
                  <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px", fontFamily: "monospace" }}>
                    {new Date(alert.time).toLocaleString()}
                  </span>
                </div>
                <div style={{ color: "#fff", fontSize: "14px" }}>
                  Triggered by: <strong style={{ color: "#00d4ff" }}>{alert.sender}</strong>
                </div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: "center", color: "rgba(255,255,255,0.5)", marginTop: "40px", fontFamily: "monospace" }}>
              NO RECENT ALERTS FOUND
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
