import { Button, Form, Input, Modal } from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { useContext, useState } from "react";
import { createColorAPI } from "../../../services/api.services.js";
import { NotifyContext } from "../../context/notify.context.jsx";
import { LoadingContext } from "../../context/loading.context.jsx";

export default function CreateColorForm({ loadColor }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [preview, setPreview] = useState(null);
    const [image, setImage] = useState(null);
    const { api } = useContext(NotifyContext);
    const { loading, setLoading } = useContext(LoadingContext);

    // Upload ảnh
    const handleOnchangeFile = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setImage(null);
            setPreview(null);
            return;
        }
        const file = e.target.files[0];
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    // Submit form
    const handleSubmitBtn = async (values) => {
        setLoading(true);
        const { color, productId } = values;
        try {
            const res = await createColorAPI({
                color,
                productId,
                image,
            });
            api.success({
                message: "Thành Công",
                description: res?.message,
                duration: 3,
            });
            resetAndCloseModal();
            await loadColor();
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
        setImage(null);
        setPreview(null);
        setIsModalOpen(false);
    };

    return (
        <>
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
                    Tạo màu sản phẩm mới
                </Button>
            </div>

            <Modal
                title={<div style={{ textAlign: "center" }}>Tạo màu sắc mới</div>}
                open={isModalOpen}
                confirmLoading={loading}
                onOk={() => form.submit()}
                onCancel={resetAndCloseModal}
                okText="Tạo mới"
                cancelText="Hủy"
                centered
                maskClosable={false}
                keyboard={false}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmitBtn}
                >
                    <Form.Item
                        label="ID sản phẩm"
                        name="productId"
                        rules={[
                            { required: true, message: "ID sản phẩm không được để trống" },
                        ]}
                    >
                        <Input placeholder="Nhập productId..." />
                    </Form.Item>

                    <Form.Item
                        label="Tên màu"
                        name="color"
                        rules={[
                            { required: true, message: "Tên màu không được để trống" },
                        ]}
                    >
                        <Input placeholder="VD: Đỏ, Xanh, Đen..." />
                    </Form.Item>

                    <Form.Item
                        label=" Ảnh màu sản phẩm"
                        name="image"
                        rules={[{ required: true, message: "Vui lòng chọn ảnh màu sản phẩm" }]}
                    >
                        <div style={{ textAlign: "center", marginBottom: 12 }}>
                            <label
                                htmlFor="upload-color"
                                style={{
                                    padding: "10px 20px",
                                    background: "#1677ff",
                                    color: "#fff",
                                    borderRadius: 6,
                                    cursor: "pointer",
                                    display: "inline-block",
                                }}
                            >
                                <UploadOutlined /> Upload hình ảnh
                            </label>
                            <input
                                id="upload-color"
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={handleOnchangeFile}
                            />
                        </div>

                        {preview && (
                            <div
                                style={{
                                    marginTop: 12,
                                    height: 200,
                                    border: "1px dashed #ccc",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <img
                                    src={preview}
                                    alt="preview"
                                    style={{
                                        maxHeight: "100%",
                                        maxWidth: "100%",
                                        objectFit: "contain",
                                    }}
                                />
                            </div>
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}
