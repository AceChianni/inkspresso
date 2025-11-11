// /src/components/ProductCard.js
import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);

  return (
    <div className="group border border-base-300 bg-base-100 rounded-md p-4 shadow-sm hover:shadow-md transition duration-300">

      {/* Product Image */}
      <div className="relative overflow-hidden rounded">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-cover transition duration-500 group-hover:scale-[1.05]"
        />
      </div>

      {/* Name */}
      <h3 className="font-heading text-2xl mt-4 text-neutral">
        {product.name}
      </h3>

      {/* Apothecary Note / Category */}
      <p className="text-sm uppercase tracking-wide text-neutral/60">
        {product.category}
      </p>

      {/* Optional Flavor Notes */}
      {product.notes && (
        <p className="mt-1 text-sm text-neutral/70 italic">
          {product.notes}
        </p>
      )}

      {/* Size Dropdown */}
      <select
        className="w-full mt-4 px-3 py-2 border border-base-300 bg-base-100 text-neutral text-sm"
        value={selectedSize.size}
        onChange={(e) =>
          setSelectedSize(product.sizes.find((s) => s.size === e.target.value))
        }
      >
        {product.sizes.map((s) => (
          <option key={s.size} value={s.size}>
            {s.size} — ${s.price.toFixed(2)}
          </option>
        ))}
      </select>

      {/* Add to Cart */}
      <button
        className="w-full mt-4 px-4 py-2 border border-primary text-primary hover:bg-primary hover:text-base-100 transition uppercase tracking-wide text-xs"
        onClick={() => addToCart(product, selectedSize.size, selectedSize.price)}
      >
        Add to Cart
      </button>

    </div>
  );
}
