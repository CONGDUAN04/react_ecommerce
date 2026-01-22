import { useLocation, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/auth.context.jsx';
import { NotifyContext } from "../../context/notify.context.jsx";
import { logoutAPI } from '../../../services/api.services.js';
import { Search, Bell, MessageSquare, ChevronDown, LogOut, User, Settings } from 'lucide-react';

function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, setUser } = useContext(AuthContext);
    const { api } = useContext(NotifyContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const path = location.pathname;

    const getPageTitle = () => {
        if (path === '/' || path === '/admin') return 'Dashboard';
        if (path.startsWith('/admin/products/colors')) return 'Sản phẩm / Màu sắc';
        if (path.startsWith('/admin/products/storages')) return 'Sản phẩm / Dung lượng';
        if (path.startsWith('/admin/products')) return 'Sản phẩm';
        if (path.startsWith('/admin/categories')) return 'Danh mục sản phẩm';
        if (path.startsWith('/admin/brands')) return 'Thương hiệu';
        if (path.startsWith('/admin/users')) return 'Người dùng';
        if (path.startsWith('/admin/targets')) return 'Nhu cầu sử dụng';
        if (path.startsWith('/admin/settings')) return 'Cài đặt';
        return 'Dashboard';
    };

    const handleLogout = async () => {
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
            setTimeout(() => {
                navigate('/login');
            }, 500);
        } catch (error) {
            api.error({
                message: "Lỗi đăng xuất",
                description: error?.message || "Có lỗi xảy ra",
                duration: 2,
            });
        } finally {
            setDropdownOpen(false);
        }
    };

    const pageTitle = getPageTitle();
    const breadcrumbParent = pageTitle.includes('/') ? pageTitle.split('/')[0] : 'Trang chủ';
    const breadcrumbChild = pageTitle.includes('/') ? pageTitle.split('/')[1] : pageTitle;

    return (
        <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/80 py-4 pl-8 pr-0 flex justify-between items-center flex-wrap gap-4 sticky top-0 z-40 shadow-sm">
            {/* Left Section */}
            <div className="flex-1 min-w-[200px]">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent m-0 mb-1">
                    {pageTitle}
                </h1>

                <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-500 hover:text-gray-700 transition-colors cursor-pointer">{breadcrumbParent}</span>
                    <span className="text-gray-300">/</span>
                    <span className="text-blue-600 font-medium flex items-center gap-1">
                        {breadcrumbChild}
                        <div className="w-1 h-1 bg-blue-600 rounded-full animate-pulse" />
                    </span>
                </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3 flex-wrap ml-auto mr-6">
                {/* Search Bar */}
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Tìm kiếm..."
                        className="py-2.5 pl-10 pr-4 border border-gray-200 rounded-xl text-sm w-[280px] outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 hover:border-gray-300 bg-gray-50/50 focus:bg-white"
                    />
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    {/* Notification Button */}
                    <button
                        className="relative w-10 h-10 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center cursor-pointer text-gray-600 transition-all duration-200 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 hover:scale-105 active:scale-95 group"
                        title="Thông báo"
                    >
                        <Bell size={18} className="group-hover:animate-pulse" />
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-red-500 to-red-600 rounded-full border-2 border-white flex items-center justify-center shadow-lg">
                            <span className="text-white text-[10px] font-bold">3</span>
                        </div>
                    </button>

                    {/* Message Button */}
                    <button
                        className="relative w-10 h-10 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center cursor-pointer text-gray-600 transition-all duration-200 hover:bg-green-50 hover:border-green-200 hover:text-green-600 hover:scale-105 active:scale-95 group"
                        title="Tin nhắn"
                    >
                        <MessageSquare size={18} className="group-hover:animate-pulse" />
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full border-2 border-white animate-pulse" />
                    </button>

                    {/* Divider */}
                    <div className="w-px h-8 bg-gradient-to-b from-transparent via-gray-300 to-transparent mx-1" />

                    {/* User Profile with Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="flex items-center gap-3 cursor-pointer group bg-gray-50/50 hover:bg-gray-100/50 rounded-xl px-3 py-2 border border-transparent hover:border-gray-200 transition-all duration-200"
                        >
                            {/* Avatar */}
                            <div className="relative">
                                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center text-sm font-bold transition-all duration-200 group-hover:scale-105 overflow-hidden shadow-lg shadow-blue-500/20">
                                    {user?.avatar ? (
                                        <img
                                            src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${user.avatar}`}
                                            alt="Avatar"
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                            }}
                                        />
                                    ) : (
                                        (user?.fullName || user?.name)?.substring(0, 2).toUpperCase() || null
                                    )}
                                </div>
                                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                            </div>

                            {/* Name & Role */}
                            <div className="flex flex-col">
                                <div className="text-sm font-semibold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                                    {user?.fullName || user?.name || user?.email || ''}
                                </div>
                                <div className="text-xs text-gray-500 leading-tight">
                                    {user?.role?.name || ''}
                                </div>
                            </div>

                            <ChevronDown
                                size={16}
                                className={`text-gray-400 group-hover:text-gray-600 transition-all ${dropdownOpen ? 'rotate-180' : ''
                                    }`}
                            />
                        </button>

                        {/* Dropdown Menu */}
                        {dropdownOpen && (
                            <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                {/* User Info */}
                                <div className="px-4 py-3 border-b border-gray-100">
                                    <div className="text-sm font-semibold text-gray-900">
                                        {user?.fullName || user?.name || ''}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">
                                        {user?.email || ''}
                                    </div>
                                </div>

                                {/* Menu Items */}
                                <div className="py-2">
                                    <button
                                        onClick={() => {
                                            navigate('/profile');
                                            setDropdownOpen(false);
                                        }}
                                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                                    >
                                        <User size={16} />
                                        <span>Hồ sơ cá nhân</span>
                                    </button>

                                    <button
                                        onClick={() => {
                                            navigate('/settings');
                                            setDropdownOpen(false);
                                        }}
                                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                                    >
                                        <Settings size={16} />
                                        <span>Cài đặt</span>
                                    </button>

                                    <div className="my-1 border-t border-gray-100" />

                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                                    >
                                        <LogOut size={16} />
                                        <span>Đăng xuất</span>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Overlay to close dropdown */}
                        {dropdownOpen && (
                            <div
                                className="fixed inset-0 z-40"
                                onClick={() => setDropdownOpen(false)}
                            />
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;