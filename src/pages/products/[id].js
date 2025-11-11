// /src/pages/products/[id].js

import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "@/context/CartContext";

export default function ProductDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (!id) return;
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setSelectedSize(data.sizes?.[0]?.size || "");
        setPrice(data.sizes?.[0]?.price || data.price);
      })
      .catch(console.error);
  }, [id]);

  const handleSizeChange = (e) => {
    const size = e.target.value;
    const s = product.sizes.find((x) => x.size === size);
    setSelectedSize(size);
    setPrice(s.price);
  };

  if (!product) return <p className="text-center py-20">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">

      {/* Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

        {/* Image */}
        <div>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-auto rounded-xl shadow-md object-cover"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col">

          {/* Title */}
          <h1 className="font-heading text-4xl text-neutral tracking-tight leading-tight">
            {product.name}
          </h1>

          {/* Description */}
          {product.description && (
            <p className="font-body text-neutral/80 mt-4 leading-relaxed">
              {product.description}
            </p>
          )}

          {/* Size Selector */}
          {product.sizes?.length > 0 && (
            <div className="mt-6">
              <label className="font-body text-sm text-neutral/70">Size</label>
              <select
                value={selectedSize}
                onChange={handleSizeChange}
                className="select select-bordered w-full mt-1"
              >
                {product.sizes.map((s) => (
                  <option key={s.size} value={s.size}>
                    {s.size}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Price */}
          <p className="font-body text-2xl text-neutral mt-6">
            ${price?.toFixed(2)}
          </p>

          {/* Add to Cart */}
          <button
            onClick={() => addToCart(product, selectedSize, price)}
            className="btn btn-primary rounded-full mt-8 w-full md:w-auto"
          >
            Add to Cart
          </button>

        </div>
      </div>

    </div>
  );
}
