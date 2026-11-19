import React from "react";
import { X, Trash2 } from "lucide-react";

const ContactDetailModal = ({
  selectedEnquiry,
  onClose,
  ENQUIRY_STATUSES,
  getStatusBadge,
  handleEnquiryStatusChange,
  handleDeleteEnquiry,
}) => {
  if (!selectedEnquiry) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Dark Navy Header */}
        <div className="bg-[#0d1829] text-white px-7 py-5 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono-tech text-[#f59e0b] uppercase font-bold">
              FULL CONTACT US &amp; ENGINEERING DOSSIER • RECORD ID:{" "}
              {selectedEnquiry._id}
            </div>
            <h3 className="text-xl font-extrabold text-white mt-0.5">
              {selectedEnquiry.customerName}{" "}
              {selectedEnquiry.companyName &&
                `— ${selectedEnquiry.companyName}`}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Full Details Body */}
        <div className="p-7 space-y-6">
          {/* Status Bar */}
          <div className="bg-[#f8fafc] p-4 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1 rounded text-xs font-mono-tech font-bold border ${getStatusBadge(
                  selectedEnquiry.status
                )}`}
              >
                CURRENT STATUS: {selectedEnquiry.status}
              </span>
              <span className="text-xs font-mono-tech text-slate-500">
                Received:{" "}
                {new Date(
                  selectedEnquiry.createdAt || Date.now()
                ).toLocaleString()}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700">
                Update Status:
              </span>
              <select
                value={selectedEnquiry.status}
                onChange={(e) =>
                  handleEnquiryStatusChange(selectedEnquiry._id, e.target.value)
                }
                className="h-9 px-3 rounded-lg border border-slate-300 text-xs font-bold bg-white"
              >
                {ENQUIRY_STATUSES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 12-Field Complete Information Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200/80">
              <div className="text-[10px] font-mono-tech text-slate-400 uppercase">
                FULL CONTACT NAME
              </div>
              <div className="font-extrabold text-[#0f172a] text-sm mt-1">
                {selectedEnquiry.customerName || "—"}
              </div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200/80">
              <div className="text-[10px] font-mono-tech text-slate-400 uppercase">
                CORPORATE TITLE / ROLE
              </div>
              <div className="font-bold text-[#0f172a] text-sm mt-1">
                {selectedEnquiry.roleTitle || "Plant / Procurement Executive"}
              </div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200/80">
              <div className="text-[10px] font-mono-tech text-slate-400 uppercase">
                CONGLOMERATE / COMPANY NAME
              </div>
              <div className="font-bold text-[#0f172a] text-sm mt-1">
                {selectedEnquiry.companyName || "—"}
              </div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200/80">
              <div className="text-[10px] font-mono-tech text-slate-400 uppercase">
                WORK / CORPORATE EMAIL
              </div>
              <div className="font-mono-tech font-bold text-blue-700 mt-1 break-all">
                {selectedEnquiry.email || "—"}
              </div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200/80">
              <div className="text-[10px] font-mono-tech text-slate-400 uppercase">
                DIRECT PHONE &amp; COUNTRY CODE
              </div>
              <div className="font-mono-tech font-bold text-[#0f172a] mt-1">
                {selectedEnquiry.phone || "—"}
              </div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200/80">
              <div className="text-[10px] font-mono-tech text-slate-400 uppercase">
                FACILITY LOCATION &amp; TARGET PORT
              </div>
              <div className="font-bold text-[#0f172a] mt-1">
                {selectedEnquiry.facilityLocation || "—"}
              </div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200/80">
              <div className="text-[10px] font-mono-tech text-slate-400 uppercase">
                INQUIRY SOURCE FORM
              </div>
              <div className="font-mono-tech font-bold text-[#334e68] mt-1">
                {selectedEnquiry.enquiryType || "Direct Engineering Inquiry"}
              </div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200/80">
              <div className="text-[10px] font-mono-tech text-slate-400 uppercase">
                ENGINEERING DISCIPLINE / REQUEST TYPE
              </div>
              <div className="font-bold text-[#0f172a] mt-1">
                {selectedEnquiry.engineeringDiscipline ||
                  "Turnkey Line / Machinery Quotation"}
              </div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200/80">
              <div className="text-[10px] font-mono-tech text-slate-400 uppercase">
                MACHINERY SYSTEM OF REFERENCE
              </div>
              <div className="font-mono-tech font-bold text-[#d97706] mt-1">
                {selectedEnquiry.machineryModel || "Multi-Section Line"}
              </div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200/80">
              <div className="text-[10px] font-mono-tech text-slate-400 uppercase">
                REQUIRED QUANTITY
              </div>
              <div className="font-bold text-[#0f172a] mt-1">
                {selectedEnquiry.quantity || "1 Unit"}
              </div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200/80">
              <div className="text-[10px] font-mono-tech text-slate-400 uppercase">
                TARGET DAILY OUTPUT VOLUME
              </div>
              <div className="font-bold text-[#0f172a] mt-1">
                {selectedEnquiry.targetOutput || "—"}
              </div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200/80">
              <div className="text-[10px] font-mono-tech text-slate-400 uppercase">
                ESTIMATED BUDGET / FLOOR SPACE
              </div>
              <div className="font-bold text-[#0f172a] mt-1">
                {selectedEnquiry.budget ||
                  selectedEnquiry.floorSpace ||
                  "Standard Enterprise Quote"}
              </div>
            </div>
          </div>

          {/* Compliance & Documentation Checkboxes */}
          <div className="flex flex-wrap gap-3 text-xs font-mono-tech">
            <span
              className={`px-3 py-1.5 rounded border ${
                selectedEnquiry.ndaRequested
                  ? "bg-emerald-50 border-emerald-300 text-emerald-800 font-bold"
                  : "bg-slate-100 border-slate-200 text-slate-500"
              }`}
            >
              {selectedEnquiry.ndaRequested ? "✓" : "•"} Mutual NDA Requested
            </span>
            <span
              className={`px-3 py-1.5 rounded border ${
                selectedEnquiry.sendSpecBook
                  ? "bg-emerald-50 border-emerald-300 text-emerald-800 font-bold"
                  : "bg-slate-100 border-slate-200 text-slate-500"
              }`}
            >
              {selectedEnquiry.sendSpecBook ? "✓" : "•"} 2024 Machinery Spec Book
              PDF Requested
            </span>
            <span
              className={`px-3 py-1.5 rounded border ${
                selectedEnquiry.includeBimFiles
                  ? "bg-emerald-50 border-emerald-300 text-emerald-800 font-bold"
                  : "bg-slate-100 border-slate-200 text-slate-500"
              }`}
            >
              {selectedEnquiry.includeBimFiles ? "✓" : "•"} 2D/3D BIM &amp; CAD
              Layout Files Included
            </span>
          </div>

          {/* Full Operational Specifications / Message Box */}
          <div>
            <div className="text-xs font-mono-tech font-bold uppercase text-[#334e68] mb-2">
              Full Detailed Inquiry / Operational Specifications Message
            </div>
            <div className="bg-[#f8fafc] p-4 rounded-xl border border-slate-200 text-sm text-slate-800 leading-relaxed whitespace-pre-wrap">
              {selectedEnquiry.message ||
                "No additional message notes provided."}
            </div>
          </div>

          {/* Modal Actions */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <button
              type="button"
              onClick={() => handleDeleteEnquiry(selectedEnquiry._id)}
              className="px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete Inquiry Record</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-lg bg-[#0d1829] hover:bg-slate-800 text-white text-xs font-bold uppercase cursor-pointer"
            >
              Close Full Dossier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetailModal;
