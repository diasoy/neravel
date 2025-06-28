"use client";

import React, { useState, useEffect } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [titleHeader, setTitleHeader] = useState("Dashboard");

  const closeSidebar = () => {
    setIsAnimating(true);
    setSidebarOpen(false);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const openSidebar = () => {
    setSidebarOpen(true);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape" && sidebarOpen) {
        closeSidebar();
      }
    };

    if (sidebarOpen) {
      document.addEventListener("keydown", handleEscapeKey);
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
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar for desktop */}
        <div className="hidden lg:flex lg:w-1/5 lg:flex-col">
          <Sidebar />
        </div>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div
              className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity"
              onClick={closeSidebar}
            />
            <div className="relative flex flex-col w-64 bg-white">
              <Sidebar isMobile={true} onClose={closeSidebar} />
            </div>
          </div>
        )}

        {/* Main content area */}
        <div className="flex-1 lg:w-4/5 flex flex-col overflow-hidden">
          <Header onMenuClick={openSidebar} />

          <main className="flex-1 overflow-y-auto p-4 lg:p-6">
            {/* Clone children dan pass setTitleHeader sebagai prop */}
            {React.isValidElement(children)
              ? React.cloneElement(children)
              : children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
