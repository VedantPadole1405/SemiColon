"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
} from "recharts";

// ✅ CARD
function Card({ title, value }: { title: string; value: number }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -4 }}
      className="bg-white border rounded-[20px] p-6 shadow-md cursor-pointer"
    >
      <h2 className="text-gray-700 text-sm font-medium">{title}</h2>
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
      className="bg-white border rounded-[20px] p-6 shadow-md"
    >
      <h2 className="font-semibold text-emerald-900 mb-3 text-lg">
        {title}
      </h2>
      {children}
    </motion.div>
  );
}

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const [goalAmount, setGoalAmount] = useState(1000);
  const [goalName, setGoalName] = useState("Default Goal");

  useEffect(() => {
    const stored = sessionStorage.getItem("result");
    if (stored) setData(JSON.parse(stored));

    const storedGoal = sessionStorage.getItem("selectedGoal");
    if (storedGoal) {
      const parsed = JSON.parse(storedGoal);
      setGoalAmount(parsed.price || 1000);
      setGoalName(parsed.name || "Goal");
    }
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
      txn.description?.replace("subscription", "").trim() || "Transaction"
    );
  });

  const income = data.summary?.total_income || 0;
  const expenses = data.summary?.total_spent || 0;
  const balance = income - expenses;

  let runningBalance = 0;

  const chartData = transactions.map((txn: any) => {
    runningBalance += txn.amount;

    const date = new Date(txn.date.split("/").reverse().join("-"));

    return {
      date: `${date.getDate()}/${date.getMonth() + 1}`,
      balance: runningBalance,
      monthsLeft: Math.max(
        Math.ceil((goalAmount - runningBalance) / (income - expenses || 1)),
        0
      ),
    };
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f7f5f0] to-[#dfe9e3] flex flex-col items-center px-6">

      {/* 🔥 NAVBAR FIXED */}
      <div className="w-full max-w-6xl mt-6 mb-4 flex justify-between items-center bg-white border rounded-2xl px-6 py-3 shadow-sm">
        
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-600 text-white flex items-center justify-center rounded-full">
            $
          </div>
          <span className="text-emerald-900 font-semibold">
            Personal CFO
          </span>
        </div>

        <div className="flex items-center gap-8 text-gray-800 font-medium">
          {[
            { label: "Dashboard", path: "/dashboard/professional" },
            { label: "Learn", path: "/learn" }, // 🔥 FIXED
            { label: "AI Assistant", path: "/assistant?type=professional" }, // 🔥 FIXED
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => (window.location.href = item.path)}
              className="relative group transition duration-200 hover:text-emerald-700"
            >
              {item.label}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-emerald-600 transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}
        </div>
      </div>

      <div className="w-full max-w-6xl">

        {/* CARDS */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <Card title="Income" value={income} />
          <Card title="Expenses" value={expenses} />
          <Card title="Balance" value={balance} />
          <Card title="Goal" value={goalAmount} />
        </div>

        {/* 🔥 RECOMMENDATIONS + GRAPH */}
        <div className="grid grid-cols-2 gap-4 mb-6">

          {/* POLICIES */}
          <GlassCard title="Top Recommendations 🛡️">

            <div className="space-y-3 max-h-[300px] overflow-y-auto">

              {(data.recommendations || []).map((rec: any, index: number) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="p-4 rounded-xl border bg-white shadow-sm"
                >
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-emerald-800">
                      {rec.name}
                    </p>

                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        rec.priority === "high"
                          ? "bg-red-100 text-red-600"
                          : rec.priority === "medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {rec.priority}
                    </span>
                  </div>

                  <p className="text-sm text-gray-700 mt-1">
                    {rec.reason}
                  </p>

                  {(rec.products || []).map((p: any, i: number) => (
                    <div
                      key={i}
                      className="flex justify-between text-sm mt-2 bg-gray-50 p-2 rounded"
                    >
                      <span>{p.name}</span>
                      <span>${p.premium}</span>
                    </div>
                  ))}
                </motion.div>
              ))}

            </div>

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

            <p className="mt-3 text-sm text-gray-800">
              🎯 Goal: {goalName} (${goalAmount}) | Months left:{" "}
              {chartData[chartData.length - 1]?.monthsLeft || 0}
            </p>
          </GlassCard>

        </div>

        {/* CATEGORY */}
        <GlassCard title="Category Breakdown 💳">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

            {Object.entries(categories)
              .filter(([_, v]) => v > 0)
              .map(([key, value]) => (
                <motion.div
                  key={key}
                  whileHover={{ scale: 1.05 }}
                  onHoverStart={() => setHoveredCategory(key)}
                  onHoverEnd={() => setHoveredCategory(null)}
                  className="relative bg-emerald-50 border rounded-2xl p-4 shadow-sm cursor-pointer"
                >
                  <p className="text-sm text-gray-700 capitalize">{key}</p>
                  <p className="text-xl font-semibold text-emerald-800">
                    ${value.toFixed(2)}
                  </p>

                  {hoveredCategory === key &&
                    categoryTransactions[key]?.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute left-1/2 -translate-x-1/2 -top-2 -translate-y-full 
                        w-56 bg-white border rounded-xl shadow-xl p-3 z-50"
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