import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/adminAuth";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();

  try {
    const job = await prisma.job.update({
      where: { id },
      data: {
        isHidden: body.isHidden
      }
    });

    return NextResponse.json({ 
      job, 
      message: `Job ${body.isHidden ? 'hidden' : 'unhidden'} successfully` 
    });
  } catch (error) {
    console.error("Error toggling job visibility:", error);
    return NextResponse.json(
      { error: "Failed to update job visibility" },
      { status: 500 }
    );
  }
}
