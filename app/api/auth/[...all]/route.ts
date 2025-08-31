import { auth } from "@/lib/auth";
import { slidingWindow, validateEmail } from "@arcjet/next";
import { toNextJsHandler } from "better-auth/next-js";

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

export const { GET, POST } = toNextJsHandler(auth.handler);
