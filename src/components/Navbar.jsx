import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { MEDICINES, DOCTORS } from '../data/medicines';

export const Navbar = () => {
  const { cart, auth, setIsCartOpen, setIsLoginModalOpen, logoutUser, addToCart, startVideoCall } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [globalSearchQuery, setGlobalSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const isRahul = auth.identifier === "rahul.kumar@gmail.com" || auth.identifier === "9876543210";
  const initials = isRahul ? "RK" : (auth.role === "admin" ? "AD" : (auth.name ? auth.name.substring(0, 2).toUpperCase() : "GU"));
  const displayLabel = isRahul ? "Rahul K." : (auth.role === "admin" ? "Admin" : (auth.name ? auth.name.split("@")[0] : "Guest"));

  // Global All-Functionality Search Calculations
  const q = globalSearchQuery.trim().toLowerCase();

  const matchedMedicines = q ? MEDICINES.filter(m =>
    m.name.toLowerCase().includes(q) ||
    m.ingredients.toLowerCase().includes(q) ||
    m.category.toLowerCase().includes(q) ||
    m.manufacturer.toLowerCase().includes(q)
  ).slice(0, 4) : [];

  const matchedDoctors = q ? DOCTORS.filter(d =>
    d.name.toLowerCase().includes(q) ||
    d.specialties.some(s => s.toLowerCase().includes(q))
  ).slice(0, 2) : [];

  const matchedFeatures = q ? [
    { title: "Pharmacy Orders", icon: "fa-box-open", path: "/dashboard" },
    { title: "Prescription Vault", icon: "fa-file-prescription", path: "/dashboard" },
    { title: "Health Vault (EHR)", icon: "fa-folder-open", path: "/dashboard" },
    { title: "Schedule E-Consultation", icon: "fa-video", path: "/consultation" }
  ].filter(f => f.title.toLowerCase().includes(q)) : [];

  const hasResults = matchedMedicines.length > 0 || matchedDoctors.length > 0 || matchedFeatures.length > 0;

  return (
    <header>
      <div className="container header-container">
        {/* Brand Logo */}
        <Link to="/" className="logo">
          <img src="/logo.png" alt="AyurMedKart Logo" style={{ height: "36px", width: "auto", objectFit: "contain" }} />
          <span style={{ letterSpacing: "-0.8px" }}>
            <span style={{ color: "var(--primary)" }}>Ayur</span>
            <span style={{ color: "var(--secondary)" }}>MedKart</span>
          </span>
        </Link>

        {/* Navigation Menu (Mobile Drawer & Desktop Nav) */}
        <nav className={isMobileNavOpen ? "active" : ""}>
          {/* Mobile Profile Header inside Drawer */}
          <div className="mobile-drawer-profile-box">
            {auth.isLoggedIn ? (
              <div className="mobile-profile-card">
                <div className="user-avatar-placeholder" style={{ width: "36px", height: "36px", fontSize: "13px", lineHeight: "36px", background: "var(--primary)", color: "#fff", borderRadius: "50%", textAlign: "center", fontWeight: 700, flexShrink: 0 }}>
                  {initials}
                </div>
                <div className="mobile-profile-info">
                  <strong style={{ fontSize: "14px", color: "var(--white)" }}>{displayLabel}</strong>
                  <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.7)", display: "block" }}>{auth.name || "Authenticated User"}</span>
                </div>
              </div>
            ) : (
              <button 
                className="btn btn-primary btn-sm mobile-signin-btn"
                onClick={() => { setIsLoginModalOpen(true); setIsMobileNavOpen(false); }}
                style={{ width: "100%", justifyContent: "center", padding: "9px", fontSize: "13px" }}
              >
                <i className="fas fa-user-circle"></i> Sign In to Account
              </button>
            )}
          </div>

          <Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={() => setIsMobileNavOpen(false)}>
            <i className="fas fa-store" style={{ width: "20px", marginRight: "8px" }}></i> Medicine Store
          </Link>
          <Link to="/consultation" className={location.pathname === '/consultation' ? 'active' : ''} onClick={() => setIsMobileNavOpen(false)}>
            <i className="fas fa-user-md" style={{ width: "20px", marginRight: "8px" }}></i> E-consultation
          </Link>

          {auth.isLoggedIn && (
            <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''} onClick={() => setIsMobileNavOpen(false)}>
              <i className="fas fa-tachometer-alt" style={{ width: "20px", marginRight: "8px" }}></i> User Portal
            </Link>
          )}

          <div 
            className="mobile-nav-item-link" 
            onClick={() => { alert("Notifications: 1 new order status update."); setIsMobileNavOpen(false); }}
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", cursor: "pointer" }}
          >
            <span><i className="far fa-bell" style={{ width: "20px", marginRight: "8px" }}></i> Notifications</span>
            <span className="badge" style={{ position: "static", transform: "none" }}>1</span>
          </div>

          {auth.isLoggedIn && (
            <button 
              className="mobile-nav-logout-btn"
              onClick={() => { logoutUser(); setIsMobileNavOpen(false); }}
            >
              <i className="fas fa-sign-out-alt" style={{ width: "20px", marginRight: "8px" }}></i> Log Out
            </button>
          )}
        </nav>

        {/* OMNIPRESENT GLOBAL SEARCH BAR */}
        <div className="nav-global-search-container">
          <div className="nav-search-input-wrapper">
            <i className="fas fa-search nav-search-icon"></i>
            <input
              type="text"
              className="nav-search-input"
              placeholder="Search medicines, doctors..."
              value={globalSearchQuery}
              onChange={(e) => setGlobalSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 250)}
            />
            {globalSearchQuery && (
              <button className="nav-search-clear" onClick={() => setGlobalSearchQuery("")}>&times;</button>
            )}
          </div>

          {/* Live Search Dropdown Panel */}
          {isSearchFocused && q && (
            <div className="nav-search-dropdown-panel" onMouseDown={(e) => e.preventDefault()}>
              {!hasResults ? (
                <div className="nav-search-no-results">
                  <i className="fas fa-search-minus" style={{ fontSize: "20px", color: "var(--text-muted)", marginBottom: "6px" }}></i>
                  <p>No matching medicines, doctors, or features for "<strong>{globalSearchQuery}</strong>"</p>
                </div>
              ) : (
                <>
                  {/* Medicines & Formulations */}
                  {matchedMedicines.length > 0 && (
                    <div className="search-result-group">
                      <div className="search-group-title"><i className="fas fa-pills"></i> Medicines & Formulations</div>
                      {matchedMedicines.map(med => (
                        <div 
                          key={med.id} 
                          className="search-result-item" 
                          onMouseDown={(e) => {
                            e.preventDefault();
                            addToCart(med.id);
                            setGlobalSearchQuery("");
                            setIsSearchFocused(false);
                          }}
                        >
                          <img src={med.image} alt={med.name} className="search-item-img" />
                          <div className="search-item-info">
                            <strong>{med.name}</strong>
                            <span>{med.manufacturer} • ₹{med.price}</span>
                          </div>
                          <button className="btn btn-sm btn-outline">+ Add</button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Clinical Doctors */}
                  {matchedDoctors.length > 0 && (
                    <div className="search-result-group">
                      <div className="search-group-title"><i className="fas fa-user-md"></i> Clinical Doctors</div>
                      {matchedDoctors.map(doc => (
                        <div 
                          key={doc.id} 
                          className="search-result-item" 
                          onMouseDown={(e) => {
                            e.preventDefault();
                            startVideoCall(doc.name);
                            setGlobalSearchQuery("");
                            setIsSearchFocused(false);
                          }}
                        >
                          <div className="search-item-avatar">{doc.avatar}</div>
                          <div className="search-item-info">
                            <strong>{doc.name}</strong>
                            <span>{doc.specialties.join(", ")} • ₹{doc.fee}</span>
                          </div>
                          <button className="btn btn-sm btn-primary">Book Call</button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Portal Tools & Features */}
                  {matchedFeatures.length > 0 && (
                    <div className="search-result-group">
                      <div className="search-group-title"><i className="fas fa-cog"></i> Portal Tools & Features</div>
                      {matchedFeatures.map((feat, i) => (
                        <div 
                          key={i} 
                          className="search-result-item" 
                          onMouseDown={(e) => {
                            e.preventDefault();
                            if (feat.path) navigate(feat.path);
                            setGlobalSearchQuery("");
                            setIsSearchFocused(false);
                          }}
                        >
                          <div className="search-item-icon"><i className={`fas ${feat.icon}`}></i></div>
                          <div className="search-item-info">
                            <strong>{feat.title}</strong>
                            <span>Quick Access Tool</span>
                          </div>
                          <i className="fas fa-chevron-right" style={{ color: "var(--text-muted)", fontSize: "12px" }}></i>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="nav-actions">
          {/* Cart Button */}
          <button className="cart-icon-btn" aria-label="Open Cart" onClick={() => navigate('/cart')}>
            <i className="fas fa-shopping-basket"></i>
            {cartCount > 0 && <span className="badge cart-count-badge">{cartCount}</span>}
          </button>

          <button className="notification-icon-btn" aria-label="Notifications">
            <i className="far fa-bell"></i>
            <span className="badge">1</span>
          </button>

          {/* User Auth Menu */}
          <div className="user-auth-menu">
            <button
              className="login-icon-btn"
              onClick={() => {
                if (!auth.isLoggedIn) {
                  setIsLoginModalOpen(true);
                } else {
                  setIsDropdownOpen(!isDropdownOpen);
                }
              }}
            >
              {auth.isLoggedIn ? (
                <>
                  <div className="user-avatar-placeholder" style={{ width: "26px", height: "26px", fontSize: "11px", margin: 0, lineHeight: "26px", border: "1px solid var(--white)", background: "rgba(255,255,255,0.2)", color: "var(--white)", borderRadius: "50%", display: "inline-block", verticalAlign: "middle", textAlign: "center", fontWeight: 700 }}>
                    {initials}
                  </div>
                  <span className="login-btn-text" style={{ verticalAlign: "middle", marginLeft: "5px", fontWeight: 600 }}>{displayLabel}</span>
                  <i className="fas fa-caret-down" style={{ verticalAlign: "middle", marginLeft: "3px" }}></i>
                </>
              ) : (
                <>
                  <i className="fas fa-user-circle"></i>
                  <span className="login-btn-text">Sign In</span>
                </>
              )}
            </button>

            {auth.isLoggedIn && isDropdownOpen && (
              <div className="user-dropdown active">
                <div className="dropdown-header">
                  <strong>{auth.name}</strong>
                  <span>User Vault</span>
                </div>
                <Link to="/dashboard" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
                  <i className="fas fa-tachometer-alt"></i> User Portal
                </Link>
                <a href="#" className="dropdown-item logout" onClick={(e) => { e.preventDefault(); logoutUser(); setIsDropdownOpen(false); }}>
                  <i className="fas fa-sign-out-alt"></i> Log Out
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button className="menu-btn" aria-label="Toggle navigation" onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}>
          <i className={`fas ${isMobileNavOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
      </div>
    </header>
  );
};
