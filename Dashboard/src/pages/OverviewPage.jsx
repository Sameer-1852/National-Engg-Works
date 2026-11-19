import React from "react";
import {
  Cog,
  FolderTree,
  MessageSquare,
  Clock,
  Upload,
  Edit3,
  Trash2,
  Eye,
} from "lucide-react";

const OverviewPage = ({
  products,
  categories,
  enquiries,
  setActiveTab,
  setEnquiryStatusFilter,
  openAddProductModal,
  openEditProductModal,
  handleDeleteProduct,
  deletingId,
  setSelectedEnquiry,
  getStatusBadge,
}) => {
  return (
    <div className="space-y-6">
      {/* 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div
          onClick={() => setActiveTab("products")}
          className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs hover:border-[#d97706] transition-colors cursor-pointer"
        >
          <div className="flex items-center justify-between text-xs font-mono-tech text-slate-500">
            <span>TOTAL PRODUCTS</span>
            <Cog className="w-4 h-4 text-[#d97706]" />
          </div>
          <div className="text-3xl font-extrabold text-[#0f172a] mt-2">
            {products.length}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Click to Add, Edit, or Delete
          </div>
        </div>

        <div
          onClick={() => setActiveTab("categories")}
          className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs hover:border-[#d97706] transition-colors cursor-pointer"
        >
          <div className="flex items-center justify-between text-xs font-mono-tech text-slate-500">
            <span>TOTAL CATEGORIES</span>
            <FolderTree className="w-4 h-4 text-[#334e68]" />
          </div>
          <div className="text-3xl font-extrabold text-[#0f172a] mt-2">
            {categories.length}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Click to Add New Category
          </div>
        </div>

        <div
          onClick={() => setActiveTab("contacts")}
          className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs hover:border-[#d97706] transition-colors cursor-pointer"
        >
          <div className="flex items-center justify-between text-xs font-mono-tech text-slate-500">
            <span>CONTACT US &amp; RFQs</span>
            <MessageSquare className="w-4 h-4 text-[#d97706]" />
          </div>
          <div className="text-3xl font-extrabold text-[#0f172a] mt-2">
            {enquiries.length}
          </div>
          <div className="text-xs text-emerald-600 font-semibold mt-1">
            Click to Read Full Information
          </div>
        </div>

        <div
          onClick={() => {
            setEnquiryStatusFilter("New");
            setActiveTab("contacts");
          }}
          className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs hover:border-[#d97706] transition-colors cursor-pointer"
        >
          <div className="flex items-center justify-between text-xs font-mono-tech text-slate-500">
            <span>NEW / UNREAD INQUIRIES</span>
            <Clock className="w-4 h-4 text-[#d97706]" />
          </div>
          <div className="text-3xl font-extrabold text-[#d97706] mt-2">
            {
              enquiries.filter(
                (e) => e.status === "New" || e.status === "Pending"
              ).length
            }
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Awaiting Engineering Response
          </div>
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div className="bg-[#0d1829] text-white rounded-xl p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-[10.5px] font-mono-tech text-[#f59e0b] uppercase font-bold">
            QUICK ADMINISTRATIVE ACTIONS
          </div>
          <h2 className="text-lg font-extrabold mt-0.5">
            Manage Catalog Products, Image Uploads, Categories &amp; Contact Us Submissions
          </h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={openAddProductModal}
            className="bg-[#d97706] hover:bg-[#b45309] text-white text-xs font-bold uppercase px-4 py-2.5 rounded inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            <span>Upload New Product &amp; Image</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("categories")}
            className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold uppercase px-4 py-2.5 rounded border border-slate-700 inline-flex items-center gap-1.5 cursor-pointer"
          >
            <FolderTree className="w-4 h-4" />
            <span>Add New Category</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("contacts")}
            className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold uppercase px-4 py-2.5 rounded border border-slate-700 inline-flex items-center gap-1.5 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Read Contact Us Info</span>
          </button>
        </div>
      </div>

      {/* Active Products Management Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-[#0f172a]">
              Active Website Products &amp; Machinery ({products.length})
            </h3>
            <p className="text-xs text-slate-500">
              Update product details, change images, or delete products directly from MongoDB.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setActiveTab("products")}
            className="text-xs font-bold text-[#d97706] hover:underline cursor-pointer"
          >
            Open Full Product Grid &rarr;
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#0d1829] text-white font-mono-tech text-[10.5px] uppercase">
                <th className="py-3 px-4">IMAGE &amp; MODEL</th>
                <th className="py-3 px-4">PRODUCT NAME</th>
                <th className="py-3 px-4">CATEGORY</th>
                <th className="py-3 px-4">CAPACITY / STATUS</th>
                <th className="py-3 px-4 text-right">ACTIONS (EDIT / DELETE)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {products.map((prod) => (
                <tr key={prod._id || prod.modelCode} className="hover:bg-slate-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          prod.catalogImage ||
                          prod.homeImage ||
                          "/images/cat-sm250s.png"
                        }
                        alt={prod.machineryName}
                        className="w-12 h-10 rounded object-cover border border-slate-200 shrink-0"
                      />
                      <span className="font-mono-tech font-bold text-[#0f172a]">
                        {prod.modelCode}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-[#0f172a]">
                      {prod.machineryName}
                    </div>
                    <div className="text-slate-500 truncate max-w-xs">
                      {prod.description}
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono-tech text-[#334e68] font-semibold">
                    {prod.category}
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-slate-700 font-medium">
                      {prod.capacityRating}
                    </div>
                    <div
                      className={`font-bold text-[11px] ${
                        prod.stockStatus === "Out of Stock"
                          ? "text-red-600"
                          : "text-emerald-600"
                      }`}
                    >
                      ● {prod.stockStatus || "In Stock"}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => openEditProductModal(prod)}
                        className="bg-[#0d1829] hover:bg-slate-800 text-white font-bold text-[11px] px-3 py-1.5 rounded inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        type="button"
                        disabled={deletingId === (prod._id || prod.modelCode)}
                        onClick={(e) => handleDeleteProduct(prod, e)}
                        className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold text-[11px] px-3 py-1.5 rounded inline-flex items-center gap-1 shadow-2xs cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>
                          {deletingId === (prod._id || prod.modelCode)
                            ? "Deleting..."
                            : "Delete"}
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Latest Contact Us & Enquiries Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-base font-extrabold text-[#0f172a]">
            Latest Contact Us &amp; Engineering Inquiries
          </h3>
          <button
            type="button"
            onClick={() => setActiveTab("contacts")}
            className="text-xs font-bold text-[#d97706] hover:underline cursor-pointer"
          >
            View All ({enquiries.length}) &rarr;
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#0d1829] text-white font-mono-tech text-[10.5px] uppercase">
                <th className="py-3 px-4">CONTACT NAME &amp; ROLE</th>
                <th className="py-3 px-4">COMPANY &amp; LOCATION</th>
                <th className="py-3 px-4">INQUIRY TYPE / DISCIPLINE</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4 text-right">FULL DETAILS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {enquiries.slice(0, 5).map((enq) => (
                <tr key={enq._id} className="hover:bg-slate-50">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-[#0f172a]">
                      {enq.customerName}
                    </div>
                    <div className="text-slate-500">
                      {enq.roleTitle || enq.email || enq.phone}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-800">
                      {enq.companyName || "—"}
                    </div>
                    <div className="text-slate-500">
                      {enq.facilityLocation || enq.email}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-mono-tech font-bold text-[#334e68]">
                      {enq.enquiryType}
                    </div>
                    {enq.engineeringDiscipline && (
                      <div className="text-slate-500">
                        {enq.engineeringDiscipline}
                      </div>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded text-[10.5px] font-mono-tech font-bold border ${getStatusBadge(
                        enq.status
                      )}`}
                    >
                      {enq.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedEnquiry(enq)}
                      className="inline-flex items-center gap-1.5 bg-[#0d1829] hover:bg-[#d97706] text-white font-bold text-[11px] px-3 py-1.5 rounded transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Read Full Info</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
