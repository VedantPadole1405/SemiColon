"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type Product = {
  name: string;
  price: number;
  image?: string;
};

export default function AssistantPage() {
  const [query, setQuery] = useState("");
  const [price, setPrice] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [goals, setGoals] = useState<Product[]>([]);
  const [selectedGoal, setSelectedGoal] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);

  // 🔥 LOAD DATA
  useEffect(() => {
    const storedGoals = sessionStorage.getItem("goals");
    const storedSelected = sessionStorage.getItem("selectedGoal");

    if (storedGoals) setGoals(JSON.parse(storedGoals));
    if (storedSelected) setSelectedGoal(JSON.parse(storedSelected));
  }, []);

  // 🔍 SEARCH
  const handleSearch = async () => {
    if (!query) return;

    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:8000/search-products?q=${query}`
      );
      const data = await res.json();

      const formatted = data.products
        .filter((p: any) => p.price) // ✅ remove invalid ones
        .map((p: any) => ({
          name: p.title,
          price: p.price,
          image: p.thumbnail,
        }));

      setResults(formatted);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  // ➕ ADD / SELECT (FIXED STATE)
  const selectGoal = (product: Product) => {
    setGoals((prev) => {
      const updated = [...prev, product];

      sessionStorage.setItem("goals", JSON.stringify(updated));
      sessionStorage.setItem("selectedGoal", JSON.stringify(product));

      return updated;
    });

    setSelectedGoal(product);
  };

  // ➕ MANUAL ADD
  const addCustom = () => {
    if (!query || !price) return;

    const custom: Product = {
      name: query,
      price: parseFloat(price),
    };

    selectGoal(custom);

    setQuery("");
    setPrice("");
  };

  // ❌ REMOVE
  const removeGoal = (index: number) => {
    setGoals((prev) => {
      const updated = prev.filter((_, i) => i !== index);

      sessionStorage.setItem("goals", JSON.stringify(updated));

      return updated;
    });

    // reset selected if removed
    if (selectedGoal && goals[index]?.name === selectedGoal.name) {
      setSelectedGoal(null);
      sessionStorage.removeItem("selectedGoal");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f7f5f0] to-[#dfe9e3] px-6 py-8">

      {/* NAVBAR */}
      <div className="w-full max-w-5xl mx-auto mb-6 flex justify-between items-center bg-white/70 backdrop-blur-xl border rounded-2xl px-6 py-3">
        <div className="font-semibold text-black text-lg">
          💰 Personal CFO
        </div>

       <div className="flex items-center gap-8 text-gray-700 font-medium">
          {[
            { label: "Dashboard", path: "/dashboard/professional" },
            { label: "Learn", path: "/learn" },
            { label: "AI Assistant", path: "/assistant" },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => (window.location.href = item.path)}
              className="relative group transition duration-200 hover:text-emerald-700 hover:scale-105"
            >
              {item.label}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-emerald-600 transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}
        </div>
      </div>

      <div className="w-full max-w-5xl mx-auto">

        {/* MAIN CARD */}
        <div className="border rounded-[36px] p-6 bg-white/60 backdrop-blur-xl shadow">

          <h1 className="text-2xl font-serif text-black text-center">
            🎯 Set Your Goals
          </h1>

          {/* INPUTS */}
          <div className="flex gap-3 mt-6">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Item (e.g. iPhone)"
              className="flex-1 p-3 rounded-xl border text-black"
            />

            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              type="number"
              className="w-32 p-3 rounded-xl border text-black"
            />

            <button
              onClick={handleSearch}
              className="bg-green-700 text-white px-4 rounded-xl"
            >
              Search
            </button>

            <button
              onClick={addCustom}
              className="bg-black text-white px-4 rounded-xl"
            >
              Add
            </button>
          </div>

          {loading && <p className="mt-4 text-gray-600">Searching...</p>}

          {/* RESULTS */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            {results.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl p-4 shadow"
              >
                {item.image && (
                  <img
                    src={item.image}
                    className="w-full h-28 object-contain mb-2"
                  />
                )}

                <p className="text-sm text-black">{item.name}</p>
                <p className="text-green-700 font-bold">
                  ${item.price}
                </p>

                <button
                  onClick={() => selectGoal(item)}
                  className="mt-2 w-full bg-green-700 text-white py-1 rounded"
                >
                  Add
                </button>
              </motion.div>
            ))}
          </div>

          {/* GOALS */}
          {goals.length > 0 && (
            <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
              {goals.map((g, i) => (
                <div
                  key={i}
                  className="bg-white p-4 rounded-xl shadow relative"
                >
                  <button
                    onClick={() => removeGoal(i)}
                    className="absolute top-2 right-2 text-red-500"
                  >
                    ✕
                  </button>

                  <p className="text-black">{g.name}</p>
                  <p className="text-green-700 font-bold">
                    ${g.price}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* AI */}
          <div className="mt-8 bg-white rounded-2xl p-5 shadow">
            <h2 className="text-black font-semibold mb-2">
              🤖 AI Financial Assistant
            </h2>

            <p className="text-sm text-gray-700">
              {goals.length > 0
                ? `You have ${goals.length} goals. Optimize spending to reach them faster.`
                : "Add goals to get insights."}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}