// /src/pages/profile/update.js
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";

export default function UpdateProfile() {
  const { user, updateProfile } = useAuth();
  const router = useRouter();

  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    avatar: "",
  });

  const [showPopup, setShowPopup] = useState(false);

  // Load existing profile
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address1: user.address1 || "",
        address2: user.address2 || "",
        city: user.city || "",
        state: user.state || "",
        zip: user.zip || "",
        country: user.country || "",
        avatar: user.avatar || "",
      });
      setAvatarPreview(user.avatar || null);
    }
  }, [user]);

  // Handle form text changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Handle avatar uploads (local for now)
  const handleAvatar = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setAvatarFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      setAvatarPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Save profile
  const handleSubmit = async (e) => {
    e.preventDefault();

    let avatarBase64 = form.avatar;

    // Convert file to base64 for now 
    if (avatarFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        avatarBase64 = reader.result;

        updateProfile({
          ...form,
          avatar: avatarBase64,
        });

        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
          router.push("/profile");
        }, 1500);
      };
      reader.readAsDataURL(avatarFile);
      return;
    }

    // If no new upload — just save the form normally
    updateProfile(form);

    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      router.push("/profile");
    }, 1500);
  };

  return (
    <>
      <div className="max-w-xl mx-auto px-6 py-16 text-neutral">
        <h1 className="font-heading text-4xl text-center text-primary-focus mb-10">
          Update Profile
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-base-100/80 border border-base-300 rounded-xl p-6 shadow-sm"
        >
          {/* AVATAR */}
          <div className="flex flex-col items-center">
            <div className="w-28 h-28 rounded-full overflow-hidden border border-[#C7A269]/40 shadow">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  className="w-full h-full object-cover"
                  alt="avatar preview"
                />
              ) : (
                <div className="w-full h-full bg-[#EAE4D6] flex items-center justify-center text-neutral/50">
                  No avatar
                </div>
              )}
            </div>

            <label className="mt-3 text-sm font-medium text-neutral/70">
              Upload Avatar
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleAvatar}
              className="mt-2 text-xs"
            />
          </div>

          {/* NAME */}
          <div>
            <label className="text-sm font-medium text-neutral/70">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 rounded-full bg-[#F5F1EB] border border-[#C7A269]/40 focus:ring-2 focus:ring-[#C7A269]/40 outline-none"
              required
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm font-medium text-neutral/70">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 rounded-full bg-[#F5F1EB] border border-[#C7A269]/40 focus:ring-2 focus:ring-[#C7A269]/40 outline-none"
              required
            />
          </div>

          {/* PHONE */}
          <div>
            <label className="text-sm font-medium text-neutral/70">Phone</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="(optional)"
              className="w-full mt-1 px-4 py-2 rounded-full bg-[#F5F1EB] border border-[#C7A269]/40 focus:ring-2 focus:ring-[#C7A269]/40 outline-none"
            />
          </div>

          {/* ADDRESS SECTION */}
          <div>
            <label className="text-sm font-medium text-neutral/70">Address Line 1</label>
            <input
              name="address1"
              value={form.address1}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 rounded-full bg-[#F5F1EB] border border-[#C7A269]/40 focus:ring-2 focus:ring-[#C7A269]/40 outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-neutral/70">Address Line 2</label>
            <input
              name="address2"
              value={form.address2}
              onChange={handleChange}
              placeholder="Apt, Suite, etc."
              className="w-full mt-1 px-4 py-2 rounded-full bg-[#F5F1EB] border border-[#C7A269]/40"
            />
          </div>

          {/* CITY + STATE */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-neutral/70">City</label>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 rounded-full bg-[#F5F1EB] border border-[#C7A269]/40"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-neutral/70">State</label>
              <input
                name="state"
                value={form.state}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 rounded-full bg-[#F5F1EB] border border-[#C7A269]/40"
              />
            </div>
          </div>

          {/* ZIP + COUNTRY */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-neutral/70">ZIP</label>
              <input
                name="zip"
                value={form.zip}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 rounded-full bg-[#F5F1EB] border"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-neutral/70">Country</label>
              <input
                name="country"
                value={form.country}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 rounded-full bg-[#F5F1EB] border"
              />
            </div>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full py-3 rounded-full bg-[#6F7C56] text-base-100 font-medium hover:bg-[#C7A269] transition"
          >
            Save Changes
          </button>

          {/* BACK */}
          <button
            type="button"
            onClick={() => router.push("/profile")}
            className="w-full py-2 rounded-full text-sm text-neutral/70"
          >
            ← Back to Profile
          </button>
        </form>
      </div>

      {/* SUCCESS POPUP */}
      {showPopup && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#caa05c] text-base-100 text-sm px-6 py-3 rounded-full shadow-lg animate-fadeUp z-[9999]">
          ✨ Profile updated!
        </div>
      )}

      <style jsx>{`
        @keyframes fadeUp {
          0% { opacity: 0; transform: translate(-50%, 20px); }
          25% { opacity: 1; transform: translate(-50%, -4px); }
          80% { opacity: 1; }
          100% { opacity: 0; transform: translate(-50%, -20px); }
        }
        .animate-fadeUp {
          animation: fadeUp 1.8s ease-out forwards;
        }
      `}</style>
    </>
  );
}
