import React from "react";
import { Link } from "react-router-dom";

const NavLink = ({ name, handleOnClick }) => {
  return (
    <Link
      to={(name !== "logout") && name}
      className="text-gray-700 hover:text-gray-900"
      onClick={
        handleOnClick
          ? () => {
              handleOnClick();
            }
          : null
      }
    >
      {name.charAt(0).toUpperCase() + name.slice(1)}
    </Link>
  );
};

export default NavLink;
