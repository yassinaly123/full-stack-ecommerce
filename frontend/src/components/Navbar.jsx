import React from "react";
import NavLink from "./NavLink";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../rtk/slices/frontAuthSlice";
import { useLogoutMutation } from "../rtk/slices/authSlice";
import { toast } from "react-toastify";
import { removeAllFromWishlist } from "../rtk/slices/wishlistSlice";
import { removeAllFromCart } from "../rtk/slices/cartSlice";
import { useState } from "react";
import {FaBars} from "react-icons/fa"


const Navbar = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [logoutUser] = useLogoutMutation();
  const handleOnclick = async () => {
    try {
      dispatch(removeAllFromWishlist());
      dispatch(removeAllFromCart());
      const { data } = await logoutUser();
      if (data) {
        dispatch(logout());
        toast.success("Logout successful");
      }
    } catch (error) {
      toast.error("Logout failed");
    }
  };
  return (
    <nav className="flex items-center space-x-6">
      <NavLink name="shop" />
      {userInfo ? (
        userInfo.isAdmin ? (
          <div className="space-x-6"> 
              <NavLink name="admin" />
              <NavLink name="logout" handleOnClick={handleOnclick} />
          </div>
        ) : (
          <NavLink name="logout" handleOnClick={handleOnclick} />
        )
      ) : (
        <NavLink name="login" />
      )}
    </nav>
  );
};

export default Navbar;
