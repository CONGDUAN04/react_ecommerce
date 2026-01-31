import { Form, Input, Modal } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";
import { updateProductAPI } from "../../../services/api.services.js";
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
    const [preview, setPreview] = useState(null);
    const [file, setFile] = useState(null);
    const { api, contextHolder } = useContext(NotifyContext);
    const { loading, setLoading } = useContext(LoadingContext);

    // ================= LOAD DATA =================
    useEffect(() => {
        if (!dataUpdate) return;

        form.setFieldsValue({
            id: dataUpdate.id,
            name: dataUpdate.name,
            desc: dataUpdate.description,
            productGroup: dataUpdate.productGroup?.name,
        });

        if (dataUpdate.thumbnail) {
            setPreview(
                `${import.meta.env.VITE_BACKEND_URL}/images/product/${dataUpdate.thumbnail}`
            );
        }
    }, [dataUpdate]);

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
                name: values.name,
                description: values.desc,
                productGroupId: dataUpdate.productGroupId,
                thumbnail: file,
            });

            api.success({
                message: "Thành công",
                description: res?.message,
            });

            resetAndClose();
            await loadProducts();
        } catch (error) {
            api.error({
                message: "Thất bại",
                description: error.response?.data?.message || error.message,
            });
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
                width={520}
            >
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <Form.Item label="ID" name="id" required>
                        <Input disabled />
                    </Form.Item>

                    <Form.Item label="Nhóm sản phẩm" name="productGroup" required >
                        <Input disabled />
                    </Form.Item>

                    <Form.Item
                        label="Tên phiên bản"
                        name="name"
                        rules={[{ required: true, message: "Không được để trống" }]}
                    >
                        <Input placeholder="VD: 256GB" />
                    </Form.Item>

                    <Form.Item label="Mô tả" name="desc">
                        <Input.TextArea rows={3} />
                    </Form.Item>

                    <Form.Item label="Ảnh sản phẩm" required>
                        <div style={{ textAlign: "center", marginBottom: 12 }}>
                            <label
                                htmlFor="upload"
                                style={{
                                    padding: "8px 18px",
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

                        {preview && (
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <img
                                    src={preview}
                                    alt="preview"
                                    style={{
                                        maxHeight: 200,
                                        objectFit: "contain",
                                        borderRadius: 6,
                                    }}
                                />
                            </div>
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}
