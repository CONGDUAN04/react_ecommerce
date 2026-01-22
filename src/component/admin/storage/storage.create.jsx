import {
    Button,
    Form,
    Input,
    Modal,
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
    const { api } = useContext(NotifyContext);

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
            if (error.response?.data?.errors && Array.isArray(error.response.data.errors) && error.response.data.errors.length > 0) {
                const formErrors = error.response.data.errors.map(err => {
                    const fieldPath = err.field
                        .replace('body.', '')
                        .split('.')
                        .map(part => {
                            const num = Number(part);
                            return isNaN(num) ? part : num;
                        });
                    return {
                        name: fieldPath,
                        errors: [err.message],
                    };
                });

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
                okText="Tạo mới"
                maskClosable={false}
                onCancel={() => {
                    form.resetFields();
                    setIsModalOpen(false);
                }}
                confirmLoading={loading}
                width={1000}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmitBtn}
                >
                    <Form.Item
                        label="ID màu sản phẩm"
                        name="colorId"
                        rules={[
                            { required: true, message: "ID màu sản phẩm không được để trống" },
                            { whitespace: true, message: "ID màu sản phẩm không được chỉ chứa khoảng trắng" },
                            { pattern: /^\d+$/, message: "ID màu sản phẩm phải là số" }
                        ]}
                    >
                        <Input
                            placeholder="Nhập ID màu sản phẩm (VD: 123)"
                            allowClear
                        />
                    </Form.Item>

                    <Form.List name="storages">
                        {(fields, { add, remove }) => (
                            <>
                                <Button
                                    type="dashed"
                                    icon={<PlusOutlined />}
                                    onClick={() => add({ sku: "", name: "", price: undefined, quantity: undefined })}
                                    block
                                >
                                    Thêm dung lượng
                                </Button>

                                <Table
                                    style={{ marginTop: 16 }}
                                    dataSource={fields}
                                    pagination={false}
                                    rowKey="key"
                                    scroll={{ x: 800 }}
                                    columns={[
                                        {
                                            title: "SKU",
                                            width: 150,
                                            render: (_, __, index) => (
                                                <Form.Item
                                                    name={[index, "sku"]}
                                                    style={{ marginBottom: 0 }}
                                                    rules={[
                                                        { required: true, message: "SKU không được để trống" },
                                                        { whitespace: true, message: "SKU không được chỉ chứa khoảng trắng" },
                                                        { min: 3, message: "SKU tối thiểu 3 ký tự" },
                                                        { max: 50, message: "SKU tối đa 50 ký tự" },
                                                        {
                                                            pattern: /^[A-Z0-9-]+$/,
                                                            message: "SKU chỉ được chứa chữ IN HOA, số và dấu gạch ngang"
                                                        }
                                                    ]}
                                                >
                                                    <Input
                                                        placeholder="IP15-256GB-BLK"
                                                        style={{ textTransform: 'uppercase' }}
                                                    />
                                                </Form.Item>
                                            ),
                                        },
                                        {
                                            title: "Tên dung lượng",
                                            width: 150,
                                            render: (_, __, index) => (
                                                <Form.Item
                                                    name={[index, "name"]}
                                                    style={{ marginBottom: 0 }}
                                                    rules={[
                                                        { required: true, message: "Tên dung lượng không được để trống" },
                                                        { whitespace: true, message: "Tên không được chỉ chứa khoảng trắng" },
                                                        { max: 100, message: "Tên dung lượng tối đa 100 ký tự" }
                                                    ]}
                                                >
                                                    <Input placeholder="256GB" />
                                                </Form.Item>
                                            ),
                                        },
                                        {
                                            title: "Giá",
                                            width: 150,
                                            render: (_, __, index) => (
                                                <Form.Item
                                                    name={[index, "price"]}
                                                    style={{ marginBottom: 0 }}
                                                    rules={[
                                                        { required: true, message: "Giá không được để trống" },
                                                        {
                                                            type: 'number',
                                                            min: 0,
                                                            message: "Giá phải là số không âm"
                                                        }
                                                    ]}
                                                >
                                                    <InputNumber
                                                        min={0}
                                                        style={{ width: "100%" }}
                                                        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                        parser={value => value?.replace(/\$\s?|(,*)/g, '')}
                                                        placeholder="25000000"
                                                    />
                                                </Form.Item>
                                            ),
                                        },
                                        {
                                            title: "Số lượng",
                                            width: 120,
                                            render: (_, __, index) => (
                                                <Form.Item
                                                    name={[index, "quantity"]}
                                                    style={{ marginBottom: 0 }}
                                                    rules={[
                                                        { required: true, message: "Số lượng không được để trống" },
                                                        {
                                                            type: 'number',
                                                            min: 0,
                                                            message: "Số lượng phải là số không âm"
                                                        }
                                                    ]}
                                                >
                                                    <InputNumber
                                                        min={0}
                                                        precision={0}
                                                        style={{ width: "100%" }}
                                                        placeholder="100"
                                                    />
                                                </Form.Item>
                                            ),
                                        },
                                        {
                                            title: "Hành động",
                                            width: 100,
                                            align: "center",
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