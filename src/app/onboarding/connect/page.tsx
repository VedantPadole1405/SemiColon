"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  {
    id: "savings",
    title: "Connect your savings account",
    subtitle: "Select your bank to securely connect your savings account.",
    required: true,
    type: "bank",
    options: [
      "Chase",
      "Bank of America",
      "Wells Fargo",
      "Citi",
      "Capital One",
      "Discover",
      "American Express",
    ],
  },
  {
    id: "checking",
    title: "Connect your checking account",
    subtitle: "Choose your main spending account to unlock better insights.",
    required: true,
    type: "bank",
    options: [
      "Chase",
      "Bank of America",
      "Wells Fargo",
      "Citi",
      "Capital One",
      "Discover",
      "American Express",
    ],
  },
  {
    id: "credit",
    title: "Connect your credit cards",
    subtitle: "Optional, but useful for identifying subscriptions and card spending.",
    required: false,
    type: "bank",
    options: [
      "Chase",
      "Bank of America",
      "Wells Fargo",
      "Citi",
      "Capital One",
      "Discover",
      "American Express",
    ],
  },
  {
    id: "mortgage",
    title: "Connect your mortgage",
    subtitle: "Optional, helps distinguish fixed housing costs from flexible spending.",
    required: false,
    type: "bank",
    options: [
      "Rocket Mortgage",
      "Wells Fargo Home Mortgage",
      "Chase Home Lending",
      "Bank of America Home Loans",
      "CitiMortgage",
      "PennyMac",
    ],
  },
  {
    id: "statements",
    title: "Upload bank statements",
    subtitle: "Upload a PDF statement so SemiColon can analyze your spending patterns.",
    required: false,
    type: "file",
    options: [],
  },
];

