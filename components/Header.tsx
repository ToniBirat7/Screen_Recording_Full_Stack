import React from "react";

const Header = ({ subHeader, title, userImg }: SharedHeaderProps) => {
  return (
    <header className="header">
      <section className="header-container">
        <div className="details"></div>
      </section>
    </header>
  );
};

export default Header;