// /src/components/SolunaSourceWidget.js
import { useState, useRef, useEffect } from "react";

const SEED_MESSAGE = {
  from: "bot",
  text: "Welcome to Soluna Source 🌙✨ Ask me about herbs, their physical + metaphysical uses, origins, rituals, or divine pairings.",
};

const QUICK_PROMPTS = [
  "Herbs for Anxiety",
  "Herbs for Protection",
  "Herbs for Dreamwork",
  "Best Daily Herbs (Women)",
  "Best Daily Herbs (Men)",
];

const CATEGORIES = ["Calm", "Protection", "Love", "Clarity", "Growth"];

export default function SolunaSourceWidget() {
  const [isOpen, setIsOpen] = useState(true);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([SEED_MESSAGE]);
  const [ambientOn, setAmbientOn] = useState(false);

  const scrollRef = useRef(null);
  const scrollPosition = useRef(0);

  const handleToggle = () => setIsOpen(prev => !prev);

  // preserve scroll location
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollPosition.current;
    }
  }, [isOpen]);

  const handleScroll = () => {
    if (scrollRef.current) {
      scrollPosition.current = scrollRef.current.scrollTop;
    }
  };

  const pushMessage = (text) => {
    const userMsg = { from: "user", text };
    const botMsg = {
      from: "bot",
      text:
        "🌿 Soluna will soon respond with detailed herbal wisdom, emotional alignment, safety notes and ritual guidance.",
    };
    setMessages(prev => [...prev, userMsg, botMsg]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    pushMessage(input);
    setInput("");
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={handleToggle}
          className="fixed bottom-4 right-4 z-[60] px-4 py-2 rounded-full bg-[#cf8421b7] text-base-100 text-sm font-medium shadow-lg hover:bg-[#C7A269] flex items-center gap-2 transition-all"
        >
          🌙 Soluna Source
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-4 right-4 z-[60] w-[340px] md:w-[380px] rounded-2xl bg-[#F5F1EB]/95 border border-[#C7A269]/60 shadow-2xl overflow-hidden soluna-mist-panel">

          {/* Header */}
          <div className="px-4 py-3 flex items-center justify-between bg-gradient-to-r from-[#a66a2b] via-[#cfa45e] to-[#C7A269] text-base-100">
            <div>
              <p className="font-heading text-sm">Soluna Source</p>
              <p className="text-[11px] opacity-80">Cozy herbal oracle ✨</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setAmbientOn(!ambientOn)}
                className="text-xs px-2 py-1 rounded-full bg-black/20 hover:bg-black/40"
              >
                {ambientOn ? "🔊" : "🌙"}
              </button>
              <button onClick={handleToggle} className="text-sm">✕</button>
            </div>
          </div>

          {/* Herbal Categories */}
          <div className="flex justify-center gap-2 px-3 py-2 text-[10px] bg-[#f3efe5]">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => pushMessage(`Herbs for ${cat}`)}
                className="px-2 py-1 rounded-full border border-[#C7A269]/40 hover:bg-[#C7A269]/30 transition"
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="px-4 py-3 max-h-72 overflow-y-auto space-y-3"
          >
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`rounded-2xl px-3 py-2 text-xs max-w-[85%] ${
                  msg.from === "user"
                    ? "bg-[#9e5813] text-white"
                    : "bg-white border border-[#C7A269]/40"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick buttons */}
          <div className="flex flex-wrap gap-2 px-3 py-2 bg-[#efe9db]">
            {QUICK_PROMPTS.map((p) => (
              <button
                key={p}
                onClick={() => pushMessage(p)}
                className="text-[10px] px-2 py-1 rounded-full border border-[#C7A269]/40 hover:bg-[#C7A269]/30"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="px-3 py-2 border-t">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask the oracle..."
                className="flex-1 text-xs px-3 py-2 rounded-full border border-[#C7A269]/40"
              />
              <button className="px-3 py-2 bg-[#ce7822] rounded-full text-white text-xs">
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
