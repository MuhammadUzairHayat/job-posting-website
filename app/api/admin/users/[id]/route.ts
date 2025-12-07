import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/adminAuth";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        emailVerified: true,
        isBlocked: true,
        blockedAt: true,
        blockedReason: true,
        role: true,
        jobs: {
          select: {
            id: true,
            title: true,
            company: true,
            postedAt: true,
            isBlocked: true,
            isHidden: true,
            _count: {
              select: {
                applications: true
              }
            }
          },
          orderBy: {
            postedAt: "desc"
          }
        },
        applications: {
          select: {
            id: true,
            appliedAt: true,
            status: true,
            job: {
              select: {
                id: true,
                title: true,
                company: true
              }
            }
          },
          orderBy: {
            appliedAt: "desc"
          }
        }
      }
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

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
    const user = await prisma.user.update({
      where: { id },
      data: {
        isBlocked: body.isBlocked,
        blockedAt: body.isBlocked ? new Date() : null,
        blockedReason: body.blockedReason || null
      },
      select: {
        id: true,
        email: true,
        name: true,
        isBlocked: true,
        blockedAt: true,
        blockedReason: true
      }
    });

    return NextResponse.json({ 
      user, 
      message: `User ${body.isBlocked ? 'blocked' : 'unblocked'} successfully` 
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}
