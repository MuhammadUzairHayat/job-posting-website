"use client";

import Image from "next/image";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { LogOut, Trash2, ShieldAlert, X } from "lucide-react";
import { User } from "@/lib/props";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  user: User;
}

export default function ProfileInfo({ user }: Props) {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  const openDeleteConfirm = () => {
    setError(null);
    setConfirmText("");
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    try {
      setDeleting(true);
      const res = await fetch("/api/user/delete", { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Failed to delete account");
      }
      await signOut({ callbackUrl: "/" });
    } catch (e: unknown) {
      if (e instanceof Error) setError(e.message);
      else setError("Something went wrong");
    } finally {
      setDeleting(false);
      setConfirmOpen(false);
    }
  };

  return (
    <section id="profile-info" className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      {/* Profile Header */}
      <div className="flex items-start gap-4">
        <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-md">
          <Image
            src={user.image || "/default-avatar.png"}
            alt={user.name || "User"}
            fill
            className="object-cover"
            sizes="80px"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10" />
        </div>
        
        <div className="min-w-0 flex-1">
          <h2 className="text-xl font-semibold text-gray-900 truncate">
            {user.name || "Your Name"}
          </h2>
          <p className="text-gray-500 text-sm break-all mt-1">{user.email}</p>
          
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => signOut({ callbackUrl: "/signin" })}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition-all shadow-sm"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={openDeleteConfirm}
          disabled={deleting}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 disabled:opacity-70 transition-all shadow-sm"
        >
          <Trash2 className="w-4 h-4" />
          {deleting ? "Deleting..." : "Delete Account"}
        </motion.button>
      </div>

      {/* Error Message */}
      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 rounded-lg bg-red-50 text-red-600 text-sm flex items-start gap-2"
        >
          <ShieldAlert className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </motion.div>
      )}

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {confirmOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl border border-gray-100 relative"
            >
              <button
                title="Deletion"
                onClick={() => setConfirmOpen(false)}
                className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-red-50 text-red-500 flex-shrink-0">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Delete your account?</h3>
                  <p className="text-sm text-gray-600 mt-1.5">
                    This will permanently remove all your data. This action cannot be undone.
                  </p>
                </div>
              </div>
              
              <div className="mt-5 space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Type <span className="font-bold">DELETE</span> to confirm
                </label>
                <input
                  autoFocus
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  placeholder="Enter DELETE"
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                />
              </div>
              
              <div className="mt-6 flex justify-end gap-3">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setConfirmOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={confirmDelete}
                  disabled={confirmText !== "DELETE" || deleting}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:bg-red-400 rounded-lg transition-colors"
                >
                  {deleting ? (
                    <span className="flex items-center gap-1.5">
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Deleting...
                    </span>
                  ) : (
                    "Confirm Delete"
                  )}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}