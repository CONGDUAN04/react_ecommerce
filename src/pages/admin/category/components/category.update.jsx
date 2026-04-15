import { Form, Input } from "antd";
import { useEffect, useState } from "react";
import BaseModal from "../../../../components/common/BaseModal.jsx";
import { useCategory } from "../hooks/useCategory.js";

export default function UpdateCategoryForm({
  openUpdate,
  setOpenUpdate,
  dataUpdate,
  setDataUpdate,
  loadCategory,
}) {
  const [form] = Form.useForm();

  const { update } = useCategory();

  useEffect(() => {
    if (!dataUpdate) return;

    form.setFieldsValue({
      id: dataUpdate.id,
      name: dataUpdate.name,
      description: dataUpdate.description,
    });
  }, [dataUpdate, form]);

  const handleSubmit = async (values) => {
    const res = await update(
      dataUpdate.id,
      {
        ...values,
      },
      form,
    );

    if (res) {
      resetAndClose();
      await loadCategory();
    }
  };

  const resetAndClose = () => {
    form.resetFields();
    setDataUpdate(null);
    setOpenUpdate(false);
  };

  return (
    <BaseModal
      open={openUpdate}
      onOk={() => form.submit()}
      onCancel={resetAndClose}
      title="Cập nhật danh mục"
      okText="Cập nhật"
      cancelText="Huỷ"
      width={600}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="ID danh mục" name="id">
          <Input disabled />
        </Form.Item>

        <Form.Item
          label="Tên danh mục"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên danh mục" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </BaseModal>
  );
}
