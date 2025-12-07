import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { messageId, text } = await req.json();

    if (!messageId || !text?.trim()) {
      return NextResponse.json({ error: "Message ID and text are required" }, { status: 400 });
    }

    // Verify the message belongs to the current user
    const message = await prisma.message.findUnique({
      where: { id: messageId },
    });

    if (!message) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }

    if (message.senderId !== session.user.id) {
      return NextResponse.json({ error: "You can only edit your own messages" }, { status: 403 });
    }

    // Update the message
    const updatedMessage = await prisma.message.update({
      where: { id: messageId },
      data: {
        text: text.trim(),
        edited: true,
        editedAt: new Date(),
      },
    });

    return NextResponse.json({ message: updatedMessage });
  } catch (error) {
    console.error("Error editing message:", error);
    return NextResponse.json({ error: "Failed to edit message" }, { status: 500 });
  }
}
