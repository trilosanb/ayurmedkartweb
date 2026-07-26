import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

export const VideoConsultationModal = () => {
  const { isVideoConsultModalOpen, setIsVideoConsultModalOpen, activeCallDoctor } = useApp();
  const [seconds, setSeconds] = useState(0);
  const [docStatus, setDocStatus] = useState("Connecting to clinical consultation room...");
  const [messages, setMessages] = useState([
    { sender: "System", text: "Secure clinical channel established." }
  ]);
  const [chatInputText, setChatInputText] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  useEffect(() => {
    let timer;
    if (isVideoConsultModalOpen) {
      setSeconds(0);
      setDocStatus(`Connecting to ${activeCallDoctor}...`);
      setMessages([{ sender: "System", text: "Secure clinical channel established." }]);

      timer = setInterval(() => {
        setSeconds(prev => {
          const nextSec = prev + 1;
          if (nextSec === 3) setDocStatus("Practitioner joining clinical consultation room...");
          if (nextSec === 6) {
            setDocStatus("Live Call Active");
            setMessages(m => [...m, { sender: activeCallDoctor, text: "Hello, thank you for scheduling this session. How are you feeling today?" }]);
          }
          if (nextSec === 15) {
            setMessages(m => [...m, { sender: activeCallDoctor, text: "Please detail any digestion issues or gastric acidity you've been having." }]);
          }
          return nextSec;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isVideoConsultModalOpen, activeCallDoctor]);

  if (!isVideoConsultModalOpen) return null;

  const min = String(Math.floor(seconds / 60)).padStart(2, '0');
  const sec = String(seconds % 60).padStart(2, '0');

  const handleSendMsg = () => {
    if (!chatInputText.trim()) return;
    const text = chatInputText.trim();
    setMessages(prev => [...prev, { sender: "You", text }]);
    setChatInputText("");

    setTimeout(() => {
      const docReplies = [
        "Understood. That is consistent with excess Pitta dosha in your digestive tract.",
        "I suggest avoiding raw food or heavy spices for the next 7 days. Writing down a prescription for Gandharvahastadi Kashayam.",
        "Take 15ml of the kashayam with warm water before meals.",
        "Do you have any other clinical questions regarding your routine?"
      ];
      const randomReply = docReplies[Math.floor(Math.random() * docReplies.length)];
      setMessages(prev => [...prev, { sender: activeCallDoctor, text: randomReply }]);
    }, 2000);
  };

  return (
    <div class="modal-overlay active" style={{ zIndex: 9999 }}>
      <div class="modal-dialog" style={{ maxWidth: "900px", padding: 0, overflow: "hidden" }}>
        <div class="telehealth-video-layout">
          <div class="telehealth-video-screen">
            <div class="call-header-status">
              <span class="live-dot"></span> <strong>{docStatus}</strong>
              <span class="call-timer">{min}:{sec}</span>
            </div>

            <div class="doctor-video-feed">
              <img src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800" alt="Doctor Stream" id="doc-video-stream" style={{ opacity: isVideoOff ? 0.2 : 1 }} />
              <div class="doctor-overlay-tag">{activeCallDoctor} (BAMS, MD)</div>
            </div>

            <div class="patient-self-feed">
              <div class="self-avatar">{isMuted ? "Muted" : "You"}</div>
            </div>

            <div class="telehealth-controls">
              <button class={`control-btn ${isMuted ? 'muted' : ''}`} onClick={() => setIsMuted(!isMuted)}>
                <i class={`fas ${isMuted ? 'fa-microphone-slash' : 'fa-microphone'}`}></i>
              </button>
              <button class={`control-btn ${isVideoOff ? 'muted' : ''}`} onClick={() => setIsVideoOff(!isVideoOff)}>
                <i class={`fas ${isVideoOff ? 'fa-video-slash' : 'fa-video'}`}></i>
              </button>
              <button class="control-btn btn-hangup" onClick={() => {
                setIsVideoConsultModalOpen(false);
                alert(`Consultation call with ${activeCallDoctor} ended.`);
              }}>
                <i class="fas fa-phone-slash"></i>
              </button>
            </div>
          </div>

          <div class="telehealth-chat-panel">
            <div class="chat-header">
              <span><i class="fas fa-comments"></i> Clinical Live Chat</span>
            </div>
            <div class="chat-messages" style={{ overflowY: "auto", display: "flex", flexDirection: "column", gap: "10px", padding: "12px" }}>
              {messages.map((m, idx) => {
                const isYou = m.sender === "You";
                return (
                  <div key={idx} style={{
                    backgroundColor: isYou ? "var(--bg-light)" : "var(--white)",
                    borderRadius: "var(--radius-sm)",
                    padding: "10px",
                    fontSize: "12.5px",
                    lineHeight: "1.4",
                    alignSelf: isYou ? "flex-end" : "flex-start",
                    maxWidth: "85%",
                    boxShadow: "var(--shadow-sm)",
                    borderLeft: isYou ? "3px solid var(--secondary)" : "3px solid var(--primary)"
                  }}>
                    <strong style={{ color: isYou ? "var(--secondary)" : "var(--primary)" }}>{m.sender}: </strong>
                    {m.text}
                  </div>
                );
              })}
            </div>
            <div class="chat-input-box">
              <input 
                type="text" 
                placeholder="Type your symptoms or questions..." 
                value={chatInputText} 
                onChange={(e) => setChatInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMsg()}
              />
              <button onClick={handleSendMsg}><i class="fas fa-paper-plane"></i></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
