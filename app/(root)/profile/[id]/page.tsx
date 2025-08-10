import Header from "@/components/Header";
import VideoCard from "@/components/VideoCard";
import { dummyCards } from "@/constants";
import React from "react";

const page = async ({ params }: ParamsWithSearch) => {
  const { id } = await params;
  return (
    <div className="wrapper page">
      {/* Reuse the Header Component */}
      <Header
        subHeader="birat@gmail.com"
        title="Birat | Geek Coder"
        userImg="/assets/images/dummy.jpg"
      ></Header>

      {/* Video Card for Profile */}

      <section className="video-grid">
        {dummyCards.map((card) => (
          <VideoCard key={card.id} {...card}></VideoCard>
        ))}
      </section>
    </div>
  );
};

export default page;
