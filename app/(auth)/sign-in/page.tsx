"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";

const page = () => {
  // Handle Signin
  const handleSignIn = async () => {
    return await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <main className="sign-in">
      <aside className="testimonial">
        <Link href="/">
          <Image
            src="/assets/icons/logo.svg"
            alt="logo"
            width={32}
            height={32}
          ></Image>
        </Link>
        <div className="description">
          <section>
            <figure>
              {Array.from({ length: 5 }).map((_, index) => (
                <Image
                  src="/assets/icons/star.svg"
                  alt="star"
                  width={20}
                  height={20}
                  key={index}
                ></Image>
              ))}
            </figure>
            <p>
              SnapCast makes screen recording easy. From quick walkthroughs to
              full presentations, it's fast, smoot, and shreable in seconds
            </p>

            <article>
              <Image
                src="/assets/images/jason.png"
                alt="jason"
                width={64}
                height={64}
                className="rounded-full"
              ></Image>
              <div>
                <h2>Birat Gautam</h2>
                <p>Product Designer, NovaByte</p>
              </div>
            </article>
          </section>
        </div>
        <p>SnapCast {new Date().getFullYear()}</p>
      </aside>
      <aside className="google-sign-in">
        <section>
          <Link href="/">
            <Image
              src="/assets/icons/logo.svg"
              alt="logo"
              width={40}
              height={40}
            ></Image>
            <h1>SnapCast</h1>
          </Link>
          <p>
            Create and Share Your Very First <span>SnapCast Video</span> in no
            time!
          </p>
          <button onClick={handleSignIn}>
            <Image
              src="/assets/icons/google.svg"
              alt="google"
              width={22}
              height={22}
            ></Image>
            <span>Sign in With Google</span>
          </button>
        </section>
      </aside>
      <div className="overlay"></div>
    </main>
  );
};

export default page;
