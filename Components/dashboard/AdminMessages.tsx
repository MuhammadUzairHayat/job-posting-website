"use client";

import { useState, useEffect } from "react";
import { FaEnvelope, FaEnvelopeOpen, FaExclamationCircle } from "react-icons/fa";

interface AdminMessage {
  id: string;
  message: string;
  sentAt: string;
  isRead: boolean;
  job?: {
    id: string;
    title: string;
    company: string;
  } | null;
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<AdminMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedMessage, setExpandedMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/user/admin-messages");
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages || []);
      }
    } catch (error) {
      console.error("Failed to fetch admin messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (messageId: string) => {
    try {
      const res = await fetch("/api/user/admin-messages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messageId }),
      });

      if (res.ok) {
        setMessages(messages.map(msg =>
          msg.id === messageId ? { ...msg, isRead: true } : msg
        ));
      }
    } catch (error) {
      console.error("Failed to mark message as read:", error);
    }
  };

  const toggleExpand = (messageId: string) => {
    if (expandedMessage === messageId) {
      setExpandedMessage(null);
    } else {
      setExpandedMessage(messageId);
      const message = messages.find(m => m.id === messageId);
      if (message && !message.isRead) {
        markAsRead(messageId);
      }
    }
  };

  const unreadCount = messages.filter(m => !m.isRead).length;

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-20 bg-gray-100 rounded"></div>
            <div className="h-20 bg-gray-100 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 text-center">
        <FaEnvelope className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Messages</h3>
        <p className="text-gray-600">You haven&apos;t received any admin messages yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <FaEnvelope className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Admin Messages</h3>
              <p className="text-blue-100 text-sm">
                {unreadCount > 0 ? `${unreadCount} unread message${unreadCount !== 1 ? 's' : ''}` : 'All caught up!'}
              </p>
            </div>
          </div>
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
      </div>

      {/* Messages List */}
      <div className="divide-y divide-gray-200">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
              !message.isRead ? "bg-blue-50" : ""
            }`}
            onClick={() => toggleExpand(message.id)}
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg ${!message.isRead ? "bg-blue-100" : "bg-gray-100"}`}>
                {!message.isRead ? (
                  <FaEnvelope className="w-4 h-4 text-blue-600" />
                ) : (
                  <FaEnvelopeOpen className="w-4 h-4 text-gray-600" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                      <FaExclamationCircle className="w-3 h-3" />
                      Admin
                    </span>
                    {!message.isRead && (
                      <span className="inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500 flex-shrink-0">
                    {new Date(message.sentAt).toLocaleDateString()} {new Date(message.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                {message.job && (
                  <p className="text-sm text-gray-600 mb-2">
                    Regarding: <strong>{message.job.title}</strong> at {message.job.company}
                  </p>
                )}

                {expandedMessage === message.id ? (
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-gray-700 whitespace-pre-wrap">{message.message}</p>
                  </div>
                ) : (
                  <p className="text-gray-700 line-clamp-2">{message.message}</p>
                )}

                <button className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
                  {expandedMessage === message.id ? "Show less" : "Read more →"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
