"use client";

import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface BlockedJobWarningProps {
  blockedReason: string;
  blockedAt: Date | null;
}

export default function BlockedJobWarning({ blockedReason, blockedAt }: BlockedJobWarningProps) {
  const [showReasonModal, setShowReasonModal] = useState(false);

  return (
    <>
      <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-xl p-6 shadow-md">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-red-800">
                This Job Has Been Blocked by Admin
              </h3>
              <button
                onClick={() => setShowReasonModal(true)}
                className="text-sm px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4" />
                View Reason
              </button>
            </div>
            <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-3">
              <p className="text-xs text-yellow-800">
                <strong>Important:</strong> This job is currently visible only to you. 
                It will be completely hidden from all users (including you) 24 hours after being blocked
                {blockedAt && ` (${formatDistanceToNow(new Date(blockedAt), { addSuffix: true })})`}.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Blocked Reason Modal */}
      {showReasonModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowReasonModal(false)}
        >
          <div 
            className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <AlertCircle className="text-red-600" />
                Job Blocked - Reason
              </h3>
              <button
                onClick={() => setShowReasonModal(false)}
                className="text-gray-400 hover:text-gray-600 text-xl"
              >
                ✕
              </button>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-gray-800 whitespace-pre-wrap break-words">{blockedReason}</p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-4">
              <p className="text-xs text-yellow-800">
                <strong>Note:</strong> This job will be completely hidden from all users after 24 hours from the block time
                {blockedAt && ` (blocked ${formatDistanceToNow(new Date(blockedAt), { addSuffix: true })})`}.
              </p>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowReasonModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
