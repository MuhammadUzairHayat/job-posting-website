import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Get user privacy settings
export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { hideLastSeen: true },
    });

    return NextResponse.json({ hideLastSeen: user?.hideLastSeen || false });
  } catch (error) {
    console.error("Error fetching privacy settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch privacy settings" },
      { status: 500 }
    );
  }
}

// Update user privacy settings
export async function PUT(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { hideLastSeen } = await request.json();

    if (typeof hideLastSeen !== "boolean") {
      return NextResponse.json(
        { error: "Invalid privacy setting" },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: { hideLastSeen },
      select: { hideLastSeen: true },
    });

    return NextResponse.json({ 
      success: true, 
      hideLastSeen: updatedUser.hideLastSeen 
    });
  } catch (error) {
    console.error("Error updating privacy settings:", error);
    return NextResponse.json(
      { error: "Failed to update privacy settings" },
      { status: 500 }
    );
  }
}
