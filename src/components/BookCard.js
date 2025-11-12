// /src/components/BookCard.js


// import { useFavorites } from "@/context/FavoritesContext";
// import Image from "next/image";

// export default function BookCard({ book }) {
//   const { favorites, toggleFavorite } = useFavorites();

//   const info = book.volumeInfo || {};
//   const image =
//     info.imageLinks?.thumbnail?.replace("http:", "https:") ||
//     "/placeholder-book.jpg";

//   const isFavorite = favorites.some((f) => f.id === book.id);

//   return (
//     <div className="group bg-base-100 border border-base-300 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between">
      
//       {/* Cover */}
//       <div className="relative w-full h-72 overflow-hidden">
//         <Image
//           src={image}
//           alt={info.title}
//           fill
//           className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
//         />
//       </div>

//       {/* Book Info */}
//       <div className="p-4 flex flex-col flex-grow justify-between">
//         <div>
//           <h3 className="font-heading text-lg text-neutral line-clamp-2">
//             {info.title || "Untitled"}
//           </h3>
//           <p className="text-sm text-neutral/70 italic mb-3">
//             {info.authors?.join(", ") || "Unknown Author"}
//           </p>
//         </div>

//         {/* Buttons */}
//         <div className="flex items-center justify-between mt-auto">
//           <a
//             href={info.infoLink}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="px-4 py-2 text-xs rounded-full border border-[#796544] text-[#796544] hover:bg-[#796544] hover:text-base-100 transition-all duration-300"
//           >
//             View
//           </a>
//           <button
//             onClick={() => toggleFavorite(book)}
//             className={`px-4 py-2 text-xs rounded-full font-medium transition-all duration-300 ${
//               isFavorite
//                 ? "bg-[#C7A269] text-base-100 hover:bg-[#a77f3e]"
//                 : "border border-[#C7A269] text-[#C7A269] hover:bg-[#C7A269] hover:text-base-100"
//             }`}
//           >
//             {isFavorite ? "Saved" : "Save"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import Image from "next/image";
import { useFavorites } from "@/context/FavoritesContext";

export default function BookCard({ book }) {
  const { addToFavorites, removeFromFavorites, favorites } = useFavorites();
  const [showModal, setShowModal] = useState(false);

  const info = book.volumeInfo || {};
  const image =
    info.imageLinks?.thumbnail ||
    info.imageLinks?.smallThumbnail ||
    "/placeholder-book.jpg";

  const isFavorite = favorites.some((fav) => fav.id === book.id);

  return (
    <>
      {/* 📚 Book Card */}
      <div className="group bg-base-100 border border-base-300 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between relative">

        {/* Cover */}
        <div className="relative w-full h-80 bg-[#F5F1EB] flex items-center justify-center overflow-hidden rounded-t-lg">
          <Image
            src={image}
            alt={info.title}
            width={300}
            height={400}
            className="object-contain transition-transform duration-500 ease-out group-hover:scale-105"
            quality={95}
            unoptimized
          />

          {/* 🌫️ Steam Description */}
          {info.description && (
            <div className="absolute inset-0 bg-gradient-to-t from-[#5A4632]/90 via-[#C7A269]/30 to-transparent opacity-0 group-hover:opacity-100 backdrop-blur-sm transition-all duration-700 ease-out flex items-end justify-center text-center px-4 pb-6">
              <p className="text-[#E8D4B0] text-sm leading-snug animate-[rise_1.2s_ease-out_forwards] drop-shadow-md line-clamp-5">
                {info.description}
              </p>
            </div>
          )}
        </div>

        {/* Details */}
        <div className="p-4 flex flex-col justify-between flex-grow">
          <div>
            <h3 className="font-heading text-lg text-neutral mb-1">
              {info.title || "Untitled"}
            </h3>
            <p className="text-sm text-neutral/60 mb-2">
              {info.authors?.join(", ") || "Unknown Author"}
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setShowModal(true)}
              className="px-3 py-1.5 rounded-full border border-[#A07C43] text-[#5A4632] hover:bg-[#C7A269] hover:text-base-100 text-xs font-medium transition-all"
            >
              View
            </button>

            <button
              onClick={() =>
                isFavorite ? removeFromFavorites(book) : addToFavorites(book)
              }
              className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
                isFavorite
                  ? "bg-[#C7A269] text-base-100 border-[#A07C43] hover:bg-[#A07C43]"
                  : "border-[#A07C43] text-[#5A4632] hover:bg-[#C7A269] hover:text-base-100"
              }`}
            >
              {isFavorite ? "Saved" : "Save"}
            </button>
          </div>
        </div>
      </div>

      {/* 📖 Modal Pop-up */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999] px-4">
          <div className="bg-[#F5F1EB] text-neutral rounded-lg max-w-lg w-full shadow-2xl overflow-hidden relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-4 text-2xl text-neutral hover:text-[#C7A269] transition"
            >
              &times;
            </button>

            <div className="p-6">
              <div className="flex flex-col items-center text-center">
                <Image
                  src={image}
                  alt={info.title}
                  width={200}
                  height={280}
                  className="object-contain rounded-md shadow-md mb-4"
                  unoptimized
                />
                <h2 className="font-heading text-2xl text-[#5A4632] mb-2">
                  {info.title}
                </h2>
                <p className="text-sm text-neutral/70 mb-4">
                  {info.authors?.join(", ") || "Unknown Author"}
                </p>
              </div>

              <p className="text-sm leading-relaxed text-neutral/80 max-h-[240px] overflow-y-auto pr-2">
                {info.description || "No description available."}
              </p>

              {info.previewLink && (
                <a
                  href={info.previewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full mt-6 text-center rounded-full bg-[#5A4632] text-base-100 py-2 font-medium hover:bg-[#C7A269] hover:text-neutral transition"
                >
                  Open in Google Books
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Animation */}
      <style jsx>{`
        @keyframes rise {
          0% {
            opacity: 0;
            transform: translateY(10px);
            filter: blur(3px);
          }
          60% {
            opacity: 1;
            transform: translateY(-2px);
            filter: blur(0);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
