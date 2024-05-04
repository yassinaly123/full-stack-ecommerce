import React from "react";
import { useState, useEffect, useRef } from "react";
import { useUpdateProductMutation } from "../rtk/slices/productSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetCategoriesQuery } from "../rtk/slices/categoryApiSlice";
import { useGetProductQuery } from "../rtk/slices/productSlice";
import { API_URL } from "../constants";

const UpdateProduct = () => {
  const { data: categories } = useGetCategoriesQuery();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [disscount, setDisscount] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const navigate = useNavigate();
  const notifySuccess = () => toast.success("Product updated successfully");
  const notifyError = () => toast.error("Error updating product");
  const ref = useRef(null);
  const formRef = useRef(null);
  const { id } = useParams();
  const { data: product, isFetching } = useGetProductQuery(id);

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category_id);
      setStock(product.count_in_stock);
      setDisscount(product.discount);
      setImageUrl(`${API_URL}/uploads/${product.image_url}`);
    }
  }, [product, isFetching, id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    const imageUrl = URL.createObjectURL(file);
    setImageUrl(imageUrl);
  };

  const [UpdateProduct] = useUpdateProductMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const parsedPrice = parseFloat(price);
    const parsedDisscount = parseFloat(disscount);
    if (parsedDisscount > parsedPrice) {
      toast.error("Disscount can't be greater than price.");
      return;
    }
    let updatedData = {
      name,
      description,
      disscount: parsedDisscount,
      countInStock: stock,
      categoryId: category,
      price: parsedPrice,
    };

    try {
      const data = await UpdateProduct({ id, updatedValues: updatedData });
      if (data) {
        notifySuccess();
        navigate("/admin/manage-products");
      }
    } catch (error) {
      notifyError();
      console.error(error);
    }
  };

  return (
    <div className="container md:px-4 py-32 mx-auto">
      <h1 className="text-center text-3xl font-semibold my-8">
        Update Product
      </h1>
      <form
        className="max-w-md w-full space-y-10 mx-auto"
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <div className="rounded-md shadow-sm space-y-3">
          <div>
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="description" className="sr-only">
              Description
            </label>
            <input
              id="description"
              name="description"
              type="text"
              autoComplete="description"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="price" className="sr-only">
              Price
            </label>
            <input
              id="price"
              name="price"
              type="number"
              autoComplete="price"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="category" className="sr-only">
              Category
            </label>
            {categories ? (
              <select
                id="category"
                name="category"
                autoComplete="category"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  console.log(category);
                }}
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            ) : (
              <p>Loading categories...</p>
            )}
          </div>
          <div>
            <label htmlFor="stock" className="sr-only">
              Stock
            </label>
            <input
              id="stock"
              name="stock"
              type="number"
              autoComplete="stock"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="disscount" className="sr-only">
              Disscount
            </label>
            <input
              id="disscount"
              name="disscount"
              type="number"
              autoComplete="disscount"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Disscount"
              value={disscount}
              onChange={(e) => setDisscount(e.target.value)}
            />
          </div>
          <div className="flex justify-around items-center py-2">
            <label htmlFor="image" className="sr-only">
              Image
            </label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/png, image/jpeg"
              ref={ref}
              onChange={handleImageChange}
              className="appearance-none hidden rounded-none relative  w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
            <button
              className="bg-black text-white text-[1rem] p-[0.5rem] text-center rounded-lg transition-all duration-300 ease-in-out hover:bg-secondary hover:text-black"
              onClick={(e) => {
                e.preventDefault();
                ref.current.click();
              }}
            >
              Upload Image
            </button>
            {imageUrl && (
              <img src={imageUrl} alt="product" className="w-20 h-20" />
            )}
          </div>
        </div>
      </form>
      <div>
        <button
          type="submit"
          onClick={() => formRef.current.requestSubmit()}
          className="group relative mx-auto flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-8"
        >
          Update Product
        </button>
      </div>
    </div>
  );
};

export default UpdateProduct;
