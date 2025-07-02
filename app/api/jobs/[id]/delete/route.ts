import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  const currentUserId = session?.user?.id;

  const job = await prisma.job.findUnique({
    where: { id: params.id },
  });

  if (!job || job.postedById !== currentUserId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  await prisma.job.delete({
    where: { id: params.id },
  });

  return NextResponse.redirect(new URL("/jobs", req.url));
}