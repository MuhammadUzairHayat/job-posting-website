"use client";

import { useState } from "react";
import { FaBan, FaEye, FaInfoCircle } from "react-icons/fa";

interface User {
  id: string;
  email: string;
  name: string | null;
  emailVerified: Date | null;
  isBlocked: boolean;
  blockedAt: Date | null;
  blockedReason: string | null;
  role: string;
  _count: {
    jobs: number;
    applications: number;
  };
  jobs?: Array<{
    id: string;
    title: string;
    company: string;
    postedAt: Date;
    isBlocked: boolean;
    isHidden: boolean;
    _count: {
      applications: number;
    };
  }>;
  applications?: Array<{
    id: string;
    appliedAt: Date;
    job: {
      id: string;
      title: string;
      company: string;
    };
  }>;
}

interface AdminUsersClientProps {
  initialUsers: User[];
}

export default function AdminUsersClient({
  initialUsers,
}: AdminUsersClientProps) {
  const [users, setUsers] = useState<User[]>(initialUsers);
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
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Jobs Posted
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applications
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className={user.isBlocked ? "bg-red-50" : ""}>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {user.name || "N/A"}
                      </p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      {user.blockedReason && (
                        <button
                          onClick={() => handleShowReason(user.blockedReason!)}
                          className="mt-1 text-xs text-red-600 hover:text-red-800 underline flex items-center gap-1"
                        >
                          <FaInfoCircle className="w-3 h-3" />
                          View Reason
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        user.role === "admin"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {user._count.jobs}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {user._count.applications}
                  </td>
                  <td className="px-6 py-4">
                    {user.isBlocked ? (
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                        Blocked
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleBlock(user.id, user.isBlocked)}
                        disabled={loading === user.id || user.role === "admin"}
                        className="p-2 text-white bg-red-600 hover:bg-red-700 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
                        title={user.isBlocked ? "Unblock" : "Block"}
                      >
                        <FaBan />
                      </button>
                      <button
                        onClick={() => handleViewDetails(user.id)}
                        className="p-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition"
                        title="View Details"
                      >
                        <FaEye />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
