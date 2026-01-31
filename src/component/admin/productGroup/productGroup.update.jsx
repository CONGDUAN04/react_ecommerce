import { Form, Input, Modal, Select } from "antd";
import { useContext, useEffect, useState } from "react";
import {
    updateProductGroupAPI,
    fetchAllBrandsAPI,
    fetchAllCategoriesAPI,
} from "../../../services/api.services.js";
import { LoadingContext } from "../../context/loading.context.jsx";
import { NotifyContext } from "../../context/notify.context.jsx";

export default function UpdateProductGroupForm({
    openUpdate,
    setOpenUpdate,
    dataUpdate,
    setDataUpdate,
    loadGroups,
}) {
    const [form] = Form.useForm();
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);

    const { api, contextHolder } = useContext(NotifyContext);
    const { loading, setLoading } = useContext(LoadingContext);

    // load dropdown
    useEffect(() => {
        const loadDropdownData = async () => {
            try {
                const [b, c] = await Promise.all([
                    fetchAllBrandsAPI(),
                    fetchAllCategoriesAPI(),
                ]);

                setBrands(b?.data || []);
                setCategories(c?.data || []);
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
            brandId: dataUpdate.brandId,
            categoryId: dataUpdate.categoryId,
        });
    }, [dataUpdate, form]);

    const handleSubmit = async (values) => {
        setLoading(true);

        try {
            const res = await updateProductGroupAPI(dataUpdate.id, values);

            api.success({
                message: "Thành công",
                description: res?.message || "Cập nhật nhóm sản phẩm thành công",
            });

            resetAndClose();
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

    const resetAndClose = () => {
        form.resetFields();
        setDataUpdate(null);
        setOpenUpdate(false);
    };

    return (
        <>
            {contextHolder}

            <Modal
                title={<div style={{ textAlign: "center" }}>Cập nhật nhóm sản phẩm</div>}
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
                <Form
                    key={dataUpdate?.id}
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                >
                    <Form.Item label="ID" name="id">
                        <Input disabled />
                    </Form.Item>

                    <Form.Item
                        label="Tên nhóm"
                        name="name"
                        rules={[
                            { required: true, message: "Tên nhóm không được để trống" },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Brand"
                        name="brandId"
                        rules={[{ required: true, message: "Chọn brand" }]}
                    >
                        <Select
                            options={brands.map((b) => ({
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
                            options={categories.map((c) => ({
                                label: c.name,
                                value: c.id,
                            }))}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}
