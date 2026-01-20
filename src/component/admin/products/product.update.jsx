import {
    Form,
    Input,
    Modal,
    Select,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";
import {
    updateProductAPI,
    fetchAllBrandsAPI,
    fetchAllCategoriesAPI,
    fetchAllTargetsAPI,
} from "../../../services/api.services.js";
import { LoadingContext } from "../../context/loading.context.jsx";
import { NotifyContext } from "../../context/notify.context.jsx";

export default function UpdateProductForm({
    openUpdate,
    setOpenUpdate,
    dataUpdate,
    setDataUpdate,
    loadProducts,
}) {
    const [form] = Form.useForm();
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [targets, setTargets] = useState([]);
    const [preview, setPreview] = useState(null);
    const [file, setFile] = useState(null);
    const { api, contextHolder } = useContext(NotifyContext);
    const { loading, setLoading } = useContext(LoadingContext)
    useEffect(() => {
        const loadDropdownData = async () => {
            try {
                const [b, c, t] = await Promise.all([
                    fetchAllBrandsAPI(),
                    fetchAllCategoriesAPI(),
                    fetchAllTargetsAPI(),
                ]);
                setBrands(b?.data || []);
                setCategories(c?.data || []);
                setTargets(t?.data || []);
            } catch (error) {

                api.error({
                    message: "Không thể tải dữ liệu",
                    description: error.message,
                });
            }
        };
        loadDropdownData();
    }, []);

    useEffect(() => {
        if (!dataUpdate) return;
        form.setFieldsValue({
            id: dataUpdate.id,
            name: dataUpdate.name,
            desc: dataUpdate.desc,
            brandId: dataUpdate.brandId,
            categoryId: dataUpdate.categoryId,
            targetId: dataUpdate.targetId,
        });
        if (dataUpdate.thumbnail) {
            setPreview(
                `${import.meta.env.VITE_BACKEND_URL}/images/product/${dataUpdate.thumbnail}`
            );
        }
    }, [dataUpdate, form]);

    const handleOnchangeFile = (e) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;

        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
    };

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            const res = await updateProductAPI(dataUpdate.id, {
                ...values,
                thumbnail: file,
            });
            api.success({
                message: "Thành Công",
                description: res?.message,
            });
            resetAndClose();
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

    const resetAndClose = () => {
        form.resetFields();
        setFile(null);
        setPreview(null);
        setDataUpdate(null);
        setOpenUpdate(false);
    };

    return (
        <>
            {contextHolder}
            <Modal
                title={<div style={{ textAlign: "center" }}>Cập nhật sản phẩm</div>}
                open={openUpdate}
                confirmLoading={loading}
                onOk={() => form.submit()}
                onCancel={resetAndClose}
                okText="Cập nhật"
                cancelText="Huỷ"
                centered
                maskClosable={false}
                width={600}
            >
                <Form key={dataUpdate?.id}
                    form={form} layout="vertical" onFinish={handleSubmit}>
                    <Form.Item label="ID" name="id">
                        <Input disabled />
                    </Form.Item>

                    <Form.Item
                        label="Tên sản phẩm"
                        name="name"
                        rules={[{ required: true, message: "Tên sản phẩm không được để trống" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item label="Mô tả" name="description">
                        <Input.TextArea rows={4} />
                    </Form.Item>

                    <Form.Item
                        label="Brand"
                        name="brandId"
                        rules={[{ required: true, message: "Chọn brand" }]}
                    >
                        <Select
                            options={brands.map(b => ({
                                label: b.name,
                                value: b.id,
                            }))}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Category"
                        name="categoryId"
                        rules={[{ required: true, message: "Chọn category" }]}
                    >
                        <Select
                            options={categories.map(c => ({
                                label: c.name,
                                value: c.id,
                            }))}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Target"
                        name="targetId"
                        rules={[{ required: true, message: "Chọn target" }]}
                    >
                        <Select
                            options={targets.map(t => ({
                                label: t.name,
                                value: t.id,
                            }))}
                        />
                    </Form.Item>
                    <Form.Item label="Ảnh sản phẩm" name="thumbnail" required>
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
                    </Form.Item>


                    {preview && (
                        <div style={{ textAlign: "center" }}>
                            <img
                                src={preview}
                                alt="preview"
                                style={{ maxHeight: 200, objectFit: "contain" }}
                            />
                        </div>
                    )}
                </Form>
            </Modal>
        </>
    );
}
