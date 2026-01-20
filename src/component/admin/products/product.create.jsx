// src/components/admin/product/CreateProductForm.jsx
import {
    Button,
    Form,
    Input,
    Modal,
    Select,
} from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";
import {
    createProductAPI,
    fetchAllBrandsAPI,
    fetchAllCategoriesAPI,
    fetchAllTargetsAPI,
} from "../../../services/api.services.js";
import { LoadingContext } from "../../context/loading.context.jsx";
import { NotifyContext } from "../../context/notify.context.jsx";

export default function CreateProductForm({ loadProducts }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [targets, setTargets] = useState([]);
    const [thumbnail, setThumbnail] = useState(null);
    const [preview, setPreview] = useState(null);
    const { api } = useContext(NotifyContext);
    const { loading, setLoading } = useContext(LoadingContext);

    useEffect(() => {
        loadDropdownData();
    }, []);

    const loadDropdownData = async () => {
        try {
            const [brandsRes, categoriesRes, targetsRes] = await Promise.all([
                fetchAllBrandsAPI(),
                fetchAllCategoriesAPI(),
                fetchAllTargetsAPI(),
            ]);

            setBrands(brandsRes.data || []);
            setCategories(categoriesRes.data || []);
            setTargets(targetsRes.data || []);
        } catch (error) {
            api.error({
                message: "Lỗi tải dữ liệu",
                description: "Không thể tải brands / categories / targets",
            });
        }
    };

    const handleOnchangeFile = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setThumbnail(null);
            setPreview(null);
            return;
        }
        const file = e.target.files[0];
        setThumbnail(file);
        setPreview(URL.createObjectURL(file));
        form.setFields([{ name: "thumbnail", errors: [] }]);
    };

    const handleSubmitBtn = async (values) => {
        setLoading(true);
        try {
            const res = await createProductAPI({
                ...values,
                thumbnail,
            });

            api.success({
                message: "Thành Công",
                description: res?.message,
                duration: 3,
            });

            resetAndCloseModal();
            await loadProducts();
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
                title={<div style={{ textAlign: "center" }}>Tạo sản phẩm mới</div>}
                open={isModalOpen}
                confirmLoading={loading}
                onOk={() => form.submit()}
                onCancel={resetAndCloseModal}
                okText="Tạo mới"
                cancelText="Hủy"
                centered
                maskClosable={false}
                width={600}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmitBtn}
                >
                    <Form.Item
                        label="Tên sản phẩm"
                        name="name"
                        rules={[{ required: true, message: "Tên sản phẩm không được để trống" }]}
                    >
                        <Input placeholder="Nhập tên sản phẩm..." />
                    </Form.Item>

                    <Form.Item label="Mô tả" name="description">
                        <Input.TextArea rows={4} placeholder="Nhập mô tả..." />
                    </Form.Item>

                    <Form.Item
                        label="Thương hiệu"
                        name="brandId"
                        rules={[{ required: true, message: "Thương hiệu không được để trống" }]}
                    >
                        <Select
                            placeholder="Chọn brand"
                            showSearch
                            optionFilterProp="label"
                            options={brands.map(b => ({
                                label: b.name,
                                value: b.id,
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
                            showSearch
                            optionFilterProp="label"
                            options={categories.map(c => ({
                                label: c.name,
                                value: c.id,
                            }))}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Mục tiêu sử dụng"
                        name="targetId"
                        rules={[{ required: true, message: "Mục tiêu sử dụng không được để trống" }]}
                    >
                        <Select
                            placeholder="Chọn target"
                            showSearch
                            optionFilterProp="label"
                            options={targets.map(t => ({
                                label: t.name,
                                value: t.id,
                            }))}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Ảnh sản phẩm"
                        name="thumbnail"
                        rules={[{ required: true, message: "Vui lòng chọn ảnh sản phẩm" }]}>
                        <div style={{ textAlign: "center", marginBottom: 12 }}>
                            <label
                                htmlFor="upload-product-thumbnail"
                                style={{
                                    padding: "10px 20px",
                                    background: "#1677ff",
                                    color: "#fff",
                                    borderRadius: 6,
                                    cursor: "pointer",
                                    display: "inline-block",
                                }}
                            >
                                <UploadOutlined /> Upload ảnh sản phẩm
                            </label>
                            <input
                                id="upload-product-thumbnail"
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
                                    border: "1px dashed #d9d9d9",
                                    borderRadius: 8,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    overflow: "hidden",
                                }}
                            >
                                <img
                                    src={preview}
                                    alt="preview"
                                    style={{
                                        maxHeight: "100%",
                                        maxWidth: "100%",
                                        objectFit: "contain"
                                    }}
                                />
                            </div>
                        )}
                    </Form.Item>
                </Form>
            </Modal >
        </>
    );
}