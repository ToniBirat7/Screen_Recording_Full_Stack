// Create Single Instance of ArcJet, Because
// The SDK caches the Rules and Configurations to Improve
// Performance

import arcjet from "@arcjet/next";
import { getEnv } from "./lib/utils";

const aj = arcjet({
  key: getEnv("ARCJET_API_KEY"),
  rules: [],
});

export default aj;
