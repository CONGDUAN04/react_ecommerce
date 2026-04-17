import { useState } from "react";
import BaseTable from "../../../../components/common/BaseTable.jsx";
import BaseActionButtons from "../../../../components/common/BaseActionButtons.jsx";
import UpdateRoleForm from "./role.update.jsx";
import RoleDetail from "./role.detail.jsx";
import { useRole } from "../hooks/useRole.js";
import {
  renderIndex,
  renderId,
} from "../../../../components/common/tableColumns.jsx";

export const RoleTable = (props) => {
  const { dataRoles, loadRole, current, pageSize, total, updatePagination } =
    props;

  const [openDetail, setOpenDetail] = useState(false);
  const [dataDetail, setDataDetail] = useState(null);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [dataUpdate, setDataUpdate] = useState(null);

  const { remove } = useRole();

  const handleDelete = async (id) => {
    const res = await remove(id);
    if (res) await loadRole();
  };

  const columns = [
    renderIndex(current, pageSize),
    renderId(),
    {
      title: <div style={{ fontWeight: 600 }}>Tên vai trò</div>,
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
          deleteTitle="Xóa vai trò"
          deleteDescription="Hành động này không thể hoàn tác!"
        />
      ),
    },
  ];

  return (
    <>
      <BaseTable
        columns={columns}
        data={dataRoles}
        current={current}
        pageSize={pageSize}
        total={total}
        updatePagination={updatePagination}
      />

      {/* ✅ DETAIL */}
      <RoleDetail
        openDetail={openDetail}
        setOpenDetail={setOpenDetail}
        dataDetail={dataDetail}
      />

      {/* ✅ UPDATE */}
      <UpdateRoleForm
        loadRole={loadRole}
        openUpdate={openUpdate}
        setOpenUpdate={setOpenUpdate}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
      />
    </>
  );
};
