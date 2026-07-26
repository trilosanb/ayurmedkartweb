import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { LoginModal } from './components/LoginModal';
import { GoogleChooserModal } from './components/GoogleChooserModal';
import { VideoConsultationModal } from './components/VideoConsultationModal';
import { ScrollToTop } from './components/ScrollToTop';

import { MedicineStorePage } from './pages/MedicineStorePage';
import { ConsultationPage } from './pages/ConsultationPage';
import { UserPortalPage } from './pages/UserPortalPage';
import { AdminPortalPage } from './pages/AdminPortalPage';
import { CartPage } from './pages/CartPage';

const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname === '/admin';

  return (
    <div className="app-container">
      <ScrollToTop />
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<MedicineStorePage />} />
        <Route path="/consultation" element={<ConsultationPage />} />
        <Route path="/dashboard" element={<UserPortalPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/admin" element={<AdminPortalPage />} />
      </Routes>
      {!isAdminRoute && <Footer />}

      {/* Shared Modals */}
      <CartDrawer />
      <LoginModal />
      <GoogleChooserModal />
      <VideoConsultationModal />
    </div>
  );
};

export const App = () => {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
};

export default App;
