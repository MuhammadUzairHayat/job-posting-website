import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { messageId, emoji } = await req.json();

    if (!messageId) {
      return NextResponse.json({ error: "Message ID is required" }, { status: 400 });
    }

    // Find the message
    const message = await prisma.message.findUnique({
      where: { id: messageId },
    });

    if (!message) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }

    // Verify the user is part of this conversation
    if (message.senderId !== session.user.id && message.receiverId !== session.user.id) {
      return NextResponse.json({ error: "You can only react to messages in your conversations" }, { status: 403 });
    }

    // Update the reaction (toggle if same emoji, replace if different, remove if empty)
    const updatedMessage = await prisma.message.update({
      where: { id: messageId },
      data: {
        reaction: message.reaction === emoji ? null : emoji || null,
      },
    });

    return NextResponse.json({ message: updatedMessage });
  } catch (error) {
    console.error("Error updating reaction:", error);
    return NextResponse.json({ error: "Failed to update reaction" }, { status: 500 });
  }
}
