"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ProfilePage() {
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    role: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("User Profile:", form);

    // 👉 Later: send to backend / DB

    router.push("/onboarding/connect");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f7f5f0] to-[#dfe9e3] flex items-center justify-center px-6">

      <div className="relative w-full max-w-md h-screen">

        {/* 🌊 Background waves */}
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
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* 🧊 Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative border border-white/40 rounded-[36px] p-8 bg-white/60 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] flex flex-col justify-between h-full"
        >

          {/* Logo */}
          <div className="mt-4 flex justify-center">
            <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold shadow-md">
              $
            </div>
          </div>

          {/* Title */}
          <div className="text-center mt-4">
            <h1 className="text-3xl font-serif text-green-900">
              Your Profile
            </h1>
            <p className="text-gray-600 text-sm mt-2">
              Help us personalize your financial insights
            </p>
          </div>

          {/* 🧾 FORM */}
          <div className="mt-6 space-y-4">

            <input
  type="text"
  name="firstName"
  placeholder="First Name"
  value={form.firstName}
  onChange={handleChange}
  className="w-full p-3 rounded-xl border border-gray-300 
             text-black placeholder-gray-500
             focus:outline-none focus:ring-2 focus:ring-green-500"
/>

<input
  type="text"
  name="lastName"
  placeholder="Last Name"
  value={form.lastName}
  onChange={handleChange}
  className="w-full p-3 rounded-xl border border-gray-300 
             text-black placeholder-gray-500
             focus:outline-none focus:ring-2 focus:ring-green-500"
/>

    <input
      type="date"
      name="dob"
      value={form.dob}
      onChange={handleChange}
      className="w-full p-3 rounded-xl border border-gray-300 
                text-black
                focus:outline-none focus:ring-2 focus:ring-green-500"
    />

    <select
      name="role"
      value={form.role}
      onChange={handleChange}
      className="w-full p-3 rounded-xl border border-gray-300 
                text-black
                focus:outline-none focus:ring-2 focus:ring-green-500"
    >
      <option value="">Select your profile</option>
      <option value="student">Student</option>
      <option value="professional">Professional</option>
      <option value="retired">Retired</option>
    </select>
          </div>

          {/* CTA */}
          <div className="mt-6">
            <motion.button
              whileTap={{ scale: 0.96 }}
              whileHover={{ scale: 1.01 }}
              onClick={handleSubmit}
              className="w-full bg-green-700 text-white py-4 rounded-2xl text-lg font-semibold shadow-md hover:bg-green-800 transition"
            >
              Continue
            </motion.button>

            <p className="text-center text-xs text-gray-500 mt-3">
              Secure · Private · Personalized
            </p>
          </div>

        </motion.div>
      </div>
    </div>
  );
}