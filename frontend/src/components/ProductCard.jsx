// src/components/ProductCard.jsx

import PropTypes from "prop-types";
import Button from "./Button";

export default function ProductCard({ product, handleAddToCart }) {
  return (
    <div className="card p-6 border border-neutral rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col h-full bg-base-100 dark:bg-base-dark text-base-content dark:text-base-content-dark">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-64 object-cover rounded-md mb-4"
      />
      <div className="flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-primary dark:text-accent">
          {product.name}
        </h3>
        <p className="text-accent mb-4 text-text-primary dark:text-neutral">
          {product.description}
        </p>
        <p className="text-lg font-bold mb-4 text-primary dark:text-accent">
          ${product.price}
        </p>
      </div>
      <button
        onClick={() => handleAddToCart(product)}
        className="bg-accent hover:bg-sunset-light text-white dark:bg-sunset-dark dark:hover:bg-primary rounded-lg py-2"
      >
        Add to Cart
      </button>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  handleAddToCart: PropTypes.func.isRequired,
};
