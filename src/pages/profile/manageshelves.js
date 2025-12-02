// /src/pages/profile/manageshelves.js
import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import { useFavorites } from "@/context/FavoritesContext";
import Image from "next/image";

export default function ManageShelves() {
  const router = useRouter();
  const { user } = useAuth();
  const { favorites } = useFavorites();

  const [shelves, setShelves] = useState({});
  const [newShelfName, setNewShelfName] = useState("");
  const [editShelfId, setEditShelfId] = useState(null);
  const [editShelfName, setEditShelfName] = useState("");
  const [selection, setSelection] = useState({}); // bookId -> shelfId

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      router.push("/auth");
    }
  }, [user, router]);

  // Load shelves on mount
  useEffect(() => {
    if (!user) return;
    const saved = localStorage.getItem("inkspresso_shelves");
    if (saved) {
      try {
        setShelves(JSON.parse(saved));
      } catch {
        setShelves({});
      }
    }
  }, [user]);

  const saveShelves = (data) => {
    setShelves(data);
    localStorage.setItem("inkspresso_shelves", JSON.stringify(data));
    // 🔮 TODO: Firebase sync here later
  };

  // Create new shelf
  const handleAddShelf = () => {
    if (!newShelfName.trim()) return;
    const id = Date.now().toString();
    const updated = {
      ...shelves,
      [id]: { id, name: newShelfName.trim(), books: [] },
    };
    saveShelves(updated);
    setNewShelfName("");
  };

  // Delete shelf
  const handleDeleteShelf = (id) => {
    const updated = { ...shelves };
    delete updated[id];
    saveShelves(updated);
  };

  // Rename shelf
  const handleRenameShelf = () => {
    if (!editShelfName.trim() || !editShelfId) return;
    const updated = {
      ...shelves,
      [editShelfId]: {
        ...shelves[editShelfId],
        name: editShelfName.trim(),
      },
    };
    saveShelves(updated);
    setEditShelfId(null);
    setEditShelfName("");
  };

  // Add book to shelf
  const addBookToShelf = (bookId, shelfId) => {
    if (!shelfId || !shelves[shelfId]) return;

    const shelf = shelves[shelfId];
    const alreadyInShelf = shelf.books.includes(bookId);
    if (alreadyInShelf) return;

    const updated = {
      ...shelves,
      [shelfId]: {
        ...shelf,
        books: [...shelf.books, bookId],
      },
    };

    saveShelves(updated);
  };

  // Remove book from shelf
  const removeBookFromShelf = (bookId, shelfId) => {
    if (!shelfId || !shelves[shelfId]) return;

    const shelf = shelves[shelfId];
    const updated = {
      ...shelves,
      [shelfId]: {
        ...shelf,
        books: shelf.books.filter((id) => id !== bookId),
      },
    };

    saveShelves(updated);
  };

  // Which book IDs are on any shelf?
  const shelvedIds = useMemo(() => {
    return new Set(
      Object.values(shelves).flatMap((shelf) => shelf.books || [])
    );
  }, [shelves]);

  // Books in favorites but not on any shelf
  const unshelvedBooks = useMemo(() => {
    return favorites.filter((book) => !shelvedIds.has(book.id));
  }, [favorites, shelvedIds]);

  const shelfList = Object.values(shelves);

  if (!user) return null;

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 text-neutral">
      <h1 className="text-4xl font-heading text-center text-primary-focus mb-10">
        Manage Bookshelves 📚
      </h1>

      {/* Create Shelf */}
      <div className="bg-base-100/80 border border-base-300 rounded-xl p-6 shadow-sm mb-10">
        <h2 className="font-heading text-xl mb-4">Create New Shelf</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            value={newShelfName}
            onChange={(e) => setNewShelfName(e.target.value)}
            placeholder="Shelf name… (e.g. Nightstand Reads)"
            className="flex-1 px-4 py-2 rounded-full bg-[#F5F1EB] border border-[#C7A269]/40 focus:ring-2 focus:ring-[#C7A269]/40 outline-none"
          />
          <button
            onClick={handleAddShelf}
            className="px-6 py-2 rounded-full bg-[#5A4632] text-base-100 text-sm font-medium hover:bg-[#C7A269] hover:text-neutral transition"
          >
            Add Shelf
          </button>
        </div>
      </div>

      {/* Unassigned Books (from Favorites) */}
      <section className="mb-12">
        <h2 className="font-heading text-xl mb-4 flex items-center gap-2">
          Unsorted Books
          <span className="text-xs font-body text-neutral/60">
            (Saved, but not on a shelf yet)
          </span>
        </h2>

        {favorites.length === 0 ? (
          <p className="text-neutral/60 text-sm">
            You haven't saved any books yet. Visit the{" "}
            <span
              className="text-[#A07C43] cursor-pointer hover:underline"
              onClick={() => router.push("/library")}
            >
              Library
            </span>{" "}
            to start exploring.
          </p>
        ) : unshelvedBooks.length === 0 ? (
          <p className="text-neutral/60 text-sm">
            All your saved books are currently on a shelf. ✨
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {unshelvedBooks.map((book) => {
              const info = book.volumeInfo || {};
              const image =
                info.imageLinks?.thumbnail ||
                info.imageLinks?.smallThumbnail ||
                "/placeholder-book.jpg";

              const selectedShelfId =
                selection[book.id] || (shelfList[0] && shelfList[0].id);

              return (
                <div
                  key={book.id}
                  className="border border-base-300 bg-base-100 rounded-lg p-3 shadow-sm flex flex-col"
                >
                  <div className="relative w-full h-40 bg-[#F5F1EB] rounded-md overflow-hidden mb-3 flex items-center justify-center">
                    <Image
                      src={image}
                      alt={info.title || "Book cover"}
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                  <p className="font-heading text-sm text-neutral line-clamp-2">
                    {info.title}
                  </p>
                  <p className="text-xs text-neutral/60 mt-1 line-clamp-1">
                    {info.authors?.join(", ") || "Unknown Author"}
                  </p>

                  {shelfList.length === 0 ? (
                    <p className="mt-3 text-xs text-red-500/80">
                      Create a shelf above to start sorting.
                    </p>
                  ) : (
                    <div className="mt-3 flex flex-col gap-2">
                      <select
                        value={selectedShelfId || ""}
                        onChange={(e) =>
                          setSelection((prev) => ({
                            ...prev,
                            [book.id]: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 rounded-full bg-[#F5F1EB] border border-[#C7A269]/40 text-xs focus:ring-2 focus:ring-[#C7A269]/40"
                      >
                        {shelfList.map((shelf) => (
                          <option key={shelf.id} value={shelf.id}>
                            {shelf.name}
                          </option>
                        ))}
                      </select>

                      <button
                        onClick={() =>
                          addBookToShelf(
                            book.id,
                            selectedShelfId || (shelfList[0] && shelfList[0].id)
                          )
                        }
                        className="w-full px-3 py-2 rounded-full bg-[#6F7C56] text-base-100 text-xs font-medium hover:bg-[#C7A269] hover:text-neutral transition"
                      >
                        Add to Shelf
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Shelves overview */}
      <section>
        <h2 className="font-heading text-xl mb-4">Your Shelves</h2>

        {Object.keys(shelves).length === 0 ? (
          <p className="text-center text-neutral/60 text-sm">
            No shelves yet. Create one to start curating your own stacks.
          </p>
        ) : (
          <div className="space-y-5">
            {Object.values(shelves).map((shelf) => {
              const shelfBooks = (shelf.books || [])
                .map((id) => favorites.find((b) => b.id === id))
                .filter(Boolean);

              return (
                <div
                  key={shelf.id}
                  className="border border-base-300 bg-base-100 rounded-xl p-5 shadow-sm"
                >
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <p className="font-heading text-lg text-primary">
                        {shelf.name}
                      </p>
                      <p className="text-xs text-neutral/60">
                        {shelfBooks.length} book
                        {shelfBooks.length === 1 ? "" : "s"}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditShelfId(shelf.id);
                          setEditShelfName(shelf.name);
                        }}
                        className="px-3 py-1 rounded-full border border-[#A07C43] text-xs hover:bg-[#C7A269] hover:text-base-100 transition"
                      >
                        Rename
                      </button>
                      <button
                        onClick={() => handleDeleteShelf(shelf.id)}
                        className="px-3 py-1 rounded-full bg-red-500 text-xs text-base-100 hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  {shelfBooks.length === 0 ? (
                    <p className="text-xs text-neutral/60">
                      No books on this shelf yet. Add some from your unsorted
                      list above.
                    </p>
                  ) : (
                    <div className="grid sm:grid-cols-3 md:grid-cols-4 gap-3 mt-3">
                      {shelfBooks.map((book) => {
                        const info = book.volumeInfo || {};
                        const image =
                          info.imageLinks?.thumbnail ||
                          info.imageLinks?.smallThumbnail ||
                          "/placeholder-book.jpg";

                        return (
                          <div
                            key={book.id}
                            className="border border-base-300 rounded-lg p-2 bg-[#F5F1EB]/60 flex flex-col"
                          >
                            <div className="relative w-full h-32 rounded-md overflow-hidden mb-2 bg-[#F5F1EB] flex items-center justify-center">
                              <Image
                                src={image}
                                alt={info.title || "Book cover"}
                                fill
                                className="object-contain"
                                unoptimized
                              />
                            </div>
                            <p className="text-[11px] font-medium line-clamp-2 text-neutral">
                              {info.title}
                            </p>
                            <button
                              onClick={() =>
                                removeBookFromShelf(book.id, shelf.id)
                              }
                              className="mt-2 w-full text-[11px] py-1 rounded-full border border-[#A07C43]/70 text-[#5A4632] hover:bg-[#C7A269] hover:text-base-100 transition"
                            >
                              Remove from Shelf
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Rename Modal */}
      {editShelfId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[80]">
          <div className="bg-base-100 rounded-xl shadow-lg p-6 w-[320px]">
            <h2 className="font-heading text-xl mb-3">Rename Shelf</h2>
            <input
              value={editShelfName}
              onChange={(e) => setEditShelfName(e.target.value)}
              className="w-full px-4 py-2 rounded-full border border-[#C7A269]/40 bg-[#F5F1EB]"
            />
            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => {
                  setEditShelfId(null);
                  setEditShelfName("");
                }}
                className="px-4 py-2 text-sm rounded-full border hover:bg-neutral/10"
              >
                Cancel
              </button>
              <button
                onClick={handleRenameShelf}
                className="px-4 py-2 text-sm rounded-full bg-[#6F7C56] text-base-100 hover:bg-[#C7A269] hover:text-neutral transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
