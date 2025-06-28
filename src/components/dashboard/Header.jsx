"use client";

import { Menu, Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";

export function Header({ onMenuClick }) {
  const { user } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4 flex-shrink-0 sticky top-0 z-30">
      <div className="flex items-center justify-between">
        {/* Left side - Menu button and Title */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="lg:hidden hover:bg-gray-100 transition-colors duration-200"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Center - Search (hidden on small screens) */}
        <div className="block flex-1 w-full mr-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 w-full border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Right side - Notifications and User */}
        <div className="flex items-center space-x-3">
          {/* Notifications */}
          <Button
            variant="ghost"
            size="sm"
            className="relative hover:bg-gray-100 transition-colors duration-200"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-medium">3</span>
            </span>
          </Button>

          {/* User Info - Desktop */}
          <div className="hidden sm:flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900 truncate max-w-32">
                {user?.name}
              </p>
              <p className="text-xs text-gray-500 truncate max-w-32">
                {user?.email}
              </p>
            </div>
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-medium text-sm">
                {user?.name?.charAt(0)?.toUpperCase()}
              </span>
            </div>
          </div>

          {/* User Avatar - Mobile */}
          <div className="sm:hidden">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">
                {user?.name?.charAt(0)?.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
