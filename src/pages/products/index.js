// /src/products/index.js
import { useState } from "react";
import products from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function MenuPage() {
  const [category, setCategory] = useState("");

  const categories = [...new Set(products.map(p => p.category))];
  const filtered = category ? products.filter(p => p.category === category) : products;

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-center font-heading text-5xl mb-6 text-neutral">
        The Apothecary Menu
      </h1>

      <p className="text-center max-w-xl mx-auto text-neutral/70 mb-10">
        Select your brew, blend, or botanical. Every item is curated with care.
      </p>

      {/* Category Dropdown */}
      <div className="flex justify-center mb-10">
        <select
          className="px-4 py-2 border border-base-300 bg-base-100 text-neutral"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Items</option>
          {categories.map(c => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {filtered.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
