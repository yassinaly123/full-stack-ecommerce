import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const AdminPage = () => {
  return (
    <div className="bg-main py-32 px-5 md:px-10 text-white min-h-[600px]">
      <h1 className="text-center mb-5 text-[2rem] font-semibold">Admin Page</h1>
      <div className="flex flex-wrap justify-center gap-y-5 md:gap-y-0 gap-x-10 items-center">
        <Link
          to="/admin/manage-products"
          className="bg-secondary p-5 rounded-lg"
        >
          <h2 className="text-center text-[1.5rem] font-semibold">
            Manage Products
          </h2>
          <p className="text-center">View, add, edit or delete products</p>
        </Link>
        <Link to="/admin/manage-users" className="bg-secondary p-5 rounded-lg">
          <h2 className="text-center text-[1.5rem] font-semibold">
            Manage Users
          </h2>
          <p className="text-center">View, add, edit or delete users</p>
        </Link>
        <Link to="/admin/add-category" className="bg-secondary p-5 rounded-lg">
          <h2 className="text-center text-[1.5rem] font-semibold">
            Add Category
          </h2>
          <p className="text-center">Add a new product category</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminPage;
