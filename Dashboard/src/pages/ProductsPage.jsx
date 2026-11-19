import React from "react";
import { Search, Upload, Eye, Edit3, Trash2 } from "lucide-react";

const ProductsPage = ({
  products,
  filteredProducts,
  categories,
  productSearch,
  setProductSearch,
  productCategoryFilter,
  setProductCategoryFilter,
  openAddProductModal,
  openEditProductModal,
  setViewingProduct,
  handleDeleteProduct,
  handleQuickCardImageUpload,
  deletingId,
}) => {
  return (
    <div className="space-y-6">
      {/* Filter Bar */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={productSearch}
              onChange={(e) => setProductSearch(e.target.value)}
              placeholder="Search product by model code, name, specs..."
              className="w-full h-10 pl-9 pr-3 rounded-lg bg-[#f8fafc] border border-slate-200 text-xs focus:outline-none focus:border-[#d97706]"
            />
          </div>

          <select
            value={productCategoryFilter}
            onChange={(e) => setProductCategoryFilter(e.target.value)}
            className="h-10 px-3 rounded-lg border border-slate-200 text-xs font-semibold bg-white"
          >
            <option value="All">All Categories ({products.length})</option>
            {categories.map((cat) => (
              <option key={cat._id || cat.categoryName} value={cat.categoryName}>
                {cat.categoryName}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={openAddProductModal}
          className="bg-[#d97706] hover:bg-[#b45309] text-white text-xs font-bold uppercase px-5 py-2.5 rounded-lg inline-flex items-center justify-center gap-2 shadow-xs cursor-pointer"
        >
          <Upload className="w-4 h-4" />
          <span>ADD PRODUCT &amp; UPLOAD IMAGE</span>
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProducts.map((prod) => (
          <div
            key={prod._id || prod.modelCode}
            className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-2xs flex flex-col justify-between"
          >
            <div>
              <div className="relative h-52 bg-slate-100 group">
                <img
                  src={prod.catalogImage || prod.homeImage || "/images/cat-sm250s.png"}
                  alt={prod.machineryName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                  <span className="bg-[#0d1829] text-white text-[10px] font-mono-tech font-bold px-2.5 py-1 rounded-xs">
                    {prod.modelCode}
                  </span>
                  {prod.badge && (
                    <span className="bg-[#d97706] text-white text-[10px] font-mono-tech font-bold px-2.5 py-1 rounded-xs">
                      {prod.badge}
                    </span>
                  )}
                </div>

                {/* Quick Upload New Image Button directly on Card */}
                <label className="absolute top-2.5 right-2.5 bg-[#0d1829]/85 hover:bg-[#d97706] text-white text-[10px] font-mono-tech font-bold px-2.5 py-1 rounded cursor-pointer inline-flex items-center gap-1 shadow-md transition-colors">
                  <Upload className="w-3 h-3" />
                  <span>Change Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleQuickCardImageUpload(prod, e)}
                    className="hidden"
                  />
                </label>

                {prod.imageSpecOverlay && (
                  <span className="absolute bottom-2.5 right-2.5 bg-white/95 text-[#0f172a] text-[10px] font-mono-tech font-bold px-2.5 py-1 rounded-xs shadow-xs">
                    {prod.imageSpecOverlay}
                  </span>
                )}
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between text-[10px] font-mono-tech">
                  <span className="text-[#334e68] font-bold uppercase">
                    {prod.category}
                  </span>
                  <span
                    className={`font-bold ${
                      prod.stockStatus === "Out of Stock"
                        ? "text-red-600"
                        : "text-emerald-600"
                    }`}
                  >
                    ● {prod.stockStatus || "In Stock"}
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-[#0f172a] mt-1">
                  {prod.machineryName}
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                  {prod.description}
                </p>

                <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-[10.5px] font-mono-tech text-slate-600">
                  <div className="truncate">
                    <strong>Cap:</strong> {prod.capacityRating || "Standard"}
                  </div>
                  <div className="truncate">
                    <strong>Images:</strong>{" "}
                    {Array.isArray(prod.images) ? prod.images.length : 1} / 4
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons: View, Update Detail, and Direct Active Delete Button */}
            <div className="px-5 pb-5 pt-2 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setViewingProduct(prod)}
                className="h-9 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs inline-flex items-center justify-center gap-1 cursor-pointer"
                title="View Full Product Specifications"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View</span>
              </button>

              <button
                type="button"
                onClick={() => openEditProductModal(prod)}
                className="flex-1 h-9 rounded-lg bg-[#0d1829] hover:bg-[#d97706] text-white font-bold text-xs inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Update Detail</span>
              </button>

              <button
                type="button"
                disabled={deletingId === (prod._id || prod.modelCode)}
                onClick={(e) => handleDeleteProduct(prod, e)}
                className="h-9 px-3.5 rounded-lg bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold text-xs inline-flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                title="Delete Product from MongoDB"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>
                  {deletingId === (prod._id || prod.modelCode) ? "..." : "Delete"}
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
