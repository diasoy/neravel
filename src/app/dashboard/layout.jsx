"use client";

import React, { useState, useEffect } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const closeSidebar = () => {
    setIsAnimating(true);
    setSidebarOpen(false);
    // Reset animation state after transition completes
    setTimeout(() => setIsAnimating(false), 300);
  };

  const openSidebar = () => {
    setSidebarOpen(true);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  // Close sidebar on escape key
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape" && sidebarOpen) {
        closeSidebar();
      }
    };

    if (sidebarOpen) {
      document.addEventListener("keydown", handleEscapeKey);
      // Prevent body scrolling when sidebar is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "unset";
    };
  }, [sidebarOpen]);

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-50 relative">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block lg:w-1/5 lg:flex-shrink-0">
          <Sidebar isOpen={true} onClose={() => {}} />
        </div>

        {/* Mobile Sidebar Overlay */}
        {(sidebarOpen || isAnimating) && (
          <div className="lg:hidden fixed inset-0 z-40 flex">
            {/* Background overlay with fade and blur transition */}
            <div
              className={`fixed inset-0 bg-black backdrop-blur-sm transition-all duration-300 ease-in-out ${
                sidebarOpen ? "opacity-50" : "opacity-0"
              }`}
              onClick={closeSidebar}
              aria-hidden="true"
            />

            {/* Sidebar with slide transition and shadow */}
            <div
              className={`relative flex flex-col w-64 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <Sidebar
                isOpen={sidebarOpen}
                onClose={closeSidebar}
                isMobile={true}
              />
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 lg:w-4/5 flex flex-col overflow-hidden">
          <Header onMenuClick={openSidebar} />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4 lg:p-6">
            <div className="max-w-full">{children}</div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
