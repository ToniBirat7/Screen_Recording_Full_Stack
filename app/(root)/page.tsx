import Header from "@/components/Header";
import VideoCard from "@/components/VideoCard";
import React from "react";

const Page = () => {
  return (
    <main className="wrapper page">
      <Header title="All Video" subHeader="Public Library" />
      <h1 className="text-2xl font-karla">Welcome to Loom Clone</h1>

      <VideoCard
        id="1"
        title="SnapChat Msg - 30 June 2025"
        thumbnail="/assets/samples/thumbnail (1).png"
        createdAt={new Date("2025-05-01")}
        userImg="/assets/images/jason.png"
        username="Jason"
        views={10}
        visibility="public"
        duration={156}
      ></VideoCard>
    </main>
  );
};

export default Page;
