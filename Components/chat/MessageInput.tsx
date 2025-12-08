"use client";

import { useState, KeyboardEvent, useEffect } from "react";
import { Send, Loader2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onSend: (text: string) => Promise<void>;
  disabled?: boolean;
  editingMessage?: { id: string; text: string } | null;
  onCancelEdit?: () => void;
  onEditSubmit?: (messageId: string, text: string) => Promise<void>;
}

export default function MessageInput({ 
  onSend, 
  disabled,
  editingMessage,
  onCancelEdit,
  onEditSubmit,
}: Props) {
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  // Update text when editing message changes
  useEffect(() => {
    if (editingMessage) {
      setText(editingMessage.text);
    } else {
      setText("");
    }
  }, [editingMessage]);

  const handleSend = async () => {
    if (!text.trim() || sending) return;

    setSending(true);
    try {
      if (editingMessage && onEditSubmit) {
        await onEditSubmit(editingMessage.id, text.trim());
      } else {
        await onSend(text.trim());
      }
      setText("");
      if (onCancelEdit) onCancelEdit();
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
    if (e.key === "Escape" && editingMessage && onCancelEdit) {
      onCancelEdit();
    }
  };

  return (
    <div className="border-t border-gray-200 bg-white p-3 sm:p-4">
      {/* Edit mode indicator */}
      <AnimatePresence>
        {editingMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-2 flex items-center justify-between bg-blue-50 dark:bg-blue-900/20 px-2 sm:px-3 py-2 rounded-lg"
          >
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
              <div className="w-1 h-6 sm:h-8 bg-blue-500 rounded-full flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs font-medium text-blue-600 dark:text-blue-400">
                  Editing message
                </p>
                <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 truncate max-w-[200px] sm:max-w-xs">
                  {editingMessage.text}
                </p>
              </div>
            </div>
            <button
              onClick={onCancelEdit}
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 flex-shrink-0"
              aria-label="Cancel editing"
            >
              <X size={14} className="sm:w-4 sm:h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-end gap-1.5 sm:gap-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder={editingMessage ? "Edit your message..." : "Type a message..."}
          disabled={disabled || sending}
          rows={1}
          className="flex-1 resize-none rounded-lg border border-gray-300 px-3 sm:px-4 py-2.5 sm:py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:bg-gray-50 disabled:cursor-not-allowed max-h-32"
        />
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSend}
          disabled={!text.trim() || disabled || sending}
          className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-shadow"
        >
          {sending ? (
            <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
          ) : (
            <Send className="w-4 h-4 sm:w-5 sm:h-5" />
          )}
        </motion.button>
      </div>
      
    </div>
  );
}
