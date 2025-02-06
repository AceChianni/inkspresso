// /pages/products/index.js
import { useState, useEffect, useContext } from "react";
import ProductCard from "../../components/ProductCard";
import { CartContext } from "@/context/CartContext";

const MenuPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch("/mocks/products.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
        const uniqueCategories = [...new Set(data.map((product) => product.category))];
        setCategories(uniqueCategories);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Handle Category Filter
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    filterProducts(category, searchQuery);
  };

  // Handle Search
  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
    filterProducts(selectedCategory, query);
  };

  // Filter products based on category and search query
  const filterProducts = (category, query) => {
    let updatedProducts = products;

    if (category) {
      updatedProducts = updatedProducts.filter((product) => product.category === category);
    }

    if (query) {
      updatedProducts = updatedProducts.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFilteredProducts(updatedProducts);
  };

  // Handle Items Per Page Change
  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Menu</h1>

      {/* Filters Section */}
      <div className="flex flex-col md:flex-row justify-between mb-4 space-y-2 md:space-y-0">
        {/* Category Filter Dropdown */}
        <select
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search product..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="p-2 border rounded w-full md:w-1/3"
        />

        {/* Items Per Page Dropdown */}
        <select
          value={itemsPerPage}
          onChange={(e) => handleItemsPerPageChange(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="4">4 items per page</option>
          <option value="8">8 items per page</option>
          <option value="12">12 items per page</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {paginatedProducts.length === 0 ? (
          <div>No products found.</div>
        ) : (
          paginatedProducts.map((product) => (
            <ProductCard key={product._id} product={product} addToCart={addToCart} />
          ))
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-3 py-1 border rounded">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MenuPage;

// import { useState, useEffect, useContext } from "react";
// import ProductCard from "../../components/ProductCard";
// import { CartContext } from "@/context/CartContext";

// const MenuPage = () => {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 8; // Limit items per page
//   const { addToCart } = useContext(CartContext);

//   useEffect(() => {
//     fetch("/mocks/products.json")
//       .then((res) => res.json())
//       .then((data) => {
//         setProducts(data);
//         setFilteredProducts(data);
//         // Extract unique categories from products
//         const uniqueCategories = [...new Set(data.map((product) => product.category))];
//         setCategories(uniqueCategories);
//       })
//       .catch((error) => console.error("Error fetching products:", error));
//   }, []);

//   // Handle Category Filter
//   const handleCategoryChange = (category) => {
//     setSelectedCategory(category);
//     setCurrentPage(1); // Reset to first page when filtering
//     if (category === "") {
//       setFilteredProducts(products);
//     } else {
//       setFilteredProducts(products.filter((product) => product.category === category));
//     }
//   };

//   // Pagination Logic
//   const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
//   const paginatedProducts = filteredProducts.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold text-center mb-4">Menu</h1>

//       {/* Category Filter Dropdown */}
//       <div className="mb-4 flex justify-center">
//         <select
//           value={selectedCategory}
//           onChange={(e) => handleCategoryChange(e.target.value)}
//           className="p-2 border rounded"
//         >
//           <option value="">All Categories</option>
//           {categories.map((category) => (
//             <option key={category} value={category}>
//               {category}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Product Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
//         {paginatedProducts.length === 0 ? (
//           <div>No products found.</div>
//         ) : (
//           paginatedProducts.map((product) => (
//             <ProductCard key={product._id} product={product} addToCart={addToCart} />
//           ))
//         )}
//       </div>

//       {/* Pagination Controls */}
//       <div className="flex justify-center mt-6 space-x-2">
//         <button
//           onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//           disabled={currentPage === 1}
//           className="px-3 py-1 border rounded disabled:opacity-50"
//         >
//           Prev
//         </button>
//         <span className="px-3 py-1 border rounded">
//           Page {currentPage} of {totalPages}
//         </span>
//         <button
//           onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//           disabled={currentPage === totalPages}
//           className="px-3 py-1 border rounded disabled:opacity-50"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MenuPage;
