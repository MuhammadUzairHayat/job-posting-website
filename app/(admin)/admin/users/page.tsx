import { prisma } from "@/lib/prisma";
import AdminUsersClient from "./AdminUsersClient";
import AdminDashboardLayout from "@/Components/admin/AdminDashboardLayout";

async function getAllUsers() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      emailVerified: true,
      isBlocked: true,
      blockedAt: true,
      blockedReason: true,
      role: true,
      _count: {
        select: {
          jobs: true,
          applications: true,
        },
      },
    },
    orderBy: {
      emailVerified: "desc",
    },
  });

  return users;
}

export default async function AdminUsersPage() {
  const users = await getAllUsers();

  return (
    <AdminDashboardLayout>
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Manage Users</h2>
        <div className="text-sm text-gray-600">
          Total: {users.length} | Active:{" "}
          {users.filter((u) => !u.isBlocked).length} | Blocked:{" "}
          {users.filter((u) => u.isBlocked).length}
        </div>
      </div>

      {users.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-600">No users found</p>
        </div>
      ) : (
        <AdminUsersClient initialUsers={users} />
      )}
    </div>
    </AdminDashboardLayout>
  );
}
