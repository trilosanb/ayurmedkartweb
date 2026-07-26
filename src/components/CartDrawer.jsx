import React from 'react';
import { useApp } from '../context/AppContext';

export const CartDrawer = () => {
  const { cart, isCartOpen, setIsCartOpen, updateCartQty, removeFromCart, processCheckout } = useApp();

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.qty), 0);
  const tax = Math.round(subtotal * 0.05);
  const grandtotal = subtotal + tax;

  return (
    <div class="modal-overlay active" style={{ zIndex: 9999 }}>
      <div class="cart-sidebar-dialog">
        <div class="cart-header">
          <h3><i class="fas fa-shopping-basket"></i> Your Shopping Basket</h3>
          <button class="close-cart-btn" onClick={() => setIsCartOpen(false)}>&times;</button>
        </div>

        <div class="cart-body">
          {cart.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 20px", color: "var(--text-muted)" }}>
              <i class="fas fa-shopping-cart" style={{ fontSize: "40px", marginBottom: "12px", color: "var(--border-color)" }}></i>
              <p>Your basket is currently empty.</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.product.id} class="cart-item-row" style={{ display: "flex", gap: "12px", padding: "12px 0", borderBottom: "1px solid var(--border-color)", alignItems: "center" }}>
                <img src={item.product.image} alt={item.product.name} style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "6px" }} />
                <div style={{ flexGrow: 1 }}>
                  <h4 style={{ fontSize: "13.5px", margin: 0, color: "var(--text-dark)" }}>{item.product.name}</h4>
                  <span style={{ fontSize: "12px", color: "var(--primary)", fontWeight: 600 }}>₹{item.product.price}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <button class="btn btn-light btn-sm" onClick={() => updateCartQty(item.product.id, -1)}>-</button>
                  <span style={{ fontSize: "13px", fontWeight: 600, padding: "0 4px" }}>{item.qty}</span>
                  <button class="btn btn-light btn-sm" onClick={() => updateCartQty(item.product.id, 1)}>+</button>
                  <button class="btn btn-sm" style={{ color: "#e03131", background: "none", border: "none", cursor: "pointer", marginLeft: "4px" }} onClick={() => removeFromCart(item.product.id)}>
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div class="cart-footer">
            <div class="cart-summary-rows">
              <div class="summary-row"><span>Subtotal:</span><span>₹{subtotal}</span></div>
              <div class="summary-row"><span>GST (5%):</span><span>₹{tax}</span></div>
              <div class="summary-row total-row"><span>Total Payable:</span><span>₹{grandtotal}</span></div>
            </div>
            <button class="btn btn-primary" onClick={processCheckout} style={{ width: "100%", padding: "14px", marginTop: "12px" }}>
              Proceed to Secure Payment <i class="fas fa-arrow-right"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
