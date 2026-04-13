import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ConfigProvider } from "antd";
import "antd/dist/reset.css";
import "../src/index.css";
import "nprogress/nprogress.css";

import AppAdmin from "./AppAdmin.jsx";
import AppClient from "./AppClient.jsx";
import HomePage from "./pages/admin/dashboard/index.jsx";
import AdminRoute from "./routes/AdminRoute.jsx";
import CategoryPage from "./pages/admin/category/index.jsx";
import LoginPage from "./pages/auth/login.jsx";
import RegisterPage from "./pages/auth/register.jsx";
import HomePageUser from "./pages/client/homepage.jsx";

import { AuthWrapper } from "./contexts/auth.context.jsx";
import NotifyProvider from "./contexts/notify.provider.jsx";
import LoadingProvider from "./contexts/loading.context.jsx";
import GlobalSpin from "./components/common/global.spin.jsx";

const router = createBrowserRouter([
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <AppAdmin />
      </AdminRoute>
    ),
    children: [
      { index: true, element: <HomePage /> },
      { path: "categories", element: <CategoryPage /> },
    ],
  },
  {
    path: "/",
    element: <AppClient />,
    children: [{ index: true, element: <HomePageUser /> }],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#3b82f6",
          borderRadius: 12,
          fontSize: 14,
        },
        components: {
          Button: {
            controlHeight: 48,
            borderRadius: 12,
          },
          Input: {
            controlHeight: 44,
            borderRadius: 12,
          },
          Card: {
            borderRadius: 20,
          },
        },
      }}
    >
      <AuthWrapper>
        <LoadingProvider>
          <NotifyProvider>
            <GlobalSpin>
              <RouterProvider router={router} />
            </GlobalSpin>
          </NotifyProvider>
        </LoadingProvider>
      </AuthWrapper>
    </ConfigProvider>
  </React.StrictMode>,
);
