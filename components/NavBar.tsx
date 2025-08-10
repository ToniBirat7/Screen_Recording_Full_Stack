"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
const user = {}; // Session data for the user

const NavBar = () => {
  const router = useRouter();
  return (
    <header className="navbar">
      <nav>
        <Link href="/">
          <Image
            src="/assets/icons/logo.svg"
            alt="Logo Image"
            width={32}
            height={32}
          ></Image>
          <h1>SnapCast</h1>
        </Link>
        {user && (
          <figure>
            <button onClick={() => router.push("/profile/123")}>
              <Image
                src="/assets/images/dummy.jpg"
                width={36}
                height={36}
                alt="User Profile"
                className="rounded-full aspect-square"
              ></Image>
            </button>
            <button
              className="cursor-pointer"
              onClick={() => router.push("/sign-in/")}
            >
              <Image
                src="/assets/icons/logout.svg"
                width={24}
                height={24}
                className="rotate-180"
                alt="Logout"
              ></Image>
            </button>
          </figure>
        )}
      </nav>
    </header>
  );
};

export default NavBar;
