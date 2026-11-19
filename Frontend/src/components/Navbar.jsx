import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ShieldCheck,
  Cog,
  Phone,
  MessageSquare,
  FileText,
  Menu,
  X,
  ChevronDown,
  LayoutDashboard,
} from "lucide-react";
import { useApp } from "../context/AppContext";

const Navbar = () => {
  const location = useLocation();
  const { openQuoteModal } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsDropdown, setSolutionsDropdown] = useState(false);

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Top Dark Industrial Utility Bar */}
      <div className="bg-[#0d1829] text-slate-300 text-[11px] font-mono-tech py-2 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-[1240px] mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-slate-200 tracking-wide">
              <ShieldCheck className="w-3.5 h-3.5 text-[#d97706]" />
              ISO 9001:2015 CERTIFIED FACILITY
            </span>
            <span className="text-slate-600">•</span>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-slate-300 tracking-wide">
              <Cog className="w-3.5 h-3.5 text-slate-400" />
              HEAVY-DUTY INDUSTRIAL GRADE
            </span>
          </div>

          <div className="flex items-center gap-5">
            <a
              href="tel:+18004927325"
              className="inline-flex items-center gap-1.5 text-slate-200 hover:text-[#d97706] transition-colors"
            >
              <Phone className="w-3 h-3 text-slate-400" />
              <span>GLOBAL DESK: +1 (800) 492-7325</span>
            </a>
            <a
              href="https://wa.me/13125552253"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-[#f59e0b] hover:text-amber-300 font-medium transition-colors"
            >
              <MessageSquare className="w-3 h-3" />
              <span>WHATSAPP DISPATCH</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main White/Ice Navigation Bar */}
      <div className="bg-[#f8fafd]/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8 h-18 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <img
              src="/images/logo.png"
              alt="NEW – National Engineering Works"
              className="h-12 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-[13.5px] font-medium text-slate-700">
            <Link
              to="/"
              className={`px-3 py-1.5 rounded transition-colors ${isActive("/") && location.pathname === "/"
                ? "bg-[#dbeafe] text-[#0f172a] font-bold"
                : "hover:text-[#0f172a] hover:bg-slate-100"
                }`}
            >
              Home
            </Link>

            <Link
              to="/products"
              className={`px-3 py-1.5 rounded transition-colors ${isActive("/products")
                ? "bg-[#dbeafe] text-[#0f172a] font-bold"
                : "hover:text-[#0f172a] hover:bg-slate-100"
                }`}
            >
              Products
            </Link>

            {/* Solutions Dropdown for the 3 Growth Stage Pages */}
            <div
              className="relative"
              onMouseEnter={() => setSolutionsDropdown(true)}
              onMouseLeave={() => setSolutionsDropdown(false)}
            >
              <button
                type="button"
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded transition-colors cursor-pointer ${isActive("/solutions")
                  ? "bg-[#dbeafe] text-[#0f172a] font-bold"
                  : "hover:text-[#0f172a] hover:bg-slate-100"
                  }`}
              >
                <span>Solutions</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-75" />
              </button>

              {solutionsDropdown && (
                <div className="absolute left-0 top-full pt-1.5 w-68 z-50">
                  <div className="bg-white rounded-lg shadow-xl border border-slate-200 py-2 overflow-hidden">
                    <Link
                      to="/solutions/start-your-business"
                      onClick={() => setSolutionsDropdown(false)}
                      className="block px-4 py-2.5 hover:bg-slate-50 transition-colors border-b border-slate-100"
                    >
                      {/* <div className="text-xs font-mono-tech text-[#d97706] font-semibold">
                        STAGE 01 • STARTUP ADVISORY
                      </div> */}
                      <div className="text-sm font-bold text-slate-900">
                        Start Your Bakery Business
                      </div>
                    </Link>
                    <Link
                      to="/solutions/find-machinery"
                      onClick={() => setSolutionsDropdown(false)}
                      className="block px-4 py-2.5 hover:bg-slate-50 transition-colors border-b border-slate-100"
                    >
                      {/* <div className="text-xs font-mono-tech text-[#d97706] font-semibold">
                        STAGE 02 • EQUIPMENT SELECTOR
                      </div> */}
                      <div className="text-sm font-bold text-slate-900">
                        Find Your Exact Machinery
                      </div>
                    </Link>
                    <Link
                      to="/solutions/upgrade-scale"
                      onClick={() => setSolutionsDropdown(false)}
                      className="block px-4 py-2.5 hover:bg-slate-50 transition-colors"
                    >
                      {/* <div className="text-xs font-mono-tech text-[#d97706] font-semibold">
                        STAGE 03 • OEE RETROFIT
                      </div> */}
                      <div className="text-sm font-bold text-slate-900">
                        Upgrade & Scale Production
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/insights"
              className={`px-3 py-1.5 rounded transition-colors ${isActive("/insights")
                ? "bg-[#dbeafe] text-[#0f172a] font-bold"
                : "hover:text-[#0f172a] hover:bg-slate-100"
                }`}
            >
              Insights & Resources
            </Link>

            <Link
              to="/about"
              className={`px-3 py-1.5 rounded transition-colors ${isActive("/about")
                ? "bg-[#dbeafe] text-[#0f172a] font-bold"
                : "hover:text-[#0f172a] hover:bg-slate-100"
                }`}
            >
              About
            </Link>

            <Link
              to="/contact"
              className={`px-3 py-1.5 rounded transition-colors ${isActive("/contact")
                ? "bg-[#dbeafe] text-[#0f172a] font-bold"
                : "hover:text-[#0f172a] hover:bg-slate-100"
                }`}
            >
              Contact Us
            </Link>
          </nav>

          {/* Right CTA Button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              type="button"
              onClick={() => openQuoteModal()}
              className="inline-flex items-center gap-2 bg-[#d97706] hover:bg-[#b45309] text-white font-semibold text-xs tracking-wider uppercase px-5 py-3 rounded shadow-xs transition-all cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>REQUEST A QUOTE (RFQ)</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-slate-700 hover:bg-slate-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Responsive Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-5 space-y-2">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded font-semibold text-slate-800 hover:bg-slate-100"
            >
              Home
            </Link>
            <Link
              to="/products"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded font-semibold text-slate-800 hover:bg-slate-100"
            >
              Products Catalog
            </Link>
            <Link
              to="/solutions/start-your-business"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded font-medium text-slate-700 hover:bg-slate-100"
            >
              • Start Your Bakery Business
            </Link>
            <Link
              to="/solutions/find-machinery"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded font-medium text-slate-700 hover:bg-slate-100"
            >
              • Find Your Exact Machinery
            </Link>
            <Link
              to="/solutions/upgrade-scale"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded font-medium text-slate-700 hover:bg-slate-100"
            >
              • Upgrade & Scale Production
            </Link>
            <Link
              to="/insights"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded font-semibold text-slate-800 hover:bg-slate-100"
            >
              Insights & Resources
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded font-semibold text-slate-800 hover:bg-slate-100"
            >
              About Company
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded font-semibold text-slate-800 hover:bg-slate-100"
            >
              Contact Us
            </Link>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openQuoteModal();
              }}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-[#d97706] text-white font-semibold text-xs uppercase py-3 rounded"
            >
              <FileText className="w-4 h-4" />
              <span>REQUEST A QUOTE (RFQ)</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
