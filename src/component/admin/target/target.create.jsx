import { Button, Form, Input, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useContext, useState } from "react";
import { LoadingContext } from "../../context/loading.context";
import { NotifyContext } from "../../context/notify.context.jsx";
import { createTargetAPI } from "../../../services/api.services.js";

export default function CreateTargetForm({ loadTarget }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const { api } = useContext(NotifyContext);
    const { loading, setLoading } = useContext(LoadingContext);
    const handleSubmitBtn = async (values) => {
        try {
            setLoading(true);
            const res = await createTargetAPI({
                name: values.name,
                description: values.description,
            });
            api.success({
                message: "Thành công",
                description: res?.message,
                duration: 3,
            });

            form.resetFields();
            setIsModalOpen(false);
            await loadTarget();
        } catch (error) {
            if (error.response?.data?.errors?.length) {
                const formErrors = error.response.data.errors.map(err => ({
                    name: err.field.replace("body.", ""),
                    errors: [err.message],
                }));
                form.setFields(formErrors);
            } else {
                api.error({
                    message: "Thất bại",
                    description:
                        error.response?.data?.message ||
                        error.message ||
                        "Đã có lỗi xảy ra",
                    duration: 3,
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
                    Tạo mục tiêu mới
                </Button>
            </div>

            <Modal
                title="Tạo mục tiêu mới"
                open={isModalOpen}
                confirmLoading={loading}
                onOk={() => form.submit()}
                onCancel={() => {
                    form.resetFields();
                    setIsModalOpen(false);
                }}
                okText="Tạo mới"
                cancelText="Hủy"
                centered
                maskClosable={false}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmitBtn}
                >
                    {/* ✅ TÊN MỤC TIÊU */}
                    <Form.Item
                        label="Tên mục tiêu"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Tên mục tiêu không được để trống",
                            },
                            {
                                max: 100,
                                message: "Tên mục tiêu tối đa 100 ký tự",
                            },
                        ]}
                    >
                        <Input placeholder="Nhập tên mục tiêu..." />
                    </Form.Item>

                    {/* ✅ MÔ TẢ */}
                    <Form.Item
                        label="Mô tả mục tiêu"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: "Mô tả mục tiêu không được để trống",
                            },
                            {
                                max: 255,
                                message: "Mô tả tối đa 255 ký tự",
                            },
                        ]}
                    >
                        <Input.TextArea
                            rows={4}
                            placeholder="Nhập mô tả mục tiêu..."
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}
