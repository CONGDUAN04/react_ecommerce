// src/component/admin/pages/category.jsx
import { useEffect, useState, useContext } from "react";
import { fetchAllCategoriesAPI } from "../../../services/api.services.js";
import { CategoryTable } from "../category/category.table.jsx";
import AdminLayout from "../layout/AdminLayout.jsx";
import { message } from "antd";
import { LoadingContext } from "../../context/loading.context.jsx";
import CreateCategoryForm from "../category/category.create.jsx";

const CategoryPage = () => {
    const [dataCategories, setDataCategories] = useState([]);
    const { setLoading } = useContext(LoadingContext);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);
    const loadCategory = async () => {
        try {
            setLoading(true);
            const res = await fetchAllCategoriesAPI(current, pageSize);
            if (res?.data) {
                setDataCategories(res.data);
                setTotal(res.pagination?.total || 0);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        loadCategory();
    }, []);

    return (
        <>
            <CreateCategoryForm loadCategory={loadCategory} />
            <AdminLayout>
                <CategoryTable
                    dataCategories={dataCategories}
                    loadCategory={loadCategory}
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

export default CategoryPage;
