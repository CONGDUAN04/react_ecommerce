import { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./layouts/admin/Header.jsx";
import Sidebar from "./layouts/admin/Sidebar.jsx";

export default function AppAdmin() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex-1 flex flex-col min-h-screen">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}
