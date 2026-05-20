import React from 'react';

export default function LayoutWrapper({ children }) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col w-full font-sans antialiased pb-12">
      {children}
    </div>
  );
}
