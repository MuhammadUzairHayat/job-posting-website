"use client";

import Image from "next/image";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { User } from "@/lib/props";

interface Props {
  user: User;
}

export default function ProfileInfo({ user }: Props) {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDeleteAccount = async () => {
    setError(null);
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete your account? This cannot be undone."
    );
    if (!confirmed) return;

    try {
      setDeleting(true);
      const res = await fetch("/api/user/delete", { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Failed to delete account");
      }
      await signOut({ callbackUrl: "/" });
    } catch (e: any) {
      setError(e?.message || "Something went wrong");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <section className="bg-white rounded-lg p-4 sm:p-6">
      <div className="flex items-start gap-4 sm:gap-6">
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border border-gray-200">
          <Image
            src={user.image || "/default-avatar.png"}
            alt={user.name || "User"}
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>
        <div className="min-w-0">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">{user.name || "Your Name"}</h2>
          <p className="text-gray-600 text-sm break-all">{user.email}</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          onClick={() => signOut({ callbackUrl: "/signin" })}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-700 hover:opacity-95"
        >
          Logout
        </button>
        <button
          onClick={handleDeleteAccount}
          disabled={deleting}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:opacity-60"
        >
          {deleting ? "Deleting..." : "Delete Account"}
        </button>
      </div>

      {error && (
        <p className="mt-3 text-sm text-red-600" role="alert">{error}</p>
      )}
    </section>
  );
}


