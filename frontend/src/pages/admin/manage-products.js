// /pages/admin/manage-products.js
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

const ManageProducts = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
  });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch all products with pagination & sorting
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/products");
      return data;
    } catch (error) {
      console.error(
        "Failed to fetch products:",
        error.response?.data || error.message
      );
      throw error;
    }
  };

  // Fetch product details if editing
  useEffect(() => {
    if (!router.query.id) return;
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${router.query.id}`);
        setFormData({
          name: data.name,
          price: data.price,
          description: data.description,
        });
        setIsEditing(true);
      } catch (error) {
        console.error("Failed to fetch product", error);
      }
    };
    fetchProduct();
  }, [router.query.id]);

  // Handle authentication & authorization
  useEffect(() => {
    if (user === undefined) return; // Wait for auth to load
    if (!user || !user.isAdmin) {
      router.push("/");
    } else {
      fetchProducts();
    }
  }, [user]);

  // Handle form submission (Add or Edit Product)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    formDataObj.append("name", formData.name);
    formDataObj.append("price", formData.price);
    formDataObj.append("description", formData.description);
    if (formData.image) formDataObj.append("image", formData.image);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      if (isEditing) {
        await axios.put(
          `/api/products/${router.query.id}`,
          formDataObj,
          config
        );
      } else {
        await axios.post("/api/products", formDataObj, config);
      }
      resetForm();
      fetchProducts();
    } catch (error) {
      console.error("Failed to submit product", error);
    }
  };

  // Handle delete product
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/products/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      fetchProducts();
    } catch (error) {
      console.error("Failed to delete product", error);
    }
  };

  // Handle edit button click
  const handleEditClick = (product) => {
    router.push(`/admin/manage-products?id=${product._id}`);
  };

  // Handle form input changes
  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Reset form after submission or cancel
  const resetForm = () => {
    setIsEditing(false);
    setFormData({ name: "", price: "", description: "", image: null });
    router.push("/admin/manage-products");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Products</h1>

      {/* Form to Add/Edit Product */}
      <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-100 rounded">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Product Name"
          required
          className="block w-full p-2 mb-2 border rounded"
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          required
          className="block w-full p-2 mb-2 border rounded"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
          className="block w-full p-2 mb-2 border rounded"
        ></textarea>

        {/* Image Upload Field */}
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="block w-full p-2 mb-2 border rounded"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          {isEditing ? "Update Product" : "Add Product"}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={resetForm}
            className="bg-gray-500 text-white p-2 rounded w-full mt-2"
          >
            Cancel
          </button>
        )}
      </form>

      {/* Product List */}
      <table className="w-full bg-white border rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="text-center">
              <td className="p-2 border">{product.name}</td>
              <td className="p-2 border">${product.price}</td>
              <td className="p-2 border">
                <button
                  onClick={() => handleEditClick(product)}
                  className="bg-yellow-500 text-white p-1 rounded mx-1"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 text-white p-1 rounded mx-1"
                >
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
