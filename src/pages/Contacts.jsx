import { useState } from "react";

const relations = ["Family", "Friend", "Sister", "Brother", "Father", "Mother", "Partner", "Colleague", "Other"];

const relationColors = {
  Family:    { bg: "rgba(0,212,255,0.1)",  border: "rgba(0,212,255,0.3)",  text: "#00d4ff" },
  Friend:    { bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.3)", text: "#10b981" },
  Sister:    { bg: "rgba(139,92,246,0.1)", border: "rgba(139,92,246,0.3)", text: "#8b5cf6" },
  Brother:   { bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.3)", text: "#f59e0b" },
  Father:    { bg: "rgba(0,212,255,0.1)",  border: "rgba(0,212,255,0.3)",  text: "#00d4ff" },
  Mother:    { bg: "rgba(244,63,94,0.1)",  border: "rgba(244,63,94,0.3)",  text: "#f43f5e" },
  Partner:   { bg: "rgba(244,63,94,0.1)",  border: "rgba(244,63,94,0.3)",  text: "#f43f5e" },
  Colleague: { bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.3)", text: "#f59e0b" },
  Other:     { bg: "rgba(90,122,153,0.1)", border: "rgba(90,122,153,0.3)", text: "#5a7a99" },
};

const getColor = (rel) => relationColors[rel] || relationColors["Other"];

const getInitials = (name) =>
  name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);

