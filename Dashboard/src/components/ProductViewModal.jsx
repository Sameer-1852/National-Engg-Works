import React from "react";
import { X, Trash2, Edit3 } from "lucide-react";

const ProductViewModal = ({
  viewingProduct,
  onClose,
  handleDeleteProduct,
  openEditProductModal,
}) => {
  if (!viewingProduct) return null;

  const gallery =
    Array.isArray(viewingProduct.images) && viewingProduct.images.length > 0
      ? viewingProduct.images
      : [
          viewingProduct.catalogImage ||
            viewingProduct.homeImage ||
            "/images/cat-sm250s.png",
        ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        <div className="bg-[#0d1829] text-white px-7 py-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono-tech text-[#f59e0b] uppercase font-bold">
              MODEL: {viewingProduct.modelCode} • {viewingProduct.category}
            </span>
            <h3 className="text-lg font-extrabold text-white mt-0.5">
              {viewingProduct.detailTitle || viewingProduct.machineryName}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-7 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            <div className="sm:col-span-5 space-y-2">
              <div className="rounded-xl overflow-hidden border border-slate-200 h-44">
                <img
                  src={gallery[0]}
                  alt={viewingProduct.machineryName}
                  className="w-full h-full object-cover"
                />
              </div>
              {gallery.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {gallery.slice(0, 4).map((imgUrl, idx) => (
                    <img
                      key={idx}
                      src={imgUrl}
                      alt={`Thumb ${idx + 1}`}
                      className="h-12 w-full object-cover rounded border border-slate-200"
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="sm:col-span-7 space-y-2.5 text-xs">
              <p className="text-slate-600 leading-relaxed">
                {viewingProduct.description}
              </p>
              <div className="grid grid-cols-2 gap-2 pt-2 font-mono-tech">
                <div className="bg-slate-100 p-2.5 rounded">
                  <span className="text-slate-400 block text-[10px]">
                    CAPACITY RATING
                  </span>
                  <strong>{viewingProduct.capacityRating}</strong>
                </div>
                <div className="bg-slate-100 p-2.5 rounded">
                  <span className="text-slate-400 block text-[10px]">
                    SANITARY ALLOY
                  </span>
                  <strong>{viewingProduct.sanitaryAlloy}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Specification Table */}
          <div>
            <h4 className="text-xs font-mono-tech font-bold uppercase text-[#334e68] mb-2">
              Detailed Technical Information (
              {(viewingProduct.specifications || []).length} rows)
            </h4>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#0d1829] text-white font-mono-tech text-[10px] uppercase">
                    <th className="py-2.5 px-4">PARAMETER</th>
                    <th className="py-2.5 px-4">FACTORY SPECIFICATION</th>
                    <th className="py-2.5 px-4">NOTES</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {(viewingProduct.specifications || []).map((s, i) => (
                    <tr key={i}>
                      <td className="py-2.5 px-4 font-bold">{s.parameter}</td>
                      <td className="py-2.5 px-4 font-mono-tech">{s.value}</td>
                      <td className="py-2.5 px-4 text-slate-500">{s.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={(e) => handleDeleteProduct(viewingProduct, e)}
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase px-5 py-2.5 rounded-lg inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete This Product</span>
            </button>

            <button
              type="button"
              onClick={() => {
                const prod = viewingProduct;
                onClose();
                openEditProductModal(prod);
              }}
              className="bg-[#d97706] hover:bg-[#b45309] text-white text-xs font-bold uppercase px-5 py-2.5 rounded-lg inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit This Product</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductViewModal;
