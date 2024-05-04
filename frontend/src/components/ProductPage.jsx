import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetProductQuery } from "../rtk/slices/productSlice";
import { addToCart } from "../rtk/slices/cartSlice";
import { addToWishlist } from "../rtk/slices/wishlistSlice";
import Rating from "./Rating";
import { API_URL } from "../constants";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  useCreateRatingMutation,
  useGetRatingsQuery,
} from "../rtk/slices/ratingsApiSlicce";

import { FaUser } from "react-icons/fa";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = useParams().id;
  const { data: product, isLoading } = useGetProductQuery(id);
  const { data: ratings } = useGetRatingsQuery(id);
  const [createRating] = useCreateRatingMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const [quantity, setQuantity] = useState(1);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [userReview, setUserReview] = useState("");
  const [productRating, setProductRating] = useState(0)

  useEffect(() => {
    if (product && wishlistItems.find((item) => item.id === product.id)) {
      setIsInWishlist(true);
    }
  }, [product, isLoading, wishlistItems]);

  useEffect(() => {
    if (ratings) {
      const totalRating = ratings.reduce((acc, item) => item.rating + acc, 0);
      setProductRating(totalRating / ratings.length);
    }
  }, [ratings]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!userInfo) {
      navigate("/login");
      return;
    }
    try {
      const response = await createRating({
        product_id: id,
        rating: userRating,
        review: userReview,
      });
      if (response.error?.data?.error) {
        toast.error(response.error.data.error);
      } else {
        toast.success("Review submitted successfully");
        setUserRating("1");
        setUserReview("");
      }
    } catch (error) {
      console.error("Failed to submit review:", error);
    }
  };

  const handleAddToWishlist = () => {
    dispatch(addToWishlist(product));
  };

  const handleReviewChange = (e) => {
    setUserReview(e.target.value);
  };

  if (isLoading) {
    return (
      <motion.div
        className="text-secondary text-center text-[2.2rem] mt-8 min-h-[600px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        Loading...
      </motion.div>
    );
  }

  return (
    product && (
      <motion.div
        className="bg-main text-white min-h-[600px] flex justify-center items-center py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="m-auto max-w-[100%] p-4 pv:bg-white pv:p-0 pv:px-4">
          <div className="grid grid-cols-3 md:grid-cols-10 gap-2 pv:flex pv:flex-col pv:items-center">
            <motion.div
              className="col-span-3  p-8 rounded ps:p-1 pv:p-0 pv:px-8"
              initial={{ x: -1000 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img
                className="w-full h-[350px] object-contain"
                src={`${API_URL}/uploads/${product.image_url}`}
                alt="product image"
              />
            </motion.div>
            <motion.div
              className="col-span-5 p-4 rounded shadow-xl text-white "
              initial={{ y: 1000 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-3">
                <h1 className="text-2xl xl:text-3xl font-semibold">
                  {"Title : "} {product.name}
                </h1>
              </div>
              <div className="text-xl xl:text-2xl font-semibold text-red-500 text-righ">
                Price : {product.price}$
              </div>
              {product.discount > 0 && (
                <div className="text-xl xl:text-2xl font-semibold text-red-500 text-righ">
                  Discount : {product.discount}$
                </div>
              )}

              <div className="xl:text-lg mt-3">
                Reviews :{" "}
                <span className="text-yellow-500">{ratings ? ratings.length : 0}</span>
              </div>
              <div className="mt-2">
                <Rating value={productRating}/>
              </div>

              <div className="text-base xl:text-lg mt-3 ">
                {product.description}
              </div>

              <form onSubmit={handleSubmitReview} className="mt-4">
                <div className="flex items-center">
                  <label htmlFor="review" className="mr-2 text-base xl:text-lg">
                    Your Review:
                  </label>
                  <textarea
                    id="review"
                    className="border rounded-md p-2 mt-1 w-full text-main"
                    rows="4"
                    value={userReview}
                    onChange={handleReviewChange}
                    required
                  />
                </div>
                <div className="flex items-center mt-2">
                  <label htmlFor="rating" className="mr-2 text-base xl:text-lg">
                    Your Rating:
                  </label>
                  <select
                    className="border rounded-md p-2 mt-1 bg-main"
                    id="rating"
                    onChange={(e) => {
                      setUserRating(e.target.value);
                    }}
                    required
                  >
                    <option value="1">1 - Poor</option>
                    <option value="2">2 - Fair</option>
                    <option value="3">3 - Good</option>
                    <option value="4">4 - Very Good</option>
                    <option value="5">5 - Excellent</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="rounded-lg bg-main text-white font-semibold border p-3 mt-3 hover:bg-lightMain transition-all"
                >
                  Submit Review
                </button>
              </form>

              <div className="mt-6">
                <h2 className="text-xl xl:text-2xl font-semibold mb-2">
                  Reviews:
                </h2>
                <ul>
                  {ratings &&
                    ratings.map((review, index) => (
                      <li key={review.id}>
                        <div className="flex flex-col justify-center p-4 shadow-lg border border-solid border-purple-800 border-opacity-25 mb-4">
                          <div className="text-base xl:text-lg font-semibold text-blue-600 flex items-center mb-3">
                              <FaUser className="mr-1"/>
                            {review.username}
                          </div>
                          <div className="text-base xl:text-lg font-semibold">
                            <Rating value={review.rating} />
                            <p className="text-base xl:text-lg font-semibold text-amber-400 ml-2">
                              {review.review}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            </motion.div>
            <motion.div
              className="col-span-2  bg-light p-4 w-[100%] pv:p-0 pv:px-4"
              initial={{ x: 1000 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-sm xl:text-base font-semibold text-blue-600 mt-3">
                FREE Returns
              </div>
              <div className="text-sm xl:text-base font-semibold text-blue-600 mt-1">
                FREE Delivery
              </div>
              {product.count_in_stock > 0 ? (
                <div className="text-base xl:text-lg font-semibold text-green-700 mt-1">
                  In Stock
                </div>
              ) : (
                <div className="text-base xl:text-lg font-semibold text-red-700 mt-1">
                  Out of Stock
                </div>
              )}
              <div className="text-base xl:text-lg mt-1 text-lightMain">
                Quantity :
                <select
                  className="rounded-md border-none focus:border focus:border-indigo-500 bg-main outline-none"
                  onChange={(e) => {
                    setQuantity(e.target.value);
                  }}
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                </select>
              </div>
              <div className="mt-4 flex flex-col justify-center items-center w-full">
                <button
                  type="button"
                  className="rounded-lg mx-auto bg-main text-white font-semibold border p-3 mt-3 hover:bg-lightMain transition-all w-full"
                  onClick={() => {
                    Array.from({ length: quantity }).forEach(() => {
                      dispatch(addToCart({ ...product, qty: 1 }));
                    });
                  }}
                >
                  ADD To Cart
                </button>
                <button
                  className="rounded-lg bg-main text-white font-semibold border p-3 mt-3 hover:bg-lightMain transition-all w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isInWishlist}
                  onClick={() => handleAddToWishlist()}
                >
                  ADD To Wishlist
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    )
  );
};

export default ProductsPage;
