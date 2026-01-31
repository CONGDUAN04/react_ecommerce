import { Button, Form, Input, InputNumber, Modal } from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { useContext, useState } from "react";
import { createProductAPI } from "../../../services/api.services.js";
import { LoadingContext } from "../../context/loading.context.jsx";
import { NotifyContext } from "../../context/notify.context.jsx";

export default function CreateProductForm({ loadProducts }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [thumbnail, setThumbnail] = useState(null);
    const [preview, setPreview] = useState(null);
    const { api } = useContext(NotifyContext);
    const { loading, setLoading } = useContext(LoadingContext);

    const handleOnchangeFile = e => {
        const file = e.target.files?.[0];
        if (!file) return;
        setThumbnail(file);
        setPreview(URL.createObjectURL(file));
        form.setFields([{ name: "thumbnail", errors: [] }]);
    };

    const handleSubmitBtn = async values => {
        setLoading(true);
        try {
            await createProductAPI({
                ...values,
                name: values.name.trim(),
                thumbnail
            });

            api.success({ message: "Thành công" });
            reset();
            loadProducts();
        } catch (error) {
            if (error.errors?.length > 0) {
                const formErrors = error.errors.map(err => ({
                    name: err.field.replace("body.", ""),
                    errors: [err.message]
                }));

                form.setFields(formErrors);
            } else {
                api.error({
                    message: "Thất bại",
                    description: error.message || "Đã có lỗi xảy ra"
                });
            }
        } finally {
            setLoading(false);
        }
    };

    const reset = () => {
        form.resetFields();
        setThumbnail(null);
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
                    Tạo sản phẩm mới
                </Button>
            </div>


            <Modal
                title="Tạo sản phẩm"
                open={isModalOpen}
                confirmLoading={loading}
                onOk={() => form.submit()}
                onCancel={reset}
                okText="Tạo mới"
                cancelText="Hủy"
                centered
                maskClosable={false}
            >
                <Form form={form} layout="vertical" onFinish={handleSubmitBtn}>
                    <Form.Item
                        label="Product Group ID"
                        name="productGroupId"
                        rules={[{ required: true, message: "ID không được bỏ trống" }]}
                    >
                        <InputNumber
                            style={{ width: "100%" }}
                            min={0} placeholder="Nhập số: 1 2 3 4 5" />
                    </Form.Item>

                    <Form.Item
                        label="Phiên bản"
                        name="name"
                        rules={[{ required: true, message: "Phiên bản không được bỏ trống" }]}
                    >
                        <Input placeholder="VD: 256GB / Reno15 / Reno15F" />
                    </Form.Item>

                    <Form.Item label="Mô tả" name="description">
                        <Input.TextArea rows={3} />
                    </Form.Item>

                    <Form.Item
                        label="Ảnh sản phẩm"
                        name="thumbnail"
                        rules={[{ required: true, message: "Vui lòng chọn ảnh sản phẩm" }]}
                    >
                        <div style={{ textAlign: "center", marginBottom: 12 }}>
                            <label
                                htmlFor="upload"
                                style={{
                                    padding: "10px 20px",
                                    background: "#1677ff",
                                    color: "#fff",
                                    borderRadius: 6,
                                    cursor: "pointer",
                                    display: "inline-block"
                                }}
                            >
                                <UploadOutlined /> Upload ảnh sản phẩm
                            </label>

                            <input
                                id="upload"
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
                                    alignItems: "center"
                                }}
                            >
                                <img
                                    src={preview}
                                    alt="preview"
                                    style={{ maxHeight: "100%", maxWidth: "100%" }}
                                />
                            </div>
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}
