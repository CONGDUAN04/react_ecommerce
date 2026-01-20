import { useLocation } from 'react-router-dom';
import '../../styles/header.css';
import { useContext } from 'react';
import { AuthContext } from '../../../context/auth.context.jsx';
export default function Header() {
    const location = useLocation();
    const { user } = useContext(AuthContext);
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
    const pageTitle = getPageTitle();
    const breadcrumbParent = pageTitle.includes('/') ? pageTitle.split('/')[0] : 'Trang chủ';
    const breadcrumbChild = pageTitle.includes('/') ? pageTitle.split('/')[1] : pageTitle;

    return (
        <header className="header">
            <div className="header-left">
                <h1 className="page-title">{pageTitle}</h1>

                <div className="breadcrumb">
                    <span className="breadcrumb-item">{breadcrumbParent}</span>
                    <span className="breadcrumb-separator">/</span>
                    <span className="breadcrumb-item-active">{breadcrumbChild}</span>
                </div>
            </div>

            <div className="header-right">

                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Tìm kiếm..."
                        className="search-input"
                    />
                </div>

                <div className="header-actions">
                    <button className="header-button" title="Thông báo">
                        <div className="notification-dot"></div>
                        🔔
                    </button>

                    <button className="header-button" title="Tin nhắn">
                        💬
                    </button>
                    <div className="header-divider"></div>
                    <div className="header-user" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div className="header-user-avatar">
                            {user?.avatar ? (
                                <img
                                    src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${user.avatar}`}
                                    alt="Avatar"
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        objectFit: 'cover',
                                        borderRadius: '50%',
                                    }}
                                    onError={(e) => {
                                        e.target.style.display = 'none'; // nếu ảnh lỗi, ẩn ảnh
                                    }}
                                />
                            ) : (
                                (user?.fullName || user?.name)?.substring(0, 2).toUpperCase() || null
                            )}
                        </div>

                        {/* Name & Role */}
                        <div className="header-user-info" style={{ display: 'flex', flexDirection: 'column' }}>
                            <div className="header-user-name">
                                {user?.fullName || user?.name || user?.email || ''}
                            </div>
                            <div className="header-user-role">
                                {user?.role?.name || ''}
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </header>
    );
}
