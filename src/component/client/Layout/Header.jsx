import { Dropdown, Avatar, Spin } from 'antd';
import {
    SearchOutlined,
    ShoppingCartOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { useContext, useEffect, useState, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { AuthContext } from "../../context/auth.context.jsx";
import { logoutAPI } from '../../../services/api.services.js';
import { NotifyContext } from "../../context/notify.context.jsx";

import logo from '../../../assets/logo.png';
import "./header.css";

export default function Header() {
    const [current, setCurrent] = useState('/');
    const [loadingUser, setLoadingUser] = useState(true);

    const { user, setUser } = useContext(AuthContext);
    const { api } = useContext(NotifyContext);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoadingUser(false);
    }, [setUser]);

    useEffect(() => {
        setCurrent(location.pathname === '/' ? '/' : location.pathname);
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

            setTimeout(() => {
                navigate("/");
            }, 1000);

        } catch (error) {
            api.error({
                message: "Lỗi đăng xuất",
                description: error?.message || "Đăng xuất thất bại",
                duration: 2,
            });
        }
    }, [api, navigate, setUser]);

    const userMenu = {
        items: [
            {
                key: 'profile',
                label: 'Thông tin người dùng',
            },
            {
                type: 'divider',
            },
            {
                key: 'logout',
                label: 'Đăng xuất',
            },
        ],
        onClick: ({ key }) => {
            if (key === 'logout') handleLogout();
            if (key === 'profile') navigate('/profile');
        },
    };

    return (
        <>
            <header className="user-header">
                <div className="user-header-container">

                    <div className="user-header-logo">
                        <img src={logo} alt="Logo" className="logo-img" />
                    </div>

                    <nav className="user-header-nav">
                        <Link to="/" className={`nav-link ${current === '/' ? 'active' : ''}`}>Trang chủ</Link>
                        <Link to="/product-users" className={`nav-link ${current === '/product-users' ? 'active' : ''}`}>Sản phẩm</Link>
                        <Link to="/promo" className={`nav-link ${current === '/promo' ? 'active' : ''}`}>Khuyến mãi</Link>
                        <Link to="/news" className={`nav-link ${current === '/news' ? 'active' : ''}`}>Tin tức</Link>
                        <Link to="/contact" className={`nav-link ${current === '/contact' ? 'active' : ''}`}>Liên hệ</Link>
                    </nav>

                    <div className="user-header-search">
                        <input
                            type="text"
                            placeholder="Tìm kiếm sản phẩm..."
                            className="search-input"
                        />
                        <SearchOutlined className="search-icon" />
                    </div>

                    <div className="user-header-actions">

                        <button className="action-button cart cart-with-text">
                            <ShoppingCartOutlined />
                            <span className="cart-text">Giỏ hàng</span>
                            <span className="badge">2</span>
                        </button>

                        <div className="action-divider"></div>

                        {loadingUser ? (
                            <Spin size="small" />
                        ) : user ? (
                            <Dropdown menu={userMenu} placement="bottomRight" arrow>
                                <div className="user-header-profile">
                                    <div className="user-avatar">
                                        {user?.avatar ? (
                                            <img
                                                src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${user.avatar}`}
                                                alt="Avatar"
                                                onError={(e) => (e.target.style.display = 'none')}
                                            />
                                        ) : (
                                            <Avatar icon={<UserOutlined />} />
                                        )}
                                    </div>

                                    <div className="user-info">
                                        <div className="user-name">
                                            {user?.fullName || user?.username}
                                        </div>
                                    </div>

                                    <span className="dropdown-icon">▾</span>
                                </div>
                            </Dropdown>
                        ) : (
                            <div className="auth-buttons">
                                <Link to="/login" className="btn-login">Đăng nhập</Link>
                            </div>
                        )}

                        <button className="mobile-menu-button">☰</button>
                    </div>
                </div>
            </header>
        </>
    );
}