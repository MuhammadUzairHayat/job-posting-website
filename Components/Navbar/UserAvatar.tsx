"use client";
import { User } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";


export function UserAvatar({
  user,
}: {
  user?: { name?: string | null; email?: string | null; image?: string | null };
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative ml-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 transition-all hover:opacity-80 focus:outline-none"
        aria-label="User menu"
      >
        {user?.image ? (
          <Image
            src={user.image}
            alt="User avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
        ) : (
          <FaUserCircle className="w-10 h-10 text-gray-400" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-xl bg-white shadow-xl ring-1 ring-blue-200 ring-opacity-5 animate-fade-in">
          {user ? (
            <div className="py-2">
              <div className="px-4 py-2 border-b border-gray-200">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {user.name}
                </p>
                <p className="text-sm text-gray-500 truncate">{user.email}</p>
              </div>

              <Link
                href={"/dashboard#profile-info"}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 transition-all duration-200 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-700"
              >
                <User size={16} className="mr-2 duration-100" />
                Profile
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/signin" })}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 transition-all duration-200 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-700"
              >
                <FaSignOutAlt className="mr-2 duration-100" />
                Sign out
              </button>
            </div>
          ) : (
            <div className="px-4 py-3 text-sm text-gray-500">Not signed in</div>
          )}
        </div>
      )}
    </div>
  );
}
