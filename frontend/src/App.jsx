import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import SectionTag from "./components/SectionTag";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminRoute from "./components/AdminRoute";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./components/Register";
import CreateProduct from "./components/CreateProduct";
import CreateCategory from "./components/CreateCategory";
import UpdateProduct from "./components/UpdateProduct";
import ManageProducts from "./components/ManageProducts";
import ManageUsers from "./components/ManageUsers";
import UpdateUser from "./components/updateUser";
import Wishlist from "./components/Wishlist";
import ErrorPage from "./components/ErrorPage";
import ProductsByCategory from "./components/ProductsByCategory";
import CartPage from "./components/CartPage";
import ProductsPage from "./components/ProductsPage";
import ProductPage from "./components/ProductPage";
import AdminPage from "./components/AdminPage";

function App() {
  return (
    <div className="bg-">
      <Header />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<ProductsPage />}>
          <Route path="page/:pageNumber" element={<ProductsPage />} />
        </Route>
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="" element={<AdminRoute />}>
          <Route path="admin" element={<AdminPage />} />
          <Route path="admin/manage-products" element={<ManageProducts />} />
          <Route path="admin/add-product" element={<CreateProduct />} />
          <Route path="admin/edit-product/:id" element={<UpdateProduct />} />
          <Route path="admin/manage-users" element={<ManageUsers />} />
          <Route path="admin/edit-user/:id" element={<UpdateUser />} />
          <Route path="admin/add-category" element={<CreateCategory />} />
        </Route>
        <Route path="" element={<PrivateRoute />}>
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Route>
        <Route path="/category/:id" element={<ProductsByCategory />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
