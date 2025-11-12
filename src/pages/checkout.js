// /src/pages/checkout.js
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CheckoutPage() {
  const { cart } = useCart();
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="font-heading text-4xl mb-8 text-center text-neutral">
        Checkout
      </h1>

      {cart.length === 0 ? (
        <div className="text-center">
          <p className="text-neutral/70 mb-6">Your cart is empty.</p>
          <Link href="/products" className="btn btn-primary rounded-full px-6">
            Back to Menu
          </Link>
        </div>
      ) : (
        <>
          {/* 🧾 Order Summary */}
          <div className="border border-base-300 rounded-lg p-6 bg-base-100/90 shadow-sm">
            <h2 className="font-heading text-2xl mb-4 text-neutral">
              Order Summary
            </h2>
            <div className="divide-y divide-base-300">
              {cart.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="flex items-center justify-between py-3"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-md object-cover border border-base-300 shadow-sm"
                    />
                    <div>
                      <p className="font-medium text-neutral">{item.name}</p>
                      {item.size && (
                        <p className="text-sm text-neutral/60">Size: {item.size}</p>
                      )}
                      <p className="text-sm text-neutral/70">
                        ${item.price.toFixed(2)} × {item.quantity}
                      </p>
                    </div>
                  </div>

                  <p className="text-primary font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-6 font-body text-lg">
              <span>Subtotal:</span>
              <span className="font-semibold text-primary">
                ${subtotal.toFixed(2)}
              </span>
            </div>
          </div>

          {/* 💳 Payment Section */}
          <div className="mt-10 border border-base-300 rounded-lg p-6 bg-base-100/90 shadow-sm">
            <h2 className="font-heading text-2xl mb-4 text-neutral">Payment</h2>
            <p className="text-neutral/70 mb-6">
              Payment integration will be added soon. For now, this page confirms your
              order details.
            </p>

            <button
              className="px-8 py-2 rounded-full font-medium text-base-100 bg-[#6F7C56] hover:bg-[#C7A269] hover:text-neutral shadow-sm transition-all duration-300"
            >
              Confirm Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}
