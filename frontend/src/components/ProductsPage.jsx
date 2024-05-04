import React from "react";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";
import { useGetProductsQuery } from "../rtk/slices/productSlice";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const ProductsPage = () => {
  const { pageNumber } = useParams();
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetProductsQuery({ pageNumber });
  console.log(data);
  return (
    <div className="container md:px-4 py-[80px] mx-auto min-h-[calc(100dvh-200px)]">
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {data && data.products && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.products.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
          <div className="flex justify-center space-x-2 mt-8">
            {[...Array(data.pages).keys()].map((x) => (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={x + 1}
                onClick={() => navigate(`/shop/page/${x + 1}`)}
                className={`px-3 py-1 rounded-full ${
                  x + 1 === data.page ? "bg-main text-white" : "bg-gray-200"
                }`}
              >
                {x + 1}
              </motion.button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductsPage;
