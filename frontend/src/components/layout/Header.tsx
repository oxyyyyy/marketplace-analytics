import React from "react";

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="text-3xl">📊</div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Marketplace Dashboard
              </h1>
              <p className="text-xs text-gray-500">Real-time analytics</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-green-700">Live</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
