import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 100,
});

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

instance.interceptors.request.use(
  function (config) {
    NProgress.start();
    const token = typeof window !== "undefined" && window.localStorage.getItem("access_token");
    if (token) config.headers.Authorization = "Bearer " + token;
    return config;
  },
  function (error) {
    NProgress.done();
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    NProgress.done();
    if (response.data && response.data.data !== undefined) return response.data;
    return response.data;
  },
  function (error) {
    NProgress.done();
    // QUAN TRỌNG: Reject nguyên error object để giữ error.response
    return Promise.reject(error);
  }
);

export default instance;