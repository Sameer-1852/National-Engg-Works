import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import api, { FALLBACK_MACHINERY, FALLBACK_CATEGORIES } from "../utils/api";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Ultra-fast instant render from sessionStorage cache, then revalidate in background (SWR pattern)
  const [machinery, setMachinery] = useState(() => {
    try {
      const cached = sessionStorage.getItem("new_machinery_cache");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) { }
    return FALLBACK_MACHINERY;
  });

  const [categories, setCategories] = useState(() => {
    try {
      const cached = sessionStorage.getItem("new_categories_cache");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) { }
    return FALLBACK_CATEGORIES;
  });

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

  const fetchCatalogData = useCallback(async (force = false) => {
    try {
      const [machRes, catRes] = await Promise.all([
        api.get("/machinery", { noCache: force }),
        api.get("/categories", { noCache: force }),
      ]);
      if (machRes.data?.data?.length) {
        setMachinery(machRes.data.data);
        try {
          sessionStorage.setItem("new_machinery_cache", JSON.stringify(machRes.data.data));
        } catch (e) { }
      }
      if (catRes.data?.data?.length) {
        setCategories(catRes.data.data);
        try {
          sessionStorage.setItem("new_categories_cache", JSON.stringify(catRes.data.data));
        } catch (e) { }
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

  const submitContact = async (payload) => {
    try {
      const res = await api.post("/contacts", payload);
      return res.data;
    } catch (err) {
      return submitEnquiry(payload);
    }
  };

  const submitQuotation = async (payload) => {
    try {
      const res = await api.post("/quotations", payload);
      return res.data;
    } catch (err) {
      return submitEnquiry(payload);
    }
  };

  const bookOneOnOneSession = async (payload) => {
    try {
      const res = await api.post("/book-session", payload);
      return res.data;
    } catch (err) {
      return submitEnquiry({
        customerName: payload.name,
        phone: payload.phone || payload.mobileNumber,
        email: payload.email,
        enquiryType: "1-on-1 Free Session Booking",
        message: "Free 1-on-1 Consultation Session Booking Request",
      });
    }
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
        submitContact,
        submitQuotation,
        bookOneOnOneSession,
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
