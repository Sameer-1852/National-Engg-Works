import React from "react";
import { RefreshCw, Plus } from "lucide-react";

const Header = ({ activeTab, loading, fetchAllData, openAddProductModal }) => {
  return (
    <header className="bg-white border-b border-slate-200 shrink-0 px-7 sm:px-8 py-4 mb-2 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-30 shadow-2xs">
      <div className="py-0.5">
        <h1 className="text-lg sm:text-xl font-extrabold text-[#0f172a]">
          {activeTab === "overview" && "Enterprise Operations Overview"}
          {activeTab === "products" &&
            "Products & Industrial Machinery Management"}
          {activeTab === "categories" && "Equipment Categories Management"}
          {activeTab === "contacts" &&
            "Contact Us & Engineering Inquiries Inspector"}
          {activeTab === "quotations" &&
            "Request Quotation — Client Details (Name, Email & Mobile)"}
        </h1>
      </div>

      <div className="flex items-center gap-3.5 my-0.5">
        <button
          type="button"
          onClick={fetchAllData}
          className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-[#0f172a] text-xs font-mono-tech font-bold px-4 py-2.5 rounded-lg border border-slate-200 transition-colors cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>REFRESH DATA</span>
        </button>

        <button
          type="button"
          onClick={openAddProductModal}
          className="inline-flex items-center gap-2 bg-[#d97706] hover:bg-[#b45309] text-white text-xs font-bold uppercase px-5 py-2.5 rounded-lg shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>ADD NEW PRODUCT</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
