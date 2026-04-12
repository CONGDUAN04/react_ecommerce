import axios from "./axios.customize";
export const fetchAllDashboardAPI = () => axios.get("/api/admin/dashboard");
