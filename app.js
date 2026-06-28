// Mock Medicine Database
const MEDICINES = [
  {
    id: 1,
    name: "Ashwagandha Capsules",
    manufacturer: "Himalaya Wellness",
    price: 250,
    originalPrice: 299,
    discount: 16,
    rating: 4.8,
    reviewsCount: 142,
    category: "immunity",
    condition: "stress",
    formulation: "capsule",
    prescriptionRequired: false,
    image: "https://images.unsplash.com/photo-1611070973770-b1a672610042?auto=format&fit=crop&q=80&w=300",
    ingredients: "Organic Ashwagandha (Withania somnifera) root extract - 250mg",
    benefits: "Reduces stress, anxiety, cortisol levels. Enhances strength, endurance, and general vitality.",
    dosage: "1-2 capsules twice daily with warm milk or water, or as directed by a physician.",
    precautions: "Consult a doctor if pregnant, lactating, or taking immunosuppressants.",
    reviews: [
      { author: "Rahul K.", rating: 5, text: "Excellent product! Noticed a huge drop in my daily anxiety levels within a week." },
      { author: "Anjali S.", rating: 4, text: "Very authentic. Helps me sleep better after stressful workdays." }
    ]
  },
  {
    id: 2,
    name: "Triphala Churna",
    manufacturer: "Dabur",
    price: 135,
    originalPrice: 150,
    discount: 10,
    rating: 4.6,
    reviewsCount: 218,
    category: "digestive",
    condition: "digestion",
    formulation: "powder",
    prescriptionRequired: false,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=300",
    ingredients: "Amla (Emblica officinalis), Haritaki (Terminalia chebula), Bibhitaki (Terminalia bellirica) in equal proportions.",
    benefits: "Gentle natural colon cleanser, relieves constipation, improves digestion and nutrient absorption.",
    dosage: "1/2 to 1 teaspoon (3-6g) with warm water at bedtime.",
    precautions: "Avoid during pregnancy. Overdose may cause loose motions.",
    reviews: [
      { author: "Amit P.", rating: 5, text: "The best natural remedy for chronic acidity and constipation. Highly recommended." }
    ]
  },
  {
    id: 3,
    name: "DiabeSmart Tablets",
    manufacturer: "AyurVeda Research",
    price: 450,
    originalPrice: 550,
    discount: 18,
    rating: 4.7,
    reviewsCount: 89,
    category: "preventive",
    condition: "diabetes",
    formulation: "tablet",
    prescriptionRequired: true, // Requires Prescription
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=300",
    ingredients: "Gurmar (Gymnema sylvestre) - 150mg, Karela (Momordica charantia) - 100mg, Jamun Seed - 100mg, Methi (Fenugreek) - 50mg.",
    benefits: "Regulates blood sugar levels, improves insulin sensitivity, and prevents long-term diabetic complications.",
    dosage: "1-2 tablets 30 minutes before breakfast and dinner, or as prescribed.",
    precautions: "Requires strict prescription validation. Monitor blood glucose levels regularly.",
    reviews: [
      { author: "Karan Johar", rating: 5, text: "Helped stabilize my HbA1c levels along with lifestyle changes. Trusted Ayurvedic support." }
    ]
  },
  {
    id: 4,
    name: "Chyawanprash Special",
    manufacturer: "Baidyanath",
    price: 320,
    originalPrice: 360,
    discount: 11,
    rating: 4.9,
    reviewsCount: 512,
    category: "immunity",
    condition: "immunity",
    formulation: "paste",
    prescriptionRequired: false,
    image: "https://images.unsplash.com/photo-1607619056574-7b8d304f3c6f?auto=format&fit=crop&q=80&w=300",
    ingredients: "Amla, Ashtavarga herbs, Pippali, Kesar, Cardamom, Honey, Ghee.",
    benefits: "Boosts respiratory immunity, protects against seasonal coughs/colds, improves strength and energy.",
    dosage: "1 tablespoon twice daily, preferably with warm milk.",
    precautions: "Diabetic patients should use sugar-free variants.",
    reviews: [
      { author: "Sonia G.", rating: 5, text: "A winter essential for the entire family. Tastes fresh and premium." }
    ]
  },
  {
    id: 5,
    name: "ArthriCare Pain Balm",
    manufacturer: "Kerala Ayurveda",
    price: 110,
    originalPrice: 125,
    discount: 12,
    rating: 4.5,
    reviewsCount: 96,
    category: "preventive",
    condition: "arthritis",
    formulation: "balm",
    prescriptionRequired: false,
    image: "https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&q=80&w=300",
    ingredients: "Mahanarayan Oil, Shallaki, Eucalyptus oil, Camphor, Menthol.",
    benefits: "Instant relief from joint stiffness, muscle spasms, osteoarthritis pain, and backache.",
    dosage: "Apply gently to the affected area 3-4 times a day. Do not apply on open wounds.",
    precautions: "For external use only. Wash hands after application.",
    reviews: [
      { author: "Ramesh Iyer", rating: 4, text: "Gives quick warming relief from knee pain. Very herbal aroma." }
    ]
  },
  {
    id: 6,
    name: "Brahmi Memory Syrup",
    manufacturer: "Zandu",
    price: 180,
    originalPrice: 199,
    discount: 9,
    rating: 4.4,
    reviewsCount: 74,
    category: "preventive",
    condition: "stress",
    formulation: "syrup",
    prescriptionRequired: false,
    image: "https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&q=80&w=300",
    ingredients: "Brahmi (Bacopa monnieri) extract - 400mg, Shankhpushpi, Jyotishmati.",
    benefits: "Enhances cognitive function, focus, memory retention, and calms hyperactive mental loops.",
    dosage: "Children: 1 tsp twice a day; Adults: 2 tsp twice a day after meals.",
    precautions: "Keep out of reach of infants. Safe for long-term usage.",
    reviews: [
      { author: "Meena B.", rating: 5, text: "Superb for students. Helps improve focus during examinations." }
    ]
  },
  {
    id: 7,
    name: "Shatavari Hormone Balance",
    manufacturer: "Himalaya Wellness",
    price: 220,
    originalPrice: 250,
    discount: 12,
    rating: 4.8,
    reviewsCount: 104,
    category: "women",
    condition: "women",
    formulation: "tablet",
    prescriptionRequired: false,
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=300",
    ingredients: "Shatavari (Asparagus racemosus) root extract - 250mg.",
    benefits: "Supports female reproductive health, balances hormones, regulates periods, and eases PMS symptoms.",
    dosage: "1 tablet twice daily with water, or as advised.",
    precautions: "Consult your doctor if pregnant or conceiving.",
    reviews: [
      { author: "Deepika R.", rating: 5, text: "Helped balance my hormonal breakouts. Standard Himalaya quality." }
    ]
  },
  {
    id: 8,
    name: "LiverCure Detox Syrup",
    manufacturer: "Dabur",
    price: 160,
    originalPrice: 180,
    discount: 11,
    rating: 4.6,
    reviewsCount: 115,
    category: "digestive",
    condition: "digestion",
    formulation: "syrup",
    prescriptionRequired: false,
    image: "https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&q=80&w=300",
    ingredients: "Bhringraj, Bhumi Amla, Giloy, Kalmegh, Punarnava, Kutki.",
    benefits: "Protects liver cells from toxins, improves appetite, digests fat, and combats sluggish liver.",
    dosage: "Adults: 2 teaspoons thrice daily before food.",
    precautions: "Shake well before use. Avoid alcohol during therapy.",
    reviews: [
      { author: "Vikram S.", rating: 4, text: "Excellent for bloating and heavy stomach after greasy food." }
    ]
  },
  {
    id: 9,
    name: "StressCalm Capsules",
    manufacturer: "AyurVeda Research",
    price: 490,
    originalPrice: 599,
    discount: 18,
    rating: 4.7,
    reviewsCount: 63,
    category: "preventive",
    condition: "stress",
    formulation: "capsule",
    prescriptionRequired: true, // Requires Prescription
    image: "https://images.unsplash.com/photo-1611070973770-b1a672610042?auto=format&fit=crop&q=80&w=300",
    ingredients: "Sarpagandha (Rauwolfia serpentina) - 100mg, Jatamansi - 150mg, Tagar - 100mg, Khurasani Ajwain - 50mg.",
    benefits: "Induces healthy sleep cycles, regulates nervous stress, and manages hypertension.",
    dosage: "1 capsule with water 1 hour before sleep, or as prescribed.",
    precautions: "Prescription only. May cause slight drowsiness; avoid driving.",
    reviews: [
      { author: "Kunal M.", rating: 5, text: "Finally found a safe Ayurvedic alternative to synthetic sleeping pills." }
    ]
  },
  {
    id: 10,
    name: "Neem & Turmeric Skin Cleanser",
    manufacturer: "Baidyanath",
    price: 190,
    originalPrice: 220,
    discount: 13,
    rating: 4.5,
    reviewsCount: 122,
    category: "skin",
    condition: "skin",
    formulation: "tablet",
    prescriptionRequired: false,
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=300",
    ingredients: "Neem (Azadirachta indica) leaf extract - 150mg, Haridra (Curcuma longa) - 100mg.",
    benefits: "Natural blood purifier, treats acne, controls excess sebum, and heals skin inflammation.",
    dosage: "1-2 tablets twice daily with water.",
    precautions: "Do not exceed recommended dose.",
    reviews: [
      { author: "Preeti V.", rating: 5, text: "Significantly cleared up my hormonal acne in 3 weeks. Skin feels glowing." }
    ]
  }
];

