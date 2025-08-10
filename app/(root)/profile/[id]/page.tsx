import Header from "@/components/Header";
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
    </div>
  );
};

export default page;
