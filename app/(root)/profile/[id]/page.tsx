import Header from "@/components/Header";
import React from "react";

const page = async ({ params }: ParamsWithSearch) => {
  const { id } = await params;
  return (
    <div>
      {/* Reuse the Header Component */}
      <Header
        subHeader="birat@gmai.com"
        title="Birat | Geek Coder"
        userImg="/assets/images/dummy.jpg"
      ></Header>
      USER ID : {id}
      <h1 className="text-2xl font-karla"></h1>
    </div>
  );
};

export default page;
