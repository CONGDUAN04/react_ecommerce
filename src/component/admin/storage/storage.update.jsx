import { Form, Input, Modal } from "antd";
import { useContext, useEffect } from "react";
import { LoadingContext } from "../../context/loading.context";
import { NotifyContext } from "../../context/notify.context.jsx";
import { updateStorageAPI } from "../../../services/api.services";

const UpdateStorageForm = ({ openUpdate, setOpenUpdate, dataUpdate, setDataUpdate, loadStorage }) => {
    const [form] = Form.useForm();
    const { loading, setLoading } = useContext(LoadingContext);
    const { api } = useContext(NotifyContext);

    useEffect(() => {
        if (!dataUpdate) return;
        form.setFieldsValue({
            id: dataUpdate.id,
            name: dataUpdate.name,
            price: dataUpdate.price,
            quantity: dataUpdate.quantity,
        });
    }, [dataUpdate, form]);
    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            const res = await updateStorageAPI(dataUpdate.id, {
                ...values,
            });

            api.success({
                message: "Thành Công",
                description: res?.message,
                duration: 3,
            });

            resetAndClose();
            await loadStorage();
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
        setOpenUpdate(false);
        setDataUpdate(null);
    };

    return (
        <>
            <Modal
                title={<div style={{ textAlign: "center" }}>Cập nhật sản phẩm</div>}
                open={openUpdate}
                confirmLoading={loading}
                onOk={() => form.submit()}
                onCancel={resetAndClose}
                okText="Cập nhật"
                cancelText="Huỷ"
                centered
                width={600}>
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <Form.Item label="ID" name="id">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        label="Tên dung lượng"
                        name="name"
                        rules={[{ required: true, message: "Tên dung lượng không được để trống" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Giá"
                        name="price"
                        rules={[{ required: true, message: "Giá không được để trống" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Số lượng"
                        name="quantity"
                        rules={[{ required: true, message: "Số lượng không được để trống" }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>

    );
};
export default UpdateStorageForm;