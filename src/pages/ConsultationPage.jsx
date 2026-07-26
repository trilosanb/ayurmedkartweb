import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DOCTORS } from '../data/medicines';

export const ConsultationPage = () => {
  const { bookConsultation } = useApp();
  const [selectedDoc, setSelectedDoc] = useState(DOCTORS[0]);
  const [patientName, setPatientName] = useState("Rahul Kumar");
  const [bookingDate, setBookingDate] = useState("2026-07-28");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("10:00 AM");
  const [notes, setNotes] = useState("");

  const handleSubmitBooking = (e) => {
    e.preventDefault();
    bookConsultation(selectedDoc.name, selectedDoc.fee, bookingDate, selectedTimeSlot, notes);
  };

  return (
    <section id="consultation" class="view-section active" style={{ display: "block", paddingTop: "100px" }}>
      <div class="container section-padding">
        <h2 class="section-title">Schedule Ayurvedic E-Consultation</h2>
        <p class="section-subtitle">Connect with India's certified Ayurvedic clinical practitioners from the comfort of your home. Get specialized diagnosis, diet recommendations, and custom prescriptions.</p>

        <div class="consultation-layout">
          {/* Doctor Directory */}
          <div class="doctor-directory">
            <h3 class="consult-sub-title"><i class="fas fa-user-md"></i> Our Panel of Certified Practitioners</h3>
            
            <div class="doctor-cards-grid">
              {DOCTORS.map(doc => (
                <div 
                  key={doc.id} 
                  class={`doctor-card ${selectedDoc.id === doc.id ? 'active' : ''}`}
                  onClick={() => setSelectedDoc(doc)}
                  style={{ cursor: "pointer" }}
                >
                  <div class="doc-avatar-wrapper">
                    <div class={`doc-avatar ${doc.fontClass}`}>{doc.avatar}</div>
                    <span class={`status-dot ${doc.online ? 'online' : 'offline'}`}></span>
                  </div>
                  <div class="doc-details">
                    <h4>{doc.name}</h4>
                    <p class="doc-edu">{doc.edu}</p>
                    <div class="doc-specialties">
                      {doc.specialties.map((s, i) => <span key={i} class="spec-pill">{s}</span>)}
                    </div>
                    <div class="doc-meta-row">
                      <span class="doc-fee"><i class="fas fa-rupee-sign"></i> {doc.fee} Consultation</span>
                      <span class="doc-rating"><i class="fas fa-star text-gold"></i> {doc.rating} ({doc.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Booking Form */}
          <div class="booking-panel">
            <h3 class="consult-sub-title"><i class="far fa-calendar-alt"></i> Complete Your Consultation Booking</h3>
            
            <form onSubmit={handleSubmitBooking} class="booking-form-box">
              <div class="selected-doctor-banner">
                <div class="banner-avatar">{selectedDoc.avatar}</div>
                <div>
                  <h4>{selectedDoc.name}</h4>
                  <p>Fee: <strong>₹{selectedDoc.fee}</strong> (Includes GST)</p>
                </div>
              </div>

              <div class="form-group">
                <label htmlFor="consult-patient-name">Patient Full Name</label>
                <input 
                  type="text" 
                  id="consult-patient-name" 
                  required 
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                />
              </div>

              <div class="form-group">
                <label htmlFor="consult-date">Preferred Booking Date</label>
                <input 
                  type="date" 
                  id="consult-date" 
                  required
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                />
              </div>

              <div class="form-group">
                <label>Select Preferred Time Slot</label>
                <div class="time-slots-grid">
                  {["10:00 AM", "11:30 AM", "02:00 PM", "03:30 PM", "05:00 PM", "06:30 PM"].map((t, idx) => (
                    <button 
                      key={idx} 
                      type="button" 
                      class={`time-slot-btn ${selectedTimeSlot === t ? 'selected' : ''}`}
                      onClick={() => setSelectedTimeSlot(t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div class="form-group">
                <label htmlFor="consult-notes">Describe Your Health Concern / Symptoms</label>
                <textarea 
                  id="consult-notes" 
                  rows="3" 
                  placeholder="e.g. Acid reflux after meals, joints stiffness in knees..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                ></textarea>
              </div>

              <button type="submit" class="btn btn-secondary" style={{ width: "100%", marginTop: "16px" }}>
                <i class="fas fa-credit-card"></i> Pay & Confirm E-Consultation
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
