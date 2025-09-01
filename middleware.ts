import aj from "@/arcjet";
import { createMiddleware, detectBot, shield } from "@arcjet/next";

const validate = aj
  .withRule(
    shield({
      // Shield Protection to Prevent Sus Activity
      mode: process.env.NODE_ENV === "production" ? "LIVE" : "DRY_RUN", // If production the LIVE else DRY_RUN
    })
  )
  .withRule(
    detectBot({
      // Bot Protection, Allow Only Few but Block Others
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE", "GOOGLE_CRAWLER"],
    })
  );

export default createMiddleware(validate); // Export this ArcJet Middleware
