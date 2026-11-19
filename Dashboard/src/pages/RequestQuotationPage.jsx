import React, { useState, useMemo } from "react";
import {
  Search,
  User,
  Mail,
  Phone,
  FileText,
  Eye,
  Trash2,
  Calendar,
} from "lucide-react";

const RequestQuotationPage = ({
  enquiries,
  ENQUIRY_STATUSES,
  getStatusBadge,
  setSelectedEnquiry,
  handleEnquiryStatusChange,
  handleDeleteEnquiry,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredQuotations = useMemo(() => {
    return enquiries.filter((item) => {
      if (statusFilter !== "All" && item.status !== statusFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          (item.customerName || "").toLowerCase().includes(q) ||
          (item.email || "").toLowerCase().includes(q) ||
          (item.phone || "").toLowerCase().includes(q) ||
          (item.machineryModel || "").toLowerCase().includes(q) ||
          (item.companyName || "").toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [enquiries, statusFilter, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Top KPI Summary Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs flex items-center justify-between">
          <div>
            <div className="text-[10.5px] font-mono-tech text-slate-400 uppercase font-bold">
              TOTAL QUOTATION REQUESTS
            </div>
            <div className="text-3xl font-extrabold text-[#0f172a] mt-1">
              {enquiries.length}
            </div>
            <div className="text-xs text-emerald-600 font-semibold mt-1">
              ● Live Client Submissions
            </div>
          </div>
          <div className="w-11 h-11 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-[#d97706]">
            <FileText className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs flex items-center justify-between">
          <div>
            <div className="text-[10.5px] font-mono-tech text-slate-400 uppercase font-bold">
              NEW / PENDING QUOTATIONS
            </div>
            <div className="text-3xl font-extrabold text-[#d97706] mt-1">
              {
                enquiries.filter(
                  (e) => e.status === "New" || e.status === "Pending"
                ).length
              }
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Awaiting quotation response
            </div>
          </div>
          <div className="w-11 h-11 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
            <Phone className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs flex items-center justify-between">
          <div>
            <div className="text-[10.5px] font-mono-tech text-slate-400 uppercase font-bold">
              CONTACTED / COMPLETED
            </div>
            <div className="text-3xl font-extrabold text-emerald-600 mt-1">
              {
                enquiries.filter(
                  (e) =>
                    e.status === "Contacted" ||
                    e.status === "In Progress" ||
                    e.status === "Completed"
                ).length
              }
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Processed by engineering team
            </div>
          </div>
          <div className="w-11 h-11 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
            <Mail className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="relative w-full lg:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Client Name, Email, Mobile Number..."
            className="w-full h-10 pl-9 pr-4 rounded-lg bg-[#f8fafc] border border-slate-200 text-xs focus:outline-none focus:border-[#d97706]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {["All", ...ENQUIRY_STATUSES].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-mono-tech font-bold transition-colors cursor-pointer ${statusFilter === st
                  ? "bg-[#0d1829] text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
            >
              {st.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Request Quotation Data Table (Client Name, Email, Mobile Number) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="text-[10px] font-mono-tech text-[#d97706] uppercase font-bold">
              CLIENT QUOTATION SUBMISSIONS
            </div>
            <h3 className="text-base font-extrabold text-[#0f172a]">
              Request Quotation Client Directory ({filteredQuotations.length})
            </h3>
          </div>
          <span className="text-xs font-mono-tech text-slate-500">
            Showing Client Name, Email &amp; Mobile Number
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#0d1829] text-white font-mono-tech text-[10.5px] uppercase">
                <th className="py-3.5 px-4">#</th>
                <th className="py-3.5 px-4">CLIENT NAME</th>
                <th className="py-3.5 px-4">EMAIL ADDRESS</th>
                <th className="py-3.5 px-4">MOBILE NUMBER</th>
                <th className="py-3.5 px-4">DATE</th>
                <th className="py-3.5 px-4">STATUS</th>
                <th className="py-3.5 px-4 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredQuotations.map((item, index) => (
                <tr key={item._id || index} className="hover:bg-slate-50 transition-colors">
                  {/* Serial No */}
                  <td className="py-4 px-4 font-mono-tech font-bold text-slate-400">
                    {String(index + 1).padStart(2, "0")}
                  </td>

                  {/* Client Name */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-amber-100 border border-amber-300 text-[#d97706] flex items-center justify-center font-extrabold text-xs shrink-0">
                        {(item.customerName || "C").charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-extrabold text-[#0f172a] text-sm">
                          {item.customerName || "—"}
                        </div>
                        {item.companyName && (
                          <div className="text-[11px] text-slate-500 font-medium">
                            {item.companyName}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Email Address */}
                  <td className="py-4 px-4">
                    {item.email ? (
                      <a
                        href={`mailto:${item.email}`}
                        className="inline-flex items-center gap-1.5 font-mono-tech text-xs font-semibold text-blue-700 hover:text-[#d97706] bg-blue-50/70 px-2.5 py-1.5 rounded border border-blue-200/70"
                      >
                        <Mail className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>{item.email}</span>
                      </a>
                    ) : (
                      <span className="text-slate-400 italic">Not provided</span>
                    )}
                  </td>

                  {/* Mobile Number */}
                  <td className="py-4 px-4">
                    {item.phone ? (
                      <a
                        href={`tel:${item.phone}`}
                        className="inline-flex items-center gap-1.5 font-mono-tech text-xs font-bold text-emerald-800 hover:text-[#d97706] bg-emerald-50 px-2.5 py-1.5 rounded border border-emerald-200"
                      >
                        <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{item.phone}</span>
                      </a>
                    ) : (
                      <span className="text-slate-400 italic">Not provided</span>
                    )}
                  </td>

                  {/* Date */}
                  <td className="py-4 px-4 font-mono-tech text-[11px] text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>
                        {item.createdAt
                          ? new Date(item.createdAt).toLocaleDateString()
                          : "Recent"}
                      </span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="py-4 px-4">
                    <select
                      value={item.status || "New"}
                      onChange={(e) =>
                        handleEnquiryStatusChange(item._id, e.target.value)
                      }
                      className={`px-2.5 py-1 rounded text-[11px] font-mono-tech font-bold border focus:outline-none cursor-pointer ${getStatusBadge(
                        item.status
                      )}`}
                    >
                      {ENQUIRY_STATUSES.map((s) => (
                        <option
                          key={s}
                          value={s}
                          className="bg-white text-slate-900"
                        >
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-4 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setSelectedEnquiry(item)}
                        className="inline-flex items-center gap-1.5 bg-[#0d1829] hover:bg-[#d97706] text-white font-bold text-[11px] px-3 py-1.5 rounded transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteEnquiry(item._id)}
                        className="p-1.5 rounded bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition-colors cursor-pointer"
                        title="Delete Request Quotation"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredQuotations.length === 0 && (
            <div className="p-12 text-center">
              <User className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-bold text-slate-700">
                No Request Quotation records found.
              </p>
              <p className="text-xs text-slate-500 mt-1">
                When clients submit a Request Quotation with their Name, Email,
                and Mobile Number, it will appear here immediately.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestQuotationPage;
