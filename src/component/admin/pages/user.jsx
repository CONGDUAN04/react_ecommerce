// src/component/admin/pages/user.jsx
import { useEffect, useState, useContext } from "react";
import { fetchAllUserAPI } from "../../../services/api.services.js";
import { UserTable } from "../user/user.table.jsx";
import AdminLayout from "../layout/AdminLayout.jsx";
import { message } from "antd";
import { LoadingContext } from "../../context/loading.context.jsx";
import CreateUserForm from "../user/user.create.jsx";

const UserPage = () => {
    const [dataUser, setDataUser] = useState([]);
    const { setLoading } = useContext(LoadingContext);

    const loadUser = async () => {
        setLoading(true);
        const res = await fetchAllUserAPI();
        if (res?.data) setDataUser(res.data);
        else message.error("Không tải được danh sách người dùng!");
        setLoading(false);
    };

    useEffect(() => {
        loadUser();
    }, []);

    return (
        <>
            <CreateUserForm loadUsers={loadUser} />
            <AdminLayout>
                <UserTable dataUser={dataUser} loadUser={loadUser} />
            </AdminLayout>
        </>

    );
};

export default UserPage;
