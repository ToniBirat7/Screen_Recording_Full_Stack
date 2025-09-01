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
const protectAuth = async (
  req: Request,
  body?: any
): Promise<ArcjetDecision> => {
  const session = await auth.api.getSession({ headers: req.headers });

  let userId: string;

  if (session?.user?.id) {
    userId = session.user.id;
  } else {
    userId = ip(req) || "127.0.0.1";
  }

  if (req.url.includes("/api/auth/sign-in") && body?.email) {
    return emailValidation.protect(req, { email: body.email });
  }

  return rateLimit.protect(req, { fingerprint: userId });
};

// Export for Better authHandler i.e. OAuth
const authHandler = toNextJsHandler(auth.handler);
export const { GET } = authHandler;

// Export the POST Request for Middleware ArcJet Validator
export const POST = async (req: NextRequest) => {
  // Parse body once
  let rawBody = null;

  try {
    rawBody = await req.json();
  } catch (err) {
    console.error("Failed to parse JSON body:", err);
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
    });
  }

  // Now rawBody is safe to use
  console.log(rawBody);

  // Recreate a fresh Request for authHandler with the same body
  const newReq = new Request(req.url, {
    method: req.method,
    headers: req.headers,
    body: JSON.stringify(rawBody),
  });

  // Run Arcjet protection
  const decision = await protectAuth(newReq, rawBody);

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

  // Pass the recreated Request to authHandler
  return authHandler.POST(newReq);
};
