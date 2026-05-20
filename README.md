# Reelax Checkout & Billing Details Web Application

This repository contains a pixel-perfect, highly responsive subscription checkout and billing information application built using **React** and **Tailwind CSS**. It translates a high-fidelity Figma user interface layout into modular, reusable, and interactive components.

## 🚀 Key Features

- **Pixel-Perfect Fidelity**: Custom styling matching typography (Inter & Poppins via Google Fonts), colors, shadows, and spacing tokens from the Figma specs.
- **Dynamic Math Engine**: 
  - **Figma Spec Math Mode (Default)**: Matches the exact numbers shown in the Figma screenshot (Subtotal ₹14,999.00, Tax (18% GST) ₹1,079.64, and Total Due Today ₹16,078.64).
  - **Real-world Math Mode**: Toggles to apply real-world calculation logic, dynamically updating the coupon discounts (WELCOME30 / ANNUAL50) and wallet deductions (₹500.00) against the subtotal and calculating correct tax percentages and grand totals.
- **Indian State & City Selector**: State-dependent city dropdowns filtered dynamically based on major states of India.
- **Interactive Form Validation**: Validates user inputs (such as Email syntax, GST Number format, PAN formatting, and Pin Code numeric lengths) in real-time.
- **Micro-Animations & Toasts**: Subtle transitions, hover states, context items, slide-in Toast alerts, and responsive navigation drawer.
- **Secure Payment Gateway Mockup**: Full checkout payment flow supporting Credit/Debit Card masks, UPI handles, loading transitions, and success states.

---

## 🛠️ Tech Stack & Key Choices

- **Framework**: [React JS](https://react.dev/) (Component-based architecture)
- **Build Engine**: [Vite](https://vite.dev/) (Highly optimized and fast hot-reloading server)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (Modern CSS configuration variables and theme tokens)
- **Icons**: [Lucide React](https://lucide.dev/) (SVG vector iconography)

---

## ⚙️ How to Run Locally

### 1. Clone the repository
```bash
git clone <your-repository-url>
cd Reelax
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start local development server
```bash
npm run dev
```
Open your browser and navigate to [http://localhost:5173](http://localhost:5173).

### 4. Build for production
```bash
npm run build
```
Creates an optimized static bundle in the `dist/` directory.
