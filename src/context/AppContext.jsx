import React, { createContext, useContext, useState, useEffect } from 'react';
import { MEDICINES, MOCK_ACCOUNTS } from '../data/medicines';

const AppContext = createContext();

const STORAGE_KEYS = {
  CART: "ayurmedkart_cart",
  AUTH: "ayurmedkart_auth",
  ORDERS: "ayurmedkart_orders",
  CONSULTATIONS: "ayurmedkart_consultations",
  PRESCRIPTIONS: "ayurmedkart_prescriptions"
};

export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [auth, setAuth] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.AUTH);
      return saved ? JSON.parse(saved) : { isLoggedIn: false, username: null, role: null, name: null, identifier: null, redirectAfterLogin: null };
    } catch {
      return { isLoggedIn: false, username: null, role: null, name: null, identifier: null, redirectAfterLogin: null };
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [consultations, setConsultations] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CONSULTATIONS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [uploadedPrescriptions, setUploadedPrescriptions] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRESCRIPTIONS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Active Modals state
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isGoogleChooserOpen, setIsGoogleChooserOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isVideoConsultModalOpen, setIsVideoConsultModalOpen] = useState(false);
  const [activeCallDoctor, setActiveCallDoctor] = useState("Dr. Aravind Sharma");
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [selectedProductDetails, setSelectedProductDetails] = useState(null);
  const [rxWarningItems, setRxWarningItems] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(auth));
  }, [auth]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CONSULTATIONS, JSON.stringify(consultations));
  }, [consultations]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRESCRIPTIONS, JSON.stringify(uploadedPrescriptions));
  }, [uploadedPrescriptions]);

  // Actions
  const addToCart = (id) => {
    const med = MEDICINES.find(item => item.id === id);
    if (!med) return;

    setCart(prev => {
      const existing = prev.find(item => item.product.id === id);
      if (existing) {
        return prev.map(item => item.product.id === id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { product: med, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateCartQty = (id, delta) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.product.id === id) {
          const newQty = item.qty + delta;
          return newQty > 0 ? { ...item, qty: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.product.id !== id));
  };

  const getOrCreateAccount = (identifier) => {
    const key = identifier.trim().toLowerCase();
    if (MOCK_ACCOUNTS[key]) {
      return MOCK_ACCOUNTS[key];
    }
    if (key === "rahul.kumar@gmail.com" || key === "9876543210") {
      return MOCK_ACCOUNTS["rahul.kumar@gmail.com"];
    }
    const newAcc = {
      name: identifier,
      role: "patient",
      avatar: identifier.includes("@") ? identifier.split("@")[0].substring(0, 2).toUpperCase() : identifier.substring(0, 2).toUpperCase(),
      identifier: identifier,
      orders: [],
      uploadedPrescriptions: [],
      ehr: [],
      consultations: []
    };
    MOCK_ACCOUNTS[key] = newAcc;
    return newAcc;
  };

  const loginUser = (accountObj) => {
    setAuth({
      isLoggedIn: true,
      username: accountObj.name,
      role: accountObj.role,
      name: accountObj.name,
      identifier: accountObj.identifier,
      redirectAfterLogin: null
    });
    setOrders(accountObj.orders || []);
    setUploadedPrescriptions(accountObj.uploadedPrescriptions || []);
    setConsultations(accountObj.consultations || []);
    setIsLoginModalOpen(false);
  };

  const logoutUser = () => {
    setAuth({
      isLoggedIn: false,
      username: null,
      role: null,
      name: null,
      identifier: null,
      redirectAfterLogin: null
    });
    setOrders([]);
    setUploadedPrescriptions([]);
    setConsultations([]);
  };

  const processCheckout = () => {
    if (!auth.isLoggedIn) {
      setIsCartOpen(false);
      alert("Please Sign In first to complete your purchase.");
      setIsLoginModalOpen(true);
      return;
    }

    const rxRequired = cart.filter(item => item.product.prescriptionRequired);
    if (rxRequired.length > 0) {
      const hasApproved = uploadedPrescriptions.some(u => u.status === "Approved");
      if (!hasApproved) {
        setIsCartOpen(false);
        setRxWarningItems(rxRequired.map(i => i.product.name));
        return;
      }
    }

    const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.qty), 0);
    const tax = Math.round(subtotal * 0.05);
    const total = subtotal + tax;
    const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder = {
      id: orderId,
      date: new Date().toISOString().split("T")[0],
      items: cart.map(item => ({ name: item.product.name, qty: item.qty, price: item.product.price })),
      subtotal,
      tax,
      total,
      status: "Placed",
      stepIndex: 1
    };

    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
    setIsCartOpen(false);
    alert(`Secure payment processed. Order ${orderId} has been successfully placed!`);
  };

  const bookConsultation = (docName, fee, date, time, notes) => {
    const consultId = `CON-${Math.floor(100 + Math.random() * 900)}`;
    const newConsult = {
      id: consultId,
      doctorId: 1,
      doctorName: docName,
      date: date || new Date().toISOString().split("T")[0],
      time: time || "10:00 AM",
      notes: notes || "General Consultation",
      status: "Scheduled"
    };
    setConsultations(prev => [newConsult, ...prev]);
    alert(`E-consultation with ${docName} on ${newConsult.date} at ${newConsult.time} is confirmed!`);
  };

  const startVideoCall = (doctorName) => {
    setActiveCallDoctor(doctorName || "Dr. Aravind Sharma");
    setIsVideoConsultModalOpen(true);
  };

  return (
    <AppContext.Provider value={{
      cart,
      auth,
      orders,
      consultations,
      uploadedPrescriptions,
      isLoginModalOpen,
      setIsLoginModalOpen,
      isGoogleChooserOpen,
      setIsGoogleChooserOpen,
      isCartOpen,
      setIsCartOpen,
      isVideoConsultModalOpen,
      setIsVideoConsultModalOpen,
      activeCallDoctor,
      startVideoCall,
      isPrescriptionModalOpen,
      setIsPrescriptionModalOpen,
      selectedProductDetails,
      setSelectedProductDetails,
      rxWarningItems,
      setRxWarningItems,
      addToCart,
      updateCartQty,
      removeFromCart,
      getOrCreateAccount,
      loginUser,
      logoutUser,
      processCheckout,
      bookConsultation
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
