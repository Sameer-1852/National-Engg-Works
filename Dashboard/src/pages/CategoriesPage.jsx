import React from "react";
import { Plus, Edit3, Trash2 } from "lucide-react";

const CategoriesPage = ({
  categories,
  products,
  categoryForm,
  setCategoryForm,
  editingCategory,
  setEditingCategory,
  handleSaveCategory,
  handleEditCategoryClick,
  handleDeleteCategory,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
      {/* Left 5 Cols: Add / Edit Category Form */}
      <div className="lg:col-span-5 bg-white rounded-xl p-6 border border-slate-200 shadow-2xs">
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
          <div>
            <div className="text-[10px] font-mono-tech text-[#d97706] uppercase font-bold">
              EQUIPMENT TAXONOMY
            </div>
            <h2 className="text-lg font-extrabold text-[#0f172a]">
              {editingCategory
                ? `Update Category: ${editingCategory.categoryName}`
                : "Add New Category"}
            </h2>
          </div>
          {editingCategory && (
            <button
              type="button"
              onClick={() => {
                setEditingCategory(null);
                setCategoryForm({
                  categoryName: "",
                  description: "",
                  type: "both",
                  status: "Active",
                });
              }}
              className="text-xs text-slate-500 hover:text-slate-800 cursor-pointer"
            >
              Cancel Edit
            </button>
          )}
        </div>

        <form onSubmit={handleSaveCategory} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#0f172a] mb-1">
              Category Name *
            </label>
            <input
              type="text"
              required
              value={categoryForm.categoryName}
              onChange={(e) =>
                setCategoryForm({
                  ...categoryForm,
                  categoryName: e.target.value,
                })
              }
              placeholder="e.g. Thermal Tunnel Ovens"
              className="w-full h-10 px-3 rounded-lg bg-[#f8fafc] border border-slate-200 text-xs focus:outline-none focus:border-[#d97706]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#0f172a] mb-1">
                Category Scope
              </label>
              <select
                value={categoryForm.type}
                onChange={(e) =>
                  setCategoryForm({ ...categoryForm, type: e.target.value })
                }
                className="w-full h-10 px-3 rounded-lg border border-slate-200 text-xs bg-white"
              >
                <option value="both">Machinery &amp; Products</option>
                <option value="machinery">Machinery Only</option>
                <option value="product">Products Only</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0f172a] mb-1">
                Status
              </label>
              <select
                value={categoryForm.status}
                onChange={(e) =>
                  setCategoryForm({
                    ...categoryForm,
                    status: e.target.value,
                  })
                }
                className="w-full h-10 px-3 rounded-lg border border-slate-200 text-xs bg-white"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0f172a] mb-1">
              Category Engineering Description *
            </label>
            <textarea
              rows={4}
              required
              value={categoryForm.description}
              onChange={(e) =>
                setCategoryForm({
                  ...categoryForm,
                  description: e.target.value,
                })
              }
              placeholder="Describe the machinery systems and applications covered by this category..."
              className="w-full p-3 rounded-lg bg-[#f8fafc] border border-slate-200 text-xs focus:outline-none focus:border-[#d97706]"
            />
          </div>

          <button
            type="submit"
            className="w-full h-11 bg-[#d97706] hover:bg-[#b45309] text-white font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>
              {editingCategory ? "UPDATE CATEGORY" : "ADD NEW CATEGORY"}
            </span>
          </button>
        </form>
      </div>

      {/* Right 7 Cols: Categories List */}
      <div className="lg:col-span-7 space-y-4">
        <div className="bg-white rounded-xl p-5 border border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-[#0f172a]">
              Active Equipment Categories ({categories.length})
            </h3>
            <p className="text-xs text-slate-500">
              Synced directly with MongoDB Atlas and the website Products catalog filter.
            </p>
          </div>
        </div>

        {categories.map((cat) => {
          const count = products.filter(
            (p) => p.category === cat.categoryName
          ).length;

          return (
            <div
              key={cat._id || cat.categoryName}
              className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <span className="text-base font-extrabold text-[#0f172a]">
                    {cat.categoryName}
                  </span>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-mono-tech font-bold px-2 py-0.5 rounded">
                    {cat.status || "Active"}
                  </span>
                  <span className="bg-[#dce8f8] text-[#0f172a] text-[10px] font-mono-tech font-bold px-2 py-0.5 rounded">
                    {count} Products
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {cat.description || "Industrial bakery machinery category."}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleEditCategoryClick(cat)}
                  className="h-9 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#0f172a] font-bold text-xs inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteCategory(cat)}
                  className="h-9 px-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs inline-flex items-center gap-1.5 cursor-pointer"
                  title="Delete Category"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoriesPage;