// App Global State (Refactored to E-commerce Only)
const STATE = {
  cart: [],
  uploadedPrescriptions: [
    {
      id: "UPL-981",
      fileName: "prescription_june2026.jpg",
      uploadDate: "2026-06-28",
      status: "Approved",
      reviewedBy: "Medical Board"
    }
  ],
  orders: [
    {
      id: "ORD-9901",
      date: "2026-06-25",
      items: [
        { name: "Ashwagandha Capsules", qty: 2, price: 250 },
        { name: "Chyawanprash Special", qty: 1, price: 320 }
      ],
      subtotal: 820,
      tax: 41,
      total: 861,
      status: "Shipped", // Placed, Packed, Shipped, Delivered
      stepIndex: 3
    }
  ],
  ehr: [
    { id: "EHR-101", fileName: "BloodReport_June2026.pdf", date: "2026-06-10", size: "1.2 MB" },
    { id: "EHR-102", fileName: "ThyroidPanel_May2026.pdf", date: "2026-05-02", size: "850 KB" }
  ],
  promoApplied: null,
  promoDiscount: 0,
  currentView: "shop",
  activeProductDetails: null,
  searchQuery: "",
  filters: {
    category: [],
    condition: [],
    formulation: [],
    minPrice: 0,
    maxPrice: 1000,
    prescription: "all"
  }
};

// Initialization
document.addEventListener("DOMContentLoaded", () => {
  initRouter();
  initHeaderScroll();
  initShopFilters();
  initCartListeners();
  initModals();
  initDashboardEvents();
  initAdminEvents();
  renderProducts();
  renderDashboard();
  renderAdmin();
  updateCartUI();

  // Floating background decoration
  createFloatingLeaves();
});

