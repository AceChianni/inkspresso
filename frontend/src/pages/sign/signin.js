// pages/sign/signin.js

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";

export default function SignIn() {
  const { user, login } = useAuth();
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (user) {
      // Redirect to home or products page if already logged in
      router.push("/products");
    }
  }, [user, router]);

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!emailOrUsername || !password) {
      setError("Please fill in both fields.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5001/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usernameOrEmail: emailOrUsername,
          password,
        }),
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        login(data.user);
        // Redirect to home page after successful login
        router.push("/products");
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error during sign-in:", error.response || error.message);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSignIn}
        className="bg-white p-8 rounded-md shadow-md max-w-sm w-full"
      >
        <h2 className="text-2xl font-semibold mb-4">Sign In</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="mb-4">
          <label
            htmlFor="emailOrUsername"
            className="block text-gray-700 dark:text-white"
          >
            Email or Username
          </label>
          <input
            id="emailOrUsername"
            type="text"
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Enter your email or username"
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
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-600 text-white py-2 rounded-md hover:bg-orange-900"
        >
          Sign In
        </button>

        <div className="mt-4 text-center">
          <span className="text-gray-600">Don't have an account? </span>
          <Link href="/sign/signup" className="text-orange-600 hover:underline">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}
