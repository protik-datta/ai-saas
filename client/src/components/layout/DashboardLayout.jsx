import React from 'react'
import Sidebar from '../../pages/dashboard/Sidebar';
import { Outlet } from 'react-router-dom';
import Header from '../../pages/dashboard/Header';

const DashboardLayout = () => {
  return (
    <div className="h-screen w-full bg-[#f5f7fb] flex overflow-hidden">
      {/* Sidebar - Primary Left Column */}
      <Sidebar />

      {/* Right Side - Header + Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header - Fixed at top of right side */}
        <Header />

        {/* Main Content Area - Scrollable */}
        <main className="flex-1 overflow-y-auto p-6 scroll-smooth">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout
