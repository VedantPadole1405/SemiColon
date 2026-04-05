"use client";

import { motion } from "framer-motion";

export default function AIResponseCard({ data }: any) {
  if (!data) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/90 backdrop-blur-xl border border-white/40 rounded-[24px] p-6 shadow space-y-5"
    >
      {/* INSIGHTS */}
      <div>
        <h3 className="text-sm text-gray-700 font-semibold mb-1">
          💡 Insights
        </h3>
        <p className="text-gray-900 font-medium">
          {data.insights || "No insights available"}
        </p>
      </div>

      {/* TIPS */}
      <div>
        <h3 className="text-sm text-gray-700 font-semibold mb-1">
          💸 Tips
        </h3>

        {data.tips?.length ? (
          <div className="space-y-2">
            {data.tips.map((tip: string, i: number) => (
              <div
                key={i}
                className="bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2 text-gray-800"
              >
                • {tip}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No tips available</p>
        )}
      </div>

      {/* STRATEGY */}
      <div>
        <h3 className="text-sm text-gray-700 font-semibold mb-1">
          🎯 Strategy
        </h3>
        <p className="text-gray-900">
          {data.strategy || "No strategy available"}
        </p>
      </div>

      {/* SAVINGS */}
      <div className="bg-gradient-to-r from-emerald-200 to-teal-200 rounded-2xl p-4 text-center">
        <p className="text-emerald-900 font-bold text-xl">
          {data.monthly_savings || "$0"}
        </p>
      </div>
    </motion.div>
  );
}