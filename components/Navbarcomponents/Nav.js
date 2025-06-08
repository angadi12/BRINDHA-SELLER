import Image from "next/image";
import React from "react";
import { Bell, ChevronDown, ChevronRight } from "lucide-react";
import NotificationSheet from "./notification-sheet";

const Nav = () => {
  return (
    <header className="h-16 py-8 border-b flex items-center justify-between px-6 sticky top-0 z-50 bg-white">
      <div>
        <h1 className="text-lg font-medium">Welcome back, Martin!</h1>
        <p className="text-sm text-gray-500">
          Here&apos;s what&apos;s happening today.
        </p>
      </div>

      <div className="flex items-center space-x-4">
        <NotificationSheet />

        <div className="flex items-center">
          <span className="text-sm font-medium mr-1">En</span>
          <ChevronDown className="h-4 w-4 text-gray-600" />
        </div>
      </div>
    </header>
  );
};

export default Nav;
