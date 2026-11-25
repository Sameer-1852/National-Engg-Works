import React, { useState, useMemo } from "react";
import {
  Calendar,
  Search,
  User,
  Phone,
  Mail,
  Clock,
  Trash2,
  Eye,
  Check,
  Edit3,
  X,
  Filter,
  MessageSquare,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  CalendarDays,
} from "lucide-react";
import api from "../api";

const SESSION_STATUSES = [
  "New",
  "Pending",
  "Scheduled",
  "Completed",
  "Cancelled",
];

const STATUS_FILTER_OPTIONS = [
  { label: "ALL", value: "All" },
  { label: "NEW", value: "New" },
  { label: "PENDING", value: "Pending" },
  { label: "SCHEDULED", value: "Scheduled" },
  { label: "COMPLETED", value: "Completed" },
  { label: "CANCELLED", value: "Cancelled" },
];

const DATE_PRESETS = [
  { label: "All Dates", value: "all" },
  { label: "Today", value: "today" },
  { label: "Yesterday", value: "yesterday" },
  { label: "Last 7 Days", value: "week" },
  { label: "This Month", value: "month" },
];

const getStatusBadge = (status) => {
  switch ((status || "").toLowerCase()) {
    case "new":
      return "bg-amber-100 text-amber-800 border-amber-300";
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    case "scheduled":
      return "bg-blue-100 text-blue-800 border-blue-300";
    case "completed":
      return "bg-emerald-100 text-emerald-800 border-emerald-300";
    case "cancelled":
      return "bg-rose-100 text-rose-800 border-rose-300";
    default:
      return "bg-slate-100 text-slate-700 border-slate-300";
  }
};

