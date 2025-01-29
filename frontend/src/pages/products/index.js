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
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-6">Menu</h1>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products.length === 0 ? (
          <div className="text-center text-xl font-semibold text-gray-700 dark:text-gray-300">Loading...</div>
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



// import { useState, useEffect } from "react";
// import ProductCard from "../../components/ProductCard";

// const MenuPage = () => {
//   const [products, setProducts] = useState([]);
//   const [filters, setFilters] = useState({
//     category: "",
//     sortBy: "price_asc", // Default sort by price ascending
//     search: "",
//     minPrice: "",
//     maxPrice: "",
//   });
//   const [pagination, setPagination] = useState({
//     page: 1,
//     totalPages: 1,
//   });
//   const [loading, setLoading] = useState(false);

//   // Function to fetch products from the backend
//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       const params = new URLSearchParams({
//         category: filters.category,
//         sortBy: filters.sortBy,
//         search: filters.search,
//         minPrice: filters.minPrice,
//         maxPrice: filters.maxPrice,
//         page: pagination.page,
//         limit: 10, // Adjust limit as needed
//       });

//       const response = await fetch(`/api/products?${params.toString()}`);
//       const data = await response.json();
      
//       if (response.ok) {
//         setProducts(data.products);
//         setPagination({
//           page: data.pagination.currentPage,
//           totalPages: data.pagination.totalPages,
//         });
//       } else {
//         console.error("Error fetching products:", data.message);
//       }
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, [filters, pagination.page]);

//   const handleCategoryChange = (e) => {
//     setFilters({ ...filters, category: e.target.value });
//   };

//   const handleSortChange = (e) => {
//     setFilters({ ...filters, sortBy: e.target.value });
//   };

//   const handlePageChange = (newPage) => {
//     if (newPage >= 1 && newPage <= pagination.totalPages) {
//       setPagination({ ...pagination, page: newPage });
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold text-center mb-4">Menu</h1>

//       {/* Filter and Sort */}
//       <div className="flex justify-between mb-4">
//         <div className="flex gap-4">
//           <select
//             value={filters.category}
//             onChange={handleCategoryChange}
//             className="p-2 border"
//           >
//             <option value="">All Categories</option>
//             <option value="Food">Food</option>
//             <option value="Beverage">Beverage</option>
//           </select>
//           <select
//             value={filters.sortBy}
//             onChange={handleSortChange}
//             className="p-2 border"
//           >
//             <option value="price_asc">Price: Low to High</option>
//             <option value="price_desc">Price: High to Low</option>
//             <option value="name_asc">Name: A-Z</option>
//             <option value="name_desc">Name: Z-A</option>
//           </select>
//         </div>
//         <button className="bg-orange-500 text-white py-2 px-4 rounded">
//           View Cart
//         </button>
//       </div>

//       {/* Product Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {loading ? (
//           <div>Loading...</div>
//         ) : (
//           products.map((product) => (
//             <ProductCard key={product._id} product={product} />
//           ))
//         )}
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-center mt-6">
//         <button
//           onClick={() => handlePageChange(pagination.page - 1)}
//           disabled={pagination.page === 1}
//           className="p-2 bg-gray-200 rounded-l"
//         >
//           Prev
//         </button>
//         <span className="p-2">
//           Page {pagination.page} of {pagination.totalPages}
//         </span>
//         <button
//           onClick={() => handlePageChange(pagination.page + 1)}
//           disabled={pagination.page === pagination.totalPages}
//           className="p-2 bg-gray-200 rounded-r"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MenuPage;
