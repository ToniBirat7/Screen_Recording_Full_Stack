import React from "react";
import Image from "next/image";

const Header = ({ subHeader, title, userImg }: SharedHeaderProps) => {
  return (
    <header className="header">
      <section className="header-container">
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
        </div>
      </section>
    </header>
  );
};

export default Header;
