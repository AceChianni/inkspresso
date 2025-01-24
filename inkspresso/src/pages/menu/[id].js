// /pages/products/[id].js

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Button from "../../components/Button";

export default function ProductPage() {
  const [product, setProduct] = useState(null);
  const { id } = useRouter().query;

  useEffect(() => {
    if (id) {
      fetch(`/mocks/products.json`)
        .then((res) => res.json())
        .then((data) => {
          const foundProduct = data.find((item) => item._id.toString() === id);
          setProduct(foundProduct || {});
        });
    }
  }, [id]);

  if (!product)
    return <p className="text-text-light dark:text-text-dark">Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col bg-base-100 dark:bg-base-dark text-base-content dark:text-base-content-dark">
      <header className="p-4 bg-base-100 dark:bg-base-dark">
        {/* Add your header component here */}
      </header>
      <main className="container mx-auto p-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full md:w-1/2 h-auto object-cover rounded-lg"
          />
          <div className="flex flex-col w-full md:w-1/2">
            <h1 className="text-3xl font-semibold mb-4 text-primary dark:text-accent">
              {product.name}
            </h1>
            <p className="text-lg mb-4 text-text-primary dark:text-neutral">
              {product.description}
            </p>
            <p className="text-xl font-bold mb-4 text-secondary dark:text-sunset-light">
              ${product.price}
            </p>
            <Button
              label="Add to Cart"
              handleClick={() => alert(`${product.name} added to cart!`)}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
