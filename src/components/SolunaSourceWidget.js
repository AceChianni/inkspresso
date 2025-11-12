// /src/components/SolunaSourceWidget.js
import { useState } from "react";

const SEED_MESSAGE = {
  from: "bot",
  text: "Hi, I'm Soluna Source 🌙✨ Ask me about herbs, their physical + metaphysical uses, origins, or pairing ideas.",
};

export default function SolunaSourceWidget() {
  const [isOpen, setIsOpen] = useState(true); // starts open on first load
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([SEED_MESSAGE]);

  const handleToggle = () => setIsOpen((prev) => !prev);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    // Add user message
    const userMsg = { from: "user", text: trimmed };

    // Simple placeholder bot reply for now
    const botMsg = {
      from: "bot",
      text:
        "This is a preview of Soluna Source. In the full version, I'll give you detailed herbal insights, rituals, and safety notes just for you 🌿",
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  return (
    <>
      {/* Minimized pill */}
      {!isOpen && (
        <button
          onClick={handleToggle}
          className="fixed bottom-4 right-4 z-[60] px-4 py-2 rounded-full bg-[#5A4632] text-base-100 text-sm font-medium shadow-lg hover:bg-[#C7A269] hover:text-neutral flex items-center gap-2 transition-all"
        >
          <span className="text-lg">☕</span>
          <span>Soluna Source</span>
        </button>
      )}

      {/* Open chat panel */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 z-[60] w-[320px] md:w-[360px] rounded-2xl bg-[#F5F1EB]/95 border border-[#C7A269]/60 shadow-2xl overflow-hidden soluna-mist-panel">
          {/* Header */}
          <div className="relative px-4 py-3 flex items-center justify-between bg-gradient-to-r from-[#5A4632] via-[#7A5A3A] to-[#C7A269] text-base-100">
            <div className="flex items-center gap-2">
              <span className="text-lg">🌙</span>
              <div className="text-left">
                <p className="font-heading text-sm tracking-wide">
                  Soluna Source
                </p>
                <p className="text-[11px] opacity-80 font-body">
                  Herbal wisdom & metaphysical notes
                </p>
              </div>
            </div>
            <button
              onClick={handleToggle}
              className="w-7 h-7 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/30 text-xs"
              aria-label="Minimize Soluna Source"
            >
              ⤵
            </button>

            {/* floating mist orbs */}
            <div className="pointer-events-none">
              <span className="soluna-orb soluna-orb-1" />
              <span className="soluna-orb soluna-orb-2" />
            </div>
          </div>

          {/* Messages */}
          <div className="px-4 py-3 max-h-64 overflow-y-auto space-y-3 bg-gradient-to-t from-[#E8E3DA] via-[#F5F1EB] to-[#F8F4EC]">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.from === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`rounded-2xl px-3 py-2 max-w-[85%] text-xs leading-snug shadow-sm ${
                    msg.from === "user"
                      ? "bg-[#9e5813] text-base-100 rounded-br-sm"
                      : "bg-white/90 text-[#3A2E23] border border-[#C7A269]/40 rounded-bl-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="border-t border-[#ce7822]/40 bg-[#F5F1EB]/90 px-3 py-2"
          >
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about an herb or blend..."
                className="flex-1 text-xs px-3 py-2 rounded-full bg-[#FDF8EE] border border-[#C7A269]/40 focus:outline-none focus:ring-2 focus:ring-[#C7A269]/40 focus:border-[#C7A269]/70 placeholder:text-neutral/50"
              />
              <button
                type="submit"
                className="px-3 py-2 rounded-full bg-[#ce7822] text-base-100 text-xs font-medium hover:bg-[#C7A269] hover:text-neutral shadow-sm transition-all"
              >
                Send
              </button>
            </div>
            <p className="mt-1 text-[10px] text-neutral/60 text-center">
              Future: powered by herbal AI for Soluna Healing 🌿
            </p>
          </form>
        </div>
      )}

      {/* Local styles for mist / orbs */}
      <style jsx>{`
        .soluna-mist-panel {
          animation: solunaMistIn 0.9s ease-out;
        }

        @keyframes solunaMistIn {
          0% {
            opacity: 0;
            transform: translateY(10px) scale(0.98);
            filter: blur(6px);
          }
          60% {
            opacity: 1;
            transform: translateY(-2px) scale(1);
            filter: blur(0);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .soluna-orb {
          position: absolute;
          border-radius: 9999px;
          background: radial-gradient(
            circle at 30% 30%,
            rgba(255, 255, 255, 0.9),
            rgba(255, 255, 255, 0)
          );
          opacity: 0.5;
          filter: blur(2px);
          pointer-events: none;
        }

        .soluna-orb-1 {
          width: 70px;
          height: 70px;
          top: -25px;
          right: 15px;
          animation: solunaOrbFloat 6s ease-in-out infinite;
        }

        .soluna-orb-2 {
          width: 40px;
          height: 40px;
          top: 5px;
          right: 70px;
          animation: solunaOrbFloat 8s ease-in-out infinite;
        }

        @keyframes solunaOrbFloat {
          0% {
            transform: translateY(0);
            opacity: 0.5;
          }
          50% {
            transform: translateY(-6px);
            opacity: 0.9;
          }
          100% {
            transform: translateY(0);
            opacity: 0.5;
          }
        }
      `}</style>
    </>
  );
}
