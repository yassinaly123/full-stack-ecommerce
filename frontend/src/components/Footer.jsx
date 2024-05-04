import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 min-h-[200px] text-center md:px-4">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <div className="w-full sm:w-1/2 md:w-1/4 mb-6 md:mb-0 mx-auto">
          <h2 className="text-lg font-semibold mb-4">About Us</h2>
          <p className="text-[1rem] text-center text-[#d7d4d4]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            facilisi.
          </p>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/4 mb-6 lg:mb-0">
          <h2 className="text-lg font-semibold mb-4">Contact</h2>
          <p className="text-sm">
            123 Main Street
            <br />
            City, State 12345
            <br />
            info@example.com
          </p>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/4 mb-6 lg:mb-0">
          <h2 className="text-lg font-semibold mb-4">Categories</h2>
          <ul className="text-sm">
            <li>Category 1</li>
            <li>Category 2</li>
            <li>Category 3</li>
            <li>Category 4</li>
          </ul>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/4 mb-6 lg:mb-0">
          <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
          <ul className="text-sm">
            <li>Facebook</li>
            <li>Twitter</li>
            <li>Instagram</li>
            <li>LinkedIn</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
