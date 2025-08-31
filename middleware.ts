import aj from "@/arcjet";
import { createMiddleware, detectBot, shield } from "@arcjet/next";

const validate = aj
  .withRule(
    shield({
      // Shield Protection to Prevent Sus Activity
      mode: "LIVE",
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
