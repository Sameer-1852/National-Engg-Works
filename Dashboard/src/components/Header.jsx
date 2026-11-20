import React from "react";
import { RefreshCw, Plus, LogOut, Shield, ShieldCheck } from "lucide-react";

const Header = ({
  activeTab,
  loading,
  fetchAllData,
  openAddProductModal,
  currentUser,
  onLogout,
}) => {
  const isAuthor = (currentUser?.role || "").toLowerCase() === "author";

  return (
    <header className="bg-white border-b border-slate-200 shrink-0 px-7 sm:px-8 py-3.5 mb-2 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-30 shadow-2xs">
      <div className="py-0.5">
        <div className="flex items-center gap-2">
          <h1 className="text-lg sm:text-xl font-extrabold text-[#0f172a]">
            {activeTab === "overview" && "Enterprise Operations Overview"}
            {activeTab === "products" &&
              "Products & Industrial Machinery Management"}
            {activeTab === "categories" && "Equipment Categories Management"}
            {activeTab === "contacts" &&
              "Contact Us & Engineering Inquiries Inspector"}
            {activeTab === "quotations" &&
              "Request Quotation — Client Details (Name, Email & Mobile)"}
            {activeTab === "users" &&
              "Admin Users & System Privileges (Name, Gmail & Password)"}
          </h1>
          {activeTab === "users" && (
            <span
              className={`text-[10px] font-mono-tech font-bold px-2 py-0.5 rounded border uppercase ${isAuthor
                ? "bg-purple-100 text-purple-800 border-purple-300"
                : "bg-amber-100 text-amber-800 border-amber-300"
                }`}
            >
              {isAuthor ? "Author Super Control" : "Admin View"}
            </span>
          )}
        </div>
        <p className="text-[11px] font-mono-tech text-slate-500">
          NEW &bull; National Engineering Works &bull; B2B Industrial Management
        </p>
      </div>

      <div className="flex items-center gap-3 my-0.5">
        <button
          type="button"
          onClick={fetchAllData}
          className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-[#0f172a] text-xs font-mono-tech font-bold px-3.5 py-2 rounded-lg border border-slate-200 transition-colors cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>REFRESH</span>
        </button>


        {/* Current User Badge & Logout in Header */}
        {currentUser && (
          <div className="hidden sm:flex items-center gap-2.5 pl-3 border-l border-slate-200">
            <div className="text-right">
              <div className="text-xs font-bold text-[#0f172a] leading-tight">
                {currentUser.name}
              </div>
              <span
                className={`inline-block text-[9px] font-mono-tech font-extrabold px-1.5 py-0.2 rounded uppercase ${isAuthor
                  ? "bg-purple-100 text-purple-800"
                  : "bg-amber-100 text-amber-800"
                  }`}
              >
                {currentUser.role || "ADMIN"}
              </span>
            </div>

            <button
              type="button"
              onClick={onLogout}
              className="p-2 rounded-lg bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 border border-slate-200 transition-colors cursor-pointer"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
