import { useEffect, useState } from "react";
import { usePagination } from "../../../hooks/usePagination";
import { useUser } from "./hooks/useUser";
import UserTable from "./components/user.table";
import CreateUserForm from "./components/user.create";
const UserPage = () => {
  const [dataUsers, setDataUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const { current, pageSize, updatePagination } = usePagination();
  const { getAll } = useUser();

  const loadUser = async () => {
    const res = await getAll(current, pageSize);
    if (res?.data) {
      setDataUsers(res.data);
      setTotal(res.meta.total);
    }
  };
  useEffect(() => {
    if (!current || !pageSize) return;
    loadUser();
  }, [current, pageSize]);
  return (
    <>
      <CreateUserForm loadUser={loadUser} />
      <UserTable
        dataUsers={dataUsers}
        loadUser={loadUser}
        current={current}
        pageSize={pageSize}
        total={total}
        updatePagination={updatePagination}
      />
    </>
  );
};
export default UserPage;
