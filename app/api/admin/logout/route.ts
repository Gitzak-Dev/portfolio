import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const redirectOrigin =
    process.env.NODE_ENV === "production"
      ? "https://stackspacer.com"
      : new URL(request.url).origin;

  const response = NextResponse.redirect(new URL("/admin/login", redirectOrigin));

  response.cookies.set("admin_session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}