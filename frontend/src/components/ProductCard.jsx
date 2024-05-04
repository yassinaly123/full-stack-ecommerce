import React, { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../constants";
import { useDispatch } from "react-redux";
import { addToCart } from "../rtk/slices/cartSlice";
import { addToWishlist, removeFromWishlist } from "../rtk/slices/wishlistSlice";
import { motion } from "framer-motion";

const ProductCard = ({ liked: isLiked, product }) => {
  const ref = useRef(null);
  const dispatch = useDispatch();

  const onHover = () => {
    ref.current.style.display = "block";
  };
  const offHover = () => {
    ref.current.style.display = "none";
  };

  const dis = ((product.discount / product.price) * 100).toFixed(2);
  const priceAfterDisc = product.price - (dis / 100) * product.price;

  const handleWishlist = () => {
    if (isLiked) {
      dispatch(removeFromWishlist(product.id));
      return;
    }
    dispatch(addToWishlist(product));
  };

  return (
    <motion.div
      className="w-[270px] h-[350px] justify-self-center"
      initial={{ translateX: -1000 }}
      animate={{ translateX: 0 }}
      transition={{ duration: 1 }}
    >
      <div
        className="bg-[#F5F5F5] relative transition-all duration-300 ease-in-out hover:shadow-lg min-h-[calc(200px+3.7rem)]"
        onMouseEnter={onHover}
        onMouseLeave={offHover}
      >
        <img
          src={`${API_URL}/uploads/${product.image_url}`}
          className="p-10"
          alt="Product"
        />
        {
          product.discount > 0 && (
            <div className="absolute top-0 left-0 bg-secondary text-white p-1 rounded-br-lg">
              {dis}% OFF
            </div>
          )
        }
        <div className="absolute top-4 right-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={`w-[2rem] h-[2rem] mb-2 bg-white p-1 rounded-full cursor-pointer transition-all duration-300 delay-50 ease-in-out ${
              isLiked ? " text-red-500 fill-red-500" : ""
            }`}
            onClick={() => {
              handleWishlist();
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
          <Link to={`/products/${product.id}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-[2rem] h-[2rem] bg-white p-1 rounded-full cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </Link>
        </div>
        <button
          className="bg-black text-white text-[1rem] p-[0.7rem] h-[2.8rem] w-full text-center rounded-lg transition-all duration-300 ease-in-out hover:bg-secondary hover:text-black absolute bottom-0 left-0 right-0 hidden"
          ref={ref}
          onClick={() => {
            dispatch(addToCart({ ...product, qty: 1 }));
          }}
        >
          Add To Cart
        </button>
      </div>
      <div className="bg-white">
        <h1 className="text-[#333333] text-[1rem] font-semibold my-3">
          {product.name}
        </h1>
        <div className="flex items-center">
          <p className="text-secondary text-[1rem]">${priceAfterDisc}</p>
          {
            product.discount > 0 && (
              <p className="text-gray-400 text-[1rem] line-through mx-2">
                ${product.price}
              </p>
            )
          }
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
