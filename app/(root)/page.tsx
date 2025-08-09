import Header from "@/components/Header";
import VideoCard from "@/components/VideoCard";
import { dummyCards } from "@/constants";
import React from "react";

const Page = () => {
  return (
    <main className="wrapper page">
      <Header title="All Video" subHeader="Public Library" />
      <h1 className="text-2xl font-karla">Welcome to Loom Clone</h1>

      {/* Dummy Video Card */}

      {dummyCards.map((card) => (
        <VideoCard key={card.id} {...card}></VideoCard>
      ))}
    </main>
  );
};

export default Page;
