"use client";

import { useEffect, useState } from "react";
import { X, Minimize2, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useChat } from "@/Context/ChatContext";
import { useSession } from "next-auth/react";
import UserList from "./UserList";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

interface User {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  jobTitle: string | null;
  role?: string;
}

export default function ChatWindow() {
  const {
    isOpen,
    setIsOpen,
    selectedUser,
    setSelectedUser,
    messages,
    setMessages,
    users,
    setUsers,
    isLoadingMessages,
    setIsLoadingMessages,
    setUnreadCount,
  } = useChat();

  const { data: session } = useSession();
  const [unreadCounts, setUnreadCounts] = useState<{ [userId: string]: number }>({});
  const [editingMessage, setEditingMessage] = useState<{ id: string; text: string } | null>(null);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);

  const fetchUsers = async (search?: string) => {
    try {
      const mode = search ? "all" : "recent";
      const queryParams = new URLSearchParams({ mode });
      if (search) {
        queryParams.append("search", search);
      }
      
      const res = await fetch(`/api/chat/users?${queryParams}`);
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users || []);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const fetchMessages = async (userId: string) => {
    setIsLoadingMessages(true);
    try {
      const res = await fetch(`/api/chat/messages?userId=${userId}`);
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages || []);
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    } finally {
      setIsLoadingMessages(false);
    }
  };

  const markMessagesAsRead = async (userId: string) => {
    try {
      await fetch("/api/chat/mark-read", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      
      // Update unread counts
      fetchUnreadCounts();
      
      // Update global unread count
      const res = await fetch("/api/chat/unread");
      if (res.ok) {
        const data = await res.json();
        setUnreadCount(data.count || 0);
      }
    } catch (error) {
      console.error("Failed to mark messages as read:", error);
    }
  };

  const fetchUnreadCounts = async () => {
    try {
      const res = await fetch("/api/chat/unread-by-user");
      if (res.ok) {
        const data = await res.json();
        setUnreadCounts(data.counts || {});
      }
    } catch (error) {
      console.error("Failed to fetch unread counts:", error);
    }
  };

  // Fetch users on mount
  useEffect(() => {
    if (isOpen && session?.user) {
      fetchUsers();
      fetchUnreadCounts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, session]);

  // Fetch messages when user is selected
  useEffect(() => {
    if (selectedUser && isOpen) {
      fetchMessages(selectedUser.id);
      markMessagesAsRead(selectedUser.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUser, isOpen]);

  // Poll for unread counts every 5 seconds
  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      fetchUnreadCounts();
    }, 5000);

    return () => clearInterval(interval);
  }, [isOpen]);

  const handleSendMessage = async (text: string) => {
    if (!selectedUser) return;

    try {
      const res = await fetch("/api/chat/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          receiverId: selectedUser.id,
          text,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        // Add new message to list
        setMessages([...messages, data.message]);
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      throw error;
    }
  };

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
  };

  const handleSearch = (query: string) => {
    // Clear existing timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // Debounce search - wait 500ms after user stops typing
    const timeout = setTimeout(() => {
      fetchUsers(query.trim());
    }, 500);

    setSearchTimeout(timeout);
  };

  const handleEditMessage = (messageId: string, text: string) => {
    setEditingMessage({ id: messageId, text });
  };

  const handleCancelEdit = () => {
    setEditingMessage(null);
  };

  const handleEditSubmit = async (messageId: string, text: string) => {
    try {
      const res = await fetch("/api/chat/edit", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messageId, text }),
      });

      if (res.ok) {
        const data = await res.json();
        // Update message in list
        setMessages(messages.map(msg => 
          msg.id === messageId ? data.message : msg
        ));
        setEditingMessage(null);
      }
    } catch (error) {
      console.error("Failed to edit message:", error);
      throw error;
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    if (!confirm("Delete this message?")) return;

    try {
      const res = await fetch("/api/chat/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messageId }),
      });

      if (res.ok) {
        // Remove message from list
        setMessages(messages.filter(msg => msg.id !== messageId));
      }
    } catch (error) {
      console.error("Failed to delete message:", error);
    }
  };

  const handleReactMessage = async (messageId: string, emoji: string) => {
    try {
      const res = await fetch("/api/chat/react", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messageId, emoji }),
      });

      if (res.ok) {
        const data = await res.json();
        // Update message in list
        setMessages(messages.map(msg => 
          msg.id === messageId ? data.message : msg
        ));
      }
    } catch (error) {
      console.error("Failed to react to message:", error);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedUser(null);
    setEditingMessage(null);
  };

  if (!session?.user) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-6 right-6 z-50 w-[900px] h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MessageCircle className="w-6 h-6" />
              <div>
                <h2 className="text-lg font-semibold">Messages</h2>
                {selectedUser && (
                  <p className="text-sm text-blue-100 flex items-center gap-1.5">
                    {selectedUser.name || selectedUser.email}
                    {selectedUser?.role === "admin" && (
                      <span className="text-[10px] font-bold bg-white/20 px-1.5 py-0.5 rounded">
                        👑 Admin
                      </span>
                    )}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                aria-label="Minimize chat"
              >
                <Minimize2 className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 flex overflow-hidden">
            {/* User List */}
            <UserList
              users={users}
              selectedUser={selectedUser}
              onSelectUser={handleSelectUser}
              unreadCounts={unreadCounts}
              onSearch={handleSearch}
            />

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {selectedUser ? (
                <>
                  {isLoadingMessages ? (
                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                        <p className="text-sm text-gray-500">Loading messages...</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <MessageList 
                        messages={messages} 
                        selectedUser={selectedUser}
                        onEditMessage={handleEditMessage}
                        onDeleteMessage={handleDeleteMessage}
                        onReactMessage={handleReactMessage}
                      />
                      <MessageInput 
                        onSend={handleSendMessage}
                        editingMessage={editingMessage}
                        onCancelEdit={handleCancelEdit}
                        onEditSubmit={handleEditSubmit}
                      />
                    </>
                  )}
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center p-8">
                  <div className="text-center max-w-sm">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 mx-auto mb-4 flex items-center justify-center">
                      <MessageCircle className="w-10 h-10 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Select a conversation
                    </h3>
                    <p className="text-sm text-gray-500">
                      Choose a user from the list to start chatting
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
