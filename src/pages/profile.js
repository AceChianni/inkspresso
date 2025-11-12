// /src/pages/profile.js

import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  // Redirect if user is not logged in
  useEffect(() => {
    if (!user) {
      router.push("/auth");
    }
  }, [user, router]);

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16 text-center text-neutral">
        <h1 className="text-3xl font-heading mb-6">Redirecting...</h1>
        <p className="text-neutral/70">You must be signed in to view this page.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 text-neutral">
      <h1 className="text-4xl font-heading text-center text-primary-focus mb-8">
        Welcome, {user.name || "Reader"} ☕
      </h1>

      <div className="border border-base-300 bg-base-100/90 rounded-xl p-8 shadow-sm">
        <div className="text-center mb-8">
          <p className="text-lg font-medium text-neutral">{user.email}</p>
          <p className="text-sm text-neutral/70 mt-1">Member since {user.createdAt || "today"}</p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/library/checkout"
            className="px-6 py-2 rounded-full border border-[#A07C43] text-[#5A4632] hover:bg-[#C7A269] hover:text-base-100 transition text-sm font-medium"
          >
            📚 View Bookshelf
          </Link>

          <Link
            href="/orders"
            className="px-6 py-2 rounded-full border border-[#A07C43] text-[#5A4632] hover:bg-[#C7A269] hover:text-base-100 transition text-sm font-medium"
          >
            🧾 View Orders
          </Link>

          <button
            onClick={logout}
            className="px-6 py-2 rounded-full bg-[#cf9154] text-base-100 hover:bg-[#C7A269] hover:text-neutral transition text-sm font-medium"
          >
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  );
}
