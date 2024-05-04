import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { API_URL } from "../constants";
import { FaTrash } from "react-icons/fa";
import {
  increaseQuantity,
  decreaseQuantity,
  removeAllFromCart,
  removeFromCart
} from "../rtk/slices/cartSlice";

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const totalCost = cartItems.reduce(
    (total, item) => total + item.qty * (item.price - item.discount),
    0
  );

  const handleIncreaseQuantity = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecreaseQuantity = (id) => {
    dispatch(decreaseQuantity(id));
  };

  const handleRemoveAllFromCart = () => {
    dispatch(removeAllFromCart());
  };

  const deleteHandler = (id) => {
    dispatch(removeFromCart(id))
  }


  return (
    <motion.section
      initial={{ x: -1000 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex items-center justify-center"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col">
          <h2 className="text-[2rem] font-bold text-center mb-5">Cart</h2>
          <div className="flex flex-col mt-4">
            {cartItems.length === 0 ? (
              <div className="text-center">Cart is empty</div>
            ) : (
              <>
                <div className="mb-8">
                  <button
                    onClick={() => navigate("/shop")}
                    className="bg-zinc-950 text-white px-4 py-2 rounded font-semibold hover:bg-secondary duration-200 transition-all ease-in-out"
                  >
                    Continue shopping
                  </button>
                  <button
                    className="bg-zinc-950 text-white px-4 py-2 rounded ml-4 font-semibold hover:bg-secondary duration-200 transition-all ease-in-out"
                    onClick={handleRemoveAllFromCart}
                  >
                    Clear cart
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="table-auto w-full min-h-[200px]">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Discount</th>
                        <th>Quantity</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y-8 mt-10">
                      {cartItems.map((item) => (
                        <tr key={item.id} className="shadow-md relative">
                          <td>
                            <div className="flex items-center justify-center">
                              <button
                                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 absolute left-2 top-2 transition-all duration-200 ease-in-out "
                                onClick={() => deleteHandler(item.id)}
                              >
                                <FaTrash />
                              </button>
                              <img
                                src={`${API_URL}/uploads/${item.image_url}`}
                                alt={item.name}
                                className="w-16 h-16 object-cover rounded-full  "
                              />
                              <p className="ml-4 text-center font-semibold">
                                {item.name}
                              </p>
                            </div>
                          </td>
                          <td className="text-center">${item.price}</td>
                          <td className="text-center">${item.discount}</td>
                          <td className="text-center">
                            <div className="flex items-center justify-center">
                              <button
                                onClick={() => handleDecreaseQuantity(item.id)}
                                className="px-2"
                              >
                                -
                              </button>
                              <span className="px-2">{item.qty}</span>
                              <button
                                onClick={() => handleIncreaseQuantity(item.id)}
                                className="px-2"
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="text-center">
                            ${item.qty * (item.price - item.discount)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex justify-end mt-4 items-center">
                    <div className="mr-4">
                      Total Cost: ${totalCost.toFixed(2)}
                    </div>
                    <button
                      onClick={() => navigate("/checkout")}
                      className="bg-zinc-950 text-white px-4 py-2 rounded font-semibold hover:bg-secondary duration-200 transition-all ease-in-out"
                    >
                      Proceed to checkout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default CartPage;
