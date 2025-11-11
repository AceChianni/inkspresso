// /src/pages/checkout/success.js

import { useContext, useState } from "react";
import { CartContext } from "@/context/CartContext";

export default function CheckoutPage() {
  const { cart } = useContext(CartContext);

  // Temporary local state — replaced later when Stripe integration happens
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [pickupOption, setPickupOption] = useState("pickup");

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="font-heading text-3xl text-neutral mb-10 text-center">
        Checkout
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* LEFT SIDE — CUSTOMER INFO */}
        <div>
          <label className="font-body text-neutral block mb-2">Your Name</label>
          <input
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="input input-bordered w-full mb-6"
            placeholder="Enter your name"
          />

          <label className="font-body text-neutral block mb-2">Email Address</label>
          <input
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            className="input input-bordered w-full mb-6"
            placeholder="you@example.com"
            type="email"
          />

          <label className="font-body text-neutral block mb-3">Order Method</label>
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setPickupOption("pickup")}
              className={`btn w-full rounded-full normal-case ${
                pickupOption === "pickup" ? "btn-primary" : "btn-outline"
              }`}
            >
              Pickup
            </button>
            <button
              onClick={() => setPickupOption("shipping")}
              className={`btn w-full rounded-full normal-case ${
                pickupOption === "shipping" ? "btn-primary" : "btn-outline"
              }`}
            >
              Shipping
            </button>
          </div>

          {/* Later we conditionally show address fields if shipping is selected */}
          {pickupOption === "shipping" && (
            <div className="space-y-4 mb-10">
              <input className="input input-bordered w-full" placeholder="Street Address" />
              <div className="flex gap-3">
                <input className="input input-bordered w-full" placeholder="City" />
                <input className="input input-bordered w-full" placeholder="State" />
              </div>
              <input className="input input-bordered w-full" placeholder="ZIP Code" />
            </div>
          )}

          {/* CHECKOUT BUTTON (Stripe later) */}
          <button className="btn btn-primary w-full rounded-full normal-case py-3">
            Continue to Payment
          </button>
        </div>

        {/* RIGHT SIDE — ORDER SUMMARY */}
        <div className="border border-base-300 rounded-xl p-6 self-start sticky top-24">
          <h2 className="font-heading text-xl mb-4 text-neutral">Order Summary</h2>

          <div className="space-y-4 mb-6 max-h-[50vh] overflow-y-auto pr-2">
            {cart.map((item) => (
              <div key={`${item._id}-${item.size}`} className="font-body flex justify-between">
                <div>
                  <p className="text-neutral">{item.name}</p>
                  {item.size && <p className="text-neutral/60 text-sm">{item.size}</p>}
                </div>
                <p className="text-neutral">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-base-300 pt-4">
            <p className="font-body text-lg text-neutral flex justify-between">
              Subtotal:
              <span className="font-heading">${subtotal.toFixed(2)}</span>
            </p>
            <p className="font-body text-sm text-neutral/60 mt-1">Tax + shipping calculated at payment</p>
          </div>
        </div>

      </div>
    </div>
  );
}
