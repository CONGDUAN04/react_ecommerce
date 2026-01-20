// src/component/admin/pages/target.jsx
import { useEffect, useState, useContext } from "react";
import { fetchAllTargetsAPI } from "../../../services/api.services.js";
import { message } from "antd";
import AdminLayout from "../layout/AdminLayout.jsx";
import { TargetTable } from "../target/target.table.jsx";
import { LoadingContext } from "../../context/loading.context.jsx";
import CreateTargetForm from "../target/target.create.jsx";

const TargetPage = () => {
    const [dataTarget, setDataTarget] = useState([]);
    const { setLoading } = useContext(LoadingContext);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);

    const loadTarget = async () => {
        try {
            setLoading(true);
            const res = await fetchAllTargetsAPI(current, pageSize);
            if (res?.data) {
                setDataTarget(res.data);
                setTotal(res.pagination?.total || 0);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        loadTarget();
    }, []);

    return (
        <>
            <CreateTargetForm loadTarget={loadTarget} />
            <AdminLayout>
                <TargetTable
                    dataTarget={dataTarget}
                    loadTarget={loadTarget}
                    current={current}
                    pageSize={pageSize}
                    total={total}
                    setCurrent={setCurrent}
                    setPageSize={setPageSize}
                />
            </AdminLayout>
        </>
    );
};

export default TargetPage;
