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
  User,
  AlertTriangle,
  Package,
  Sliders,
  Headphones,
  Copy,
  Check,
} from "lucide-react";
import { useApp } from "../context/AppContext";

const COMPANY_PHONE = "+91 98765 43210";
const COMPANY_PHONE_RAW = "+919876543210";

const Navbar = () => {
  const location = useLocation();
  const { openQuoteModal, showToast } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsDropdown, setSolutionsDropdown] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(COMPANY_PHONE);
    setCopiedPhone(true);
    if (showToast) {
      showToast("Company contact number copied to clipboard!");
    }
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full">
        {/* DESKTOP Top Dark Industrial Utility Bar */}
        <div className="hidden md:block bg-[#0d1829] text-slate-300 text-[11px] font-mono-tech py-2 px-4 sm:px-8 border-b border-slate-800">
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

        {/* Main Navigation Bar (Desktop + Mobile Header Matching Screenshot) */}
        <div className="bg-[#f8fafd]/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-8 h-14 md:h-18 flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
              <img
                src="/images/logo.png"
                alt="NEW – National Engineering Works"
                className="h-9 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 text-[13.5px] font-medium text-slate-700">
              <Link
                to="/"
                className={`px-3 py-1.5 rounded transition-colors ${
                  isActive("/") && location.pathname === "/"
                    ? "bg-[#dbeafe] text-[#0f172a] font-bold"
                    : "hover:text-[#0f172a] hover:bg-slate-100"
                }`}
              >
                Home
              </Link>

              <Link
                to="/products"
                className={`px-3 py-1.5 rounded transition-colors ${
                  isActive("/products")
                    ? "bg-[#dbeafe] text-[#0f172a] font-bold"
                    : "hover:text-[#0f172a] hover:bg-slate-100"
                }`}
              >
                Products
              </Link>

              {/* Solutions Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setSolutionsDropdown(true)}
                onMouseLeave={() => setSolutionsDropdown(false)}
              >
                <button
                  type="button"
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded transition-colors cursor-pointer ${
                    isActive("/solutions")
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
                        <div className="text-sm font-bold text-slate-900">
                          Start Your Bakery Business
                        </div>
                      </Link>
                      <Link
                        to="/solutions/find-machinery"
                        onClick={() => setSolutionsDropdown(false)}
                        className="block px-4 py-2.5 hover:bg-slate-50 transition-colors border-b border-slate-100"
                      >
                        <div className="text-sm font-bold text-slate-900">
                          Find Your Exact Machinery
                        </div>
                      </Link>
                      <Link
                        to="/solutions/upgrade-scale"
                        onClick={() => setSolutionsDropdown(false)}
                        className="block px-4 py-2.5 hover:bg-slate-50 transition-colors"
                      >
                        <div className="text-sm font-bold text-slate-900">
                          Upgrade &amp; Scale Production
                        </div>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link
                to="/insights"
                className={`px-3 py-1.5 rounded transition-colors ${
                  isActive("/insights")
                    ? "bg-[#dbeafe] text-[#0f172a] font-bold"
                    : "hover:text-[#0f172a] hover:bg-slate-100"
                }`}
              >
                Insights &amp; Resources
              </Link>

              <Link
                to="/about"
                className={`px-3 py-1.5 rounded transition-colors ${
                  isActive("/about")
                    ? "bg-[#dbeafe] text-[#0f172a] font-bold"
                    : "hover:text-[#0f172a] hover:bg-slate-100"
                }`}
              >
                About
              </Link>

              <Link
                to="/contact"
                className={`px-3 py-1.5 rounded transition-colors ${
                  isActive("/contact")
                    ? "bg-[#dbeafe] text-[#0f172a] font-bold"
                    : "hover:text-[#0f172a] hover:bg-slate-100"
                }`}
              >
                Contact Us
              </Link>
            </nav>

            {/* Desktop Right CTA Button */}
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

            {/* MOBILE HEADER ICONS (MATCHING SCREENSHOT) */}
            <div className="flex md:hidden items-center gap-2">
              <button
                type="button"
                onClick={() => setIsContactModalOpen(true)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 active:scale-95 flex items-center justify-center text-slate-700 transition-all cursor-pointer"
                title="Call Desk"
                aria-label="Open Contact Pop-up"
              >
                <Phone className="w-4 h-4 text-slate-600" />
              </button>

              <button
                type="button"
                onClick={() => openQuoteModal()}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors cursor-pointer"
                title="Instant RFQ"
              >
                <MessageSquare className="w-4 h-4 text-slate-600" />
              </button>

              <Link
                to="/contact"
                className="w-8 h-8 rounded-full bg-[#0d1829] flex items-center justify-center text-white shadow-xs"
                title="User Profile / Contact"
              >
                <User className="w-4 h-4" />
              </Link>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1 rounded text-slate-700 hover:bg-slate-100 ml-1"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Responsive Hamburger Drawer (when clicked) */}
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
                • Upgrade &amp; Scale Production
              </Link>
              <Link
                to="/insights"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded font-semibold text-slate-800 hover:bg-slate-100"
              >
                Insights &amp; Resources
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

        {/* MOBILE SUB-BANNER STRIP (MATCHING SCREENSHOT) */}
        <div className="md:hidden bg-[#0d1829] text-white px-4 py-2 flex items-center justify-between text-[11px] font-mono-tech border-b border-slate-800">
          <div className="flex items-center gap-1.5 text-amber-400 font-bold tracking-wide">
            <AlertTriangle className="w-3.5 h-3.5 fill-[#f59e0b] text-[#0d1829]" />
            <span>24/7 SERVICE ACTIVE</span>
          </div>
          <button
            type="button"
            onClick={() => setIsContactModalOpen(true)}
            className="flex items-center gap-1.5 font-bold text-slate-200 hover:text-white cursor-pointer"
          >
            <Phone className="w-3 h-3 text-slate-400" />
            <span>{COMPANY_PHONE}</span>
          </button>
        </div>
      </header>

      {/* FIXED MOBILE BOTTOM NAVIGATION BAR (MATCHING SCREENSHOT) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 py-1.5 px-3 flex items-center justify-around shadow-[0_-4px_12px_rgba(0,0,0,0.06)]">
        <Link
          to="/products"
          className={`flex flex-col items-center gap-0.5 text-[9.5px] font-mono-tech font-bold uppercase transition-colors ${
            isActive("/products")
              ? "text-[#d97706]"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Package className="w-5 h-5" />
          <span>PRODUCTS</span>
        </Link>

        <Link
          to="/solutions/find-machinery"
          className={`flex flex-col items-center gap-0.5 text-[9.5px] font-mono-tech font-bold uppercase transition-colors ${
            isActive("/solutions")
              ? "text-[#d97706]"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Sliders className="w-5 h-5" />
          <span>SOLUTIONS</span>
        </Link>

        <button
          type="button"
          onClick={() => openQuoteModal()}
          className="flex flex-col items-center gap-0.5 text-[9.5px] font-mono-tech font-bold uppercase text-slate-600 hover:text-[#d97706] transition-colors cursor-pointer"
        >
          <FileText className="w-5 h-5" />
          <span>RFQ</span>
        </button>

        <Link
          to="/contact"
          className={`flex flex-col items-center gap-0.5 text-[9.5px] font-mono-tech font-bold uppercase transition-colors ${
            isActive("/contact")
              ? "text-[#d97706]"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Headphones className="w-5 h-5" />
          <span>CONTACT</span>
        </Link>
      </nav>

      {/* CONTACT POP-UP MODAL (MOBILE & DESKTOP ACCESSIBLE) */}
      {isContactModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setIsContactModalOpen(false)}
        >
          <div
            className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#0f172a] text-white p-5 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#d97706]/20 border border-[#d97706]/40 flex items-center justify-center text-[#d97706]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold tracking-tight">
                    Company Contact Hotline
                  </h3>
                  <p className="text-[11px] font-mono-tech text-slate-400">
                    National Engineering Works (ApexBake)
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsContactModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              <div className="text-center space-y-1">
                <span className="text-[10px] font-mono-tech uppercase font-bold text-[#334e68] tracking-widest bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200/60 inline-block">
                  24/7 Technical &amp; Sales Support
                </span>
                <p className="text-xs text-slate-600 mt-2">
                  Speak directly with our senior machinery engineers regarding equipment pricing, production plant integration, or replacement parts.
                </p>
              </div>

              {/* Company Contact Display Card */}
              <div className="bg-[#f4f8fd] border border-blue-200/80 rounded-xl p-4 flex flex-col items-center justify-center gap-2">
                <div className="text-[11px] font-mono-tech text-slate-500 font-semibold uppercase tracking-wider">
                  Company Contact Number
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold font-mono-tech text-[#0f172a] tracking-tight">
                  {COMPANY_PHONE}
                </div>
                <div className="text-[11px] text-emerald-600 font-medium flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Lines active • Instant dispatch
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5">
                {/* 1-Click Copy Number Button */}
                <button
                  type="button"
                  onClick={handleCopyPhone}
                  className={`w-full h-12 rounded-xl font-mono-tech font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-sm cursor-pointer ${
                    copiedPhone
                      ? "bg-emerald-600 text-white"
                      : "bg-[#0f172a] hover:bg-slate-800 text-white"
                  }`}
                >
                  {copiedPhone ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>NUMBER COPIED TO CLIPBOARD!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>COPY COMPANY NUMBER</span>
                    </>
                  )}
                </button>

                {/* Quick Direct Call & WhatsApp Row */}
                <div className="grid grid-cols-2 gap-2.5">
                  <a
                    href={`tel:${COMPANY_PHONE_RAW}`}
                    className="h-11 bg-[#486581] hover:bg-[#334e68] text-white font-mono-tech font-semibold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>DIRECT CALL</span>
                  </a>
                  <a
                    href={`https://wa.me/${COMPANY_PHONE_RAW.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-11 bg-[#25D366] hover:bg-[#20ba59] text-white font-mono-tech font-semibold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WHATSAPP</span>
                  </a>
                </div>
              </div>

              {/* Modal Footer note */}
              <div className="text-[11px] text-center text-slate-400 font-mono-tech">
                Available 24/7 • National Engineering Works
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
