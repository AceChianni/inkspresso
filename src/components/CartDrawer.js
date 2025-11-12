// /src/components/CartDrawer.js
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useCart } from "@/context/CartContext";

export default function CartDrawer({ isOpen, toggleCart }) {
  const { cart, addToCart, updateQuantity, removeFromCart } = useCart();
  const router = useRouter();

  // 🧭 Close drawer automatically when navigating
  useEffect(() => {
    const handleRouteChange = () => toggleCart(false);
    router.events.on("routeChangeStart", handleRouteChange);
    return () => router.events.off("routeChangeStart", handleRouteChange);
  }, [router, toggleCart]);

  // 💰 Calculate subtotal dynamically
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
   <div
  className={`fixed top-0 right-0 h-full w-80 shadow-xl transform transition-transform duration-300 z-50 border-l border-base-300 ${
    isOpen ? "translate-x-0" : "translate-x-full"
  }`}
  style={{
    background: "linear-gradient(180deg, #F5F1EB 0%, #E9E2D6 50%, #D8CBB2 100%)",
  }}
>

      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-base-300">
        <h2 className="font-heading text-xl text-neutral">Your Cart</h2>
        <button onClick={toggleCart} className="text-2xl text-neutral hover:text-primary transition">
          &times;
        </button>
      </div>

      {/* Cart Items */}
      <div className="p-4 space-y-4 overflow-auto max-h-[70%]">
        {cart.length === 0 ? (
          <p className="text-center text-sm text-neutral/60 mt-10">
            Your cart is empty 
          </p>
        ) : (
          cart.map((item) => (
            <div
              key={`${item.id}-${item.size}`}
              className="flex items-center justify-between border-b border-base-200 pb-3"
            >
              <div>
                <p className="font-medium text-neutral">{item.name}</p>
                {item.size && (
                  <p className="text-sm text-neutral/70">Size: {item.size}</p>
                )}
                <p className="text-sm font-semibold text-primary">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>

              {/* Quantity controls */}
              <div className="flex flex-col items-center">
                <div className="flex items-center border border-base-300 rounded-md overflow-hidden">
                  <button
                    onClick={() => updateQuantity(item.id, item.size, -1)}
                    className="px-2 py-1 text-sm hover:bg-base-200 transition"
                  >
                    −
                  </button>
                  <p className="px-2 text-neutral">{item.quantity}</p>
                  <button
                    onClick={() => updateQuantity(item.id, item.size, 1)}
                    className="px-2 py-1 text-sm hover:bg-base-200 transition"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item.id, item.size)}
                  className="text-error text-xs mt-1 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      {cart.length > 0 && (
        <div className="p-4 border-t border-base-300">
          <div className="flex justify-between mb-3 font-body text-neutral">
            <span>Subtotal</span>
            <span className="font-semibold text-primary">
              ${subtotal.toFixed(2)}
            </span>
          </div>
          <Link
            href="/checkout"
            onClick={toggleCart}
            className="px-8 py-2 rounded-full font-medium text-base-100 bg-[#6F7C56] hover:bg-[#C7A269] hover:text-neutral shadow-sm transition-all duration-300"
          >
            Proceed to Checkout
          </Link>
        </div>
      )}
    </div>
  );
}

// import Image from "next/image";
// import { useCart } from "@/context/CartContext";

// export default function CartDrawer({ isOpen, toggleCart }) {
//   const { cart, addToCart, itemCount } = useCart();

//   return (
//     <div
//       className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 z-50 ${
//         isOpen ? "translate-x-0" : "translate-x-full"
//       }`}
//     >
//       {/* Header */}
//       <div className="flex items-center justify-between p-4 border-b">
//         <h2 className="text-xl font-semibold">Your Cart</h2>
//         <button onClick={toggleCart} className="text-2xl">&times;</button>
//       </div>

//       {/* Cart Items */}
//       <div className="p-4 space-y-4 overflow-auto max-h-[80%]">
//         {cart.length === 0 ? (
//           <p className="text-center text-sm text-neutral-500 mt-10">
//             Your cart is empty ☕
//           </p>
//         ) : (
//           cart.map((item, index) => (
//             <div
//               key={`${item.id}-${item.size}-${index}`}
//               className="flex items-center justify-between border-b pb-3"
//             >
//               <div>
//                 <p className="font-medium">{item.name}</p>
//                 {item.size && (
//                   <p className="text-sm text-neutral-500">Size: {item.size}</p>
//                 )}
//                 <p className="text-sm font-semibold">${item.price.toFixed(2)}</p>
//               </div>

//               {/* Quantity adjustments */}
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => addToCart(item, item.size, item.price)}
//                   className="px-2 py-1 border rounded"
//                 >
//                   +
//                 </button>
//                 <p>{item.quantity}</p>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Footer */}
//       {cart.length > 0 && (
//         <div className="p-4 border-t">
//           <button className="w-full bg-black text-white py-3 rounded hover:opacity-80 transition">
//             Proceed to Checkout
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
