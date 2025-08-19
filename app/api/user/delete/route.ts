import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function DELETE() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Delete user-related data. Relations use onDelete: Cascade on auth models.
    // Remove applications made by the user
    await prisma.application.deleteMany({ where: { userId } });

    // Remove jobs posted by the user (cascades applications)
    await prisma.job.deleteMany({ where: { postedById: userId } });

    // Finally delete the user
    await prisma.user.delete({ where: { id: userId } });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Delete user failed", e);
    return NextResponse.json({ error: "Failed to delete account" }, { status: 500 });
  }
}


