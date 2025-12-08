import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Update user's last seen timestamp
export async function POST() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: { lastSeen: new Date() },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating status:", error);
    return NextResponse.json(
      { error: "Failed to update status" },
      { status: 500 }
    );
  }
}

// Get online status for specific users
export async function GET(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const userIds = searchParams.get("userIds")?.split(",") || [];

    if (userIds.length === 0) {
      return NextResponse.json({ statuses: {} });
    }

    const users = await prisma.user.findMany({
      where: {
        id: { in: userIds },
      },
      select: {
        id: true,
        lastSeen: true,
      },
    });

    // Consider user online if lastSeen is within last 2 minutes
    const now = new Date();
    const statuses = users.reduce(
      (acc: Record<string, { isOnline: boolean; lastSeen: Date | null }>, user: { id: string; lastSeen: Date | null }) => {
        const lastSeenTime = user.lastSeen?.getTime() || 0;
        const timeDiff = now.getTime() - lastSeenTime;
        const isOnline = timeDiff < 120000; // 2 minutes in milliseconds
        
        acc[user.id] = {
          isOnline,
          lastSeen: user.lastSeen,
        };
        return acc;
      },
      {}
    );

    return NextResponse.json({ statuses });
  } catch (error) {
    console.error("Error fetching statuses:", error);
    return NextResponse.json(
      { error: "Failed to fetch statuses" },
      { status: 500 }
    );
  }
}
