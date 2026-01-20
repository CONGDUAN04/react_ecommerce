import { useEffect, useState, useContext } from "react";
import { fetchAllStoragesAPI } from "../../../services/api.services";
import { message } from "antd";
import AdminLayout from "../layout/AdminLayout";
import { StorageTable } from "../storage/storage.table";
import { LoadingContext } from "../../context/loading.context";
import CreateStorageForm from "../storage/storage.create";

// const normalizeArray = (res) => {
//     if (!res?.data) return [];
//     if (Array.isArray(res.data)) return res.data;
//     if (Array.isArray(res.data.data)) return res.data.data;
//     return [];
// };

const StoragePage = () => {
    const [dataStorage, setDataStorage] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);
    const { setLoading } = useContext(LoadingContext);

    const loadStorage = async () => {
        try {
            setLoading(true);
            const res = await fetchAllStoragesAPI(current, pageSize);
            if (res?.data) {
                setDataStorage(res.data);
                setTotal(res.pagination?.total || 0);
            }
        } catch (error) {
            message.error("Không tải được danh sách dung lượng");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadStorage();
    }, [current, pageSize]);

    return (
        <>
            <CreateStorageForm loadStorage={loadStorage} />
            <AdminLayout>
                <StorageTable
                    dataStorage={dataStorage}
                    loadStorage={loadStorage}
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

export default StoragePage;
