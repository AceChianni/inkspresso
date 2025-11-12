// /src/components/ProductCard.js
import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [showPopup, setShowPopup] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, selectedSize.size, selectedSize.price);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 1500);
  };

  return (
    <>
      <div className="group relative border border-base-300 bg-base-100 rounded-md p-4 shadow-sm hover:shadow-md transition duration-300 overflow-hidden flex flex-col justify-between min-h-[480px]">

        {/* Image Wrapper */}
        <div className="relative overflow-hidden rounded">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-56 object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* 🌫️ Steam-like Description Reveal */}
          {product.shortDescription && (
            <div className="absolute inset-x-0 bottom-0 h-0 group-hover:h-full group-hover:backdrop-blur-sm bg-gradient-to-t from-[#5A4632]/90 via-[#88704B]/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out flex items-end justify-center text-center px-4 pb-6">
              <p className="text-[#FFE8C7] text-sm leading-snug animate-[rise_1.2s_ease-out_forwards] drop-shadow-md">
                {product.shortDescription}
              </p>
            </div>
          )}
        </div>

        {/* Text Content */}
        <div className="relative z-10 flex flex-col flex-grow justify-between mt-4">
          <div>
            <h3 className="font-heading text-2xl text-neutral mb-1">
              {product.name}
            </h3>
            <p className="text-sm uppercase tracking-wide text-neutral/60">
              {product.category}
            </p>
          </div>

          <div className="mt-4">


          {/* Size Dropdown */}
<div className="relative flex justify-center mb-3">
  <div className="relative inline-block">
    <select
      className="appearance-none w-[160px] px-4 py-1.5 pr-9 rounded-full border border-[#C7A269]/50 bg-[#F5F1EB] text-neutral text-sm text-center font-body shadow-sm focus:ring-2 focus:ring-[#C7A269]/30 focus:border-[#C7A269]/70 hover:border-[#C7A269]/80 transition duration-300 cursor-pointer"
      value={selectedSize.size}
      onChange={(e) =>
        setSelectedSize(
          product.sizes.find((s) => s.size === e.target.value)
        )
      }
    >
      {product.sizes.map((s) => (
        <option key={s.size} value={s.size}>
          ({s.size} – ${s.price.toFixed(2)})
        </option>
      ))}
    </select>

    {/* Chevron */}
    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#C7A269] text-[10px] pointer-events-none">
      ▼
    </span>
  </div>
</div>






            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="w-full px-8 py-2 rounded-full font-medium border border-[#796544] bg-[#e2c699] text-base-100 hover:bg-[#ad8344] hover:text-neutral shadow-sm transition-all duration-300 uppercase tracking-wide text-xs mt-auto"

            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* ✨ Centered Item Added Popup */}
      {showPopup && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#caa05c] text-base-300 text-sm px-5 py-3 rounded-full shadow-lg animate-fadeUp z-[9999]">
           Item added!
        </div>
      )}

      {/* Animations */}
      <style jsx>{`
        @keyframes rise {
          0% {
            opacity: 0;
            transform: translateY(10px);
            filter: blur(3px);
          }
          60% {
            opacity: 1;
            transform: translateY(-2px);
            filter: blur(0);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeUp {
          0% {
            opacity: 0;
            transform: translate(-50%, 20px);
          }
          25% {
            opacity: 1;
            transform: translate(-50%, -4px);
          }
          80% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -20px);
          }
        }

        .animate-fadeUp {
          animation: fadeUp 1.8s ease-out forwards;
        }
      `}</style>
    </>
  );
}
