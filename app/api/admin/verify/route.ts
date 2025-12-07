import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/adminAuth";

export async function GET() {
  const adminStatus = await isAdmin();
  
  return NextResponse.json({ isAdmin: adminStatus });
}
