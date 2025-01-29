// /pages/cart/cart.js

import { useState, useEffect } from 'react';
import CartItem from '@/components/CartItem';
import Link from 'next/link';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage', error);
      }
    }
  }, []);

  const handleRemoveFromCart = (productId) => {
    const updatedCart = cartItems.filter((item) => item._id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleQuantityChange = (productId, newQuantity) => {
    const updatedCart = cartItems.map((item) =>
      item._id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const getTotalPrice = () =>
    cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);

  return (
    <div className="min-h-screen bg-base-100 text-gray-900 dark:bg-base-dark dark:text-text-light"> {/* Make sure text is light in dark mode */}
      <main className="container mx-auto p-8 flex flex-col gap-8">
        <h1 className="text-3xl font-semibold">Your Cart</h1>
        {cartItems.length === 0 ? (
          <p className="text-lg">Your cart is empty.</p>
        ) : (
          <div className="flex flex-col gap-6">
            {cartItems.map((item) => (
              <CartItem
                key={item._id}
                item={item}
                handleRemoveFromCart={handleRemoveFromCart}
                handleQuantityChange={handleQuantityChange}
              />
            ))}
          </div>
        )}
        {cartItems.length > 0 && (
          <div className="flex flex-col items-end gap-4">
            <p className="text-lg font-semibold">Total: ${getTotalPrice()}</p>
            <Link href="/cart/checkout">
              <button className="bg-primary text-white py-3 px-6 rounded-lg text-lg font-semibold shadow-md transition duration-300 ease-in-out transform hover:bg-accent hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50">
                Checkout
              </button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}

// // /pages/cart/cart.js

// import { useState, useEffect } from 'react';
// import CartItem from '@/components/CartItem';
// import Link from 'next/link';

// export default function CartPage() {
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

//   const handleRemoveFromCart = (productId) => {
//     const updatedCart = cartItems.filter((item) => item._id !== productId);
//     setCartItems(updatedCart);
//     localStorage.setItem('cart', JSON.stringify(updatedCart));
//   };

//   const handleQuantityChange = (productId, newQuantity) => {
//     const updatedCart = cartItems.map((item) =>
//       item._id === productId ? { ...item, quantity: newQuantity } : item
//     );
//     setCartItems(updatedCart);
//     localStorage.setItem('cart', JSON.stringify(updatedCart));
//   };

//   const getTotalPrice = () =>
//     cartItems
//       .reduce((total, item) => total + item.price * item.quantity, 0)
//       .toFixed(2);

//   return (
//     <div className="min-h-screen bg-base-100 text-gray-900 dark:bg-base-dark dark:text-white">
//       <main className="container mx-auto p-8 flex flex-col gap-8">
//         <h1 className="text-3xl font-semibold">Your Cart</h1>
//         {cartItems.length === 0 ? (
//           <p className="text-lg">Your cart is empty.</p>
//         ) : (
//           <div className="flex flex-col gap-6">
//             {cartItems.map((item) => (
//               <CartItem
//                 key={item._id}
//                 item={item}
//                 handleRemoveFromCart={handleRemoveFromCart}
//                 handleQuantityChange={handleQuantityChange}
//               />
//             ))}
//           </div>
//         )}
//         {cartItems.length > 0 && (
//           <div className="flex flex-col items-end gap-4">
//             <p className="text-lg font-semibold">Total: ${getTotalPrice()}</p>
//             <Link href="/cart/checkout">
//               <button className="bg-primary text-white py-3 px-6 rounded-lg text-lg font-semibold shadow-md transition duration-300 ease-in-out transform hover:bg-accent hover:scale-105 hover:shadow-xl">
//                 Checkout
//               </button>
//             </Link>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }
