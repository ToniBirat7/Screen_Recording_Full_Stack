import React from "react";
import Image from "next/image";

const EmptyState = ({ icon, title, description }: EmptyStateProps) => {
  return (
    <section className="empty-state">
      <div className="">
        <Image src={icon} alt="icon" width={46} height={46}></Image>
      </div>
      <article className="">
        <h1>{title}</h1>
        <p>{description}</p>
      </article>
    </section>
  );
};

export default EmptyState;
