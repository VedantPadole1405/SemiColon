"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import AIResponseCard from "../../components/AIResponseCard";

export default function LearnPage() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // 🔥 AUTO SCROLL
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const askAI = async () => {
    if (!question.trim() || loading) return;

    const userMessage = { role: "user", text: question };

    setMessages((prev) => [...prev, userMessage]);
    setQuestion("");
    setLoading(true);

    try {
      const res = await fetch(
        "http://localhost:8000/ask-ai",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question,
            user_type: "student",
          }),
        }
      );

      if (!res.ok) throw new Error("API failed");

      const data = await res.json();

      const aiMessage = {
        role: "ai",
        data: data.data,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          data: {
            insights: "⚠️ Something went wrong.",
            tips: ["Try again in a moment"],
            strategy: "Check your backend connection.",
            monthly_savings: "—",
          },
        },
      ]);
    }

    setLoading(false);
  };

  // 🔥 ENTER KEY SUPPORT
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      askAI();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0fdf4] to-[#ecfeff] flex flex-col items-center px-6">

      {/* 🔥 NAVBAR */}
      <div className="w-full max-w-5xl mt-6 mb-4 flex justify-between items-center bg-white/70 backdrop-blur-xl border rounded-2xl px-6 py-3 shadow">
        <span className="text-emerald-900 font-semibold text-lg">
          🎓 Learn with AI
        </span>

        <button
          onClick={() => (window.location.href = "/dashboard")}
          className="text-sm text-gray-600 hover:text-emerald-700"
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* 🔥 CHAT WINDOW */}
      <div className="w-full max-w-5xl bg-white/80 backdrop-blur-xl border border-white/40 rounded-[24px] shadow p-6 flex flex-col h-[70vh]">

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">

          {messages.map((msg, index) =>
            msg.role === "user" ? (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex justify-end"
              >
                <div className="bg-emerald-600 text-white px-4 py-2 rounded-2xl max-w-md shadow">
                  {msg.text}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex justify-start"
              >
                <div className="max-w-xl w-full">
                  <AIResponseCard data={msg.data} />
                </div>
              </motion.div>
            )
          )}

          {/* 🔥 LOADING STATE */}
          {loading && (
            <div className="text-gray-500 animate-pulse">
              🤖 Thinking...
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* INPUT */}
        <div className="mt-4 flex gap-3">
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything about saving, investing, spending..."
            className="flex-1 border border-gray-300 rounded-xl px-4 py-3 outline-none text-black"
          />

          <button
            onClick={askAI}
            disabled={loading}
            className={`px-6 py-3 rounded-xl text-white transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-emerald-600 hover:bg-emerald-700"
            }`}
          >
            {loading ? "..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}