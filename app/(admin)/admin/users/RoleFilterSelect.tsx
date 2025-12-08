"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface RoleFilterSelectProps {
  currentRole: string;
}

export default function RoleFilterSelect({ currentRole }: RoleFilterSelectProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleRoleChange = (role: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (role) {
      params.set("role", role);
    } else {
      params.delete("role");
    }
    
    // Reset to page 1 when filter changes
    params.set("page", "1");
    
    router.push(`?${params.toString()}`);
  };

  return (
    <div>
      <label htmlFor="roleFilter" className="block text-sm font-medium text-gray-700 mb-2">
        Role
      </label>
      <select
        id="roleFilter"
        name="role"
        value={currentRole}
        onChange={(e) => handleRoleChange(e.target.value)}
        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
      >
        <option value="">All Roles</option>
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
      </select>
    </div>
  );
}
