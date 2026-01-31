import {
    Button,
    Form,
    Input,
    Modal,
} from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { useContext, useState } from "react";
import { LoadingContext } from "../../context/loading.context.jsx";
import { NotifyContext } from "../../context/notify.context.jsx";
import { createCategoryAPI } from "../../../services/api.services.js";

export default function CreateCategoryForm({ loadCategory }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [preview, setPreview] = useState(null);
    const [image, setImage] = useState(null);
    const [form] = Form.useForm();
    const { api, contextHolder } = useContext(NotifyContext);
    const { loading, setLoading } = useContext(LoadingContext);

    const handleOnchangeFile = (e) => {
        const file = e.target.files?.[0];
        if (!file) {
            setImage(null);
            setPreview(null);
            return;
        }
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const resetAndCloseModal = () => {
        form.resetFields();
        setImage(null);
        setPreview(null);
        setIsModalOpen(false);
    };
    const handleSubmitBtn = async (values) => {
        try {
            setLoading(true);
            const res = await createCategoryAPI({
                name: values.name,
                description: values.description,
                image,
            });
            api.success({
                message: "Thành công",
                description: res?.message,
                duration: 3,
            });
            resetAndCloseModal();
            await loadCategory();
        } catch (error) {
            if (error.errors?.length > 0) {
                const formErrors = error.errors.map(err => ({
                    name: err.field.replace("body.", ""),
                    errors: [err.message],
                }));

                console.log("Setting form errors:", formErrors);
                form.setFields(formErrors);
            } else {
                api.error({
                    message: "Thất bại",
                    description: error.message || "Đã có lỗi xảy ra",
                });
            }
        } finally {
            setLoading(false);
        }
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
                    Tạo danh mục mới
                </Button>
            </div>

            <Modal
                title="Tạo danh mục mới"
                open={isModalOpen}
                confirmLoading={loading}
                onOk={() => form.submit()}
                onCancel={resetAndCloseModal}
                okText="Tạo mới"
                cancelText="Hủy"
                maskClosable={false}
                centered
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmitBtn}
                >
                    <Form.Item
                        label="Tên danh mục"
                        name="name"
                        rules={[{ required: true, message: "Tên danh mục không được để trống" }]}
                    >
                        <Input placeholder="Nhập tên danh mục..." />
                    </Form.Item>
                    <Form.Item
                        label="Mô tả"
                        name="description"
                    >
                        <Input.TextArea rows={4} placeholder="Nhập mô tả danh mục..." />
                    </Form.Item>
                    <Form.Item label="Ảnh Danh Mục" name="image" rules={[{ required: true, message: "Vui lòng chọn ảnh danh mục" }]}>
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
                                <UploadOutlined /> Upload ảnh danh mục
                            </label>
                            <input
                                id="upload"
                                type="file"
                                hidden
                                accept="Image/*"
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
