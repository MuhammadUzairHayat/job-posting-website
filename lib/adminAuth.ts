import { auth } from "./auth";
import { prisma } from "./prisma";
import { redirect } from "next/navigation";

/**
 * Get the current admin session
 * Returns the session only if the user is an admin
 */
export async function getAdminSession() {
  const session = await auth();
  
  if (!session?.user?.id) {
    return null;
  }

  // Verify user is an admin
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, email: true, name: true, role: true, image: true }
  });

  if (user?.role !== "admin") {
    return null;
  }

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      image: user.image,
      role: user.role
    }
  };
}

/**
 * Require admin authentication
 * Redirects to admin login if not authenticated as admin
 */
export async function requireAdmin() {
  const session = await getAdminSession();
  
  if (!session) {
    redirect("/admin/login");
  }
  
  return session;
}

/**
 * Check if user is admin (for API routes)
 */
export async function isAdmin() {
  const session = await getAdminSession();
  return !!session;
}
