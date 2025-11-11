// /src/components/CartDrawer.js
import Image from "next/image";
import { useCart } from "@/context/CartContext";

export default function CartDrawer({ isOpen, toggleCart }) {
  const { cart, addToCart, itemCount } = useCart();

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-xl font-semibold">Your Cart</h2>
        <button onClick={toggleCart} className="text-2xl">&times;</button>
      </div>

      {/* Cart Items */}
      <div className="p-4 space-y-4 overflow-auto max-h-[80%]">
        {cart.length === 0 ? (
          <p className="text-center text-sm text-neutral-500 mt-10">
            Your cart is empty ☕
          </p>
        ) : (
          cart.map((item, index) => (
            <div
              key={`${item.id}-${item.size}-${index}`}
              className="flex items-center justify-between border-b pb-3"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                {item.size && (
                  <p className="text-sm text-neutral-500">Size: {item.size}</p>
                )}
                <p className="text-sm font-semibold">${item.price.toFixed(2)}</p>
              </div>

              {/* Quantity adjustments */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => addToCart(item, item.size, item.price)}
                  className="px-2 py-1 border rounded"
                >
                  +
                </button>
                <p>{item.quantity}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      {cart.length > 0 && (
        <div className="p-4 border-t">
          <button className="w-full bg-black text-white py-3 rounded hover:opacity-80 transition">
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}
