"use client";

import { useState } from "react";
import { Search, User as UserIcon, Users } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

interface User {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  jobTitle: string | null;
  role?: string;
}

interface Props {
  users: User[];
  selectedUser: User | null;
  onSelectUser: (user: User) => void;
  unreadCounts: { [userId: string]: number };
  onSearch: (query: string) => void;
  onlineStatuses: { [userId: string]: boolean };
}

export default function UserList({ 
  users, 
  selectedUser, 
  onSelectUser, 
  unreadCounts,
  onSearch,
  onlineStatuses,
}: Props) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className="w-80 border-r border-gray-200 bg-gray-50 flex flex-col">
      {/* Search Bar */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search users..."
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        {!searchQuery && users.length > 0 && (
          <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
            <Users className="w-3 h-3" />
            Recent conversations
          </p>
        )}
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto">
        {users.length === 0 ? (
          <div className="p-8 text-center">
            <UserIcon className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="text-sm text-gray-500">
              {searchQuery ? "No users found" : "No conversations yet"}
            </p>
            {!searchQuery && (
              <p className="text-xs text-gray-400 mt-2">
                Search above to find users
              </p>
            )}
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {users.map((user) => {
              const isSelected = selectedUser?.id === user.id;
              const unreadCount = unreadCounts[user.id] || 0;
              const isOnline = onlineStatuses[user.id] || false;

              return (
                <motion.button
                  key={user.id}
                  onClick={() => onSelectUser(user)}
                  className={`w-full p-4 flex items-center gap-3 hover:bg-white transition-colors text-left ${
                    isSelected ? "bg-white border-l-4 border-blue-500" : ""
                  }`}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="relative flex-shrink-0">
                    <Image
                      src={user.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || user.email)}&size=48&background=4F46E5&color=fff&bold=true`}
                      alt={user.name || "User"}
                      width={48}
                      height={48}
                      className="rounded-full border-2 border-white shadow-sm"
                    />
                    {/* Online/Offline indicator */}
                    <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                      isOnline ? "bg-green-500" : "bg-gray-400"
                    }`} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <h3 className="text-sm font-semibold text-gray-900 truncate">
                          {user.name || "Unknown User"}
                        </h3>
                        {user.role === "admin" && (
                          <span className="flex-shrink-0 text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                            👑
                          </span>
                        )}
                      </div>
                      {unreadCount > 0 && (
                        <span className="flex-shrink-0 ml-2 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                          {unreadCount > 9 ? "9+" : unreadCount}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 truncate">
                      {user.jobTitle || user.email}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
