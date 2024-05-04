import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const isExist = state.cartItems.find((item) => item.id === product.id);
      if (isExist) {
        if (product.count_in_stock - isExist.qty <= 0) {
          toast.error("Product out of stock");
          return;
        }
        let newProduct = {
          ...isExist,
          qty: isExist.qty + 1,
        };
        state.cartItems = state.cartItems.map((item) =>
          item.id === product.id ? newProduct : item
        );
        toast.success("Product quantity updated");
      } else {
        state.cartItems = [...state.cartItems, product];
        toast.success("Product added to cart");
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem("cart", JSON.stringify(state));
    },

    increaseQuantity: (state, action) => {
      const product = state.cartItems.find(
        (item) => item.id === action.payload
      );
      if (product) {
        if (product.count_in_stock - product.qty <= 0) {
          toast.error("Product out of stock");
          return;
        }
        product.qty += 1;
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },

    decreaseQuantity: (state, action) => {
      const productToRemove = state.cartItems.find(
        (item) => item.id === action.payload
      );
      if (productToRemove.qty > 1) {
        productToRemove.qty -= 1;
      } else if (productToRemove && productToRemove.qty === 1) {
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload
        );
        return;
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeAllFromCart: (state) => {
      state.cartItems = [];
      toast.success("Cart cleared");
      localStorage.setItem("cart", JSON.stringify(state));
    },
    loadCartFromLocalStorage: (state) => {
      const cart = localStorage.getItem("cart");
      if (cart) {
        state.cartItems = JSON.parse(cart);
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  increaseQuantity,
  decreaseQuantity,
  removeAllFromCart,
  loadCartFromLocalStorage,
} = cartSlice.actions;

export default cartSlice.reducer;
