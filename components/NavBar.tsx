import React from "react";
import Link from "next/link";
import Image from "next/image";

const NavBar = () => {
  return (
    <header className="navbar">
      <nav>
        <Link href="/">
          <Image
            src="/assets/icons/logo.svg"
            alt="Logo"
            width={32}
            height={32}
          />
          <h1>ScreenCast</h1>
        </Link>
      </nav>
    </header>
  );
};

export default NavBar;
