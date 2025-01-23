// src/components/ProductList/ProductList.js

import React, { useEffect, useState } from "react";
import { fetchProducts } from "../../api/api";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const productsData = await fetchProducts();
      setProducts(productsData);
    };

    loadProducts();
  }, []);

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product._id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
