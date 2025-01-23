// src/App.js

import React, { useState, useEffect } from "react";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ProductList from "./components/ProductList/ProductList";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />{" "}
        {/* HomePage as the default page */}
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/products" element={<ProductList />} />
      </Routes>
      <Footer /> {/* Add Footer at the bottom */}
    </Router>
  );
};

export default App;
