import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Image from "next/image";
import { signOut } from "@/lib/auth";

export default async function BlockedPage() {
  const session = await auth();
  
  // If not authenticated, redirect to signin
  if (!session?.user?.id) {
    redirect("/signin");
  }

  // Get user's blocked status and reason
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      isBlocked: true,
      blockedReason: true,
      blockedAt: true,
      name: true,
      email: true,
      image: true,
    },
  });

  // If user is not blocked, redirect to home
  if (!user || !user.isBlocked) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-red-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-rose-600 px-8 py-10 text-center">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-12 h-12 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full border-4 border-white flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Account Disabled</h1>
            <p className="text-red-100">Your account has been temporarily suspended</p>
          </div>

          {/* User Info */}
          <div className="px-8 py-6 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center gap-4">
              <Image
                src={
                  user.image ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user.name || user.email
                  )}&size=64&background=DC2626&color=fff&bold=true`
                }
                alt={user.name || "User"}
                width={64}
                height={64}
                className="rounded-full border-4 border-red-200"
              />
              <div>
                <p className="text-lg font-bold text-gray-900">{user.name || "User"}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
                {user.blockedAt && (
                  <p className="text-xs text-gray-500 mt-1">
                    Blocked on {new Date(user.blockedAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Reason Section */}
          <div className="px-8 py-8">
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Reason for Suspension</h3>
                  <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                    {user.blockedReason || "No specific reason provided. Please contact support for more information."}
                  </p>
                </div>
              </div>
            </div>

            {/* Information */}
            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-blue-800">
                  If you believe this is a mistake or would like to appeal this decision, please contact our support team.
                </p>
              </div>

              <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-yellow-800">
                  While your account is suspended, you cannot access any features of the platform.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/signin" });
              }}
            >
              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl font-semibold shadow-lg hover:from-gray-700 hover:to-gray-800 transition-all"
              >
                Sign Out
              </button>
            </form>
            <p className="text-center text-xs text-gray-500 mt-4">
              Need help? Contact support at{" "}
              <a href="mailto:support@example.com" className="text-blue-600 hover:underline">
                support@example.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
