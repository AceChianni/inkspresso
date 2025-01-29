// pages/sign/signup.js

import { useState } from 'react';
import Link from 'next/link';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Simulate sign-up process (e.g., API call)
    if (!email || !username || !password) {
      setError('Please fill in all fields.');
      return;
    }

    // Here you would typically make an API request to create a new user
    console.log('Sign Up:', email, username, password);

    // Redirect or handle after successful sign-up
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form onSubmit={handleSignUp} className="bg-white p-8 rounded-md shadow-md max-w-sm w-full">
        <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 dark:text-white">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 dark:text-white">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 dark:text-white">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-600 text-white py-2 rounded-md hover:bg-orange-900"
        >
          Sign Up
        </button>

        <div className="mt-4 text-center">
          <span className="text-gray-600">Already have an account? </span>
          <Link href="/sign/signin" className="text-orange-600 hover:underline">Sign In</Link>
        </div>
      </form>
    </div>
  );
}
