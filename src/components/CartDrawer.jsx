import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const CartDrawer = () => {
  const { cart, isCartOpen, setIsCartOpen, updateCartQty, removeFromCart } = useApp();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.qty), 0);
  const tax = Math.round(subtotal * 0.05);
  const grandtotal = subtotal + tax;

  return (
    <div className="modal-overlay active" style={{ zIndex: 9999 }}>
      <div className="cart-sidebar-dialog">
        <div className="cart-header">
          <h3><i className="fas fa-shopping-basket"></i> Your Shopping Basket</h3>
          <button className="close-cart-btn" onClick={() => setIsCartOpen(false)}>&times;</button>
        </div>

        <div className="cart-body">
          {cart.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 20px", color: "var(--text-muted)" }}>
              <i className="fas fa-shopping-cart" style={{ fontSize: "40px", marginBottom: "12px", color: "var(--border-color)" }}></i>
              <p>Your basket is currently empty.</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.product.id} className="cart-item-row" style={{ display: "flex", gap: "12px", padding: "12px 0", borderBottom: "1px solid var(--border-color)", alignItems: "center" }}>
                <img src={item.product.image} alt={item.product.name} style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "6px" }} />
                <div style={{ flexGrow: 1 }}>
                  <h4 style={{ fontSize: "13.5px", margin: 0, color: "var(--text-dark)" }}>{item.product.name}</h4>
                  <span style={{ fontSize: "12px", color: "var(--primary)", fontWeight: 600 }}>₹{item.product.price}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <button className="btn btn-light btn-sm" onClick={() => updateCartQty(item.product.id, -1)}>-</button>
                  <span style={{ fontSize: "13px", fontWeight: 600, padding: "0 4px" }}>{item.qty}</span>
                  <button className="btn btn-light btn-sm" onClick={() => updateCartQty(item.product.id, 1)}>+</button>
                  <button className="btn btn-sm" style={{ color: "#e03131", background: "none", border: "none", cursor: "pointer", marginLeft: "4px" }} onClick={() => removeFromCart(item.product.id)}>
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-summary-rows">
              <div className="summary-row"><span>Subtotal:</span><span>₹{subtotal}</span></div>
              <div className="summary-row"><span>GST (5%):</span><span>₹{tax}</span></div>
              <div className="summary-row total-row"><span>Total Payable:</span><span>₹{grandtotal}</span></div>
            </div>
            <button className="btn btn-primary" onClick={() => { setIsCartOpen(false); navigate('/cart'); }} style={{ width: "100%", padding: "14px", marginTop: "12px" }}>
              Proceed to Full Checkout <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
