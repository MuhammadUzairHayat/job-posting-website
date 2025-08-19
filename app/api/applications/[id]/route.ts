import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const existing = await prisma.application.findUnique({ where: { id } });
    if (!existing || existing.userId !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const contentType = req.headers.get("content-type") || "";
    let dataToUpdate: Record<string, string | undefined> = {};
    let newResumeUrl: string | undefined;

    if (contentType.includes("multipart/form-data")) {
      const form = await req.formData();
      const coverLetter = form.get("coverLetter") as string | null;
      const phoneNumber = form.get("phoneNumber") as string | null;
      const linkedin = form.get("linkedin") as string | null;
      const github = form.get("github") as string | null;
      const portfolio = form.get("portfolio") as string | null;
      const status = form.get("status") as string | null;
      const resume = form.get("resume") as File | null;

      if (resume && typeof resume !== "string") {
        const buffer = Buffer.from(await resume.arrayBuffer());
        const uploadRes = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                resource_type: "raw",
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
        newResumeUrl = cloudinaryResult.secure_url;
      }

      dataToUpdate = {
        coverLetter: coverLetter ?? undefined,
        phoneNumber: phoneNumber ?? undefined,
        linkedin: linkedin ?? undefined,
        github: github ?? undefined,
        portfolio: portfolio ?? undefined,
        resumeUrl: newResumeUrl ?? undefined,
        status: status ?? undefined,
      };
    } else {
      const body = await req.json();
      const { coverLetter, phoneNumber, linkedin, github, portfolio, resumeUrl, status } = body ?? {};
      dataToUpdate = {
        coverLetter: typeof coverLetter === "string" ? coverLetter : undefined,
        phoneNumber: typeof phoneNumber === "string" ? phoneNumber : undefined,
        linkedin: typeof linkedin === "string" ? linkedin : undefined,
        github: typeof github === "string" ? github : undefined,
        portfolio: typeof portfolio === "string" ? portfolio : undefined,
        resumeUrl: typeof resumeUrl === "string" ? resumeUrl : undefined,
        status: typeof status === "string" ? status : undefined,
      };
    }

    const updated = await prisma.application.update({
      where: { id },
      data: dataToUpdate,
    });

    return NextResponse.json({ ok: true, application: updated });
  } catch (e) {
    console.error("PATCH /api/applications/[id] failed", e);
    return NextResponse.json({ error: "Failed to update application" }, { status: 500 });
  }
}


