import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ICONS } from "@/constants";

const Header = ({ subHeader, title, userImg }: SharedHeaderProps) => {
  return (
    // Sets the header
    <header className="header">
      <section className="header-container">
        {/* Small Details */}
        <div className="details">
          {/* Check if User Image Exists */}
          {userImg && (
            <Image
              src={userImg || "/assets/images/dummy.jpg"}
              alt="User"
              width={66}
              height={66}
              className="rounded-full"
            ></Image>
          )}

          {/* Type of Page */}
          <article>
            <p>{subHeader}</p>
            <h1>{title}</h1>
          </article>
        </div>

        <aside>
          <Link href="/upload">
            <Image
              src="/assets/icons/upload.svg"
              alt="Upload"
              width={16}
              height={16}
            ></Image>
            <span>Upload A Video</span>
          </Link>

          <div className="record">
            <button className="primary-btn">
              <Image
                src={ICONS.record}
                alt="record"
                width={16}
                height={16}
              ></Image>
              <span>Record a Video</span>
            </button>
          </div>
        </aside>
      </section>
    </header>
  );
};

export default Header;
