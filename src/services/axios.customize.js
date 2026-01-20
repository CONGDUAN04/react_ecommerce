// // src/services/axios.instance.js
// import axios from "axios";

// const instance = axios.create({
//   baseURL: import.meta.env.VITE_BACKEND_URL,
// });

// instance.interceptors.request.use(
//   function (config) {
//     const token = typeof window !== "undefined" && window.localStorage.getItem("access_token");
//     console.log("🔍 Token gửi:", token); // Debug
//     console.log("🔍 Request:", config.method, config.url); // Debug
//     if (token) config.headers.Authorization = "Bearer " + token;
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

// instance.interceptors.response.use(
//   function (response) {
//     console.log("🔍 Interceptor response:", response.data); // Debug

//     // Nếu response.data.data tồn tại, trả về response.data
//     if (response.data && response.data.data !== undefined) return response.data;
//     return response.data; // luôn trả về res.data
//   },
//   function (error) {
//     if (error.response && error.response.data) return Promise.reject(error.response.data);
//     return Promise.reject(error);
//   }
// );

// export default instance;
// src/services/axios.instance.js
import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

instance.interceptors.request.use(
  function (config) {
    const token = typeof window !== "undefined" && window.localStorage.getItem("access_token");
    if (token) config.headers.Authorization = "Bearer " + token;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    if (response.data && response.data.data !== undefined) return response.data;
    return response.data;
  },
  function (error) {
    // QUAN TRỌNG: Reject nguyên error object để giữ error.response
    return Promise.reject(error);
  }
);

export default instance;