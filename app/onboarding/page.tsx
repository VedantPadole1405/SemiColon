"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f7f5f0] to-[#dfe9e3] flex items-center justify-center px-6">

      {/* 🌊 WRAPPER */}
      <div className="relative w-full max-w-md h-screen">

        {/* 🌊 SLOW, SUBTLE WAVES */}
        <motion.div
          className="absolute inset-0 rounded-[36px] blur-3xl opacity-30"
          animate={{
            background: [
              "radial-gradient(circle at 20% 30%, #4ade80 0%, transparent 60%)",
              "radial-gradient(circle at 80% 70%, #22c55e 0%, transparent 60%)",
              "radial-gradient(circle at 40% 60%, #16a34a 0%, transparent 60%)",
            ],
          }}
          transition={{
            duration: 18, // 🔥 MUCH slower
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* 🧊 MAIN CARD */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative border border-white/40 rounded-[36px] p-8 bg-white/60 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] flex flex-col justify-between h-full"
        >

          {/* 🔝 Logo */}
          <motion.div
            className="mt-4 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold shadow-md">
              $
            </div>
          </motion.div>

          {/* 🎯 Center Content */}
          <div className="text-center">
            <motion.h1
              className="text-4xl font-serif text-green-900 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Manage Money.
              <br />
              <span className="text-green-700 italic">Like a CFO.</span>
            </motion.h1>

            <motion.p
              className="text-gray-700 text-sm mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Connect your accounts and get AI-powered financial insights,
              risk analysis, and personalized recommendations.
            </motion.p>

            {/* Floating circles */}
            <div className="mt-10 flex justify-center gap-3 opacity-70">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity }} // slower
                className="w-16 h-16 bg-green-200 rounded-full blur-[2px]"
              />
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="w-20 h-20 bg-green-300 rounded-full blur-[1px]"
              />
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5.5, repeat: Infinity }}
                className="w-16 h-16 bg-green-100 rounded-full blur-[2px]"
              />
            </div>
          </div>

          {/* ⬇️ CTA */}
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <motion.button
              whileTap={{ scale: 0.96 }}
              whileHover={{ scale: 1.01 }}
              onClick={() => router.push("/onboarding/connect")}
              className="w-full bg-green-700 text-white py-4 rounded-2xl text-lg font-semibold shadow-md hover:bg-green-800 transition"
            >
              Get Started
            </motion.button>

            <p className="text-center text-xs text-gray-500 mt-3">
              Free to start · No prior knowledge needed.
            </p>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}