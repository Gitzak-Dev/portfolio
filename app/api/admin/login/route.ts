import { NextResponse } from "next/server";
import { checkAdminPassword, createAdminToken } from "@/lib/adminAuth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const formData = await request.formData();
  const password = String(formData.get("password") || "");

  const isValid = checkAdminPassword(password);

  const redirectOrigin =
    process.env.NODE_ENV === "production"
      ? "https://stackspacer.com"
      : new URL(request.url).origin;

  if (!isValid) {
    return NextResponse.redirect(new URL("/admin/login?error=1", redirectOrigin));
  }

  const response = NextResponse.redirect(new URL("/admin", redirectOrigin));
  const token = createAdminToken();

  response.cookies.set("admin_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}