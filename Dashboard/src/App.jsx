import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import api from "./api";

// Dashboard Layout & Modal Components
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import ProductModal from "./components/ProductModal";
import ProductViewModal from "./components/ProductViewModal";
import ContactDetailModal from "./components/ContactDetailModal";

// Separate Dashboard Pages
import OverviewPage from "./pages/OverviewPage";
import ProductsPage from "./pages/ProductsPage";
import CategoriesPage from "./pages/CategoriesPage";
import ContactsPage from "./pages/ContactsPage";
import RequestQuotationPage from "./pages/RequestQuotationPage";
import AdminUsersPage from "./pages/AdminUsersPage";
import LoginPage from "./pages/LoginPage";

const ENQUIRY_STATUSES = [
  "New",
  "Pending",
  "Contacted",
  "In Progress",
  "Completed",
  "Rejected",
];

const INITIAL_USERS = [
  {
    id: "usr-author-1",
    name: "Master Author (Founder)",
    email: "author@new-engineering.com",
    password: "Author@123",
    role: "Author",
    phone: "+91 98201 44820",
    createdAt: "2026-01-10T10:00:00.000Z",
  },
  {
    id: "usr-admin-1",
    name: "Chief Systems Admin",
    email: "admin@new-engineering.com",
    password: "Admin@123",
    role: "Admin",
    phone: "+91 98110 32145",
    createdAt: "2026-01-15T11:30:00.000Z",
  },
  {
    id: "usr-admin-2",
    name: "Plant Machinery Admin",
    email: "plant.admin@gmail.com",
    password: "Admin@456",
    role: "Admin",
    phone: "+91 99200 88310",
    createdAt: "2026-02-01T14:20:00.000Z",
  },
];

const DEFAULT_SPECS = [
  { parameter: "Model Number", value: "AB-SM250S", notes: "Apex Industrial Series" },
  { parameter: "Machine Classification", value: "Heavy-Duty Industrial Bakery System", notes: "Continuous 24/7 duty rating" },
  { parameter: "Capacity / Output", value: "250 kg / batch", notes: "High-throughput industrial rating" },
  { parameter: "Power Consumption", value: "12.5 kW (3-Phase 380V-415V)", notes: "Thermal overload protection" },
  { parameter: "Construction Alloy", value: "SUS304 Food-Contact Stainless Steel", notes: "EHEDG & FDA compliant" },
];

const DEFAULT_KEY_SPECS = [
  { label: "DOUGH BATCH CAPACITY", value: "250", unit: "kg / batch", sub: "Max flour load: 150 kg" },
  { label: "BOWL TOTAL VOLUME", value: "380", unit: "Liters", sub: "Heavy gauge SUS304" },
  { label: "CYCLE MIXING TIME", value: "8 – 12", unit: "min", sub: "Two-speed automatic shift" },
  { label: "NET MACHINE MASS", value: "1,280", unit: "kg", sub: "Solid cast-base dampener" },
];

// Helper to compress and convert any uploaded image file from user's PC into a high-res Data URL
const convertFileToOptimizedDataUrl = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 1000;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > MAX_WIDTH) {
          height = Math.round((height * MAX_WIDTH) / width);
          width = MAX_WIDTH;
        }
        if (height > MAX_HEIGHT) {
          width = Math.round((width * MAX_HEIGHT) / height);
          height = MAX_HEIGHT;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.86);
        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error("Invalid image file"));
      img.src = event.target.result;
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
};

