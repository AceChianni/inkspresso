// /pages/products/[id].js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const ProductDetails = () => {
  const router = useRouter();
  const { id } = router.query;  // Get product ID from the URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!id) return; // Wait for the ID to be available

    // Fetching product details from your backend API
    fetch(`/api/products/${id}`) // Adjust the API endpoint as needed
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error('Error fetching product details:', error));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <div className="flex flex-col md:flex-row">
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 h-auto mb-4 md:mb-0"
        />
        <div className="ml-0 md:ml-6">
          <p className="mb-4">{product.description}</p>
          <p className="text-lg font-semibold mb-4">${product.price}</p>
          {/* You can add options like size, quantity, etc., here */}
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
