import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/adminAuth";
import AdminLayoutClient from "./AdminLayoutClient";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await requireAdmin();
  
  if (!admin) {
    redirect("/admin/login");
  }

  return (
    <AdminLayoutClient
      adminName={admin.user.name || "Admin"}
      adminEmail={admin.user.email || ""}
    >
      {children}
    </AdminLayoutClient>
  );
}
