// /pages/auth/index.js
import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";

export default function AuthPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const { login, signup } = useAuth();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      signup(email, password, name);
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        router.push("/profile");
      }, 1500);
    } else {
      login(email, password);
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        router.push("/profile");
      }, 1500);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-[#F5F1EB] text-[#3A2E23] px-6 py-12">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-md border border-[#C7A269]/40 rounded-2xl shadow-lg p-8 text-center">
          <h1 className="font-heading text-3xl text-[#5A4632] mb-2">
            {isSignup ? "Create Account" : "Welcome Back"}
          </h1>
          <p className="text-sm text-neutral/70 mb-8">
            {isSignup
              ? "Sign up to save your blends, books, and favorites."
              : "Sign in to continue your journey."}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            {isSignup && (
              <div>
                <label className="text-sm font-medium text-neutral/80">Name</label>
                <input
                  type="text"
                  className="w-full mt-1 px-4 py-2 border border-[#C7A269]/40 rounded-full bg-[#F5F1EB] focus:border-[#C7A269] focus:ring-2 focus:ring-[#C7A269]/40 outline-none transition"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-neutral/80">Email</label>
              <input
                type="email"
                className="w-full mt-1 px-4 py-2 border border-[#C7A269]/40 rounded-full bg-[#F5F1EB] focus:border-[#C7A269] focus:ring-2 focus:ring-[#C7A269]/40 outline-none transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-neutral/80">Password</label>
              <input
                type="password"
                className="w-full mt-1 px-4 py-2 border border-[#C7A269]/40 rounded-full bg-[#F5F1EB] focus:border-[#C7A269] focus:ring-2 focus:ring-[#C7A269]/40 outline-none transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full mt-6 py-2 rounded-full bg-[#5A4632] text-base-100 font-medium tracking-wide hover:bg-[#C7A269] hover:text-neutral shadow-md transition-all duration-300"
            >
              {isSignup ? "Sign Up" : "Sign In"}
            </button>
          </form>

          <p className="mt-6 text-sm text-neutral/70">
            {isSignup ? "Already have an account?" : "New to Inkspresso?"}{" "}
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="text-[#A07C43] hover:text-[#C7A269] font-medium"
            >
              {isSignup ? "Sign in" : "Create one"}
            </button>
          </p>
        </div>
      </div>

      {/* ✨ Centered Success Popup */}
      {showPopup && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#caa05c] text-base-300 text-sm px-6 py-3 rounded-full shadow-lg animate-fadeUp z-[9999]">
          {isSignup ? "✨ Account created!" : "☕ Welcome back!"}
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

// import { useState } from "react";
// import { useRouter } from "next/router";
// import { useAuth } from "@/context/AuthContext";

// export default function AuthPage() {
//   const [isSignup, setIsSignup] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const { login, signup } = useAuth();
//   const router = useRouter();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (isSignup) {
//       signup(email, password, name);
//     } else {
//       login(email, password);
//     }
//     router.push("/"); // redirect after auth
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#F5F1EB] text-[#3A2E23] px-6 py-12">
//       <div className="w-full max-w-md bg-white/80 backdrop-blur-md border border-[#C7A269]/40 rounded-2xl shadow-lg p-8 text-center">
//         <h1 className="font-heading text-3xl text-[#5A4632] mb-2">
//           {isSignup ? "Create Account" : "Welcome Back"}
//         </h1>
//         <p className="text-sm text-neutral/70 mb-8">
//           {isSignup
//             ? "Sign up to save your blends, books, and favorites."
//             : "Sign in to continue your journey."}
//         </p>

//         <form onSubmit={handleSubmit} className="space-y-4 text-left">
//           {isSignup && (
//             <div>
//               <label className="text-sm font-medium text-neutral/80">Name</label>
//               <input
//                 type="text"
//                 className="w-full mt-1 px-4 py-2 border border-[#C7A269]/40 rounded-full bg-[#F5F1EB] focus:border-[#C7A269] focus:ring-2 focus:ring-[#C7A269]/40 outline-none transition"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//               />
//             </div>
//           )}
//           <div>
//             <label className="text-sm font-medium text-neutral/80">Email</label>
//             <input
//               type="email"
//               className="w-full mt-1 px-4 py-2 border border-[#C7A269]/40 rounded-full bg-[#F5F1EB] focus:border-[#C7A269] focus:ring-2 focus:ring-[#C7A269]/40 outline-none transition"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div>
//             <label className="text-sm font-medium text-neutral/80">Password</label>
//             <input
//               type="password"
//               className="w-full mt-1 px-4 py-2 border border-[#C7A269]/40 rounded-full bg-[#F5F1EB] focus:border-[#C7A269] focus:ring-2 focus:ring-[#C7A269]/40 outline-none transition"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full mt-6 py-2 rounded-full bg-[#5A4632] text-base-100 font-medium tracking-wide hover:bg-[#C7A269] hover:text-neutral shadow-md transition-all duration-300"
//           >
//             {isSignup ? "Sign Up" : "Sign In"}
//           </button>
//         </form>

//         <p className="mt-6 text-sm text-neutral/70">
//           {isSignup ? "Already have an account?" : "New to Inkspresso?"}{" "}
//           <button
//             onClick={() => setIsSignup(!isSignup)}
//             className="text-[#A07C43] hover:text-[#C7A269] font-medium"
//           >
//             {isSignup ? "Sign in" : "Create one"}
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// }
