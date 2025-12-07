import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const searchQuery = searchParams.get("search");
    const mode = searchParams.get("mode") || "recent"; // "recent" or "all"

    if (mode === "recent") {
      // Get users with recent conversations
      const recentConversations = await prisma.message.findMany({
        where: {
          OR: [
            { senderId: session.user.id },
            { receiverId: session.user.id },
          ],
        },
        select: {
          senderId: true,
          receiverId: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      // Extract unique user IDs from conversations
      const userIdsSet = new Set<string>();
      recentConversations.forEach((msg) => {
        if (msg.senderId !== session.user.id) {
          userIdsSet.add(msg.senderId);
        }
        if (msg.receiverId !== session.user.id) {
          userIdsSet.add(msg.receiverId);
        }
      });

      const userIds = Array.from(userIdsSet);

      if (userIds.length === 0) {
        return NextResponse.json({ users: [] });
      }

      // Get user details for recent conversations
      const users = await prisma.user.findMany({
        where: {
          id: { in: userIds },
          isBlocked: false,
        },
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          jobTitle: true,
          role: true,
        },
      });

      // Sort by most recent message
      const sortedUsers = users.sort((a, b) => {
        const aLastMsg = recentConversations.find(
          (msg) => msg.senderId === a.id || msg.receiverId === a.id
        );
        const bLastMsg = recentConversations.find(
          (msg) => msg.senderId === b.id || msg.receiverId === b.id
        );
        return (
          new Date(bLastMsg?.createdAt || 0).getTime() -
          new Date(aLastMsg?.createdAt || 0).getTime()
        );
      });

      return NextResponse.json({ users: sortedUsers });
    }

    // Search mode - search all users (both regular users and admins)
    const whereClause: {
      id: { not: string };
      isBlocked: boolean;
      OR?: Array<{
        name?: { contains: string; mode: "insensitive" };
        email?: { contains: string; mode: "insensitive" };
        jobTitle?: { contains: string; mode: "insensitive" };
      }>;
    } = {
      id: { not: session.user.id },
      isBlocked: false,
    };

    if (searchQuery) {
      whereClause.OR = [
        { name: { contains: searchQuery, mode: "insensitive" } },
        { email: { contains: searchQuery, mode: "insensitive" } },
        { jobTitle: { contains: searchQuery, mode: "insensitive" } },
      ];
    }

    const users = await prisma.user.findMany({
      where: whereClause,
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        jobTitle: true,
        role: true,
      },
      orderBy: {
        name: "asc",
      },
      take: 50, // Limit to 50 results
    });

    return NextResponse.json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
