import React, { useState } from 'react'
import Sidebar from '../../pages/dashboard/Sidebar';
import { Outlet } from 'react-router-dom';
import Header from '../../pages/dashboard/Header';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen w-full bg-[#f5f7fb] flex overflow-hidden relative">
      {/* Sidebar - Overlay on mobile, static on desktop */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Right Side - Header + Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header - Fixed at top of right side */}
        <Header onMenuClick={() => setSidebarOpen(true)} />

        {/* Main Content Area - Scrollable */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 scroll-smooth">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default DashboardLayout
