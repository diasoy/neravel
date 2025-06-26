"use client";

import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Menu, Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function Header({ onMenuClick }) {
  const { user } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4 flex-shrink-0">
      <div className="flex items-center justify-between">
        {/* Left side - Menu button (mobile only) */}
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="lg:hidden mr-3"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="block">
            <h1 className="text-lg lg:text-xl font-semibold text-gray-900">
              Dashboard
            </h1>
          </div>
        </div>

        {/* Center - Search (hidden on small screens) */}
        <div className="hidden md:block flex-1 max-w-md mx-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 w-full"
            />
          </div>
        </div>

        {/* Right side - Notifications and user info */}
        <div className="flex items-center space-x-3">
          {/* Notification button */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5" />
            {/* Notification badge */}
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-medium">3</span>
            </span>
          </Button>

          {/* User info - hidden on small screens */}
          <div className="hidden sm:flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900 truncate max-w-32">
                {user?.name}
              </p>
              <p className="text-xs text-gray-500 truncate max-w-32">
                {user?.email}
              </p>
            </div>
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-gray-600 font-medium text-sm">
                {user?.name?.charAt(0)?.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Mobile user avatar only */}
          <div className="sm:hidden">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-600 font-medium text-sm">
                {user?.name?.charAt(0)?.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