// Scroll Event
function initHeaderScroll() {
  const header = document.querySelector("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Mobile Menu Toggle
  const menuBtn = document.querySelector(".menu-btn");
  const nav = document.querySelector("nav");
  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("active");
    const icon = menuBtn.querySelector("i");
    if (nav.classList.contains("active")) {
      icon.className = "fas fa-times";
    } else {
      icon.className = "fas fa-bars";
    }
  });

  // Close nav on click
  document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
      const icon = menuBtn.querySelector("i");
      if (icon) icon.className = "fas fa-bars";
    });
  });
}

// Custom SPA Routing
function initRouter() {
  const links = document.querySelectorAll("[data-target]");
  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = link.getAttribute("data-target");
      navigate(target);
    });
  });

  // Handle CTA buttons routing
  document.addEventListener("click", (e) => {
    if (e.target.matches(".btn-shop-medicines")) {
      navigate("shop");
    }
    if (e.target.matches(".btn-upload-pres")) {
      openModal("prescription-upload-modal");
    }
  });
}

function navigate(viewName) {
  STATE.currentView = viewName;

  // Toggle active class on links
  document.querySelectorAll("[data-target]").forEach(link => {
    if (link.getAttribute("data-target") === viewName) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Toggle active class on view sections
  document.querySelectorAll(".view-section").forEach(section => {
    if (section.id === viewName) {
      section.style.display = "block";
      setTimeout(() => {
        section.classList.add("active");
      }, 50);
    } else {
      section.classList.remove("active");
      section.style.display = "none";
    }
  });

  window.scrollTo(0, 0);

  if (viewName === "dashboard") {
    renderDashboard();
  } else if (viewName === "admin") {
    renderAdmin();
  }
}

// Background Decoration - Floating Leaves
function createFloatingLeaves() {
  const container = document.querySelector(".floating-leaves");
  if (!container) return;

  const leafSVGs = [
    `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2C6.5 2 2 6.5 2 12c0 4.4 2.9 8.1 7 9.3V18c0-.6.4-1 1-1h4c.6 0 1 .4 1 1v3.3c4.1-1.2 7-4.9 7-9.3 0-5.5-4.5-10-10-10z"/></svg>`,
    `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L2 22M12 2C6 8 4 15 11 20c7-5 9-12 11-18z"/></svg>`
  ];

  for (let i = 0; i < 8; i++) {
    const leaf = document.createElement("div");
    leaf.className = "floating-leaf";
    leaf.innerHTML = leafSVGs[Math.floor(Math.random() * leafSVGs.length)];
    leaf.style.left = `${Math.random() * 95}%`;
    leaf.style.top = `${Math.random() * 90}%`;
    leaf.style.animationDelay = `${Math.random() * 5}s`;
    leaf.style.transform = `scale(${0.5 + Math.random() * 0.8})`;
    container.appendChild(leaf);
  }
}

// SHOP LOGIC - FILTERING & SEARCHING
function initShopFilters() {
  const searchInput = document.getElementById("search-products");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      STATE.searchQuery = e.target.value;
      renderProducts();
    });
  }

  const sortSelect = document.getElementById("sort-products");
  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      renderProducts();
    });
  }

  const checkboxes = document.querySelectorAll(".store-sidebar input[type='checkbox']");
  checkboxes.forEach(chk => {
    chk.addEventListener("change", () => {
      const type = chk.getAttribute("data-filter");
      const value = chk.value;

      if (chk.checked) {
        STATE.filters[type].push(value);
      } else {
        STATE.filters[type] = STATE.filters[type].filter(v => v !== value);
      }
      renderProducts();
    });
  });

  const minPrice = document.getElementById("price-min");
  const maxPrice = document.getElementById("price-max");
  if (minPrice && maxPrice) {
    minPrice.addEventListener("input", () => {
      STATE.filters.minPrice = parseFloat(minPrice.value) || 0;
      renderProducts();
    });
    maxPrice.addEventListener("input", () => {
      STATE.filters.maxPrice = parseFloat(maxPrice.value) || 1000;
      renderProducts();
    });
  }

  const clearBtn = document.getElementById("clear-filters");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      checkboxes.forEach(chk => chk.checked = false);
      if (minPrice) minPrice.value = "";
      if (maxPrice) maxPrice.value = "";
      STATE.filters = {
        category: [],
        condition: [],
        formulation: [],
        minPrice: 0,
        maxPrice: 1000,
        prescription: "all"
      };
      if (searchInput) searchInput.value = "";
      STATE.searchQuery = "";
      renderProducts();
    });
  }

  // Health Programs/Tags click filtering
  document.addEventListener("click", (e) => {
    // If it's a tag button
    const tag = e.target.closest(".tag-btn");
    if (tag) {
      const filterCond = tag.getAttribute("data-condition");
      
      // Update active tag button style
      document.querySelectorAll(".tag-btn").forEach(btn => btn.classList.remove("active"));
      tag.classList.add("active");

      // Filter catalog
      if (filterCond === "all") {
        STATE.filters.condition = [];
      } else {
        STATE.filters.condition = [filterCond];
      }
      renderProducts();
      return;
    }

    // If it's a footer program link
    const footerLink = e.target.closest(".footer-program-link");
    if (footerLink) {
      const filterCond = footerLink.getAttribute("data-condition");
      navigate("shop");
      
      // Update active tag button style
      document.querySelectorAll(".tag-btn").forEach(btn => {
        if (btn.getAttribute("data-condition") === filterCond) {
          btn.classList.add("active");
        } else {
          btn.classList.remove("active");
        }
      });

      if (filterCond === "all") {
        STATE.filters.condition = [];
      } else {
        STATE.filters.condition = [filterCond];
      }
      renderProducts();
      e.preventDefault();
    }
  });
}

