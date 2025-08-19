"use client";

import { Trash2, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DeleteJobButtonProps {
  jobId: string;
  jobTitle?: string;
}

export default function DeleteJobButton({
  jobId,
  jobTitle,
}: DeleteJobButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const formData = new FormData();
      const response = await fetch(`/api/jobs/${jobId}/delete`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to delete job");
      }

      // Optionally trigger a refresh or redirect here
    } catch (error) {
      console.error("Error deleting job:", error);
    } finally {
      setIsDeleting(false);
      setShowConfirm(false);
    }
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowConfirm(true)}
        disabled={isDeleting}
        className="relative inline-flex items-center gap-2 px-5 py-2.5
          text-sm font-medium text-white rounded-xl shadow-lg
          bg-gradient-to-r from-red-500 to-rose-600
          hover:from-red-600 hover:to-rose-700
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400
          transition-all duration-200 overflow-hidden group"
      >
        {isDeleting ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
            />
            Deleting...
          </>
        ) : (
          <>
            <Trash2 className="w-4 h-4" />
            Delete
            {/* Animated background effect on hover */}
            <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </>
        )}
      </motion.button>

      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-6 pb-4 flex items-start gap-4">
                <div className="flex-shrink-0 p-2.5 rounded-xl bg-rose-100 text-rose-600">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Delete Job Posting
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {jobTitle
                      ? `Are you sure you want to delete "${jobTitle}"?`
                      : "Are you sure you want to delete this job posting?"}
                  </p>
                </div>
              </div>

              {/* Warning text */}
              <div className="px-6 py-3 bg-amber-50 text-amber-800 text-sm">
                This action cannot be undone. All data will be permanently
                removed.
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 p-6 pt-4">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setShowConfirm(false)}
                  className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 disabled:opacity-70 rounded-lg transition-all flex items-center gap-2"
                >
                  {isDeleting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
