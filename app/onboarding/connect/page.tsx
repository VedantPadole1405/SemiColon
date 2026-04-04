"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  { id: "savings", title: "Connect your savings account", required: true },
  { id: "checking", title: "Connect your checking account", required: true },
  { id: "credit", title: "Connect your credit cards", required: false },
  { id: "mortgage", title: "Connect your mortgage", required: false },
  { id: "statements", title: "Upload bank statements", required: false },
];

export default function OnboardingFlow() {
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [connected, setConnected] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const current = steps[step];
  const isConnected = connected[current.id];

  const handleConnect = () => {
    setLoading(true);
    setTimeout(() => {
      setConnected((prev) => ({ ...prev, [current.id]: true }));
      setLoading(false);
    }, 1200);
  };

  const handleDisconnect = () => {
    setConnected((prev) => ({ ...prev, [current.id]: false }));
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setConnected((prev) => ({
        ...prev,
        statements: true,
      }));
    }
  };

  const next = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      router.push("/onboarding/profile");
    }
  };

  const back = () => {
    if (step > 0) setStep(step - 1);
  };

  const skip = () => next();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f7f5f0] to-[#dfe9e3] px-6 py-10 flex items-center justify-center">

      {/* 🌊 WRAPPER WITH WAVES */}
      <div className="relative w-full max-w-xl">

        {/* Waves */}
        <motion.div
          className="absolute inset-0 rounded-[36px] blur-3xl opacity-50"
          animate={{
            background: [
              "radial-gradient(circle at 20% 30%, #4ade80 0%, transparent 60%)",
              "radial-gradient(circle at 80% 70%, #22c55e 0%, transparent 60%)",
              "radial-gradient(circle at 40% 60%, #16a34a 0%, transparent 60%)",
            ],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* MAIN CARD WRAPPER */}
        <div className="relative border border-white/40 rounded-[36px] p-6 bg-white/60 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.08)]">

          {/* 🔝 TOP BAR */}
          <div className="flex items-center justify-between">
            <button
              onClick={back}
              className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-800"
            >
              ←
            </button>

            <div className="flex gap-2">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 w-10 rounded-full ${
                    i <= step ? "bg-green-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>

            {current.required ? (
              <div className="w-10" />
            ) : (
              <button onClick={skip} className="text-sm text-gray-700">
                Skip
              </button>
            )}
          </div>

          {/* CONTENT */}
          <div className="mt-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.4 }}
              >

                {/* 💳 MAIN CARD */}
                <div className="bg-white rounded-[28px] p-12 min-h-[360px] text-center shadow-[0_10px_40px_rgba(0,0,0,0.06)]">

                  <h1 className="text-2xl font-serif text-gray-900">
                    {current.title}
                  </h1>

                  <p className="text-gray-600 text-sm mt-2">
                    Securely connect your account to unlock insights.
                  </p>

                  <div className="mt-6 space-y-4">

                    {/* 📁 STATEMENTS UPLOAD */}
                    {current.id === "statements" ? (
                      <>
                        <button
                          onClick={handleFileUpload}
                          className="w-full bg-green-700 text-white p-5 rounded-2xl flex justify-between items-center shadow-md"
                        >
                          <span className="font-semibold">
                            Upload bank statements (PDF)
                          </span>
                          →
                        </button>

                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="application/pdf"
                          className="hidden"
                          onChange={onFileChange}
                        />

                        {isConnected && (
                          <div className="text-green-700 font-semibold mt-2">
                            ✓ File uploaded
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        {loading && (
                          <div className="w-full py-4 rounded-2xl bg-gray-100 text-gray-700">
                            Connecting...
                          </div>
                        )}

                        {!isConnected && !loading && (
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={handleConnect}
                            className="w-full bg-green-700 text-white py-4 rounded-2xl text-lg font-semibold shadow-md"
                          >
                            Connect
                          </motion.button>
                        )}

                        {isConnected && !loading && (
                          <>
                            <motion.div
                              initial={{ scale: 0.9, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className="w-full py-4 rounded-2xl bg-green-100 text-green-800 font-semibold"
                            >
                              ✓ Connected
                            </motion.div>

                            <button
                              onClick={handleDisconnect}
                              className="text-sm text-gray-700 underline"
                            >
                              Disconnect
                            </button>
                          </>
                        )}
                      </>
                    )}

                  </div>
                </div>

                {/* INFO */}
                <div className="mt-6 space-y-3">
                  <div className="bg-white rounded-2xl p-4 text-sm text-gray-800 shadow-sm">
                    🔐 Bank-grade encryption
                  </div>
                  <div className="bg-white rounded-2xl p-4 text-sm text-gray-800 shadow-sm">
                    ⚡ Real-time financial insights
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

          {/* CONTINUE */}
          <div className="mt-8">
            <button
              disabled={current.required && !isConnected}
              onClick={next}
              className={`w-full py-4 rounded-2xl text-lg font-semibold ${
                current.required && !isConnected
                  ? "bg-gray-300 text-gray-500"
                  : "bg-green-700 text-white"
              }`}
            >
              Continue
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}