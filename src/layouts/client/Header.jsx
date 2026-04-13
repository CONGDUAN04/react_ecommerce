import { Search, ShoppingCart, Menu, LogIn, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Dropdown, Avatar, Badge, Spin } from "antd";
import { useContext, useState, useCallback, useEffect } from "react";

import { AuthContext } from "../../contexts/auth.context.jsx";
import { NotifyContext } from "../../contexts/notify.context.jsx";
import { logoutAPI } from "../../services/api.auth.js";

const Header = ({ cartCount = 0 }) => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const { api } = useContext(NotifyContext);

  const [loadingLogout, setLoadingLogout] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* SCROLL EFFECT */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* LOGOUT */
  const handleLogout = useCallback(async () => {
    if (loadingLogout) return;

    setLoadingLogout(true);
    try {
      const res = await logoutAPI();

      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      setUser(null);

      api.success({
        message: "Đăng xuất thành công",
        description: res?.message,
      });

      navigate("/");
    } catch (error) {
      api.error({
        message: "Lỗi",
        description: error?.message,
      });
    } finally {
      setLoadingLogout(false);
    }
  }, [api, navigate, setUser, loadingLogout]);

  /* MENU */
  const userMenu = {
    items: [
      { key: "profile", label: "Thông tin cá nhân" },
      { type: "divider" },
      {
        key: "logout",
        danger: true,
        label: loadingLogout ? <Spin size="small" /> : "Đăng xuất",
      },
    ],
    onClick: ({ key }) => {
      if (key === "logout") handleLogout();
      if (key === "profile") navigate("/profile");
    },
  };

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-all duration-300 ${
        scrolled ? "shadow-md" : "border-b"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-6">
        {/* LOGO */}
        <h1
          className="text-2xl font-black text-[#e53935] cursor-pointer"
          onClick={() => navigate("/")}
        >
          TechZone
        </h1>

        {/* NAV */}
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <span className="cursor-pointer hover:text-[#e53935] transition">
            Danh mục
          </span>
          <span className="cursor-pointer hover:text-[#e53935] transition">
            Flash Sale
          </span>
          <span className="cursor-pointer hover:text-[#e53935] transition">
            Trả góp
          </span>
          <span className="cursor-pointer hover:text-[#e53935] transition">
            Tin tức
          </span>
        </nav>

        {/* SEARCH */}
        <div className="flex-1 hidden sm:block">
          <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 transition focus-within:ring-2 focus-within:ring-[#e53935]/30">
            <Search size={18} className="text-gray-400" />
            <input
              placeholder="Tìm sản phẩm, thương hiệu..."
              className="bg-transparent outline-none px-3 w-full text-sm"
            />
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-5">
          {/* CART */}
          {user && (
            <Badge count={cartCount} size="small">
              <ShoppingCart
                className="cursor-pointer hover:text-[#e53935] transition"
                onClick={() => navigate("/cart")}
              />
            </Badge>
          )}

          {/* USER */}
          {user ? (
            <Dropdown menu={userMenu} placement="bottomRight">
              <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-lg transition">
                <Avatar
                  size={32}
                  src={
                    user?.avatar
                      ? `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${user.avatar}`
                      : null
                  }
                  icon={<User size={16} />}
                />
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
