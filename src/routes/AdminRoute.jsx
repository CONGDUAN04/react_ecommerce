import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/auth.context.jsx";

const AdminRoute = ({ children }) => {
  const { user, isAppLoading } = useContext(AuthContext);

  if (isAppLoading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;

  if (user.role?.name !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