function renderProducts() {
  const container = document.getElementById("products-container");
  if (!container) return;

  container.innerHTML = Array(4).fill(0).map(() => `
    <div class="skeleton-card">
      <div class="skeleton skeleton-img"></div>
      <div class="skeleton skeleton-text"></div>
      <div class="skeleton skeleton-text short"></div>
    </div>
  `).join("");

  setTimeout(() => {
    let filtered = MEDICINES.filter(med => {
      if (STATE.searchQuery && !med.name.toLowerCase().includes(STATE.searchQuery.toLowerCase()) && !med.manufacturer.toLowerCase().includes(STATE.searchQuery.toLowerCase())) {
        return false;
      }
      if (STATE.filters.category.length > 0 && !STATE.filters.category.includes(med.category)) {
        return false;
      }
      if (STATE.filters.condition.length > 0 && !STATE.filters.condition.includes(med.condition)) {
        return false;
      }
      if (STATE.filters.formulation.length > 0 && !STATE.filters.formulation.includes(med.formulation)) {
        return false;
      }
      if (med.price < STATE.filters.minPrice || med.price > STATE.filters.maxPrice) {
        return false;
      }
      return true;
    });

    const sortVal = document.getElementById("sort-products")?.value;
    if (sortVal === "low-high") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortVal === "high-low") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortVal === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);">
          <i class="fas fa-search" style="font-size: 40px; margin-bottom: 12px; color: var(--border-color);"></i>
          <p>No products found matching the criteria. Try clearing filters.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(med => {
      const isRx = med.prescriptionRequired;
      const starsArr = [];
      const roundedRating = Math.round(med.rating);
      for (let i = 1; i <= 5; i++) {
        starsArr.push(i <= roundedRating ? `<i class="fas fa-star"></i>` : `<i class="far fa-star"></i>`);
      }

      return `
        <div class="product-card" data-id="${med.id}">
          <div class="product-badge">-${med.discount}%</div>
          <div class="prescription-badge ${isRx ? '' : 'otc'}">
            <i class="fas ${isRx ? 'fa-prescription-bottle-alt' : 'fa-check-circle'}"></i>
            ${isRx ? 'Rx Required' : 'OTC'}
          </div>
          <div class="product-img-box">
            <img src="${med.image}" alt="${med.name}">
          </div>
          <div class="product-body">
            <div class="product-mfg">${med.manufacturer}</div>
            <h4 class="product-title" onclick="openProductDetails(${med.id})">${med.name}</h4>
            <div class="product-rating">
              <span class="stars">${starsArr.join("")}</span>
              <span class="rating-count">(${med.reviewsCount})</span>
            </div>
            <div class="product-pricing">
              <span class="current-price">₹${med.price}</span>
              <span class="original-price">₹${med.originalPrice}</span>
            </div>
            <div class="product-actions">
              <button class="btn btn-primary btn-sm" onclick="addToCart(${med.id})">
                <i class="fas fa-shopping-cart"></i> Add to Cart
              </button>
            </div>
          </div>
        </div>
      `;
    }).join("");
  }, 250);
}

