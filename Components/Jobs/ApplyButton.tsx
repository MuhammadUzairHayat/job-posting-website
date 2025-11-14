"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { SendHorizonal } from "lucide-react";
import SuccessMessage from "../AlertMessages/SuccessMessage";
import ErrorMessage from "../AlertMessages/ErrorMessage";

interface ApplyButtonProps {
  jobId: string;
  applied: string;
  formData: {
    coverLetter: string;
    phoneNumber: string;
    linkedin: string;
    github: string;
    portfolio: string;
  };
  resume: File | null;
}

const ApplyButton: React.FC<ApplyButtonProps> = ({
  jobId,
  applied,
  formData,
  resume,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(applied === "success");
  const [error, setError] = useState<boolean>(false);
  const router = useRouter();

  async function jobApplyHandler() {
    setLoading(true);

    try {
      const form = new FormData();

      form.append("coverLetter", formData.coverLetter);
      form.append("phoneNumber", formData.phoneNumber);
      form.append("linkedin", formData.linkedin);
      form.append("github", formData.github);
      form.append("portfolio", formData.portfolio);

      if (resume) {
        form.append("resume", resume);
      } else {
        alert("Please upload a PDF resume.");
        setLoading(false);
        return;
      }

      const res = await fetch(`/api/jobs/${jobId}/apply`, {
        method: "POST",
        body: form,
      });

      if (res.redirected) {
        router.push(res.url);
        return;
      }

      if (res.ok) {
        setSuccess(true);
        router.refresh();
      } else {
        setError(false);
      }
    } catch (err) {
      setError(false);
      console.error("Error Occurred: " + err);
    }

    setLoading(false);
  }

  return (
    <>
      {success && (
        <SuccessMessage message="Application submitted successfully!" />
      )}
      {error && <ErrorMessage message={error && "Error Occurred: in applying"} />}
      <button
        type="button" 
        onClick={jobApplyHandler}
        disabled={loading}
        className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 
          text-white text-sm font-medium rounded-lg shadow-sm
          bg-gradient-to-r from-blue-600 to-indigo-600
          hover:from-blue-700 hover:to-indigo-700
          disabled:opacity-60 disabled:cursor-not-allowed
          transition-all duration-200`}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              />
            </svg>
            Applying...
          </>
        ) : (
          <>
            <SendHorizonal className="w-4 h-4" />
            Apply Now
          </>
        )}
      </button>
    </>
  );
};

export default ApplyButton;
