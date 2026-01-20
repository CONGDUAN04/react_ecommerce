import {
    Button,
    Form,
    Input,
    Modal,
    notification,
    Table,
    InputNumber,
} from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useContext, useState } from "react";
import { LoadingContext } from "../../context/loading.context.jsx";
import { createStoragesAPI } from "../../../services/api.services.js";
import { NotifyContext } from "../../context/notify.context.jsx";

export default function CreateStorageForm({ loadStorage }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { loading, setLoading } = useContext(LoadingContext);
    const [form] = Form.useForm();
    const { api } = useContext(NotifyContext)
    const convertFieldName = (field) =>
        field
            .replace("body.", "")
            .split(".")
            .map((v) => (isNaN(v) ? v : Number(v)));

    const handleSubmitBtn = async (values) => {
        setLoading(true);
        try {
            const res = await createStoragesAPI(values);

            api.success({
                message: "Thành công",
                description: res?.message,
            });

            form.resetFields();
            setIsModalOpen(false);
            await loadStorage();
        } catch (error) {
            const errors = error.response?.data?.errors;

            if (errors && errors.length > 0) {
                form.setFields(
                    errors.map((err) => ({
                        name: convertFieldName(err.field),
                        errors: [err.message],
                    }))
                );
                return;
            }

            api.error({
                message: "Thất bại",
                description:
                    error.response?.data?.message || "Đã có lỗi xảy ra",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: 20,
                    paddingRight: 24,
                }}
            >
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setIsModalOpen(true)}
                    size="large"
                    style={{
                        height: 42,
                        padding: "0 24px",
                        borderRadius: 8,
                        fontSize: 15,
                        fontWeight: 500,
                        boxShadow: "0 2px 4px rgba(24, 144, 255, 0.2)",
                    }}
                >
                    Tạo dung lượng mới
                </Button>
            </div>


            <Modal
                title="Tạo dung lượng mới"
                open={isModalOpen}
                onOk={() => form.submit()}
                onCancel={() => {
                    form.resetFields();
                    setIsModalOpen(false);
                }}
                confirmLoading={loading}
                width={900}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmitBtn}
                >
                    <Form.Item
                        label="ID màu sản phẩm"
                        name="colorId"
                        rules={[{ required: true, message: "ID không được để trống" }]}
                    >
                        <Input type="number" />
                    </Form.Item>

                    <Form.List name="storages">
                        {(fields, { add, remove }) => (
                            <>
                                <Button
                                    type="dashed"
                                    icon={<PlusOutlined />}
                                    onClick={() => add({ name: "", price: null, quantity: null })}
                                    block
                                >
                                    Thêm dung lượng
                                </Button>

                                <Table
                                    style={{ marginTop: 16 }}
                                    dataSource={fields}
                                    pagination={false}
                                    rowKey="key"
                                    columns={[
                                        {
                                            title: "Tên dung lượng",
                                            render: (_, __, index) => (
                                                <Form.Item
                                                    name={[index, "name"]}
                                                    rules={[
                                                        { required: true, message: "Tên dung lượng không được để trống" },
                                                    ]}
                                                >
                                                    <Input placeholder="256GB" />
                                                </Form.Item>
                                            ),
                                        },
                                        {
                                            title: "Giá",
                                            render: (_, __, index) => (
                                                <Form.Item
                                                    name={[index, "price"]}
                                                    rules={[
                                                        { required: true, message: "Giá không được để trống" },
                                                    ]}
                                                >
                                                    <InputNumber
                                                        min={0}
                                                        style={{ width: "100%" }}
                                                    />
                                                </Form.Item>
                                            ),
                                        },
                                        {
                                            title: "Số lượng",
                                            render: (_, __, index) => (
                                                <Form.Item
                                                    name={[index, "quantity"]}
                                                    rules={[
                                                        { required: true, message: "Số lượng không được để trống" },
                                                    ]}
                                                >
                                                    <InputNumber
                                                        min={0}
                                                        style={{ width: "100%" }}
                                                    />
                                                </Form.Item>
                                            ),
                                        },
                                        {
                                            title: "Hành động",
                                            render: (_, field) => (
                                                <Button
                                                    danger
                                                    icon={<DeleteOutlined />}
                                                    onClick={() => remove(field.name)}
                                                />
                                            ),
                                        },
                                    ]}
                                />
                            </>
                        )}
                    </Form.List>
                </Form>
            </Modal>
        </>
    );
}
