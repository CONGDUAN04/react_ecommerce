// src/component/admin/pages/brand.jsx
import { useEffect, useState, useContext } from "react";
import { BrandTable } from "../brand/brand.table.jsx";
import { fetchAllBrandsAPI } from "../../../services/api.services.js";
import AdminLayout from "../layout/AdminLayout.jsx";
import { LoadingContext } from "../../context/loading.context.jsx";
import CreateBrandForm from "../brand/brand.create.jsx";

const BrandPage = () => {
    const [dataBrand, setDataBrand] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);
    const { setLoading } = useContext(LoadingContext);

    const loadBrand = async () => {
        try {
            setLoading(true);
            const res = await fetchAllBrandsAPI(current, pageSize);
            if (res?.data) {
                setDataBrand(res.data);
                setTotal(res.pagination?.total || 0);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadBrand();
    }, [current, pageSize]);

    return (
        <>
            <CreateBrandForm loadBrand={loadBrand} />
            <AdminLayout>
                <BrandTable
                    dataBrand={dataBrand}
                    loadBrand={loadBrand}
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


export default BrandPage;
