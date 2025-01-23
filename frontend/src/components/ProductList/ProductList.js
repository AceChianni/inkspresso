// frontend/src/components/ProductList.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await api.get("/products");
      setProducts(response.data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {products.map((product) => (
        <div key={product._id} className="card">
          <img src={product.image} alt={product.name} />
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <Link to={`/products/${product._id}`} className="btn btn-primary">
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
