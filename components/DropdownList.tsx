"use client";

import React, { useState } from "react";
import Image from "next/image";

const DropdownList = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      {/* Structure for the DropDown */}
      <div className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <div className="filter-trigger">
          <figure>
            <Image
              src="/assets/icons/hamburger.svg"
              alt="Filter"
              width={14}
              height={14}
            ></Image>
            Most Recent
          </figure>
          <Image
            src="/assets/icons/arrow-down.svg"
            width={14}
            height={14}
            alt="Down Arrpw"
          ></Image>
        </div>

        {/* Open the DropDown Unordered List*/}

        {isOpen && (
          <ul className="dropdown">
            {["Most Recent", "Most Liked"].map((option) => (
              <li key={option} className="list-item">
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DropdownList;
