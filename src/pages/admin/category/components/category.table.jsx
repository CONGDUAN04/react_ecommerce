import { useState } from "react";
import BaseTable from "../../../../components/common/BaseTable.jsx"; // ✅ FIX
import BaseActionButtons from "../../../../components/common/BaseActionButtons.jsx";
import UpdateCategoryForm from "./category.update";
import CategoryDetail from "./category.detail";
import { useCategory } from "../hooks/useCategory.js";
import {
  renderIndex,
  renderId,
} from "../../../../components/common/tableColumns.jsx";

export const CategoryTable = (props) => {
  const {
    dataCategories,
    loadCategory,
    current,
    pageSize,
    total,
    updatePagination,
  } = props;

  const [openDetail, setOpenDetail] = useState(false);
  const [dataDetail, setDataDetail] = useState(null);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [dataUpdate, setDataUpdate] = useState(null);

  const { remove } = useCategory();

  const handleDelete = async (id) => {
    const res = await remove(id);
    if (res) await loadCategory();
  };
  const columns = [
    renderIndex(current, pageSize),
    renderId(),
    {
      title: <div style={{ fontWeight: 600 }}>Icon</div>,
      dataIndex: "icon",
      width: 120,
      align: "center",
      render: (icon) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={icon}
            alt="icon"
            style={{
              width: 40,
              height: 40,
              objectFit: "contain",
            }}
          />
        </div>
      ),
    },
    {
      title: <div style={{ fontWeight: 600 }}>Tên danh mục</div>,
      dataIndex: "name",
      width: 260,
      align: "center",
    },
    {
      title: <div style={{ fontWeight: 600 }}>Thao tác</div>,
      width: 150,
      align: "center",
      fixed: "right",
      render: (_, record) => (
        <BaseActionButtons
          record={record}
          onView={() => {
            setDataDetail(record);
            setOpenDetail(true);
          }}
          onEdit={() => {
            setDataUpdate(record);
            setOpenUpdate(true);
          }}
          onDelete={() => handleDelete(record.id)}
          deleteTitle="Xóa danh mục"
          deleteDescription="Hành động này không thể hoàn tác!"
        />
      ),
    },
  ];

  return (
    <>
      <BaseTable
        columns={columns}
        data={dataCategories}
        current={current}
        pageSize={pageSize}
        total={total}
        updatePagination={updatePagination}
      />

      <CategoryDetail
        openDetail={openDetail}
        setOpenDetail={setOpenDetail}
        dataDetail={dataDetail}
        setDataDetail={setDataDetail}
      />

      <UpdateCategoryForm
        loadCategory={loadCategory}
        openUpdate={openUpdate}
        setOpenUpdate={setOpenUpdate}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
      />
    </>
  );
};
