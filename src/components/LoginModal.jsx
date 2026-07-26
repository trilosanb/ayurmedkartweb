import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const LoginModal = () => {
  const { isLoginModalOpen, setIsLoginModalOpen, setIsGoogleChooserOpen, getOrCreateAccount, loginUser } = useApp();
  const [identifier, setIdentifier] = useState("rahul.kumar@gmail.com");
  const [password, setPassword] = useState("password123");

  if (!isLoginModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!identifier) return;
    const account = getOrCreateAccount(identifier);
    alert(`Signed in successfully as: ${account.name}`);
    loginUser(account);
  };

  return (
    <div class="modal-overlay active" style={{ zIndex: 9999 }}>
      <div class="modal-dialog">
        <div class="modal-header">
          <h3>AyurMedKart Login Portal</h3>
          <button class="close-modal-btn" onClick={() => setIsLoginModalOpen(false)}>&times;</button>
        </div>
        <div class="modal-body" style={{ paddingTop: "15px" }}>
          <div class="login-panel">
            <p style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "20px", lineHeight: "1.5", textAlign: "center" }}>
              Sign in to purchase authentic medicines, view your order history, and track prescriptions.
            </p>
            
            <form onSubmit={handleSubmit} class="booking-form-box" style={{ boxShadow: "none", padding: 0, gap: "14px" }}>
              <div class="form-group">
                <label htmlFor="patient-auth-identifier">Email or 10-digit Mobile Number</label>
                <input 
                  type="text" 
                  id="patient-auth-identifier" 
                  required 
                  placeholder="e.g. rahul@gmail.com or 9876543210" 
                  value={identifier} 
                  onChange={(e) => setIdentifier(e.target.value)}
                  style={{ padding: "11px 14px", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)", fontSize: "13.5px" }}
                />
              </div>
              
              <div class="form-group">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <label htmlFor="patient-auth-password" style={{ margin: 0 }}>Password</label>
                  <a href="#" style={{ fontSize: "11.5px", color: "var(--primary)", textDecoration: "none", fontWeight: 500 }} onClick={(e) => { e.preventDefault(); alert("Password reset link sent to your registered email/phone."); }}>Forgot?</a>
                </div>
                <input 
                  type="password" 
                  id="patient-auth-password" 
                  required 
                  placeholder="Enter your password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ padding: "11px 14px", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)", fontSize: "13.5px" }}
                />
              </div>

              <button type="submit" class="btn btn-primary" style={{ width: "100%", padding: "12px", marginTop: "6px", fontWeight: 600 }}>
                <i class="fas fa-sign-in-alt" style={{ marginRight: "6px" }}></i> Sign In
              </button>
            </form>

            <div class="auth-divider" style={{ display: "flex", alignItems: "center", textAlign: "center", margin: "20px 0", color: "var(--text-muted)", fontSize: "12px" }}>
              <div style={{ flexGrow: 1, borderBottom: "1px solid var(--border-color)" }}></div>
              <span style={{ padding: "0 10px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.5px" }}>or</span>
              <div style={{ flexGrow: 1, borderBottom: "1px solid var(--border-color)" }}></div>
            </div>

            <button 
              type="button" 
              class="google-auth-btn" 
              onClick={() => {
                setIsLoginModalOpen(false);
                setIsGoogleChooserOpen(true);
              }}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", width: "100%", padding: "11px", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)", background: "var(--white)", color: "var(--text-dark)", fontWeight: 600, cursor: "pointer", fontSize: "13.5px", transition: "var(--transition)" }}
            >
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 48 48">
                <g>
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                  <path fill="#4285F4" d="M46.5 24c0-1.55-.15-3.24-.47-4.77H24v9.03h12.75c-.53 2.87-2.14 5.31-4.57 6.95l7.1 5.5C43.43 36.19 46.5 30.73 46.5 24z"></path>
                  <path fill="#FBBC05" d="M10.54 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.98-6.19z"></path>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.1-5.5c-2.15 1.45-4.92 2.3-8.79 2.3-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                </g>
              </svg>
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
