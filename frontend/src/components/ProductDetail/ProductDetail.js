// src/components/ProductDetail/ProductDetail.js

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../../api/api";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      const productData = await fetchProductById(id);
      setProduct(productData);
    };

    loadProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <img src={product.imageUrl} alt={product.name} />
    </div>
  );
};

export default ProductDetail;
