import { useState } from "react";
import { Form, Input } from "antd";
import BaseModal from "../../../../components/common/BaseModal.jsx";
import BaseCreateButton from "../../../../components/common/BaseCreateButton.jsx";
import { useRole } from "../hooks/useRole.js";

export default function CreateRoleForm({ loadRole }) {
  const [isOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm();

  const { create } = useRole();

  const reset = () => {
    form.resetFields();
    setIsOpen(false);
  };

  const handleSubmit = async (values) => {
    const res = await create(values, form);

    if (res) {
      reset();
      await loadRole();
    }
  };

  return (
    <>
      <BaseCreateButton onClick={() => setIsOpen(true)} text="Tạo role" />

      <BaseModal
        open={isOpen}
        onOk={() => form.submit()}
        onCancel={reset}
        title="Tạo role"
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Tên role"
            name="name"
            rules={[{ required: true, message: "Không được để trống" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Mô tả" name="description">
            <Input />
          </Form.Item>
        </Form>
      </BaseModal>
    </>
  );
}
