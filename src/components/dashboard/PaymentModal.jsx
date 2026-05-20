import React, { useState, useEffect } from 'react';
import { X, CreditCard, Shield, CheckCircle2, ChevronRight, Award } from 'lucide-react';

export default function PaymentModal({ isOpen, onClose, totalAmount, onPaymentSuccess }) {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [upiId, setUpiId] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePay = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        onPaymentSuccess();
        onClose();
        setIsSuccess(false);
      }, 2000);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="relative w-full max-w-md bg-white rounded-figma-lg shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
          <div>
            <h3 className="font-heading text-lg font-bold text-slate-900">Secure Checkout</h3>
            <p className="text-xs text-slate-500">Transaction is encrypted via SSL</p>
          </div>
          <button 
            onClick={onClose} 
            disabled={isProcessing}
            className="p-1.5 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {!isProcessing && !isSuccess ? (
          <form onSubmit={handlePay} className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Amount Summary */}
            <div className="p-4 bg-brand-50 rounded-figma-md flex items-center justify-between border border-brand-100">
              <div>
                <span className="text-xs font-semibold text-brand-600 tracking-wider uppercase">Amount Payable</span>
                <p className="text-2xl font-bold text-brand-700 mt-0.5">₹{totalAmount.toLocaleString('en-IN')}</p>
              </div>
              <Shield className="w-8 h-8 text-brand-500 opacity-80" />
            </div>

            {/* Payment Method Selectors */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 tracking-wider uppercase block">Select Payment Method</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-figma-md border text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                    paymentMethod === 'card' 
                      ? 'border-brand-500 bg-brand-50/40 text-brand-600 ring-2 ring-brand-100' 
                      : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  Credit / Debit
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-figma-md border text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                    paymentMethod === 'upi' 
                      ? 'border-brand-500 bg-brand-50/40 text-brand-600 ring-2 ring-brand-100' 
                      : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <span className="font-heading font-black tracking-tighter text-xs">UPI</span>
                  UPI / GPay
                </button>
              </div>
            </div>

            {/* Input Details */}
            {paymentMethod === 'card' ? (
              <div className="space-y-4 animate-fade-in">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Cardholder Name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Abhigyan Pandey" 
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-figma-md focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Card Number</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      required 
                      value={cardNumber}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '').substring(0, 16);
                        const parts = val.match(/.{1,4}/g) || [];
                        setCardNumber(parts.join(' '));
                      }}
                      placeholder="4111 2222 3333 4444" 
                      className="w-full pl-3 pr-10 py-2 text-sm border border-slate-200 rounded-figma-md focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none transition-all"
                    />
                    <CreditCard className="absolute right-3 top-2.5 w-4 h-4 text-slate-400" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">Expiry Date</label>
                    <input 
                      type="text" 
                      required 
                      value={cardExpiry}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '').substring(0, 4);
                        if (val.length > 2) {
                          setCardExpiry(val.substring(0, 2) + '/' + val.substring(2));
                        } else {
                          setCardExpiry(val);
                        }
                      }}
                      placeholder="MM/YY" 
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-figma-md focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none transition-all text-center"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">CVV Code</label>
                    <input 
                      type="password" 
                      required 
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').substring(0, 3))}
                      placeholder="•••" 
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-figma-md focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none transition-all text-center"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4 animate-fade-in">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Enter UPI ID</label>
                  <input 
                    type="text" 
                    required 
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="username@okaxis" 
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-figma-md focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none transition-all"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">E.g., googlepay, phonepe, paytm, bhim, ybl</p>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-figma-md flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-[11px] font-medium text-slate-500">Waiting for app confirmation</span>
                  </div>
                  <span className="text-[10px] font-bold bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded uppercase">Fast UPI</span>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-figma-md font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg shadow-brand-100"
            >
              <span>Pay ₹{totalAmount.toLocaleString('en-IN')}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </form>
        ) : isProcessing ? (
          <div className="flex-1 p-12 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-12 h-12 border-4 border-brand-200 border-t-brand-500 rounded-full animate-spin"></div>
            <div>
              <h4 className="font-heading font-semibold text-slate-800">Processing Payment</h4>
              <p className="text-xs text-slate-400 mt-1">Verifying credentials and completing transaction. Please do not close or reload the browser.</p>
            </div>
          </div>
        ) : (
          <div className="flex-1 p-12 flex flex-col items-center justify-center text-center space-y-4 animate-scale-up">
            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center border border-emerald-100 text-emerald-500 shadow-lg shadow-emerald-50">
              <CheckCircle2 className="w-10 h-10 animate-pulse" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-slate-900 text-lg">Payment Successful!</h4>
              <p className="text-xs text-slate-400 mt-1">Thank you for subscribing! Your credit limits and account benefits are being updated.</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-figma-md border border-slate-100 w-full flex items-center justify-center gap-2 text-xs font-semibold text-slate-500 mt-2">
              <Award className="w-4 h-4 text-amber-500" />
              Receipt sent to email
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
