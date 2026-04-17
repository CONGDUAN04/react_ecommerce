import { useState, useEffect, useMemo, useContext } from "react";
import {
  Package,
  Users,
  ChevronRight,
  Menu,
  X,
  LayoutDashboard,
  Droplet,
  Tags,
  BadgeCheck,
  Boxes,
  ShieldCheck,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/auth.context.jsx";
import "../../styles/admin/sidebar.css";

const getActiveMenuFromPath = (path) => {
  const routeMap = {
    "/admin/product-groups": { menu: "product-groups", subMenu: null },
    "/admin/products": { menu: "product-groups", subMenu: "products" },
    "/admin/products/colors": { menu: "product-groups", subMenu: "colors" },
    "/admin/categories": { menu: "categories", subMenu: null },
    "/admin/brands": { menu: "brands", subMenu: null },
    "/admin/users": { menu: "users", subMenu: null },
    "/admin/roles": { menu: "roles", subMenu: null },
    "/admin/targets": { menu: "targets", subMenu: null },
  };

  const matched = routeMap[path] ||
    routeMap[
      Object.keys(routeMap)
        .sort((a, b) => b.length - a.length)
        .find((key) => path.startsWith(key))
    ] || { menu: "dashboard", subMenu: null };

  return matched;
};

export default function Sidebar({ isOpen, toggleSidebar }) {
  const location = useLocation();
  const { setUser } = useContext(AuthContext);

  const initialActive = getActiveMenuFromPath(location.pathname);

  const [activeMenu, setActiveMenu] = useState(initialActive.menu);
  const [activeSubMenu, setActiveSubMenu] = useState(initialActive.subMenu);

  const menuItems = useMemo(
    () => [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: LayoutDashboard, // ✅ chuẩn
        path: "/admin",
      },
      {
        id: "product-groups",
        label: "Nhóm sản phẩm",
        icon: Boxes, // ✅ rất hợp (group)
        path: "/admin/product-groups",
        subMenu: [
          {
            id: "products",
            label: "Sản phẩm",
            path: "/admin/products",
            icon: Package, // ✅ sản phẩm
          },
          {
            id: "colors",
            label: "Màu sắc",
            path: "/admin/products/colors",
            icon: Droplet, // ✅ màu
          },
        ],
      },
      {
        id: "categories",
        label: "Danh mục sản phẩm",
        icon: Tags, // ✅ category
        path: "/admin/categories",
      },
      {
        id: "users",
        label: "Người dùng",
        icon: Users, // ✅ user
        path: "/admin/users",
      },
      {
        id: "brands",
        label: "Thương hiệu",
        icon: BadgeCheck, // ✅ brand (badge = hợp lý)
        path: "/admin/brands",
      },
      {
        id: "roles",
        label: "Phân quyền",
        icon: ShieldCheck, // 🔥 BEST CHOICE
        path: "/admin/roles",
      },
    ],
    [],
  );

  useEffect(() => {
    const matched = getActiveMenuFromPath(location.pathname);
    setActiveMenu(matched.menu);
    setActiveSubMenu(matched.subMenu);
  }, [location.pathname]);

  return (
    <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
      {/* HEADER */}
      <div className="sidebar-header">
        <div className="sidebar-header-line"></div>

        {isOpen ? (
          <>
            <div className="logo">
              <div className="logo-box">T</div>

              <div>
                <div className="logo-title">TeachPhone</div>
                <div className="logo-sub">Admin Panel</div>
              </div>
            </div>

            <button className="icon-btn" onClick={toggleSidebar}>
              <X size={18} />
            </button>
          </>
        ) : (
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <button className="icon-btn" onClick={toggleSidebar}>
              <Menu size={20} />
            </button>
          </div>
        )}
      </div>

      {/* NAVIGATION */}
      <nav className="nav">
        {isOpen && (
          <div className="menu-title">
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#60a5fa",
              }}
            />
            MENU
          </div>
        )}

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeMenu === item.id;
          const hasSub = item.subMenu?.length > 0;

          return (
            <div key={item.id}>
              {/* MAIN ITEM */}
              <Link
                to={item.path}
                className={`menu-item ${isActive ? "active" : ""}`}
                onClick={() => setActiveMenu(item.id)}
              >
                <Icon className="menu-icon" size={22} />

                {isOpen && <span>{item.label}</span>}

                {isOpen && hasSub && (
                  <ChevronRight
                    size={18}
                    style={{
                      marginLeft: "auto",
                      transform: isActive ? "rotate(90deg)" : "rotate(0deg)",
                      transition: "0.3s",
                    }}
                  />
                )}
              </Link>

              {/* SUB MENU */}
              {isOpen && hasSub && isActive && (
                <div className="submenu">
                  {item.subMenu.map((sub) => {
                    const SubIcon = sub.icon;
                    const activeSub = activeSubMenu === sub.id;

                    return (
                      <Link
                        key={sub.id}
                        to={sub.path}
                        className={`submenu-item ${activeSub ? "active" : ""}`}
                        onClick={() => setActiveSubMenu(sub.id)}
                      >
                        <SubIcon size={18} />
                        <span>{sub.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
