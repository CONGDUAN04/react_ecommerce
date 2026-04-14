// src/component/admin/pages/category.jsx
import { useEffect, useState } from "react";
import { CategoryTable } from "./components/category.table.jsx";
import CreateCategoryForm from "./components/category.create.jsx";
import { useCategory } from "./hooks/useCategory.js";

const CategoryPage = () => {
  const [dataCategories, setDataCategories] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const { getAll } = useCategory();

  const loadCategory = async () => {
    const res = await getAll(current, pageSize);

    if (res?.data) {
      setDataCategories(res.data);
      setTotal(res.pagination?.total || 0);
    }
  };

  useEffect(() => {
    loadCategory();
  }, [current, pageSize]);

  return (
    <>
      <CreateCategoryForm loadCategory={loadCategory} />
      <CategoryTable
        dataCategories={dataCategories}
        loadCategory={loadCategory}
        current={current}
        pageSize={pageSize}
        total={total}
        setCurrent={setCurrent}
        setPageSize={setPageSize}
      />
    </>
  );
};

export default CategoryPage;
