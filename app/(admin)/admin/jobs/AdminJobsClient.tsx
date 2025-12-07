"use client";

import { useState } from "react";
import { FaBan, FaEye, FaEyeSlash, FaTrash, FaEnvelope, FaInfoCircle } from "react-icons/fa";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  postedAt: string;
  isBlocked: boolean;
  isHidden: boolean;
  blockedReason?: string | null;
  postedBy: {
    name: string | null;
    email: string;
  };
  _count: {
    applications: number;
  };
}

interface AdminJobsClientProps {
  initialJobs: Job[];
}

export default function AdminJobsClient({ initialJobs }: AdminJobsClientProps) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [loading, setLoading] = useState<string | null>(null);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [message, setMessage] = useState("");

  const handleBlock = async (jobId: string, currentStatus: boolean) => {
    const reason = currentStatus
      ? null
      : prompt("Enter reason for blocking this job:");

    if (!currentStatus && !reason) return;

    setLoading(jobId);
    try {
      const response = await fetch(`/api/admin/jobs/${jobId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          isBlocked: !currentStatus,
          blockedReason: reason,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setJobs(
          jobs.map((job) =>
            job.id === jobId
              ? {
                  ...job,
                  isBlocked: data.job.isBlocked,
                  blockedReason: data.job.blockedReason,
                }
              : job
          )
        );
        alert(data.message);
      } else {
        alert("Failed to update job");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred");
    } finally {
      setLoading(null);
    }
  };

  const handleHide = async (jobId: string) => {
    setLoading(jobId);
    try {
      const response = await fetch(`/api/admin/jobs/${jobId}/hide`, {
        method: "PATCH",
      });

      if (response.ok) {
        const data = await response.json();
        setJobs(
          jobs.map((job) =>
            job.id === jobId ? { ...job, isHidden: data.job.isHidden } : job
          )
        );
        alert(data.message);
      } else {
        alert("Failed to update job");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred");
    } finally {
      setLoading(null);
    }
  };

  const handleDelete = async (jobId: string) => {
    if (
      !confirm(
        "Are you sure you want to permanently delete this job? This action cannot be undone."
      )
    ) {
      return;
    }

    setLoading(jobId);
    try {
      const response = await fetch(`/api/admin/jobs/${jobId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setJobs(jobs.filter((job) => job.id !== jobId));
        alert("Job deleted successfully");
      } else {
        alert("Failed to delete job");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred");
    } finally {
      setLoading(null);
    }
  };

  const handleSendMessage = async () => {
    if (!selectedJob || !message.trim()) {
      alert("Please enter a message");
      return;
    }

    try {
      const response = await fetch("/api/admin/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId: selectedJob.id,
          userId: selectedJob.postedBy,
          message: message.trim(),
        }),
      });

      if (response.ok) {
        alert("Message sent successfully");
        setShowMessageModal(false);
        setMessage("");
        setSelectedJob(null);
      } else {
        alert("Failed to send message");
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
                  Job Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Posted By
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
              {jobs.map((job) => (
                <tr key={job.id} className={job.isBlocked ? "bg-red-50" : ""}>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {job.title}
                      </p>
                      <p className="text-sm text-gray-600">{job.company}</p>
                      <p className="text-xs text-gray-500">
                        {job.location} • {job.type}
                      </p>
                      {job.blockedReason && (
                        <button
                          onClick={() => handleShowReason(job.blockedReason!)}
                          className="mt-1 cursor-pointer text-xs text-red-600 hover:text-red-800 underline flex items-center gap-1"
                        >
                          <FaInfoCircle className="w-3 h-3" />
                          View Block Reason
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <p>{job.postedBy.name || "N/A"}</p>
                    <p className="text-xs text-gray-500">{job.postedBy.email}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {job._count.applications}
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      {job.isBlocked ? (
                        <span className="block px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                          Blocked
                        </span>
                      ) : (
                        <span className="block px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      )}
                      {job.isHidden && (
                        <span className="block px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Hidden
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleBlock(job.id, job.isBlocked)}
                        disabled={loading === job.id}
                        className="p-2 text-white bg-red-600 hover:bg-red-700 rounded-md transition disabled:opacity-50"
                        title={job.isBlocked ? "Unblock" : "Block"}
                      >
                        <FaBan />
                      </button>
                      <button
                        onClick={() => handleHide(job.id)}
                        disabled={loading === job.id}
                        className="p-2 text-white bg-yellow-600 hover:bg-yellow-700 rounded-md transition disabled:opacity-50"
                        title={job.isHidden ? "Show" : "Hide"}
                      >
                        {job.isHidden ? <FaEye /> : <FaEyeSlash />}
                      </button>
                      <button
                        onClick={() => handleDelete(job.id)}
                        disabled={loading === job.id}
                        className="p-2 text-white bg-gray-800 hover:bg-gray-900 rounded-md transition disabled:opacity-50"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedJob(job);
                          setShowMessageModal(true);
                        }}
                        className="p-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition"
                        title="Send Message"
                      >
                        <FaEnvelope />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Message Modal */}
      {showMessageModal && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Send Message to {selectedJob.postedBy.name || selectedJob.postedBy.email}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Regarding: <strong>{selectedJob.title}</strong>
            </p>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 min-h-[120px] focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="Enter your message..."
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={handleSendMessage}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Send
              </button>
              <button
                onClick={() => {
                  setShowMessageModal(false);
                  setMessage("");
                  setSelectedJob(null);
                }}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
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
