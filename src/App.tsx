import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./Component/Auth/ProtectedRoute";
import Login from "./Component/Auth/Login";
import Signup from "./Component/Auth/SignUp";
import Products from "./Component/Products/ProductList/ProductList";
import AddProduct from "./Component/Products/AddProducts/AddProducts";
import EditProduct from "./Component/Products/EditProduct/EditProduct";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/products" element={<Products />} />
          <Route path="/" element={<Products />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/products/edit/:id" element={<EditProduct />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
