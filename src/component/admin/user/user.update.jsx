import {
    Form,
    Input,
    Modal,
    Select,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";
import { updateUserAPI, fetchAllRolesAPI } from "../../../services/api.services.js";
import { LoadingContext } from "../../context/loading.context.jsx";
import { NotifyContext } from "../../context/notify.context.jsx";

export default function UpdateUserForm({
    openUpdate,
    setOpenUpdate,
    dataUpdate,
    setDataUpdate,
    loadUser,
}) {
    const [form] = Form.useForm();
    const [roles, setRoles] = useState([]);
    const [preview, setPreview] = useState(null);
    const [file, setFile] = useState(null);
    const { api, contextHolder } = useContext(NotifyContext);
    const { loading, setLoading } = useContext(LoadingContext);

    useEffect(() => {
        const loadRoles = async () => {
            try {
                const res = await fetchAllRolesAPI();
                setRoles(res?.data || []);
            } catch (error) {
                api.error({
                    message: "Không thể tải roles",
                    description: error.message,
                });
            }
        };
        loadRoles();
    }, []);

    // Set data khi mở modal update
    useEffect(() => {
        if (!dataUpdate) return;
        form.setFieldsValue({
            username: dataUpdate.username,
            fullName: dataUpdate.fullName,
            phone: dataUpdate.phone,
            roleId: dataUpdate.role?.id,
        });
        if (dataUpdate.avatar) {
            setPreview(`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataUpdate.avatar}`);
        }
    }, [dataUpdate, form]);

    const handleOnchangeFile = (e) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;
        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
    };

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            const res = await updateUserAPI(dataUpdate.id, {
                ...values,
                avatar: file,
            });
            api.success({
                message: "Thành Công",
                description: res?.message
            });
            resetAndClose();
            await loadUser();
        } catch (error) {
            if (error.response?.data?.errors && error.response.data.errors.length > 0) {
                const formErrors = error.response.data.errors.map(err => ({
                    name: err.field.replace('body.', ''),
                    errors: [err.message],
                }));
                form.setFields(formErrors);
            } else {
                const errorMessage = error.response?.data?.message ||
                    error.message ||
                    "Đã có lỗi xảy ra";
                api.error({
                    message: "Thất Bại",
                    description: errorMessage,
                    duration: 3,
                });
            }
        } finally {
            setLoading(false);
        }
    };

    const resetAndClose = () => {
        form.resetFields();
        setFile(null);
        setPreview(null);
        setDataUpdate(null);
        setOpenUpdate(false);
    };

    return (
        <>
            {contextHolder}
            <Modal
                title={<div style={{ textAlign: "center" }}>Cập nhật người dùng</div>}
                open={openUpdate}
                confirmLoading={loading}
                onOk={() => form.submit()}
                onCancel={resetAndClose}
                okText="Cập nhật"
                cancelText="Huỷ"
                centered
                maskClosable={false}
                width={600}
            >
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <Form.Item label="Email" name="username" rules={[{ required: true, message: "Nhập email" }]}>
                        <Input disabled />
                    </Form.Item>

                    <Form.Item label="Họ và tên" name="fullName" rules={[{ required: true, message: "Họ tên không được để trống" }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Số điện thoại" name="phone" rules={[{ required: true, message: "Số điện thoại không được để trống" }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Phân quyền" name="roleId" rules={[{ required: true, message: "Role không được để trống" }]}>
                        <Select options={roles.map(r => ({ label: r.name, value: r.id }))} />
                    </Form.Item>

                    <Form.Item label="Avatar" name="avatar" required>
                        <div style={{ textAlign: "center", marginBottom: 12 }}>
                            <label
                                htmlFor="upload"
                                style={{
                                    padding: "10px 20px",
                                    background: "#1677ff",
                                    color: "#fff",
                                    borderRadius: 6,
                                    cursor: "pointer",
                                    display: "inline-block",
                                }}
                            >
                                <UploadOutlined /> Upload ảnh avatar
                            </label>
                            <input
                                id="upload"
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={handleOnchangeFile}
                            />
                        </div>
                    </Form.Item>

                    {preview && (
                        <div style={{
                            textAlign: "center",
                            display: "flex",
                            justifyContent: "center",
                            marginTop: 16
                        }}>
                            <img
                                src={preview}
                                alt="preview"
                                style={{
                                    maxHeight: 200,
                                    maxWidth: "100%",
                                    objectFit: "contain",
                                    borderRadius: 6
                                }}
                            />
                        </div>
                    )}
                </Form>
            </Modal>
        </>
    );
}