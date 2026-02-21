import { NextResponse } from "next/server";
import { validateAdminSecret } from "@/lib/auth";

export async function POST(req: Request) {
  const secret = req.headers.get("x-admin-secret");
  if (!validateAdminSecret(secret)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  return NextResponse.json({ success: true, message: "Manual push trigger accepted", received: body ?? null });
}
