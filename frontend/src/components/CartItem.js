// src/components/CartItem.js

import PropTypes from 'prop-types';

export default function CartItem({ item, handleRemoveFromCart, handleQuantityChange }) {
  const handleQuantityInputChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (newQuantity > 0) {
      handleQuantityChange(item._id, newQuantity);
    }
  };

  return (
    <div className="flex justify-between items-center p-4 border-b border-gray-300 dark:border-neutral">
      <div className="flex items-center gap-4">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-16 h-16 object-cover rounded-md"
        />
        <div className="flex flex-col">
          <h4 className="font-semibold text-text-primary dark:text-text-light">{item.name}</h4>
          <p className="text-gray-600 dark:text-neutral">${item.price}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <input
          type="number"
          value={item.quantity}
          min="1"
          className="w-12 text-center border p-2 rounded bg-base-100 text-text-primary dark:bg-neutral dark:text-text-light"
          onChange={handleQuantityInputChange}
        />
        <button
          onClick={() => handleRemoveFromCart(item._id)}
          className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-600"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  handleRemoveFromCart: PropTypes.func.isRequired,
  handleQuantityChange: PropTypes.func.isRequired,
};