// PRODUCT DETAILS MODAL
function openProductDetails(id) {
  const med = MEDICINES.find(item => item.id === id);
  if (!med) return;

  STATE.activeProductDetails = med;
  const modal = document.getElementById("product-details-modal");
  const modalTitle = modal.querySelector(".modal-title-span");
  const modalBody = modal.querySelector(".modal-body");

  modalTitle.textContent = med.name;

  const starsArr = [];
  const roundedRating = Math.round(med.rating);
  for (let i = 1; i <= 5; i++) {
    starsArr.push(i <= roundedRating ? `<i class="fas fa-star"></i>` : `<i class="far fa-star"></i>`);
  }

  const rxBanner = med.prescriptionRequired ? `
    <div style="background-color: #fff4e6; color: #d9480f; padding: 12px 16px; border-radius: var(--radius-sm); margin-bottom: 20px; font-size: 13px; font-weight: 500; display: flex; align-items: center; gap: 8px;">
      <i class="fas fa-info-circle"></i>
      This medicine requires a valid prescription. You can upload a photo of your doctor's prescription during checkout or from your dashboard.
    </div>
  ` : `
    <div style="background-color: #ebfbee; color: #2b8a3e; padding: 12px 16px; border-radius: var(--radius-sm); margin-bottom: 20px; font-size: 13px; font-weight: 500; display: flex; align-items: center; gap: 8px;">
      <i class="fas fa-check-circle"></i>
      Over-The-Counter (OTC) medicine. No prescription required.
    </div>
  `;

  modalBody.innerHTML = `
    <div style="display: grid; grid-template-columns: 180px 1fr; gap: 24px; margin-bottom: 24px;">
      <div style="background-color: var(--bg-light); border-radius: var(--radius-md); padding: 16px; display: flex; align-items: center; justify-content: center; height: 180px;">
        <img src="${med.image}" alt="${med.name}" style="max-width: 100%; max-height: 100%; object-fit: contain;">
      </div>
      <div>
        <h3 style="font-size: 22px; color: var(--primary); margin-bottom: 6px;">${med.name}</h3>
        <p style="font-size: 13px; color: var(--text-muted); text-transform: uppercase; margin-bottom: 8px;">MFG: ${med.manufacturer}</p>
        <div class="product-rating" style="margin-bottom: 12px;">
          <span class="stars">${starsArr.join("")}</span>
          <span class="rating-count" style="font-size: 13px; color: var(--text-muted);">(${med.rating} / 5 out of ${med.reviewsCount} reviews)</span>
        </div>
        <div style="display: flex; align-items: baseline; gap: 12px; margin-bottom: 16px;">
          <span style="font-size: 26px; font-weight: 700; color: var(--primary);">₹${med.price}</span>
          <span style="font-size: 15px; text-decoration: line-through; color: var(--text-muted);">₹${med.originalPrice}</span>
          <span style="font-size: 13px; font-weight: 600; color: var(--secondary); background-color: #fff2e6; padding: 2px 8px; border-radius: 4px;">Save ${med.discount}%</span>
        </div>
        <button class="btn btn-primary" onclick="addToCart(${med.id}); closeAllModals();">
          <i class="fas fa-shopping-cart"></i> Add to Cart
        </button>
      </div>
    </div>

    ${rxBanner}

    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div>
        <h4 style="font-size: 15px; color: var(--primary); margin-bottom: 4px; border-left: 3px solid var(--accent); padding-left: 8px;">Key Benefits</h4>
        <p style="font-size: 13.5px; color: var(--text-muted);">${med.benefits}</p>
      </div>
      <div>
        <h4 style="font-size: 15px; color: var(--primary); margin-bottom: 4px; border-left: 3px solid var(--accent); padding-left: 8px;">Key Ingredients</h4>
        <p style="font-size: 13.5px; color: var(--text-muted);">${med.ingredients}</p>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
        <div>
          <h4 style="font-size: 15px; color: var(--primary); margin-bottom: 4px; border-left: 3px solid var(--accent); padding-left: 8px;">Directions for Use</h4>
          <p style="font-size: 13px; color: var(--text-muted);">${med.dosage}</p>
        </div>
        <div>
          <h4 style="font-size: 15px; color: var(--primary); margin-bottom: 4px; border-left: 3px solid var(--accent); padding-left: 8px;">Safety Warnings</h4>
          <p style="font-size: 13px; color: var(--text-muted);">${med.precautions}</p>
        </div>
      </div>
    </div>

    <div class="reviews-section">
      <h4 style="font-size: 16px; margin-bottom: 12px;">Customer Reviews</h4>
      ${med.reviews && med.reviews.length > 0 ? med.reviews.map(rev => `
        <div class="review-item">
          <div class="review-meta">
            <span class="review-author">${rev.author}</span>
            <span class="stars">${`<i class="fas fa-star"></i>`.repeat(rev.rating)}</span>
          </div>
          <p class="review-text">"${rev.text}"</p>
        </div>
      `).join("") : '<p style="font-size:13px; color:var(--text-muted);">No reviews written yet.</p>'}
    </div>
  `;

  openModal("product-details-modal");
}

// SHOPPING CART LOGIC
function addToCart(id) {
  const med = MEDICINES.find(item => item.id === id);
  if (!med) return;

  const cartItem = STATE.cart.find(item => item.product.id === id);
  if (cartItem) {
    cartItem.qty += 1;
  } else {
    STATE.cart.push({ product: med, qty: 1 });
  }

  updateCartUI();
  openCartSidebar();
}

function updateCartQty(id, delta) {
  const item = STATE.cart.find(c => c.product.id === id);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    STATE.cart = STATE.cart.filter(c => c.product.id !== id);
  }

  updateCartUI();
}

function deleteCartItem(id) {
  STATE.cart = STATE.cart.filter(c => c.product.id !== id);
  updateCartUI();
}

