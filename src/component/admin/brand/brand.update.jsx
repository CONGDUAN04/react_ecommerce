import { Form, Input, Modal } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";
import { updateBrandAPI } from "../../../services/api.services.js";
import { LoadingContext } from "../../context/loading.context.jsx";
import { NotifyContext } from "../../context/notify.context.jsx";

export default function UpdateBrand({
    isModalUpdateOpen,
    setIsModalUpdateModal,
    dataUpdate,
    setDataUpdate,
    loadBrand,
}) {
    const [form] = Form.useForm();
    const [preview, setPreview] = useState(null);
    const [file, setFile] = useState(null);
    const { api, contextHolder } = useContext(NotifyContext);
    const { loading, setLoading } = useContext(LoadingContext);

    useEffect(() => {
        if (!dataUpdate) return;
        form.setFieldsValue({
            id: dataUpdate.id,
            name: dataUpdate.name,
        });
        if (dataUpdate.image) {
            setPreview(`${import.meta.env.VITE_BACKEND_URL}/images/brand/${dataUpdate.image}`);
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
            const res = await updateBrandAPI(dataUpdate.id, {
                name: values.name,
                image: file,
            });
            api.success({
                message: "Thành Công",
                description: res?.message,
                duration: 5
            });
            resetAndClose();
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

    const resetAndClose = () => {
        form.resetFields();
        setFile(null);
        setPreview(null);
        setDataUpdate(null);
        setIsModalUpdateModal(false);
    };

    return (
        <>
            {contextHolder}
            <Modal
                title={<div style={{ textAlign: "center" }}>Cập nhật thương hiệu</div>}
                open={isModalUpdateOpen}
                confirmLoading={loading}
                onOk={() => form.submit()}
                onCancel={resetAndClose}
                okText="Cập nhật"
                cancelText="Huỷ"
                centered
                maskClosable={false}
                width={600}
            >
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <Form.Item label="ID thương hiệu" name="id">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item label="Tên thương hiệu" name="name" rules={[{ required: true, message: "Tên thương hiệu không được để trống" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Ảnh thương hiệu" name="image">
                        <div style={{ textAlign: "center", marginBottom: 12 }}>
                            <label htmlFor="upload-brand" style={{ padding: "10px 20px", background: "#1677ff", color: "#fff", borderRadius: 6, cursor: "pointer", display: "inline-block" }}>
                                <UploadOutlined /> Upload ảnh thương hiệu
                            </label>
                            <input id="upload-brand" type="file" hidden accept="image/*" onChange={handleOnchangeFile} />
                        </div>
                        {preview && (
                            <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
                                <img src={preview} alt="preview" style={{ maxHeight: 200, maxWidth: "100%", objectFit: "contain", borderRadius: 6 }} />
                            </div>
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}