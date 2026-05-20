import React, { useState } from 'react';
import { Search, Sparkles, Plus, Bell, ChevronDown, Menu, X, Settings } from 'lucide-react';

export default function Navbar({ onSearch }) {
  const [searchValue, setSearchValue] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchValue);
  };

  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-slate-100 px-4 md:px-8 py-3.5 flex items-center justify-between">
      {/* Brand & Search Container */}
      <div className="flex items-center gap-6 flex-1 max-w-xl">
        <form onSubmit={handleSearchSubmit} className="relative w-full">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Find influencers to collaborate with"
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-figma-md text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition-all font-sans"
          />
          <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400 pointer-events-none" />
        </form>
      </div>

      {/* Desktop Navigation Items */}
      <div className="hidden lg:flex items-center gap-4">
        {/* Upgrade Button */}
        <button className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white rounded-figma-md text-sm font-semibold shadow-sm hover:shadow transition-all font-sans cursor-pointer">
          <Sparkles className="w-4 h-4 fill-white/20" />
          <span>Upgrade</span>
        </button>

        {/* Create Campaign Button */}
        <button className="flex items-center gap-1.5 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-figma-md text-sm font-semibold shadow-sm hover:shadow transition-all font-sans cursor-pointer">
          <Plus className="w-4 h-4" />
          <span>Create campaign</span>
        </button>

        {/* Notification Icon */}
        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-figma-md transition-colors relative cursor-pointer">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-slate-200"></div>

        {/* Profile Dropdown */}
        <button className="flex items-center gap-2.5 pl-1.5 py-1 pr-2 hover:bg-slate-50 rounded-full transition-all cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center font-heading text-xs font-bold shadow-inner">
            RP
          </div>
          <span className="text-sm font-medium text-slate-700 hidden xl:inline">Rakesh</span>
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </button>
      </div>

      {/* Mobile Actions / Hamburger Menu button */}
      <div className="flex lg:hidden items-center gap-3">
        <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-figma-md">
          <Bell className="w-5 h-5" />
        </button>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-figma-md"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer menu */}
      {mobileMenuOpen && (
        <div className="absolute top-[61px] left-0 right-0 bg-white border-b border-slate-200 shadow-xl p-4 flex flex-col gap-3 lg:hidden z-50 animate-fade-in">
          <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 text-white rounded-figma-md text-sm font-semibold shadow-sm">
            <Sparkles className="w-4 h-4" />
            <span>Upgrade Account</span>
          </button>
          
          <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-brand-500 text-white rounded-figma-md text-sm font-semibold shadow-sm">
            <Plus className="w-4 h-4" />
            <span>Create Campaign</span>
          </button>

          <div className="w-full h-px bg-slate-100 my-1"></div>

          <div className="flex items-center gap-3 py-1">
            <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-heading text-sm font-bold shadow-inner">
              RP
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">Rakesh P.</p>
              <p className="text-xs text-slate-400">Collaborator</p>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