export default function Contacts({ contacts, setContacts, navigate }) {
  const [showForm, setShowForm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [form, setForm] = useState({ name: "", phone: "", relation: "Friend" });
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.phone.trim()) e.phone = "Phone is required";
    else if (!/^[+\d\s\-()]{7,15}$/.test(form.phone.trim()))
      e.phone = "Enter a valid phone number";
    return e;
  };

  const handleAdd = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    const newContact = {
      id: Date.now(),
      name: form.name.trim(),
      phone: form.phone.trim(),
      relation: form.relation,
    };
    setContacts((prev) => [...prev, newContact]);
    setForm({ name: "", phone: "", relation: "Friend" });
    setErrors({});
    setShowForm(false);
    setSuccessMsg(`${newContact.name} added to emergency contacts`);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handleDelete = (id) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
    setDeleteId(null);
    setSuccessMsg("Contact removed successfully");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handleFormChange = (field, val) => {
    setForm((f) => ({ ...f, [field]: val }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: "" }));
  };

  return (
    <div className="page-root">
      <div className="scan-line" />

      {/* Delete Confirm Modal */}
      {deleteId !== null && (
        <div className="modal-overlay">
          <div className="confirm-modal">
            <div className="confirm-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff3535" strokeWidth="2">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                <path d="M10 11v6M14 11v6" />
                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
              </svg>
            </div>
            <p className="confirm-title">Remove Contact?</p>
            <p className="confirm-sub">
              {contacts.find((c) => c.id === deleteId)?.name} will be removed from your emergency contacts.
            </p>
            <div className="confirm-btns">
              <button className="confirm-cancel" onClick={() => setDeleteId(null)}>CANCEL</button>
              <button className="confirm-delete" onClick={() => handleDelete(deleteId)}>REMOVE</button>
            </div>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="home-nav">
        <button className="back-btn" onClick={() => navigate("home")}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <span>BACK</span>
        </button>
        <div className="nav-brand" style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
          <span className="nav-title" style={{ fontSize: "1rem" }}>EMERGENCY <b>CONTACTS</b></span>
        </div>
        <div style={{ width: 64 }} />
      </nav>

      <div className="contacts-content">

        {/* Count Header */}
        <div className="contacts-header">
          <div className="contacts-count-block">
            <span className="contacts-count-num">{contacts.length}</span>
            <div className="contacts-count-text">
              <span className="contacts-count-label">TRUSTED CONTACTS</span>
              <span className="contacts-count-sub">
                {contacts.length === 0
                  ? "No contacts saved yet"
                  : contacts.length === 1
                  ? "1 person will be alerted"
                  : `${contacts.length} people will be alerted in SOS`}
              </span>
            </div>
          </div>
          <button
            className="add-btn"
            onClick={() => { setShowForm((s) => !s); setErrors({}); }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            ADD
          </button>
        </div>

        {/* Success Toast */}
        {successMsg && (
          <div className="toast-success">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {successMsg}
          </div>
        )}

        {/* Add Contact Form */}
        {showForm && (
          <div className="add-form-card">
            <div className="add-form-title">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="8.5" cy="7" r="4" />
                <line x1="20" y1="8" x2="20" y2="14" />
                <line x1="23" y1="11" x2="17" y2="11" />
              </svg>
              NEW EMERGENCY CONTACT
            </div>

            <div className="form-row">
              <div className="form-field">
                <label className="field-label">FULL NAME</label>
                <input
                  type="text"
                  className={`cyber-input ${errors.name ? "input-error" : ""}`}
                  placeholder="e.g. Sara Khan"
                  value={form.name}
                  onChange={(e) => handleFormChange("name", e.target.value)}
                />
                {errors.name && <span className="field-error">{errors.name}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label className="field-label">PHONE NUMBER</label>
                <input
                  type="tel"
                  className={`cyber-input ${errors.phone ? "input-error" : ""}`}
                  placeholder="e.g. +92 300 1234567"
                  value={form.phone}
                  onChange={(e) => handleFormChange("phone", e.target.value)}
                />
                {errors.phone && <span className="field-error">{errors.phone}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label className="field-label">RELATION</label>
                <div className="relation-grid">
                  {relations.map((r) => (
                    <button
                      key={r}
                      type="button"
                      className={`relation-chip ${form.relation === r ? "relation-chip-active" : ""}`}
                      onClick={() => handleFormChange("relation", r)}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button className="form-cancel-btn" onClick={() => { setShowForm(false); setErrors({}); }}>
                CANCEL
              </button>
              <button className="form-save-btn" onClick={handleAdd}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                SAVE CONTACT
              </button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {contacts.length === 0 && !showForm && (
          <div className="empty-state">
            <div className="empty-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#1a2840" strokeWidth="1.5">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <p className="empty-title">No Contacts Added</p>
            <p className="empty-sub">Add trusted people who will be alerted during an SOS emergency</p>
            <button className="add-first-btn" onClick={() => setShowForm(true)}>
              + Add First Contact
            </button>
          </div>
        )}

        {/* Contacts List */}
        {contacts.length > 0 && (
          <div className="contacts-list">
            {contacts.map((c, i) => {
              const col = getColor(c.relation);
              return (
                <div
                  key={c.id}
                  className="contact-card"
                  style={{ animationDelay: `${i * 0.06}s` }}
                >
                  {/* Avatar */}
                  <div
                    className="contact-avatar"
                    style={{ background: col.bg, border: `1px solid ${col.border}`, color: col.text }}
                  >
                    {getInitials(c.name)}
                  </div>

                  {/* Info */}
                  <div className="contact-info">
                    <span className="contact-name">{c.name}</span>
                    <span className="contact-phone">{c.phone}</span>
                  </div>

                  {/* Relation badge */}
                  <span
                    className="contact-relation"
                    style={{ background: col.bg, border: `1px solid ${col.border}`, color: col.text }}
                  >
                    {c.relation}
                  </span>

                  {/* Alert + Delete buttons */}
                  <div className="contact-actions">
                    <button className="contact-alert-btn" title="Send alert">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.65 3.18 2 2 0 0 1 3.63 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.81a16 16 0 0 0 6.29 6.29l.88-.88a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </button>
                    <button
                      className="contact-delete-btn"
                      title="Remove contact"
                      onClick={() => setDeleteId(c.id)}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                        <path d="M10 11v6M14 11v6" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Info Note */}
        {contacts.length > 0 && (
          <div className="contacts-note">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#5a7a99" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            All contacts will receive your live location and alert message when SOS is triggered.
          </div>
        )}
      </div>
    </div>
  );
}