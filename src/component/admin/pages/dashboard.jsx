// src/component/admin/pages/dashboard.jsx
import { useEffect, useState, useContext } from "react";
import { fetchAllDashboardAPI } from "../../../services/api.services.js";
import { message } from "antd";
import Dashboard from "../dashboard/dashboard.jsx";
import { LoadingContext } from "../../context/loading.context.jsx";
import AdminLayout from "../layout/AdminLayout.jsx";

const DashboardPage = () => {
    const [dataDashboard, setDataDashboard] = useState([]);
    const { setLoading } = useContext(LoadingContext);

    const loadDashboard = async () => {
        setLoading(true);
        const res = await fetchAllDashboardAPI();
        if (res?.data) setDataDashboard(res.data);
        else message.error("Không tải được dữ liệu Dashboard!");
        setLoading(false);
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
