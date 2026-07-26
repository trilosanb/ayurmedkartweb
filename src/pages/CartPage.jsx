import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const CartPage = () => {
  const { cart, updateCartQty, removeFromCart, clearCart, addOrder } = useApp();

  // Wizard Step State (1: Medicine Checklist, 2: Shipping Address, 3: Payment & Finalize)
  const [currentStep, setCurrentStep] = useState(1);

  // Minimalist Coupon State
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [appliedCouponName, setAppliedCouponName] = useState("");
  const [couponError, setCouponError] = useState("");

  // Shipping Address state
  const [shippingAddress, setShippingAddress] = useState({
    fullName: "Rahul Kumar",
    phone: "9876543210",
    street: "Main Road, Near Mission Chariali",
    city: "Tezpur",
    state: "Assam",
    pincode: "784001",
    addressType: "Home"
  });

  // Payment method state
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [upiId, setUpiId] = useState("9876543210@paytm");

  // Order placed state
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [placedOrderDetails, setPlacedOrderDetails] = useState(null);

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.qty), 0);
  const discountAmount = Math.round((subtotal * appliedDiscount) / 100);
  const discountedSubtotal = subtotal - discountAmount;
  const deliveryCharge = discountedSubtotal > 499 || cart.length === 0 ? 0 : 49;
  const tax = Math.round(discountedSubtotal * 0.05);
  const grandTotal = discountedSubtotal + deliveryCharge + tax;

  // Minimalist Coupon Application
  const handleApplyCoupon = (codeToApply) => {
    const code = (codeToApply || couponCode).trim().toUpperCase();
    setCouponError("");

    if (code === "AYUR10") {
      setAppliedDiscount(10);
      setAppliedCouponName("AYUR10 (10% OFF)");
      setCouponCode("");
    } else if (code === "AYURMED20") {
      setAppliedDiscount(20);
      setAppliedCouponName("AYURMED20 (20% OFF)");
      setCouponCode("");
    } else if (code === "FREESHIP") {
      setAppliedDiscount(5);
      setAppliedCouponName("FREESHIP (5% OFF)");
      setCouponCode("");
    } else {
      setCouponError("Invalid promo code. Try AYUR10 or AYURMED20");
    }
  };

  // Place Order Handler
  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const newOrder = {
      id: "ORD-" + Math.floor(1000 + Math.random() * 9000),
      date: new Date().toISOString().split('T')[0],
      items: cart.map(item => ({
        name: item.product.name,
        qty: item.qty,
        price: item.product.price,
        image: item.product.image
      })),
      totalAmount: grandTotal,
      subtotal,
      discountAmount,
      shippingAddress: { ...shippingAddress },
      paymentMethod: paymentMethod.toUpperCase(),
      status: "Placed",
      eta: "2-3 Business Days"
    };

    addOrder(newOrder);
    setPlacedOrderDetails(newOrder);
    setIsOrderPlaced(true);
    clearCart();
  };

  // 1. ORDER PLACED CONFIRMATION SCREEN
  if (isOrderPlaced && placedOrderDetails) {
    return (
      <div style={{ backgroundColor: "#f4faf8", minHeight: "80vh", padding: "60px 0" }}>
        <div className="container" style={{ maxWidth: "600px" }}>
          <div style={{ background: "var(--white)", padding: "40px 30px", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-color)", boxShadow: "0 10px 40px rgba(0,0,0,0.08)", textAlign: "center" }}>
            <div style={{ width: "70px", height: "70px", borderRadius: "50%", background: "#e6f7f5", color: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px auto", fontSize: "32px" }}>
              <i className="fas fa-check-circle"></i>
            </div>
            
            <h2 style={{ color: "var(--primary)", margin: "0 0 8px 0", fontFamily: "'Philosopher', sans-serif", fontSize: "26px" }}>Order Placed Successfully!</h2>
            <p style={{ color: "var(--text-muted)", fontSize: "14px", margin: "0 0 24px 0" }}>Thank you for ordering with AyurMedKart. Your authentic Ayurvedic medicines are being prepared for dispatch.</p>

            <div style={{ background: "#f8faf9", padding: "20px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)", textAlign: "left", marginBottom: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", fontSize: "13.5px" }}>
                <strong>Order Tracking ID:</strong>
                <span style={{ color: "var(--primary)", fontWeight: 700 }}>{placedOrderDetails.id}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", fontSize: "13.5px" }}>
                <strong>Estimated Delivery:</strong>
                <span style={{ color: "#2b8a3e", fontWeight: 600 }}>{placedOrderDetails.eta}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", fontSize: "13.5px" }}>
                <strong>Delivery Address:</strong>
                <span style={{ color: "var(--text-dark)", textAlign: "right" }}>{placedOrderDetails.shippingAddress.street}, {placedOrderDetails.shippingAddress.city} ({placedOrderDetails.shippingAddress.pincode})</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "10px", borderTop: "1px solid var(--border-color)", fontWeight: 700, fontSize: "15px", color: "var(--primary)" }}>
                <span>Total Paid:</span>
                <span>₹{placedOrderDetails.totalAmount} ({placedOrderDetails.paymentMethod})</span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
              <Link to="/dashboard" className="btn btn-primary" style={{ padding: "12px 24px", fontSize: "13.5px" }}>
                <i className="fas fa-box-open" style={{ marginRight: "6px" }}></i> View in User Portal
              </Link>
              <Link to="/" className="btn btn-outline" style={{ padding: "12px 24px", fontSize: "13.5px" }}>
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. EMPTY CART VIEW
  if (cart.length === 0) {
    return (
      <div style={{ backgroundColor: "#f4faf8", minHeight: "70vh", padding: "60px 0" }}>
        <div className="container" style={{ textAlign: "center", maxWidth: "480px" }}>
          <div style={{ background: "var(--white)", padding: "40px 24px", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-color)", boxShadow: "var(--shadow-sm)" }}>
            <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "#e6f7f5", color: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px auto", fontSize: "36px" }}>
              <i className="fas fa-clipboard-check"></i>
            </div>
            <h2 style={{ color: "var(--primary)", margin: "0 0 8px 0" }}>Your Medicine Checklist is Empty</h2>
            <p style={{ color: "var(--text-muted)", fontSize: "13.5px", marginBottom: "24px" }}>Explore classical Ayurvedic medicines and wellness formulations from certified pharmacies.</p>
            <Link to="/" className="btn btn-primary" style={{ padding: "12px 28px" }}>
              Browse Medicine Store
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 3. STEP-BY-STEP CHECKOUT WIZARD
  return (
    <div style={{ backgroundColor: "#f4faf8", minHeight: "100vh", paddingTop: "70px", paddingBottom: "40px" }}>
      <div className="container" style={{ maxWidth: "1000px" }}>
        
        {/* Page Title */}
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <span style={{ fontSize: "12px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 700 }}>Secure Checkout Flow</span>
          <h1 style={{ fontSize: "28px", color: "var(--primary)", margin: "4px 0 0 0", fontFamily: "'Philosopher', sans-serif" }}>Medicine Checklist & Order Checkout</h1>
        </div>

        {/* STEP-BY-STEP STEPPER BAR */}
        <div className="checkout-stepper-bar" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
          {[
            { step: 1, label: "1. Medicine Checklist", icon: "fa-clipboard-list" },
            { step: 2, label: "2. Shipping Address", icon: "fa-truck" },
            { step: 3, label: "3. Payment & Order", icon: "fa-lock" }
          ].map((s, idx) => (
            <React.Fragment key={s.step}>
              <div 
                className="checkout-stepper-item"
                onClick={() => { if (s.step < currentStep) setCurrentStep(s.step); }}
                style={{
                  display: "flex", alignItems: "center", gap: "8px", padding: "10px 18px", borderRadius: "20px",
                  backgroundColor: currentStep === s.step ? "var(--primary)" : (currentStep > s.step ? "#e6f7f5" : "var(--white)"),
                  color: currentStep === s.step ? "var(--white)" : (currentStep > s.step ? "var(--primary)" : "var(--text-muted)"),
                  border: "1px solid", borderColor: currentStep === s.step ? "var(--primary)" : (currentStep > s.step ? "var(--primary)" : "var(--border-color)"),
                  fontWeight: 600, fontSize: "13px", cursor: currentStep > s.step ? "pointer" : "default"
                }}
              >
                <i className={`fas ${s.icon}`}></i> {s.label}
              </div>
              {idx < 2 && <i className="fas fa-chevron-right" style={{ color: "var(--text-muted)", fontSize: "12px" }}></i>}
            </React.Fragment>
          ))}
        </div>

        <div className="cart-checkout-grid">
          
          {/* LEFT COLUMN: ACTIVE STEP CONTENT */}
          <div>
            
            {/* STEP 1: MEDICINE CHECKLIST */}
            {currentStep === 1 && (
              <div style={{ background: "var(--white)", padding: "24px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)", boxShadow: "var(--shadow-sm)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border-color)", paddingBottom: "12px", marginBottom: "16px" }}>
                  <h3 style={{ margin: 0, fontSize: "16.5px", color: "var(--primary)", display: "flex", alignItems: "center", gap: "8px" }}>
                    <i className="fas fa-clipboard-check"></i> Medicine Checklist ({cart.reduce((s, c) => s + c.qty, 0)} Items)
                  </h3>
                  <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>Verify items before delivery</span>
                </div>

                {/* Items List */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
                  {cart.map(item => (
                    <div key={item.product.id} className="cart-checklist-item" style={{ display: "flex", alignItems: "center", gap: "14px", padding: "12px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", backgroundColor: "#f8faf9" }}>
                      <i className="fas fa-check-square" style={{ color: "var(--primary)", fontSize: "18px" }}></i>
                      <img src={item.product.image} alt={item.product.name} style={{ width: "48px", height: "48px", objectFit: "cover", borderRadius: "6px" }} />
                      
                      <div style={{ flex: 1 }}>
                        <h4 style={{ margin: "0 0 2px 0", fontSize: "13.5px", color: "var(--text-dark)" }}>{item.product.name}</h4>
                        <span style={{ fontSize: "11.5px", color: "var(--text-muted)" }}>{item.product.manufacturer}</span>
                        <div style={{ marginTop: "2px" }}>
                          <span style={{ fontSize: "13.5px", fontWeight: 700, color: "var(--primary)" }}>₹{item.product.price}</span>
                        </div>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <button type="button" className="btn btn-light btn-sm" onClick={() => updateCartQty(item.product.id, -1)} style={{ width: "26px", height: "26px", padding: 0 }}>-</button>
                        <span style={{ fontSize: "13px", fontWeight: 700, minWidth: "18px", textAlign: "center" }}>{item.qty}</span>
                        <button type="button" className="btn btn-light btn-sm" onClick={() => updateCartQty(item.product.id, 1)} style={{ width: "26px", height: "26px", padding: 0 }}>+</button>
                      </div>

                      <div style={{ textAlign: "right", minWidth: "70px" }}>
                        <strong style={{ fontSize: "14px", color: "var(--primary)" }}>₹{item.product.price * item.qty}</strong>
                        <button type="button" style={{ background: "none", border: "none", color: "#e03131", fontSize: "11.5px", cursor: "pointer", display: "block", marginTop: "2px" }} onClick={() => removeFromCart(item.product.id)}>
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* MINIMALIST COUPON SECTION */}
                <div style={{ borderTop: "1px dashed var(--border-color)", paddingTop: "14px", marginBottom: "24px" }}>
                  {!appliedCouponName ? (
                    !showCouponInput ? (
                      <button 
                        type="button" 
                        onClick={() => setShowCouponInput(true)}
                        style={{ background: "none", border: "none", color: "var(--primary)", fontSize: "12.5px", fontWeight: 600, cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: "6px" }}
                      >
                        <i className="fas fa-tag"></i> Have a promo code / coupon?
                      </button>
                    ) : (
                      <div style={{ display: "flex", gap: "8px", maxWidth: "340px", alignItems: "center" }}>
                        <input 
                          type="text" 
                          placeholder="Promo code (AYUR10, AYURMED20)" 
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          style={{ padding: "6px 10px", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)", fontSize: "12px", textTransform: "uppercase", flex: 1 }}
                        />
                        <button type="button" className="btn btn-outline btn-sm" onClick={() => handleApplyCoupon()} style={{ padding: "6px 12px", fontSize: "12px" }}>
                          Apply
                        </button>
                        <button type="button" onClick={() => setShowCouponInput(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", fontSize: "14px", cursor: "pointer" }}>&times;</button>
                      </div>
                    )
                  ) : (
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#2b8a3e", fontWeight: 600 }}>
                      <i className="fas fa-check-circle"></i> Applied: {appliedCouponName}
                      <button type="button" onClick={() => { setAppliedDiscount(0); setAppliedCouponName(""); }} style={{ background: "none", border: "none", color: "#e03131", fontSize: "11.5px", cursor: "pointer", marginLeft: "6px" }}>(Remove)</button>
                    </div>
                  )}
                  {couponError && <span style={{ fontSize: "11.5px", color: "#e03131", display: "block", marginTop: "4px" }}>{couponError}</span>}
                </div>

                {/* Step 1 Next Button */}
                <button type="button" className="btn btn-primary" onClick={() => setCurrentStep(2)} style={{ width: "100%", padding: "13px", fontSize: "14px", fontWeight: 700 }}>
                  Proceed to Shipping Address <i className="fas fa-arrow-right" style={{ marginLeft: "6px" }}></i>
                </button>
              </div>
            )}

            {/* STEP 2: SHIPPING ADDRESS */}
            {currentStep === 2 && (
              <div style={{ background: "var(--white)", padding: "24px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)", boxShadow: "var(--shadow-sm)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border-color)", paddingBottom: "12px", marginBottom: "16px" }}>
                  <h3 style={{ margin: 0, fontSize: "16.5px", color: "var(--primary)", display: "flex", alignItems: "center", gap: "8px" }}>
                    <i className="fas fa-truck"></i> Step 2: Delivery Shipping Address
                  </h3>
                </div>

                <div className="address-form-row-2">
                  <div className="form-group">
                    <label style={{ fontSize: "12.5px", fontWeight: 600, display: "block", marginBottom: "4px" }}>Recipient Full Name</label>
                    <input type="text" required value={shippingAddress.fullName} onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })} style={{ width: "100%", padding: "10px", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)", fontSize: "13px" }} />
                  </div>
                  <div className="form-group">
                    <label style={{ fontSize: "12.5px", fontWeight: 600, display: "block", marginBottom: "4px" }}>Phone Number</label>
                    <input type="tel" required value={shippingAddress.phone} onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })} style={{ width: "100%", padding: "10px", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)", fontSize: "13px" }} />
                  </div>
                </div>

                <div className="form-group" style={{ marginTop: "12px" }}>
                  <label style={{ fontSize: "12.5px", fontWeight: 600, display: "block", marginBottom: "4px" }}>Flat / Street Address</label>
                  <input type="text" required value={shippingAddress.street} onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })} style={{ width: "100%", padding: "10px", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)", fontSize: "13px" }} />
                </div>

                <div className="address-form-row-3">
                  <div className="form-group">
                    <label style={{ fontSize: "12.5px", fontWeight: 600, display: "block", marginBottom: "4px" }}>City</label>
                    <input type="text" required value={shippingAddress.city} onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })} style={{ width: "100%", padding: "10px", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)", fontSize: "13px" }} />
                  </div>
                  <div className="form-group">
                    <label style={{ fontSize: "12.5px", fontWeight: 600, display: "block", marginBottom: "4px" }}>State</label>
                    <input type="text" required value={shippingAddress.state} onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })} style={{ width: "100%", padding: "10px", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)", fontSize: "13px" }} />
                  </div>
                  <div className="form-group">
                    <label style={{ fontSize: "12.5px", fontWeight: 600, display: "block", marginBottom: "4px" }}>Pincode</label>
                    <input type="text" required value={shippingAddress.pincode} onChange={(e) => setShippingAddress({ ...shippingAddress, pincode: e.target.value })} style={{ width: "100%", padding: "10px", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)", fontSize: "13px" }} />
                  </div>
                </div>

                <div style={{ display: "flex", gap: "12px" }}>
                  <button type="button" className="btn btn-outline" onClick={() => setCurrentStep(1)} style={{ padding: "12px 20px", fontSize: "13px" }}>
                    <i className="fas fa-arrow-left" style={{ marginRight: "6px" }}></i> Back to Checklist
                  </button>
                  <button type="button" className="btn btn-primary" onClick={() => setCurrentStep(3)} style={{ flex: 1, padding: "12px", fontSize: "13.5px", fontWeight: 700 }}>
                    Proceed to Payment <i className="fas fa-arrow-right" style={{ marginLeft: "6px" }}></i>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: PAYMENT METHOD & PLACE ORDER */}
            {currentStep === 3 && (
              <div style={{ background: "var(--white)", padding: "24px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)", boxShadow: "var(--shadow-sm)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border-color)", paddingBottom: "12px", marginBottom: "16px" }}>
                  <h3 style={{ margin: 0, fontSize: "16.5px", color: "var(--primary)", display: "flex", alignItems: "center", gap: "8px" }}>
                    <i className="fas fa-credit-card"></i> Step 3: Payment Method & Finalize
                  </h3>
                </div>

                <div className="payment-methods-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "10px", marginBottom: "20px" }}>
                  {[
                    { id: "upi", label: "UPI / QR Code", icon: "fa-qrcode" },
                    { id: "card", label: "Credit/Debit Card", icon: "fa-credit-card" },
                    { id: "netbanking", label: "Net Banking", icon: "fa-university" },
                    { id: "cod", label: "Cash on Delivery", icon: "fa-money-bill-wave" }
                  ].map(method => (
                    <div 
                      key={method.id} 
                      onClick={() => setPaymentMethod(method.id)}
                      style={{
                        padding: "12px 8px", border: "1px solid", borderRadius: "var(--radius-sm)", cursor: "pointer",
                        borderColor: paymentMethod === method.id ? "var(--primary)" : "var(--border-color)",
                        backgroundColor: paymentMethod === method.id ? "#e6f7f5" : "var(--white)",
                        color: paymentMethod === method.id ? "var(--primary)" : "var(--text-dark)",
                        textAlign: "center"
                      }}
                    >
                      <i className={`fas ${method.icon}`} style={{ fontSize: "18px", display: "block", marginBottom: "4px" }}></i>
                      <strong style={{ fontSize: "12px" }}>{method.label}</strong>
                    </div>
                  ))}
                </div>

                {paymentMethod === "upi" && (
                  <div style={{ marginBottom: "20px", padding: "12px", backgroundColor: "#f8faf9", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)" }}>
                    <label style={{ fontSize: "12px", fontWeight: 600, display: "block", marginBottom: "4px" }}>Enter Virtual Payment Address (UPI ID)</label>
                    <input type="text" value={upiId} onChange={(e) => setUpiId(e.target.value)} style={{ width: "100%", padding: "8px 12px", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)", fontSize: "12.5px" }} />
                  </div>
                )}

                <div style={{ display: "flex", gap: "12px" }}>
                  <button type="button" className="btn btn-outline" onClick={() => setCurrentStep(2)} style={{ padding: "12px 20px", fontSize: "13px" }}>
                    <i className="fas fa-arrow-left" style={{ marginRight: "6px" }}></i> Back to Address
                  </button>
                  <button type="button" className="btn btn-primary" onClick={handlePlaceOrder} style={{ flex: 1, padding: "12px", fontSize: "14px", fontWeight: 700, boxShadow: "0 6px 20px rgba(10, 125, 119, 0.3)" }}>
                    <i className="fas fa-lock" style={{ marginRight: "6px" }}></i> Place Order (₹{grandTotal})
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* RIGHT COLUMN: ORDER SUMMARY SIDEBAR */}
          <div>
            <div style={{ position: "sticky", top: "110px", background: "var(--white)", padding: "20px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)", boxShadow: "0 10px 30px rgba(0,0,0,0.06)" }}>
              <h3 style={{ margin: "0 0 14px 0", fontSize: "16px", color: "var(--primary)", borderBottom: "1px solid var(--border-color)", paddingBottom: "8px" }}>
                Order Summary
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "13px", marginBottom: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-dark)" }}>
                  <span>Items Subtotal:</span>
                  <span>₹{subtotal}</span>
                </div>

                {discountAmount > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", color: "#2b8a3e", fontWeight: 600 }}>
                    <span>Promo Discount:</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}

                <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-dark)" }}>
                  <span>Delivery Charges:</span>
                  <span>{deliveryCharge === 0 ? <strong style={{ color: "#2b8a3e" }}>FREE</strong> : `₹${deliveryCharge}`}</span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-dark)" }}>
                  <span>GST (5%):</span>
                  <span>₹{tax}</span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", borderTop: "2px solid var(--border-color)", paddingTop: "10px", marginTop: "4px", fontSize: "16px", fontWeight: 700, color: "var(--primary)" }}>
                  <span>Grand Total:</span>
                  <span>₹{grandTotal}</span>
                </div>
              </div>

              <div style={{ textAlign: "center", fontSize: "11px", color: "var(--text-muted)", paddingTop: "10px", borderTop: "1px solid var(--border-color)" }}>
                <i className="fas fa-shield-alt" style={{ color: "var(--primary)", marginRight: "4px" }}></i> 256-bit SSL Encrypted Payment
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
