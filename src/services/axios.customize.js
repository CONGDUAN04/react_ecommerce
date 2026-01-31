import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 100,
});

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  timeout: 15000,
});

instance.interceptors.request.use(
  (config) => {
    NProgress.start();

    const token =
      typeof window !== "undefined" &&
      window.localStorage.getItem("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    NProgress.done();
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    NProgress.done();

    return response.data;
  },
  (error) => {
    NProgress.done();

    if (error.response?.status === 401) {
      localStorage.removeItem("access_token");

      window.location.href = "/login";

      return Promise.reject({
        ErrorCode: 401,
        message: "Phiên đăng nhập đã hết hạn",
      });
    }

    if (error.response?.data) {
      return Promise.reject(error.response.data);
    }

    return Promise.reject({
      ErrorCode: -1,
      message: error.message || "Không thể kết nối server",
    });
  }
);

export default instance;
