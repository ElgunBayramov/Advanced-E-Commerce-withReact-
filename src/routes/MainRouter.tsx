import React from "react";
import { Route, Routes,Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import Products from "../pages/Products";
import { useAppSelector } from "../redux/store";
import ProductDetails from "../components/ProductDetails";

function MainRouter() {
  const currentUser = useAppSelector((state) => state.app.currentUser);
  return (
    <Routes>
      <Route path="/" element={currentUser ? <Home /> : <Navigate to="/login" />} />
      {/* <Route path="/home" element={<Home />} /> */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product-details/:id" element={<ProductDetails />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default MainRouter;
