// /src/pages/cart.js

import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useContext(CartContext);

  // Calculate totals
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="font-heading text-3xl text-neutral mb-8">
        Your Cart
      </h1>

      {cart.length === 0 ? (
        <div className="text-center text-neutral/70 font-body">
          Your cart is empty.
          <br />
          <Link href="/products" className="btn btn-primary mt-6 rounded-full normal-case">
            Browse Menu
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={`${item._id}-${item.size}`}
                className="border border-base-300 p-4 rounded-xl flex justify-between items-center"
              >
                <div>
                  <p className="font-heading text-lg text-neutral">{item.name}</p>
                  {item.size && (
                    <p className="font-body text-sm text-neutral/60">{item.size}</p>
                  )}
                  <p className="font-body text-sm">
                    ${item.price.toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity(item, item.quantity - 1)}
                    className="btn btn-sm btn-ghost"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item, item.quantity + 1)}
                    className="btn btn-sm btn-ghost"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item)}
                    className="btn btn-sm btn-ghost text-error"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="mt-10 border-t border-base-300 pt-6 text-right">
            <p className="font-body text-lg text-neutral mb-4">
              Subtotal: <span className="font-heading">${subtotal.toFixed(2)}</span>
            </p>

            {/* For later: This goes to Stripe — but for now we go to /checkout */}
            <Link href="/checkout" className="btn btn-primary rounded-full px-8 normal-case">
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
