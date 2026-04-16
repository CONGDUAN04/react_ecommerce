import { useEffect, useState } from "react";
import BrandTable from "./components/brand.table.jsx";
import CreateBrandForm from "./components/brand.create.jsx";
import { useBrand } from "./hooks/useBrand.js";
import { usePagination } from "../../../hooks/usePagination";

const BrandPage = () => {
  const [dataBrands, setDataBrands] = useState([]);
  const [total, setTotal] = useState(0);

  const { current, pageSize, updatePagination } = usePagination();
  const { getAll } = useBrand();

  const loadBrand = async () => {
    const res = await getAll(current, pageSize);
    if (res?.data) {
      setDataBrands(res.data);
      setTotal(res.meta.total);
    }
  };

  useEffect(() => {
    if (!current || !pageSize) return;
    loadBrand();
  }, [current, pageSize]);

  return (
    <>
      <CreateBrandForm loadBrand={loadBrand} />
      <BrandTable
        dataBrands={dataBrands}
        loadBrand={loadBrand}
        current={current}
        pageSize={pageSize}
        total={total}
        updatePagination={updatePagination}
      />
    </>
  );
};

export default BrandPage;
