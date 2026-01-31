import { Button, Form, Input, InputNumber, Modal } from "antd";
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

    // upload ảnh
    const handleOnchangeFile = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    // submit
    const handleSubmitBtn = async (values) => {
        if (!image) {
            api.error({ message: "Vui lòng chọn ảnh" });
            return;
        }

        setLoading(true);

        try {
            const res = await createColorAPI({
                productId: values.productId,
                color: values.color,
                price: values.price,
                image
            });

            api.success({
                message: "Thành công",
                description: res?.message,
            });

            resetAndCloseModal();
            loadColor();

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
                    Tạo màu sản phẩm mới
                </Button>
            </div>

            <Modal
                title="Tạo màu sắc mới"
                open={isModalOpen}
                confirmLoading={loading}
                onOk={() => form.submit()}
                okText="Tạo mới"
                onCancel={resetAndCloseModal}
                maskClosable={false}
            >
                <Form form={form} layout="vertical" onFinish={handleSubmitBtn}>

                    <Form.Item
                        label="Product ID"
                        name="productId"
                        rules={[{ required: true, message: "Product ID không được để trống " }]}
                    >
                        <InputNumber
                            style={{ width: "100%" }}
                            min={0}
                            placeholder="Nhập số 1 2 3 4" />
                    </Form.Item>

                    <Form.Item
                        label="Tên màu"
                        name="color"
                        rules={[{ required: true, message: "Tên màu không được để trống " }]}
                    >
                        <Input placeholder="Xanh, Đỏ" />
                    </Form.Item>

                    <Form.Item
                        label="Giá"
                        name="price"
                        rules={[{ required: true, message: "Giá không được để trống" }]}
                    >
                        <InputNumber
                            style={{ width: "100%" }}
                            min={0}
                            placeholder="Nhập giá"
                            formatter={(value) =>
                                value ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : ""
                            }
                            parser={(value) => value.replace(/\./g, "")}
                        />
                    </Form.Item>

                    <Form.Item label="Ảnh màu sản phẩm" name="image" rules={[{ required: true, message: "Vui lòng chọn ảnh màu sản phẩm" }]}>
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
                                <UploadOutlined /> Upload ảnh màu sản phẩm
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
