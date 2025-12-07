"use client";
import { signIn } from "next-auth/react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SignInContent() {
  const searchParams = useSearchParams();
  const isBlocked = searchParams.get("blocked") === "true";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {/* Logo and message */}
      <div className="flex flex-col gap-6 max-w-8xl h-full bg-white px-10 py-8 shadow-md rounded-md">
        <span className="flex w-full justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 28 28"
            className="w-6 h-6 mr-2"
            fill="none"
          >
            <rect x="2" y="7" width="24" height="16" rx="3" fill="black" />
            <rect x="7" y="3" width="14" height="6" rx="2" fill="black" />
            <rect x="7" y="14" width="6" height="2" rx="1" fill="#fff" />
            <rect x="15" y="14" width="6" height="2" rx="1" fill="#fff" />
          </svg>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-black bg-clip-text text-transparent">
            JobBoard
          </h1>
        </span>

        <h1 className="text-[1.4rem] text-center font-semibold text-gray-900">
          Welcome to Job Posting Website
        </h1>

        {isBlocked && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-center">
            <p className="font-semibold">Account Blocked</p>
            <p className="text-sm mt-1">Your account has been blocked by an administrator. Please contact support for assistance.</p>
          </div>
        )}

        {/* GitHub Sign In */}
        <button
          onClick={() => signIn("github", { redirectTo: "/" })}
          className="flex gap-4 justify-center w-full max-w-sm px-6 py-3 font-medium transition-all border border-gray-300 bg-gray-50 rounded-lg hover:bg-gray-200 active:scale-95"
        >
          <FaGithub className="w-6 h-6 text-gray-800" />
          <span className="text-gray-800">Continue with GitHub</span>
        </button>

        {/* Google Sign In */}
        <button
          onClick={() => signIn("google", { redirectTo: "/" })}
          className="flex gap-4 justify-center w-full max-w-sm px-6 py-3 font-medium transition-all border border-gray-300 bg-gray-50 rounded-lg hover:bg-gray-200 active:scale-95"
        >
          <FaGoogle className="w-5 h-5 text-red-500" />
          <span className="text-gray-800">Continue with Google</span>
        </button>

        <p className="mt-2 max-w-[22rem] text-sm text-gray-600 text-center">
          Sign in to access exclusive job postings and manage your applications.
        </p>
      </div>
    </div>
  );
}

export default function SignInButtons() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    }>
      <SignInContent />
    </Suspense>
  );
}
