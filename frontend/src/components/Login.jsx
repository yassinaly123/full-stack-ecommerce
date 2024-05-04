import React from "react";
import { useState , useEffect } from "react";
import { motion } from "framer-motion";
import { useLoginMutation } from "../rtk/slices/authSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setCredentials } from "../rtk/slices/frontAuthSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Login = () => {
  const [usernameOrEmail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if(userInfo){
      navigate("/");
    }
  }
  , [userInfo , navigate])  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ usernameOrEmail , password }).unwrap();
      console.log(res);
      toast.success(res.message)
      dispatch(setCredentials(res.user))
    } catch (error) {
      toast.error(error?.data?.message)
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
        <h1 className="text-3xl font-bold mb-5">Login</h1>
        <input
          type="text"
          placeholder="usernameOrEmail"
          value={usernameOrEmail}
          onChange={(e) => setEmail(e.target.value)}
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
          {isLoading ? "Logging in..." : "Login"}
        </motion.button>
        <Link
          to="/register"
          className="text-blue-500 hover:underline"
        >
          Don't have an account? Register
        </Link>
      </motion.form>
    </motion.section>
  );
};

export default Login;