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
    file: null as File | null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setForm({ ...form, file: e.target.files[0] });
    }
  };

const handleSubmit = async () => {
  if (loading) return;

  if (
    !form.firstName ||
    !form.lastName ||
    !form.dob ||
    !form.role ||
    !form.file
  ) {
    alert("Please fill all fields and upload your bank statement");
    return;
  }

  try {
    setLoading(true);

    const formData = new FormData();
    formData.append("file", form.file);

    const res = await fetch("http://127.0.0.1:8000/upload", {
      method: "POST",
      headers: {
        "user-type": form.role, // 🔥 THIS FIXES EVERYTHING
      },
      body: formData,
    });

    const result = await res.json();

    console.log("STATUS:", res.status);
    console.log("RESULT:", result);

    if (!res.ok) {
      alert("Upload failed. Check console.");
      return;
    }

    sessionStorage.setItem("result", JSON.stringify(result));
    sessionStorage.setItem("role", form.role);

    router.push("/dashboard");

  } catch (error) {
    console.error(error);
    alert("Network error. Please try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f7f5f0] to-[#dfe9e3] flex items-center justify-center px-6">

      <div className="relative w-full max-w-md h-screen">

        {/* 🌊 Background */}
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
          className="relative border border-white/40 rounded-[36px] p-8 bg-white/80 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] flex flex-col justify-between h-full text-black"
        >

          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-serif text-black">
              Your Profile
            </h1>
            <p className="text-gray-700 text-sm mt-2">
              Help us personalize your financial insights
            </p>
          </div>

          {/* FORM */}
          <div className="mt-6 space-y-4">

            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-gray-300 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-gray-300 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <input
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select your profile</option>
              <option value="student">Student</option>
              <option value="professional">Professional</option>
            </select>

            {/* 📄 File Upload */}
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full p-3 rounded-xl border border-gray-300 text-black bg-white cursor-pointer"
            />
          </div>

          {/* BUTTON */}
          <div className="mt-6">
            <motion.button
              whileTap={{ scale: 0.96 }}
              whileHover={{ scale: 1.01 }}
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-green-700 text-white py-4 rounded-2xl text-lg font-semibold shadow-md hover:bg-green-800 transition disabled:opacity-50"
            >
              {loading ? "Analyzing your finances..." : "Login using Auth0"}
            </motion.button>
          </div>

        </motion.div>
      </div>
    </div>
  );
}