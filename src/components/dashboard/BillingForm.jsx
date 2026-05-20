import React, { useState } from 'react';
import { Building2, Mail, FileText, MapPin, Globe, ArrowRight } from 'lucide-react';

const INDIAN_STATES = {
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik"],
  "Karnataka": ["Bengaluru", "Mysore", "Hubli", "Mangaluru", "Belgaum"],
  "Delhi": ["New Delhi", "Noida (NCR)", "Gurugram (NCR)", "Dwarka"],
  "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Trichy", "Salem"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Noida", "Ghaziabad", "Agra"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar"]
};

export default function BillingForm({ onSave, onCancel }) {
  const [formData, setFormData] = useState({
    companyName: 'abhigyan',
    email: 'abhigyan.pandey@godevday.com',
    gstNumber: '',
    panNumber: '',
    premiseNo: '',
    street: '',
    state: '',
    city: '',
    country: 'India',
    pinCode: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Reset city if state changes
      ...(name === 'state' ? { city: '' } : {})
    }));
    
    // Clear error for the field when typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (formData.gstNumber.trim()) {
      const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
      if (!gstRegex.test(formData.gstNumber.toUpperCase())) {
        newErrors.gstNumber = 'Invalid GST format (e.g. 27AAAAA1111A1Z1)';
      }
    }

    if (formData.panNumber.trim()) {
      const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
      if (!panRegex.test(formData.panNumber.toUpperCase())) {
        newErrors.panNumber = 'Invalid PAN format (e.g. ABCDE1234F)';
      }
    }

    if (formData.pinCode.trim()) {
      const pinRegex = /^[1-9][0-9]{5}$/;
      if (!pinRegex.test(formData.pinCode)) {
        newErrors.pinCode = 'Invalid Pin Code (6 digits)';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave(formData);
    }
  };

  const handleCancelClick = () => {
    // Reset to defaults or navigate back
    setFormData({
      companyName: 'abhigyan',
      email: 'abhigyan.pandey@godevday.com',
      gstNumber: '',
      panNumber: '',
      premiseNo: '',
      street: '',
      state: '',
      city: '',
      country: 'India',
      pinCode: ''
    });
    setErrors({});
    if (onCancel) onCancel();
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-figma-lg border border-slate-100 shadow-sm">
      <h2 className="font-heading text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-3 flex items-center gap-2">
        <Building2 className="w-5 h-5 text-brand-500" />
        Billing Information
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Company Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">Company Name</label>
            <div className="relative">
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Company Name"
                className={`w-full pl-3 pr-8 py-2.5 text-sm border rounded-figma-md focus:outline-none transition-all ${
                  errors.companyName 
                    ? 'border-rose-400 bg-rose-50/10 focus:border-rose-500 focus:ring-2 focus:ring-rose-100' 
                    : 'border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100'
                }`}
              />
              <Building2 className="absolute right-3 top-3 w-4 h-4 text-slate-300" />
            </div>
            {errors.companyName && <p className="text-xs text-rose-500 mt-1 font-medium">{errors.companyName}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">Email</label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className={`w-full pl-3 pr-8 py-2.5 text-sm border rounded-figma-md focus:outline-none transition-all ${
                  errors.email 
                    ? 'border-rose-400 bg-rose-50/10 focus:border-rose-500 focus:ring-2 focus:ring-rose-100' 
                    : 'border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100'
                }`}
              />
              <Mail className="absolute right-3 top-3 w-4 h-4 text-slate-300" />
            </div>
            {errors.email && <p className="text-xs text-rose-500 mt-1 font-medium">{errors.email}</p>}
          </div>

          {/* GST Number */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">
              GST Number <span className="text-slate-400 font-normal lowercase">(Optional)</span>
            </label>
            <div className="relative">
              <input
                type="text"
                name="gstNumber"
                value={formData.gstNumber}
                onChange={handleChange}
                placeholder="GST Number"
                className={`w-full pl-3 pr-8 py-2.5 text-sm border rounded-figma-md focus:outline-none transition-all ${
                  errors.gstNumber 
                    ? 'border-rose-400 bg-rose-50/10 focus:border-rose-500 focus:ring-2 focus:ring-rose-100' 
                    : 'border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100'
                }`}
              />
              <FileText className="absolute right-3 top-3 w-4 h-4 text-slate-300" />
            </div>
            {errors.gstNumber && <p className="text-xs text-rose-500 mt-1 font-medium">{errors.gstNumber}</p>}
          </div>

          {/* PAN Number */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">
              PAN Number <span className="text-slate-400 font-normal lowercase">(Optional)</span>
            </label>
            <div className="relative">
              <input
                type="text"
                name="panNumber"
                value={formData.panNumber}
                onChange={handleChange}
                placeholder="PAN Number"
                className={`w-full pl-3 pr-8 py-2.5 text-sm border rounded-figma-md focus:outline-none transition-all ${
                  errors.panNumber 
                    ? 'border-rose-400 bg-rose-50/10 focus:border-rose-500 focus:ring-2 focus:ring-rose-100' 
                    : 'border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100'
                }`}
              />
              <FileText className="absolute right-3 top-3 w-4 h-4 text-slate-300" />
            </div>
            {errors.panNumber && <p className="text-xs text-rose-500 mt-1 font-medium">{errors.panNumber}</p>}
          </div>

          {/* Premise/House no */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">Premise/House no.</label>
            <div className="relative">
              <input
                type="text"
                name="premiseNo"
                value={formData.premiseNo}
                onChange={handleChange}
                placeholder="Premise/House no."
                className="w-full pl-3 pr-8 py-2.5 text-sm border border-slate-200 rounded-figma-md focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition-all"
              />
              <MapPin className="absolute right-3 top-3 w-4 h-4 text-slate-300" />
            </div>
          </div>

          {/* Street */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">Street</label>
            <div className="relative">
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                placeholder="Street name"
                className="w-full pl-3 pr-8 py-2.5 text-sm border border-slate-200 rounded-figma-md focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition-all"
              />
              <MapPin className="absolute right-3 top-3 w-4 h-4 text-slate-300" />
            </div>
          </div>

          {/* State */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">State</label>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-figma-md focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition-all bg-white"
            >
              <option value="">Select state</option>
              {Object.keys(INDIAN_STATES).map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>

          {/* City */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">City</label>
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              disabled={!formData.state}
              className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-figma-md focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition-all bg-white disabled:bg-slate-50 disabled:text-slate-400"
            >
              <option value="">Select city</option>
              {formData.state && INDIAN_STATES[formData.state].map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          {/* Country */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">Country</label>
            <div className="relative">
              <input
                type="text"
                name="country"
                value={formData.country}
                disabled
                placeholder="Country"
                className="w-full pl-3 pr-8 py-2.5 text-sm border border-slate-200 rounded-figma-md bg-slate-50 text-slate-500 outline-none"
              />
              <Globe className="absolute right-3 top-3 w-4 h-4 text-slate-400" />
            </div>
          </div>

          {/* Pin Code */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">Pin Code</label>
            <div className="relative">
              <input
                type="text"
                name="pinCode"
                value={formData.pinCode}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '').substring(0, 6);
                  setFormData(prev => ({ ...prev, pinCode: val }));
                  if (errors.pinCode) setErrors(prev => ({ ...prev, pinCode: '' }));
                }}
                placeholder="Pin Code"
                className={`w-full pl-3 pr-8 py-2.5 text-sm border rounded-figma-md focus:outline-none transition-all ${
                  errors.pinCode 
                    ? 'border-rose-400 bg-rose-50/10 focus:border-rose-500 focus:ring-2 focus:ring-rose-100' 
                    : 'border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100'
                }`}
              />
              <MapPin className="absolute right-3 top-3 w-4 h-4 text-slate-300" />
            </div>
            {errors.pinCode && <p className="text-xs text-rose-500 mt-1 font-medium">{errors.pinCode}</p>}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={handleCancelClick}
            className="px-6 py-2.5 text-sm font-semibold text-slate-500 bg-white border border-slate-200 rounded-figma-md hover:bg-slate-50 hover:text-slate-800 transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center gap-1.5 px-6 py-2.5 text-sm font-semibold text-white bg-brand-500 border border-brand-500 rounded-figma-md hover:bg-brand-600 hover:border-brand-600 shadow-md hover:shadow-lg shadow-brand-100 transition-all cursor-pointer"
          >
            <span>Save Details</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
