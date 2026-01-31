import { Button, Descriptions, Form, Input, message, Modal, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState, useContext } from "react";
import {
    createProductGroupAPI,
    fetchAllBrandsAPI,
    fetchAllCategoriesAPI
} from "../../../services/api.services.js";
import { NotifyContext } from "../../context/notify.context.jsx";
import { LoadingContext } from "../../context/loading.context.jsx";
export default function CreateProductGroupForm({ loadGroups }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const { loading, setLoading } = useContext(LoadingContext);
    const [form] = Form.useForm();
    const { api } = useContext(NotifyContext);

    useEffect(() => {
        loadDropdownData();
    }, []);

    const loadDropdownData = async () => {
        const [b, c] = await Promise.all([
            fetchAllBrandsAPI(),
            fetchAllCategoriesAPI()
        ]);

        setBrands(b.data || []);
        setCategories(c.data || []);
    };

    const handleSubmitBtn = async (values) => {
        try {
            setLoading(true);
            console.log("Values gửi đi:", values);

            const res = await createProductGroupAPI(values);

            api.success({
                message: "Thành công",
                description: res?.message,
            });

            resetAndCloseModal();
            await loadGroups();
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
                    Tạo nhóm sản phẩm mới
                </Button>
            </div>

            <Modal
                title="Tạo nhóm sản phẩm"
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
                        label="Tên nhóm"
                        name="name"
                        rules={[{ required: true, message: "Tên nhóm không được để trống" }]}
                    >
                        <Input placeholder="Iphone 17 Pro Max" />
                    </Form.Item>

                    <Form.Item
                        label="Thương hiệu"
                        name="brandId"
                        rules={[{ required: true, message: "Thương hiệu không được để trống" }]}
                    >
                        <Select
                            placeholder="Chọn brand"
                            options={brands.map(b => ({
                                label: b.name,
                                value: b.id
                            }))}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Danh mục"
                        name="categoryId"
                        rules={[{ required: true, message: "Danh mục không được để trống" }]}
                    >
                        <Select
                            placeholder="Chọn danh mục"
                            options={categories.map(c => ({
                                label: c.name,
                                value: c.id
                            }))}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}
