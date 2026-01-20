import { Form, Input, Modal } from "antd";
import { useContext, useEffect } from "react";
import { LoadingContext } from "../../context/loading.context";
import { NotifyContext } from "../../context/notify.context";
import { updateTargetAPI } from "../../../services/api.services";

export default function UpdateTargetForm({
    openUpdate,
    setOpenUpdate,
    dataUpdate,
    setDataUpdate,
    loadTarget
}) {
    const [form] = Form.useForm();
    const { api } = useContext(NotifyContext);
    const { loading, setLoading } = useContext(LoadingContext);

    // Đổ dữ liệu vào form khi mở modal
    useEffect(() => {
        if (openUpdate && dataUpdate) {
            form.setFieldsValue({
                name: dataUpdate.name,
                description: dataUpdate.description,
            });
        }
    }, [openUpdate, dataUpdate, form]);

    const handleClose = () => {
        form.resetFields();
        setDataUpdate(null);
        setOpenUpdate(false);
    };

    const handleSubmit = async (values) => {
        try {
            setLoading(true);

            const res = await updateTargetAPI(dataUpdate.id, {
                name: values.name,
                description: values.description,
            });

            api.success({
                message: "Thành công",
                description: res?.message || "Cập nhật mục tiêu thành công",
                duration: 3,
            });

            handleClose();
            await loadTarget();
        } catch (error) {
            if (error.response?.data?.errors?.length) {
                const formErrors = error.response.data.errors.map(err => ({
                    name: err.field.replace("body.", ""),
                    errors: [err.message],
                }));
                form.setFields(formErrors);
            } else {
                api.error({
                    message: "Thất bại",
                    description:
                        error.response?.data?.message ||
                        error.message ||
                        "Đã có lỗi xảy ra",
                    duration: 3,
                });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title="Cập nhật mục tiêu"
            open={openUpdate}
            confirmLoading={loading}
            onOk={() => form.submit()}
            onCancel={handleClose}
            okText="Cập nhật"
            cancelText="Hủy"
            centered
            maskClosable={false}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
            >
                <Form.Item
                    label="Tên mục tiêu"
                    name="name"
                    rules={[
                        { required: true, message: "Tên mục tiêu không được để trống" },
                        { max: 100, message: "Tên mục tiêu tối đa 100 ký tự" },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Mô tả mục tiêu"
                    name="description"
                    rules={[
                        { required: true, message: "Mô tả mục tiêu không được để trống" },
                        { max: 255, message: "Mô tả tối đa 255 ký tự" },
                    ]}
                >
                    <Input.TextArea rows={3} />
                </Form.Item>
            </Form>
        </Modal>
    );
}
