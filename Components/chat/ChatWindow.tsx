"use client";

import { useEffect, useState, useRef } from "react";
import { X, Minimize2, MessageCircle, ArrowLeft, Settings, Eye, EyeOff } from "lucide-react";
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
  isOnline?: boolean;
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
  const [onlineStatuses, setOnlineStatuses] = useState<{ [userId: string]: { isOnline: boolean; lastSeen: Date | null } }>({});
  const [hideLastSeen, setHideLastSeen] = useState(false);
  const [showPrivacyMenu, setShowPrivacyMenu] = useState(false);
  const privacyMenuRef = useRef<HTMLDivElement>(null);

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
      
      // Fetch privacy settings
      fetch("/api/user/privacy")
        .then(res => res.json())
        .then(data => setHideLastSeen(data.hideLastSeen || false))
        .catch(error => console.error("Failed to fetch privacy settings:", error));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, session]);

  // Close privacy menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (privacyMenuRef.current && !privacyMenuRef.current.contains(event.target as Node)) {
        setShowPrivacyMenu(false);
      }
    };

    if (showPrivacyMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPrivacyMenu]);

  // Clean up chat state when user changes (sign out/sign in as different user)
  useEffect(() => {
    // Reset chat state when session user changes
    setSelectedUser(null);
    setMessages([]);
    setUsers([]);
    setUnreadCounts({});
    setOnlineStatuses({});
    setEditingMessage(null);
  }, [session?.user?.id, setSelectedUser, setMessages, setUsers]);

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

  // Heartbeat: Update own online status every 60 seconds
  useEffect(() => {
    if (!isOpen || !session?.user?.id) return;

    // Update immediately on open
    const updateStatus = () => {
      if (session?.user?.id) {
        fetch("/api/chat/status", { method: "POST" });
      }
    };

    updateStatus();

    const heartbeat = setInterval(() => {
      updateStatus();
    }, 60000); // 60 seconds

    return () => {
      clearInterval(heartbeat);
      // Don't update status on cleanup to avoid updating wrong user
    };
  }, [isOpen, session?.user?.id]);

  // Fetch online statuses for all users every 10 seconds
  useEffect(() => {
    if (!isOpen || users.length === 0) return;

    const fetchOnlineStatuses = async () => {
      try {
        const userIds = users.map(u => u.id).join(",");
        const res = await fetch(`/api/chat/status?userIds=${userIds}`);
        if (res.ok) {
          const data = await res.json();
          const statusMap: { [key: string]: { isOnline: boolean; lastSeen: Date | null } } = {};
          Object.keys(data.statuses).forEach(userId => {
            statusMap[userId] = {
              isOnline: data.statuses[userId].isOnline,
              lastSeen: data.statuses[userId].lastSeen ? new Date(data.statuses[userId].lastSeen) : null,
            };
          });
          setOnlineStatuses(statusMap);
        }
      } catch (error) {
        console.error("Failed to fetch online statuses:", error);
      }
    };

    // Fetch immediately
    fetchOnlineStatuses();

    // Poll every 10 seconds
    const interval = setInterval(fetchOnlineStatuses, 10000);

    return () => clearInterval(interval);
  }, [isOpen, users]);

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

  const togglePrivacy = async () => {
    try {
      const newValue = !hideLastSeen;
      const res = await fetch("/api/user/privacy", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hideLastSeen: newValue }),
      });

      if (res.ok) {
        setHideLastSeen(newValue);
        setShowPrivacyMenu(false);
      }
    } catch (error) {
      console.error("Failed to update privacy settings:", error);
    }
  };

  const formatLastSeen = (lastSeen: Date | null): string => {
    if (!lastSeen) return "offline";

    const now = new Date();
    const diffMs = now.getTime() - lastSeen.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "online";
    if (diffMins < 60) return `last seen ${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `last seen ${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `last seen ${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    
    return `last seen ${lastSeen.toLocaleDateString()}`;
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
          className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 z-50 w-full h-full sm:w-[95vw] sm:h-[85vh] sm:max-w-[900px] sm:max-h-[600px] bg-white sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden border-0 sm:border border-gray-200"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              {/* Back button - only on mobile when user is selected */}
              {selectedUser && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedUser(null)}
                  className="p-1.5 hover:bg-white/20 rounded-lg transition-colors sm:hidden flex-shrink-0"
                  aria-label="Back to user list"
                >
                  <ArrowLeft className="w-5 h-5" />
                </motion.button>
              )}
              <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <h2 className="text-base sm:text-lg font-semibold truncate">
                  {selectedUser ? (
                    <>
                      {selectedUser.name || selectedUser.email}
                      {selectedUser?.role === "admin" && (
                        <span className="text-[10px] font-bold bg-white/20 px-1.5 py-0.5 rounded ml-1.5">
                          👑 Admin
                        </span>
                      )}
                    </>
                  ) : (
                    "Messages"
                  )}
                </h2>
                {selectedUser && (
                  <p className="text-[10px] sm:text-xs text-blue-100 truncate">
                    {onlineStatuses[selectedUser.id]?.isOnline ? (
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        online
                      </span>
                    ) : (
                      formatLastSeen(onlineStatuses[selectedUser.id]?.lastSeen || null)
                    )}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              {/* Privacy Settings Menu */}
              <div className="relative" ref={privacyMenuRef}>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowPrivacyMenu(!showPrivacyMenu)}
                  className="p-1.5 sm:p-2 hover:bg-white/20 rounded-lg transition-colors"
                  aria-label="Privacy settings"
                >
                  <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.button>

                <AnimatePresence>
                  {showPrivacyMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50"
                    >
                      <div className="p-2">
                        <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">
                          Privacy Settings
                        </div>
                        <button
                          onClick={togglePrivacy}
                          className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                        >
                          <span className="flex items-center gap-2">
                            {hideLastSeen ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                            Hide Last Seen
                          </span>
                          <div className={`w-10 h-5 rounded-full transition-colors ${
                            hideLastSeen ? "bg-blue-500" : "bg-gray-300"
                          } relative`}>
                            <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                              hideLastSeen ? "translate-x-5" : "translate-x-0"
                            }`} />
                          </div>
                        </button>
                        <div className="px-3 py-2 text-xs text-gray-500">
                          {hideLastSeen 
                            ? "Others can't see when you're online or your last seen"
                            : "Others can see when you're online and your last seen"}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClose}
                className="p-1.5 sm:p-2 hover:bg-white/20 rounded-lg transition-colors hidden sm:block"
                aria-label="Minimize chat"
              >
                <Minimize2 className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClose}
                className="p-1.5 sm:p-2 hover:bg-white/20 rounded-lg transition-colors"
                aria-label="Close chat"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 flex overflow-hidden">
            {/* User List - Hidden on mobile when user is selected */}
            <div className={`${selectedUser ? 'hidden sm:block' : 'block'} w-full sm:w-80 flex-shrink-0`}>
              <UserList
                users={users}
                selectedUser={selectedUser}
                onSelectUser={handleSelectUser}
                unreadCounts={unreadCounts}
                onSearch={handleSearch}
                onlineStatuses={onlineStatuses}
              />
            </div>

            {/* Chat Area - Hidden on mobile when no user selected */}
            <div className={`${selectedUser ? 'flex' : 'hidden sm:flex'} flex-1 flex-col`}>
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
                        isUserOnline={onlineStatuses[selectedUser.id]?.isOnline || false}
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
