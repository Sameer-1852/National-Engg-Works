import React from "react";
import { Search, Eye, Trash2 } from "lucide-react";

const ContactsPage = ({
  filteredEnquiries,
  enquirySearch,
  setEnquirySearch,
  enquiryStatusFilter,
  setEnquiryStatusFilter,
  enquiryTypeFilter,
  setEnquiryTypeFilter,
  enquiryTypes,
  ENQUIRY_STATUSES,
  getStatusBadge,
  setSelectedEnquiry,
  handleEnquiryStatusChange,
  handleDeleteEnquiry,
}) => {
  return (
    <div className="space-y-6">
      {/* Header Info Banner */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
        <div>
          <div className="text-[10px] font-mono-tech text-[#d97706] uppercase font-bold tracking-wider">
            CONTACT FORM INBOX
          </div>
          <h2 className="text-lg font-extrabold text-[#0f172a] mt-0.5">
            Website Contact Us Inquiries ({filteredEnquiries.length})
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Exclusively showing messages and engineering inquiries submitted directly from the website Contact Page.
          </p>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="relative w-full lg:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={enquirySearch}
              onChange={(e) => setEnquirySearch(e.target.value)}
              placeholder="Search name, email, phone, company, location, specs..."
              className="w-full h-10 pl-9 pr-3 rounded-lg bg-[#f8fafc] border border-slate-200 text-xs focus:outline-none focus:border-[#d97706]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={enquiryTypeFilter}
              onChange={(e) => setEnquiryTypeFilter(e.target.value)}
              className="h-10 px-3 rounded-lg border border-slate-200 text-xs font-semibold bg-white"
            >
              {enquiryTypes.map((t) => (
                <option key={t} value={t}>
                  {t === "All" ? "All Inquiry Sources" : t}
                </option>
              ))}
            </select>

            {["All", ...ENQUIRY_STATUSES].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setEnquiryStatusFilter(st)}
                className={`px-3 py-2 rounded-lg text-xs font-mono-tech font-bold cursor-pointer ${enquiryStatusFilter === st
                    ? "bg-[#0d1829] text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Us & Enquiries List */}
      {filteredEnquiries.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center border border-slate-200">
          <div className="max-w-md mx-auto space-y-2">
            <p className="text-base text-slate-800 font-bold">
              No Contact Page Submissions Yet
            </p>
            <p className="text-xs text-slate-500 leading-relaxed">
              Only submissions filled and submitted from the website Contact Page will appear here. When a user submits an inquiry on the Contact page, it will be displayed here in real time.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredEnquiries.map((enq) => (
            <div
              key={enq._id}
              className="bg-white rounded-xl p-6 border border-slate-200 shadow-2xs hover:border-slate-300 transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                <div className="space-y-3 flex-1">
                  {/* Top Badges */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded text-[10.5px] font-mono-tech font-bold border ${getStatusBadge(
                        enq.status
                      )}`}
                    >
                      {enq.status}
                    </span>
                    <span className="bg-[#0d1829] text-white text-[10.5px] font-mono-tech font-bold px-2.5 py-0.5 rounded">
                      {enq.enquiryType || "Direct Engineering Inquiry"}
                    </span>
                    {enq.engineeringDiscipline && (
                      <span className="bg-[#dce8f8] text-[#0f172a] text-[10.5px] font-mono-tech font-bold px-2.5 py-0.5 rounded">
                        {enq.engineeringDiscipline}
                      </span>
                    )}
                    <span className="text-xs font-mono-tech text-slate-400">
                      Submitted:{" "}
                      {new Date(enq.createdAt || Date.now()).toLocaleString()}
                    </span>
                  </div>

                  {/* Contact Person & Company Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-[#f8fafc] p-3.5 rounded-lg border border-slate-200/70 text-xs">
                    <div>
                      <div className="text-[10px] font-mono-tech text-slate-400 uppercase">
                        CONTACT PERSON &amp; ROLE
                      </div>
                      <div className="font-extrabold text-[#0f172a] mt-0.5">
                        {enq.customerName}
                      </div>
                      {enq.roleTitle && (
                        <div className="text-slate-600">{enq.roleTitle}</div>
                      )}
                    </div>

                    <div>
                      <div className="text-[10px] font-mono-tech text-slate-400 uppercase">
                        EMAIL &amp; DIRECT PHONE
                      </div>
                      <div className="font-mono-tech text-slate-800 mt-0.5 break-all">
                        {enq.email || "—"}
                      </div>
                      <div className="font-mono-tech text-slate-600">
                        {enq.phone || "—"}
                      </div>
                    </div>

                    <div>
                      <div className="text-[10px] font-mono-tech text-slate-400 uppercase">
                        COMPANY &amp; FACILITY PORT
                      </div>
                      <div className="font-bold text-[#0f172a] mt-0.5">
                        {enq.companyName || "—"}
                      </div>
                      <div className="text-slate-600">
                        {enq.facilityLocation || "—"}
                      </div>
                    </div>

                    <div>
                      <div className="text-[10px] font-mono-tech text-slate-400 uppercase">
                        MACHINERY OF REFERENCE
                      </div>
                      <div className="font-mono-tech font-bold text-[#d97706] mt-0.5">
                        {enq.machineryModel || "Turnkey / General"}
                      </div>
                      {enq.targetOutput && (
                        <div className="text-slate-600">
                          Output: {enq.targetOutput}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Message Preview */}
                  {enq.message && (
                    <div className="text-xs text-slate-700 leading-relaxed">
                      <strong className="text-[#0f172a]">
                        Operational Specifications / Message:
                      </strong>{" "}
                      {enq.message}
                    </div>
                  )}
                </div>

                {/* Right Actions */}
                <div className="flex sm:flex-row lg:flex-col items-stretch gap-2.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => setSelectedEnquiry(enq)}
                    className="bg-[#d97706] hover:bg-[#b45309] text-white font-bold text-xs uppercase px-4 py-2.5 rounded-lg inline-flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Read Full Information</span>
                  </button>

                  <select
                    value={enq.status}
                    onChange={(e) =>
                      handleEnquiryStatusChange(enq._id, e.target.value)
                    }
                    className="h-9 px-3 rounded-lg border border-slate-300 text-xs font-bold bg-white"
                  >
                    {ENQUIRY_STATUSES.map((st) => (
                      <option key={st} value={st}>
                        Status: {st}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    onClick={() => handleDeleteEnquiry(enq._id)}
                    className="h-9 px-3 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold inline-flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactsPage;
