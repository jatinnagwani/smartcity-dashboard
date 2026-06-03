# 🏙️ SmartCity Dashboard

A modern, real-time city dashboard built with React & Vite. Get live weather updates, currency rates, random citizen profiles, and interesting facts — all in one place, with an AI assistant to help you navigate it all.

---

## 🌐 Live Demo

<div align="center">

### 👉 [**Click here to view SmartCity Dashboard**](https://smartcity-dashboard-chi-mauve.vercel.app) 👈

</div>

---

## ✨ Features

- 🌤️ **Live Weather** — Real-time temperature, wind speed, feels like, and weather condition for your city
- 💱 **Currency Rates** — Live USD to INR, EUR, and GBP exchange rates
- 👤 **Citizen Profile** — Random citizen generator with name, location, age, gender, height, and weight
- 📖 **City Fact** — Random interesting facts with a "Did You Know?" section that refreshes every time
- 🤖 **AI Assistant** — Gemini-powered chatbot that knows your dashboard data and answers questions about it
- 🔄 **Refresh Everything** — Each card has its own refresh button for live updates
- 🌙 **Dark Mode** — Clean dark UI that's easy on the eyes

---

## 🛠️ Tech Stack

- **Frontend** — React 18 + Vite
- **Styling** — Tailwind CSS
- **Icons** — Lucide React
- **AI** — Google Gemini 2.0 Flash API
- **APIs Used:**
  - [Open-Meteo](https://open-meteo.com/) — Weather data
  - [ExchangeRate API](https://open.er-api.com/) — Currency rates
  - [RandomUser.me](https://randomuser.me/) — Citizen profiles
  - [Useless Facts API](https://uselessfacts.jsph.pl/) — Random facts
  - [Google Gemini](https://aistudio.google.com/) — AI chatbot

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/jatinnagwani/smartcity-dashboard.git
cd smartcity-dashboard
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables

Create a `.env` file in the root directory:
```
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

Get your free Gemini API key from [Google AI Studio](https://aistudio.google.com/)

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📸 Preview

> Dashboard showing live weather, currency rates, citizen profile, and city facts with AI chat

---

## 🙋‍♂️ Author

**Jatin Nagwani**  
CS Student @ ADYPU  
[GitHub](https://github.com/jatinnagwani)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
