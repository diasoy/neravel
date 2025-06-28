"use client";

import React, { useState, useEffect } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [titleHeader, setTitleHeader] = useState("Dashboard");
  const [isAnimating, setIsAnimating] = useState(false);

  const closeSidebar = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setSidebarOpen(false);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const openSidebar = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setSidebarOpen(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  // Handle escape key dan prevent body scroll saat sidebar terbuka
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape" && sidebarOpen) {
        closeSidebar();
      }
    };

    if (sidebarOpen) {
      document.addEventListener("keydown", handleEscapeKey);
      document.body.classList.add("mobile-menu-open");
    } else {
      document.body.classList.remove("mobile-menu-open");
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.classList.remove("mobile-menu-open");
    };
  }, [sidebarOpen]);

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-50 overflow-hidden">
        {/* Desktop Sidebar - Selalu terlihat */}
        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:z-40">
          <Sidebar />
        </div>

        {/* Mobile Sidebar Container */}
        <div
          className={`lg:hidden fixed inset-0 z-50 ${
            sidebarOpen || isAnimating
              ? "pointer-events-auto"
              : "pointer-events-none"
          }`}
        >
          {/* Backdrop Overlay */}
          <div
            className={`backdrop ${sidebarOpen ? "open" : "closed"}`}
            onClick={closeSidebar}
          />

          {/* Sidebar Panel */}
          <div className={`sidebar-mobile ${sidebarOpen ? "open" : "closed"}`}>
            <Sidebar isMobile={true} onClose={closeSidebar} />
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 flex flex-col lg:ml-64 min-w-0 relative">
          <Header onMenuClick={openSidebar} titleHeader={titleHeader} />

          {/* Main content dengan proper overflow handling */}
          <main className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="p-4 lg:p-6">
              <div className="max-w-full">
                {/* Clone children dan pass setTitleHeader sebagai prop */}
                {React.isValidElement(children)
                  ? React.cloneElement(children, { setTitleHeader })
                  : children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
