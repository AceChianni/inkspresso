// /src/pages/api/herbal-ai.js
export default async function handler(req, res) {
  const { messages } = req.body;

  try {
    const completion = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are an herbal apothecary spirit who teaches about herbs, tea blends, plant energetics, and metaphysical uses. Your tone is warm, mystical, poetic, and grounded. Give both physical and spiritual information, and warn gently about contraindications.",
          },
          ...messages,
        ],
      }),
    }).then((r) => r.json());

    const reply = completion.choices?.[0]?.message?.content || "I'm here, dear one.";

    res.status(200).json({ reply });
  } catch (err) {
    res.status(500).json({ reply: "The spirits are quiet... please try again." });
  }
}
