import React from "react";
import NavBar from "@/components/NavBar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const layout = async ({ children }: { children: React.ReactNode }) => {
  // Check for Authenticated Session to Access Dashboard, Else Redirect to Sign-in
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Check if session exists
  if (!session) {
    redirect("/sign-in");
  }

  // Else continue normal flow
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
};

export default layout;
