import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  User,
  Mail,
  Phone,
  FileText,
  Eye,
  Trash2,
  Calendar,
  CalendarDays,
  MessageSquare,
  Edit3,
  Check,
  X,
  Clock,
  Sparkles,
  ArrowUpDown,
  Filter,
  RotateCcw,
  ChevronDown,
} from "lucide-react";
import api from "../api";

const DISCUSSION_PRESETS = [
  "Quotation Sent",
  "Price Discussed",
  "Awaiting Plant Spec",
  "Demo Scheduled",
  "Follow-up Required",
];

const REQUEST_QUOTATION_STATUSES = ["New", "Pending", "Completed"];

const STATUS_FILTER_OPTIONS = [
  { label: "ALL", value: "All" },
  { label: "NEW", value: "New" },
  { label: "PENDING", value: "Pending" },
  { label: "COMPLETED", value: "Completed" },
];

const DATE_PRESETS = [
  { label: "All Dates", value: "all" },
  { label: "Today", value: "today" },
  { label: "Yesterday", value: "yesterday" },
  { label: "Last 7 Days", value: "week" },
  { label: "This Month", value: "month" },
  { label: "Custom Range", value: "custom" },
];

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

  // Date Filtering State
  const [dateFilter, setDateFilter] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortOrder, setSortOrder] = useState("desc"); // "desc" = newest first, "asc" = oldest first

  // Discussion Notes / Manual Messages state (keyed by quotation id)
  const [discussionNotes, setDiscussionNotes] = useState(() => {
    const initial = {};
    (enquiries || []).forEach((item) => {
      const key = item._id || item.id;
      if (key) {
        const stored = localStorage.getItem(`quotation_discussion_${key}`);
        initial[key] = stored || item.adminNotes || "";
      }
    });
    return initial;
  });

  // Draft state while typing in the manual discussion message input
  const [draftNotes, setDraftNotes] = useState({});
  // Track which quotation's discussion note is currently being edited
  const [editingNoteId, setEditingNoteId] = useState(null);
  // Track which quotation's discussion note is currently being saved
  const [savingId, setSavingId] = useState(null);
  // Track recently saved id for visual confirmation
  const [savedId, setSavedId] = useState(null);

  // Sync discussion notes when new enquiries are loaded
  useEffect(() => {
    setDiscussionNotes((prev) => {
      const updated = { ...prev };
      (enquiries || []).forEach((item) => {
        const key = item._id || item.id;
        if (key && updated[key] === undefined) {
          const stored = localStorage.getItem(`quotation_discussion_${key}`);
          updated[key] = stored || item.adminNotes || "";
        }
      });
      return updated;
    });
  }, [enquiries]);

  // Save manual discussion note to both MongoDB & localStorage
  const handleSaveDiscussion = async (id) => {
    const noteText = (
      draftNotes[id] !== undefined ? draftNotes[id] : discussionNotes[id] || ""
    ).trim();

    setSavingId(id);
    try {
      // 1. Immediately store in localStorage so it persists instantly
      localStorage.setItem(`quotation_discussion_${id}`, noteText);

      // 2. Persist to MongoDB through RequestQuotation API endpoint
      await api
        .put(`/quotations/${id}`, { adminNotes: noteText })
        .catch(() => api.put(`/enquiries/${id}`, { adminNotes: noteText }));

      // 3. Update local state
      setDiscussionNotes((prev) => ({ ...prev, [id]: noteText }));
      setEditingNoteId(null);
      setSavedId(id);
      setTimeout(() => setSavedId(null), 2500);
    } catch (err) {
      console.error("Failed to save quotation discussion note:", err);
      // Fallback: still keep saved locally
      setDiscussionNotes((prev) => ({ ...prev, [id]: noteText }));
      setEditingNoteId(null);
      setSavedId(id);
      setTimeout(() => setSavedId(null), 2500);
    } finally {
      setSavingId(null);
    }
  };

  const handleClearDateFilter = () => {
    setDateFilter("all");
    setStartDate("");
    setEndDate("");
  };

  // Filtered & Sorted Quotations
  const filteredQuotations = useMemo(() => {
    return (enquiries || [])
      .filter((item) => {
        // 1. Status Filter (Only All, New, Pending, Completed)
        if (statusFilter !== "All") {
          const currentSt = (item.status || "New").toLowerCase();
          const targetSt = statusFilter.toLowerCase();
          if (targetSt === "pending" || targetSt === "pendding") {
            if (currentSt !== "pending" && currentSt !== "pendding") return false;
          } else if (targetSt === "completed" || targetSt === "complate") {
            if (currentSt !== "completed" && currentSt !== "complate") return false;
          } else if (targetSt === "new") {
            if (currentSt !== "new") return false;
          } else if (currentSt !== targetSt) {
            return false;
          }
        }

        // 2. Date Filter
        if (dateFilter !== "all") {
          const itemDate = item.createdAt ? new Date(item.createdAt) : null;
          if (!itemDate || isNaN(itemDate.getTime())) {
            return false;
          }

          const now = new Date();
          const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
          const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

          if (dateFilter === "today") {
            if (itemDate < todayStart || itemDate > todayEnd) return false;
          } else if (dateFilter === "yesterday") {
            const yestStart = new Date(todayStart);
            yestStart.setDate(yestStart.getDate() - 1);
            const yestEnd = new Date(todayEnd);
            yestEnd.setDate(yestEnd.getDate() - 1);
            if (itemDate < yestStart || itemDate > yestEnd) return false;
          } else if (dateFilter === "week") {
            const weekStart = new Date(todayStart);
            weekStart.setDate(weekStart.getDate() - 7);
            if (itemDate < weekStart || itemDate > todayEnd) return false;
          } else if (dateFilter === "month") {
            const monthStart = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
            if (itemDate < monthStart || itemDate > todayEnd) return false;
          } else if (dateFilter === "custom") {
            if (startDate) {
              const start = new Date(startDate);
              start.setHours(0, 0, 0, 0);
              if (itemDate < start) return false;
            }
            if (endDate) {
              const end = new Date(endDate);
              end.setHours(23, 59, 59, 999);
              if (itemDate > end) return false;
            }
          }
        }

        // 3. Search Query Filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const key = item._id || item.id;
          const note = (discussionNotes[key] || item.adminNotes || "").toLowerCase();
          return (
            (item.customerName || "").toLowerCase().includes(q) ||
            (item.email || "").toLowerCase().includes(q) ||
            (item.phone || "").toLowerCase().includes(q) ||
            (item.machineryModel &&
              !item.machineryModel
                .toLowerCase()
                .includes("general industrial machinery quotation")
              ? item.machineryModel
              : ""
            )
              .toLowerCase()
              .includes(q) ||
            (item.companyName || "").toLowerCase().includes(q) ||
            note.includes(q)
          );
        }
        return true;
      })
      .sort((a, b) => {
        const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return sortOrder === "asc" ? timeA - timeB : timeB - timeA;
      });
  }, [
    enquiries,
    statusFilter,
    dateFilter,
    startDate,
    endDate,
    sortOrder,
    searchQuery,
    discussionNotes,
  ]);

  const activeDiscussionsCount = useMemo(() => {
    return Object.values(discussionNotes).filter((n) => n && n.trim().length > 0)
      .length;
  }, [discussionNotes]);

  const isDateFiltered = dateFilter !== "all" || Boolean(startDate || endDate);

  return (
    <div className="space-y-6">
      {/* Top KPI Summary Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
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
              COMPLETED QUOTATIONS
            </div>
            <div className="text-3xl font-extrabold text-emerald-600 mt-1">
              {
                enquiries.filter(
                  (e) =>
                    e.status === "Completed" || e.status === "Complate"
                ).length
              }
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Processed &amp; quotation completed
            </div>
          </div>
          <div className="w-11 h-11 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
            <Mail className="w-5 h-5" />
          </div>
        </div>

        {/* Feature KPI: Client Discussions */}
        <div className="bg-white rounded-xl p-5 border border-amber-200 shadow-2xs flex items-center justify-between bg-gradient-to-br from-white to-amber-50/40">
          <div>
            <div className="text-[10.5px] font-mono-tech text-[#d97706] uppercase font-bold">
              CLIENT DISCUSSIONS LOGGED
            </div>
            <div className="text-3xl font-extrabold text-[#0f172a] mt-1">
              {activeDiscussionsCount}
            </div>
            <div className="text-xs text-amber-700 font-semibold mt-1">
              What is being discussed with client
            </div>
          </div>
          <div className="w-11 h-11 rounded-lg bg-amber-100 border border-amber-300 flex items-center justify-center text-[#d97706]">
            <MessageSquare className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Search, Date Filter Dropdown & Status Filter Controls */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs space-y-4">
        {/* Top Controls: Search, Date Filter Dropdown, Sorting, & Status Pills */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          {/* Left Group: Search Bar, Date Filter Dropdown, Custom Pickers & Reset */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by Client, Email, Phone, Discussion Notes..."
                className="w-full h-10 pl-9 pr-4 rounded-lg bg-[#f8fafc] border border-slate-200 text-xs focus:outline-none focus:border-[#d97706]"
              />
            </div>

            {/* DATE FILTER CONVERTED TO DROPDOWN MENU */}
            <div className="relative inline-flex items-center">
              <CalendarDays className="w-4 h-4 text-[#d97706] absolute left-3 pointer-events-none" />
              <select
                value={dateFilter}
                onChange={(e) => {
                  setDateFilter(e.target.value);
                  if (e.target.value !== "custom") {
                    setStartDate("");
                    setEndDate("");
                  }
                }}
                className="h-10 pl-9 pr-8 rounded-lg bg-[#f8fafc] border border-slate-200 text-xs font-mono-tech font-bold text-[#0f172a] focus:outline-none focus:border-[#d97706] cursor-pointer appearance-none hover:bg-slate-100 transition-colors shadow-2xs"
              >
                {DATE_PRESETS.map((preset) => (
                  <option key={preset.value} value={preset.value} className="bg-white text-slate-900 py-1">
                    Date: {preset.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 pointer-events-none" />
            </div>

            {/* Custom Date Range Pickers (Shown when Custom Range is selected in dropdown) */}
            {dateFilter === "custom" && (
              <div className="flex items-center gap-1.5 bg-[#f8fafc] px-3 py-1.5 rounded-lg border border-amber-300 shadow-2xs animate-in fade-in duration-150">
                <span className="text-[10px] font-mono-tech text-slate-500 font-bold">FROM:</span>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-transparent text-xs font-mono-tech text-[#0f172a] focus:outline-none cursor-pointer"
                />
                <span className="text-slate-300">—</span>
                <span className="text-[10px] font-mono-tech text-slate-500 font-bold">TO:</span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="bg-transparent text-xs font-mono-tech text-[#0f172a] focus:outline-none cursor-pointer"
                />
              </div>
            )}

            {/* Reset Date Filter Button */}
            {isDateFiltered && (
              <button
                type="button"
                onClick={handleClearDateFilter}
                className="inline-flex items-center gap-1 text-[11px] font-mono-tech text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-2.5 py-2 rounded-lg border border-red-200 transition-colors cursor-pointer font-bold"
                title="Reset date filter to All Dates"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Date</span>
              </button>
            )}

            {/* Date Sort Order Toggle */}
            <button
              type="button"
              onClick={() =>
                setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"))
              }
              className="inline-flex items-center gap-1.5 bg-[#f8fafc] hover:bg-slate-100 text-slate-700 font-mono-tech text-xs font-bold px-3 py-2 rounded-lg border border-slate-200 transition-colors cursor-pointer"
              title="Toggle date sorting order"
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-[#d97706]" />
              <span>{sortOrder === "desc" ? "Newest First" : "Oldest First"}</span>
            </button>
          </div>

          {/* Right Group: Status Filter Pills (Only ALL, NEW, PENDING, COMPLETED) */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2 xl:pt-0">
            <span className="text-[10.5px] font-mono-tech text-slate-400 font-bold uppercase mr-1">
              Status:
            </span>
            {STATUS_FILTER_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setStatusFilter(opt.value)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-mono-tech font-bold transition-colors cursor-pointer ${
                  statusFilter === opt.value
                    ? "bg-[#0d1829] text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Request Quotation Data Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="text-[10px] font-mono-tech text-[#d97706] uppercase font-bold flex items-center gap-1.5">
              <span>CLIENT QUOTATION SUBMISSIONS</span>
              {isDateFiltered && (
                <span className="bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded font-bold text-[9.5px]">
                  Filtered by Date ({filteredQuotations.length} results)
                </span>
              )}
            </div>
            <h3 className="text-base font-extrabold text-[#0f172a]">
              Request Quotation Client Directory ({filteredQuotations.length})
            </h3>
          </div>
          <span className="text-xs font-mono-tech text-slate-500">
            Showing Client Information, Date, Live Status &amp; Client Discussion Notes
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
                <th className="py-3.5 px-4">
                  <button
                    type="button"
                    onClick={() =>
                      setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"))
                    }
                    className="inline-flex items-center gap-1 hover:text-amber-300 transition-colors uppercase font-mono-tech cursor-pointer"
                    title="Click to toggle Date sort order"
                  >
                    <span>DATE</span>
                    <ArrowUpDown className="w-3 h-3 text-amber-400" />
                  </button>
                </th>
                <th className="py-3.5 px-4">STATUS</th>
                <th className="py-3.5 px-4 min-w-[340px] max-w-[440px]">
                  <div className="flex items-center gap-1.5 text-amber-300">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WHAT IS BEING DISCUSSED WITH THE CLIENT?</span>
                  </div>
                </th>
                <th className="py-3.5 px-4 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredQuotations.map((item, index) => {
                const itemKey = item._id || item.id || `idx-${index}`;
                const currentNote = discussionNotes[itemKey] || item.adminNotes || "";
                const isEditing = editingNoteId === itemKey;
                const isSaving = savingId === itemKey;
                const isJustSaved = savedId === itemKey;
                const draftValue =
                  draftNotes[itemKey] !== undefined ? draftNotes[itemKey] : currentNote;

                return (
                  <tr
                    key={itemKey}
                    className="hover:bg-slate-50/80 transition-colors align-top"
                  >
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
                          {item.machineryModel &&
                            !item.machineryModel
                              .toLowerCase()
                              .includes("general industrial machinery quotation") && (
                              <div className="text-[10px] font-mono-tech text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded mt-1 inline-block border border-amber-200">
                                {item.machineryModel}
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

                    {/* Date with formatted date & time */}
                    <td className="py-4 px-4 font-mono-tech text-[11px] text-slate-600 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="font-semibold text-slate-800">
                          {item.createdAt
                            ? new Date(item.createdAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })
                            : "Recent"}
                        </span>
                      </div>
                      {item.createdAt && (
                        <div className="text-[10px] text-slate-400 font-mono-tech ml-5">
                          {new Date(item.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      )}
                    </td>

                    {/* Status Select (Only New, Pending, Completed) */}
                    <td className="py-4 px-4">
                      <select
                        value={
                          item.status === "Completed" || item.status === "Complate"
                            ? "Completed"
                            : item.status === "Pending" || item.status === "Pendding"
                            ? "Pending"
                            : "New"
                        }
                        onChange={(e) =>
                          handleEnquiryStatusChange(item._id || item.id, e.target.value)
                        }
                        className={`px-2.5 py-1 rounded text-[11px] font-mono-tech font-bold border focus:outline-none cursor-pointer ${getStatusBadge(
                          item.status
                        )}`}
                      >
                        {REQUEST_QUOTATION_STATUSES.map((s) => (
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

                    {/* STATUS SIDE: Manual Message Option: "What is being discussed with the client?" */}
                    <td className="py-4 px-4 min-w-[340px] max-w-[440px]">
                      {isEditing ? (
                        /* Editing / Manual Typing View */
                        <div className="bg-amber-50/70 border border-amber-300 rounded-lg p-2.5 shadow-2xs space-y-2">
                          <div className="flex items-center justify-between text-[10.5px] font-mono-tech text-slate-600">
                            <span className="font-bold text-[#0f172a] flex items-center gap-1">
                              <MessageSquare className="w-3 h-3 text-[#d97706]" />
                              What is being discussed with the client?
                            </span>
                            {currentNote && (
                              <button
                                type="button"
                                onClick={() => setEditingNoteId(null)}
                                className="text-slate-400 hover:text-slate-600 cursor-pointer"
                                title="Close without saving"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>

                          <textarea
                            rows={2}
                            value={draftValue}
                            onChange={(e) =>
                              setDraftNotes({
                                ...draftNotes,
                                [itemKey]: e.target.value,
                              })
                            }
                            placeholder="Type what is being discussed with the client (e.g., Quotation shared via email, requested discount for 2 units, follow-up call on Friday)..."
                            className="w-full p-2 text-xs rounded-lg bg-white border border-slate-300 focus:outline-none focus:border-[#d97706] focus:ring-1 focus:ring-amber-400 resize-none text-[#0f172a] leading-relaxed"
                            autoFocus
                          />

                          {/* Quick Preset Discussion Tags */}
                          <div className="flex flex-wrap items-center gap-1">
                            <span className="text-[9.5px] font-mono-tech text-slate-400">
                              Quick:
                            </span>
                            {DISCUSSION_PRESETS.map((preset) => (
                              <button
                                key={preset}
                                type="button"
                                onClick={() => {
                                  const existing = draftValue.trim();
                                  const updated = existing
                                    ? `${existing} • ${preset}`
                                    : preset;
                                  setDraftNotes({
                                    ...draftNotes,
                                    [itemKey]: updated,
                                  });
                                }}
                                className="text-[9.5px] font-mono-tech bg-white hover:bg-amber-100 text-slate-700 hover:text-amber-900 px-1.5 py-0.5 rounded border border-slate-200 transition-colors cursor-pointer"
                              >
                                + {preset}
                              </button>
                            ))}
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center justify-between pt-1">
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => handleSaveDiscussion(itemKey)}
                                disabled={isSaving}
                                className="inline-flex items-center gap-1 bg-[#d97706] hover:bg-[#b45309] text-white text-[11px] font-bold px-3 py-1 rounded transition-colors cursor-pointer shadow-2xs"
                              >
                                <Check className="w-3 h-3" />
                                <span>{isSaving ? "Saving..." : "Save Note"}</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => setEditingNoteId(null)}
                                className="text-[11px] text-slate-600 hover:text-slate-800 px-2 py-1 rounded cursor-pointer font-medium"
                              >
                                Cancel
                              </button>
                            </div>

                            {draftValue && (
                              <button
                                type="button"
                                onClick={() =>
                                  setDraftNotes({ ...draftNotes, [itemKey]: "" })
                                }
                                className="text-[10px] text-red-500 hover:text-red-700 cursor-pointer font-mono-tech"
                              >
                                Clear
                              </button>
                            )}
                          </div>
                        </div>
                      ) : currentNote ? (
                        /* Display Existing Discussion Message View */
                        <div className="group relative bg-amber-50/50 hover:bg-amber-50/90 rounded-lg p-2.5 border border-amber-200/80 transition-all shadow-2xs">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-start gap-1.5 min-w-0">
                              <MessageSquare className="w-3.5 h-3.5 text-[#d97706] shrink-0 mt-0.5" />
                              <div className="min-w-0">
                                <div className="text-[9.5px] font-mono-tech uppercase font-bold text-amber-800 tracking-wider flex items-center gap-1">
                                  <span>Discussed with Client</span>
                                  {isJustSaved && (
                                    <span className="text-emerald-700 font-bold">
                                      • Saved!
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-[#0f172a] font-medium leading-relaxed break-words whitespace-pre-wrap mt-0.5">
                                  {currentNote}
                                </p>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => {
                                setDraftNotes({
                                  ...draftNotes,
                                  [itemKey]: currentNote,
                                });
                                setEditingNoteId(itemKey);
                              }}
                              className="p-1 rounded bg-white hover:bg-amber-100 text-slate-500 hover:text-amber-800 border border-slate-200 shadow-2xs shrink-0 transition-colors cursor-pointer"
                              title="Edit what is being discussed with the client"
                            >
                              <Edit3 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        /* Empty State: Inviting Manual Input Trigger */
                        <button
                          type="button"
                          onClick={() => {
                            setDraftNotes({ ...draftNotes, [itemKey]: "" });
                            setEditingNoteId(itemKey);
                          }}
                          className="w-full inline-flex items-center justify-between gap-2 text-xs text-slate-500 hover:text-[#d97706] bg-slate-50 hover:bg-amber-50/70 p-2 rounded-lg border border-dashed border-slate-300 hover:border-amber-400 transition-all cursor-pointer text-left group"
                        >
                          <div className="flex items-center gap-1.5 min-w-0">
                            <MessageSquare className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#d97706] shrink-0" />
                            <span className="text-[11px] font-medium truncate">
                              + What is being discussed with the client?
                            </span>
                          </div>
                          <span className="text-[10px] font-mono-tech font-bold text-slate-400 group-hover:text-[#d97706] bg-white px-1.5 py-0.5 rounded border border-slate-200 shrink-0">
                            Type Note
                          </span>
                        </button>
                      )}
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
                );
              })}
            </tbody>
          </table>

          {filteredQuotations.length === 0 && (
            <div className="p-12 text-center">
              <User className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-bold text-slate-700">
                No Request Quotation records found matching your filters.
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Try adjusting your search query, status filter, or date range.
              </p>
              {isDateFiltered && (
                <button
                  type="button"
                  onClick={handleClearDateFilter}
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-mono-tech font-bold text-[#d97706] bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-lg border border-amber-300 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Date Filter</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestQuotationPage;
