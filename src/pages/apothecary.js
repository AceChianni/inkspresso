// /src/pages/apothecary.js
import { useState } from "react";

export default function ApothecaryAI() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Welcome, wanderer. Which herb calls to your spirit today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/herbal-ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [...messages, userMessage] })
    });

    const data = await res.json();
    setMessages([...messages, userMessage, { role: "assistant", content: data.reply }]);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F5F1EB] px-6 py-20 text-neutral flex flex-col items-center">
      <h1 className="font-heading text-4xl text-primary mb-8">Ask the Apothecary</h1>

      <div className="w-full max-w-2xl bg-white/80 backdrop-blur border border-[#C7A269]/40 rounded-2xl shadow-lg p-6 flex flex-col gap-4 overflow-y-auto max-h-[70vh]">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-3 rounded-xl shadow-sm max-w-[85%] animate-[fadeIn_0.5s_ease-out] ${
              m.role === "user"
                ? "bg-[#C7A269] text-base-100 self-end"
                : "bg-[#F5F1EB] text-neutral self-start border border-[#C7A269]/30"
            }`}
          >
            {m.content}
          </div>
        ))}

        {loading && (
          <div className="self-start text-neutral/70 italic animate-pulse">
            brewing your answer...
          </div>
        )}
      </div>

      {/* Input Box */}
      <div className="fixed bottom-6 w-full max-w-2xl flex gap-3">
        <input
          type="text"
          placeholder="Ask about an herb, its magic, or its healing..."
          className="flex-grow px-4 py-3 rounded-full border border-[#C7A269]/40 bg-white/70 backdrop-blur focus:ring-2 focus:ring-[#C7A269]/40 outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          onClick={sendMessage}
          className="px-6 py-3 bg-[#5A4632] text-base-100 rounded-full hover:bg-[#C7A269] hover:text-neutral transition font-medium shadow-md"
        >
          Send
        </button>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(5px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
