import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Contacts from "./pages/Contacts";

const defaultContacts = [
  { id: 1, name: "Sara Khan", phone: "+92 300 1234567", relation: "Sister" },
  { id: 2, name: "Ahmed Ali", phone: "+92 321 9876543", relation: "Father" },
  { id: 3, name: "Zara Malik", phone: "+92 333 5556677", relation: "Friend" },
];

let audioCtx = null;
let osc = null;
let gainNode = null;
let alarmInterval = null;

const startAlarm = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (osc) return; // already playing

  osc = audioCtx.createOscillator();
  gainNode = audioCtx.createGain();
  osc.type = "square";
  gainNode.gain.value = 0.1;

  osc.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  osc.start();

  let high = true;
  alarmInterval = setInterval(() => {
    if (osc) {
      if (high) {
        osc.frequency.setValueAtTime(800, audioCtx.currentTime);
      } else {
        osc.frequency.setValueAtTime(600, audioCtx.currentTime);
      }
    }
    high = !high;
  }, 400);
};

const stopAlarm = () => {
  if (osc) {
    try {
      osc.stop();
      osc.disconnect();
    } catch (e) {
      console.error(e);
    }
    osc = null;
  }
  if (gainNode) {
    gainNode.disconnect();
    gainNode = null;
  }
  if (alarmInterval) {
    clearInterval(alarmInterval);
    alarmInterval = null;
  }
};

export default function App() {
  const [currentPage, setCurrentPage] = useState("login");
  const [user, setUser] = useState(null);
  const [contacts, setContacts] = useState(defaultContacts);
  const [incomingAlert, setIncomingAlert] = useState(null);

  useEffect(() => {
    // Only listen for alerts if the user is logged in
    if (currentPage === "login") return;

    const channel = new BroadcastChannel("guardian-alert-channel");
    channel.onmessage = (event) => {
      if (event.data.type === "EMERGENCY_ALERT") {
        setIncomingAlert({
          sender: event.data.sender,
          message: event.data.message,
        });
        startAlarm();
      }
    };

    return () => {
      channel.close();
      // Only stop alarm if we are unmounting or logging out
    };
  }, [currentPage]);

  const handleLogin = (username) => {
    setUser(username);
    setCurrentPage("home");
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage("login");
    setIncomingAlert(null);
    stopAlarm();
  };

  const handleSOSTriggered = (sender) => {
    const alertData = {
      sender: sender,
      message: "Emergency! SOS Activated!",
    };

    // Show alert locally
    setIncomingAlert(alertData);
    startAlarm();

    // Broadcast alert to other logged-in tabs
    const channel = new BroadcastChannel("guardian-alert-channel");
    channel.postMessage({
      type: "EMERGENCY_ALERT",
      ...alertData,
    });
    channel.close();
  };

  const navigate = (page) => setCurrentPage(page);

  return (
    <>
      {currentPage === "login" && <Login onLogin={handleLogin} />}
      {currentPage === "home" && (
        <Home
          user={user}
          onLogout={handleLogout}
          navigate={navigate}
          contactCount={contacts.length}
          onSOS={handleSOSTriggered}
        />
      )}
      {currentPage === "contacts" && (
        <Contacts
          contacts={contacts}
          setContacts={setContacts}
          navigate={navigate}
        />
      )}

      {/* Global Emergency Alert Overlay */}
      {incomingAlert && (
        <div className="global-alert-overlay">
          <div className="global-alert-modal">
            <h2 className="global-alert-title">⚠️ EMERGENCY ALERT ⚠️</h2>
            <p className="global-alert-message">
              <strong>{incomingAlert.sender}</strong> has triggered an SOS!
              <br />
              {incomingAlert.message}
            </p>
            <button
              className="global-alert-close"
              onClick={() => {
                setIncomingAlert(null);
                stopAlarm();
              }}
            >
              CLOSE ALERT
            </button>
          </div>
        </div>
      )}
    </>
  );
}