import React from "react";
import { CheckCircle2, AlertCircle, X } from "lucide-react";
import { useApp } from "../context/AppContext";

const Toast = () => {
  const { toast, closeToast } = useApp();

  if (!toast) return null;

  const isError = toast.type === "error";

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md animate-in slide-in-from-bottom-5 duration-200">
      <div
        className={`flex items-start gap-3 px-4 py-3.5 rounded-lg shadow-xl border ${
          isError
            ? "bg-red-950 text-red-100 border-red-800"
            : "bg-[#0d1829] text-white border-amber-500/40"
        }`}
      >
        {isError ? (
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
        ) : (
          <CheckCircle2 className="w-5 h-5 text-[#f59e0b] shrink-0 mt-0.5" />
        )}
        <div className="text-xs leading-relaxed font-medium pr-2">{toast.message}</div>
        <button
          type="button"
          onClick={closeToast}
          className="text-slate-400 hover:text-white ml-auto"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
