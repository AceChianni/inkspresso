// // /pages/cart/index.js
// import { useState, useEffect } from 'react';
// import CartItem from '@/components/CartItem';
// import Link from 'next/link';
// import '@/styles/checkout.module.css';

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
//     <div className="min-h-screen bg-base-100 text-gray-900 dark:bg-base-dark dark:text-white cart-page">
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
//             {/* ✅ FIX: Make price text light in dark mode */}
//             <p className="text-lg font-semibold text-gray-900 dark:text-white">
//               Total: ${getTotalPrice()}
//             </p>
//             <Link href="/cart/checkout">
//               <button className="order-now-btn py-3 px-6 rounded-lg text-lg font-semibold shadow-md transition duration-300 ease-in-out transform hover:bg-accent hover:scale-105 hover:shadow-xl">
//                 Checkout
//               </button>
//             </Link>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }
import { useState, useEffect } from 'react';
import CartItem from '@/components/CartItem';
import Link from 'next/link';
import '@/styles/checkout.module.css';

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

  // Separate books and food products
  const books = cartItems.filter(item => item.category === 'book');
  const foodItems = cartItems.filter(item => item.category === 'food');

  return (
    <div className="min-h-screen bg-base-100 text-gray-900 dark:bg-base-dark dark:text-white cart-page">
      <main className="container mx-auto p-8 flex flex-col gap-8">
        <h1 className="text-3xl font-semibold">Your Cart</h1>
        {cartItems.length === 0 ? (
          <p className="text-lg">Your cart is empty.</p>
        ) : (
          <div className="flex flex-col gap-6">
            {/* Library Checkout Section */}
            {books.length > 0 && (
              <div className="library-checkout">
                <h2 className="text-xl font-semibold">Library Checkout</h2>
                <div className="flex flex-col gap-4">
                  {books.map((item) => (
                    <div key={item._id} className="flex items-center gap-4">
                      <img src={item.image} alt={item.name} className="w-16 h-24 object-cover" />
                      <div>
                        <p className="text-lg">{item.name}</p>
                        <p className="text-sm text-gray-600">{item.author}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Food Products Section */}
            {foodItems.length > 0 && (
              <div className="food-checkout">
                <h2 className="text-xl font-semibold">Food Products</h2>
                {foodItems.map((item) => (
                  <CartItem
                    key={item._id}
                    item={item}
                    handleRemoveFromCart={handleRemoveFromCart}
                    handleQuantityChange={handleQuantityChange}
                  />
                ))}
              </div>
            )}
          </div>
        )}
        {cartItems.length > 0 && (
          <div className="flex flex-col items-end gap-4">
            {/* ✅ FIX: Make price text light in dark mode */}
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              Total: ${getTotalPrice()}
            </p>
            <Link href="/cart/checkout">
              <button className="order-now-btn py-3 px-6 rounded-lg text-lg font-semibold shadow-md transition duration-300 ease-in-out transform hover:bg-accent hover:scale-105 hover:shadow-xl">
                Checkout
              </button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
