// /src/pages/profile/index.js
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  // Redirect if no user
  useEffect(() => {
    if (!user) router.replace("/auth");
  }, [user, router]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-neutral">
        <p className="text-neutral/70 text-lg">Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 text-neutral">
      
      {/* Greeting */}
      <h1 className="text-4xl font-heading text-center text-primary-focus mb-10">
        Welcome, {user.name || "Reader"} ☕
      </h1>

      {/* Profile Card */}
      <div className="border border-base-300 bg-base-100/90 rounded-xl p-8 shadow-sm">

        {/* User Info */}
        <div className="text-center mb-10">
          <p className="text-lg font-medium text-neutral">{user.email}</p>
          <p className="text-sm text-neutral/60 mt-1">
            Member since {user.createdAt || "today"}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">

          <Link
            href="/profile/update"
            className="px-6 py-3 rounded-full text-sm font-medium border border-[#A07C43] 
                       text-[#5A4632] hover:bg-[#C7A269] hover:text-base-100 transition"
          >
            ✏️ Update Profile
          </Link>

          <Link
            href="/profile/passwordreset"
            className="px-6 py-3 rounded-full text-sm font-medium border border-[#A07C43] 
                       text-[#5A4632] hover:bg-[#C7A269] hover:text-base-100 transition"
          >
            🔒 Reset Password
          </Link>

          <Link
            href="/profile/manageshelves"
            className="px-6 py-3 rounded-full text-sm font-medium border border-[#A07C43] 
                       text-[#5A4632] hover:bg-[#C7A269] hover:text-base-100 transition"
          >
            📚 Manage Bookshelves
          </Link>

          <Link
            href="/profile/orderhistory"
            className="px-6 py-3 rounded-full text-sm font-medium border border-[#A07C43] 
                       text-[#5A4632] hover:bg-[#C7A269] hover:text-base-100 transition"
          >
            🧾 View Order History
          </Link>

        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className="w-full mt-4 px-6 py-3 rounded-full bg-[#cf9154] text-base-100 text-sm 
                     font-medium hover:bg-[#C7A269] hover:text-neutral transition"
        >
          🚪 Logout
        </button>

      </div>
    </div>
  );
}
