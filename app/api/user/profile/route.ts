import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await auth();


    if (!session?.user?.id) {
      console.error("Profile update failed - No session or user ID");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: body.name,
        phone: body.phone,
        location: body.location,
        jobTitle: body.jobTitle,
        bio: body.bio || null,
        companyName: body.companyName,
        companyWebsite: body.companyWebsite || null,
        companySize: body.companySize,
        industry: body.industry,
        linkedinUrl: body.linkedinUrl || null,
        githubUrl: body.githubUrl || null,
        portfolioUrl: body.portfolioUrl || null,
        profileCompleted: true,
      },
    });

    return NextResponse.json({ 
      success: true,
      message: "Profile updated successfully",
      user: updatedUser 
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        phone: true,
        location: true,
        jobTitle: true,
        bio: true,
        companyName: true,
        companyWebsite: true,
        companySize: true,
        industry: true,
        linkedinUrl: true,
        githubUrl: true,
        portfolioUrl: true,
        profileCompleted: true,
      },
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}
