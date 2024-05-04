import React from "react";
import pp from "../assets/Group-192-2.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
const ErrorPage = () => {
  return (
    <motion.div className="min-h-[600px] flex items-center flex-col justify-center lg:flex-row py-10 px-6 md:px-24  gap-16 "
    initial={{ translateX: -1000 }}
    animate={{ translateX: 0 }}
    transition={{ duration: 1 }}
    >
      <div className="w-full lg:w-1/2">
        <motion.img src={pp} alt="Error"  className="mx-auto"
        initial={{ translateY: -1000 }}
        animate={{ translateY: 0 }}
        transition={{ duration: 1 }}
        />
      </div>
      <div className="w-full lg:w-1/2">
        <h1 className="py-1 text-2xl lg:text-3xl font-extrabold text-secondary mb-[1rem] text-center">
          Looks like you've found the doorway to the great nothing
        </h1>
        <p className="py-1 text-base text-secondary text-center">
          The content you’re looking for doesn’t exist. Either it was removed,
          or you mistyped the link.
        </p>
        <p className="py-1 text-base text-secondary text-center">
          Sorry about that! Please visit our hompage to get where you need to
          go.
        </p>
        <Link to="/">
          <button className="py-4 px-8 mt-6 block mx-auto bg-black font-bold text-secondary text-accent rounded-full hover:bg-secondary hover:text-white transition-all ease-in duration-200">
            Go to homepage
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default ErrorPage;
