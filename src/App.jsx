import { useContext, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Header from './layouts/admin/Header.jsx';
import Sidebar from './layouts/admin/Sidebar.jsx';
import { AuthContext } from './contexts/auth.context.jsx';

export default function App() {
  const { user } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (!user || user.role?.name !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex-1 flex flex-col min-h-screen">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}