import { auth } from "@/lib/auth";
import { ArcjetDecision, slidingWindow, validateEmail } from "@arcjet/next";
import { toNextJsHandler } from "better-auth/next-js";
import { NextRequest } from "next/server";
import ip from "@arcjet/ip";
import aj from "@/arcjet";

// Email Validation -> Arcject Email Protection Spam Email, Temp Email Sites
const emailValidation = aj.withRule(
  validateEmail({
    mode: "LIVE",
    block: ["DISPOSABLE", "INVALID", "NO_MX_RECORDS"], // Block these types
  })
);

// Rate Limiting -> ArcJet Advanced Rate Limiting
const rateLimit = aj.withRule(
  slidingWindow({
    mode: "LIVE",
    interval: "2m",
    max: 2,
    characteristics: ["fingerprint"],
  })
);

// Implement both the Validation in Order
const protectAuth = async (req: NextRequest): Promise<ArcjetDecision> => {
  // Get Session Id
  const session = await auth.api.getSession({ headers: req.headers });

  let userId: string;

  // Set Session if exists else use IP Address of the User
  if (session?.user?.id) {
    userId = session.user.id;
  } else {
    userId = ip(req) || "127.0.0.1"; // Or Default if not IP is Found
  }

  // If the user is trying for Sign-in
  if (req.nextUrl.pathname.startsWith("/api/auth/sign-in")) {
    const body = await req.clone().json(); // Get the body of the Request

    if (typeof body.Email === "string") {
      // Check if it is String
      return emailValidation.protect(req, { email: body.email }); // Validate the Email
    }
  }

  // Return
  return rateLimit.protect(req, { fingerprint: userId });
};

export const { GET, POST } = toNextJsHandler(auth.handler);
