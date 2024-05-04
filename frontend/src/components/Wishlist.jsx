import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";

const Wishlist = () => {
  const { wishlistItems } = useSelector((state) => state.wishlist);
  return (
    <section className="container mx-auto py-10 min-h-[calc(600px-2.1rem)]">
      {wishlistItems.length === 0 ? (
        <motion.h1
          className=" text-center text-secondary text-[2rem]"
          initial={{ translateX: -1000 }}
          animate={{ translateX: 0 }}
          transition={{ duration: 1 }}
        >
          No items in wishlist
        </motion.h1>
      ) : (
        <>
          <h1 className="text-center text-secondary text-[2rem] mb-5">Wishlist</h1>
          <div className="flex flex-wrap justify-center md:justify-start gap-y-5 md:gap-y-0 gap-x-10 items-center">
            {wishlistItems.map((product) => (
              <ProductCard product={product} key={product.id} liked={true} />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default Wishlist;