function updateCartUI() {
  const countBadge = document.querySelector(".cart-count-badge");
  const itemsContainer = document.querySelector(".cart-items-list");

  if (countBadge) {
    const totalQty = STATE.cart.reduce((sum, item) => sum + item.qty, 0);
    countBadge.textContent = totalQty;
    countBadge.style.display = totalQty > 0 ? "flex" : "none";
  }

  if (!itemsContainer) return;

  if (STATE.cart.length === 0) {
    itemsContainer.innerHTML = `
      <div style="text-align: center; padding: 40px; color: var(--text-muted);">
        <i class="fas fa-shopping-basket" style="font-size: 40px; color: var(--border-color); margin-bottom: 12px;"></i>
        <p>Your basket is empty. Add authentic medicines to proceed.</p>
      </div>
    `;
    document.getElementById("checkout-btn").disabled = true;
    updateCartTotals();
    return;
  }

  document.getElementById("checkout-btn").disabled = false;
  itemsContainer.innerHTML = STATE.cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-img">
        <img src="${item.product.image}" alt="${item.product.name}">
      </div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.product.name}</div>
        <div class="cart-item-price">₹${item.product.price}</div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="updateCartQty(${item.product.id}, -1)">-</button>
          <span class="qty-val">${item.qty}</span>
          <button class="qty-btn" onclick="updateCartQty(${item.product.id}, 1)">+</button>
        </div>
      </div>
      <button class="cart-item-delete" onclick="deleteCartItem(${item.product.id})">
        <i class="far fa-trash-alt"></i>
      </button>
    </div>
  `).join("");

  updateCartTotals();
}

function updateCartTotals() {
  const subtotal = STATE.cart.reduce((sum, item) => sum + (item.product.price * item.qty), 0);
  const tax = Math.round(subtotal * 0.05);

  let discount = 0;
  if (STATE.promoApplied) {
    discount = Math.round(subtotal * STATE.promoDiscount);
  }

  const grandTotal = subtotal + tax - discount;

  document.getElementById("cart-subtotal").textContent = `₹${subtotal}`;
  document.getElementById("cart-tax").textContent = `₹${tax}`;
  document.getElementById("cart-discount-row").style.display = discount > 0 ? "flex" : "none";
  document.getElementById("cart-discount-val").textContent = `-₹${discount}`;
  document.getElementById("cart-total").textContent = `₹${grandTotal}`;
}

function applyPromo() {
  const code = document.getElementById("promo-input").value.trim().toUpperCase();
  if (code === "AYUR10") {
    STATE.promoApplied = "AYUR10";
    STATE.promoDiscount = 0.10;
    alert("Promo code AYUR10 applied successfully! 10% Discount subtracted.");
  } else if (code === "WELCOME15") {
    STATE.promoApplied = "WELCOME15";
    STATE.promoDiscount = 0.15;
    alert("Promo code WELCOME15 applied successfully! 15% Discount subtracted.");
  } else {
    alert("Invalid promo code. Try 'AYUR10' or 'WELCOME15'");
  }
  updateCartTotals();
}

function initCartListeners() {
  const openBtn = document.getElementById("open-cart-sidebar");
  const closeBtn = document.getElementById("close-cart-btn");
  const overlay = document.getElementById("cart-sidebar-overlay");

  if (openBtn) openBtn.addEventListener("click", openCartSidebar);
  if (closeBtn) closeBtn.addEventListener("click", closeCartSidebar);
  if (overlay) overlay.addEventListener("click", closeCartSidebar);

  const promoBtn = document.getElementById("apply-promo-btn");
  if (promoBtn) promoBtn.addEventListener("click", applyPromo);

  const checkoutBtn = document.getElementById("checkout-btn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      // Validate prescription requirement
      const rxRequiredItems = STATE.cart.filter(item => item.product.prescriptionRequired);

      if (rxRequiredItems.length > 0) {
        // Find if user has an APPROVED uploaded prescription
        const hasApprovedUpload = STATE.uploadedPrescriptions.some(up => up.status === "Approved");

        if (!hasApprovedUpload) {
          closeCartSidebar();
          const missingRxNames = rxRequiredItems.map(item => item.product.name);
          openPrescriptionRequiredModal(missingRxNames);
          return;
        }
      }

      processCheckoutOrder();
    });
  }
}

function openPrescriptionRequiredModal(missingItems) {
  const modal = document.getElementById("rx-warning-modal");
  const itemsSpan = modal.querySelector(".warning-items-list");
  itemsSpan.innerHTML = missingItems.map(item => `<li><strong>${item}</strong></li>`).join("");

  openModal("rx-warning-modal");
}

function handleTriggerUploadFromWarning() {
  closeAllModals();
  openModal("prescription-upload-modal");
}

function openCartSidebar() {
  document.getElementById("cart-sidebar-overlay").classList.add("active");
}

function closeCartSidebar() {
  document.getElementById("cart-sidebar-overlay").classList.remove("active");
}

function processCheckoutOrder() {
  const subtotal = STATE.cart.reduce((sum, item) => sum + (item.product.price * item.qty), 0);
  const tax = Math.round(subtotal * 0.05);
  const discount = STATE.promoApplied ? Math.round(subtotal * STATE.promoDiscount) : 0;
  const grandTotal = subtotal + tax - discount;

  const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
  const newOrder = {
    id: orderId,
    date: new Date().toISOString().split("T")[0],
    items: STATE.cart.map(item => ({ name: item.product.name, qty: item.qty, price: item.product.price })),
    subtotal: subtotal,
    tax: tax,
    total: grandTotal,
    status: "Placed",
    stepIndex: 1
  };

  STATE.orders.unshift(newOrder);

  // Clear Cart
  STATE.cart = [];
  STATE.promoApplied = null;
  STATE.promoDiscount = 0;
  document.getElementById("promo-input").value = "";

  updateCartUI();
  closeCartSidebar();

  alert(`Secure payment processed. Order ${orderId} has been successfully placed! You can track shipping status in your dashboard.`);
  renderDashboard();
  navigate("dashboard");
}

// PATIENT DASHBOARD LOGIC
function initDashboardEvents() {
  const tabBtns = document.querySelectorAll(".dash-nav-btn");
  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const targetTab = btn.getAttribute("data-dash-tab");
      document.querySelectorAll(".dashboard-tab-panel").forEach(panel => {
        if (panel.id === `dash-tab-${targetTab}`) {
          panel.classList.add("active");
        } else {
          panel.classList.remove("active");
        }
      });
    });
  });

  const fileInput = document.getElementById("ehr-file-upload-input");
  if (fileInput) {
    fileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const randomEhrId = `EHR-${Math.floor(100 + Math.random() * 900)}`;
      const fileSize = `${(file.size / 1024 / 1024).toFixed(2)} MB`;

      const newRecord = {
        id: randomEhrId,
        fileName: file.name,
        date: new Date().toISOString().split("T")[0],
        size: fileSize
      };

      STATE.ehr.unshift(newRecord);
      alert(`Electronic Health Record "${file.name}" uploaded securely!`);
      renderDashboard();
    });
  }

  const uploadDropzone = document.getElementById("upload-dropzone");
  if (uploadDropzone) {
    uploadDropzone.addEventListener("click", () => {
      document.getElementById("prescription-file-input").click();
    });
  }

  const presFileInput = document.getElementById("prescription-file-input");
  if (presFileInput) {
    presFileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const newUpload = {
        id: `UPL-${Math.floor(100 + Math.random() * 900)}`,
        fileName: file.name,
        uploadDate: new Date().toISOString().split("T")[0],
        status: "Pending",
        reviewedBy: "-"
      };

      STATE.uploadedPrescriptions.unshift(newUpload);
      closeAllModals();
      alert(`Prescription file "${file.name}" sent to medical verification team. Please check Dashboard for approval status.`);
      renderDashboard();
    });
  }
}

function renderDashboard() {
  // 1. Prescriptions list
  const rxContainer = document.getElementById("dashboard-prescriptions-list");
  if (rxContainer) {
    let html = `<h4 style="font-size: 16px; color: var(--primary); margin-bottom: 16px;">Uploaded Prescriptions Vault</h4>`;
    const uploadedList = STATE.uploadedPrescriptions;

    if (uploadedList.length === 0) {
      html += `<p style="color: var(--text-muted); font-size: 13px;">No documents uploaded yet.</p>`;
    } else {
      html += uploadedList.map(up => {
        const isApproved = up.status === "Approved";
        const isPending = up.status === "Pending";
        let badgeClass = "rejected";
        if (isApproved) badgeClass = "approved";
        if (isPending) badgeClass = "pending";

        return `
          <div style="border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 16px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <div>
              <h5 style="margin: 0; color: var(--text-dark); font-weight: 500;">${up.fileName}</h5>
              <p style="font-size: 12px; color: var(--text-muted); margin: 0;">Uploaded: ${up.uploadDate} | ID: ${up.id}</p>
            </div>
            <div style="display: flex; align-items: center; gap: 12px;">
              <span class="status-indicator ${badgeClass}">${up.status}</span>
            </div>
          </div>
        `;
      }).join("");
    }
    rxContainer.innerHTML = html;
  }

  // 2. Orders List
  const ordersContainer = document.getElementById("dashboard-orders-list");
  if (ordersContainer) {
    if (STATE.orders.length === 0) {
      ordersContainer.innerHTML = `<p style="color: var(--text-muted); text-align: center; padding: 20px;">No pharmacy orders placed yet.</p>`;
    } else {
      ordersContainer.innerHTML = STATE.orders.map(order => {
        const steps = ["Order Placed", "Packed", "Shipped", "Delivered"];
        const progressWidth = ((order.stepIndex - 1) / 3) * 100;

        const stepsMarkup = steps.map((step, idx) => {
          const stepNum = idx + 1;
          let className = "";
          if (stepNum < order.stepIndex) className = "completed";
          else if (stepNum === order.stepIndex) className = "active";

          return `
            <div class="stepper-step ${className}">
              <div class="stepper-dot">${stepNum < order.stepIndex ? '✓' : stepNum}</div>
              <div class="stepper-label">${step}</div>
            </div>
          `;
        }).join("");

        return `
          <div style="border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 24px; margin-bottom: 24px; background-color: var(--white);">
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 12px; margin-bottom: 16px;">
              <div>
                <h4 style="margin: 0; font-size: 16px; color: var(--primary);">Order #${order.id}</h4>
                <p style="font-size: 12px; color: var(--text-muted); margin: 0;">Placed on ${order.date}</p>
              </div>
              <div style="text-align: right;">
                <span style="font-size: 12px; color: var(--text-muted);">Total Amount</span>
                <div style="font-size: 16px; font-weight: 700; color: var(--primary);">₹${order.total}</div>
              </div>
            </div>
            
            <div style="font-size: 13px; color: var(--text-dark); margin-bottom: 20px;">
              <h5 style="margin-bottom: 8px;">Items Summary:</h5>
              <ul style="padding-left: 20px; color: var(--text-muted);">
                ${order.items.map(item => `<li>${item.name} x ${item.qty} (₹${item.price})</li>`).join("")}
              </ul>
            </div>

            <div class="tracker-stepper">
              <div class="tracker-stepper-progress" style="width: ${progressWidth}%"></div>
              ${stepsMarkup}
            </div>
          </div>
        `;
      }).join("");
    }
  }

  // 3. EHR list
  const ehrContainer = document.getElementById("dashboard-ehr-list");
  if (ehrContainer) {
    if (STATE.ehr.length === 0) {
      ehrContainer.innerHTML = `<p style="color: var(--text-muted); text-align: center; padding: 20px;">No health reports uploaded yet.</p>`;
    } else {
      ehrContainer.innerHTML = STATE.ehr.map(doc => `
        <div style="border: 1px dashed var(--border-color); border-radius: var(--radius-md); padding: 16px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <i class="far fa-file-pdf" style="font-size: 28px; color: #e03131;"></i>
            <div>
              <h5 style="margin: 0; color: var(--text-dark); font-weight: 500;">${doc.fileName}</h5>
              <p style="font-size: 12px; color: var(--text-muted); margin: 0;">Uploaded: ${doc.date} | Size: ${doc.size}</p>
            </div>
          </div>
          <button class="btn btn-light btn-sm" onclick="deleteEhr('${doc.id}')">
            <i class="far fa-trash-alt" style="color: #e03131;"></i> Delete
          </button>
        </div>
      `).join("");
    }
  }
}

function deleteEhr(id) {
  STATE.ehr = STATE.ehr.filter(e => e.id !== id);
  renderDashboard();
}

// ADMINISTRATIVE BACKEND LOGIC
function initAdminEvents() {
  const adminNewMedForm = document.getElementById("admin-add-medicine-form");
  if (adminNewMedForm) {
    adminNewMedForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("admin-med-name").value;
      const manufacturer = document.getElementById("admin-med-mfg").value;
      const price = parseInt(document.getElementById("admin-med-price").value) || 100;
      const origPrice = parseInt(document.getElementById("admin-med-origprice").value) || 120;
      const category = document.getElementById("admin-med-category").value;
      const condition = document.getElementById("admin-med-condition").value;
      const formulation = document.getElementById("admin-med-formulation").value;
      const rxRequired = document.getElementById("admin-med-rx").value === "yes";

      const newMed = {
        id: MEDICINES.length + 1,
        name: name,
        manufacturer: manufacturer,
        price: price,
        originalPrice: origPrice,
        discount: Math.round(((origPrice - price) / origPrice) * 100),
        rating: 4.8,
        reviewsCount: 1,
        category: category,
        condition: condition,
        formulation: formulation,
        prescriptionRequired: rxRequired,
        image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=300",
        ingredients: "Standard Herbal Blend",
        benefits: "Holistic herbal restoration formula.",
        dosage: "1 tablet/capsule twice daily with water.",
        precautions: "Keep away from children.",
        reviews: []
      };

      MEDICINES.push(newMed);
      alert(`Success! "${name}" added to the shop catalog.`);
      adminNewMedForm.reset();
      renderProducts();
      renderAdmin();
    });
  }
}

function renderAdmin() {
  const totalSales = STATE.orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = STATE.orders.length;
  const pendingPrescriptionsCount = STATE.uploadedPrescriptions.filter(u => u.status === "Pending").length;

  document.getElementById("admin-sales-stat").textContent = `₹${totalSales}`;
  document.getElementById("admin-orders-stat").textContent = totalOrders;
  document.getElementById("admin-pending-rx-stat").textContent = pendingPrescriptionsCount;
  document.getElementById("admin-inventory-stat").textContent = MEDICINES.length;

  // Prescription Queue
  const queueContainer = document.getElementById("admin-prescription-queue");
  if (queueContainer) {
    const pendingList = STATE.uploadedPrescriptions.filter(u => u.status === "Pending");

    if (pendingList.length === 0) {
      queueContainer.innerHTML = `<p style="color: var(--text-muted); font-size: 13px;">No prescription uploads awaiting verification.</p>`;
    } else {
      queueContainer.innerHTML = pendingList.map(up => `
        <div style="border: 1px solid var(--border-color); border-radius: var(--radius-sm); padding: 12px; margin-bottom: 12px; background-color: var(--bg-light); display: flex; justify-content: space-between; align-items: center;">
          <div>
            <h5 style="margin: 0; font-size: 13.5px;">${up.fileName}</h5>
            <p style="font-size: 11px; color: var(--text-muted); margin: 0;">Uploaded by Patient (Rahul K.) | ID: ${up.id}</p>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="btn btn-light btn-sm" onclick="rejectPrescriptionAdmin('${up.id}')" style="color:#e03131; border: 1px solid #e03131; background:none;">Decline</button>
            <button class="btn btn-primary btn-sm" onclick="approvePrescriptionAdmin('${up.id}')">Approve Rx</button>
          </div>
        </div>
      `).join("");
    }
  }

  // Inventory Table
  const inventoryBody = document.getElementById("admin-inventory-table-body");
  if (inventoryBody) {
    inventoryBody.innerHTML = MEDICINES.map(med => `
      <tr>
        <td><strong>${med.name}</strong></td>
        <td>${med.manufacturer}</td>
        <td>₹${med.price}</td>
        <td>${med.prescriptionRequired ? '<span class="status-indicator pending">Rx Required</span>' : '<span class="status-indicator approved">OTC</span>'}</td>
      </tr>
    `).join("");
  }

  // Orders table
  const orderFulfillContainer = document.getElementById("admin-orders-fulfill-body");
  if (orderFulfillContainer) {
    orderFulfillContainer.innerHTML = STATE.orders.map(order => {
      const nextBtn = order.stepIndex < 4 
        ? `<button class="btn btn-outline btn-sm" onclick="advanceOrderStatusAdmin('${order.id}')">Advance Status</button>`
        : `<span style="color:var(--accent); font-weight:600;"><i class="fas fa-check-double"></i> Delivered</span>`;

      return `
        <tr>
          <td>#${order.id}</td>
          <td>${order.date}</td>
          <td>₹${order.total}</td>
          <td><span class="status-indicator ${order.stepIndex === 4 ? 'approved' : 'pending'}">${order.status}</span></td>
          <td>${nextBtn}</td>
        </tr>
      `;
    }).join("");
  }
}

function approvePrescriptionAdmin(id) {
  const up = STATE.uploadedPrescriptions.find(u => u.id === id);
  if (up) {
    up.status = "Approved";
    up.reviewedBy = "Medical Verification Specialist";
    alert(`Prescription ${id} approved! Patient can now purchase prescription-only remedies.`);
    renderAdmin();
    renderDashboard();
  }
}

function rejectPrescriptionAdmin(id) {
  const up = STATE.uploadedPrescriptions.find(u => u.id === id);
  if (up) {
    up.status = "Rejected";
    up.reviewedBy = "Medical Verification Specialist";
    alert(`Prescription ${id} declined.`);
    renderAdmin();
    renderDashboard();
  }
}

function advanceOrderStatusAdmin(orderId) {
  const order = STATE.orders.find(o => o.id === orderId);
  if (!order) return;

  const statuses = ["Placed", "Packed", "Shipped", "Delivered"];
  if (order.stepIndex < 4) {
    order.stepIndex += 1;
    order.status = statuses[order.stepIndex - 1];
    alert(`Order #${orderId} status advanced to: ${order.status}`);
    renderAdmin();
    renderDashboard();
  }
}

// MODAL WINDOW CONTROL WRAPPERS
function initModals() {
  document.querySelectorAll(".modal-overlay").forEach(overlay => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        closeAllModals();
      }
    });
  });

  document.querySelectorAll(".close-modal-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      closeAllModals();
    });
  });
}

function openModal(id) {
  document.getElementById(id).classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeAllModals() {
  document.querySelectorAll(".modal-overlay").forEach(overlay => {
    overlay.classList.remove("active");
  });
  document.body.style.overflow = "auto";
}
