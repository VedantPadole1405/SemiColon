"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

import AIResponseCard from "../../components/AIResponseCard";

// ✅ CARD COMPONENT
function Card({ title, value }: { title: string; value: number }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -4 }}
      className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-[24px] p-6 shadow cursor-pointer"
    >
      <h2 className="text-gray-600 text-sm">{title}</h2>
      <p className="text-3xl font-bold text-emerald-700 mt-2">
        ${value.toFixed(2)}
      </p>
    </motion.div>
  );
}

// ✅ GLASS CARD
function GlassCard({ title, children }: any) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-[24px] p-6 shadow"
    >
      <h2 className="font-semibold text-emerald-900 mb-2">{title}</h2>
      {children}
    </motion.div>
  );
}

const COLORS = ["#10b981", "#14b8a6", "#34d399", "#6ee7b7", "#99f6e4"];

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  // 🔥 AI STATES
  const [aiResponse, setAIResponse] = useState<any>(null);
  const [aiLoading, setAILoading] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("result");
    if (stored) setData(JSON.parse(stored));
  }, []);

  if (!data) return <div className="p-10">Loading...</div>;

  const transactions = data.transactions || [];
  const categories: Record<string, number> =
    data.summary?.category_breakdown || {};

  const categoryTransactions: Record<string, string[]> = {};

  transactions.forEach((txn: any) => {
    if (!categoryTransactions[txn.category]) {
      categoryTransactions[txn.category] = [];
    }

    categoryTransactions[txn.category].push(
      txn.description.replace("subscription", "").trim()
    );
  });

  const income = data.summary?.total_income || 0;
  const expenses = data.summary?.total_spent || 0;
  const balance = income - expenses;

  const goalAmount = 1000;

  let runningBalance = 0;

  const chartData = transactions.map((txn: any) => {
    runningBalance += txn.amount;

    const date = new Date(txn.date.split("/").reverse().join("-"));

    return {
      date: `${date.getDate()}/${date.getMonth() + 1}`,
      balance: runningBalance,
      daysLeft: Math.max(
        Math.ceil((goalAmount - runningBalance) / (income - expenses || 1)),
        0
      ),
    };
  });

  // 🤖 AI CALL
  const askAI = async () => {
    setAILoading(true);

    try {
      const res = await fetch("http://localhost:8000/ask-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: "How can I achieve my goals faster?",
          user_type: "student",
          summary: data.summary,
          subscriptions: data.subscriptions || [],
          transactions: data.transactions || [],
        }),
      });

      const result = await res.json();

      // ✅ SAFE FIX
      setAIResponse(result?.data || null);
    } catch (err) {
      console.error(err);
    }

    setAILoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0fdf4] to-[#ecfeff] flex flex-col items-center px-6">

      {/* NAVBAR */}
      <div className="w-full max-w-6xl mt-6 mb-4 flex justify-between items-center bg-white/70 backdrop-blur-xl border rounded-2xl px-6 py-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-600 text-white flex items-center justify-center rounded-full">
            $
          </div>
          <span className="text-emerald-900 font-semibold">Personal CFO</span>
        </div>

        <div className="flex items-center gap-8 text-gray-700 font-medium">
          {[
            { label: "Dashboard", path: "/dashboard/professional" },
            { label: "Learn", path: "/learn" },
            { label: "Goal assistance", path: "/assistant" },
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

      <div className="w-full max-w-6xl">

        {/* TOP CARDS */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card title="Income" value={income} />
          <Card title="Expenses" value={expenses} />
          <Card title="Balance" value={balance} />
        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-2 gap-4 mb-6">

          {/* PIE */}
          <GlassCard title="Spending Breakdown">
            <PieChart width={300} height={300}>
              <Pie
                data={Object.entries(categories).map(([k, v]) => ({
                  name: k,
                  value: v,
                }))}
                dataKey="value"
                label
              >
                {Object.entries(categories).map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </GlassCard>

          {/* GRAPH */}
          <GlassCard title="Savings Journey 📈">
            <LineChart width={350} height={250} data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="balance"
                stroke="#10b981"
                strokeWidth={3}
              />
            </LineChart>

            <p className="mt-3 text-sm text-gray-700">
              🎯 Goal: ${goalAmount} | Month left:{" "}
              {chartData[chartData.length - 1]?.daysLeft || 0}
            </p>
          </GlassCard>
        </div>

        {/* CATEGORY BREAKDOWN */}
        <GlassCard title="Category Breakdown 💳">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 relative">
            {Object.entries(categories)
              .filter(([_, v]) => v > 0)
              .map(([key, value]) => (
                <motion.div
                  key={key}
                  whileHover={{ scale: 1.05 }}
                  onHoverStart={() => setHoveredCategory(key)}
                  onHoverEnd={() => setHoveredCategory(null)}
                  className="relative bg-emerald-50 border border-emerald-100 rounded-2xl p-4 shadow-sm cursor-pointer"
                >
                  <p className="text-sm text-gray-600 capitalize">{key}</p>
                  <p className="text-xl font-semibold text-emerald-800">
                    ${value.toFixed(2)}
                  </p>

                  {hoveredCategory === key &&
                    categoryTransactions[key]?.length > 0 && (
                      <div className="absolute left-1/2 -translate-x-1/2 -top-2 -translate-y-full w-56 bg-white border rounded-xl shadow-xl p-3 z-50">
                        {categoryTransactions[key].map((item, i) => (
                          <p key={i} className="text-sm">
                            • {item}
                          </p>
                        ))}
                      </div>
                    )}
                </motion.div>
              ))}
          </div>
        </GlassCard>

        {/* 🤖 AI SECTION */}
        <GlassCard title="🤖 AI Financial Insights">
          <button
            onClick={askAI}
            className="bg-emerald-600 text-white px-4 py-2 rounded-xl mb-4 hover:bg-emerald-700"
          >
            Get Smart Insights
          </button>

          {aiLoading && <p>Thinking...</p>}

          {aiResponse && <AIResponseCard data={aiResponse} />}
        </GlassCard>

      </div>
    </div>
  );
}