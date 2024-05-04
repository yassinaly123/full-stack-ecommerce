import React from "react";
import TodayDes from "./TodayDes";
import CategoriesSection from "./CategoriesSection";

const Home = () => {
 
  return (
    <div className="container md:px-4 py-[80px] mx-auto min-[100dvh-400px]">
      <TodayDes />
      <CategoriesSection />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
      </div>
    </div>
  );
};

export default Home;