const BookPage = ({
  sessions = [],
  onRefresh,
  showToast,
  currentUser,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("desc"); // "desc" = newest first

  // Selected session for detailed view modal
  const [selectedSession, setSelectedSession] = useState(null);

  // Discussion / Meeting notes state (keyed by session ID)
  const [notes, setNotes] = useState({});
  const [draftNotes, setDraftNotes] = useState({});
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [savingId, setSavingId] = useState(null);
  const [savedId, setSavedId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // Filtered and sorted sessions
  const filteredSessions = useMemo(() => {
    let list = Array.isArray(sessions) ? [...sessions] : [];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((s) => {
        const name = (s.name || "").toLowerCase();
        const phone = (s.phone || s.mobileNumber || "").toLowerCase();
        const email = (s.email || "").toLowerCase();
        const status = (s.status || "").toLowerCase();
        const note = (s.notes || notes[s._id] || "").toLowerCase();
        return (
          name.includes(q) ||
          phone.includes(q) ||
          email.includes(q) ||
          status.includes(q) ||
          note.includes(q)
        );
      });
    }

    // Status filter
    if (statusFilter !== "All") {
      list = list.filter(
        (s) => (s.status || "").toLowerCase() === statusFilter.toLowerCase()
      );
    }

    // Date preset filter
    if (dateFilter !== "all") {
      const now = new Date();
      list = list.filter((s) => {
        if (!s.createdAt) return false;
        const d = new Date(s.createdAt);

        if (dateFilter === "today") {
          return (
            d.getDate() === now.getDate() &&
            d.getMonth() === now.getMonth() &&
            d.getFullYear() === now.getFullYear()
          );
        }
        if (dateFilter === "yesterday") {
          const y = new Date();
          y.setDate(y.getDate() - 1);
          return (
            d.getDate() === y.getDate() &&
            d.getMonth() === y.getMonth() &&
            d.getFullYear() === y.getFullYear()
          );
        }
        if (dateFilter === "week") {
          const pastWeek = new Date();
          pastWeek.setDate(pastWeek.getDate() - 7);
          return d >= pastWeek && d <= now;
        }
        if (dateFilter === "month") {
          return (
            d.getMonth() === now.getMonth() &&
            d.getFullYear() === now.getFullYear()
          );
        }
        return true;
      });
    }

    // Sort order
    list.sort((a, b) => {
      const dateA = new Date(a.createdAt || 0).getTime();
      const dateB = new Date(b.createdAt || 0).getTime();
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });

    return list;
  }, [sessions, searchQuery, statusFilter, dateFilter, sortOrder, notes]);

  // Statistics
  const stats = useMemo(() => {
    const total = sessions.length;
    const newCount = sessions.filter(
      (s) => (s.status || "").toLowerCase() === "new"
    ).length;
    const pendingCount = sessions.filter(
      (s) => (s.status || "").toLowerCase() === "pending"
    ).length;
    const scheduledCount = sessions.filter(
      (s) => (s.status || "").toLowerCase() === "scheduled"
    ).length;
    const completedCount = sessions.filter(
      (s) => (s.status || "").toLowerCase() === "completed"
    ).length;
    return { total, newCount, pendingCount, scheduledCount, completedCount };
  }, [sessions]);

  // Handle status update
  const handleStatusChange = async (sessionId, newStatus) => {
    try {
      await api.put(`/book-session/${sessionId}`, { status: newStatus });
      if (showToast) showToast(`Session status updated to "${newStatus}"!`);
      if (onRefresh) onRefresh();
    } catch (err) {
      if (showToast) {
        showToast(
          err.response?.data?.message || "Failed to update session status.",
          "error"
        );
      }
    }
  };

  // Handle saving notes
  const handleSaveNotes = async (sessionId) => {
    const text = (
      draftNotes[sessionId] !== undefined
        ? draftNotes[sessionId]
        : notes[sessionId] || ""
    ).trim();

    setSavingId(sessionId);
    try {
      await api.put(`/book-session/${sessionId}`, { notes: text });
      setNotes((prev) => ({ ...prev, [sessionId]: text }));
      setSavedId(sessionId);
      setTimeout(() => setSavedId(null), 2500);
      setEditingNoteId(null);
      if (showToast) showToast("Meeting discussion note saved successfully!");
      if (onRefresh) onRefresh();
    } catch (err) {
      if (showToast) {
        showToast(
          err.response?.data?.message || "Failed to save meeting note.",
          "error"
        );
      }
    } finally {
      setSavingId(null);
    }
  };

  // Handle delete session
  const handleDelete = async (sessionId) => {
    if (!window.confirm("Are you sure you want to permanently delete this session booking?")) {
      return;
    }

    setDeletingId(sessionId);
    try {
      await api.delete(`/book-session/${sessionId}`);
      if (showToast) showToast("Session booking permanently removed.");
      if (onRefresh) onRefresh();
    } catch (err) {
      if (showToast) {
        showToast(
          err.response?.data?.message || "Failed to delete session booking.",
          "error"
        );
      }
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Banner & Stats */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 flex flex-wrap items-center justify-between gap-4 shadow-2xs">
        <div>
          <div className="text-[10px] font-mono-tech text-[#d97706] uppercase font-bold tracking-wider flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>START BUSINESS // 1-ON-1 SESSIONS INBOX</span>
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold text-[#0f172a] mt-0.5">
            Book 1–on–1 Meet Requests ({filteredSessions.length})
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage live consultation bookings submitted from the website Start Business Page (Name, Mobile Number, Email).
          </p>
        </div>

        {onRefresh && (
          <button
            type="button"
            onClick={onRefresh}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-mono-tech font-bold rounded-lg border border-slate-200 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh Data</span>
          </button>
        )}
      </div>

      {/* 4 Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs">
          <div className="text-[10px] font-mono-tech text-slate-500 uppercase font-semibold">
            TOTAL BOOKINGS
          </div>
          <div className="text-2xl font-black text-[#0f172a] mt-1">
            {stats.total}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">All sessions in MongoDB</div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-amber-200 bg-amber-50/30 shadow-2xs">
          <div className="text-[10px] font-mono-tech text-amber-700 uppercase font-semibold">
            NEW REQUESTS
          </div>
          <div className="text-2xl font-black text-amber-700 mt-1">
            {stats.newCount}
          </div>
          <div className="text-[11px] text-amber-600 mt-0.5">Awaiting initial call</div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-blue-200 bg-blue-50/30 shadow-2xs">
          <div className="text-[10px] font-mono-tech text-blue-700 uppercase font-semibold">
            SCHEDULED
          </div>
          <div className="text-2xl font-black text-blue-700 mt-1">
            {stats.scheduledCount}
          </div>
          <div className="text-[11px] text-blue-600 mt-0.5">Consultation planned</div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-emerald-200 bg-emerald-50/30 shadow-2xs">
          <div className="text-[10px] font-mono-tech text-emerald-700 uppercase font-semibold">
            COMPLETED
          </div>
          <div className="text-2xl font-black text-emerald-700 mt-1">
            {stats.completedCount}
          </div>
          <div className="text-[11px] text-emerald-600 mt-0.5">Advisory finished</div>
        </div>
      </div>

      {/* 2. Search & Filters Bar */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 space-y-4 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full lg:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Name, Mobile, Email, Status, or Notes..."
              className="w-full h-10 pl-9 pr-3 rounded-lg bg-[#f8fafc] border border-slate-200 text-xs focus:outline-none focus:border-[#d97706]"
            />
          </div>

          {/* Date Filter & Sort */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-1.5 bg-[#f8fafc] border border-slate-200 rounded-lg px-2.5 py-1.5">
              <CalendarDays className="w-3.5 h-3.5 text-slate-500" />
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="bg-transparent text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
              >
                {DATE_PRESETS.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
              className="px-3 py-2 rounded-lg text-xs font-mono-tech font-bold border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center gap-1.5 cursor-pointer"
            >
              <Filter className="w-3.5 h-3.5 text-slate-500" />
              <span>{sortOrder === "desc" ? "Newest First" : "Oldest First"}</span>
            </button>
          </div>
        </div>

        {/* Status Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
          <span className="text-[11px] font-mono-tech text-slate-500 font-semibold mr-1">
            STATUS:
          </span>
          {STATUS_FILTER_OPTIONS.map((st) => (
            <button
              key={st.value}
              type="button"
              onClick={() => setStatusFilter(st.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono-tech font-bold transition-all cursor-pointer ${statusFilter === st.value
                ? "bg-[#0d1829] text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Session Bookings List */}
      {filteredSessions.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center border border-slate-200">
          <div className="max-w-md mx-auto space-y-3">
            <div className="w-12 h-12 rounded-full bg-amber-50 text-[#d97706] flex items-center justify-center mx-auto">
              <Calendar className="w-6 h-6" />
            </div>
            <p className="text-base text-slate-800 font-bold">
              No 1-on-1 Sessions Found
            </p>
            <p className="text-xs text-slate-500 leading-relaxed">
              When users click &quot;BOOK 1–ON–1 SESSION FREE&quot; on the Start Business page, their session requests will appear here in real time.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredSessions.map((session) => {
            const id = session._id || session.id;
            const currentNote =
              notes[id] !== undefined ? notes[id] : session.notes || "";
            const isEditing = editingNoteId === id;
            const draftValue =
              draftNotes[id] !== undefined ? draftNotes[id] : currentNote;

            return (
              <div
                key={id}
                className="bg-white rounded-xl p-6 border border-slate-200 shadow-2xs hover:border-slate-300 transition-all space-y-4"
              >
                {/* Header Row: Badges, Date, Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Status Badge */}
                    <span
                      className={`px-2.5 py-0.5 rounded text-[10.5px] font-mono-tech font-bold border ${getStatusBadge(
                        session.status
                      )}`}
                    >
                      {session.status || "New"}
                    </span>

                    <span className="bg-[#0d1829] text-white text-[10.5px] font-mono-tech font-bold px-2.5 py-0.5 rounded">
                      1-on-1 Consultation
                    </span>

                    <span className="text-xs font-mono-tech text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {new Date(session.createdAt || Date.now()).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* View Details */}
                    <button
                      type="button"
                      onClick={() => setSelectedSession(session)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                      title="View Full Booking Details"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View</span>
                    </button>

                    {/* Delete Session */}
                    <button
                      type="button"
                      disabled={deletingId === id}
                      onClick={() => handleDelete(id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer disabled:opacity-40"
                      title="Delete Session Booking"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Main Client Info Grid (3 Fields: Name, Mobile Number, Email) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#f8fafc] p-4 rounded-lg border border-slate-100">
                  {/* Name */}
                  <div className="space-y-1">
                    <div className="text-[10px] font-mono-tech text-slate-500 uppercase font-semibold flex items-center gap-1">
                      <User className="w-3 h-3 text-slate-400" />
                      <span>CLIENT NAME</span>
                    </div>
                    <div className="text-sm font-extrabold text-[#0f172a]">
                      {session.name || "N/A"}
                    </div>
                  </div>

                  {/* Mobile Number */}
                  <div className="space-y-1">
                    <div className="text-[10px] font-mono-tech text-slate-500 uppercase font-semibold flex items-center gap-1">
                      <Phone className="w-3 h-3 text-slate-400" />
                      <span>MOBILE NUMBER</span>
                    </div>
                    <div>
                      {session.phone || session.mobileNumber ? (
                        <a
                          href={`tel:${session.phone || session.mobileNumber}`}
                          className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                        >
                          {session.phone || session.mobileNumber}
                        </a>
                      ) : (
                        <span className="text-xs text-slate-400">N/A</span>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <div className="text-[10px] font-mono-tech text-slate-500 uppercase font-semibold flex items-center gap-1">
                      <Mail className="w-3 h-3 text-slate-400" />
                      <span>EMAIL ADDRESS</span>
                    </div>
                    <div>
                      {session.email ? (
                        <a
                          href={`mailto:${session.email}`}
                          className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 truncate"
                        >
                          {session.email}
                        </a>
                      ) : (
                        <span className="text-xs text-slate-400">N/A</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom Row: Status Quick-Change & Meeting Discussion Notes */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start pt-1">
                  {/* Status Dropdown */}
                  <div className="lg:col-span-4 space-y-1.5">
                    <label className="block text-[11px] font-mono-tech text-slate-500 font-semibold uppercase">
                      CHANGE STATUS
                    </label>
                    <select
                      value={session.status || "New"}
                      onChange={(e) => handleStatusChange(id, e.target.value)}
                      className="w-full h-9 px-3 rounded-lg border border-slate-200 text-xs font-bold bg-white text-slate-800 focus:outline-none focus:border-[#d97706] cursor-pointer"
                    >
                      {SESSION_STATUSES.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Discussion Notes / Meeting Schedule Message */}
                  <div className="lg:col-span-8 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-mono-tech text-slate-500 font-semibold uppercase flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-[#d97706]" />
                        <span>MEETING DISCUSSION / NOTES</span>
                      </label>
                      {savedId === id && (
                        <span className="text-[10.5px] font-mono-tech text-emerald-600 font-bold flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          Saved to MongoDB
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={draftValue}
                        onFocus={() => setEditingNoteId(id)}
                        onChange={(e) =>
                          setDraftNotes((prev) => ({
                            ...prev,
                            [id]: e.target.value,
                          }))
                        }
                        placeholder="What is being discussed / scheduled with client? (e.g. Call on Friday 3PM)"
                        className="flex-1 h-9 px-3 rounded-lg bg-[#f8fafc] border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#d97706] focus:bg-white"
                      />
                      <button
                        type="button"
                        disabled={savingId === id}
                        onClick={() => handleSaveNotes(id)}
                        className="px-3 h-9 bg-[#d97706] hover:bg-[#b45309] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50 shrink-0"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>{savingId === id ? "Saving..." : "Save"}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 4. Session Detail Modal */}
      {selectedSession && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedSession(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setSelectedSession(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-[#fef3c7] text-[#d97706] rounded-xl">
                <Calendar className="w-6 h-6" />
              </span>
              <div>
                <h3 className="text-lg font-extrabold text-[#0f172a]">
                  1-on-1 Consultation Details
                </h3>
                <span className="text-[11px] font-mono-tech text-slate-400">
                  ID: {selectedSession._id || selectedSession.id}
                </span>
              </div>
            </div>

            {/* Client Details Grid */}
            <div className="space-y-3 bg-[#f8fafc] p-4 rounded-xl border border-slate-100 text-xs">
              <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                <span className="font-mono-tech text-slate-500 font-semibold">STATUS</span>
                <span
                  className={`px-2.5 py-0.5 rounded text-[10.5px] font-mono-tech font-bold border ${getStatusBadge(
                    selectedSession.status
                  )}`}
                >
                  {selectedSession.status || "New"}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                <span className="font-mono-tech text-slate-500 font-semibold">CLIENT NAME</span>
                <span className="font-extrabold text-[#0f172a]">
                  {selectedSession.name || "N/A"}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                <span className="font-mono-tech text-slate-500 font-semibold">MOBILE NUMBER</span>
                <a
                  href={`tel:${selectedSession.phone || selectedSession.mobileNumber}`}
                  className="font-bold text-blue-600 hover:underline"
                >
                  {selectedSession.phone || selectedSession.mobileNumber || "N/A"}
                </a>
              </div>

              <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                <span className="font-mono-tech text-slate-500 font-semibold">EMAIL</span>
                <a
                  href={`mailto:${selectedSession.email}`}
                  className="font-bold text-blue-600 hover:underline"
                >
                  {selectedSession.email || "N/A"}
                </a>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-mono-tech text-slate-500 font-semibold">BOOKED AT</span>
                <span className="font-mono-tech text-slate-600">
                  {new Date(selectedSession.createdAt || Date.now()).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Meeting Notes */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">
                Discussion Notes / Scheduled Time:
              </label>
              <div className="p-3 bg-[#f8fafc] rounded-lg border border-slate-200 text-xs text-slate-700">
                {selectedSession.notes || "No notes added yet."}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedSession(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookPage;
