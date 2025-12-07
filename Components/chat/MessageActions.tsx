"use client";

import { useState, useRef, useEffect } from "react";
import { MoreVertical, Edit2, Trash2, Smile } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MessageActionsProps {
  isOwnMessage: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onReact: (emoji: string) => void;
  currentReaction?: string | null;
}

const EMOJI_OPTIONS = ["👍", "❤️", "😂", "😮", "😢", "🙏"];

export default function MessageActions({
  isOwnMessage,
  onEdit,
  onDelete,
  onReact,
  currentReaction,
}: MessageActionsProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
        setShowEmojis(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={menuRef} className="relative">
      {/* Three dots button */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
        aria-label="Message actions"
      >
        <MoreVertical size={16} className="text-gray-500 dark:text-gray-400" />
      </button>

      {/* Dropdown menu */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.1 }}
            className={`absolute ${
              isOwnMessage ? "right-0" : "left-0"
            } mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 min-w-[150px] z-50`}
          >
            {/* React button */}
            <button
              onClick={() => {
                setShowEmojis(!showEmojis);
              }}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
            >
              <Smile size={16} />
              <span>React</span>
            </button>

            {/* Show emoji picker when react is clicked */}
            {showEmojis && (
              <div className="px-2 py-2 flex gap-1 flex-wrap border-t border-gray-200 dark:border-gray-700">
                {EMOJI_OPTIONS.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => {
                      onReact(emoji);
                      setShowMenu(false);
                      setShowEmojis(false);
                    }}
                    className={`text-xl hover:scale-125 transition-transform p-1 rounded ${
                      currentReaction === emoji ? "bg-blue-100 dark:bg-blue-900" : ""
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}

            {/* Edit button - only for own messages */}
            {isOwnMessage && (
              <button
                onClick={() => {
                  onEdit();
                  setShowMenu(false);
                }}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
              >
                <Edit2 size={16} />
                <span>Edit</span>
              </button>
            )}

            {/* Delete button - only for own messages */}
            {isOwnMessage && (
              <button
                onClick={() => {
                  onDelete();
                  setShowMenu(false);
                }}
                className="w-full px-4 py-2 text-left text-sm hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 flex items-center gap-2"
              >
                <Trash2 size={16} />
                <span>Delete</span>
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
