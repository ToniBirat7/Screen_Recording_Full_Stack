import { NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/auth";
import { headers } from "next/headers";

// Middelware Function
export async function middleware(request: NextRequest, response: NextResponse) {
  // Try to access the session
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // No Session
  if (!session) {
    // Redirect to Sign-in page from the current URL
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Else, continue with what it was supposed to do
  return NextResponse.next();
}

// Middleware Routes
export const config = {
  // ReGex for Routes that we want the middleware to be applied
  matcher: [],
};
