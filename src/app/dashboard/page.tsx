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

// ✅ CARD
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

  useEffect(() => {
    const stored = sessionStorage.getItem("result");
    if (stored) setData(JSON.parse(stored));
  }, []);

  if (!data) return <div className="p-10">Loading...</div>;

  const transactions = data.transactions || [];

  // ✅ TYPE FIX
  const categories: Record<string, number> =
    data.summary?.category_breakdown || {};

  // ✅ CATEGORY → TRANSACTIONS
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

  // 📈 ZIG-ZAG GRAPH
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

      {/* 🔥 MAIN WRAPPER FIX */}
      <div className="w-full max-w-6xl overflow-visible">

        {/* CARDS */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card title="Income" value={income} />
          <Card title="Expenses" value={expenses} />
          <Card title="Balance" value={balance} />
        </div>

        {/* PIE + GRAPH */}
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

        {/* CATEGORY */}
        <GlassCard title="Category Breakdown 💳">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 relative overflow-visible">
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

                  {/* 🔥 FIXED POPUP */}
                  {hoveredCategory === key &&
                    categoryTransactions[key]?.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute left-1/2 -translate-x-1/2 -top-2 -translate-y-full 
                        w-56 bg-white border border-gray-200 rounded-xl shadow-xl p-3 z-[9999]"
                      >
                        <p className="text-xs text-gray-500 mb-1">
                          Transactions:
                        </p>

                        {categoryTransactions[key].map((item, i) => (
                          <p key={i} className="text-sm text-gray-800">
                            • {item}
                          </p>
                        ))}
                      </motion.div>
                    )}
                </motion.div>
              ))}
          </div>
        </GlassCard>

      </div>
    </div>
  );
}