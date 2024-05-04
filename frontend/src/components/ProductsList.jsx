import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import { useGetProductsHavingDiscountQuery } from "../rtk/slices/productSlice";
import { useSelector } from "react-redux";

const ProductsList = () => {
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { data: products, isLoading , isError } = useGetProductsHavingDiscountQuery();

  if (isLoading) {
    return (
      <h1 className="min-h-[600px] text-center text-secondary">loading..</h1>
    );
  }

  if (isError) {
    return (
      <h1 className="min-h-[600px] text-center text-secondary">Something went wrong!</h1>
    );
  }

  return (
    <div className="flex flex-wrap justify-center md:justify-start gap-y-5 md:gap-y-0 gap-x-10 items-center">
      {products.map((product) => {
        let liked = false;
        if (wishlistItems) {
          liked =
            Array.isArray(wishlistItems) &&
            wishlistItems.some((item) => item.id === product.id);
        }
        return <ProductCard product={product} liked={liked} key={product.id} />;
      })}
    </div>
  );
};

export default ProductsList;
