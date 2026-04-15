import { useEffect, useState } from "react";
import { CategoryTable } from "./components/category.table.jsx";
import CreateCategoryForm from "./components/category.create.jsx";
import { useCategory } from "./hooks/useCategory.js";
import { usePagination } from "../../../hooks/usePagination";

const CategoryPage = () => {
  const [dataCategories, setDataCategories] = useState([]);
  const [total, setTotal] = useState(0);
  const { current, pageSize, updatePagination } = usePagination();
  const { getAll } = useCategory();
  const loadCategory = async () => {
    const res = await getAll(current, pageSize);
    if (res?.data) {
      setDataCategories(res.data);
      setTotal(res.meta.total);
    }
  };

  useEffect(() => {
    if (!current || !pageSize) return;
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
        updatePagination={updatePagination}
      />
    </>
  );
};

export default CategoryPage;
