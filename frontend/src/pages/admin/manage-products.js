// /pages/admin/manage-products.js
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const ManageProducts = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const { name, price, description } = formData;

  useEffect(() => {
    if (!user || !user.isAdmin) {
      router.push("/"); // Redirect if not admin
    } else {
      fetchProducts();
    }
  }, [user]);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/products");
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // Edit existing product
        await axios.put(`/api/products/${router.query.id}`, formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
      } else {
        // Add new product
        await axios.post("/api/products", formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
      }
      router.push("/admin/manage-products");
    } catch (error) {
      console.error("Failed to submit product", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`/api/products/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const handleEditClick = async (id) => {
    try {
      const { data } = await axios.get(`/api/products/${id}`);
      setFormData({ name: data.name, price: data.price, description: data.description });
      setIsEditing(true);
      router.push(`/admin/manage-products?id=${id}`); // Keep the URL updated with ID
    } catch (error) {
      console.error("Failed to fetch product", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{isEditing ? "Edit Product" : "Manage Products"}</h1>

      <button onClick={() => router.push("/admin/manage-products")} className="bg-green-500 text-white p-2 rounded mb-4">
        {isEditing ? "Cancel" : "Add Product"}
      </button>

      {isEditing || !router.query.id ? (
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Product Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={price}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={description}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded"
          >
            {isEditing ? "Update Product" : "Add Product"}
          </button>
        </form>
      ) : null}

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="border">
              <td className="p-2 border">{product.name}</td>
              <td className="p-2 border">${product.price}</td>
              <td className="p-2 border">
                <button onClick={() => handleEditClick(product._id)} className="bg-blue-500 text-white p-1 rounded mr-2">
                  Edit
                </button>
                <button onClick={() => handleDelete(product._id)} className="bg-red-500 text-white p-1 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageProducts;
