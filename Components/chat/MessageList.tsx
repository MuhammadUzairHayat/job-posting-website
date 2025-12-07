"use client";

import { useEffect, useRef, useState } from "react";
import { format, isToday, isYesterday } from "date-fns";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Image from "next/image";
import MessageActions from "./MessageActions";

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  read: boolean;
  edited?: boolean;
  editedAt?: string | null;
  reaction?: string | null;
  createdAt: string;
  sender?: {
    role: string;
    name: string | null;
  };
}

interface User {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
}

interface Props {
  messages: Message[];
  selectedUser: User;
  onEditMessage: (messageId: string, text: string) => void;
  onDeleteMessage: (messageId: string) => void;
  onReactMessage: (messageId: string, emoji: string) => void;
}

export default function MessageList({ 
  messages, 
  selectedUser,
  onEditMessage,
  onDeleteMessage,
  onReactMessage,
}: Props) {
  const { data: session } = useSession();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const currentUserId = session?.user?.id;
  const [previousMessageCount, setPreviousMessageCount] = useState(0);
  const [isUserScrolling, setIsUserScrolling] = useState(false);

  // Auto-scroll to bottom only when new messages arrive and user is not scrolling
  useEffect(() => {
    const messageCountChanged = messages.length !== previousMessageCount;
    const isNewMessage = messages.length > previousMessageCount;

    if (messageCountChanged) {
      setPreviousMessageCount(messages.length);

      // Only auto-scroll if user is not manually scrolling up
      if (isNewMessage && !isUserScrolling) {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [messages, previousMessageCount, isUserScrolling]);

  // Detect when user manually scrolls
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;
      
      // If user scrolls up, disable auto-scroll
      // If user scrolls to bottom, enable auto-scroll
      setIsUserScrolling(!isAtBottom);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const formatMessageTime = (dateString: string) => {
    const date = new Date(dateString);
    if (isToday(date)) {
      return format(date, "h:mm a");
    } else if (isYesterday(date)) {
      return `Yesterday ${format(date, "h:mm a")}`;
    } else {
      return format(date, "MMM d, h:mm a");
    }
  };

  const groupMessagesByDate = (messages: Message[]) => {
    const groups: { [key: string]: Message[] } = {};
    
    messages.forEach((msg) => {
      const date = new Date(msg.createdAt);
      let key: string;
      
      if (isToday(date)) {
        key = "Today";
      } else if (isYesterday(date)) {
        key = "Yesterday";
      } else {
        key = format(date, "MMMM d, yyyy");
      }
      
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(msg);
    });
    
    return groups;
  };

  const messageGroups = groupMessagesByDate(messages);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 rounded-full bg-gray-100 mx-auto mb-4 flex items-center justify-center">
            <Image
              src={selectedUser.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedUser.name || selectedUser.email)}&size=48&background=4F46E5&color=fff&bold=true`}
              alt={selectedUser.name || "User"}
              width={48}
              height={48}
              className="rounded-full"
            />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {selectedUser.name || selectedUser.email}
          </h3>
          <p className="text-sm text-gray-500">
            No messages yet. Start the conversation!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
      {Object.entries(messageGroups).map(([date, msgs]) => (
        <div key={date}>
          {/* Date Divider */}
          <div className="flex items-center justify-center my-4">
            <div className="bg-gray-100 rounded-full px-3 py-1">
              <span className="text-xs font-medium text-gray-600">{date}</span>
            </div>
          </div>

          {/* Messages */}
          {msgs.map((message, index) => {
            const isOwnMessage = message.senderId === currentUserId;
            const showAvatar = !isOwnMessage && (
              index === 0 ||
              msgs[index - 1]?.senderId !== message.senderId
            );

            return (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex items-end gap-2 ${
                  isOwnMessage ? "flex-row-reverse" : "flex-row"
                } group`}
              >
                {/* Avatar for received messages */}
                {!isOwnMessage && (
                  <div className="w-8 h-8 flex-shrink-0">
                    {showAvatar ? (
                      <Image
                        src={selectedUser.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedUser.name || selectedUser.email)}&size=32&background=4F46E5&color=fff&bold=true`}
                        alt={selectedUser.name || "User"}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8" />
                    )}
                  </div>
                )}

                {/* Message Bubble Container */}
                <div className="flex flex-col gap-1 max-w-[70%]">
                  {/* Admin Badge - shown for received messages from admin */}
                  {!isOwnMessage && message.sender?.role === "admin" && (
                    <div className="flex items-center gap-1 px-2">
                      <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                        👑 Admin
                      </span>
                    </div>
                  )}
                  
                  {/* Message Bubble */}
                  <div className="flex items-center gap-2">
                    {isOwnMessage && (
                      <MessageActions
                        isOwnMessage={isOwnMessage}
                        onEdit={() => onEditMessage(message.id, message.text)}
                        onDelete={() => onDeleteMessage(message.id)}
                        onReact={(emoji) => onReactMessage(message.id, emoji)}
                        currentReaction={message.reaction}
                      />
                    )}
                    
                    <div
                      className={`rounded-2xl px-4 py-2 relative ${
                        isOwnMessage
                          ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap break-words">
                        {message.text}
                      </p>
                      
                      {/* Edited indicator */}
                      {message.edited && (
                        <span className={`text-xs italic ${
                          isOwnMessage ? "text-blue-100" : "text-gray-500"
                        }`}>
                          {" "}(edited)
                        </span>
                      )}
                      
                      <p
                        className={`text-xs mt-1 ${
                          isOwnMessage ? "text-blue-100" : "text-gray-500"
                        }`}
                      >
                        {formatMessageTime(message.createdAt)}
                      </p>

                      {/* Reaction */}
                      {message.reaction && (
                        <div className="absolute -bottom-2 -right-2 bg-white dark:bg-gray-800 rounded-full px-2 py-1 shadow-md border border-gray-200 dark:border-gray-700">
                          <span className="text-sm">{message.reaction}</span>
                        </div>
                      )}
                    </div>

                    {!isOwnMessage && (
                      <MessageActions
                        isOwnMessage={isOwnMessage}
                        onEdit={() => onEditMessage(message.id, message.text)}
                        onDelete={() => onDeleteMessage(message.id)}
                        onReact={(emoji) => onReactMessage(message.id, emoji)}
                        currentReaction={message.reaction}
                      />
                    )}
                  </div>
                </div>

                {/* Spacer for own messages */}
                {isOwnMessage && <div className="w-8" />}
              </motion.div>
            );
          })}
        </div>
      ))}

      {/* Auto-scroll anchor */}
      <div ref={messagesEndRef} />
    </div>
  );
}
