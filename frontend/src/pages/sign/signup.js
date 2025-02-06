// pages/sign/signup.js
import { useState } from "react";
import Link from "next/link";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // Added state for success message
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!email || !username || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError(""); // Reset previous errors
    setSuccess(""); // Reset previous success messages

    try {
      const response = await fetch("http://localhost:5001/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful signup, display success message
        setSuccess(data.message);
        console.log("User signed up successfully:", data);
      } else {
        setError(data.message || "Failed to sign up.");
      }
    } catch (error) {
      setError("Something went wrong, please try again.");
      console.error("Error during sign up:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSignUp}
        className="bg-white p-8 rounded-md shadow-md max-w-sm w-full"
      >
        <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}{" "}
        {/* Success message */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 dark:text-white"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 dark:text-white"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Choose a username"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 dark:text-white"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Create a password"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-emerald-600 text-white py-2 rounded-md hover:bg-orange-900"
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
