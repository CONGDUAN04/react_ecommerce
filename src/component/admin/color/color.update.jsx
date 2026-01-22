import { Form, Input, Modal } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";
import { updateColorAPI } from "../../../services/api.services.js";
import { LoadingContext } from "../../context/loading.context.jsx";
import { NotifyContext } from "../../context/notify.context.jsx";

export default function UpdateColorForm({
    openUpdate,
    setOpenUpdate,
    dataUpdate,
    setDataUpdate,
    loadColor,
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
            color: dataUpdate.color,
        });
        if (dataUpdate.image) {
            setPreview(`${import.meta.env.VITE_BACKEND_URL}/images/color/${dataUpdate.image}`);
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
            const res = await updateColorAPI(dataUpdate.id, {
                ...values,
                image: file,
            });
            api.success({
                message: "Thành Công",
                description: res?.message
            });
            resetAndClose();
            await loadColor();
        } catch (error) {
            if (error.response?.data?.errors && error.response.data.errors.length > 0) {
                const formErrors = error.response.data.errors.map(err => ({
                    name: err.field.replace('body.', ''),
                    errors: [err.message],
                }));
                form.setFields(formErrors);
            } else {
                const errorMessage = error.response?.data?.message || error.message || "Đã có lỗi xảy ra";
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
                title={<div style={{ textAlign: "center" }}>Cập nhật màu sắc</div>}
                open={openUpdate}
                confirmLoading={loading}
                onOk={() => form.submit()}
                onCancel={resetAndClose}
                okText="Cập nhật"
                cancelText="Huỷ"
                centered
                width={600}
            >
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <Form.Item label="ID màu sản phẩm" name="id">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item label="Tên màu" name="color" rules={[{ required: true, message: "Tên màu không được để trống " }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Ảnh màu sắc" name="image" required>
                        <div style={{ textAlign: "center", marginBottom: 12 }}>
                            <label htmlFor="upload" style={{ padding: "10px 20px", background: "#1677ff", color: "#fff", borderRadius: 6, cursor: "pointer", display: "inline-block" }}>
                                <UploadOutlined /> Upload ảnh màu sắc
                            </label>
                            <input id="upload" type="file" hidden accept="image/*" onChange={handleOnchangeFile} />
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