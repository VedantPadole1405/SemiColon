# 💰 Personal CFO – AI-Powered Financial Assistant

## 🚀 Overview

Personal CFO is an intelligent financial assistant designed to help users **analyze spending, optimize savings, and make smarter financial decisions** using AI.

Built for students and professionals, the platform provides:

* 📊 Real-time financial insights
* 🧠 AI-powered recommendations
* 🎯 Goal-based savings planning
* 🔐 Secure authentication & personalization

---

## ✨ Key Features

### 📂 1. Bank Statement Analysis

* Upload your bank statement (PDF)
* Automatically parses and categorizes transactions
* Generates spending breakdowns

---

### 🤖 2. AI Financial Assistant (Powered by Gemini)

* Ask questions like:

  * *“What subscriptions should I cancel?”*
  * *“How can I save more money?”*
* Uses **Google Gemini API** for intelligent responses
* Includes **smart fallback engine** for reliability

---

### 🔊 3. AI Audio Assistant (ElevenLabs)

* Converts insights into **natural-sounding audio**
* Enables a more interactive, accessible experience

---

### 🎯 4. Personalized Recommendations

* Detects:

  * Subscriptions (e.g., Spotify)
  * Spending patterns (e.g., Walmart)
* Suggests:

  * Cost-saving alternatives
  * Deals and coupons (e.g., Rakuten)

---

### 📉 5. Smart Financial Insights

* Expense categorization
* Monthly savings estimation
* Risk detection & financial health analysis

---

### 🔐 6. Secure Authentication (Auth0)

* Login/Logout functionality
* Middleware-based route protection
* Secure user sessions and personalization

---

## 🧠 AI Stack

| Component  | Technology                           |
| ---------- | ------------------------------------ |
| LLM        | Google Gemini API                    |
| Voice AI   | ElevenLabs                           |
| Auth       | Auth0 (middleware-based)             |
| Backend    | FastAPI                              |
| Frontend   | Next.js (App Router)                 |
| Deployment | Vercel (Frontend) + Render (Backend) |

---

## 🏗️ Architecture

```
User → Next.js Frontend → FastAPI Backend → AI Services
                                     ↳ Gemini API
                                     ↳ ElevenLabs API
                                     ↳ Financial Logic Engine
```

---

## ⚙️ How It Works

1. User uploads bank statement
2. Backend parses and cleans transactions
3. Data is aggregated into insights
4. AI generates recommendations
5. Results displayed via dashboard + assistant

---

## 🧪 Smart Fallback System

Even if AI fails:

* Hardcoded financial intelligence ensures responses
* Example:

  * Suggest canceling Spotify → save $9.99/month
  * Recommend Walmart deals → Rakuten coupons

---

## 🌐 Deployment

* **Frontend**: Vercel
* **Backend**: Render
* Environment variables used for secure API handling

---

## 🎤 Demo Flow

1. Create profile
2. Upload bank statement
3. Login (Auth0 secured)
4. View dashboard
5. Ask AI assistant questions

---

## 💡 Innovation

* Combines **finance + AI + voice + personalization**
* Works even without AI (fallback intelligence)
* Designed for real-world financial decision making

---

## 🏆 Why This Matters

Most finance apps show data.
**Personal CFO explains it, optimizes it, and acts on it.**

---

## 👨‍💻 Team

Built with 💚 by:
**Vedant Padole**

---

## 📌 Future Improvements

* Real-time bank integrations (Plaid)
* Investment recommendations
* Credit score analysis
* Multi-language voice support

---

## ⭐ Final Note

This project demonstrates how AI can move beyond chat
and become a **true decision-making companion for personal finance.**
