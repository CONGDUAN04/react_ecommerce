import { useState } from "react";
import BaseTable from "../../../../components/common/BaseTable.jsx";
import BaseActionButtons from "../../../../components/common/BaseActionButtons.jsx";
import BrandDetail from "./brand.detail.jsx";
import UpdateBrandForm from "./brand.update.jsx";
import { useBrand } from "../hooks/useBrand.js";
import {
  renderIndex,
  renderId,
} from "../../../../components/common/tableColumns.jsx";

export default function BrandTable({
  dataBrands,
  loadBrand,
  current,
  pageSize,
  total,
  updatePagination,
}) {
  const [openDetail, setOpenDetail] = useState(false);
  const [dataDetail, setDataDetail] = useState(null);

  const [openUpdate, setOpenUpdate] = useState(false);
  const [dataUpdate, setDataUpdate] = useState(null);

  const { remove } = useBrand();

  const handleDelete = async (id) => {
    const res = await remove(id);
    if (res) await loadBrand();
  };

  const columns = [
    renderIndex(current, pageSize),
    renderId(),
    {
      title: <div style={{ fontWeight: 600 }}>Tên thương hiệu </div>,
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
        />
      ),
    },
  ];

  return (
    <>
      <BaseTable
        columns={columns}
        data={dataBrands}
        current={current}
        pageSize={pageSize}
        total={total}
        updatePagination={updatePagination}
      />

      <BrandDetail
        dataDetail={dataDetail}
        openDetail={openDetail}
        setOpenDetail={setOpenDetail}
      />

      <UpdateBrandForm
        openUpdate={openUpdate}
        setOpenUpdate={setOpenUpdate}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        loadBrand={loadBrand}
      />
    </>
  );
}
