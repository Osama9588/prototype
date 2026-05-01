import { useState, useEffect } from "react";

export default function LiveLocation({ navigate }) {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
        setLoading(false);
        setError(null);
      },
      (err) => {
        setError(err.message || "Unable to retrieve your location");
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  const handleShare = () => {
    alert("Live location sharing link copied to clipboard!");
  };

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

      <div className="home-content" style={{ flex: 1, display: "flex", flexDirection: "column", paddingTop: "20px" }}>
        <div className="section-header" style={{ marginBottom: "20px" }}>
          <span className="section-line" />
          <span className="section-title">LIVE LOCATION</span>
          <span className="section-line" />
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "20px", paddingBottom: "20px" }}>
          
          {/* Status Box */}
          <div style={{ 
            background: "var(--surface)", 
            border: "1px solid var(--border)", 
            borderRadius: "8px", 
            padding: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <div>
              <div style={{ fontSize: "12px", color: "var(--text-dim)", fontFamily: "monospace", marginBottom: "4px" }}>
                TRACKING STATUS
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ 
                  width: "10px", height: "10px", borderRadius: "50%", 
                  background: error ? "#f43f5e" : loading ? "#f59e0b" : "#10b981",
                  boxShadow: `0 0 10px ${error ? "#f43f5e" : loading ? "#f59e0b" : "#10b981"}`
                }} />
                <strong style={{ color: error ? "#f43f5e" : loading ? "#f59e0b" : "#10b981", fontSize: "16px" }}>
                  {error ? "UNAVAILABLE" : loading ? "ACQUIRING SIGNAL..." : "ACTIVE & SHARING"}
                </strong>
              </div>
            </div>

            {location && (
              <button 
                onClick={handleShare}
                style={{
                  background: "rgba(0, 212, 255, 0.1)",
                  border: "1px solid #00d4ff",
                  color: "#00d4ff",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  letterSpacing: "1px"
                }}
              >
                SHARE LINK
              </button>
            )}
          </div>

          {/* Map Container */}
          <div style={{ 
            flex: 1, 
            background: "var(--surface2)", 
            border: "1px solid var(--border-bright)", 
            borderRadius: "8px", 
            overflow: "hidden",
            position: "relative",
            minHeight: "300px"
          }}>
            {loading && !error && (
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "10px" }}>
                <div className="spinner" style={{ borderColor: "rgba(0,212,255,0.2)", borderTopColor: "#00d4ff" }} />
                <span style={{ color: "var(--cyan)", fontFamily: "monospace", fontSize: "12px" }}>Connecting to satellites...</span>
              </div>
            )}
            
            {error && (
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "10px", padding: "20px", textAlign: "center" }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
                <span style={{ color: "#f43f5e", fontFamily: "monospace", fontSize: "12px" }}>{error}</span>
              </div>
            )}

            {location && !error && (
              <iframe 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                scrolling="no" 
                marginHeight="0" 
                marginWidth="0" 
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${location.lon - 0.02}%2C${location.lat - 0.02}%2C${location.lon + 0.02}%2C${location.lat + 0.02}&layer=mapnik&marker=${location.lat}%2C${location.lon}`} 
                style={{ border: "none", filter: "invert(90%) hue-rotate(180deg) contrast(100%)" }}
              />
            )}
            
            {/* Overlay Grid to make it look "cyber" */}
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "linear-gradient(rgba(0,212,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.1) 1px, transparent 1px)", backgroundSize: "20px 20px", opacity: 0.3 }} />
          </div>

          {/* Coordinates Info */}
          {location && (
            <div style={{ 
              display: "flex", 
              justifyContent: "space-between",
              background: "rgba(0, 212, 255, 0.05)",
              padding: "12px 16px",
              borderRadius: "4px",
              borderLeft: "2px solid #00d4ff"
            }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <span style={{ fontSize: "10px", color: "var(--text-dim)", fontFamily: "monospace" }}>LATITUDE</span>
                <span style={{ color: "#fff", fontFamily: "monospace" }}>{location.lat.toFixed(6)}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <span style={{ fontSize: "10px", color: "var(--text-dim)", fontFamily: "monospace" }}>LONGITUDE</span>
                <span style={{ color: "#fff", fontFamily: "monospace" }}>{location.lon.toFixed(6)}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <span style={{ fontSize: "10px", color: "var(--text-dim)", fontFamily: "monospace" }}>ACCURACY</span>
                <span style={{ color: "#fff", fontFamily: "monospace" }}>± {Math.round(location.accuracy)}m</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
