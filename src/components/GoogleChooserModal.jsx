import React from 'react';
import { useApp } from '../context/AppContext';

export const GoogleChooserModal = () => {
  const { isGoogleChooserOpen, setIsGoogleChooserOpen, getOrCreateAccount, loginUser } = useApp();

  if (!isGoogleChooserOpen) return null;

  const handleSelectAccount = (email, name) => {
    const account = getOrCreateAccount(email);
    setIsGoogleChooserOpen(false);
    alert(`Successfully logged in via Google: ${name}`);
    loginUser(account);
  };

  return (
    <div class="modal-overlay active" style={{ zIndex: 9999 }}>
      <div class="modal-dialog" style={{ maxWidth: "380px", padding: "24px", textAlign: "center" }}>
        <div style={{ marginBottom: "16px" }}>
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" viewBox="0 0 48 48">
            <g>
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
              <path fill="#4285F4" d="M46.5 24c0-1.55-.15-3.24-.47-4.77H24v9.03h12.75c-.53 2.87-2.14 5.31-4.57 6.95l7.1 5.5C43.43 36.19 46.5 30.73 46.5 24z"></path>
              <path fill="#FBBC05" d="M10.54 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.98-6.19z"></path>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.1-5.5c-2.15 1.45-4.92 2.3-8.79 2.3-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
            </g>
          </svg>
        </div>
        <h3 style={{ fontSize: "18px", marginBottom: "6px" }}>Sign in with Google</h3>
        <p style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "20px" }}>Choose an account to continue to AyurMedKart</p>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
          <div 
            class="google-acc-item" 
            onClick={() => handleSelectAccount("rahul.kumar@gmail.com", "Rahul Kumar")}
            style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 14px", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)", cursor: "pointer", textAlign: "left", transition: "var(--transition)" }}
          >
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#1a73e8", color: "var(--white)", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>R</div>
            <div>
              <strong style={{ fontSize: "13.5px", display: "block", color: "var(--text-dark)" }}>Rahul Kumar</strong>
              <span style={{ fontSize: "11.5px", color: "var(--text-muted)" }}>rahul.kumar@gmail.com</span>
            </div>
          </div>

          <div 
            class="google-acc-item" 
            onClick={() => handleSelectAccount("guest.user@gmail.com", "New User Account")}
            style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 14px", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)", cursor: "pointer", textAlign: "left", transition: "var(--transition)" }}
          >
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#34a853", color: "var(--white)", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>N</div>
            <div>
              <strong style={{ fontSize: "13.5px", display: "block", color: "var(--text-dark)" }}>New User Account</strong>
              <span style={{ fontSize: "11.5px", color: "var(--text-muted)" }}>guest.user@gmail.com</span>
            </div>
          </div>
        </div>

        <button type="button" class="btn btn-light" onClick={() => setIsGoogleChooserOpen(false)} style={{ width: "100%" }}>Cancel</button>
      </div>
    </div>
  );
};
