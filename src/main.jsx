import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'antd/dist/reset.css';
import "../src/index.css"
import "nprogress/nprogress.css";
import App from './App.jsx';
import AppUser from "./AppUser.jsx";
import HomePage from "./pages/admin/dashboard/index.jsx";
// import ProductPage from './component/admin/pages/product.jsx';
// import BrandPage from './component/admin/pages/brand.jsx';
import CategoryPage from './pages/admin/category/index.jsx';
// import UserPage from './component/admin/pages/user.jsx';
// import ColorPage from "./component/admin/pages/color.jsx";
import LoginPage from './pages/auth/login.jsx';
import { AuthWrapper } from './contexts/auth.context.jsx';
import NotifyProvider from "./contexts/notify.provider.jsx";
import LoadingProvider from "./contexts/loading.context.jsx";
import GlobalSpin from "./components/common/global.spin.jsx";
// import RegisterPage from "./component/admin/pages/register.jsx";
import HomePageUser from "./pages/client/homepage.jsx";
// import ProductGroupPage from "./component/admin/pages/product-group.jsx";
const router = createBrowserRouter([
  {
    path: "/admin",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      //  { path: "brands", element: <BrandPage /> },
      // { path: "product-groups", element: <ProductGroupPage /> },
      // { path: "products", element: <ProductPage /> },
      // { path: "products/colors", element: <ColorPage /> },
      { path: "categories", element: <CategoryPage /> },
      // { path: "users", element: <UserPage /> },
    ]
  },
  {
    path: "/",
    element: <AppUser />,
    children: [
      { index: true, element: <HomePageUser /> },
      { path: "login", element: <LoginPage /> },
      // { path: "register", element: <RegisterPage /> },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthWrapper>
    <NotifyProvider>
      <LoadingProvider>
        <GlobalSpin>
          <RouterProvider router={router} />
        </GlobalSpin>
      </LoadingProvider>
    </NotifyProvider>
  </AuthWrapper>
);

