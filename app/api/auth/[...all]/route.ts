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
    max: 5,
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

    if (typeof body.email === "string") {
      // Check if it is String
      return emailValidation.protect(req, { email: body.email }); // Validate the Email
    }
  }

  // Finally implement Rate Limiting and Return
  return rateLimit.protect(req, { fingerprint: userId });
};

// Export for Better authHandler i.e. OAuth
const authHandler = toNextJsHandler(auth.handler);
export const { GET } = authHandler;

// Export the POST Request for Middleware ArcJet Validator
export const POST = async (req: NextRequest) => {
  const decision = await protectAuth(req);

  console.log("Rate Limit Decision:", decision);

  if (decision.isDenied()) {
    if (decision.reason.isEmail()) {
      throw new Error("Email Validation Failed");
    }

    if (decision.reason.isRateLimit()) {
      throw new Error("Rate Limit Exceeded");
    }

    if (decision.reason.isShield()) {
      throw new Error("Shield Turned on, protected against malicious actions");
    }
  }

  return authHandler.POST(req);
};
