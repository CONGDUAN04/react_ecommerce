import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'antd/dist/reset.css';

import App from './App.jsx';
import AppUser from "./AppUser.jsx";
import HomePage from './component/admin/pages/dashboard.jsx';
import ProductPage from './component/admin/pages/product.jsx';
import BrandPage from './component/admin/pages/brand.jsx';
import CategoryPage from './component/admin/pages/category.jsx';
import UserPage from './component/admin/pages/user.jsx';
import ColorPage from "./component/admin/pages/color.jsx";
import StoragePage from "./component/admin/pages/storage.jsx";
import TargetPage from "./component/admin/pages/target.jsx";
import LoginPage from './component/admin/pages/login.jsx';
import { AuthWrapper } from './component/context/auth.context.jsx';
import NotifyProvider from "./component/context/notify.provider.jsx";
import LoadingProvider from "./component/context/loading.context.jsx";
import GlobalSpin from "./component/context/global.spin.jsx";
import RegisterPage from "./component/admin/pages/register.jsx";

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "products", element: <ProductPage /> },
      { path: "products/colors", element: <ColorPage /> },
      { path: "products/storages", element: <StoragePage /> },
      { path: "brands", element: <BrandPage /> },
      { path: "categories", element: <CategoryPage /> },
      { path: "users", element: <UserPage /> },
      { path: "targets", element: <TargetPage /> },
    ]
  },
  {
    path: "/",
    element: <AppUser />,
    children: [
      { index: true, element: <div>HomePage</div> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
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

