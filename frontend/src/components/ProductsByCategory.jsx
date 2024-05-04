import React from "react";
import { useParams } from "react-router-dom";
import { useGetProductsByCategoryQuery } from "../rtk/slices/productSlice";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const ProductsByCategory = () => {
  const { id } = useParams();
  const { data: products, isLoading } = useGetProductsByCategoryQuery(id);
  console.log(products);
  const { wishlistItems } = useSelector((state) => state.wishlist);

  if (isLoading) {
    return (
      <motion.h1
        className="min-h-[600px] text-center text-secondary"
        initial={{ opacity: 0, translateX: -1000 }}
        animate={{ opacity: 1, translateX: 0 }}
        transition={{ duration: 1 }}
      >
        loading..
      </motion.h1>
    );
  }
  return (
    <motion.div
      className="min-h-[600px] container mx-auto md:px-10 py-32"
      initial={{ opacity: 0, translateX: -1000 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ duration: 1 }}
    >
      <h1 className="text-center text-secondary text-[2.2rem] font-semibold mb-8">
        Products
      </h1>
      {products ? (
        <div className="flex flex-wrap justify-center md:justify-start gap-y-5 md:gap-y-0 gap-x-10 items-center">
          {products &&
            products.map((product) => {
                let liked = false;
                if (wishlistItems) {
                  liked =
                    Array.isArray(wishlistItems) &&
                    wishlistItems.some((item) => item.id === product.id);
                return (
                  <ProductCard
                    product={product}
                    liked={liked}
                    key={product.id}
                  />
                );
              }
            })}
        </div>
      ) : (
        <h1 className="min-h-[600px] text-center text-secondary text-[2rem] mt-8">
          No products found
        </h1>
      )}
    </motion.div>
  );
};

export default ProductsByCategory;
