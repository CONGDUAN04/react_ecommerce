import { useEffect, useState, useContext } from "react";
import AdminLayout from "../layout/AdminLayout";

import { fetchProductGroupsAPI } from "../../../services/api.services.js";
import { LoadingContext } from "../../context/loading.context.jsx";
import { message } from "antd";
import CreateProductGroupForm from "../productGroup/productGroup.create.jsx";
import ProductGroupTable from "../productGroup/productGroup.table.jsx";

const ProductGroupPage = () => {
    const [dataGroups, setDataGroups] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);

    const { setLoading } = useContext(LoadingContext);

    useEffect(() => {
        loadGroups();
    }, [current, pageSize]);

    const loadGroups = async () => {
        try {
            setLoading(true);
            const res = await fetchProductGroupsAPI(current, pageSize);
            if (res?.ErrorCode === 0) {
                setDataGroups(res.data || []);
                setTotal(res.pagination?.total || 0);
            }
        } catch {
            message.error("Lỗi tải nhóm sản phẩm");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <CreateProductGroupForm loadGroups={loadGroups} />

            <AdminLayout>
                <ProductGroupTable
                    dataGroups={dataGroups}
                    loadGroups={loadGroups}
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

export default ProductGroupPage;
