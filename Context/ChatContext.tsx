"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useSession } from "next-auth/react";

interface User {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  jobTitle: string | null;
  role?: string;
}

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  read: boolean;
  createdAt: string;
}

interface ChatContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedUser: User | null;
  setSelectedUser: (user: User | null) => void;
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  unreadCount: number;
  setUnreadCount: (count: number) => void;
  users: User[];
  setUsers: (users: User[]) => void;
  isLoadingMessages: boolean;
  setIsLoadingMessages: (loading: boolean) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);

  // Fetch unread count on mount and when chat closes
  useEffect(() => {
    if (session?.user && !isOpen) {
      fetchUnreadCount();
    }
  }, [session, isOpen]);

  // Poll for new messages every 3 seconds when chat is open
  useEffect(() => {
    if (!session?.user || !selectedUser || !isOpen) return;

    const interval = setInterval(() => {
      fetchMessages(selectedUser.id);
    }, 3000);

    return () => clearInterval(interval);
  }, [session, selectedUser, isOpen]);

  const fetchUnreadCount = async () => {
    try {
      const res = await fetch("/api/chat/unread");
      if (res.ok) {
        const data = await res.json();
        setUnreadCount(data.count || 0);
      }
    } catch (error) {
      console.error("Failed to fetch unread count:", error);
    }
  };

  const fetchMessages = async (userId: string) => {
    try {
      const res = await fetch(`/api/chat/messages?userId=${userId}`);
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages || []);
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        isOpen,
        setIsOpen,
        selectedUser,
        setSelectedUser,
        messages,
        setMessages,
        unreadCount,
        setUnreadCount,
        users,
        setUsers,
        isLoadingMessages,
        setIsLoadingMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}
