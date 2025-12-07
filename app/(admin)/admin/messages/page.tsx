import { prisma } from "@/lib/prisma";
import AdminDashboardLayout from "@/Components/admin/AdminDashboardLayout";

async function getAdminMessages() {
  const messages = await prisma.adminMessage.findMany({
    include: {
      job: {
        select: {
          id: true,
          title: true,
          company: true,
        },
      },
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      sentAt: "desc",
    },
  });

  return messages;
}

export default async function AdminMessagesPage() {
  const messages = await getAdminMessages();

  return (
    <AdminDashboardLayout>
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Admin Messages</h2>
        <div className="text-sm text-gray-600">
          Total: {messages.length} | Unread:{" "}
          {messages.filter((m) => !m.isRead).length}
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-600">No messages sent yet</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow">
          <div className="divide-y divide-gray-200">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`p-6 ${!message.isRead ? "bg-blue-50" : ""}`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-semibold text-gray-900">
                      To: {message.user.name || message.user.email}
                    </p>
                    {message.job && (
                      <p className="text-sm text-gray-600">
                        Regarding: {message.job.title} at {message.job.company}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">
                      {new Date(message.sentAt).toLocaleString()}
                    </p>
                    {!message.isRead && (
                      <span className="inline-block mt-1 px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        Unread
                      </span>
                    )}
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {message.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
    </AdminDashboardLayout>
  );
}
