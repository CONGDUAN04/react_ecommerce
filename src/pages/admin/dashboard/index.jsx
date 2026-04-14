// src/component/admin/pages/dashboard.jsx
import { useEffect, useState, useContext } from "react";
import { fetchAllDashboardAPI } from "../../../services/api.dashboard.js";
import { message } from "antd";
import Dashboard from "./dashboard.jsx";
import { useApi } from "../../../hooks/useApi";
import AdminLayout from "../../../layouts/admin/AdminLayout.jsx";

const DashboardPage = () => {
  const [dataDashboard, setDataDashboard] = useState([]);
  const { callApi } = useApi();
  const loadDashboard = async () => {
    const res = await callApi(fetchAllDashboardAPI);
    if (res?.data) setDataDashboard(res.data);
    else message.error("Không tải được dữ liệu Dashboard!");
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <AdminLayout>
      <Dashboard dataDashboard={dataDashboard} />
    </AdminLayout>
  );
};

export default DashboardPage;
