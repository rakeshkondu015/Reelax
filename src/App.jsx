import React, { useState } from 'react';
import LayoutWrapper from './components/layout/LayoutWrapper';
import Navbar from './components/layout/Navbar';
import BillingForm from './components/dashboard/BillingForm';
import OrderSummary from './components/dashboard/OrderSummary';
import Toast from './components/common/Toast';
import PaymentModal from './components/dashboard/PaymentModal';
import { ChevronLeft } from 'lucide-react';

export default function App() {
  const [toast, setToast] = useState(null); // { message, type }
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [totalAmount, setTotalAmount] = useState(16078.64);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const handleSaveDetails = (formData) => {
    console.log('Saved details:', formData);
    showToast(`Billing details for "${formData.companyName}" saved successfully!`, 'success');
  };

  const handleCancelDetails = () => {
    showToast('Billing details editing cancelled.', 'info');
  };

  const handleProceedToPayment = (amount) => {
    setTotalAmount(amount);
    setIsPaymentOpen(true);
  };

  const handlePaymentSuccess = () => {
    showToast('Subscription active! Payment of ₹' + totalAmount.toLocaleString('en-IN') + ' processed successfully.', 'success');
  };

  return (
    <LayoutWrapper>
      {/* Top Navbar */}
      <Navbar onSearch={(val) => showToast(`Searching for influencers matching: "${val}"`, 'info')} />

      {/* Main Layout Container */}
      <main className="max-w-7xl mx-auto w-full px-4 md:px-8 mt-6 flex-1 flex flex-col space-y-6">
        
        {/* Breadcrumbs Banner */}
        <div className="flex items-center">
          <button 
            onClick={() => showToast('Returning to plans view...', 'info')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-figma-md text-xs font-semibold text-slate-500 hover:text-slate-800 hover:border-slate-300 hover:shadow-sm transition-all cursor-pointer group"
          >
            <ChevronLeft className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
            <span>Back to plans</span>
          </button>
        </div>

        {/* Title Section */}
        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Review your details
          </h1>
          <p className="text-sm text-slate-400 mt-1">Please review your billing details and complete payment to activate your plan.</p>
        </div>

        {/* Two-Column Form & Summary Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column - Billing Form */}
          <div className="lg:col-span-7">
            <BillingForm 
              onSave={handleSaveDetails} 
              onCancel={handleCancelDetails} 
            />
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-5">
            <OrderSummary 
              onProceed={handleProceedToPayment} 
            />
          </div>
        </div>
      </main>

      {/* Reusable Toast Notifications */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Secure Checkout / Payment Dialog */}
      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        totalAmount={totalAmount}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </LayoutWrapper>
  );
}
