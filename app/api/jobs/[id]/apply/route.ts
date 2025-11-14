import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    // Redirect to login if not authenticated
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const data = await req.formData();

    const existingApplication = await prisma.application.findFirst({
      where: {
        userId,
        jobId: id,
      },
    });

    if (existingApplication) {
      // Redirect to job page with applied=1
      return NextResponse.redirect(new URL(`/jobs/${id}?applied=already`, req.url));
    }

    const resume = data.get("resume") as File;
    if (!resume) {
      // Redirect to job page with error
      return NextResponse.redirect(
        new URL(`/jobs/${id}?applied=resume_missing`, req.url)
      );
    }

    const buffer = Buffer.from(await resume.arrayBuffer());

    // Upload to Cloudinary
    const uploadRes = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "raw", // raw for PDFs
            folder: "resumes",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(buffer);
    });

    const cloudinaryResult = uploadRes as { secure_url: string };

    await prisma.application.create({
      data: {
        userId,
        jobId: id,
        status: "pending",
        coverLetter: (data.get("coverLetter") as string) || "",
        phoneNumber: (data.get("phoneNumber") as string) || "",
        linkedin: (data.get("linkedin") as string) || "",
        github: (data.get("github") as string) || "",
        portfolio: (data.get("portfolio") as string) || "",
        resumeUrl: cloudinaryResult.secure_url,
      },
    });

    // Redirect to job page with applied=success
    return NextResponse.redirect(
      new URL(`/jobs/${id}?applied=success`, req.url)
    );
  } catch (error) {
    console.error("Error applying for job:", error);
    // Redirect to job page with error
    return NextResponse.redirect(new URL(`/jobs/${id}?applied=error`, req.url));
  }
}
