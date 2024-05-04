import React from "react";
import SectionTag from "./SectionTag";
import Timer from "./Timer";
import ProductsList from "./ProductsList";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const TodayDes = () => {
  return (
    <motion.section
      className="py-12 border-b-2 border-solid"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <SectionTag name={"Today's"} />
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-[2.2rem] font-semibold mt-5">Flash Sales</h2>
        <Timer />
      </div>
      <ProductsList />
      <div className="flex justify-center mt-10">
        <Link
          className="bg-secondary cursor-pointer text-white text-[1rem] p-[0.7rem] h-[2.8rem] w-[10rem] text-center rounded-lg transition-all duration-300 ease-in-out hover:bg-black hover:text-white"
          to={"/shop"}
        >
          View All Products
        </Link>
      </div>
    </motion.section>
  );
};

export default TodayDes;
