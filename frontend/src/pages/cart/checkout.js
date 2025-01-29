// /pages/cart/checkout.js
import { useState, useEffect } from 'react';
import Link from 'next/link';
import '@/styles/checkout.module.css';

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
        const total = parsedCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setTotalPrice(total.toFixed(2));
      } catch (error) {
        console.error('Error loading cart from localStorage', error);
      }
    }
  }, []);

  return (
    <div className="checkout-page container mx-auto py-10 px-6 flex flex-col lg:flex-row gap-8">
      
      {/* LEFT: Cart Summary */}
      <div className="cart-summary w-full lg:w-1/2 bg-white dark:bg-neutral p-6 shadow-md rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <ul className="divide-y divide-gray-300 dark:divide-gray-700">
          {cartItems.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <li key={item._id} className="flex justify-between py-3">
                <span>{item.name} x{item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))
          )}
        </ul>
        <div className="flex justify-between font-semibold text-lg mt-4">
          <span>Total:</span>
          <span>${totalPrice}</span>
        </div>
        <Link href="/cart">
          <button className="edit-cart-btn mt-4 py-2 px-4 rounded bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600">
            Edit Cart
          </button>
        </Link>
      </div>

      {/* RIGHT: Payment Section */}
      <div className="payment-section w-full lg:w-1/2 bg-white dark:bg-neutral p-6 shadow-md rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Payment</h2>
        
        {/* Credit/Debit Card Payment */}
        <div className="card-payment mb-6">
          <h3 className="text-lg font-medium mb-2">Credit/Debit Card</h3>
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Cardholder Name"
              className="input-field"
              required
            />
            <input
              type="text"
              placeholder="Card Number"
              className="input-field"
              maxLength="16"
              required
            />
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="MM/YY"
                className="input-field w-1/2"
                maxLength="5"
                required
              />
              <input
                type="text"
                placeholder="CVV"
                className="input-field w-1/2"
                maxLength="3"
                required
              />
            </div>
            <button type="submit" className="pay-btn">
              Pay with Card
            </button>
          </form>
        </div>

        {/* Shopify Payment Option */}
        <div className="shopify-payment">
          <h3 className="text-lg font-medium mb-2">Or Pay with Shopify</h3>
          <button className="shopify-btn">Pay with Shopify</button>
        </div>
      </div>

    </div>
  );
}