export default function OnboardingFlow() {
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [connected, setConnected] = useState<Record<string, boolean>>({});
  const [selectedBank, setSelectedBank] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const [accountForm, setAccountForm] = useState({
    accountNumber: "",
    firstName: "",
    lastName: "",
    dob: "",
  });

  const [creditCardForm, setCreditCardForm] = useState({
    cardNumber: "",
    nameOnCard: "",
    expiryDate: "",
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const current = steps[step];
  const isConnected = connected[current.id];
  const currentBank = selectedBank[current.id] || "";

  const handleBankChange = (value: string) => {
    setSelectedBank((prev) => ({
      ...prev,
      [current.id]: value,
    }));
  };

  const openConnectModal = () => {
    if (!currentBank) return;
    setShowModal(true);
  };

  const closeConnectModal = () => {
    if (loading) return;

    setShowModal(false);

    setAccountForm({
      accountNumber: "",
      firstName: "",
      lastName: "",
      dob: "",
    });

    setCreditCardForm({
      cardNumber: "",
      nameOnCard: "",
      expiryDate: "",
    });
  };

  const handleConnect = () => {
    setLoading(true);

    setTimeout(() => {
      setConnected((prev) => ({ ...prev, [current.id]: true }));
      setLoading(false);
      setShowModal(false);

      setAccountForm({
        accountNumber: "",
        firstName: "",
        lastName: "",
        dob: "",
      });

      setCreditCardForm({
        cardNumber: "",
        nameOnCard: "",
        expiryDate: "",
      });
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

  const isContinueDisabled = current.required && !isConnected;

  const getStepLabel = () => {
    return `Step ${step + 1} of ${steps.length}`;
  };

  const isAccountFormValid =
    accountForm.accountNumber.trim() &&
    accountForm.firstName.trim() &&
    accountForm.lastName.trim() &&
    accountForm.dob.trim();

  const isCreditCardFormValid =
    creditCardForm.cardNumber.trim() &&
    creditCardForm.nameOnCard.trim() &&
    creditCardForm.expiryDate.trim();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f7f5f0] to-[#dfe9e3] px-6 py-10 flex items-center justify-center">
      <div className="relative w-full max-w-xl">
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

        <div className="relative border border-white/40 rounded-[36px] p-6 bg-white/60 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
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
              <button onClick={skip} className="text-sm text-gray-700 font-medium">
                Skip
              </button>
            )}
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
              {getStepLabel()}
            </p>
          </div>

          <div className="mt-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.35 }}
              >
                <div className="bg-white rounded-[28px] p-8 md:p-10 min-h-[420px] text-center shadow-[0_10px_40px_rgba(0,0,0,0.06)] flex flex-col justify-between">
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-green-100 text-green-800 flex items-center justify-center mx-auto text-2xl shadow-sm">
                      {current.type === "file" ? "📄" : "🏦"}
                    </div>

                    <h1 className="text-2xl md:text-3xl text-gray-900 mt-5">
                      {current.title}
                    </h1>

                    <p className="text-gray-600 text-sm mt-3 max-w-sm mx-auto leading-6">
                      {current.subtitle}
                    </p>

                    <div className="mt-8 space-y-4">
                      {current.type === "file" ? (
                        <>
                          <button
                            onClick={handleFileUpload}
                            className="w-full bg-green-700 hover:bg-green-800 text-white p-5 rounded-2xl flex justify-between items-center shadow-md transition"
                          >
                            <span className="font-semibold">
                              Upload statement PDF
                            </span>
                            <span>→</span>
                          </button>

                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="application/pdf"
                            className="hidden"
                            onChange={onFileChange}
                          />

                          {isConnected && (
                            <div className="w-full py-4 rounded-2xl bg-green-50 text-green-800 font-semibold border border-green-100">
                              ✓ Statement uploaded successfully
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          <div className="text-left">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Select your bank
                            </label>
                            <select
                              value={currentBank}
                              onChange={(e) => handleBankChange(e.target.value)}
                              className="w-full p-4 rounded-2xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                              <option value="">Choose a provider</option>
                              {current.options.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          </div>

                          {!isConnected && (
                            <button
                              onClick={openConnectModal}
                              disabled={!currentBank}
                              className={`w-full py-4 rounded-2xl text-lg font-semibold shadow-md transition ${
                                currentBank
                                  ? "bg-green-700 hover:bg-green-800 text-white"
                                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
                              }`}
                            >
                              Connect Account
                            </button>
                          )}

                          {isConnected && (
                            <motion.div
                              initial={{ scale: 0.95, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className="space-y-3"
                            >
                              <div className="w-full py-4 rounded-2xl bg-green-50 text-green-800 font-semibold border border-green-100">
                                ✓ Connected to {currentBank}
                              </div>

                              <button
                                onClick={handleDisconnect}
                                className="text-sm text-gray-700 underline"
                              >
                                Disconnect
                              </button>
                            </motion.div>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  <div className="mt-8 space-y-3">
                    <div className="bg-[#f8faf8] rounded-2xl p-4 text-sm text-gray-800 shadow-sm border border-gray-100">
                      🔐 Bank-grade encryption
                    </div>
                    <div className="bg-[#f8faf8] rounded-2xl p-4 text-sm text-gray-800 shadow-sm border border-gray-100">
                      ⚡ Personalized AI-powered insights
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8">
            <button
              disabled={isContinueDisabled}
              onClick={next}
              className={`w-full py-4 rounded-2xl text-lg font-semibold transition ${
                isContinueDisabled
                  ? "bg-gray-300 text-gray-500"
                  : "bg-green-700 hover:bg-green-800 text-white"
              }`}
            >
              {step === steps.length - 1 ? "Finish Setup" : "Continue"}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {showModal && current.type === "bank" && (
            <motion.div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center px-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                initial={{ scale: 0.92, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.92, opacity: 0, y: 20 }}
                transition={{ duration: 0.2 }}
                className="w-full max-w-sm rounded-[28px] bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)]"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                      Secure Connection
                    </p>
                    <h2 className="text-xl text-gray-900 mt-2">
                      Connect {currentBank}
                    </h2>
                  </div>

                  <button
                    onClick={closeConnectModal}
                    className="w-9 h-9 rounded-full bg-gray-100 text-gray-700"
                  >
                    ✕
                  </button>
                </div>

                <p className="text-sm text-gray-600 mt-3 leading-6">
                  {current.id === "credit"
                    ? `Enter your card details to link your ${currentBank} credit card.`
                    : `Enter your account details to securely link your ${current.id} account.`}
                </p>

                <div className="mt-6 space-y-4">
                  {current.id === "credit" ? (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Card Number
                        </label>
                        <input
                          type="text"
                          value={creditCardForm.cardNumber}
                          onChange={(e) =>
                            setCreditCardForm((prev) => ({
                              ...prev,
                              cardNumber: e.target.value,
                            }))
                          }
                          placeholder="Enter card number"
                          className="w-full p-4 rounded-2xl border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Name on Card
                        </label>
                        <input
                          type="text"
                          value={creditCardForm.nameOnCard}
                          onChange={(e) =>
                            setCreditCardForm((prev) => ({
                              ...prev,
                              nameOnCard: e.target.value,
                            }))
                          }
                          placeholder="Enter name on card"
                          className="w-full p-4 rounded-2xl border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          value={creditCardForm.expiryDate}
                          onChange={(e) =>
                            setCreditCardForm((prev) => ({
                              ...prev,
                              expiryDate: e.target.value,
                            }))
                          }
                          placeholder="MM/YY"
                          className="w-full p-4 rounded-2xl border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Account Number
                        </label>
                        <input
                          type="text"
                          value={accountForm.accountNumber}
                          onChange={(e) =>
                            setAccountForm((prev) => ({
                              ...prev,
                              accountNumber: e.target.value,
                            }))
                          }
                          placeholder="Enter account number"
                          className="w-full p-4 rounded-2xl border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          value={accountForm.firstName}
                          onChange={(e) =>
                            setAccountForm((prev) => ({
                              ...prev,
                              firstName: e.target.value,
                            }))
                          }
                          placeholder="Enter first name"
                          className="w-full p-4 rounded-2xl border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          value={accountForm.lastName}
                          onChange={(e) =>
                            setAccountForm((prev) => ({
                              ...prev,
                              lastName: e.target.value,
                            }))
                          }
                          placeholder="Enter last name"
                          className="w-full p-4 rounded-2xl border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          value={accountForm.dob}
                          onChange={(e) =>
                            setAccountForm((prev) => ({
                              ...prev,
                              dob: e.target.value,
                            }))
                          }
                          className="w-full p-4 rounded-2xl border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                    </>
                  )}
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={closeConnectModal}
                    className="flex-1 py-3 rounded-2xl border border-gray-200 text-gray-700 font-medium"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleConnect}
                    disabled={
                      loading ||
                      (current.id === "credit"
                        ? !isCreditCardFormValid
                        : !isAccountFormValid)
                    }
                    className={`flex-1 py-3 rounded-2xl font-semibold transition ${
                      loading ||
                      (current.id === "credit"
                        ? !isCreditCardFormValid
                        : !isAccountFormValid)
                        ? "bg-gray-200 text-gray-400"
                        : "bg-green-700 hover:bg-green-800 text-white"
                    }`}
                  >
                    {loading ? "Connecting..." : "Connect"}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}