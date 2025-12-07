import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get unread message counts grouped by sender
    const unreadMessages = await prisma.message.groupBy({
      by: ["senderId"],
      where: {
        receiverId: session.user.id,
        read: false,
      },
      _count: {
        id: true,
      },
    });

    // Convert to object with userId as key
    const counts: { [userId: string]: number } = {};
    unreadMessages.forEach((item) => {
      counts[item.senderId] = item._count.id;
    });

    return NextResponse.json({ counts });
  } catch (error) {
    console.error("Error fetching unread counts by user:", error);
    return NextResponse.json(
      { error: "Failed to fetch unread counts" },
      { status: 500 }
    );
  }
}
