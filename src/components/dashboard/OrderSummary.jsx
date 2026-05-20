import React, { useState, useEffect } from 'react';
import { CreditCard, Wallet, Tag, ChevronDown, ChevronUp, AlertCircle, ArrowUpRight, HelpCircle, ToggleLeft, ToggleRight } from 'lucide-react';

export default function OrderSummary({ onProceed }) {
  // Plan options
  const [selectedPlan, setSelectedPlan] = useState('startup'); // startup or growth
  
  // Checkout variables
  const [walletApplied, setWalletApplied] = useState(false);
  const [couponOpen, setCouponOpen] = useState(true);
  const [selectedCoupon, setSelectedCoupon] = useState('WELCOME20'); // WELCOME20, ANNUAL50, or ''
  const [customCouponCode, setCustomCouponCode] = useState('');
  


  const plans = {
    startup: {
      name: 'Startup',
      priceText: '₹4,999/month',
      subtotal: 14999.00, // Representing a 3-month cycle
      creditsText: 'Includes 5,000 credits/mo.',
    },
    growth: {
      name: 'Growth',
      priceText: '₹9,999/month',
      subtotal: 29997.00,
      creditsText: 'Includes 15,000 credits/mo.',
    }
  };

  const coupons = {
    WELCOME20: {
      name: 'WELCOME20',
      description: '20% off on your first month',
      discountRate: 0.20
    },
    ANNUAL50: {
      name: 'ANNUAL50',
      description: '50% off on annual plans',
      discountRate: 0.50
    }
  };

  const walletBalance = 500.00;

  // Calculation variables
  const [subtotal, setSubtotal] = useState(14999.00);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [walletDiscount, setWalletDiscount] = useState(0);
  const [gstAmount, setGstAmount] = useState(1079.64);
  const [totalAmount, setTotalAmount] = useState(16078.64);

  // Recalculate billing values when options change
  useEffect(() => {
    const isGrowth = selectedPlan === 'growth';
    setSubtotal(isGrowth ? 29997.00 : 14999.00);
    setCouponDiscount(0);
    setWalletDiscount(0);
    setGstAmount(isGrowth ? 2159.28 : 1079.64);
    setTotalAmount(isGrowth ? 32156.28 : 16078.64);
  }, [selectedPlan]);

  const handleApplyCustomCoupon = (e) => {
    e.preventDefault();
    const code = customCouponCode.trim().toUpperCase();
    if (code === 'WELCOME20' || code === 'ANNUAL50') {
      setSelectedCoupon(code);
      setCustomCouponCode('');
    } else if (code) {
      alert(`Coupon "${code}" is invalid or expired.`);
    }
  };

  const handleProceedClick = () => {
    onProceed(totalAmount);
  };

  const togglePlan = () => {
    setSelectedPlan(prev => prev === 'startup' ? 'growth' : 'startup');
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-figma-lg border border-slate-100 shadow-sm space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h2 className="font-heading text-xl font-bold text-slate-900">Order Summary</h2>
      </div>

      {/* Plan Details Card */}
      <div className="bg-slate-50/50 p-5 rounded-figma-lg border border-slate-150 relative overflow-hidden group">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold text-brand-600 tracking-widest uppercase block mb-1">
              Selected Plan
            </span>
            <h3 className="font-heading text-lg font-bold text-slate-900">
              {plans[selectedPlan].name}
            </h3>
            <p className="text-xs text-slate-400 mt-1">{plans[selectedPlan].creditsText}</p>
          </div>
          <div className="text-left md:text-right">
            <p className="font-heading text-2xl font-extrabold text-slate-900 tracking-tight">
              {plans[selectedPlan].priceText}
            </p>
            <button 
              onClick={togglePlan}
              className="text-xs font-semibold text-brand-500 hover:text-brand-600 flex items-center gap-1 mt-1 group cursor-pointer"
            >
              <span>Upgrade to {selectedPlan === 'startup' ? 'Growth Plan' : 'Startup Plan'}</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Wallet Balance Section */}
      <div className="flex items-center justify-between p-4 bg-slate-50/40 rounded-figma-md border border-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-brand-50 rounded-figma-md text-brand-500">
            <Wallet className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-800">Wallet Balance</p>
            <p className="text-[11px] text-slate-400">₹{walletBalance.toFixed(2)} available</p>
          </div>
        </div>
        <button
          onClick={() => setWalletApplied(!walletApplied)}
          className={`px-4 py-1.5 rounded-figma-md text-xs font-semibold border transition-all cursor-pointer ${
            walletApplied
              ? 'bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-100/70'
              : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
          }`}
        >
          {walletApplied ? 'Remove' : 'Apply'}
        </button>
      </div>

      {/* Coupon Panel */}
      <div className="border border-slate-100 rounded-figma-lg overflow-hidden">
        {/* Header/Toggle */}
        <button
          onClick={() => setCouponOpen(!couponOpen)}
          className="w-full flex items-center justify-between p-4 bg-slate-50/30 hover:bg-slate-50/70 transition-colors border-b border-slate-100 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-100 rounded-figma-md text-slate-500">
              <Tag className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-slate-800">Apply Coupon</span>
          </div>
          {couponOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {/* Collapsible Content */}
        {couponOpen && (
          <div className="p-4 space-y-4 bg-white animate-fade-in">
            {/* Input field */}
            <form onSubmit={handleApplyCustomCoupon} className="flex gap-2">
              <input
                type="text"
                value={customCouponCode}
                onChange={(e) => setCustomCouponCode(e.target.value)}
                placeholder="Enter coupon code"
                className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-figma-md focus:outline-none focus:border-brand-500 transition-all font-sans uppercase"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-figma-md text-xs font-semibold transition-colors cursor-pointer"
              >
                Apply
              </button>
            </form>

            {/* Coupons List */}
            <div className="space-y-2.5">
              {Object.values(coupons).map((coupon) => (
                <label
                  key={coupon.name}
                  className={`flex items-start justify-between p-2.5 rounded-figma-md border transition-all cursor-pointer ${
                    selectedCoupon === coupon.name
                      ? 'border-brand-500 bg-brand-50/20 text-brand-700'
                      : 'border-slate-150 hover:bg-slate-50/50 text-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="radio"
                      name="coupon"
                      checked={selectedCoupon === coupon.name}
                      onChange={() => setSelectedCoupon(coupon.name)}
                      className="w-3.5 h-3.5 text-brand-500 focus:ring-brand-400 accent-brand-500"
                    />
                    <div>
                      <span className="text-xs font-bold font-sans uppercase">{coupon.name}</span>
                      <p className="text-[10px] text-slate-400 mt-0.5">{coupon.description}</p>
                    </div>
                  </div>
                  {selectedCoupon === coupon.name && (
                    <span className="text-[10px] font-bold bg-brand-100 text-brand-700 px-1.5 py-0.5 rounded">
                      Applied
                    </span>
                  )}
                </label>
              ))}
              
              {/* Option to clear coupons */}
              {selectedCoupon && (
                <button
                  onClick={() => setSelectedCoupon('')}
                  className="text-[10px] font-semibold text-rose-500 hover:text-rose-600 cursor-pointer block"
                >
                  Remove applied coupon
                </button>
              )}
            </div>
          </div>
        )}
      </div>



      {/* Pricing Summary */}
      <div className="space-y-2.5 border-t border-slate-100 pt-4">
        {/* Subtotal */}
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Subtotal</span>
          <span className="font-semibold text-slate-700">₹{subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
        </div>

        {/* Dynamic Discounts */}
        {couponDiscount > 0 && (
          <div className="flex items-center justify-between text-xs text-emerald-600 bg-emerald-50/30 px-2 py-1 rounded animate-fade-in">
            <span className="flex items-center gap-1">
              <span>Coupon Discount</span>
              <span className="text-[10px] font-bold bg-emerald-100 px-1.5 py-0.5 rounded uppercase">{selectedCoupon}</span>
            </span>
            <span className="font-semibold">-₹{couponDiscount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
          </div>
        )}
        
        {walletDiscount > 0 && (
          <div className="flex items-center justify-between text-xs text-emerald-600 bg-emerald-50/30 px-2 py-1 rounded animate-fade-in">
            <span>Wallet Discount</span>
            <span className="font-semibold">-₹{walletDiscount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
          </div>
        )}

        {/* GST */}
        <div className="flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <span>Tax (18% GST)</span>
            <HelpCircle 
              className="w-3.5 h-3.5 text-slate-400 cursor-help" 
              title={`Calculated as 18% of taxable subtotal: ₹${(subtotal - couponDiscount - walletDiscount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`} 
            />
          </div>
          <span className="font-semibold text-slate-700">₹{gstAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
        </div>

        {/* Divider */}
        <div className="h-px bg-slate-100 my-2"></div>

        {/* Total */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-sm font-bold text-slate-800">Total due today</span>
          <span className="text-xl font-extrabold text-brand-600 font-heading tracking-tight">
            ₹{totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        onClick={handleProceedClick}
        className="w-full py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-figma-md font-semibold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-brand-100"
      >
        <CreditCard className="w-4 h-4" />
        <span>Proceed to Payment</span>
      </button>

      {/* Trust Seal */}
      <p className="text-[10px] text-center text-slate-400 mt-2 flex items-center justify-center gap-1">
        <span>🔒 Secure 256-bit SSL encrypted connection</span>
      </p>

    </div>
  );
}
