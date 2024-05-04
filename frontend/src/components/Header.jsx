import React from "react";
import Navbar from "./Navbar";
import CartAndWishlist from "./CartAndWishlist";
import Logo from "./Logo";

const Header = () => {
  return (
    <header className="md:container mx-auto md:px-4 py-6 border-b-2 border-solid w-[95%] md:w-full  h-[70px]  bg-white ">
      <div className="flex items-center justify-between">
        <Logo />
        <Navbar />
        <CartAndWishlist />
      </div>
    </header>
  );
};

export default Header;
