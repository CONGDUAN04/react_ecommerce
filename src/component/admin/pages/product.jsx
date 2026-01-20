// src/component/admin/pages/product.jsx
import { useEffect, useState, useContext } from "react";
import ProductTable from "../products/product.table";
import CreateProductForm from "../products/product.create";
import { message } from "antd";
import AdminLayout from "../layout/AdminLayout";
import { LoadingContext } from "../../context/loading.context.jsx";
import { fetchProductsAPI } from "../../../services/api.services.js";
const ProductPage = () => {
    const [dataProducts, setDataProducts] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);

    const { setLoading } = useContext(LoadingContext);
    useEffect(() => {
        loadProducts();
    }, [current, pageSize]);

    const loadProducts = async () => {
        try {
            setLoading(true);
            const res = await fetchProductsAPI(current, pageSize);
            if (res?.ErrorCode === 0 && res?.data) {
                setDataProducts(res.data.items || []);
                setTotal(res.data.pagination?.total || 0);
            }
        } catch (error) {
            message.error("Lỗi khi tải danh sách sản phẩm");
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <CreateProductForm loadProducts={loadProducts} />
            <AdminLayout>
                <ProductTable
                    dataProducts={dataProducts}
                    loadProducts={loadProducts}
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

export default ProductPage;
