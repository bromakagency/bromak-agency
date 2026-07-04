"use client";

import { useState } from "react";
import { LuMail, LuMailOpen, LuTrash2, LuClock } from "react-icons/lu";
import { markAsRead, deleteMessage } from "./actions";

type Message = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service: string | null;
  message: string;
  isRead: boolean;
  createdAt: Date;
};

export default function MessageListClient({ initialMessages }: { initialMessages: Message[] }) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleToggle = async (message: Message) => {
    const isExpanding = expandedId !== message.id;
    setExpandedId(isExpanding ? message.id : null);

    if (isExpanding && !message.isRead) {
      // Optimizely update local state
      setMessages((prev) =>
        prev.map((m) => (m.id === message.id ? { ...m, isRead: true } : m))
      );
      // Update DB
      await markAsRead(message.id);
    }
  };

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (confirm("Bu mesajı silmek istediğinize emin misiniz?")) {
      setMessages((prev) => prev.filter((m) => m.id !== id));
      await deleteMessage(id);
    }
  };

  if (messages.length === 0) {
    return <div className="no-messages">Henüz hiç mesajınız yok.</div>;
  }

  return (
    <div className="message-list">
      {messages.map((msg) => (
        <div key={msg.id} className={`message-card ${!msg.isRead ? "unread" : ""}`}>
          <div className="message-header" onClick={() => handleToggle(msg)}>
            <div className="message-header-left">
              <div className="message-icon">
                {!msg.isRead ? <LuMail size={20} className="unread-icon" /> : <LuMailOpen size={20} />}
              </div>
              <div className="message-info">
                <h4 className="message-name">{msg.name}</h4>
                <span className="message-service">{msg.service || "Genel Bilgi"}</span>
              </div>
            </div>
            <div className="message-header-right">
              <div className="message-date">
                <LuClock size={14} />
                <span>{new Date(msg.createdAt).toLocaleDateString("tr-TR")}</span>
              </div>
              <button
                className="btn-icon-delete"
                onClick={(e) => handleDelete(e, msg.id)}
                title="Mesajı Sil"
              >
                <LuTrash2 size={18} />
              </button>
            </div>
          </div>

          {expandedId === msg.id && (
            <div className="message-body">
              <div className="message-contact-info">
                <div className="contact-info-grid">
                  <div className="info-item">
                    <span className="info-label">Ad Soyad</span>
                    <p className="info-value">{msg.name}</p>
                  </div>
                  <div className="info-item">
                    <span className="info-label">İlgilenilen Hizmet</span>
                    <p className="info-value">{msg.service || "Genel Bilgi"}</p>
                  </div>
                  <div className="info-item">
                    <span className="info-label">E-posta</span>
                    <p className="info-value"><a href={`mailto:${msg.email}`}>{msg.email}</a></p>
                  </div>
                  {msg.phone && (
                    <div className="info-item">
                      <span className="info-label">Telefon</span>
                      <p className="info-value"><a href={`tel:${msg.phone}`}>{msg.phone}</a></p>
                    </div>
                  )}
                </div>
              </div>
              <div className="message-content">
                <span className="info-label">Mesaj</span>
                <p>{msg.message}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
