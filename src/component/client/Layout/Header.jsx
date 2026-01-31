import { Search, ShoppingCart, Menu, LogIn, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Dropdown, Avatar, Spin } from "antd";
import { useContext, useEffect, useState, useCallback } from "react";

import { AuthContext } from "../../context/auth.context.jsx";
import { NotifyContext } from "../../context/notify.context.jsx";
import { logoutAPI } from "../../../services/api.services.js";

const Header = ({ cartCount = 0 }) => {
    const navigate = useNavigate();

    const { user, setUser } = useContext(AuthContext);
    const { api } = useContext(NotifyContext);

    const [loadingUser, setLoadingUser] = useState(true);

    /* LOAD USER FROM LOCAL STORAGE */
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) setUser(JSON.parse(storedUser));
        setLoadingUser(false);
    }, [setUser]);

    /* LOGOUT */
    const handleLogout = useCallback(async () => {
        try {
            const res = await logoutAPI();
            localStorage.removeItem("access_token");
            localStorage.removeItem("user");
            setUser(null);

            api.success({
                message: "Đăng xuất thành công",
                description: res?.message || "Bạn đã đăng xuất",
                duration: 2,
            });

            navigate("/");
        } catch (error) {
            api.error({
                message: "Lỗi đăng xuất",
                description: error?.message || "Đăng xuất thất bại",
                duration: 2,
            });
        }
    }, [api, navigate, setUser]);

    /* DROPDOWN MENU */
    const userMenu = {
        items: [
            { key: "profile", label: "Thông tin cá nhân" },
            { type: "divider" },
            { key: "logout", label: "Đăng xuất" },
        ],
        onClick: ({ key }) => {
            if (key === "logout") handleLogout();
            if (key === "profile") navigate("/profile");
        },
    };

    return (
        <header className="bg-white sticky top-0 z-50 border-b">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-6">
                {/* LOGO */}
                <h1
                    className="text-2xl font-black text-[#e53935] cursor-pointer"
                    onClick={() => navigate("/")}
                >
                    TechZone
                </h1>

                {/* NAV */}
                <nav className="hidden md:flex gap-6 text-sm font-medium">
                    <span className="cursor-pointer hover:text-[#e53935]">Danh mục</span>
                    <span className="cursor-pointer hover:text-[#e53935]">Flash Sale</span>
                    <span className="cursor-pointer hover:text-[#e53935]">Trả góp</span>
                    <span className="cursor-pointer hover:text-[#e53935]">Tin tức</span>
                </nav>

                {/* SEARCH */}
                <div className="flex-1">
                    <div className="flex bg-gray-100 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-[#e53935]/30">
                        <Search size={18} className="text-gray-400" />
                        <input
                            placeholder="Tìm sản phẩm, thương hiệu..."
                            className="bg-transparent outline-none px-3 w-full text-sm"
                        />
                    </div>
                </div>

                {/* ACTIONS */}
                <div className="flex items-center gap-5">
                    {/* CART – chỉ hiện khi login */}
                    {user && (
                        <div
                            onClick={() => navigate("/cart")}
                            className="relative cursor-pointer"
                        >
                            <ShoppingCart />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-[#e53935] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </div>
                    )}

                    {/* USER / LOGIN */}
                    {loadingUser ? (
                        <Spin size="small" />
                    ) : user ? (
                        <Dropdown menu={userMenu} placement="bottomRight">
                            <div className="flex items-center gap-2 cursor-pointer">
                                {user?.avatar ? (
                                    <img
                                        src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${user.avatar}`}
                                        alt="avatar"
                                        className="w-8 h-8 rounded-full object-cover"
                                    />
                                ) : (
                                    <Avatar icon={<User size={16} />} />
                                )}
                                <span className="text-sm font-medium hidden md:block">
                                    {user?.fullName || user?.username}
                                </span>
                            </div>
                        </Dropdown>
                    ) : (
                        <button
                            onClick={() => navigate("/login")}
                            className="hidden md:flex items-center gap-2 bg-[#e53935] text-white px-4 py-2 rounded-full text-sm font-medium hover:opacity-90 transition"
                        >
                            <LogIn size={16} />
                            Đăng nhập
                        </button>
                    )}

                    {/* MOBILE MENU */}
                    <Menu className="md:hidden cursor-pointer" />
                </div>
            </div>
        </header>
    );
};

export default Header;
