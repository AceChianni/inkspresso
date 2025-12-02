// /src/pages/profile/password-reset.js
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";

export default function PasswordReset() {
  const { user, resetPassword } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState(user?.email || "");
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Local mock version (Firebase-ready)
    resetPassword(email);

    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      router.push("/auth");
    }, 2000);
  };

  return (
    <>
      <div className="max-w-lg mx-auto px-6 py-16 text-neutral">
        <h1 className="font-heading text-4xl text-center text-primary-focus mb-8">
          Reset Password
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-base-100/80 border border-base-300 rounded-xl p-6 shadow-sm"
        >
          <p className="text-sm text-neutral/70 mb-4">
            Enter the email associated with your account. We’ll send instructions to reset your password.
          </p>

          {/* EMAIL FIELD */}
          <div>
            <label className="text-sm font-medium text-neutral/70">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-4 py-2 rounded-full bg-[#F5F1EB] border border-[#C7A269]/40 focus:outline-none focus:ring-2 focus:ring-[#C7A269]/40"
            />
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full py-3 rounded-full bg-[#6F7C56] text-base-100 font-medium hover:bg-[#C7A269] hover:text-neutral shadow-md transition"
          >
            Send Reset Link
          </button>

          {/* BACK */}
          <button
            type="button"
            onClick={() => router.push("/profile")}
            className="w-full py-2 rounded-full text-sm text-neutral/70 hover:text-neutral transition"
          >
            ← Back to Profile
          </button>
        </form>
      </div>

      {/* SUCCESS POPUP */}
      {showPopup && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#caa05c] text-base-100 text-sm px-6 py-3 rounded-full shadow-lg animate-fadeUp z-[9999]">
          ✨ Reset link sent!
        </div>
      )}

      <style jsx>{`
        @keyframes fadeUp {
          0% {
            opacity: 0;
            transform: translate(-50%, 20px);
          }
          25% {
            opacity: 1;
            transform: translate(-50%, -4px);
          }
          80% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -20px);
          }
        }

        .animate-fadeUp {
          animation: fadeUp 1.8s ease-out forwards;
        }
      `}</style>
    </>
  );
}
