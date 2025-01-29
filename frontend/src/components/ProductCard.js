// /components/ProductCard.js
import { useState, useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  // State for managing size, price, and notification
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0]?.size || "Standard");
  const [price, setPrice] = useState(product.sizes?.[0]?.price || product.price || 0);
  const [notification, setNotification] = useState(false);

  const handleSizeChange = (e) => {
    const selected = e.target.value;
    const sizeData = product.sizes.find((s) => s.size === selected);
    setSelectedSize(selected);
    setPrice(sizeData ? sizeData.price : 0);
  };

  const handleAddToCart = () => {
    addToCart(product, selectedSize, price);
    setNotification(true);  // Show the notification
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(false);  // Hide the notification after 3 seconds
      }, 3000);

      return () => clearTimeout(timer); // Cleanup timeout
    }
  }, [notification]);

  // accessibility for screen reader
  {notification && (
    <div
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 bg-green-600 text-white rounded-lg shadow-lg z-50 transition-opacity opacity-100 animate-opacity"
      aria-live="polite"
    >
      <p className="text-center">Item added to cart!</p>
    </div>
  )}
  
  return (
    <div className="bg-white border rounded-lg p-4 shadow-lg flex flex-col justify-between dark:bg-gray-800">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover mb-4 rounded"
      />
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{product.name}</h3>

      {/* Show size selection only if sizes exist */}
      {product.sizes && product.sizes.length > 0 && (
        <div className="mt-2">
          <label htmlFor={`size-${product._id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Choose a size:
          </label>
          <select
            id={`size-${product._id}`}
            value={selectedSize}
            onChange={handleSizeChange}
            className="p-2 border w-full text-gray-900 dark:text-gray-100"
          >
            {product.sizes.map((size) => (
              <option key={size.size} value={size.size}>
                {size.size}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Display price */}
      <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">Price: ${price.toFixed(2)}</p>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className="mt-4 bg-green-800 text-white py-2 px-4 rounded w-full hover:bg-orange-700 transition-colors duration-200"
      >
        Add to Cart
      </button>

      {/* Modal Notification */}
      {notification && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 bg-green-600 text-white rounded-lg shadow-lg z-50 transition-opacity opacity-100 animate-opacity">
          <p className="text-center">Item added to cart!</p>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
