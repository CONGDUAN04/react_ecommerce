import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  timeout: 15000,
});

const getAccessToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("access_token");
};

const isLoginRequest = (url = "") => url.includes("/login");

const handleUnauthorized = (url) => {
  localStorage.removeItem("access_token");

  if (!isLoginRequest(url)) {
    window.location.href = "/login";
  }
};

instance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const { response, config } = error;

    if (response?.status === 401) {
      handleUnauthorized(config?.url);
      return Promise.reject(response.data);
    }

    if (response?.data) {
      return Promise.reject(response.data);
    }

    return Promise.reject({
      error: {
        code: "NETWORK_ERROR",
        message: error.message || "Không thể kết nối server",
      },
    });
  },
);

export default instance;
