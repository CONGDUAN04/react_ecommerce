import { useEffect, useState } from "react";
import { RoleTable } from "./components/role.table.jsx";
import { useRole } from "./hooks/useRole.js";
import { usePagination } from "../../../hooks/usePagination";
import CreateRoleForm from "./components/role.create.jsx";

const RolePage = () => {
  const [dataRoles, setDataRoles] = useState([]);
  const [total, setTotal] = useState(0);
  const { current, pageSize, updatePagination } = usePagination();
  const { getAll } = useRole();
  const loadRole = async () => {
    const res = await getAll(current, pageSize);
    if (res?.data) {
      setDataRoles(res.data);
      setTotal(res.meta.total);
    }
  };

  useEffect(() => {
    if (!current || !pageSize) return;
    loadRole();
  }, [current, pageSize]);

  return (
    <>
      <CreateRoleForm loadRole={loadRole} />
      <RoleTable
        dataRoles={dataRoles}
        loadRole={loadRole}
        current={current}
        pageSize={pageSize}
        total={total}
        updatePagination={updatePagination}
      />
    </>
  );
};

export default RolePage;
