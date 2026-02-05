# 🚀 PlanFolio

**PlanFolio** is a high-performance, professional **investment planning dashboard** built to help users strategize wealth growth using **SIP, Step-Up SIP, and Lumpsum** models. 

Built as part of a frontend engineering assessment, it prioritizes a premium user experience, real-time feedback, and clean, modular code architecture.

---

## 🌐 Live Demo

🔗 **Deployed on Vercel:** [https://sip-calculator-lilac.vercel.app/](https://sip-calculator-lilac.vercel.app/)

---

## ✨ Advanced Features

- 📈 **SIP Calculator** (Monthly Investment)
- 🔁 **Step-Up SIP** with annual increment
- 💰 **Lumpsum Investment Calculator**
- 📊 Interactive **Growth Chart**
- 🧮 Real-time calculations
- 🎨 Premium dark UI with Tailwind
- 📱 Fully responsive (mobile-first)
- 📤 Share & Download (PDF-ready UI)
---

## 🧮 Financial Logic

### 📌 SIP (Systematic Investment Plan)
Standard monthly compounding formula:
$$FV = P \times \frac{(1 + r)^n - 1}{r} \times (1 + r)$$

### 📌 Step-Up SIP
Investment increases by $X\%$ annually, compounding each year's new base amount independently.

### 📌 Lumpsum
Standard compound interest formula:
$$FV = P \times (1 + r)^n$$

---

## 🛠 Tech Stack

- **React (Vite)**: Component-based architecture.
- **Tailwind CSS**: Utility-first styling for a premium feel.
- **Recharts**: High-performance data visualization.
- **Framer Motion**: For smooth transitions and subtle animations.
- **Custom Hooks**: Decoupled state management via `useSIP.js`.

---

## 📂 Modular Structure
```text
src/
 ├── components/  # Atomic UI (Input, Display, Charts)
 ├── hooks/       # Business logic (State & Calculations)
 ├── utils/       # Math formulas & Formatters
 ├── App.jsx      # Balanced responsive grid layout
 └── main.jsx     # Entry point
```

## ⚙️ Setup & Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/sohxmdv/sip-calculator.git
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Run local dev server**
   ```bash
   npm run dev
   ```
   
---

## 📌 Assumptions

- Returns are compounded **monthly**
- Step-Up increment is applied **annually**
- Taxes, inflation, and market volatility are **not considered**

---

## 🚀 Future Enhancements

- Inflation-adjusted returns
- Historical market presets
- Multi-goal investment planning
- User profiles & saved investment plans

---

## 👨‍💻 Author

**Soham Dave**
