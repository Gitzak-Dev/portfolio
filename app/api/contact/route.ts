import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name is too short")
    .max(80, "Name is too long"),
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .max(120, "Email is too long"),
  message: z
    .string()
    .trim()
    .min(10, "Message is too short")
    .max(2000, "Message is too long"),
  website: z.string().optional(),
});

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const current = rateLimitMap.get(ip);

  if (!current || current.resetAt < now) {
    rateLimitMap.set(ip, {
      count: 1,
      resetAt: now + 60 * 1000,
    });

    return false;
  }

  if (current.count >= 5) {
    return true;
  }

  current.count += 1;
  rateLimitMap.set(ip, current);

  return false;
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, message: "Too many requests. Try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: parsed.error.issues[0]?.message || "Invalid form data",
        },
        { status: 400 }
      );
    }

    const { name, email, message, website } = parsed.data;

    // Honeypot field. Real users will not fill this.
    if (website) {
      return NextResponse.json({ success: true });
    }

    await prisma.contactSubmission.create({
      data: {
        name,
        email: email.toLowerCase(),
        message,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Message sent successfully.",
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again.",
      },
      { status: 500 }
    );
  }
}