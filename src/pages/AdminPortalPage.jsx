import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { MEDICINES, DOCTORS } from '../data/medicines';

export const AdminPortalPage = () => {
  const { orders } = useApp();
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminEmail, setAdminEmail] = useState("admin@ayurmedkart.com");
  const [adminPassword, setAdminPassword] = useState("admin123");

  const [activeAdminTab, setActiveAdminTab] = useState("medicine");

  // Filter States for Admin Tabs
  // Tab 1 & Tab 2 Medicine Filters
  const [medSearch, setMedSearch] = useState("");
  const [medCategory, setMedCategory] = useState("all");
  const [medMfg, setMedMfg] = useState("all");

  // Tab 3 Order Book Filters
  const [orderSearch, setOrderSearch] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [orderStatus, setOrderStatus] = useState("all");

  // Tab 4 Telehealth Consultations Filters
  const [consultDate, setConsultDate] = useState("");
  const [consultDoc, setConsultDoc] = useState("all");

  // Local Admin Medicines Inventory State
  const [adminMedicines, setAdminMedicines] = useState(() => {
    return MEDICINES.map(m => ({ ...m, stockQty: m.id % 2 === 0 ? 45 : (m.id === 3 ? 8 : 120) }));
  });

  // Local Admin Orders Book State
  const [adminOrders, setAdminOrders] = useState([
    {
      id: "ORD-9901",
      customer: "Rahul Kumar (rahul.kumar@gmail.com)",
      date: "2026-06-25",
      items: [
        { name: "Ashwagandha Capsules", qty: 2, price: 250 },
        { name: "Chyawanprash Special", qty: 1, price: 320 }
      ],
      total: 861,
      status: "Shipped"
    },
    {
      id: "ORD-9902",
      customer: "Anjali Sharma (anjali@gmail.com)",
      date: "2026-07-20",
      items: [
        { name: "Triphala Churna", qty: 3, price: 135 }
      ],
      total: 425,
      status: "Placed"
    },
    {
      id: "ORD-9903",
      customer: "Vikram Sethi (vikram@gmail.com)",
      date: "2026-07-24",
      items: [
        { name: "ArthriCare Pain Balm", qty: 1, price: 110 }
      ],
      total: 115,
      status: "Packed"
    }
  ]);

  // Telehealth Consultations Data
  const consultationsList = [
    { id: "CON-789", patient: "Rahul Kumar (rahul.kumar@gmail.com)", doctorId: "1", doctorName: "Dr. Aravind Sharma", specialty: "Kayachikitsa & General Wellness", date: "2026-07-28", time: "10:00 AM", status: "Confirmed", fee: 500 },
    { id: "CON-790", patient: "Anjali Sharma (anjali@gmail.com)", doctorId: "2", doctorName: "Dr. Priya Nair", specialty: "Stri Roga & Prasuti Tantra", date: "2026-07-28", time: "11:30 AM", status: "Confirmed", fee: 600 },
    { id: "CON-791", patient: "Vikram Sethi (vikram@gmail.com)", doctorId: "3", doctorName: "Dr. Manoj K. Acharya", specialty: "Shalya Tantra & Spine Care", date: "2026-07-29", time: "02:00 PM", status: "Completed", fee: 550 },
    { id: "CON-792", patient: "Sujata Roy (sujata@gmail.com)", doctorId: "1", doctorName: "Dr. Aravind Sharma", specialty: "Kayachikitsa & General Wellness", date: "2026-07-30", time: "04:00 PM", status: "Confirmed", fee: 500 }
  ];

  // Modal State for Adding New Medicine
  const [isAddMedModalOpen, setIsAddMedModalOpen] = useState(false);
  const [newMedName, setNewMedName] = useState("");
  const [newMedMfg, setNewMedMfg] = useState("Himalaya Wellness");
  const [newMedMRP, setNewMedMRP] = useState("350");
  const [newMedPrice, setNewMedPrice] = useState("280");
  const [newMedCat, setNewMedCat] = useState("immunity");
  const [newMedRx, setNewMedRx] = useState(false);
  const [newMedStock, setNewMedStock] = useState("50");
  const [newMedImage, setNewMedImage] = useState("https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=300");

  // Handle Photo File Upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewMedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminEmail === "admin@ayurmedkart.com" && adminPassword === "admin123") {
      setIsAdminLoggedIn(true);
    } else {
      alert("Invalid Admin Credentials. Please use demo credentials: admin@ayurmedkart.com / admin123");
    }
  };

  const handleAddMedicine = (e) => {
    e.preventDefault();
    if (!newMedName || !newMedPrice) return;

    const mrp = Number(newMedMRP) || Number(newMedPrice);
    const sellingPrice = Number(newMedPrice);
    const discountPercent = mrp > sellingPrice ? Math.round(((mrp - sellingPrice) / mrp) * 100) : 0;

    const newMed = {
      id: Date.now(),
      name: newMedName,
      manufacturer: newMedMfg,
      price: sellingPrice,
      originalPrice: mrp,
      discount: discountPercent,
      rating: 5.0,
      reviewsCount: 1,
      category: newMedCat,
      condition: newMedCat,
      formulation: "tablet",
      prescriptionRequired: newMedRx,
      image: newMedImage || "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=300",
      ingredients: "Pure Ayurvedic Extract",
      benefits: "Formulated for holistic wellness",
      dosage: "1 tablet twice daily",
      precautions: "Consult doctor before use",
      stockQty: Number(newMedStock) || 50
    };

    setAdminMedicines(prev => [newMed, ...prev]);
    setIsAddMedModalOpen(false);
    setNewMedName("");
    setNewMedMRP("350");
    setNewMedPrice("280");
    setNewMedImage("https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=300");
    alert(`Medicine "${newMedName}" added with photo & details successfully!`);
  };

  const handleUpdateStock = (id, delta) => {
    setAdminMedicines(prev => prev.map(m => {
      if (m.id === id) {
        const newStock = Math.max(0, m.stockQty + delta);
        return { ...m, stockQty: newStock };
      }
      return m;
    }));
  };

  const handleDeleteMedicine = (id) => {
    if (window.confirm("Are you sure you want to delete this medicine formulation from inventory?")) {
      setAdminMedicines(prev => prev.filter(m => m.id !== id));
    }
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setAdminOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  // FILTERED LIST COMPUTATIONS
  // Medicines Filtering
  const filteredAdminMedicines = adminMedicines.filter(m => {
    const matchesSearch = !medSearch || m.name.toLowerCase().includes(medSearch.toLowerCase()) || m.manufacturer.toLowerCase().includes(medSearch.toLowerCase());
    const matchesCat = medCategory === "all" || m.category === medCategory;
    const matchesMfg = medMfg === "all" || m.manufacturer === medMfg;
    return matchesSearch && matchesCat && matchesMfg;
  });

  // Orders Filtering
  const filteredAdminOrders = adminOrders.filter(o => {
    const matchesSearch = !orderSearch || o.id.toLowerCase().includes(orderSearch.toLowerCase()) || o.customer.toLowerCase().includes(orderSearch.toLowerCase());
    const matchesDate = !orderDate || o.date === orderDate;
    const matchesStatus = orderStatus === "all" || o.status === orderStatus;
    return matchesSearch && matchesDate && matchesStatus;
  });

  // Telehealth Filtering
  const filteredConsultations = consultationsList.filter(c => {
    const matchesDate = !consultDate || c.date === consultDate;
    const matchesDoc = consultDoc === "all" || c.doctorId === consultDoc;
    return matchesDate && matchesDoc;
  });

  // 1. ADMIN LOGIN SCREEN (WHEN SIGNED OUT)
  if (!isAdminLoggedIn) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#071e18", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
        <div style={{ background: "var(--white)", width: "100%", maxWidth: "440px", padding: "40px 32px", borderRadius: "var(--radius-lg)", boxShadow: "0 20px 50px rgba(0,0,0,0.3)" }}>
          <div style={{ textAlign: "center", marginBottom: "28px" }}>
            <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "#e6f7f5", color: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px auto", fontSize: "24px" }}>
              <i className="fas fa-user-shield"></i>
            </div>
            <h2 style={{ fontSize: "22px", color: "var(--primary)", margin: "0 0 6px 0", fontFamily: "'Philosopher', sans-serif" }}>Store Administrator Portal</h2>
            <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: 0 }}>Restricted access for medicine inventory & order management</p>
          </div>

          <form onSubmit={handleAdminLogin} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div className="form-group">
              <label style={{ fontSize: "12.5px", fontWeight: 600, color: "var(--text-dark)", marginBottom: "6px", display: "block" }}>Admin Email / ID</label>
              <input 
                type="text" 
                required 
                value={adminEmail} 
                onChange={(e) => setAdminEmail(e.target.value)}
                style={{ width: "100%", padding: "11px 14px", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)", fontSize: "13.5px" }}
              />
            </div>

            <div className="form-group">
              <label style={{ fontSize: "12.5px", fontWeight: 600, color: "var(--text-dark)", marginBottom: "6px", display: "block" }}>Password</label>
              <input 
                type="password" 
                required 
                value={adminPassword} 
                onChange={(e) => setAdminPassword(e.target.value)}
                style={{ width: "100%", padding: "11px 14px", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)", fontSize: "13.5px" }}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: "100%", padding: "13px", fontSize: "14px", fontWeight: 700, marginTop: "8px" }}>
              <i className="fas fa-lock" style={{ marginRight: "8px" }}></i> Authenticate Admin Session
            </button>
          </form>

          <div style={{ marginTop: "24px", paddingTop: "16px", borderTop: "1px solid var(--border-color)", textAlign: "center", fontSize: "12px", color: "var(--text-muted)" }}>
            Demo Credentials: <strong style={{ color: "var(--primary)" }}>admin@ayurmedkart.com / admin123</strong>
          </div>
        </div>
      </div>
    );
  }

  // Calculate overview stats
  const totalRevenue = adminOrders.reduce((sum, o) => sum + o.total, 0) + 148000;
  const lowStockCount = adminMedicines.filter(m => m.stockQty < 15).length;

  // Unique Manufacturers for dropdown
  const uniqueManufacturers = Array.from(new Set(adminMedicines.map(m => m.manufacturer)));

  // 2. ADMIN PORTAL DASHBOARD (WHEN SIGNED IN)
  return (
    <div style={{ backgroundColor: "#f4faf8", minHeight: "100vh" }}>
      {/* Admin Header Navbar */}
      <header style={{ position: "sticky", top: 0, zIndex: 1000, background: "#071e18", color: "var(--white)", padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "20px", fontWeight: 700, color: "var(--white)", fontFamily: "'Philosopher', sans-serif" }}>Ayur<span style={{ color: "#ffd43b" }}>MedKart</span> Admin</span>
            <span style={{ fontSize: "11px", fontWeight: 700, background: "rgba(255,255,255,0.15)", color: "#ffd43b", padding: "3px 10px", borderRadius: "12px" }}>BACKEND PORTAL</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Link to="/" style={{ color: "rgba(255,255,255,0.85)", textDecoration: "none", fontSize: "13px", fontWeight: 500 }}>
              <i className="fas fa-store" style={{ marginRight: "6px" }}></i> View Public Storefront
            </Link>
            <button 
              onClick={() => setIsAdminLoggedIn(false)}
              style={{ background: "rgba(224, 49, 49, 0.2)", border: "1px solid rgba(224, 49, 49, 0.4)", color: "#ff6b6b", padding: "6px 14px", borderRadius: "var(--radius-sm)", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}
            >
              <i className="fas fa-sign-out-alt" style={{ marginRight: "6px" }}></i> Admin Exit
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Body */}
      <div className="container" style={{ paddingTop: "32px", paddingBottom: "60px" }}>
        
        {/* Overview Stats Cards */}
        <div className="admin-stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "32px" }}>
          <div className="admin-stat-card" style={{ background: "var(--white)", padding: "20px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)", boxShadow: "var(--shadow-sm)" }}>
            <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase" }}>Total Gross Revenue</span>
            <h3 style={{ fontSize: "26px", color: "var(--primary)", margin: "6px 0 0 0" }}>₹{totalRevenue.toLocaleString()}</h3>
            <span style={{ fontSize: "11.5px", color: "#2b8a3e", fontWeight: 600 }}><i className="fas fa-arrow-up"></i> +14.2% this month</span>
          </div>

          <div className="admin-stat-card" style={{ background: "var(--white)", padding: "20px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)", boxShadow: "var(--shadow-sm)" }}>
            <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase" }}>Total Orders Booked</span>
            <h3 style={{ fontSize: "26px", color: "var(--primary)", margin: "6px 0 0 0" }}>142 Orders</h3>
            <span style={{ fontSize: "11.5px", color: "var(--text-dark)" }}>3 Pending Fulfillment</span>
          </div>

          <div className="admin-stat-card" style={{ background: "var(--white)", padding: "20px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)", boxShadow: "var(--shadow-sm)" }}>
            <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase" }}>Active Formulations</span>
            <h3 style={{ fontSize: "26px", color: "var(--primary)", margin: "6px 0 0 0" }}>{adminMedicines.length} Items</h3>
            <span style={{ fontSize: "11.5px", color: "var(--text-muted)" }}>100% Verified Quality</span>
          </div>

          <div className="admin-stat-card" style={{ background: "var(--white)", padding: "20px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)", boxShadow: "var(--shadow-sm)" }}>
            <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase" }}>Low Stock Alerts</span>
            <h3 style={{ fontSize: "26px", color: lowStockCount > 0 ? "#d9640a" : "var(--primary)", margin: "6px 0 0 0" }}>{lowStockCount} Items</h3>
            <span style={{ fontSize: "11.5px", color: lowStockCount > 0 ? "#d9640a" : "var(--text-muted)" }}>Requires Restock</span>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="admin-nav-tabs" style={{ display: "flex", gap: "12px", marginBottom: "24px", borderBottom: "2px solid var(--border-color)", paddingBottom: "12px" }}>
          {[
            { id: "medicine", label: "Medicine Management & Catalog", icon: "fa-pills" },
            { id: "inventory", label: "Inventory & Stock Control", icon: "fa-boxes" },
            { id: "orders", label: "Order Book & Fulfillment", icon: "fa-book" },
            { id: "telehealth", label: "Doctor Telehealth Bookings", icon: "fa-user-md" }
          ].map(tab => (
            <button 
              key={tab.id}
              className="admin-nav-tab-btn"
              onClick={() => setActiveAdminTab(tab.id)}
              style={{
                padding: "10px 20px", borderRadius: "var(--radius-sm)", border: "none", cursor: "pointer",
                fontWeight: 600, fontSize: "13.5px", display: "flex", alignItems: "center", gap: "8px",
                backgroundColor: activeAdminTab === tab.id ? "var(--primary)" : "var(--white)",
                color: activeAdminTab === tab.id ? "var(--white)" : "var(--text-dark)",
                boxShadow: activeAdminTab === tab.id ? "var(--shadow-sm)" : "none"
              }}
            >
              <i className={`fas ${tab.icon}`}></i> {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: MEDICINE MANAGEMENT & CATALOG */}
        {activeAdminTab === "medicine" && (
          <div style={{ background: "var(--white)", padding: "24px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)", boxShadow: "var(--shadow-sm)" }}>
            <div className="admin-section-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <div>
                <h3 style={{ margin: 0, color: "var(--primary)" }}>Medicine Catalog & Formulations</h3>
                <p style={{ margin: "4px 0 0 0", fontSize: "13px", color: "var(--text-muted)" }}>Manage active Ayurvedic medicines, MRP, discounted selling price, and prescription requirements.</p>
              </div>
              <button className="btn btn-primary admin-add-btn" onClick={() => setIsAddMedModalOpen(true)}>
                <i className="fas fa-plus" style={{ marginRight: "6px" }}></i> Add New Formulation
              </button>
            </div>

            {/* TAB 1 FILTER BAR */}
            <div className="admin-filter-bar" style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center", backgroundColor: "#f8faf9", padding: "14px 16px", borderRadius: "var(--radius-sm)", marginBottom: "20px", border: "1px solid var(--border-color)" }}>
              <div style={{ position: "relative", flex: 1, minWidth: "220px" }}>
                <i className="fas fa-search" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", fontSize: "12px" }}></i>
                <input 
                  type="text"
                  placeholder="Search medicine name or manufacturer..."
                  value={medSearch}
                  onChange={(e) => setMedSearch(e.target.value)}
                  style={{ width: "100%", padding: "8px 12px 8px 34px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", fontSize: "12.5px" }}
                />
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-muted)" }}>Category:</label>
                <select 
                  value={medCategory} 
                  onChange={(e) => setMedCategory(e.target.value)}
                  style={{ padding: "8px 12px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", fontSize: "12.5px", background: "white" }}
                >
                  <option value="all">All Categories</option>
                  <option value="immunity">Immunity Boosters</option>
                  <option value="digestive">Digestive Care</option>
                  <option value="preventive">Preventive Care</option>
                  <option value="women">Women's Health</option>
                  <option value="skin">Skin & Hair</option>
                </select>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-muted)" }}>Manufacturer:</label>
                <select 
                  value={medMfg} 
                  onChange={(e) => setMedMfg(e.target.value)}
                  style={{ padding: "8px 12px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", fontSize: "12.5px", background: "white" }}
                >
                  <option value="all">All Manufacturers</option>
                  {uniqueManufacturers.map((mfg, idx) => (
                    <option key={idx} value={mfg}>{mfg}</option>
                  ))}
                </select>
              </div>

              {(medSearch || medCategory !== "all" || medMfg !== "all") && (
                <button 
                  onClick={() => { setMedSearch(""); setMedCategory("all"); setMedMfg("all"); }}
                  style={{ padding: "7px 12px", borderRadius: "var(--radius-sm)", border: "1px solid #ffc9c9", background: "#fff0f0", color: "#e03131", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}
                >
                  <i className="fas fa-times"></i> Reset Filters
                </button>
              )}
            </div>

            <div className="admin-table-wrapper" style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid var(--border-color)", backgroundColor: "#f8faf9" }}>
                    <th style={{ padding: "12px" }}>Product</th>
                    <th style={{ padding: "12px" }}>Manufacturer</th>
                    <th style={{ padding: "12px" }}>Category</th>
                    <th style={{ padding: "12px" }}>Pricing (MRP & Selling)</th>
                    <th style={{ padding: "12px" }}>Rx Requirement</th>
                    <th style={{ padding: "12px" }}>Stock</th>
                    <th style={{ padding: "12px", textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAdminMedicines.length === 0 ? (
                    <tr>
                      <td colSpan="7" style={{ padding: "30px", textAlign: "center", color: "var(--text-muted)" }}>
                        <i className="fas fa-filter" style={{ fontSize: "24px", marginBottom: "8px", color: "var(--primary)" }}></i>
                        <p style={{ margin: 0 }}>No medicines found matching selected category/manufacturer filters.</p>
                      </td>
                    </tr>
                  ) : (
                    filteredAdminMedicines.map(med => (
                      <tr key={med.id} style={{ borderBottom: "1px solid var(--border-color)" }}>
                        <td style={{ padding: "12px", display: "flex", alignItems: "center", gap: "10px" }}>
                          <img src={med.image} alt={med.name} style={{ width: "36px", height: "36px", borderRadius: "4px", objectFit: "cover" }} />
                          <strong style={{ color: "var(--text-dark)" }}>{med.name}</strong>
                        </td>
                        <td style={{ padding: "12px", color: "var(--text-muted)" }}>{med.manufacturer}</td>
                        <td style={{ padding: "12px" }}><span style={{ background: "#e6f7f5", color: "var(--primary)", padding: "2px 8px", borderRadius: "4px", fontSize: "11.5px", textTransform: "capitalize" }}>{med.category}</span></td>
                        <td style={{ padding: "12px" }}>
                          <div>
                            <strong style={{ color: "var(--primary)", fontSize: "14px" }}>₹{med.price}</strong>
                            <span style={{ fontSize: "11.5px", color: "var(--text-muted)", textDecoration: "line-through", marginLeft: "6px" }}>₹{med.originalPrice}</span>
                            <span style={{ fontSize: "10.5px", fontWeight: 700, color: "#2b8a3e", backgroundColor: "#e6fcf5", padding: "1px 6px", borderRadius: "4px", marginLeft: "6px" }}>-{med.discount}% OFF</span>
                          </div>
                        </td>
                        <td style={{ padding: "12px" }}>
                          {med.prescriptionRequired ? (
                            <span style={{ background: "#fff2e6", color: "#d9640a", padding: "2px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: 700 }}>Rx Required</span>
                          ) : (
                            <span style={{ background: "#e6fcf5", color: "#2b8a3e", padding: "2px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: 700 }}>OTC Free</span>
                          )}
                        </td>
                        <td style={{ padding: "12px" }}>
                          <span style={{ fontWeight: 600, color: med.stockQty < 15 ? "#d9640a" : "var(--text-dark)" }}>{med.stockQty} Units</span>
                        </td>
                        <td style={{ padding: "10px 12px", textAlign: "right", whiteSpace: "nowrap" }}>
                          <button 
                            onClick={() => handleUpdateStock(med.id, 10)} 
                            style={{ padding: "4px 9px", fontSize: "11.5px", fontWeight: 600, borderRadius: "4px", border: "1px solid var(--primary)", color: "var(--primary)", backgroundColor: "#f4faf8", cursor: "pointer", marginRight: "6px" }}
                          >
                            + Stock
                          </button>
                          <button 
                            onClick={() => handleDeleteMedicine(med.id)} 
                            style={{ padding: "4px 9px", fontSize: "11.5px", fontWeight: 600, borderRadius: "4px", border: "1px solid #ffc9c9", color: "#e03131", backgroundColor: "#fff0f0", cursor: "pointer" }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: INVENTORY & STOCK CONTROL */}
        {activeAdminTab === "inventory" && (
          <div style={{ background: "var(--white)", padding: "24px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)", boxShadow: "var(--shadow-sm)" }}>
            <h3 style={{ margin: "0 0 6px 0", color: "var(--primary)" }}>Inventory Stock Control</h3>
            <p style={{ margin: "0 0 20px 0", fontSize: "13px", color: "var(--text-muted)" }}>Monitor stock levels and adjust quantity for all active formulations.</p>

            {/* TAB 2 FILTER BAR */}
            <div className="admin-filter-bar" style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center", backgroundColor: "#f8faf9", padding: "14px 16px", borderRadius: "var(--radius-sm)", marginBottom: "20px", border: "1px solid var(--border-color)" }}>
              <div style={{ position: "relative", flex: 1, minWidth: "220px" }}>
                <i className="fas fa-search" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", fontSize: "12px" }}></i>
                <input 
                  type="text"
                  placeholder="Search inventory medicine name or manufacturer..."
                  value={medSearch}
                  onChange={(e) => setMedSearch(e.target.value)}
                  style={{ width: "100%", padding: "8px 12px 8px 34px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", fontSize: "12.5px" }}
                />
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-muted)" }}>Category:</label>
                <select 
                  value={medCategory} 
                  onChange={(e) => setMedCategory(e.target.value)}
                  style={{ padding: "8px 12px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", fontSize: "12.5px", background: "white" }}
                >
                  <option value="all">All Categories</option>
                  <option value="immunity">Immunity Boosters</option>
                  <option value="digestive">Digestive Care</option>
                  <option value="preventive">Preventive Care</option>
                  <option value="women">Women's Health</option>
                  <option value="skin">Skin & Hair</option>
                </select>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-muted)" }}>Manufacturer:</label>
                <select 
                  value={medMfg} 
                  onChange={(e) => setMedMfg(e.target.value)}
                  style={{ padding: "8px 12px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", fontSize: "12.5px", background: "white" }}
                >
                  <option value="all">All Manufacturers</option>
                  {uniqueManufacturers.map((mfg, idx) => (
                    <option key={idx} value={mfg}>{mfg}</option>
                  ))}
                </select>
              </div>

              {(medSearch || medCategory !== "all" || medMfg !== "all") && (
                <button 
                  onClick={() => { setMedSearch(""); setMedCategory("all"); setMedMfg("all"); }}
                  style={{ padding: "7px 12px", borderRadius: "var(--radius-sm)", border: "1px solid #ffc9c9", background: "#fff0f0", color: "#e03131", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}
                >
                  <i className="fas fa-times"></i> Reset Filters
                </button>
              )}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
              {filteredAdminMedicines.length === 0 ? (
                <div style={{ gridColumn: "1 / -1", padding: "30px", textAlign: "center", color: "var(--text-muted)", background: "#f8faf9", borderRadius: "var(--radius-sm)" }}>
                  <p style={{ margin: 0 }}>No inventory formulations match the current category/manufacturer filters.</p>
                </div>
              ) : (
                filteredAdminMedicines.map(med => (
                  <div key={med.id} style={{ border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)", padding: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <h4 style={{ margin: "0 0 4px 0", fontSize: "14px", color: "var(--text-dark)" }}>{med.name}</h4>
                      <span style={{ fontSize: "11.5px", color: "var(--text-muted)", display: "block", marginBottom: "4px" }}>{med.manufacturer}</span>
                      <span style={{ fontSize: "12px", color: med.stockQty < 15 ? "#d9640a" : "var(--text-muted)", fontWeight: med.stockQty < 15 ? 700 : 400 }}>
                        Status: {med.stockQty < 15 ? '⚠️ Low Stock' : 'In Stock'} ({med.stockQty} Units)
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                      <button className="btn btn-light btn-sm" onClick={() => handleUpdateStock(med.id, -5)}>-5</button>
                      <button className="btn btn-primary btn-sm" onClick={() => handleUpdateStock(med.id, 20)}>+20</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 3: ORDER BOOK & FULFILLMENT */}
        {activeAdminTab === "orders" && (
          <div style={{ background: "var(--white)", padding: "24px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)", boxShadow: "var(--shadow-sm)" }}>
            <h3 style={{ margin: "0 0 6px 0", color: "var(--primary)" }}>Order Book & Shipping Fulfillment</h3>
            <p style={{ margin: "0 0 20px 0", fontSize: "13px", color: "var(--text-muted)" }}>Track customer purchases and update shipping fulfillment status.</p>

            {/* TAB 3 FILTER BAR (DATE & STATUS FILTERS) */}
            <div className="admin-filter-bar" style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center", backgroundColor: "#f8faf9", padding: "14px 16px", borderRadius: "var(--radius-sm)", marginBottom: "20px", border: "1px solid var(--border-color)" }}>
              <div style={{ position: "relative", flex: 1, minWidth: "200px" }}>
                <i className="fas fa-search" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", fontSize: "12px" }}></i>
                <input 
                  type="text"
                  placeholder="Search Order ID or customer..."
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  style={{ width: "100%", padding: "8px 12px 8px 34px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", fontSize: "12.5px" }}
                />
              </div>

              {/* Date-wise Filter */}
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-muted)" }}><i className="far fa-calendar-alt"></i> Order Date:</label>
                <input 
                  type="date"
                  value={orderDate}
                  onChange={(e) => setOrderDate(e.target.value)}
                  style={{ padding: "7px 10px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", fontSize: "12.5px", background: "white" }}
                />
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-muted)" }}>Fulfillment Status:</label>
                <select 
                  value={orderStatus}
                  onChange={(e) => setOrderStatus(e.target.value)}
                  style={{ padding: "8px 12px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", fontSize: "12.5px", background: "white" }}
                >
                  <option value="all">All Statuses</option>
                  <option value="Placed">Placed</option>
                  <option value="Packed">Packed</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              {(orderSearch || orderDate || orderStatus !== "all") && (
                <button 
                  onClick={() => { setOrderSearch(""); setOrderDate(""); setOrderStatus("all"); }}
                  style={{ padding: "7px 12px", borderRadius: "var(--radius-sm)", border: "1px solid #ffc9c9", background: "#fff0f0", color: "#e03131", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}
                >
                  <i className="fas fa-times"></i> Reset Filters
                </button>
              )}
            </div>

            {filteredAdminOrders.length === 0 ? (
              <div style={{ padding: "30px", textAlign: "center", color: "var(--text-muted)", background: "#f8faf9", borderRadius: "var(--radius-sm)" }}>
                <i className="far fa-calendar-times" style={{ fontSize: "24px", marginBottom: "8px", color: "var(--primary)" }}></i>
                <p style={{ margin: 0 }}>No orders found for the selected date or fulfillment status filters.</p>
              </div>
            ) : (
              filteredAdminOrders.map(order => (
                <div key={order.id} style={{ border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)", padding: "16px", marginBottom: "14px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border-color)", paddingBottom: "10px", marginBottom: "10px" }}>
                    <div>
                      <strong style={{ fontSize: "14px", color: "var(--primary)" }}>Order ID: {order.id}</strong>
                      <span style={{ fontSize: "12px", color: "var(--text-muted)", marginLeft: "12px" }}>{order.customer} • <strong>Date: {order.date}</strong></span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-dark)" }}>Status:</span>
                      <select 
                        value={order.status}
                        onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                        style={{ padding: "4px 8px", borderRadius: "4px", border: "1px solid var(--border-color)", fontSize: "12.5px", fontWeight: 600, backgroundColor: "#f8faf9" }}
                      >
                        <option value="Placed">Placed</option>
                        <option value="Packed">Packed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ fontSize: "13px" }}>
                    {order.items.map((item, i) => (
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", color: "var(--text-dark)", padding: "2px 0" }}>
                        <span>{item.name} x {item.qty}</span>
                        <span>₹{item.price * item.qty}</span>
                      </div>
                    ))}
                    <div style={{ borderTop: "1px solid var(--border-color)", marginTop: "8px", paddingTop: "6px", fontWeight: 700, color: "var(--primary)", display: "flex", justifyContent: "space-between" }}>
                      <span>Total Amount:</span>
                      <span>₹{order.total}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 4: TELEHEALTH BOOKINGS */}
        {activeAdminTab === "telehealth" && (
          <div style={{ background: "var(--white)", padding: "24px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)", boxShadow: "var(--shadow-sm)" }}>
            <h3 style={{ margin: "0 0 6px 0", color: "var(--primary)" }}>Scheduled Telehealth Consultations</h3>
            <p style={{ margin: "0 0 20px 0", fontSize: "13px", color: "var(--text-muted)" }}>View doctor appointment schedules and patient clinical records.</p>

            {/* TAB 4 FILTER BAR (DATE & DOCTOR FILTERS) */}
            <div className="admin-filter-bar" style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center", backgroundColor: "#f8faf9", padding: "14px 16px", borderRadius: "var(--radius-sm)", marginBottom: "20px", border: "1px solid var(--border-color)" }}>
              {/* Date-wise Filter */}
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-muted)" }}><i className="far fa-calendar-alt"></i> Consultation Date:</label>
                <input 
                  type="date"
                  value={consultDate}
                  onChange={(e) => setConsultDate(e.target.value)}
                  style={{ padding: "7px 10px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", fontSize: "12.5px", background: "white" }}
                />
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-muted)" }}>Doctor Specialist:</label>
                <select 
                  value={consultDoc}
                  onChange={(e) => setConsultDoc(e.target.value)}
                  style={{ padding: "8px 12px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", fontSize: "12.5px", background: "white" }}
                >
                  <option value="all">All Clinical Specialists</option>
                  {DOCTORS.map(doc => (
                    <option key={doc.id} value={String(doc.id)}>{doc.name}</option>
                  ))}
                </select>
              </div>

              {(consultDate || consultDoc !== "all") && (
                <button 
                  onClick={() => { setConsultDate(""); setConsultDoc("all"); }}
                  style={{ padding: "7px 12px", borderRadius: "var(--radius-sm)", border: "1px solid #ffc9c9", background: "#fff0f0", color: "#e03131", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}
                >
                  <i className="fas fa-times"></i> Reset Filters
                </button>
              )}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {filteredConsultations.length === 0 ? (
                <div style={{ padding: "30px", textAlign: "center", color: "var(--text-muted)", background: "#f8faf9", borderRadius: "var(--radius-sm)" }}>
                  <i className="far fa-calendar-times" style={{ fontSize: "24px", marginBottom: "8px", color: "var(--primary)" }}></i>
                  <p style={{ margin: 0 }}>No consultations scheduled on selected date or doctor filter.</p>
                </div>
              ) : (
                filteredConsultations.map(con => (
                  <div key={con.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div style={{ width: "42px", height: "42px", borderRadius: "50%", background: "var(--primary)", color: "var(--white)", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px" }}>
                        <i className="fas fa-video"></i>
                      </div>
                      <div>
                        <h4 style={{ margin: 0, fontSize: "14.5px", color: "var(--text-dark)" }}>{con.patient}</h4>
                        <span style={{ fontSize: "12px", color: "var(--primary)", fontWeight: 600 }}>{con.doctorName} • {con.specialty}</span>
                        <div style={{ fontSize: "11.5px", color: "var(--text-muted)", marginTop: "2px" }}>
                          <i className="far fa-clock" style={{ marginRight: "4px" }}></i> <strong>Date: {con.date}</strong> at {con.time} • Fee: ₹{con.fee}
                        </div>
                      </div>
                    </div>
                    <span className="badge-tag" style={{ background: "#e6f7f5", color: "var(--primary)", fontWeight: 700 }}>{con.status}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

      </div>

      {/* ADD NEW MEDICINE MODAL */}
      {isAddMedModalOpen && (
        <div className="modal-overlay active" style={{ zIndex: 9999 }}>
          <div className="modal-dialog" style={{ maxWidth: "520px" }}>
            <div className="modal-header">
              <h3>Add New Medicine Formulation</h3>
              <button className="close-modal-btn" onClick={() => setIsAddMedModalOpen(false)}>&times;</button>
            </div>
            <form onSubmit={handleAddMedicine} className="modal-body" style={{ display: "flex", flexDirection: "column", gap: "14px", paddingTop: "16px" }}>
              <div className="form-group">
                <label style={{ fontSize: "12.5px", fontWeight: 600, display: "block", marginBottom: "4px" }}>Medicine Name</label>
                <input type="text" required placeholder="e.g. Punarnavadi Kashayam" value={newMedName} onChange={(e) => setNewMedName(e.target.value)} style={{ width: "100%", padding: "10px", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)" }} />
              </div>

              <div className="form-group">
                <label style={{ fontSize: "12.5px", fontWeight: 600, display: "block", marginBottom: "4px" }}>Manufacturer / Brand</label>
                <select value={newMedMfg} onChange={(e) => setNewMedMfg(e.target.value)} style={{ width: "100%", padding: "10px", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)" }}>
                  <option value="Himalaya Wellness">Himalaya Wellness</option>
                  <option value="Dabur Care">Dabur Care</option>
                  <option value="Baidyanath">Baidyanath</option>
                  <option value="Kerala Ayurveda">Kerala Ayurveda</option>
                  <option value="Zandu Healthcare">Zandu Healthcare</option>
                  <option value="AVP Coimbatore">AVP Coimbatore</option>
                </select>
              </div>

              {/* MEDICINE PHOTO UPLOADER & IMAGE URL */}
              <div className="form-group" style={{ background: "#f8faf9", padding: "12px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)" }}>
                <label style={{ fontSize: "12.5px", fontWeight: 600, display: "block", marginBottom: "6px", color: "var(--primary)" }}>
                  <i className="fas fa-camera" style={{ marginRight: "6px" }}></i> Medicine Photo / Formulation Image
                </label>
                
                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  {/* Photo Preview Thumbnail */}
                  <div style={{ width: "70px", height: "70px", borderRadius: "6px", overflow: "hidden", border: "1px solid var(--border-color)", background: "#fff", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {newMedImage ? (
                      <img src={newMedImage} alt="Medicine Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <i className="fas fa-pills" style={{ fontSize: "24px", color: "var(--text-muted)" }}></i>
                    )}
                  </div>

                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
                    {/* Local File Upload Button */}
                    <div>
                      <label htmlFor="med-photo-file-upload" className="btn btn-outline btn-sm" style={{ padding: "6px 12px", fontSize: "11.5px", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                        <i className="fas fa-upload"></i> Upload Photo File
                      </label>
                      <input 
                        type="file" 
                        id="med-photo-file-upload" 
                        accept="image/*" 
                        style={{ display: "none" }} 
                        onChange={handlePhotoUpload} 
                      />
                      <span style={{ fontSize: "11px", color: "var(--text-muted)", marginLeft: "8px" }}>Supports PNG, JPG, WebP</span>
                    </div>

                    {/* Image URL Input */}
                    <input 
                      type="text" 
                      placeholder="Or paste Image URL (https://...)" 
                      value={newMedImage} 
                      onChange={(e) => setNewMedImage(e.target.value)} 
                      style={{ width: "100%", padding: "6px 10px", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)", fontSize: "11.5px" }} 
                    />
                  </div>
                </div>
              </div>

              {/* PRICING & MRP OPTIONS */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
                <div className="form-group">
                  <label style={{ fontSize: "12px", fontWeight: 600, display: "block", marginBottom: "4px" }}>MRP (List Price ₹)</label>
                  <input type="number" required placeholder="350" value={newMedMRP} onChange={(e) => setNewMedMRP(e.target.value)} style={{ width: "100%", padding: "10px", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)" }} />
                </div>

                <div className="form-group">
                  <label style={{ fontSize: "12px", fontWeight: 600, display: "block", marginBottom: "4px" }}>Selling Price (₹)</label>
                  <input type="number" required placeholder="280" value={newMedPrice} onChange={(e) => setNewMedPrice(e.target.value)} style={{ width: "100%", padding: "10px", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)" }} />
                </div>

                <div className="form-group">
                  <label style={{ fontSize: "12px", fontWeight: 600, display: "block", marginBottom: "4px" }}>Discount</label>
                  <div style={{ padding: "10px 6px", background: "#fff2e6", color: "#d9640a", fontWeight: 700, borderRadius: "var(--radius-sm)", textAlign: "center", fontSize: "12.5px" }}>
                    {Number(newMedMRP) > Number(newMedPrice) ? `${Math.round(((Number(newMedMRP) - Number(newMedPrice)) / Number(newMedMRP)) * 100)}% OFF` : '0% OFF'}
                  </div>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div className="form-group">
                  <label style={{ fontSize: "12.5px", fontWeight: 600, display: "block", marginBottom: "4px" }}>Category</label>
                  <select value={newMedCat} onChange={(e) => setNewMedCat(e.target.value)} style={{ width: "100%", padding: "10px", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)" }}>
                    <option value="immunity">Immunity Boosters</option>
                    <option value="digestive">Digestive Care</option>
                    <option value="preventive">Preventive Care</option>
                    <option value="women">Women's Health</option>
                    <option value="skin">Skin & Hair</option>
                  </select>
                </div>

                <div className="form-group">
                  <label style={{ fontSize: "12.5px", fontWeight: 600, display: "block", marginBottom: "4px" }}>Initial Stock Qty</label>
                  <input type="number" required placeholder="50" value={newMedStock} onChange={(e) => setNewMedStock(e.target.value)} style={{ width: "100%", padding: "10px", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)" }} />
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <input type="checkbox" id="add-rx-check" checked={newMedRx} onChange={(e) => setNewMedRx(e.target.checked)} />
                <label htmlFor="add-rx-check" style={{ fontSize: "13px", color: "var(--text-dark)" }}>Requires Prescription Validation (Rx)</label>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: "100%", padding: "12px", marginTop: "10px" }}>
                Save Formulation to Inventory
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
