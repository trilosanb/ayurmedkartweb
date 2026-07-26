import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const UserPortalPage = () => {
  const { auth, orders, uploadedPrescriptions, consultations, setIsLoginModalOpen, startVideoCall } = useApp();
  const [activeTab, setActiveTab] = useState("orders");

  useEffect(() => {
    if (!auth.isLoggedIn) {
      setIsLoginModalOpen(true);
    }
  }, [auth.isLoggedIn, setIsLoginModalOpen]);

  const isRahul = auth.identifier === "rahul.kumar@gmail.com" || auth.identifier === "9876543210";
  const avatarInitials = isRahul ? "RK" : (auth.name ? auth.name.substring(0, 2).toUpperCase() : "GU");
  const displayName = auth.name || "Guest User";

  if (!auth.isLoggedIn) {
    return (
      <section id="dashboard" class="view-section active" style={{ display: "block", paddingTop: "100px" }}>
        <div class="container section-padding" style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto" }}>
          <div style={{ background: "var(--white)", padding: "40px 24px", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-md)", border: "1px solid var(--border-color)" }}>
            <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "#fff2e6", color: "var(--secondary)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px auto", fontSize: "28px" }}>
              <i class="fas fa-lock"></i>
            </div>
            <h2 style={{ fontSize: "22px", color: "var(--primary)", marginBottom: "10px" }}>Sign In Required</h2>
            <p style={{ color: "var(--text-muted)", fontSize: "14px", marginBottom: "24px", lineHeight: 1.6 }}>
              The User Portal is private and restricted to authenticated members. Please sign in to view your pharmacy orders, track shipments, and manage your health records.
            </p>
            <button class="btn btn-primary" onClick={() => setIsLoginModalOpen(true)} style={{ padding: "12px 28px", fontSize: "14px", fontWeight: 600 }}>
              <i class="fas fa-sign-in-alt" style={{ marginRight: "8px" }}></i> Sign In to User Portal
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="dashboard" class="view-section active" style={{ display: "block", paddingTop: "100px" }}>
      <div class="container section-padding">
        <div class="dashboard-layout">
          {/* Navigation Sidebar */}
          <aside class="dashboard-sidebar">
            <div class="user-profile-summary">
              <div class="user-avatar-placeholder">{avatarInitials}</div>
              <h4>{displayName}</h4>
              <p>User ID: AMK-229182</p>
            </div>

            <nav class="dash-nav">
              <button class={`dash-nav-btn ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>
                <i class="fas fa-box-open"></i> Pharmacy Orders
              </button>
              <button class={`dash-nav-btn ${activeTab === 'prescriptions' ? 'active' : ''}`} onClick={() => setActiveTab('prescriptions')}>
                <i class="fas fa-file-prescription"></i> Prescription Vault
              </button>
              <button class={`dash-nav-btn ${activeTab === 'ehr' ? 'active' : ''}`} onClick={() => setActiveTab('ehr')}>
                <i class="fas fa-folder-open"></i> Health Vault (EHR)
              </button>
              <button class={`dash-nav-btn ${activeTab === 'telehealth' ? 'active' : ''}`} onClick={() => setActiveTab('telehealth')}>
                <i class="fas fa-video"></i> Telehealth Consults
              </button>
            </nav>
          </aside>

          {/* Main Dashboard Content */}
          <main class="dashboard-content-box">
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div class="dashboard-tab-panel active">
                <div class="dashboard-header">
                  <h3 style={{ margin: 0, color: "var(--primary)" }}>Medicine Orders</h3>
                  <Link to="/" class="btn btn-outline btn-sm"><i class="fas fa-store"></i> Shop More</Link>
                </div>

                {orders.length === 0 ? (
                  <p style={{ color: "var(--text-muted)", fontSize: "13.5px" }}>No orders placed yet. Explore our medicine store to place your first order.</p>
                ) : (
                  orders.map(order => (
                    <div key={order.id} style={{ border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", padding: "16px", marginBottom: "16px", backgroundColor: "var(--white)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", borderBottom: "1px solid var(--border-color)", paddingBottom: "8px" }}>
                        <div>
                          <strong style={{ fontSize: "14px", color: "var(--primary)" }}>Order ID: {order.id}</strong>
                          <span style={{ fontSize: "12px", color: "var(--text-muted)", marginLeft: "10px" }}>Placed on: {order.date}</span>
                        </div>
                        <span class="status-indicator approved">{order.status}</span>
                      </div>

                      {/* Tracker Stepper */}
                      <div class="tracker-stepper" style={{ display: "flex", justifyContent: "space-between", margin: "16px 0", padding: "0 10px" }}>
                        {["Placed", "Packed", "Shipped", "Delivered"].map((step, idx) => (
                          <div key={idx} style={{ textAlign: "center", position: "relative", flex: 1 }}>
                            <div style={{
                              width: "24px", height: "24px", borderRadius: "50%", margin: "0 auto 6px auto",
                              backgroundColor: idx + 1 <= (order.stepIndex || 3) ? "var(--primary)" : "var(--border-color)",
                              color: "var(--white)", fontSize: "11px", lineHeight: "24px", fontWeight: 700
                            }}>{idx + 1}</div>
                            <span style={{ fontSize: "11px", fontWeight: idx + 1 <= (order.stepIndex || 3) ? 600 : 400, color: idx + 1 <= (order.stepIndex || 3) ? "var(--primary)" : "var(--text-muted)" }}>{step}</span>
                          </div>
                        ))}
                      </div>

                      <div style={{ fontSize: "13px", margin: "12px 0" }}>
                        {order.items.map((item, i) => (
                          <div key={i} style={{ display: "flex", justifyContent: "space-between", color: "var(--text-dark)", padding: "2px 0" }}>
                            <span>{item.name} x {item.qty}</span>
                            <span>₹{item.price * item.qty}</span>
                          </div>
                        ))}
                      </div>

                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border-color)", paddingTop: "10px", marginTop: "10px", fontWeight: 700, fontSize: "13.5px", color: "var(--primary)" }}>
                        <span>Total Paid: ₹{order.total}</span>
                        <button class="btn btn-light btn-sm" onClick={() => alert(`Invoice downloaded for Order ${order.id}`)}><i class="fas fa-file-invoice"></i> Invoice</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Prescriptions Tab */}
            {activeTab === 'prescriptions' && (
              <div class="dashboard-tab-panel active">
                <div class="dashboard-header">
                  <h3 style={{ margin: 0, color: "var(--primary)" }}>Uploaded Prescriptions</h3>
                </div>
                {uploadedPrescriptions.map(up => (
                  <div key={up.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)", marginBottom: "10px" }}>
                    <div>
                      <h4 style={{ margin: 0, fontSize: "13.5px" }}>{up.fileName}</h4>
                      <p style={{ margin: 0, fontSize: "11.5px", color: "var(--text-muted)" }}>Uploaded on: {up.uploadDate}</p>
                    </div>
                    <span class="status-indicator approved">{up.status}</span>
                  </div>
                ))}
              </div>
            )}

            {/* EHR Tab */}
            {activeTab === 'ehr' && (
              <div class="dashboard-tab-panel active">
                <div class="dashboard-header">
                  <h3 style={{ margin: 0, color: "var(--primary)" }}>Health Vault (EHR)</h3>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)" }}>
                    <div>
                      <h4 style={{ margin: 0, fontSize: "13.5px" }}>BloodReport_June2026.pdf</h4>
                      <p style={{ margin: 0, fontSize: "11.5px", color: "var(--text-muted)" }}>Uploaded on 2026-06-10 | Size: 1.2 MB</p>
                    </div>
                    <button class="btn btn-light btn-sm" onClick={() => alert("Downloading BloodReport_June2026.pdf")}><i class="fas fa-download"></i> Download</button>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)" }}>
                    <div>
                      <h4 style={{ margin: 0, fontSize: "13.5px" }}>ThyroidPanel_May2026.pdf</h4>
                      <p style={{ margin: 0, fontSize: "11.5px", color: "var(--text-muted)" }}>Uploaded on 2026-05-02 | Size: 850 KB</p>
                    </div>
                    <button class="btn btn-light btn-sm" onClick={() => alert("Downloading ThyroidPanel_May2026.pdf")}><i class="fas fa-download"></i> Download</button>
                  </div>
                </div>
              </div>
            )}

            {/* Telehealth Consults Tab */}
            {activeTab === 'telehealth' && (
              <div class="dashboard-tab-panel active">
                <div class="dashboard-header">
                  <h3 style={{ margin: 0, color: "var(--primary)" }}>Your Scheduled Consultations</h3>
                  <Link to="/consultation" class="btn btn-primary btn-sm"><i class="fas fa-calendar-plus"></i> Book New Session</Link>
                </div>

                {consultations.length === 0 ? (
                  <p style={{ color: "var(--text-muted)", fontSize: "13.5px" }}>No consultations scheduled. Book a video session with certified doctors.</p>
                ) : (
                  consultations.map(con => (
                    <div key={con.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", marginBottom: "12px", backgroundColor: "var(--bg-light)" }}>
                      <div>
                        <h4 style={{ margin: 0, fontSize: "14px", color: "var(--primary)" }}>{con.doctorName}</h4>
                        <p style={{ margin: "4px 0 0 0", fontSize: "12px", color: "var(--text-muted)" }}>
                          <i class="far fa-calendar-alt" style={{ marginRight: "4px" }}></i> {con.date} at {con.time}
                        </p>
                        <p style={{ margin: "2px 0 0 0", fontSize: "11.5px", color: "var(--text-dark)" }}>Notes: {con.notes}</p>
                      </div>
                      <button class="btn btn-primary" onClick={() => startVideoCall(con.doctorName)}>
                        <i class="fas fa-video"></i> Join Call
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </section>
  );
};
