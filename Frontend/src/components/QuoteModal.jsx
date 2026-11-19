import React, { useState } from "react";
import { X, ArrowRight } from "lucide-react";
import { useApp } from "../context/AppContext";

const QuoteModal = () => {
  const {
    isQuoteModalOpen,
    closeQuoteModal,
    selectedMachineForQuote,
    submitEnquiry,
    showToast,
  } = useApp();

  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!isQuoteModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName.trim() || !mobileNumber.trim()) {
      showToast("Please fill in your Full Name and Mobile Number.", "error");
      return;
    }

    try {
      setSubmitting(true);
      await submitEnquiry({
        customerName: fullName,
        phone: mobileNumber,
        email: email || "",
        enquiryType: "Machinery Quotation Popup",
        machineryModel: selectedMachineForQuote
          ? `${selectedMachineForQuote.modelCode || ""} ${selectedMachineForQuote.machineryName || ""}`.trim()
          : "General Industrial Machinery Quotation",
        message: selectedMachineForQuote
          ? `Popup quotation request for ${selectedMachineForQuote.machineryName} (${selectedMachineForQuote.modelCode})`
          : "Popup quotation request from header RFQ modal.",
      });
      showToast("Quotation request submitted! Our engineering desk will respond within 2 hours.");
      setFullName("");
      setMobileNumber("");
      setEmail("");
      closeQuoteModal();
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to submit quotation request.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/65 backdrop-blur-[2px] p-4">
      <div className="bg-white w-full max-w-[560px] rounded-md shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Dark Navy Header matching POP-UP Screen with Product Details.png */}
        <div className="bg-[#0d1829] px-7 py-5 flex items-center justify-between">
          <h3 className="text-white font-bold text-lg tracking-wide uppercase">
            REQUEST MACHINERY QUOTATION
          </h3>
          <button
            type="button"
            onClick={closeQuoteModal}
            className="text-slate-400 hover:text-white transition-colors p-1 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-7 pt-10 space-y-6">
          {selectedMachineForQuote && (
            <div className="bg-[#f1f5f9] border border-slate-200 px-3.5 py-2 rounded text-xs font-mono-tech text-slate-700 flex items-center justify-between">
              <span>
                SELECTED UNIT:{" "}
                <strong className="text-slate-900">
                  {selectedMachineForQuote.modelCode} — {selectedMachineForQuote.machineryName}
                </strong>
              </span>
            </div>
          )}

          {/* Field 1: FULL NAME / PLANT MANAGER * */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[11px] font-bold tracking-wider uppercase text-slate-800">
                FULL NAME / PLANT MANAGER <span className="text-red-500">*</span>
              </label>
              <span className="text-[10px] font-mono-tech text-slate-400 uppercase">
                REQUIRED
              </span>
            </div>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Robert Vance"
              className="w-full h-11 px-3.5 rounded bg-[#f8fafc] border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-[#d97706] focus:bg-white transition-colors"
            />
          </div>

          {/* Field 2: MOBILE NUMBER * */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[11px] font-bold tracking-wider uppercase text-slate-800">
                MOBILE NUMBER <span className="text-red-500">*</span>
              </label>
              <span className="text-[10px] font-mono-tech text-slate-400 uppercase">
                REQUIRED
              </span>
            </div>
            <input
              type="tel"
              required
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              placeholder="e.g. +1 (312) 555-0188"
              className="w-full h-11 px-3.5 rounded bg-[#f8fafc] border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-[#d97706] focus:bg-white transition-colors"
            />
          </div>

          {/* Field 3: EMAIL ADDRESS (OPTIONAL) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[11px] font-bold tracking-wider uppercase text-slate-800">
                EMAIL ADDRESS{" "}
                <span className="text-slate-400 font-normal">(OPTIONAL)</span>
              </label>
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. manager@bakeryplant.com"
              className="w-full h-11 px-3.5 rounded bg-[#f8fafc] border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-[#d97706] focus:bg-white transition-colors"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="w-full h-12 bg-[#d97706] hover:bg-[#b45309] disabled:opacity-60 text-white font-bold text-xs tracking-wider uppercase rounded flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <span>
                {submitting ? "SUBMITTING REQUEST..." : "SUBMIT QUOTATION REQUEST"}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuoteModal;