function App() {
  const [activeTab, setActiveTab] = useState("overview");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [backendConnected, setBackendConnected] = useState(true);
  const [toast, setToast] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const fileInputRef = useRef(null);

  // User Management & Authentication State
  const [allUsers, setAllUsers] = useState(() => {
    try {
      const stored = localStorage.getItem("apex_dashboard_all_users");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error("Error reading stored users:", e);
    }
    return INITIAL_USERS;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = localStorage.getItem("apex_dashboard_user");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && (parsed.role === "Admin" || parsed.role === "Author")) {
          return parsed;
        }
      }
    } catch (e) {
      console.error("Error reading stored current user:", e);
    }
    return null;
  });

  // Sync users to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("apex_dashboard_all_users", JSON.stringify(allUsers));
    } catch (e) {
      console.error("Error saving users:", e);
    }
  }, [allUsers]);

  // Sync current logged in user to localStorage
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem("apex_dashboard_user", JSON.stringify(currentUser));
      } else {
        localStorage.removeItem("apex_dashboard_user");
      }
    } catch (e) {
      console.error("Error syncing current user:", e);
    }
  }, [currentUser]);

  // Filters & Search
  const [productSearch, setProductSearch] = useState("");
  const [productCategoryFilter, setProductCategoryFilter] = useState("All");
  const [enquirySearch, setEnquirySearch] = useState("");
  const [enquiryStatusFilter, setEnquiryStatusFilter] = useState("All");
  const [enquiryTypeFilter, setEnquiryTypeFilter] = useState("All");

  // Product Add / Update Modal
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [viewingProduct, setViewingProduct] = useState(null);
  const [savingProduct, setSavingProduct] = useState(false);

  const [productForm, setProductForm] = useState({
    modelCode: "",
    homeCode: "",
    machineryName: "",
    homeTitle: "",
    detailTitle: "",
    category: "Mixing Machines",
    categoryLabel: "MIXING SYSTEMS",
    homeCategoryLabel: "DOUGH PREPARATION",
    badge: "",
    homeBadgeRight: "",
    imageSpecOverlay: "",
    capacityRating: "150 kg - 300 kg Batch",
    sanitaryAlloy: "SUS304 Food-Contact Stainless",
    driveTransmission: "Variable Frequency Drive (VFD)",
    hydrationProfile: "High Rheology (52% - 88%+)",
    throughputTier: "1,000 - 3,500 kg/hr",
    automationTier: "Siemens S7-1500 PLC & SCADA",
    catalogImage: "",
    images: [],
    description: "",
    homeDescription: "",
    detailSubtitle: "",
    price: "Enterprise Pricing Tier (RFQ)",
    stockStatus: "In Stock",
    featuredOnHome: true,
    featuredOnMatrix: true,
    featurePillsText:
      "FOOD-GRADE SUS304 BODY, DIGITAL TOUCHSCREEN PLC, DUAL TIMER AUTO SHIFT, HYDRAULIC BOWL LIFT OPTION",
    keySpecsGrid: DEFAULT_KEY_SPECS,
    specifications: DEFAULT_SPECS,
  });

  // Category Form & Edit State
  const [categoryForm, setCategoryForm] = useState({
    categoryName: "",
    description: "",
    type: "both",
    status: "Active",
  });
  const [editingCategory, setEditingCategory] = useState(null);

  // Contact Us / Enquiry Full Detail Modal
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => setToast(null), 4200);
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
    showToast(`Welcome, ${user.name}! Authenticated as ${user.role}.`, "success");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    showToast("Signed out of Dashboard successfully.", "success");
  };

  // Author User Management Handlers
  const handleAddUser = (userData) => {
    const newUser = {
      id: `usr-${Date.now()}`,
      ...userData,
      createdAt: new Date().toISOString(),
    };
    setAllUsers((prev) => [newUser, ...prev]);
    return true;
  };

  const handleRoleChange = (userId, newRole) => {
    setAllUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
    );
  };

  const handleDeleteUser = (userId) => {
    setAllUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  const fetchAllData = useCallback(async () => {
    try {
      setLoading(true);
      const [machRes, catRes, enqRes] = await Promise.all([
        api.get("/machinery"),
        api.get("/categories"),
        api.get("/enquiries"),
      ]);
      setProducts(machRes.data?.data || []);
      setCategories(catRes.data?.data || []);
      setEnquiries(enqRes.data?.data || []);
      setBackendConnected(true);
    } catch (err) {
      console.error("Backend sync error:", err.message);
      setBackendConnected(false);
      showToast(
        "Could not reach Backend API on http://localhost:3000. Please ensure Backend server is running.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    if (currentUser) {
      fetchAllData();
    }
  }, [currentUser, fetchAllData]);

  // ============================================================================
  // UP TO 4 IMAGES UPLOAD FROM COMPUTER HANDLERS (NO DUMMY IMAGES)
  // ============================================================================
  const handleMultipleImagesUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const validFiles = files.filter((f) => f.type.startsWith("image/"));
    if (validFiles.length === 0) {
      showToast("Please select valid image files (PNG, JPG, JPEG, WEBP).", "error");
      return;
    }

    try {
      const converted = await Promise.all(
        validFiles.slice(0, 4).map((f) => convertFileToOptimizedDataUrl(f))
      );

      setProductForm((prev) => {
        const existing = Array.isArray(prev.images) ? [...prev.images] : [];
        const combined = [...existing, ...converted].slice(0, 4);
        return {
          ...prev,
          images: combined,
          catalogImage: combined[0] || "",
        };
      });

      setUploadedFileName(`${Math.min(validFiles.length, 4)} image(s) uploaded`);
      showToast(`Uploaded ${Math.min(validFiles.length, 4)} image(s) (max 4)!`);
      e.target.value = "";
    } catch (err) {
      showToast("Failed to process uploaded images.", "error");
    }
  };

  const handleSlotImageUpload = async (slotIndex, e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showToast("Please select a valid image file.", "error");
      return;
    }

    try {
      const dataUrl = await convertFileToOptimizedDataUrl(file);
      setProductForm((prev) => {
        const nextImages = Array.isArray(prev.images) ? [...prev.images] : [];
        if (slotIndex < nextImages.length) {
          nextImages[slotIndex] = dataUrl;
        } else {
          nextImages.push(dataUrl);
        }
        const trimmed = nextImages.slice(0, 4);
        return {
          ...prev,
          images: trimmed,
          catalogImage: trimmed[0] || "",
        };
      });
      showToast(`Slot ${slotIndex + 1} image uploaded!`);
      e.target.value = "";
    } catch (err) {
      showToast("Failed to upload slot image.", "error");
    }
  };

  const handleRemoveImageSlot = (slotIndex) => {
    setProductForm((prev) => {
      const nextImages = (prev.images || []).filter((_, idx) => idx !== slotIndex);
      return {
        ...prev,
        images: nextImages,
        catalogImage: nextImages[0] || "",
      };
    });
  };

  // Direct quick image replacement on any product card
  const handleQuickCardImageUpload = async (prod, e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    try {
      const converted = await Promise.all(
        files.slice(0, 4).map((f) => convertFileToOptimizedDataUrl(f))
      );
      await api.put(`/machinery/${prod._id}`, {
        catalogImage: converted[0],
        homeImage: converted[0],
        detailMainImage: converted[0],
        matrixImage: converted[0],
        images: converted,
      });
      showToast(
        `Updated ${converted.length} image(s) for ${prod.modelCode} — live on Website!`
      );
      fetchAllData();
    } catch (err) {
      showToast("Failed to upload image to product.", "error");
    }
  };

  // ============================================================================
  // 1. PRODUCT ADD / UPDATE / DELETE HANDLERS (ADMIN & AUTHOR PRIVILEGE)
  // ============================================================================
  const openAddProductModal = () => {
    setEditingProduct(null);
    setUploadedFileName("");
    setProductForm({
      modelCode: `AB-SYS${Math.floor(100 + Math.random() * 899)}`,
      homeCode: "NEW-PRO",
      machineryName: "",
      homeTitle: "",
      detailTitle: "",
      category: categories[0]?.categoryName || "Mixing Machines",
      categoryLabel: "MIXING SYSTEMS",
      homeCategoryLabel: "DOUGH PREPARATION",
      badge: "FLAGSHIP",
      homeBadgeRight: "250 KG FLOUR",
      imageSpecOverlay: "Flour: 150 kg | Dough: 250 kg",
      capacityRating: "150 kg - 300 kg Batch",
      sanitaryAlloy: "SUS304 Food-Contact Stainless",
      driveTransmission: "Variable Frequency Drive (VFD)",
      hydrationProfile: "High Rheology (52% - 88%+)",
      throughputTier: "1,000 - 3,500 kg/hr",
      automationTier: "Siemens S7-1500 PLC & SCADA",
      catalogImage: "",
      images: [],
      description: "",
      homeDescription: "",
      detailSubtitle: "",
      price: "Enterprise Pricing Tier (RFQ)",
      stockStatus: "In Stock",
      featuredOnHome: true,
      featuredOnMatrix: true,
      featurePillsText:
        "FOOD-GRADE SUS304 BODY, DIGITAL TOUCHSCREEN PLC, DUAL TIMER AUTO SHIFT, HYDRAULIC BOWL LIFT OPTION",
      keySpecsGrid: DEFAULT_KEY_SPECS.map((k) => ({ ...k })),
      specifications: DEFAULT_SPECS.map((s) => ({ ...s })),
    });
    setIsProductModalOpen(true);
  };

  const openEditProductModal = (prod) => {
    setEditingProduct(prod);
    const existingImgs =
      Array.isArray(prod.images) && prod.images.length > 0
        ? prod.images.slice(0, 4)
        : prod.catalogImage
          ? [prod.catalogImage]
          : [];
    setUploadedFileName(`${existingImgs.length} image(s) active`);
    setProductForm({
      modelCode: prod.modelCode || "",
      homeCode: prod.homeCode || prod.modelCode || "",
      machineryName: prod.machineryName || "",
      homeTitle: prod.homeTitle || prod.machineryName || "",
      detailTitle: prod.detailTitle || prod.machineryName || "",
      category: prod.category || "Mixing Machines",
      categoryLabel: prod.categoryLabel || "MIXING SYSTEMS",
      homeCategoryLabel: prod.homeCategoryLabel || "DOUGH PREPARATION",
      badge: prod.badge || "",
      homeBadgeRight: prod.homeBadgeRight || "",
      imageSpecOverlay: prod.imageSpecOverlay || "",
      capacityRating: prod.capacityRating || "150 kg - 300 kg Batch",
      sanitaryAlloy: prod.sanitaryAlloy || "SUS304 Food-Contact Stainless",
      driveTransmission: prod.driveTransmission || "Variable Frequency Drive (VFD)",
      hydrationProfile: prod.hydrationProfile || "High Rheology (52% - 88%+)",
      throughputTier: prod.throughputTier || "1,000 - 3,500 kg/hr",
      automationTier: prod.automationTier || "Siemens S7-1500 PLC & SCADA",
      catalogImage: existingImgs[0] || "",
      images: existingImgs,
      description: prod.description || "",
      homeDescription: prod.homeDescription || prod.description || "",
      detailSubtitle: prod.detailSubtitle || prod.description || "",
      price: prod.price || "Enterprise Pricing Tier (RFQ)",
      stockStatus: prod.stockStatus || "In Stock",
      featuredOnHome: Boolean(prod.featuredOnHome),
      featuredOnMatrix: Boolean(prod.featuredOnMatrix),
      featurePillsText: (prod.featurePills || []).join(", "),
      keySpecsGrid:
        prod.keySpecsGrid && prod.keySpecsGrid.length > 0
          ? prod.keySpecsGrid.map((k) => ({ ...k }))
          : DEFAULT_KEY_SPECS.map((k) => ({ ...k })),
      specifications:
        prod.specifications && prod.specifications.length > 0
          ? prod.specifications.map((s) => ({ ...s }))
          : DEFAULT_SPECS.map((s) => ({ ...s })),
    });
    setIsProductModalOpen(true);
  };

  const handleSpecRowChange = (index, field, value) => {
    const updated = [...productForm.specifications];
    updated[index] = { ...updated[index], [field]: value };
    setProductForm({ ...productForm, specifications: updated });
  };

  const handleAddSpecRow = () => {
    setProductForm({
      ...productForm,
      specifications: [
        ...productForm.specifications,
        { parameter: "", value: "", notes: "" },
      ],
    });
  };

  const handleRemoveSpecRow = (index) => {
    setProductForm({
      ...productForm,
      specifications: productForm.specifications.filter((_, i) => i !== index),
    });
  };

  const handleKeySpecChange = (index, field, value) => {
    const updated = [...productForm.keySpecsGrid];
    updated[index] = { ...updated[index], [field]: value };
    setProductForm({ ...productForm, keySpecsGrid: updated });
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    if (!productForm.modelCode.trim() || !productForm.machineryName.trim()) {
      showToast("Model Code and Product Name are required.", "error");
      return;
    }

    const validImages = (productForm.images || []).filter(Boolean).slice(0, 4);
    if (validImages.length === 0) {
      showToast("Please upload at least 1 product image (up to 4 images).", "error");
      return;
    }

    const primaryImg = validImages[0];

    const payload = {
      ...productForm,
      homeCode: productForm.homeCode || productForm.modelCode,
      homeTitle: productForm.homeTitle || productForm.machineryName,
      detailTitle: productForm.detailTitle || productForm.machineryName,
      homeDescription: productForm.homeDescription || productForm.description,
      detailSubtitle: productForm.detailSubtitle || productForm.description,
      catalogImage: primaryImg,
      homeImage: primaryImg,
      detailMainImage: primaryImg,
      matrixImage: primaryImg,
      images: validImages,
      ...(editingProduct
        ? {}
        : { catalogOrder: 0, homeOrder: 0, matrixOrder: 0 }),
      featurePills: productForm.featurePillsText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      specifications: productForm.specifications.filter(
        (s) => s.parameter.trim() || s.value.trim()
      ),
    };

    try {
      setSavingProduct(true);
      if (editingProduct && editingProduct._id) {
        await api.put(`/machinery/${editingProduct._id}`, payload);
        showToast(
          `Updated product & image for ${payload.modelCode} — live on Website!`
        );
      } else {
        await api.post("/machinery", payload);
        showToast(
          `Added new product ${payload.modelCode} with uploaded image — now live on Website!`
        );
      }
      setIsProductModalOpen(false);
      fetchAllData();
    } catch (err) {
      showToast(
        err.response?.data?.message || "Failed to save product details.",
        "error"
      );
    } finally {
      setSavingProduct(false);
    }
  };

  const handleDeleteProduct = async (prod, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!prod) return;

    const targetId = prod._id || prod.modelCode;
    try {
      setDeletingId(targetId);
      setProducts((prev) =>
        prev.filter((p) => p._id !== prod._id && p.modelCode !== prod.modelCode)
      );
      if (viewingProduct && viewingProduct._id === prod._id) {
        setViewingProduct(null);
      }
      if (editingProduct && editingProduct._id === prod._id) {
        setIsProductModalOpen(false);
        setEditingProduct(null);
      }

      if (prod._id) {
        await api.delete(`/machinery/${prod._id}`);
      }
      showToast(
        `Deleted product "${prod.modelCode} — ${prod.machineryName}" from MongoDB!`
      );
      await fetchAllData();
    } catch (err) {
      showToast(
        err.response?.data?.message || "Failed to delete product from database.",
        "error"
      );
      await fetchAllData();
    } finally {
      setDeletingId(null);
    }
  };

  // ============================================================================
  // 2. CATEGORY ADD / UPDATE / DELETE HANDLERS
  // ============================================================================
  const handleSaveCategory = async (e) => {
    e.preventDefault();
    if (!categoryForm.categoryName.trim()) {
      showToast("Category Name is required.", "error");
      return;
    }

    try {
      if (editingCategory && editingCategory._id) {
        await api.put(`/categories/${editingCategory._id}`, categoryForm);
        showToast(`Updated category "${categoryForm.categoryName}"!`);
        setEditingCategory(null);
      } else {
        await api.post("/categories", categoryForm);
        showToast(`Added new category "${categoryForm.categoryName}"!`);
      }
      setCategoryForm({
        categoryName: "",
        description: "",
        type: "both",
        status: "Active",
      });
      fetchAllData();
    } catch (err) {
      showToast(
        err.response?.data?.message || "Failed to save category.",
        "error"
      );
    }
  };

  const handleEditCategoryClick = (cat) => {
    setEditingCategory(cat);
    setCategoryForm({
      categoryName: cat.categoryName || "",
      description: cat.description || "",
      type: cat.type || "both",
      status: cat.status || "Active",
    });
  };

  const handleDeleteCategory = async (cat) => {
    try {
      setCategories((prev) => prev.filter((c) => c._id !== cat._id));
      await api.delete(`/categories/${cat._id}`);
      showToast(`Deleted category "${cat.categoryName}"`);
      fetchAllData();
    } catch (err) {
      showToast("Failed to delete category.", "error");
      fetchAllData();
    }
  };

  // ============================================================================
  // 3. CONTACT US & ENQUIRY HANDLERS
  // ============================================================================
  const handleEnquiryStatusChange = async (id, status) => {
    try {
      const res = await api.put(`/enquiries/${id}`, { status });
      showToast(`Updated inquiry status to "${status}"`);
      if (selectedEnquiry && selectedEnquiry._id === id) {
        setSelectedEnquiry(res.data?.data || { ...selectedEnquiry, status });
      }
      fetchAllData();
    } catch (err) {
      showToast("Failed to update enquiry status.", "error");
    }
  };

  const handleDeleteEnquiry = async (id) => {
    try {
      setEnquiries((prev) => prev.filter((e) => e._id !== id));
      await api.delete(`/enquiries/${id}`);
      showToast("Deleted inquiry record from MongoDB.");
      if (selectedEnquiry && selectedEnquiry._id === id) {
        setSelectedEnquiry(null);
      }
      fetchAllData();
    } catch (err) {
      showToast("Failed to delete enquiry.", "error");
      fetchAllData();
    }
  };

  // Filtered Lists
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (
        productCategoryFilter !== "All" &&
        p.category !== productCategoryFilter
      ) {
        return false;
      }
      if (productSearch.trim()) {
        const q = productSearch.toLowerCase();
        return (
          (p.machineryName || "").toLowerCase().includes(q) ||
          (p.modelCode || "").toLowerCase().includes(q) ||
          (p.homeTitle || "").toLowerCase().includes(q) ||
          (p.description || "").toLowerCase().includes(q) ||
          (p.category || "").toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [products, productCategoryFilter, productSearch]);

  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((e) => {
      if (
        enquiryStatusFilter !== "All" &&
        e.status !== enquiryStatusFilter
      ) {
        return false;
      }
      if (
        enquiryTypeFilter !== "All" &&
        e.enquiryType !== enquiryTypeFilter
      ) {
        return false;
      }
      if (enquirySearch.trim()) {
        const q = enquirySearch.toLowerCase();
        return (
          (e.customerName || "").toLowerCase().includes(q) ||
          (e.email || "").toLowerCase().includes(q) ||
          (e.phone || "").toLowerCase().includes(q) ||
          (e.companyName || "").toLowerCase().includes(q) ||
          (e.machineryModel || "").toLowerCase().includes(q) ||
          (e.message || "").toLowerCase().includes(q) ||
          (e.facilityLocation || "").toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [enquiries, enquiryStatusFilter, enquiryTypeFilter, enquirySearch]);

  const enquiryTypes = useMemo(() => {
    const types = new Set(enquiries.map((e) => e.enquiryType).filter(Boolean));
    return ["All", ...Array.from(types)];
  }, [enquiries]);

  const getStatusBadge = (status) => {
    switch (status) {
      case "New":
        return "bg-amber-100 text-[#d97706] border-amber-300";
      case "Pending":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "Contacted":
        return "bg-purple-100 text-purple-800 border-purple-300";
      case "In Progress":
        return "bg-cyan-100 text-cyan-800 border-cyan-300";
      case "Completed":
        return "bg-emerald-100 text-emerald-800 border-emerald-300";
      case "Rejected":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-slate-100 text-slate-700 border-slate-300";
    }
  };

  // IF NOT AUTHENTICATED: DISPLAY ADMIN LOGIN PAGE
  if (!currentUser) {
    return (
      <LoginPage
        onLoginSuccess={handleLogin}
        allUsers={allUsers}
      />
    );
  }

  return (
    <div className="h-screen overflow-hidden flex bg-[#f1f5f9] text-[#0f172a]">
      {/* LEFT SIDEBAR (FIXED / LOCKED ON SCROLL) */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        productsCount={products.length}
        categoriesCount={categories.length}
        enquiriesCount={enquiries.length}
        usersCount={allUsers.length}
        backendConnected={backendConnected}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* RIGHT MAIN WORKSPACE (INDEPENDENT SCROLLING AREA) */}
      <div className="flex-1 h-screen flex flex-col min-w-0 overflow-y-auto">
        {/* TOP HEADER BAR */}
        <Header
          activeTab={activeTab}
          loading={loading}
          fetchAllData={fetchAllData}
          openAddProductModal={openAddProductModal}
          currentUser={currentUser}
          onLogout={handleLogout}
        />

        {/* TOAST NOTIFICATION */}
        {toast && (
          <div
            className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-lg shadow-xl border text-xs font-bold transition-all ${toast.type === "error"
                ? "bg-red-950 text-red-100 border-red-700"
                : "bg-[#0d1829] text-white border-[#d97706]"
              }`}
          >
            {toast.type === "error" ? (
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-[#f59e0b] shrink-0" />
            )}
            <span>{toast.message}</span>
          </div>
        )}

        {/* MAIN PAGE CONTENT */}
        <main className="p-7 flex-1 space-y-7">
          {activeTab === "overview" && (
            <OverviewPage
              products={products}
              categories={categories}
              enquiries={enquiries}
              setActiveTab={setActiveTab}
              setEnquiryStatusFilter={setEnquiryStatusFilter}
              openAddProductModal={openAddProductModal}
              openEditProductModal={openEditProductModal}
              handleDeleteProduct={handleDeleteProduct}
              deletingId={deletingId}
              setSelectedEnquiry={setSelectedEnquiry}
              getStatusBadge={getStatusBadge}
            />
          )}

          {activeTab === "products" && (
            <ProductsPage
              products={products}
              filteredProducts={filteredProducts}
              categories={categories}
              productSearch={productSearch}
              setProductSearch={setProductSearch}
              productCategoryFilter={productCategoryFilter}
              setProductCategoryFilter={setProductCategoryFilter}
              openAddProductModal={openAddProductModal}
              openEditProductModal={openEditProductModal}
              setViewingProduct={setViewingProduct}
              handleDeleteProduct={handleDeleteProduct}
              handleQuickCardImageUpload={handleQuickCardImageUpload}
              deletingId={deletingId}
            />
          )}

          {activeTab === "categories" && (
            <CategoriesPage
              categories={categories}
              products={products}
              categoryForm={categoryForm}
              setCategoryForm={setCategoryForm}
              editingCategory={editingCategory}
              setEditingCategory={setEditingCategory}
              handleSaveCategory={handleSaveCategory}
              handleEditCategoryClick={handleEditCategoryClick}
              handleDeleteCategory={handleDeleteCategory}
            />
          )}

          {activeTab === "contacts" && (
            <ContactsPage
              filteredEnquiries={filteredEnquiries}
              enquirySearch={enquirySearch}
              setEnquirySearch={setEnquirySearch}
              enquiryStatusFilter={enquiryStatusFilter}
              setEnquiryStatusFilter={setEnquiryStatusFilter}
              enquiryTypeFilter={enquiryTypeFilter}
              setEnquiryTypeFilter={setEnquiryTypeFilter}
              enquiryTypes={enquiryTypes}
              ENQUIRY_STATUSES={ENQUIRY_STATUSES}
              getStatusBadge={getStatusBadge}
              setSelectedEnquiry={setSelectedEnquiry}
              handleEnquiryStatusChange={handleEnquiryStatusChange}
              handleDeleteEnquiry={handleDeleteEnquiry}
            />
          )}

          {activeTab === "quotations" && (
            <RequestQuotationPage
              enquiries={enquiries}
              ENQUIRY_STATUSES={ENQUIRY_STATUSES}
              getStatusBadge={getStatusBadge}
              setSelectedEnquiry={setSelectedEnquiry}
              handleEnquiryStatusChange={handleEnquiryStatusChange}
              handleDeleteEnquiry={handleDeleteEnquiry}
            />
          )}

          {activeTab === "users" && (
            <AdminUsersPage
              allUsers={allUsers}
              currentUser={currentUser}
              onAddUser={handleAddUser}
              onRoleChange={handleRoleChange}
              onDeleteUser={handleDeleteUser}
              showToast={showToast}
            />
          )}
        </main>
      </div>

      {/* ==================================================================== */}
      {/* MODAL 1: ADD NEW PRODUCT / UPDATE PRODUCT DETAIL MODAL               */}
      {/* ==================================================================== */}
      <ProductModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        editingProduct={editingProduct}
        productForm={productForm}
        setProductForm={setProductForm}
        categories={categories}
        fileInputRef={fileInputRef}
        handleMultipleImagesUpload={handleMultipleImagesUpload}
        handleSlotImageUpload={handleSlotImageUpload}
        handleRemoveImageSlot={handleRemoveImageSlot}
        handleKeySpecChange={handleKeySpecChange}
        handleSpecRowChange={handleSpecRowChange}
        handleAddSpecRow={handleAddSpecRow}
        handleRemoveSpecRow={handleRemoveSpecRow}
        handleSaveProduct={handleSaveProduct}
        handleDeleteProduct={handleDeleteProduct}
        savingProduct={savingProduct}
      />

      {/* ==================================================================== */}
      {/* MODAL 2: PRODUCT QUICK SPEC VIEWER MODAL                             */}
      {/* ==================================================================== */}
      <ProductViewModal
        viewingProduct={viewingProduct}
        onClose={() => setViewingProduct(null)}
        handleDeleteProduct={handleDeleteProduct}
        openEditProductModal={openEditProductModal}
      />

      {/* ==================================================================== */}
      {/* MODAL 3: CONTACT US & INQUIRY FULL INFORMATION VIEWER MODAL          */}
      {/* ==================================================================== */}
      <ContactDetailModal
        selectedEnquiry={selectedEnquiry}
        onClose={() => setSelectedEnquiry(null)}
        ENQUIRY_STATUSES={ENQUIRY_STATUSES}
        getStatusBadge={getStatusBadge}
        handleEnquiryStatusChange={handleEnquiryStatusChange}
        handleDeleteEnquiry={handleDeleteEnquiry}
      />
    </div>
  );
}

export default App;
