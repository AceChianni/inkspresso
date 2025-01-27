// /components/ProductCard.js

import { useState } from "react";

const ProductCard = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0].size);
  const [price, setPrice] = useState(product.sizes[0].price);

  const handleSizeChange = (e) => {
    const selected = e.target.value;
    const sizeData = product.sizes.find((s) => s.size === selected);
    setSelectedSize(selected);
    setPrice(sizeData.price);
  };

  return (
    <div className="bg-white border rounded-lg p-4 shadow-lg">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover mb-4 rounded"
      />
      <h3 className="text-xl font-semibold">{product.name}</h3>
      <div className="mt-2">
        <select
          value={selectedSize}
          onChange={handleSizeChange}
          className="p-2 border"
        >
          {product.sizes.map((size) => (
            <option key={size.size} value={size.size}>
              {size.size} - ${size.price}
            </option>
          ))}
        </select>
      </div>
      <p className="mt-2 text-lg">Price: ${price}</p>
      <button className="mt-4 bg-orange-500 text-white py-2 px-4 rounded">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
