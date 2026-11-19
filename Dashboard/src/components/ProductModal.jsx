import React from "react";
import {
  X,
  Image as ImageIcon,
  Upload,
  Plus,
  Trash2,
} from "lucide-react";

const ProductModal = ({
  isOpen,
  onClose,
  editingProduct,
  productForm,
  setProductForm,
  categories,
  fileInputRef,
  handleMultipleImagesUpload,
  handleSlotImageUpload,
  handleRemoveImageSlot,
  handleKeySpecChange,
  handleSpecRowChange,
  handleAddSpecRow,
  handleRemoveSpecRow,
  handleSaveProduct,
  handleDeleteProduct,
  savingProduct,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-[#0d1829] text-white px-7 py-5 flex items-center justify-between shrink-0">
          <div>
            <div className="text-[10px] font-mono-tech text-[#f59e0b] uppercase font-bold">
              {editingProduct
                ? `UPDATING PRODUCT ID: ${editingProduct._id}`
                : "NEW MONGODB CATALOG ENTRY"}
            </div>
            <h3 className="text-lg font-extrabold text-white mt-0.5">
              {editingProduct
                ? `Update Product Detail — ${editingProduct.modelCode}`
                : "Add New Industrial Product & Upload Image"}
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

        {/* Modal Scrollable Form */}
        <form
          onSubmit={handleSaveProduct}
          className="p-7 overflow-y-auto space-y-6 flex-1"
        >
          {/* Section 0: Upload Up to 4 Product Images From Computer (No Dummy Images) */}
          <div className="bg-[#eff5fc] rounded-xl p-5 border-2 border-dashed border-[#334e68]/40 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs font-mono-tech font-bold uppercase text-[#0f172a] flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-[#d97706]" />
                <span>
                  Upload Up to 4 Product Images * (Uploaded:{" "}
                  {(productForm.images || []).length} / 4)
                </span>
              </div>

              <div className="flex items-center gap-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleMultipleImagesUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-[#d97706] hover:bg-[#b45309] text-white font-bold text-xs uppercase px-4 py-2.5 rounded-lg inline-flex items-center gap-2 shadow-sm cursor-pointer"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload Up to 4 Images From Computer</span>
                </button>
              </div>
            </div>

            {/* 4 Image Upload Slots Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              {[0, 1, 2, 3].map((slotIdx) => {
                const slotImg = (productForm.images || [])[slotIdx];
                return (
                  <div
                    key={slotIdx}
                    className="relative h-36 rounded-lg overflow-hidden bg-white border-2 border-dashed border-slate-300 flex flex-col items-center justify-center group"
                  >
                    {slotImg ? (
                      <>
                        <img
                          src={slotImg}
                          alt={`Product Image ${slotIdx + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-1.5 left-1.5 bg-[#0d1829]/85 text-white text-[9.5px] font-mono-tech font-bold px-2 py-0.5 rounded">
                          {slotIdx === 0 ? "1 • MAIN COVER" : `IMAGE ${slotIdx + 1}`}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveImageSlot(slotIdx)}
                          className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow cursor-pointer"
                          title="Remove Image"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        <label className="absolute bottom-1.5 right-1.5 bg-[#0d1829]/85 hover:bg-[#d97706] text-white text-[9.5px] font-mono-tech font-bold px-2 py-0.5 rounded cursor-pointer">
                          <span>Replace</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleSlotImageUpload(slotIdx, e)}
                            className="hidden"
                          />
                        </label>
                      </>
                    ) : (
                      <label className="w-full h-full flex flex-col items-center justify-center gap-1.5 cursor-pointer hover:bg-slate-50 transition-colors p-2 text-center">
                        <Upload className="w-5 h-5 text-[#d97706]" />
                        <span className="text-[11px] font-bold text-[#0f172a]">
                          {slotIdx === 0
                            ? "Upload Image 1 (Main) *"
                            : `Upload Image ${slotIdx + 1}`}
                        </span>
                        <span className="text-[9.5px] font-mono-tech text-slate-400">
                          Click to select file
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleSlotImageUpload(slotIdx, e)}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="text-[11px] text-slate-600">
              Image 1 is displayed as the main product image on the Home Page &amp; Products Catalog, and all 4 uploaded images appear in the Product Detail Page gallery.
            </div>
          </div>

          {/* Section A: Core Identity */}
          <div>
            <div className="text-xs font-mono-tech font-bold uppercase text-[#334e68] pb-2 mb-3 border-b border-slate-200">
              1. Core Product Identity &amp; Classification
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#0f172a] mb-1">
                  Model Code *
                </label>
                <input
                  type="text"
                  required
                  value={productForm.modelCode}
                  onChange={(e) =>
                    setProductForm({
                      ...productForm,
                      modelCode: e.target.value,
                    })
                  }
                  placeholder="AB-SM250S"
                  className="w-full h-10 px-3 rounded-lg border border-slate-300 text-xs font-mono-tech font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0f172a] mb-1">
                  Catalog Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={productForm.machineryName}
                  onChange={(e) =>
                    setProductForm({
                      ...productForm,
                      machineryName: e.target.value,
                    })
                  }
                  placeholder="SPIRAL MIXER (STAINLESS STEEL)"
                  className="w-full h-10 px-3 rounded-lg border border-slate-300 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0f172a] mb-1">
                  Equipment Category *
                </label>
                <select
                  value={productForm.category}
                  onChange={(e) =>
                    setProductForm({
                      ...productForm,
                      category: e.target.value,
                      categoryLabel: e.target.value.toUpperCase(),
                    })
                  }
                  className="w-full h-10 px-3 rounded-lg border border-slate-300 text-xs bg-white font-semibold"
                >
                  {categories.map((c) => (
                    <option key={c._id || c.categoryName} value={c.categoryName}>
                      {c.categoryName}
                    </option>
                  ))}
                  <option value="Mixing Machines">Mixing Machines</option>
                  <option value="Dough Processing">Dough Processing</option>
                  <option value="Slicing Systems">Slicing Systems</option>
                  <option value="Baking Support">Baking Support</option>
                  <option value="Flour & Material Prep">
                    Flour &amp; Material Prep
                  </option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-xs font-bold text-[#0f172a] mb-1">
                  Home Page Title
                </label>
                <input
                  type="text"
                  value={productForm.homeTitle}
                  onChange={(e) =>
                    setProductForm({
                      ...productForm,
                      homeTitle: e.target.value,
                    })
                  }
                  placeholder="Spiral Mixer – Stainless Steel"
                  className="w-full h-10 px-3 rounded-lg border border-slate-300 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0f172a] mb-1">
                  Product Detail Page Full Title
                </label>
                <input
                  type="text"
                  value={productForm.detailTitle}
                  onChange={(e) =>
                    setProductForm({
                      ...productForm,
                      detailTitle: e.target.value,
                    })
                  }
                  placeholder="Industrial Spiral Mixer – Full Stainless Steel Series"
                  className="w-full h-10 px-3 rounded-lg border border-slate-300 text-xs"
                />
              </div>
            </div>
          </div>

          {/* Section B: Badges & Filters */}
          <div>
            <div className="text-xs font-mono-tech font-bold uppercase text-[#334e68] pb-2 mb-3 border-b border-slate-200">
              2. Technical Filters &amp; Badges
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#0f172a] mb-1">
                  Highlight Badge
                </label>
                <input
                  type="text"
                  value={productForm.badge}
                  onChange={(e) =>
                    setProductForm({ ...productForm, badge: e.target.value })
                  }
                  placeholder="FLAGSHIP / FAST-SHIP"
                  className="w-full h-10 px-3 rounded-lg border border-slate-300 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0f172a] mb-1">
                  Image Spec Overlay
                </label>
                <input
                  type="text"
                  value={productForm.imageSpecOverlay}
                  onChange={(e) =>
                    setProductForm({
                      ...productForm,
                      imageSpecOverlay: e.target.value,
                    })
                  }
                  placeholder="Flour: 150 kg | Dough: 250 kg"
                  className="w-full h-10 px-3 rounded-lg border border-slate-300 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0f172a] mb-1">
                  Stock Status
                </label>
                <select
                  value={productForm.stockStatus}
                  onChange={(e) =>
                    setProductForm({
                      ...productForm,
                      stockStatus: e.target.value,
                    })
                  }
                  className="w-full h-10 px-3 rounded-lg border border-slate-300 text-xs bg-white"
                >
                  <option value="In Stock">In Stock</option>
                  <option value="Built to Order (14-21 Days)">
                    Built to Order (14-21 Days)
                  </option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0f172a] mb-1">
                  Capacity Rating Filter
                </label>
                <select
                  value={productForm.capacityRating}
                  onChange={(e) =>
                    setProductForm({
                      ...productForm,
                      capacityRating: e.target.value,
                    })
                  }
                  className="w-full h-10 px-3 rounded-lg border border-slate-300 text-xs bg-white"
                >
                  <option>Under 50 kg Batch</option>
                  <option>50 kg - 150 kg Batch</option>
                  <option>150 kg - 300 kg Batch</option>
                  <option>Continuous Industrial Flow</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-xs font-bold text-[#0f172a] mb-1">
                  Sanitary Alloy / Build
                </label>
                <select
                  value={productForm.sanitaryAlloy}
                  onChange={(e) =>
                    setProductForm({
                      ...productForm,
                      sanitaryAlloy: e.target.value,
                    })
                  }
                  className="w-full h-10 px-3 rounded-lg border border-slate-300 text-xs bg-white"
                >
                  <option>SUS304 Food-Contact Stainless</option>
                  <option>Heavy Cast Iron Transmission Frame</option>
                  <option>SUS316 Acid-Resistant Sourdough Spec</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0f172a] mb-1">
                  Drive Transmission
                </label>
                <select
                  value={productForm.driveTransmission}
                  onChange={(e) =>
                    setProductForm({
                      ...productForm,
                      driveTransmission: e.target.value,
                    })
                  }
                  className="w-full h-10 px-3 rounded-lg border border-slate-300 text-xs bg-white"
                >
                  <option>Variable Frequency Drive (VFD)</option>
                  <option>Dual-Speed Electromechanical</option>
                  <option>Heavy-Duty Double-Belt / Chain Drive</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section C: Descriptions & Feature Pills */}
          <div>
            <div className="text-xs font-mono-tech font-bold uppercase text-[#334e68] pb-2 mb-3 border-b border-slate-200">
              3. Engineering Descriptions &amp; Feature Pills
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#0f172a] mb-1">
                  Product Technical Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={productForm.description}
                  onChange={(e) =>
                    setProductForm({
                      ...productForm,
                      description: e.target.value,
                    })
                  }
                  placeholder="Describe mechanical construction, PLC controls, and operational throughput..."
                  className="w-full p-3 rounded-lg border border-slate-300 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0f172a] mb-1">
                  Feature Pills (Comma separated)
                </label>
                <input
                  type="text"
                  value={productForm.featurePillsText}
                  onChange={(e) =>
                    setProductForm({
                      ...productForm,
                      featurePillsText: e.target.value,
                    })
                  }
                  className="w-full h-10 px-3 rounded-lg border border-slate-300 text-xs font-mono-tech"
                />
              </div>
            </div>
          </div>

          {/* Section D: 2x2 Key Specs Grid on Product Detail Page */}
          <div>
            <div className="text-xs font-mono-tech font-bold uppercase text-[#334e68] pb-2 mb-3 border-b border-slate-200">
              4. Product Detail 2×2 Key Specs Highlight Grid
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {productForm.keySpecsGrid.map((ks, idx) => (
                <div
                  key={idx}
                  className="bg-[#f8fafc] p-3 rounded-lg border border-slate-200 grid grid-cols-3 gap-2"
                >
                  <input
                    type="text"
                    value={ks.label}
                    onChange={(e) =>
                      handleKeySpecChange(idx, "label", e.target.value)
                    }
                    placeholder="LABEL"
                    className="col-span-3 h-8 px-2 rounded border border-slate-300 text-[11px] font-mono-tech font-bold"
                  />
                  <input
                    type="text"
                    value={ks.value}
                    onChange={(e) =>
                      handleKeySpecChange(idx, "value", e.target.value)
                    }
                    placeholder="250"
                    className="h-8 px-2 rounded border border-slate-300 text-xs font-bold"
                  />
                  <input
                    type="text"
                    value={ks.unit}
                    onChange={(e) =>
                      handleKeySpecChange(idx, "unit", e.target.value)
                    }
                    placeholder="kg / batch"
                    className="h-8 px-2 rounded border border-slate-300 text-xs"
                  />
                  <input
                    type="text"
                    value={ks.sub}
                    onChange={(e) =>
                      handleKeySpecChange(idx, "sub", e.target.value)
                    }
                    placeholder="Sub note"
                    className="h-8 px-2 rounded border border-slate-300 text-xs"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Section E: Detailed Technical Information Specification Rows */}
          <div>
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-200">
              <span className="text-xs font-mono-tech font-bold uppercase text-[#334e68]">
                5. Detailed Technical Information Table Rows (
                {productForm.specifications.length})
              </span>
              <button
                type="button"
                onClick={handleAddSpecRow}
                className="text-xs font-bold text-[#d97706] hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Specification Row</span>
              </button>
            </div>

            <div className="space-y-2">
              {productForm.specifications.map((row, idx) => (
                <div key={idx} className="grid grid-cols-12 gap-2 items-center">
                  <input
                    type="text"
                    value={row.parameter}
                    onChange={(e) =>
                      handleSpecRowChange(idx, "parameter", e.target.value)
                    }
                    placeholder="Parameter (e.g. Power Consumption)"
                    className="col-span-4 h-9 px-2.5 rounded border border-slate-300 text-xs font-semibold"
                  />
                  <input
                    type="text"
                    value={row.value}
                    onChange={(e) =>
                      handleSpecRowChange(idx, "value", e.target.value)
                    }
                    placeholder="Factory Specification (e.g. 12.5 kW)"
                    className="col-span-4 h-9 px-2.5 rounded border border-slate-300 text-xs font-mono-tech"
                  />
                  <input
                    type="text"
                    value={row.notes}
                    onChange={(e) =>
                      handleSpecRowChange(idx, "notes", e.target.value)
                    }
                    placeholder="Engineering Notes / Tolerances"
                    className="col-span-3 h-9 px-2.5 rounded border border-slate-300 text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveSpecRow(idx)}
                    className="col-span-1 h-9 rounded bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Modal Footer */}
          <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-5 text-xs font-semibold">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={productForm.featuredOnHome}
                  onChange={(e) =>
                    setProductForm({
                      ...productForm,
                      featuredOnHome: e.target.checked,
                    })
                  }
                />
                <span>Show on Home Page</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={productForm.featuredOnMatrix}
                  onChange={(e) =>
                    setProductForm({
                      ...productForm,
                      featuredOnMatrix: e.target.checked,
                    })
                  }
                />
                <span>Show on Matching Matrix</span>
              </label>
            </div>

            <div className="flex items-center gap-3">
              {editingProduct && (
                <button
                  type="button"
                  onClick={(e) => handleDeleteProduct(editingProduct, e)}
                  className="px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Product</span>
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-700 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={savingProduct}
                className="px-6 py-2.5 rounded-lg bg-[#d97706] hover:bg-[#b45309] disabled:opacity-60 text-white text-xs font-bold uppercase shadow-md cursor-pointer"
              >
                {savingProduct
                  ? "SAVING TO MONGODB..."
                  : editingProduct
                  ? "Save Updated Product Detail"
                  : "Upload Product & Image to Website"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
