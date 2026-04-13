import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// ⚙️ Config NProgress
NProgress.configure({
  showSpinner: false,
  trickleSpeed: 100,
});

// ⚙️ Axios instance
const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  timeout: 15000,
});

// 🟡 Helper: lấy token
const getAccessToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("access_token");
};

// 🟡 Helper: check login request
const isLoginRequest = (url = "") => url.includes("/login");

// 🟡 Helper: xử lý 401
const handleUnauthorized = (url) => {
  localStorage.removeItem("access_token");

  // ❗ giữ nguyên logic của bạn
  if (!isLoginRequest(url)) {
    window.location.href = "/login";
  }
};

// 🚀 REQUEST INTERCEPTOR
instance.interceptors.request.use(
  (config) => {
    NProgress.start();

    const token = getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    NProgress.done();
    return Promise.reject(error);
  },
);

// 🚀 RESPONSE INTERCEPTOR
instance.interceptors.response.use(
  (response) => {
    NProgress.done();
    return response.data; // 🔥 giữ nguyên behavior
  },
  (error) => {
    NProgress.done();

    const { response, config } = error;

    // ❌ 401
    if (response?.status === 401) {
      handleUnauthorized(config?.url);
      return Promise.reject(response.data);
    }

    // ❌ Server trả error chuẩn
    if (response?.data) {
      return Promise.reject(response.data);
    }

    // ❌ Network error / unknown
    return Promise.reject({
      error: {
        code: "NETWORK_ERROR",
        message: error.message || "Không thể kết nối server",
      },
    });
  },
);

export default instance;
