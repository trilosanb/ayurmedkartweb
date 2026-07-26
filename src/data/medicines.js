export const MEDICINES = [
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
    prescriptionRequired: true,
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
    prescriptionRequired: true,
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

export const MOCK_ACCOUNTS = {
  "rahul.kumar@gmail.com": {
    name: "Rahul Kumar",
    role: "patient",
    avatar: "RK",
    identifier: "rahul.kumar@gmail.com",
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
        status: "Shipped",
        stepIndex: 3
      }
    ],
    uploadedPrescriptions: [
      {
        id: "UPL-981",
        fileName: "prescription_june2026.jpg",
        uploadDate: "2026-06-28",
        status: "Approved",
        reviewedBy: "Medical Board"
      }
    ],
    ehr: [
      { id: "EHR-101", fileName: "BloodReport_June2026.pdf", date: "2026-06-10", size: "1.2 MB" },
      { id: "EHR-102", fileName: "ThyroidPanel_May2026.pdf", date: "2026-05-02", size: "850 KB" }
    ],
    consultations: [
      {
        id: "CON-789",
        doctorId: 1,
        doctorName: "Dr. Aravind Sharma",
        date: "2026-07-28",
        time: "10:00 AM",
        notes: "Routine follow-up for joint pain.",
        status: "Scheduled"
      }
    ]
  }
};
MOCK_ACCOUNTS["9876543210"] = MOCK_ACCOUNTS["rahul.kumar@gmail.com"];

export const DOCTORS = [
  {
    id: 1,
    name: "Dr. Aravind Sharma",
    avatar: "AS",
    fontClass: "font-kottakkal",
    edu: "BAMS, MD (Panchakarma) | 15 Years Exp",
    fee: 500,
    rating: 4.9,
    reviews: 120,
    specialties: ["Arthritis", "Spine Care", "Rejuvenation"],
    online: true
  },
  {
    id: 2,
    name: "Dr. Priya Nair",
    avatar: "PN",
    fontClass: "font-vaidyaratnam",
    edu: "BAMS | 10 Years Exp",
    fee: 450,
    rating: 4.8,
    reviews: 88,
    specialties: ["Women's Health", "Skin & Hair", "Stress Mgmt"],
    online: true
  },
  {
    id: 3,
    name: "Dr. Manoj K.",
    avatar: "MK",
    fontClass: "font-avp",
    edu: "BAMS, MS (Ayurveda Shalya) | 12 Years Exp",
    fee: 400,
    rating: 4.7,
    reviews: 95,
    specialties: ["Digestive Care", "Acidity", "Detox"],
    online: false
  }
];
