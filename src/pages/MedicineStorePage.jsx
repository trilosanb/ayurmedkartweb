import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { MEDICINES } from '../data/medicines';

export const MedicineStorePage = () => {
  const { addToCart, startVideoCall } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortVal, setSortVal] = useState("default");
  const [activeCondition, setActiveCondition] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      badge: "AUTHENTIC KERALA AYURVEDA",
      title: "Arya Vaidya Sala Kottakkal Formulations",
      subtitle: "Discover authentic classical Kashayams, Arishtams, Churnams, and Oils crafted using centuries-old Vedic recipes.",
      bgImage: "/kottakkal_hero.png",
      tag: "Direct Pharmacy Sourced"
    },
    {
      badge: "NATURAL IMMUNITY & VITALITY",
      title: "Rejuvenate Your Body with Pure Herbs",
      subtitle: "Handpicked Chyawanprash, organic Amla, Giloy, and Ashwagandha to fortify your immune system naturally.",
      bgImage: "/chyawanprash_hero.png",
      tag: "100% Herbal & Pure"
    },
    {
      badge: "JOINT CARE & RECOVERY",
      title: "Traditional Pain Relief & Dhanwantaram Oils",
      subtitle: "Fast-acting relief for joint pain, muscle stiffness, and backache with classical warm oil therapy.",
      bgImage: "/dhanwantaram_hero.png",
      tag: "Certified Clinical Efficacy"
    }
  ];

  // Auto slide interval
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const filteredMedicines = MEDICINES.filter(med => {
    if (searchQuery && !med.name.toLowerCase().includes(searchQuery.toLowerCase()) && !med.manufacturer.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (activeCondition !== "all" && med.condition !== activeCondition) {
      return false;
    }
    if (selectedBrand && med.manufacturer !== selectedBrand) {
      return false;
    }
    return true;
  });

  if (sortVal === "low-high") {
    filteredMedicines.sort((a, b) => a.price - b.price);
  } else if (sortVal === "high-low") {
    filteredMedicines.sort((a, b) => b.price - a.price);
  } else if (sortVal === "rating") {
    filteredMedicines.sort((a, b) => b.rating - a.rating);
  }

  const famousBrands = [
    { name: "Kottakkal", brandKey: "Himalaya Wellness", desc: "Arya Vaidya Sala", badge: "Kerala" },
    { name: "Dabur", brandKey: "Dabur", desc: "Trusted Since 1884", badge: "Classic" },
    { name: "Baidyanath", brandKey: "Baidyanath", desc: "Kolkata Hub", badge: "Heritage" },
    { name: "Kerala Ayur", brandKey: "Kerala Ayurveda", desc: "Aluva Pharmacy", badge: "Authentic" },
    { name: "Zandu", brandKey: "Zandu", desc: "Healthcare Solutions", badge: "Popular" },
    { name: "AVP", brandKey: "AyurVeda Research", desc: "Coimbatore Pharmacy", badge: "Pure" }
  ];

  const whyAyurvedaPoints = [
    {
      icon: "fa-leaf",
      title: "5,000+ Years Ancient Wisdom",
      text: "Formulated based on classical Charaka and Sushruta Samhitas for authentic, holistic body wellness."
    },
    {
      icon: "fa-bullseye",
      title: "Root-Cause Dosha Balance",
      text: "Targets the core imbalance in Vata, Pitta, and Kapha rather than temporarily masking symptom triggers."
    },
    {
      icon: "fa-seedling",
      title: "100% Herbal & Zero Toxins",
      text: "Wild-harvested botanical ingredients, free from synthetic chemicals, artificial colors, or heavy metals."
    },
    {
      icon: "fa-user-md",
      title: "Certified Doctor Consultations",
      text: "Get custom dosage plans and diet prescriptions directly from verified BAMS & MD Ayurvedic specialists."
    }
  ];

  const customerReviews = [
    {
      name: "Rahul Kumar",
      location: "New Delhi",
      rating: 5,
      date: "Verified Buyer",
      text: "AyurMedKart delivered original Kottakkal Kashayam directly to my home. The fast delivery and free prescription checking made my ordering effortless!",
      product: "Ashwagandha Capsules"
    },
    {
      name: "Dr. Anjali Sharma",
      location: "Bengaluru",
      rating: 5,
      date: "Verified Patient",
      text: "I consulted Dr. Aravind Sharma via the E-consultation video feature for gastric acidity. The prescribed diet and Triphala resolved my issues in 10 days.",
      product: "E-Consultation & Triphala"
    },
    {
      name: "Meenakshi Sundaram",
      location: "Chennai",
      rating: 5,
      date: "Verified Buyer",
      text: "The Dhanwantaram oil provided instant relief for my mother's joint stiffness. Excellent packaging and authentic products guaranteed.",
      product: "Dhanwantaram Joint Oil"
    }
  ];

  return (
    <div className="home-page-wrapper">
      {/* 1. HERO SLIDER SECTION */}
      <section className="full-bg-hero-section">
        {slides.map((slide, idx) => (
          <div 
            key={idx} 
            className={`full-hero-slide ${idx === activeSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.bgImage})` }}
          >
            <div className="hero-dark-overlay"></div>
            <div className="container hero-content-container">
              <div className="hero-text-box">
                <span className="hero-gold-badge">
                  <i className="fas fa-certificate" style={{ marginRight: '6px' }}></i> {slide.badge}
                </span>
                <h1 className="hero-main-title">{slide.title}</h1>
                <p className="hero-subtitle">{slide.subtitle}</p>

                <div className="hero-cta-group">
                  <button className="btn btn-primary btn-hero" onClick={() => {
                    const storeElem = document.getElementById("catalog-storefront");
                    if (storeElem) storeElem.scrollIntoView({ behavior: 'smooth' });
                  }}>
                    <i className="fas fa-shopping-bag" style={{ marginRight: '8px' }}></i> Shop Storefront
                  </button>
                  <button className="btn btn-hero-outline" onClick={() => startVideoCall("Dr. Aravind Sharma")}>
                    <i className="fas fa-video" style={{ marginRight: '8px' }}></i> Consult Doctor Live
                  </button>
                </div>

                {/* Hero Stats */}
                <div className="hero-stats-row">
                  <div className="hero-stat-item">
                    <strong>50,000+</strong>
                    <span>Happy Patients</span>
                  </div>
                  <div className="hero-stat-divider"></div>
                  <div className="hero-stat-item">
                    <strong>100%</strong>
                    <span>Authentic Formulations</span>
                  </div>
                  <div className="hero-stat-divider"></div>
                  <div className="hero-stat-item">
                    <strong>4.9 ★</strong>
                    <span>Doctor Rating</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slider Controls */}
        <button className="hero-arrow-btn prev" onClick={() => setActiveSlide((activeSlide - 1 + slides.length) % slides.length)}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <button className="hero-arrow-btn next" onClick={() => setActiveSlide((activeSlide + 1) % slides.length)}>
          <i className="fas fa-chevron-right"></i>
        </button>

        {/* Slide Indicators */}
        <div className="hero-dots-bar">
          {slides.map((_, idx) => (
            <span 
              key={idx} 
              className={`hero-dot ${idx === activeSlide ? 'active' : ''}`}
              onClick={() => setActiveSlide(idx)}
            ></span>
          ))}
        </div>
      </section>

      {/* 2. TRUST BADGES BAR */}
      <div className="trust-badges-bar">
        <div className="container trust-badges-grid">
          <div className="trust-badge-item">
            <i className="fas fa-shield-alt"></i>
            <div><h4>100% Authentic</h4><p>Direct from certified pharmacy</p></div>
          </div>
          <div className="trust-badge-item">
            <i className="fas fa-shipping-fast"></i>
            <div><h4>Free Express Shipping</h4><p>On all orders above ₹500</p></div>
          </div>
          <div className="trust-badge-item">
            <i className="fas fa-file-medical"></i>
            <div><h4>Prescription Vault</h4><p>Secure clinical verification</p></div>
          </div>
          <div className="trust-badge-item">
            <i className="fas fa-sync-alt"></i>
            <div><h4>Easy Returns</h4><p>Hassle-free 7-day replacement</p></div>
          </div>
        </div>
      </div>

      {/* 3. MEDICINE STORE / CATALOG STOREFRONT SECTION (BRING STORE NEXT TO HERO) */}
      <section id="catalog-storefront" className="storefront-section" style={{ paddingTop: "40px" }}>
        <div className="container">
          <div className="section-header-box text-center">
            <span className="section-pill">AUTHENTIC FORMULATIONS</span>
            <h2>Ayurvedic Medicine Store</h2>
            <p className="section-desc">Explore classical formulations, herbal supplements, and OTC wellness care.</p>
          </div>

          {/* Search & Sort Controls */}
          <div className="search-sort-bar">
            <div className="search-input-wrapper">
              <i className="fas fa-search"></i>
              <input 
                type="text" 
                placeholder="Search medicines by name, ingredients (e.g. Ashwagandha, Amla, Triphala)..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button className="clear-search-btn" onClick={() => setSearchQuery("")}>&times;</button>
              )}
            </div>

            <select className="sort-select" value={sortVal} onChange={(e) => setSortVal(e.target.value)}>
              <option value="default">Sort by: Relevance</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          {/* Condition Program Tags */}
          <div className="program-tags">
            {[
              { id: "all", label: "All Formulations" },
              { id: "diabetes", label: "Diabetes Care" },
              { id: "digestion", label: "Digestive Care" },
              { id: "immunity", label: "Immunity Boosters" },
              { id: "women", label: "Women's Health" },
              { id: "stress", label: "Stress & Sleep" },
              { id: "skin", label: "Skin & Hair Care" }
            ].map(tag => (
              <button 
                key={tag.id} 
                className={`tag-btn ${activeCondition === tag.id ? 'active' : ''}`}
                onClick={() => setActiveCondition(tag.id)}
              >
                {tag.label}
              </button>
            ))}
          </div>

          {/* Product Cards Grid */}
          <div className="product-grid">
            {filteredMedicines.length === 0 ? (
              <div className="no-products-box" style={{ gridColumn: "1/-1" }}>
                <i className="fas fa-search"></i>
                <p>No Ayurvedic products found matching your search. Try resetting filters.</p>
                <button className="btn btn-outline" onClick={() => { setSearchQuery(""); setActiveCondition("all"); setSelectedBrand(""); }}>Reset All Filters</button>
              </div>
            ) : (
              filteredMedicines.map(med => (
                <div key={med.id} className="product-card">
                  <div className="product-badge">-{med.discount}%</div>
                  <div className={`prescription-badge ${med.prescriptionRequired ? '' : 'otc'}`}>
                    <i className={`fas ${med.prescriptionRequired ? 'fa-prescription-bottle-alt' : 'fa-check-circle'}`}></i>
                    {med.prescriptionRequired ? 'Rx Required' : 'OTC'}
                  </div>
                  <div className="product-img-box">
                    <img src={med.image} alt={med.name} />
                  </div>
                  <div className="product-body">
                    <div className="product-mfg">{med.manufacturer}</div>
                    <h4 className="product-title">{med.name}</h4>
                    <div className="product-rating">
                      <span className="stars">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                      </span>
                      <span className="rating-count">({med.reviewsCount})</span>
                    </div>
                    <div className="product-pricing">
                      <span className="current-price">₹{med.price}</span>
                      <span className="original-price">₹{med.originalPrice}</span>
                    </div>
                    <div className="product-actions">
                      <button className="btn btn-primary btn-sm" onClick={() => addToCart(med.id)}>
                        <i className="fas fa-shopping-cart"></i> Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* 4. BRAND SHOWCASE SECTION */}
      <section className="brand-showcase-section">
        <div className="container">
          <div className="section-header-box text-center">
            <span className="section-pill">DIRECT PHARMACY PARTNERS</span>
            <h2>Shop Official Ayurvedic Brands</h2>
            <p className="section-desc">Select your preferred classical Ayurvedic manufacturer to filter verified medicines.</p>
          </div>

          <div className="brand-cards-grid">
            {famousBrands.map((b, idx) => (
              <div 
                key={idx} 
                className={`brand-showcase-card ${selectedBrand === b.brandKey ? 'active' : ''}`}
                onClick={() => setSelectedBrand(selectedBrand === b.brandKey ? "" : b.brandKey)}
              >
                <div className="brand-card-top">
                  <span className="brand-badge-pill">{b.badge}</span>
                  <div className="brand-circle-avatar">{b.name.substring(0, 2).toUpperCase()}</div>
                </div>
                <h4>{b.name}</h4>
                <p>{b.desc}</p>
                <button className="btn-brand-filter">
                  {selectedBrand === b.brandKey ? 'Showing Products' : 'View Products'} <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE AYURVEDA SECTION */}
      <section className="why-ayurveda-section">
        <div className="container">
          <div className="section-header-box text-center">
            <span className="section-pill">TIMLESS HEALING WISDOM</span>
            <h2>Why Choose Classical Ayurvedic Medicine?</h2>
            <p className="section-desc">Experience natural, sustainable wellness crafted by nature and perfected by clinical tradition over thousands of years.</p>
          </div>

          <div className="why-ayurveda-grid">
            {whyAyurvedaPoints.map((pt, idx) => (
              <div key={idx} className="why-card">
                <div className="why-icon-circle">
                  <i className={`fas ${pt.icon}`}></i>
                </div>
                <h3>{pt.title}</h3>
                <p>{pt.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PATIENT REVIEWS & TESTIMONIALS SECTION */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header-box text-center">
            <span className="section-pill">PATIENT EXPERIENCES</span>
            <h2>Loved by Thousands of Patients Across India</h2>
            <p className="section-desc">Read verified reviews from patients who transformed their health using classical Ayurvedic medicine.</p>
          </div>

          <div className="testimonials-grid">
            {customerReviews.map((rev, idx) => (
              <div key={idx} className="testimonial-card">
                <div className="testimonial-header">
                  <div className="testi-avatar">{rev.name.substring(0, 2).toUpperCase()}</div>
                  <div>
                    <h4>{rev.name}</h4>
                    <span className="testi-location">{rev.location} • <span className="verified-tag"><i className="fas fa-check-circle"></i> {rev.date}</span></span>
                  </div>
                </div>
                <div className="testi-stars">
                  {"★".repeat(rev.rating)}
                </div>
                <p className="testi-text">"{rev.text}"</p>
                <div className="testi-product-tag">
                  <i className="fas fa-pills"></i> Ordered: <strong>{rev.product}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. INTERACTIVE DOSHA & TELEHEALTH CTA BANNER */}
      <section className="dosha-cta-banner">
        <div className="container">
          <div className="dosha-banner-box">
            <div className="dosha-banner-text">
              <span className="banner-pill">FREE TELEHEALTH CONSULTATION</span>
              <h2>Not Sure Which Formulation Suits Your Dosha?</h2>
              <p>Schedule a 1-on-1 video call with our BAMS/MD Ayurvedic specialists for personalized diagnosis and custom prescriptions.</p>
            </div>
            <div className="dosha-banner-actions">
              <button className="btn btn-gold-lg" onClick={() => startVideoCall("Dr. Aravind Sharma")}>
                <i className="fas fa-calendar-alt" style={{ marginRight: '8px' }}></i> Book Video Session
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
