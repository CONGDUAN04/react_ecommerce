import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/auth.context.jsx";
import { NotifyContext } from "../../contexts/notify.context.jsx";
import { logoutAPI } from "../../services/api.auth.js";
import {
  Search,
  Bell,
  MessageSquare,
  ChevronDown,
  LogOut,
  User,
  Settings,
  Menu,
} from "lucide-react";
import "../../styles/admin/header.css";
import { useLoading } from "../../hooks/useLoading.js";
import { useAuth } from "../../hooks/useAuth.js";
import { handleApiError, handleApiSuccess } from "../../utils/apiHandler.js";
const ROUTE_TITLES = [
  ["/admin/product-groups", "Nhóm sản phẩm"],
  ["/admin/products/colors", "Sản phẩm / Màu sắc"],
  ["/admin/products", "Sản phẩm"],
  ["/admin/categories", "Danh mục"],
  ["/admin/brands", "Thương hiệu"],
  ["/admin/users", "Người dùng"],
  ["/admin/roles", "Vai trò"],
  ["/admin/settings", "Cài đặt"],
];

function usePageTitle(path) {
  if (path === "/" || path === "/admin") return "Dashboard";
  const match = ROUTE_TITLES.find(([r]) => path.startsWith(r));
  return match ? match[1] : "Dashboard";
}

export default function Header({ toggleSidebar }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const { api } = useContext(NotifyContext);
  const [dropOpen, setDropOpen] = useState(false);

  const title = usePageTitle(location.pathname);
  const parts = title.split(" / ");
  const parent = parts.length > 1 ? parts[0] : "Trang chủ";
  const current = parts[parts.length - 1];

  const { callAuth } = useAuth();
  const { loading } = useLoading();

  const handleLogout = async () => {
    if (loading) return;

    try {
      await callAuth(() => logoutAPI(), {
        showLoading: false,
      });

      localStorage.clear();
      setUser(null);

      handleApiSuccess(api, "Đăng xuất thành công!");

      setDropOpen(false);

      navigate("/");
    } catch (err) {
      handleApiError(api, err);
    }
  };

  const initials = (user?.fullName || "AD")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="header">
      <div className="header-container">
        {/* title */}
        <div className="header-title">
          <h1>{title}</h1>
          <div className="breadcrumb">
            <span>{parent}</span>
            <span>/</span>
            <span className="active">{current}</span>
          </div>
        </div>

        {/* search */}
        <div className="search-box">
          <Search size={14} />
          <input placeholder="Tìm kiếm..." />
        </div>

        {/* actions */}
        <div className="header-actions">
          <div className="icon-btn">
            <Bell size={16} />
            <span className="badge">3</span>
          </div>

          <div className="icon-btn">
            <MessageSquare size={16} />
            <span className="dot" />
          </div>

          <div className="divider" />

          {/* user */}
          <div className="user" onClick={() => setDropOpen(!dropOpen)}>
            <div className="avatar">
              {user?.avatar ? <img src={user.avatar} alt="" /> : initials}
              <span className="online" />
            </div>

            <div className="user-info">
              <span className="name">{user?.fullName || user?.email}</span>
              <span className="role">{user?.role?.name}</span>
            </div>

            <ChevronDown size={14} className={dropOpen ? "rotate" : ""} />

            {dropOpen && (
              <div className="dropdown">
                <div className="dropdown-header">
                  <p>{user?.fullName}</p>
                  <span>{user?.email}</span>
                </div>

                <button onClick={() => navigate("/profile")}>
                  <User size={14} /> Hồ sơ
                </button>

                <button onClick={() => navigate("/settings")}>
                  <Settings size={14} /> Cài đặt
                </button>

                <div className="divider-line" />

                <button className="logout" onClick={handleLogout}>
                  <LogOut size={14} /> Đăng xuất
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
