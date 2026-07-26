import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer>
      <div class="container footer-grid">
        <div class="footer-col brand-col">
          <Link to="/" class="logo" style={{ marginBottom: "16px" }}>
            <img src="/logo.png" alt="AyurMedKart" style={{ height: "36px" }} />
            Ayur<span>MedKart</span>
          </Link>
          <p>India's trusted platform for classical Ayurvedic formulations and telemedicine consultation.</p>
        </div>

        <div class="footer-col">
          <h4>Navigation</h4>
          <ul>
            <li><Link to="/">Medicine Store</Link></li>
            <li><Link to="/consultation">E-consultation</Link></li>
            <li><Link to="/dashboard">User Portal</Link></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Ayurvedic Programs</h4>
          <ul>
            <li><Link to="/">Diabetes Care</Link></li>
            <li><Link to="/">Digestive Care</Link></li>
            <li><Link to="/">Immunity Boosters</Link></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Support & Contact</h4>
          <ul>
            <li><i class="fas fa-phone-alt"></i> +91 1800-AYUR-KART</li>
            <li><i class="fas fa-envelope"></i> care@ayurmedkart.com</li>
            <li><i class="fas fa-map-marker-alt"></i> AyurMedKart, Tezpur, Assam</li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="container copyright-row">
          <p>&copy; 2026 AyurMedKart. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};
