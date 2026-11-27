import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import QuoteModal from "./components/QuoteModal";
import Toast from "./components/Toast";

import HomePage from "./pages/HomePage";
import ProductsCatalogPage from "./pages/ProductsCatalogPage";
import MachineryDetailPage from "./pages/MachineryDetailPage";
import StartBusinessPage from "./pages/StartBusinessPage";
import FindMachineryPage from "./pages/FindMachineryPage";
import UpgradeMachineryPage from "./pages/UpgradeMachineryPage";
import InsightsPage from "./pages/InsightsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

const HomeScrollAnimationWrapper = ({ children }) => {
  const { pathname } = useLocation();
  const isHomePage = pathname === "/";

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    const mainEl = document.querySelector("main");
    if (!mainEl) return;

    // Only apply scroll animations on the Home Page ("/")
    if (!isHomePage) {
      mainEl.querySelectorAll("[data-scroll-anim]").forEach((el) => {
        el.removeAttribute("data-scroll-anim");
        el.classList.remove("scroll-in-view");
        el.style.removeProperty("--scroll-delay");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("scroll-in-view");
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    const observeElement = (el, animType, delayMs = 0) => {
      if (!el.hasAttribute("data-scroll-anim")) {
        el.setAttribute("data-scroll-anim", animType);
        if (delayMs > 0) {
          el.style.setProperty("--scroll-delay", `${delayMs}ms`);
        }
      }
      // If element is already in or above the viewport, show it immediately
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 20) {
        el.classList.add("scroll-in-view");
      } else {
        observer.observe(el);
      }
    };

    const registerHomeAnimations = () => {
      if (window.location.pathname !== "/") return;

      const headings = mainEl.querySelectorAll("h1, h2");
      headings.forEach((el) => observeElement(el, "fade-up", 0));

      const grids = mainEl.querySelectorAll("section .grid");
      grids.forEach((grid) => {
        const children = Array.from(grid.children);
        const isTwoColSplit =
          children.length === 2 && grid.className.includes("lg:grid-cols-12");

        children.forEach((child, idx) => {
          if (isTwoColSplit) {
            observeElement(
              child,
              idx === 0 ? "fade-left" : "fade-right",
              idx * 100
            );
          } else {
            observeElement(child, "zoom-in", (idx % 3) * 85);
          }
        });
      });
    };

    const timer = setTimeout(registerHomeAnimations, 30);
    const mutationObserver = new MutationObserver(() => {
      registerHomeAnimations();
    });
    mutationObserver.observe(mainEl, { childList: true, subtree: true });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [pathname, isHomePage]);

  return (
    <main className={`flex-1 ${isHomePage ? "home-scroll-active" : ""}`}>
      {children}
    </main>
  );
};

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-[#f4f8fd] text-[#0f172a]">
          <Navbar />
          <HomeScrollAnimationWrapper>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsCatalogPage />} />
              <Route path="/products/:id" element={<MachineryDetailPage />} />
              <Route path="/machinery" element={<ProductsCatalogPage />} />
              <Route path="/machinery/:id" element={<MachineryDetailPage />} />
              <Route path="/solutions/start-your-business" element={<StartBusinessPage />} />
              <Route path="/start-business" element={<StartBusinessPage />} />
              <Route path="/solutions/find-machinery" element={<FindMachineryPage />} />
              <Route path="/find-machinery" element={<FindMachineryPage />} />
              <Route path="/solutions/upgrade-scale" element={<UpgradeMachineryPage />} />
              <Route path="/upgrade-machinery" element={<UpgradeMachineryPage />} />
              <Route path="/insights" element={<InsightsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </HomeScrollAnimationWrapper>
          <Footer />
          <QuoteModal />
          <Toast />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
