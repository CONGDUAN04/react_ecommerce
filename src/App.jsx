import { useContext, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Header from './component/admin/layout/header/Header.jsx';
import Sidebar from './component/admin/layout/sidebar/Sidebar.jsx';
import { AuthContext } from './component/context/auth.context.jsx';
import { NotifyContext } from './component/context/notify.context.jsx'; // ✅ Import thêm
import './component/admin/styles/main.css';

export default function App() {
  const { user } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  if (!user || user.role?.name !== "Admin") {
    return <Navigate to="/" replace />;
  }
  return (
    <>
      <div className="container">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <div className="main-content">
          <Header />
          <Outlet />
        </div>
      </div>
    </>

  );
}