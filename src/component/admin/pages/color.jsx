import { useEffect, useState, useContext } from "react";
import { fetchAllColorAPI } from "../../../services/api.services";
import { message } from "antd";
import AdminLayout from "../layout/AdminLayout";
import { ColorTable } from "../color/color.table";
import { LoadingContext } from "../../context/loading.context";
import CreateColorForm from "../color/color.create";

const normalizeArray = (res) => {
    if (!res?.data) return [];
    if (Array.isArray(res.data)) return res.data;
    if (Array.isArray(res.data.data)) return res.data.data;
    return [];
};

const ColorPage = () => {
    const [dataColor, setDataColor] = useState([]);
    const { setLoading } = useContext(LoadingContext);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);
    const loadColor = async () => {
        try {
            setLoading(true);
            const res = await fetchAllColorAPI(current, pageSize);
            if (res?.ErrorCode === 0 && res?.data) {
                setDataColor(res.data.items || []);
                setTotal(res.data.pagination?.total || 0);
            }
        } catch (error) {
            message.error("Không tải được danh sách màu");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadColor();
    }, [current, pageSize]);

    return (
        <>
            <CreateColorForm loadColor={loadColor} />
            <AdminLayout>
                <ColorTable
                    dataColor={dataColor}
                    loadColor={loadColor}
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

export default ColorPage;
