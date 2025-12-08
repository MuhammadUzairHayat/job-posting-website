"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FaBan, FaEye, FaInfoCircle } from "react-icons/fa";
import type { User } from "@/types/admin";

interface AdminUsersClientProps {
  initialUsers: User[];
}

export default function AdminUsersClient({
  initialUsers,
}: AdminUsersClientProps) {
  const [users, setUsers] = useState<User[]>(initialUsers);

  // Sync state with server data when filters/search change
  useEffect(() => {
    setUsers(initialUsers);
  }, [initialUsers]);
  const [loading, setLoading] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [selectedReason, setSelectedReason] = useState<string>("");

  const handleBlock = async (userId: string, currentStatus: boolean) => {
    const reason = currentStatus
      ? null
      : prompt("Enter reason for blocking this user:");

    if (!currentStatus && !reason) return;

    setLoading(userId);
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          isBlocked: !currentStatus,
          blockedReason: reason,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(
          users.map((user) =>
            user.id === userId
              ? {
                  ...user,
                  isBlocked: data.user.isBlocked,
                  blockedAt: data.user.blockedAt,
                  blockedReason: data.user.blockedReason,
                }
              : user
          )
        );
        alert(data.message);
      } else {
        alert("Failed to update user");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred");
    } finally {
      setLoading(null);
    }
  };

  const handleViewDetails = async (userId: string) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setSelectedUser(data.user);
        setShowDetailsModal(true);
      } else {
        alert("Failed to fetch user details");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred");
    }
  };

  const handleShowReason = (reason: string) => {
    setSelectedReason(reason);
    setShowReasonModal(true);
  };

  return (
    <>
      {/* Modern Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className={`bg-white rounded-2xl shadow-lg border-2 transition-all hover:shadow-xl ${
              user.isBlocked
                ? "border-red-200 bg-red-50/50"
                : "border-gray-100 hover:border-indigo-200"
            }`}
          >
            {/* Card Header with Avatar */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0">
                  <Image
                    src={
                      user.image ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        user.name || user.email
                      )}&size=80&background=4F46E5&color=fff&bold=true`
                    }
                    alt={user.name || "User"}
                    width={64}
                    height={64}
                    className="rounded-full border-4 border-white shadow-md"
                  />
                  {/* Status Indicator */}
                  <div
                    className={`absolute bottom-0 right-0 w-5 h-5 rounded-full border-2 border-white ${
                      user.isBlocked ? "bg-red-500" : "bg-green-400"
                    }`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-gray-900 truncate">
                    {user.name || "Anonymous"}
                  </h3>
                  <p className="text-sm text-gray-600 truncate">{user.email}</p>
                  {user.jobTitle && (
                    <p className="text-xs text-indigo-600 mt-1 truncate">
                      {user.jobTitle}
                    </p>
                  )}
                  {user.location && (
                    <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {user.location}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Card Body with Stats */}
            <div className="p-6 space-y-4">
              {/* Role Badge */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-600">Role</span>
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    user.role === "admin"
                      ? "bg-purple-100 text-purple-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {user.role}
                </span>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                  <p className="text-xs text-blue-600 font-medium mb-1">Jobs Posted</p>
                  <p className="text-2xl font-bold text-blue-700">{user._count.jobs}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-3 border border-green-100">
                  <p className="text-xs text-green-600 font-medium mb-1">Applications</p>
                  <p className="text-2xl font-bold text-green-700">
                    {user._count.applications}
                  </p>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <span className="text-xs font-medium text-gray-600">Status</span>
                {user.isBlocked ? (
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                    Blocked
                  </span>
                ) : (
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                )}
              </div>

              {/* Block Reason */}
              {user.blockedReason && (
                <button
                  onClick={() => handleShowReason(user.blockedReason!)}
                  className="w-full text-xs text-red-600 hover:text-red-800 underline flex items-center justify-center gap-1 py-2 bg-red-50 rounded-lg border border-red-100"
                >
                  <FaInfoCircle className="w-3 h-3" />
                  View Block Reason
                </button>
              )}
            </div>

            {/* Card Footer with Actions */}
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex gap-2">
              <button
                onClick={() => handleViewDetails(user.id)}
                className="flex-1 px-4 py-2.5 text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                title="View Details"
              >
                <FaEye />
                <span className="text-sm">Details</span>
              </button>
              <button
                onClick={() => handleBlock(user.id, user.isBlocked)}
                disabled={loading === user.id || user.role === "admin"}
                className={`flex-1 px-4 py-2.5 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
                  user.isBlocked
                    ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    : "bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700"
                }`}
                title={user.isBlocked ? "Unblock" : "Block"}
              >
                <FaBan />
                <span className="text-sm">{user.isBlocked ? "Unblock" : "Block"}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* User Details Modal */}
      {showDetailsModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 my-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {selectedUser.name || "User Details"}
                </h3>
                <p className="text-sm text-gray-600">{selectedUser.email}</p>
              </div>
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  setSelectedUser(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Jobs Posted */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">
                  Jobs Posted ({selectedUser.jobs?.length || 0})
                </h4>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {selectedUser.jobs && selectedUser.jobs.length > 0 ? (
                    selectedUser.jobs.map((job) => (
                      <div
                        key={job.id}
                        className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <p className="font-medium text-sm text-gray-900">
                          {job.title}
                        </p>
                        <p className="text-xs text-gray-600">{job.company}</p>
                        <div className="flex gap-2 mt-1">
                          <span className="text-xs text-gray-500">
                            {job._count.applications} applications
                          </span>
                          {job.isBlocked && (
                            <span className="text-xs text-red-600">
                              • Blocked
                            </span>
                          )}
                          {job.isHidden && (
                            <span className="text-xs text-yellow-600">
                              • Hidden
                            </span>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No jobs posted</p>
                  )}
                </div>
              </div>

              {/* Applications */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">
                  Applications ({selectedUser.applications?.length || 0})
                </h4>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {selectedUser.applications &&
                  selectedUser.applications.length > 0 ? (
                    selectedUser.applications.map((app) => (
                      <div
                        key={app.id}
                        className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <p className="font-medium text-sm text-gray-900">
                          {app.job.title}
                        </p>
                        <p className="text-xs text-gray-600">{app.job.company}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Applied:{" "}
                          {new Date(app.appliedAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No applications</p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  setSelectedUser(null);
                }}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Blocked Reason Modal */}
      {showReasonModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <FaInfoCircle className="text-red-600" />
                Block Reason
              </h3>
              <button
                onClick={() => {
                  setShowReasonModal(false);
                  setSelectedReason("");
                }}
                className="text-gray-400 hover:text-gray-600 text-xl"
              >
                ✕
              </button>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-gray-800 whitespace-pre-wrap break-words">{selectedReason}</p>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => {
                  setShowReasonModal(false);
                  setSelectedReason("");
                }}
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
