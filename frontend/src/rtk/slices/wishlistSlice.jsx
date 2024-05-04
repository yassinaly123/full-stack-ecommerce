import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const initialState = localStorage.getItem("wishlist")
  ? JSON.parse(localStorage.getItem("wishlist"))
  : { wishlistItems: [] };

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const product = action.payload;
      const isExist = state.wishlistItems.find((item) => item.id === product.id);
      if (isExist) {
        toast.error("Product already in wishlist", {
          position: "bottom-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
        return;
      }
      state.wishlistItems = [...state.wishlistItems, product];
      localStorage.setItem("wishlist", JSON.stringify(state));
      toast.success("Product has been added to wishlist", {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      
    },
    removeFromWishlist: (state, action) => {
      const id = action.payload;
      state.wishlistItems = state.wishlistItems.filter(
        (item) => item.id !== id
      );
      localStorage.setItem("wishlist", JSON.stringify(state));
    },
    removeAllFromWishlist: (state) => {
      state.wishlistItems = [];
    },
    loadWishlistFromLocalStorage: (state) => {
      const wishlist = localStorage.getItem("wishlist");
      if (wishlist) {
        return {
          ...state,
          wishlistItems: JSON.parse(wishlist).wishlistItems,
        };
      }
      return state; // Return the original state if wishlist is not found in local storage
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  removeAllFromWishlist,
  loadWishlistFromLocalStorage,
} = wishlistSlice.actions;
export default wishlistSlice.reducer;
