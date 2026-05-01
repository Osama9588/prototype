import { useState } from "react";

const fakeReviews = [
  {
    id: 1,
    place: "Seaview Beach, Karachi",
    user: "Aisha T.",
    rating: 4,
    sentiment: "positive",
    text: "Well lit and crowded most times of the evening, felt quite safe walking with family. Regular police patrols.",
    time: "2 days ago"
  },
  {
    id: 2,
    place: "Liberty Market, Lahore",
    user: "Fatima R.",
    rating: 5,
    sentiment: "positive",
    text: "Very safe area, even late at night. Lots of security guards and CCTV cameras everywhere.",
    time: "1 week ago"
  },
  {
    id: 3,
    place: "Saddar, Karachi",
    user: "Ali M.",
    rating: 2,
    sentiment: "negative",
    text: "Too many dark alleys and very few streetlights working. Had my phone snatched here last month. Avoid walking alone.",
    time: "3 weeks ago"
  },
  {
    id: 4,
    place: "F-9 Park, Islamabad",
    user: "Zainab B.",
    rating: 4,
    sentiment: "positive",
    text: "Beautiful park, safe during the day and early evening. However, some deep spots can be isolated so stay on main paths.",
    time: "1 month ago"
  },
  {
    id: 5,
    place: "Tariq Road, Karachi",
    user: "Usman K.",
    rating: 3,
    sentiment: "mixed",
    text: "Busy market area so muggings are less common during peak hours, but beware of pickpockets.",
    time: "1 month ago"
  },
  {
    id: 6,
    place: "Mall Road, Lahore",
    user: "Hassan S.",
    rating: 4,
    sentiment: "positive",
    text: "Main road is very safe and heavily monitored, but some side streets get too quiet after 10 PM.",
    time: "2 months ago"
  }
];

export default function SafetyReviews({ navigate }) {
  const [filter, setFilter] = useState("all");

  const filteredReviews = fakeReviews.filter(r => filter === "all" || r.sentiment === filter);

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
          <span className="section-title">SAFETY REVIEWS</span>
          <span className="section-line" />
        </div>

        <div className="filter-chips" style={{ 
          display: "flex", gap: "10px", marginTop: "20px", marginBottom: "20px", overflowX: "auto", 
          position: "sticky", top: "-20px", background: "var(--bg)", zIndex: 10, margin: "0 -16px", padding: "20px 16px 10px" 
        }}>
          <button 
            onClick={() => setFilter("all")} 
            style={{ 
              display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1,
              flexShrink: 0, padding: "8px 16px", borderRadius: "20px", cursor: "pointer", fontWeight: "bold", fontSize: "12px", letterSpacing: "1px",
              background: filter === "all" ? "#00d4ff" : "transparent",
              color: filter === "all" ? "#000" : "#00d4ff",
              border: "1px solid #00d4ff",
            }}
          >
            ALL
          </button>
          <button 
            onClick={() => setFilter("positive")} 
            style={{ 
              flexShrink: 0, padding: "8px 16px", borderRadius: "20px", cursor: "pointer", fontWeight: "bold", fontSize: "12px", letterSpacing: "1px",
              background: filter === "positive" ? "#10b981" : "transparent",
              color: filter === "positive" ? "#000" : "#10b981",
              border: "1px solid #10b981",
            }}
          >
            POSITIVE
          </button>
          <button 
            onClick={() => setFilter("mixed")} 
            style={{ 
              flexShrink: 0, padding: "8px 16px", borderRadius: "20px", cursor: "pointer", fontWeight: "bold", fontSize: "12px", letterSpacing: "1px",
              background: filter === "mixed" ? "#f59e0b" : "transparent",
              color: filter === "mixed" ? "#000" : "#f59e0b",
              border: "1px solid #f59e0b",
            }}
          >
            MIXED
          </button>
          <button 
            onClick={() => setFilter("negative")} 
            style={{ 
              flexShrink: 0, padding: "8px 16px", borderRadius: "20px", cursor: "pointer", fontWeight: "bold", fontSize: "12px", letterSpacing: "1px",
              background: filter === "negative" ? "#f43f5e" : "transparent",
              color: filter === "negative" ? "#000" : "#f43f5e",
              border: "1px solid #f43f5e",
            }}
          >
            NEGATIVE
          </button>
        </div>

        <div className="reviews-list" style={{ display: "flex", flexDirection: "column", gap: "12px", paddingBottom: "40px" }}>
          {filteredReviews.length > 0 ? (
            filteredReviews.map((review) => (
              <div key={review.id} style={{
                background: "rgba(0, 212, 255, 0.05)",
                border: "1px solid rgba(0, 212, 255, 0.2)",
                borderRadius: "8px",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <h3 style={{ margin: "0 0 6px 0", color: "#f8fafc", fontSize: "16px", letterSpacing: "0.5px" }}>{review.place}</h3>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "rgba(255,255,255,0.6)", fontSize: "12px", fontFamily: "monospace" }}>
                      <span style={{ color: "#00d4ff" }}>{review.user}</span>
                      <span>•</span>
                      <span>{review.time}</span>
                    </div>
                  </div>
                  <div style={{ 
                    background: review.sentiment === "positive" ? "rgba(16, 185, 129, 0.2)" : review.sentiment === "negative" ? "rgba(244, 63, 94, 0.2)" : "rgba(245, 158, 11, 0.2)",
                    color: review.sentiment === "positive" ? "#10b981" : review.sentiment === "negative" ? "#f43f5e" : "#f59e0b",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    fontSize: "10px",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    letterSpacing: "1px"
                  }}>
                    {review.sentiment}
                  </div>
                </div>
                <p style={{ color: "rgba(255,255,255,0.8)", margin: "0", lineHeight: "1.5", fontSize: "14px" }}>
                  "{review.text}"
                </p>
                <div style={{ display: "flex", gap: "4px", color: review.sentiment === "negative" ? "#f43f5e" : review.sentiment === "positive" ? "#10b981" : "#f59e0b" }}>
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < review.rating ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: "center", color: "rgba(255,255,255,0.5)", marginTop: "40px", fontFamily: "monospace" }}>
              NO REVIEWS FOUND
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
