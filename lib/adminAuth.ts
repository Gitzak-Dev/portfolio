import crypto from "crypto";

const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

function getSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is missing in .env");
  }

  return secret;
}

function base64UrlEncode(value: string) {
  return Buffer.from(value).toString("base64url");
}

function base64UrlDecode(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function signPayload(payload: string) {
  return crypto
    .createHmac("sha256", getSessionSecret())
    .update(payload)
    .digest("base64url");
}

export function checkAdminPassword(password: string) {
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    throw new Error("ADMIN_PASSWORD is missing in .env");
  }

  const inputBuffer = Buffer.from(password);
  const storedBuffer = Buffer.from(adminPassword);

  if (inputBuffer.length !== storedBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(inputBuffer, storedBuffer);
}

export function createAdminToken() {
  const payload = JSON.stringify({
    role: "admin",
    exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_SECONDS,
  });

  const encodedPayload = base64UrlEncode(payload);
  const signature = signPayload(encodedPayload);

  return `${encodedPayload}.${signature}`;
}

export function verifyAdminToken(token?: string) {
  if (!token) return false;

  const [encodedPayload, signature] = token.split(".");

  if (!encodedPayload || !signature) return false;

  const expectedSignature = signPayload(encodedPayload);

  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (signatureBuffer.length !== expectedBuffer.length) {
    return false;
  }

  const isValidSignature = crypto.timingSafeEqual(
    signatureBuffer,
    expectedBuffer
  );

  if (!isValidSignature) return false;

  try {
    const payload = JSON.parse(base64UrlDecode(encodedPayload)) as {
      role?: string;
      exp?: number;
    };

    if (payload.role !== "admin") return false;
    if (!payload.exp) return false;

    return payload.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}