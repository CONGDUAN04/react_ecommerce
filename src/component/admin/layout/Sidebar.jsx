import React, { useState, useEffect, useCallback, useMemo, useContext } from 'react';
import {
    Package, Users, Hexagon, ChevronRight, Menu, X,
    Settings, LogOut, LayoutDashboard, Droplet, Database, Target,
    Bell, MessageSquare, Search
} from 'lucide-react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { logoutAPI } from '../../../services/api.services.js';
import { AuthContext } from '../../context/auth.context.jsx';
import { NotifyContext } from '../../context/notify.context.jsx';

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
        routeMap[Object.keys(routeMap).sort((a, b) => b.length - a.length).find(key => path.startsWith(key))] ||
        { menu: 'dashboard', subMenu: null };

    return matched;
};

export default function Sidebar({ isOpen, toggleSidebar }) {
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
            api.error({ message: "Lỗi đăng xuất", description: error.message });
        }
    }, [setUser, api]);

    return (
        <aside className={`bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-r border-slate-700/30 flex flex-col sticky top-0 h-screen overflow-hidden transition-all duration-500 ease-in-out backdrop-blur-2xl ${isOpen ? 'w-72' : 'w-24'} md:relative md:z-auto fixed z-50 left-0 shadow-2xl`}>
            {/* Animated Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.1),transparent_50%)] pointer-events-none" />
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="h-20 px-5 py-4 border-b border-slate-700/20 flex justify-between items-center relative z-10 group">
                <div className="absolute bottom-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

                {isOpen ? (
                    <>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/40 group-hover:shadow-xl group-hover:shadow-blue-500/60 transition-all transform group-hover:scale-105">
                                <span className="text-white font-black text-lg">T</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-base font-bold text-white tracking-tight">TeachPhone</span>
                                <span className="text-xs text-blue-400/70 font-medium">Admin Panel</span>
                            </div>
                        </div>
                        <button
                            onClick={toggleSidebar}
                            className="w-9 h-9 border border-slate-700/40 bg-slate-800/40 rounded-xl flex items-center justify-center text-slate-400 hover:bg-blue-500/15 hover:border-blue-500/40 hover:text-blue-400 hover:scale-110 active:scale-95 transition-all duration-300 backdrop-blur-sm"
                        >
                            <X size={18} />
                        </button>
                    </>
                ) : (
                    <div className="w-full flex justify-center">
                        <button
                            onClick={toggleSidebar}
                            className="w-11 h-11 bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-500 rounded-xl flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/70"
                        >
                            <Menu size={20} />
                        </button>
                    </div>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 flex flex-col justify-between overflow-y-auto p-3 overscroll-contain scrollbar-thin scrollbar-thumb-slate-700/40 scrollbar-track-transparent hover:scrollbar-thumb-blue-500/60 relative z-10">
                {/* Menu Section */}
                <div className="flex flex-col gap-1">
                    {isOpen && (
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-widest px-4 py-3 mb-1 flex items-center gap-2">
                            <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-pulse" />
                            MENU
                        </div>
                    )}

                    {menuItems.map(item => {
                        const Icon = item.icon;
                        const isActive = activeMenu === item.id;
                        const hasSub = item.subMenu?.length > 0;

                        return (
                            <div key={item.id} className="relative">
                                <Link
                                    to={item.path}
                                    className={`group flex items-center gap-3 px-4 py-3.5 rounded-xl cursor-pointer transition-all duration-300 text-sm font-medium relative border overflow-hidden
                                        ${isActive
                                            ? 'bg-gradient-to-r from-blue-500/30 to-cyan-500/15 text-white font-semibold border-blue-500/40 shadow-lg shadow-blue-500/20'
                                            : 'text-slate-400 hover:text-white border-transparent hover:bg-slate-800/50 hover:border-slate-700/40'
                                        }`}
                                    onClick={() => setActiveMenu(item.id)}
                                >
                                    {/* Active indicator */}
                                    {isActive && (
                                        <div className="absolute left-0 top-1/4 bottom-1/4 w-1.5 bg-gradient-to-b from-blue-400 via-blue-500 to-cyan-400 rounded-r-lg shadow-lg shadow-blue-500/50" />
                                    )}

                                    {/* Hover glow effect */}
                                    <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isActive ? 'opacity-100' : ''}`} />

                                    <div className="flex items-center gap-3 flex-1 relative z-10">
                                        <div className={`transition-all duration-300 ${isActive ? 'text-blue-300 scale-110' : 'text-slate-400 group-hover:text-blue-400 group-hover:scale-110'}`}>
                                            <Icon size={22} />
                                        </div>
                                        {isOpen && <span className="transition-all duration-200 group-hover:text-blue-200">{item.label}</span>}
                                    </div>

                                    {isOpen && hasSub && (
                                        <ChevronRight
                                            size={18}
                                            className={`transition-all duration-300 relative z-10 ${isActive ? 'text-blue-400 rotate-90' : 'text-slate-500 group-hover:text-slate-300'}`}
                                        />
                                    )}
                                </Link>

                                {isOpen && hasSub && isActive && (
                                    <div className="flex flex-col gap-1 pl-11 mt-1.5 animate-in slide-in-from-top-2 fade-in duration-300">
                                        {item.subMenu.map(sub => {
                                            const SubIcon = sub.icon;
                                            const activeSub = activeSubMenu === sub.id;

                                            return (
                                                <Link
                                                    to={sub.path}
                                                    key={sub.id}
                                                    className={`group px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-3 relative overflow-hidden border
                                                        ${activeSub
                                                            ? 'bg-blue-500/20 text-blue-200 border-blue-500/30 shadow-md shadow-blue-500/15'
                                                            : 'text-slate-400 hover:text-white hover:bg-slate-800/40 border-transparent'
                                                        }`}
                                                    onClick={() => setActiveSubMenu(sub.id)}
                                                >
                                                    {activeSub && (
                                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-cyan-400 rounded-r" />
                                                    )}
                                                    <div className={`transition-all duration-200 relative z-10 ${activeSub ? 'text-blue-300 scale-110' : 'text-slate-400 group-hover:text-blue-400 group-hover:scale-110'}`}>
                                                        <SubIcon size={18} />
                                                    </div>
                                                    <span className="group-hover:text-blue-200 transition-colors">{sub.label}</span>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Bottom Menu */}
                <div className="border-t border-slate-700/20 pt-3 mt-3 flex flex-col gap-1">
                    {bottomMenuItems.map(item => {
                        const Icon = item.icon;

                        if (item.id === "logout") {
                            return (
                                <button
                                    className="group flex items-center gap-3 px-4 py-3.5 rounded-xl cursor-pointer transition-all duration-300 text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/20 w-full text-left bg-transparent border border-transparent"
                                    onClick={handleLogout}
                                    key="logout"
                                >
                                    <Icon size={22} className="group-hover:scale-110 transition-transform" />
                                    {isOpen && <span className="group-hover:text-red-300 transition-colors">{item.label}</span>}
                                </button>
                            );
                        }

                        return (
                            <Link
                                to={item.path}
                                key={item.id}
                                className="group flex items-center gap-3 px-4 py-3.5 rounded-xl cursor-pointer transition-all duration-300 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/50 border border-transparent hover:border-slate-700/40"
                            >
                                <Icon size={22} className="group-hover:scale-110 transition-transform" />
                                {isOpen && <span className="group-hover:text-blue-200 transition-colors">{item.label}</span>}
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </aside>
    );
}