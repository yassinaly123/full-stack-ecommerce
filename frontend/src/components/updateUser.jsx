import React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  useUpdateUserMutation,
  useGetUserQuery,
} from "../rtk/slices/userApiSlice";

const UpdateUser = () => {
  const { id } = useParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [update, { isLoading }] = useUpdateUserMutation();
  const { data: user } = useGetUserQuery(id);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setUsername(user.username);
    }
  }, [user]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = { name: username, password };
      const res = await update({ id, user: updatedUser }).unwrap();
      console.log(res);
      toast.success("User Updated Successfully");
    } catch (error) {
      console.log(error);
      toast.error("User Update Failed");
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gray-100"
    >
      <motion.form
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center w-11/12 md:w-2/3 lg:w-2/3 p-8 bg-white rounded-lg shadow-lg"
      >
        <h1 className="text-3xl font-bold mb-5">
          Update User <span className="text-secondary">{id}</span>
        </h1>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 my-2 border border-gray-300 rounded-md outline-none"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 my-2 border border-gray-300 rounded-md outline-none"
          required
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full p-3 my-2 bg-blue-500 text-white rounded-md transition-all duration-300 ease-in-out"
        >
          {isLoading ? "Updating..." : "Update"}
        </motion.button>
      </motion.form>
    </motion.section>
  );
};

export default UpdateUser;
