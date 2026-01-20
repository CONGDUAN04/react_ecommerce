import React, { useState, useEffect, useCallback, useMemo, useContext } from 'react';
import {
    Package,
    Users,
    Hexagon,
    ChevronRight,
    Menu,
    X,
    Settings,
    LogOut,
    LayoutDashboard,
    Droplet,
    Database,
    Target,
} from 'lucide-react';

import '../../styles/sidebar.css';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { logoutAPI } from '../../../../services/api.services.js';
import { AuthContext } from '../../../context/auth.context.jsx';
import { NotifyContext } from '../../../context/notify.context.jsx';

const getActiveMenuFromPath = (path) => {
    const routeMap = {
        '/admin/products/colors': { menu: 'products', subMenu: 'colors' },
        '/admin/products/storages': { menu: 'products', subMenu: 'storages' },
        '/admin/products': { menu: 'products', subMenu: null },
        '/admin/categories': { menu: 'categories', subMenu: null },
        '/admin/brands': { menu: 'brands', subMenu: null },
        '/admin/users': { menu: 'users', subMenu: null },
        '/admin/targets': { menu: 'targets', subMenu: null },
    };

    const matched = routeMap[path] ||
        routeMap[
        Object.keys(routeMap)
            .sort((a, b) => b.length - a.length)
            .find(key => path.startsWith(key))
        ] ||
        { menu: 'dashboard', subMenu: null };

    return matched;
};

export default function Sidebar({ isOpen, toggleSidebar }) {
    const navigate = useNavigate();
    const location = useLocation();
    const { setUser } = useContext(AuthContext);
    const { api } = useContext(NotifyContext);

    const initialActive = getActiveMenuFromPath(location.pathname);
    const [activeMenu, setActiveMenu] = useState(initialActive.menu);
    const [activeSubMenu, setActiveSubMenu] = useState(initialActive.subMenu);

    const menuItems = useMemo(() => [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
        {
            id: 'products',
            label: 'Sản phẩm',
            icon: Package,
            path: '/admin/products',
            subMenu: [
                { id: 'colors', label: 'Màu sắc', path: '/admin/products/colors', icon: Droplet },
                { id: 'storages', label: 'Dung lượng', path: '/admin/products/storages', icon: Database }
            ]
        },
        { id: 'categories', label: 'Danh mục sản phẩm', icon: Package, path: '/admin/categories' },
        { id: 'users', label: 'Người dùng', icon: Users, path: '/admin/users' },
        { id: 'brands', label: 'Thương hiệu', icon: Hexagon, path: '/admin/brands' },
        { id: 'targets', label: 'Nhu cầu sử dụng', icon: Target, path: '/admin/targets' },
    ], []);

    const bottomMenuItems = useMemo(() => [
        { id: 'settings', label: 'Cài đặt', icon: Settings, path: '/settings' },
        { id: 'logout', label: 'Logout', icon: LogOut },
    ], []);

    useEffect(() => {
        const matched = getActiveMenuFromPath(location.pathname);
        setActiveMenu(matched.menu);
        setActiveSubMenu(matched.subMenu);
    }, [location.pathname]);

    const handleLogout = useCallback(async () => {
        try {
            const res = await logoutAPI();
            localStorage.removeItem("access_token");
            localStorage.removeItem("user");
            setUser(null);

            api.success({
                message: "Đăng xuất thành công",
                description: res?.message || "Bạn đã đăng xuất khỏi hệ thống",
                duration: 2,
            });
        } catch (error) {
            api.error({
                message: "Lỗi đăng xuất",
                description: error.message,
            });
        }
    }, [setUser, api]);
    return (
        <>
            <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
                <div className="sidebar-header">
                    {isOpen ? (
                        <>
                            <div className="logo">
                                <span className="logo-text">TeachPhone</span>
                            </div>

                            <button onClick={toggleSidebar} className="toggle-button">
                                <X size={20} />
                            </button>
                        </>
                    ) : (
                        <div className="sidebar-collapsed">
                            <button onClick={toggleSidebar} className="toggle-button">
                                <Menu size={18} />
                            </button>
                        </div>
                    )}
                </div>

                <nav className="nav">

                    <div className="menu-section">
                        {isOpen && <div className="menu-label">MENU</div>}

                        {menuItems.map(item => {
                            const Icon = item.icon;
                            const isActive = activeMenu === item.id;
                            const hasSub = item.subMenu?.length > 0;

                            return (
                                <div key={item.id}>
                                    <Link
                                        to={item.path}
                                        className={`menu-item ${isActive ? "active" : ""}`}
                                        onClick={() => setActiveMenu(item.id)}
                                    >
                                        <div className="menu-item-left">
                                            <Icon size={20} />
                                            {isOpen && <span>{item.label}</span>}
                                        </div>

                                        {isOpen && hasSub && (
                                            <ChevronRight size={16} className="chevron" />
                                        )}
                                    </Link>

                                    {isOpen && hasSub && isActive && (
                                        <div className="sub-menu">
                                            {item.subMenu.map(sub => {
                                                const SubIcon = sub.icon;
                                                const activeSub = activeSubMenu === sub.id;

                                                return (
                                                    <Link
                                                        to={sub.path}
                                                        key={sub.id}
                                                        className={`sub-item ${activeSub ? "active" : ""}`}
                                                        onClick={() => setActiveSubMenu(sub.id)}
                                                    >
                                                        <SubIcon size={16} />
                                                        <span>{sub.label}</span>
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* BOTTOM MENU */}
                    <div className="bottom-menu">
                        {bottomMenuItems.map(item => {
                            const Icon = item.icon;

                            if (item.id === "logout")
                                return (
                                    <button className="menu-item logout-btn" onClick={handleLogout} key="logout">
                                        <div className="menu-item-left">
                                            <Icon size={20} />
                                            {isOpen && <span>{item.label}</span>}
                                        </div>
                                    </button>
                                );

                            return (
                                <Link
                                    to={item.path}
                                    key={item.id}
                                    className="menu-item"
                                >
                                    <div className="menu-item-left">
                                        <Icon size={20} />
                                        {isOpen && <span>{item.label}</span>}
                                    </div>
                                </Link>
                            );

                        })}
                    </div>
                </nav>
            </aside>

        </>
    );
}