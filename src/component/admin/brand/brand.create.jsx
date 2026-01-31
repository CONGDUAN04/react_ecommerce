import {
    Button,
    Form,
    Input,
    Modal,
} from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { useContext, useState } from "react";
import { createBrandAPI } from "../../../services/api.services.js";
import { LoadingContext } from "../../context/loading.context.jsx";
import { NotifyContext } from "../../context/notify.context.jsx";

export default function CreateBrandForm({ loadBrand }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const { api } = useContext(NotifyContext);
    const { loading, setLoading } = useContext(LoadingContext);

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

    const handleSubmitBtn = async (values) => {
        try {
            setLoading(true);
            const res = await createBrandAPI({
                name: values.name,
                image
            });
            api.success({
                message: "Thành Công",
                description: res?.message,
                duration: 3,
            });
            resetAndCloseModal();
            await loadBrand();
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
                    Tạo thương hiệu mới
                </Button>
            </div>
            <Modal
                title={<div style={{ textAlign: "center" }}>Tạo thương hiệu mới</div>}
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
                        label="Tên thương hiệu"
                        name="name"
                        rules={[{ required: true, message: "Tên thương hiệu không được để trống" }]}
                    >
                        <Input placeholder="Nhập tên thương hiệu..." />
                    </Form.Item>

                    <Form.Item
                        label="Ảnh thương hiệu"
                        name="image"
                        rules={[{ required: true, message: "Vui lòng chọn ảnh thương hiệu" }]}
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
                                    display: "inline-block",
                                }}
                            >
                                <UploadOutlined /> Upload ảnh thương hiệu
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
