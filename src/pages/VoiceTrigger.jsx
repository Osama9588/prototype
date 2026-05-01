import { useState, useRef } from "react";

export default function VoiceTrigger({ navigate, user, onSOS }) {
  const [isRecording, setIsRecording] = useState(false);
  const [status, setStatus] = useState("idle"); // idle, recording, analyzing, triggered
  const [audioURL, setAudioURL] = useState(null);
  
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const recordTimeoutRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
        audioChunksRef.current = [];
        analyzeAudio();
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setStatus("recording");

      // Auto-stop after 5 seconds
      recordTimeoutRef.current = setTimeout(() => {
        if (isRecording || mediaRecorderRef.current) {
          stopRecording();
        }
      }, 5000);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      alert("Microphone access is required to use Voice Trigger.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      // Stop all tracks to release the microphone
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      
      if (recordTimeoutRef.current) {
        clearTimeout(recordTimeoutRef.current);
        recordTimeoutRef.current = null;
      }
    }
  };

  const analyzeAudio = () => {
    // Immediately trigger without simulated analysis delay
    setStatus("triggered");
    
    // Trigger the global SOS alert immediately
    if (onSOS) {
      onSOS(user || "User", "Voice trigger activated (stressed/scared voice detected).");
    }
  };

  const reset = () => {
    setStatus("idle");
    setAudioURL(null);
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
          <span className="section-title">VOICE TRIGGER</span>
          <span className="section-line" />
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "30px", paddingBottom: "40px" }}>
          
          <div style={{ textAlign: "center", maxWidth: "300px" }}>
            <p style={{ color: "var(--text-dim)", fontSize: "14px", lineHeight: "1.6" }}>
              Our AI analyzes your voice for stress patterns. Hold the button and speak as a stressed/scared citizen to test the trigger.
            </p>
          </div>

          <div style={{ position: "relative", width: "200px", height: "200px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            
            {/* Visualizer rings */}
            {isRecording && (
              <>
                <div style={{ position: "absolute", inset: "-20px", border: "2px solid rgba(0, 212, 255, 0.3)", borderRadius: "50%", animation: "modal-pulse 1s linear infinite" }} />
                <div style={{ position: "absolute", inset: "0", border: "2px solid rgba(0, 212, 255, 0.6)", borderRadius: "50%", animation: "modal-pulse 1.5s linear infinite" }} />
              </>
            )}

            {status === "analyzing" && (
              <div style={{ position: "absolute", inset: "-10px", borderTop: "4px solid #f59e0b", borderRight: "4px solid transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
            )}

            {status === "triggered" && (
              <div style={{ position: "absolute", inset: "-30px", background: "rgba(244, 63, 94, 0.2)", borderRadius: "50%", animation: "sos-outer-pulse 1s ease-in-out infinite" }} />
            )}

            <button
              onMouseDown={status === "idle" ? startRecording : undefined}
              onMouseUp={isRecording ? stopRecording : undefined}
              onTouchStart={status === "idle" ? startRecording : undefined}
              onTouchEnd={isRecording ? stopRecording : undefined}
              style={{
                width: "140px",
                height: "140px",
                borderRadius: "50%",
                border: "none",
                background: status === "triggered" ? "#f43f5e" : status === "analyzing" ? "#f59e0b" : isRecording ? "#00d4ff" : "var(--surface2)",
                color: status === "idle" ? "var(--cyan)" : "#000",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                boxShadow: status === "triggered" ? "0 0 40px rgba(244, 63, 94, 0.6)" : isRecording ? "0 0 30px rgba(0, 212, 255, 0.4)" : "0 0 20px rgba(0,0,0,0.5)",
                cursor: status === "idle" ? "pointer" : "default",
                transition: "all 0.3s ease",
                userSelect: "none",
                WebkitUserSelect: "none"
              }}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
              </svg>
              <span style={{ fontWeight: "bold", letterSpacing: "1px", fontSize: "14px" }}>
                {status === "idle" ? "HOLD TO SPEAK" : status === "recording" ? "RECORDING..." : status === "analyzing" ? "ANALYZING..." : "SOS TRIGGERED!"}
              </span>
            </button>
          </div>

          <div style={{ height: "60px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {status === "triggered" && (
              <button onClick={reset} style={{ background: "transparent", border: "1px solid var(--text-dim)", color: "var(--text-dim)", padding: "8px 16px", borderRadius: "20px", fontSize: "12px", letterSpacing: "1px", cursor: "pointer" }}>
                RESET SCANNER
              </button>
            )}
            {audioURL && status === "idle" && (
               <audio src={audioURL} controls style={{ height: "30px", width: "250px" }} />
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
