import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./layouts/admin/Header.jsx";
import Sidebar from "./layouts/admin/Sidebar.jsx";

export default function AppAdmin() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Overlay mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen((v) => !v)}
      />

      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        <Header toggleSidebar={() => setSidebarOpen((v) => !v)} />
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
