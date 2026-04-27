import { useState } from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Contacts from "./pages/Contacts";

const defaultContacts = [
  { id: 1, name: "Sara Khan", phone: "+92 300 1234567", relation: "Sister" },
  { id: 2, name: "Ahmed Ali", phone: "+92 321 9876543", relation: "Father" },
  { id: 3, name: "Zara Malik", phone: "+92 333 5556677", relation: "Friend" },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState("login");
  const [user, setUser] = useState(null);
  const [contacts, setContacts] = useState(defaultContacts);

  const handleLogin = (username) => {
    setUser(username);
    setCurrentPage("home");
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage("login");
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
        />
      )}
      {currentPage === "contacts" && (
        <Contacts
          contacts={contacts}
          setContacts={setContacts}
          navigate={navigate}
        />
      )}
    </>
  );
}