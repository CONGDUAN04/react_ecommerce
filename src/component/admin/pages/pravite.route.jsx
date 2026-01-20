// src/components/routes/PrivateRoute.jsx
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Navigate, Outlet } from "react-router-dom";
import { Result, Button } from "antd";
import { Link } from "react-router-dom";

const PrivateRoute = ({ requiredRole }) => {
    const { user, isAppLoading } = useContext(AuthContext);

    if (isAppLoading) return <div>Loading...</div>;

    if (!user) return <Navigate to="/login" replace />;

    if (requiredRole && user.role?.name !== requiredRole) {
        return (
            <Result
                status="403"
                title="Unauthorized!"
                subTitle="Bạn không có quyền truy cập vào trang này"
                extra={
                    <Button type="primary">
                        <Link to="/">Back to HomePage</Link>
                    </Button>
                }
            />
        );
    }
    console.log("PrivateRoute user:", user);
    return <Outlet />; // Cho phép render route con
};

export default PrivateRoute;