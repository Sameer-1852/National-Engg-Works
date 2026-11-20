import React from "react";
import {
  LayoutDashboard,
  Cog,
  FolderTree,
  MessageSquare,
  FileText,
  ShieldCheck,
  LogOut,
  User,
} from "lucide-react";

const Sidebar = ({
  activeTab,
  setActiveTab,
  productsCount,
  categoriesCount,
  enquiriesCount,
  usersCount = 0,
  backendConnected,
  currentUser,
  onLogout,
}) => {
  const isAuthor = (currentUser?.role || "").toLowerCase() === "author";

  return (
    <aside className="w-68 h-screen sticky top-0 bg-[#0d1829] text-white flex flex-col justify-between shrink-0 border-r border-slate-800 overflow-y-auto">
      <div>
        {/* Brand Logo */}
        <div className="p-5 border-b border-slate-800 flex items-center gap-3">
          <div className="bg-white p-1.5 rounded">
            <img
              src="/images/logo.png"
              alt="NEW Logo"
              className="h-9 w-auto object-contain"
            />
          </div>
          <div>
            <div className="font-extrabold text-sm tracking-wide text-white leading-tight">
              NEW <span className="text-[#f59e0b]">• ADMIN</span>
            </div>
            <div className="text-[10px] font-mono-tech text-slate-400 uppercase">
              B2B CONTROL PORTAL
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="p-4 space-y-1.5">
          <div className="text-[10px] font-mono-tech text-slate-500 uppercase px-3 pb-1.5 font-bold">
            CORE MANAGEMENT
          </div>

          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={`w-full flex items-center justify-between px-3.5 py-3 rounded-lg text-xs font-bold transition-colors cursor-pointer ${activeTab === "overview"
              ? "bg-[#d97706] text-white shadow-sm"
              : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
              }`}
          >
            <span className="flex items-center gap-2.5">
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard Overview</span>
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("products")}
            className={`w-full flex items-center justify-between px-3.5 py-3 rounded-lg text-xs font-bold transition-colors cursor-pointer ${activeTab === "products"
              ? "bg-[#d97706] text-white shadow-sm"
              : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
              }`}
          >
            <span className="flex items-center gap-2.5">
              <Cog className="w-4 h-4" />
              <span>Products &amp; Machinery</span>
            </span>
            <span className="bg-slate-900/60 text-slate-200 text-[10px] font-mono-tech px-2 py-0.5 rounded">
              {productsCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("categories")}
            className={`w-full flex items-center justify-between px-3.5 py-3 rounded-lg text-xs font-bold transition-colors cursor-pointer ${activeTab === "categories"
              ? "bg-[#d97706] text-white shadow-sm"
              : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
              }`}
          >
            <span className="flex items-center gap-2.5">
              <FolderTree className="w-4 h-4" />
              <span>Manage Categories</span>
            </span>
            <span className="bg-slate-900/60 text-slate-200 text-[10px] font-mono-tech px-2 py-0.5 rounded">
              {categoriesCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("contacts")}
            className={`w-full flex items-center justify-between px-3.5 py-3 rounded-lg text-xs font-bold transition-colors cursor-pointer ${activeTab === "contacts"
              ? "bg-[#d97706] text-white shadow-sm"
              : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
              }`}
          >
            <span className="flex items-center gap-2.5">
              <MessageSquare className="w-4 h-4" />
              <span>Contact Us &amp; Inquiries</span>
            </span>
            <span className="bg-amber-500/20 text-[#f59e0b] border border-amber-500/40 text-[10px] font-mono-tech px-2 py-0.5 rounded">
              {enquiriesCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("quotations")}
            className={`w-full flex items-center justify-between px-3.5 py-3 rounded-lg text-xs font-bold transition-colors cursor-pointer ${activeTab === "quotations"
              ? "bg-[#d97706] text-white shadow-sm"
              : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
              }`}
          >
            <span className="flex items-center gap-2.5">
              <FileText className="w-4 h-4" />
              <span>Request Quotation</span>
            </span>
            <span className="bg-amber-500/20 text-[#f59e0b] border border-amber-500/40 text-[10px] font-mono-tech px-2 py-0.5 rounded">
              {enquiriesCount}
            </span>
          </button>

          {/* User Management Section */}
          <div className="pt-3">
            <div className="text-[10px] font-mono-tech text-slate-500 uppercase px-3 pb-1.5 font-bold flex items-center justify-between">
              <span>SECURITY &amp; ACCESS</span>
              {isAuthor && (
                <span className="text-[9px] bg-purple-900/60 text-purple-300 px-1.5 py-0.2 rounded border border-purple-700/60 font-mono-tech">
                  AUTHOR
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={() => setActiveTab("users")}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-lg text-xs font-bold transition-colors cursor-pointer ${activeTab === "users"
                ? "bg-purple-700 text-white shadow-sm"
                : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
                }`}
            >
              <span className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-purple-400" />
                <span>Admin Users</span>
              </span>
              <span className="bg-purple-950/80 text-purple-200 border border-purple-700/60 text-[10px] font-mono-tech px-2 py-0.5 rounded">
                {usersCount}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom User Card & Status */}
      <div className="p-4 border-t border-slate-800 space-y-3">
        {/* Logged in User Dossier Card */}
        {currentUser && (
          <div className="bg-[#111e33] rounded-xl p-3 border border-slate-700/80">
            <div className="flex items-center justify-between mb-1.5">
              <span
                className={`text-[9.5px] font-mono-tech font-extrabold uppercase px-2 py-0.5 rounded tracking-wider ${isAuthor
                  ? "bg-purple-900/80 text-purple-200 border border-purple-700"
                  : "bg-amber-900/80 text-amber-200 border border-amber-700"
                  }`}
              >
                ROLE: {currentUser.role || "ADMIN"}
              </span>

              <button
                type="button"
                onClick={onLogout}
                className="text-slate-400 hover:text-red-400 text-[11px] font-mono-tech flex items-center gap-1 transition-colors cursor-pointer"
                title="Sign Out of Portal"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>

            <div className="font-extrabold text-xs text-white truncate">
              {currentUser.name}
            </div>
            <div className="text-[10px] font-mono-tech text-slate-400 truncate mt-0.5">
              {currentUser.email}
            </div>
          </div>
        )}

        {/* Backend Online status */}
        {/* <div className="bg-[#162235] rounded-lg p-2.5 border border-slate-700/80">
          <div className="flex items-center gap-2 text-[10.5px] font-mono-tech">
            <span
              className={`w-2 h-2 rounded-full ${backendConnected ? "bg-emerald-400" : "bg-red-500"
                }`}
            />
            <span className="text-slate-200 font-bold">
              {backendConnected ? "BACKEND API ONLINE" : "BACKEND OFFLINE"}
            </span>
          </div>
          <div className="text-[9.5px] font-mono-tech text-slate-400 mt-0.5">
            Port 3000 &bull; MongoDB Atlas
          </div>
        </div> */}
      </div>
    </aside>
  );
};

export default Sidebar;
