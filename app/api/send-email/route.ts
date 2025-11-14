import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // console.log("after body");
    const { name, email, subject, number, message } = body ?? {};

    if (!name || !email || !number) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // console.log("after checking name, email, message");

    // Prefer Resend if configured (avoids SMTP auth issues on Outlook)
    if (process.env.RESEND_API_KEY) {
      const resendResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: `JobBoard Website<${process.env.MAIL_FROM}>` || "Contact <onboarding@resend.dev>",
          to: process.env.MAIL_TO,
          reply_to: email,
          subject: `New Contact Form Submission: ${subject || "No subject"}`,
          html: `
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .email-container {
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            overflow: hidden;
        }
        .email-header {
            background-color: #2563eb;
            color: white;
            padding: 20px;
            text-align: center;
        }
        .email-body {
            padding: 25px;
            background-color: #ffffff;
        }
        .detail-row {
            margin-bottom: 15px;
            padding-bottom: 15px;
            border-bottom: 1px solid #f0f0f0;
        }
        .detail-label {
            font-weight: 600;
            color: #2563eb;
            display: inline-block;
            width: 80px;
        }
        .message-content {
            background-color: #f8fafc;
            padding: 15px;
            border-radius: 6px;
            margin-top: 10px;
            border-left: 3px solid #2563eb;
        }
        .footer {
            text-align: center;
            padding: 15px;
            font-size: 12px;
            color: #64748b;
            background-color: #f8fafc;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h1>New Contact Form Submission</h1>
        </div>
        
        <div class="email-body">
            <div class="detail-row">
                <span class="detail-label">Name:</span>
                ${name}
            </div>
            
            <div class="detail-row">
                <span class="detail-label">Email:</span>
                <a href="mailto:${email}">${email}</a>
            </div>
            
            ${
              number
                ? `
            <div class="detail-row">
                <span class="detail-label">Phone:</span>
                <a href="tel:${number}">${number}</a>
            </div>
            `
                : ""
            }
            
            ${
              subject
                ? `
            <div class="detail-row">
                <span class="detail-label">Subject:</span>
                ${subject}
            </div>
            `
                : ""
            }
            
            <div>
                <div class="detail-label">Message:</div>
                <div class="message-content">
                    ${message}
                </div>
            </div>
        </div>
        
        <div class="footer">
            <p>This message was sent from your website contact form.</p>
            <p>© ${new Date().getFullYear()} ${
            process.env.SITE_NAME || "Job Board"
          }. All rights reserved.</p>
            <p>Made by <b>Muhammad Uzair</b></p>
        </div>
    </div>
</body>
</html>
`,
          text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
        }),
      });

      // console.log("after Resending email");

      if (!resendResponse.ok) {
        const errText = await resendResponse.text();
        throw new Error(`Resend API error: ${errText}`);
      }

      // console.log("after resend response");
    }
    // console.log("after Sending Mail");

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("SMTP Connection Error:", error);
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { message: "Error sending email", error: message },
      { status: 500 }
    );
  }
}
