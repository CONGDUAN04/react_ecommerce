import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

export const usePagination = (defaultPage = 1, defaultSize = 10) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [current, setCurrent] = useState();
  const [pageSize, setPageSize] = useState();

  useEffect(() => {
    const page = Number(searchParams.get("page")) || defaultPage;
    const size = Number(searchParams.get("pageSize")) || defaultSize;

    setCurrent(page);
    setPageSize(size);
  }, []);

  const updatePagination = (page, size) => {
    setCurrent(page);
    setPageSize(size);

    setSearchParams({
      page,
      pageSize: size,
    });
  };

  return {
    current,
    pageSize,
    updatePagination,
  };
};
