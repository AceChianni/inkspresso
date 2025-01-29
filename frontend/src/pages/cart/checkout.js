// /pages/cart/checkout.js

import { useContext } from "react";
import { CartContext } from "@/context/CartContext";

export default function CheckoutPage() {
  const { cart } = useContext(CartContext);

  const calculateTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  return (
    <div className="min-h-screen flex flex-col bg-base-100 dark:bg-base-dark">
      <header className="bg-secondary text-white p-4">
        <h2 className="text-2xl text-center">Checkout</h2>
      </header>
      <main className="container mx-auto p-8 flex flex-col gap-8">
        {cart.length > 0 ? (
          <div>
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b py-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 rounded" />
                <div className="flex-1 ml-4">
                  <p>{item.name} ({item.size})</p>
                  <p>Qty: {item.quantity}</p>
                </div>
                <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
            <h3 className="text-xl font-semibold mt-4">Total: ${calculateTotal()}</h3>
            <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded">
              Place Order
            </button>
          </div>
        ) : (
          <p className="text-center">Your cart is empty.</p>
        )}
      </main>
    </div>
  );
}

// import CheckoutForm from '@/components/CheckoutForm';
// import { useState, useEffect } from 'react';

// export default function CheckoutPage() {
//   const [cartItems, setCartItems] = useState([]);

//   useEffect(() => {
//     const savedCart = localStorage.getItem('cart');
//     if (savedCart) {
//       try {
//         setCartItems(JSON.parse(savedCart));
//       } catch (error) {
//         console.error('Error loading cart from localStorage', error);
//       }
//     }
//   }, []);

//   const handleBuyNow = () => {
//     alert('Thank you for your purchase!');
//     localStorage.removeItem('cart');
//     setCartItems([]);
//   };

//   const calculateTotal = () =>
//     cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

//   return (
//     <div className="min-h-screen flex flex-col bg-base-100 dark:bg-base-dark">
//       <header className="bg-secondary text-white p-4">
//         <h2 className="text-2xl text-center">Checkout</h2>
//       </header>
//       <main className="container mx-auto p-8 flex flex-col gap-8">
//         <CheckoutForm 
//           cart={cartItems} 
//           total={calculateTotal()} 
//           handleBuyNow={handleBuyNow} 
//         />
//       </main>
//     </div>
//   );
// }
