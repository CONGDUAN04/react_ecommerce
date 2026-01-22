import { Form, Input, Modal, InputNumber } from "antd";
import { useContext, useEffect, useCallback, useMemo } from "react";
import { LoadingContext } from "../../context/loading.context";
import { NotifyContext } from "../../context/notify.context.jsx";
import { updateStorageAPI } from "../../../services/api.services";

const UpdateStorageForm = ({
    openUpdate,
    setOpenUpdate,
    dataUpdate,
    setDataUpdate,
    loadStorage
}) => {
    const [form] = Form.useForm();
    const { loading, setLoading } = useContext(LoadingContext);
    const { api } = useContext(NotifyContext);

    useEffect(() => {
        if (!dataUpdate) return;

        form.setFieldsValue({
            id: dataUpdate.id,
            sku: dataUpdate.sku,
            name: dataUpdate.name,
            price: dataUpdate.price,
            quantity: dataUpdate.quantity,
        });
    }, [dataUpdate, form]);

    const convertFieldName = useCallback((field) =>
        field.replace('body.', '').split('.').map(v => isNaN(v) ? v : Number(v)),
        []
    );

    const handleSubmit = useCallback(async (values) => {
        setLoading(true);
        try {
            const res = await updateStorageAPI(dataUpdate.id, values);

            api.success({
                message: "Thành công",
                description: res?.message,
                duration: 3,
            });

            resetAndClose();
            await loadStorage();
        } catch (error) {
            const errors = error.response?.data?.errors;

            if (errors && errors.length > 0) {
                form.setFields(
                    errors.map(err => ({
                        name: convertFieldName(err.field),
                        errors: [err.message],
                    }))
                );
                return;
            }

            api.error({
                message: "Thất bại",
                description: error.response?.data?.message || "Đã có lỗi xảy ra",
                duration: 3,
            });
        } finally {
            setLoading(false);
        }
    }, [api, convertFieldName, dataUpdate?.id, form, loadStorage, setLoading]);

    const resetAndClose = useCallback(() => {
        form.resetFields();
        setOpenUpdate(false);
        setDataUpdate(null);
    }, [form, setDataUpdate, setOpenUpdate]);

    const modalTitle = useMemo(() => (
        <div style={{ textAlign: "center", fontSize: 18, fontWeight: 600 }}>
            Cập nhật dung lượng sản phẩm
        </div>
    ), []);

    return (
        <Modal
            title={modalTitle}
            open={openUpdate}
            confirmLoading={loading}
            onOk={() => form.submit()}
            onCancel={resetAndClose}
            okText="Cập nhật"
            cancelText="Hủy"
            centered
            width={600}
            destroyOnClose
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                preserve={false}
            >
                <Form.Item
                    label="ID"
                    name="id"
                >
                    <Input disabled style={{ color: '#000' }} />
                </Form.Item>

                <Form.Item
                    label="SKU"
                    name="sku"
                // rules={[
                //     { required: true, message: "SKU không được để trống" },
                //     { whitespace: true, message: "SKU không được chỉ chứa khoảng trắng" },
                //     {
                //         pattern: /^[A-Z0-9-]+$/,
                //         message: "SKU chỉ được chứa chữ in hoa, số và dấu gạch ngang"
                //     }
                // ]}
                >
                    <Input
                        placeholder="IP15-256GB-BLK"
                        style={{ textTransform: 'uppercase' }}
                    />
                </Form.Item>

                <Form.Item
                    label="Tên dung lượng"
                    name="name"
                    rules={[
                        { required: true, message: "Tên dung lượng không được để trống" },
                        { whitespace: true, message: "Tên không được chỉ chứa khoảng trắng" }
                    ]}
                >
                    <Input placeholder="256GB" />
                </Form.Item>

                <Form.Item
                    label="Giá"
                    name="price"
                    rules={[
                        { required: true, message: "Giá không được để trống" },
                        {
                            type: 'number',
                            min: 0,
                            message: "Giá phải lớn hơn 0"
                        }
                    ]}
                >
                    <InputNumber
                        min={0}
                        style={{ width: "100%" }}
                        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                        placeholder="25000000"
                    />
                </Form.Item>

                <Form.Item
                    label="Số lượng"
                    name="quantity"
                    rules={[
                        { required: true, message: "Số lượng không được để trống" },
                        {
                            type: 'number',
                            min: 0,
                            message: "Số lượng phải lớn hơn hoặc bằng 0"
                        }
                    ]}
                >
                    <InputNumber
                        min={0}
                        style={{ width: "100%" }}
                        placeholder="100"
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default UpdateStorageForm;