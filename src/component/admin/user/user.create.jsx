import {
    Button,
    Form,
    Input,
    Modal,
    Select,
} from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";
import { createUserAPI, fetchAllRolesAPI } from "../../../services/api.services";
import { LoadingContext } from "../../context/loading.context";
import { NotifyContext } from "../../context/notify.context";

export default function CreateUserForm({ loadUsers }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [roles, setRoles] = useState([]);
    const [avatar, setAvatar] = useState(null);
    const [preview, setPreview] = useState(null);

    const { api, contextHolder } = useContext(NotifyContext);
    const { loading, setLoading } = useContext(LoadingContext);

    useEffect(() => {
        loadRoles();
    }, []);

    const loadRoles = async () => {
        try {
            const res = await fetchAllRolesAPI();
            setRoles(res.data || []);
        } catch {
            api.error({
                message: "Lỗi",
                description: "Không thể tải role",
            });
        }
    };

    const handleOnchangeFile = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setAvatar(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmitBtn = async (values) => {
        setLoading(true);
        try {
            const res = await createUserAPI({
                username: values.username,
                fullName: values.fullName,
                phone: values.phone,
                roleId: values.roleId,
                avatar,
            });

            api.success({
                message: "Thành công",
                description: res.message,
            });

            resetAndCloseModal();
            await loadUsers();
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

    const resetAndCloseModal = () => {
        form.resetFields();
        setAvatar(null);
        setPreview(null);
        setIsModalOpen(false);
    };

    return (
        <>
            {contextHolder}

            <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: 20,
                paddingRight: 24
            }}>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setIsModalOpen(true)}
                    size="large"
                    style={{
                        height: 42,
                        padding: '0 24px',
                        borderRadius: 8,
                        fontSize: 15,
                        fontWeight: 500,
                        boxShadow: '0 2px 4px rgba(24, 144, 255, 0.2)'
                    }}
                >
                    Tạo dung lượng mới
                </Button>
            </div>
            <Modal
                title={<div style={{ textAlign: "center" }}>Tạo người dùng mới</div>}
                open={isModalOpen}
                confirmLoading={loading}
                onOk={() => form.submit()}
                onCancel={resetAndCloseModal}
                okText="Tạo mới"
                cancelText="Hủy"
                centered
                maskClosable={false}
            >
                <Form form={form} layout="vertical" onFinish={handleSubmitBtn}>
                    <Form.Item
                        label="Email (Username)"
                        name="username"
                        rules={[{ required: true, message: "Vui lòng nhập email" }]}
                    >
                        <Input placeholder="example@gmail.com" />
                    </Form.Item>

                    <Form.Item
                        label="Họ tên"
                        name="fullName"
                        rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item label="Số điện thoại" name="phone" rules={[{ required: true, message: "Số điện thoại không được bỏ trống" }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Phân quyền"
                        name="roleId"
                        rules={[{ required: true, message: "Vui lòng chọn role" }]}
                    >
                        <Select
                            placeholder="Chọn role"
                            options={roles.map(r => ({
                                label: r.name,
                                value: r.id,
                            }))}
                        />
                    </Form.Item>

                    <Form.Item label="Avatar" name="avatar" rules={[{ required: true, message: "Vui lòng chọn ảnh đại diện" }]}>
                        <div style={{ textAlign: "center", marginBottom: 12 }}>
                            <label
                                htmlFor="upload-avatar"
                                style={{
                                    padding: "8px 16px",
                                    background: "#1677ff",
                                    color: "#fff",
                                    borderRadius: 6,
                                    cursor: "pointer",
                                }}
                            >
                                <UploadOutlined /> Upload avatar
                            </label>
                            <input
                                id="upload-avatar"
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={handleOnchangeFile}
                            />
                        </div>

                        {preview && (
                            <div
                                style={{
                                    height: 180,
                                    border: "1px dashed #ccc",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <img
                                    src={preview}
                                    alt="preview"
                                    style={{ maxHeight: "100%" }}
                                />
                            </div>
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}
