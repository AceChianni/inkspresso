// /pages/products/index.js

import { useState, useEffect, useContext } from "react";
import ProductCard from "../../components/ProductCard";
import { CartContext } from "@/context/CartContext";

const MenuPage = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch("/mocks/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Menu</h1>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products.length === 0 ? (
          <div>Loading...</div>
        ) : (
          products.map((product) => (
            <ProductCard key={product._id} product={product} addToCart={addToCart} />
          ))
        )}
      </div>
    </div>
  );
};

export default MenuPage;
