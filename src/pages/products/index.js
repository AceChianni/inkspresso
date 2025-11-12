// /src/products/index.js
import { useState } from "react";
import products from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function MenuPage() {
  const [category, setCategory] = useState("");

  const categories = [...new Set(products.map((p) => p.category))];
  const filtered = category
    ? products.filter((p) => p.category === category)
    : products;

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
  <div className="relative w-40 sm:w-44">
    <select
      className="appearance-none w-full px-3 py-1.5 rounded-full font-body text-xs sm:text-sm text-neutral bg-[#F5F1EB] 
                 border border-[#C7A269]/40 shadow-sm hover:border-[#C7A269]/70 focus:border-[#C7A269] 
                 focus:ring-2 focus:ring-[#C7A269]/30 transition duration-300 cursor-pointer"
      value={category}
      onChange={(e) => setCategory(e.target.value)}
    >
      <option value="">All Items</option>
      {categories.map((c) => (
        <option key={c}>{c}</option>
      ))}
    </select>

    {/* Chevron */}
    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#C7A269] text-xs pointer-events-none">
      ▼
    </span>
  </div>
</div>


      {/* Product Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

// import { useState } from "react";
// import products from "@/data/products";
// import ProductCard from "@/components/ProductCard";

// export default function MenuPage() {
//   const [category, setCategory] = useState("");

//   const categories = [...new Set(products.map(p => p.category))];
//   const filtered = category ? products.filter(p => p.category === category) : products;

//   return (
//     <div className="max-w-7xl mx-auto px-6 py-16">
//       <h1 className="text-center font-heading text-5xl mb-6 text-neutral">
//         The Apothecary Menu
//       </h1>

//       <p className="text-center max-w-xl mx-auto text-neutral/70 mb-10">
//         Select your brew, blend, or botanical. Every item is curated with care.
//       </p>

//       {/* Category Dropdown */}
// <div className="flex justify-center mb-10">
//   <select
//     className="appearance-none px-5 py-2.5 rounded-full font-body text-sm text-neutral bg-[#F5F1EB] border border-[#C7A269]/40 shadow-sm 
//                hover:border-[#C7A269]/70 focus:border-[#C7A269] focus:ring-2 focus:ring-[#C7A269]/40 
//                transition duration-300 cursor-pointer"
//     value={category}
//     onChange={(e) => setCategory(e.target.value)}
//   >
//     <option value="">All Items</option>
//     {categories.map((c) => (
//       <option key={c}>{c}</option>
//     ))}
//   </select>
// </div>


//       {/* Product Grid */}
//       <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
//         {filtered.map(product => (
//           <ProductCard key={product.id} product={product} />
//         ))}
//       </div>
//     </div>
//   );
// }
