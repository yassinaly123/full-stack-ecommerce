import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useCreateCategoryMutation } from "../rtk/slices/categoryApiSlice";
import {toast} from 'react-toastify';

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [createCategory, { isLoading, isError, error }] =
    useCreateCategoryMutation();

  const handleSubmit = async(e) => {
    e.preventDefault();
    const res = await createCategory({ name, description, imageUrl });
    if (res.error) {
      toast.error(res.error.message);
    } else {
      toast.success("Category created successfully");
    }
  };
  return (
    <div className="py-32 min-h-[70dvh]">
      <h1 className="text-center">Create Category</h1>
      <form className="mx-auto max-w-[80%] " onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Category Name
          </label>
          <input
            required
            type="text"
            name="name"
            id="name"
            placeholder="Enter category name"
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Description
          </label>
          <textarea
            required
            name="description"
            id="description"
            placeholder="Enter category description"
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            htmlFor="ImageUrl"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            ImageUrl
          </label>
          <input
            required
            name="ImageUrl"
            id="ImageUrl"
            placeholder="Enter category ImageUrl"
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            onChange={(e) => {
              setImageUrl(e.target.value);
            }}
          ></input>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          Create Category
        </button>
      </form>
    </div>
  );
};

export default CreateCategory;
