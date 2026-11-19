import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import api, { FALLBACK_MACHINERY, FALLBACK_CATEGORIES } from "../utils/api";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [machinery, setMachinery] = useState(FALLBACK_MACHINERY);
  const [categories, setCategories] = useState(FALLBACK_CATEGORIES);
  const [loading, setLoading] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedMachineForQuote, setSelectedMachineForQuote] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  }, []);

  const openQuoteModal = useCallback((machine = null) => {
    setSelectedMachineForQuote(machine);
    setIsQuoteModalOpen(true);
  }, []);

  const closeQuoteModal = useCallback(() => {
    setIsQuoteModalOpen(false);
    setSelectedMachineForQuote(null);
  }, []);

  const fetchCatalogData = useCallback(async () => {
    try {
      setLoading(true);
      const [machRes, catRes] = await Promise.all([
        api.get("/machinery"),
        api.get("/categories"),
      ]);
      if (machRes.data?.data?.length) {
        setMachinery(machRes.data.data);
      }
      if (catRes.data?.data?.length) {
        setCategories(catRes.data.data);
      }
    } catch (err) {
      console.warn("Using local catalog data:", err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCatalogData();
  }, [fetchCatalogData]);

  const submitEnquiry = async (payload) => {
    const res = await api.post("/enquiries", payload);
    return res.data;
  };

  return (
    <AppContext.Provider
      value={{
        machinery,
        categories,
        loading,
        refreshData: fetchCatalogData,
        isQuoteModalOpen,
        selectedMachineForQuote,
        openQuoteModal,
        closeQuoteModal,
        submitEnquiry,
        toast,
        showToast,
        closeToast: () => setToast(null),
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
