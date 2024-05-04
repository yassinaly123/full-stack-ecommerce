import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  useGetProductsQuery,
  useDeleteProductMutation,
} from "../rtk/slices/productSlice";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const ManageProducts = () => {
  const {
    data: products,
    isLoading,
    refetch,
  } = useGetProductsQuery({ pageNumber: "all" });
  const [deleteProduct] = useDeleteProductMutation();
  const deleteHandler = async (id) => {
    try {
      await deleteProduct(id);
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error("Error deleting product");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 100);

    return () => clearInterval(interval);
  }, [refetch]);


  if (isLoading)
    return (
      <motion.h1
        className="min-h-[90dvh] text-center mt-8"
        initial={{ opacity: 0, translateX: -1000 }}
        animate={{ opacity: 1, translateX: 0 }}
        transition={{ duration: 1 }}
      >
        Loading...
      </motion.h1>
    );
  return (
    <motion.div
      className="container mx-auto px-4 py-32 min-h-[90dvh] "
      initial={{ opacity: 0, translateX: -1000 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ duration: 1 }}
    >
      <h1 className="text-3xl font-bold mb-8 text-center">Manage Products</h1>
      <Link
        to="/admin/add-product"
        className="flex items-center mx-auto mb-8 w-fit"
      >
        <button className="bg-purple-600 text-white px-4 py-2 rounded shadow-md hover:bg-purple-700 block">
          Add Product
        </button>
      </Link>

      <table className="w-full text-center">
        <thead>
          <tr>
            <th className="py-2">ID</th>
            <th className="py-2">NAME</th>
            <th className="py-2">PRICE</th>
            <th className="py-2">DISCOUNT</th>
            <th className="py-2">SOLD</th>
            <th className="py-2">IN STOCK</th>
            <th className="py-2">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((product) => (
              <tr key={product.id}>
                <td className="text-secondary">{product.id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>${product.discount}</td>
                <td>{product.sold}</td>
                <td>{product.count_in_stock}</td>
                <td className="flex items-center justify-center">
                  <Link
                    to={`/admin/edit-product/${product.id}`}
                    className="text-blue-500 mr-2 hover:text-blue-600 px-2 py-1 rounded bg-gray-100"
                  >
                    <FaEdit />
                  </Link>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    onClick={() => deleteHandler(product.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default ManageProducts;
