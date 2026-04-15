import { Form, Input, Modal } from "antd";
import { useState } from "react";
import BaseCreateButton from "../../../../components/common/BaseCreateButton.jsx";
import BaseModal from "../../../../components/common/BaseModal.jsx";
import { useCategory } from "../hooks/useCategory.js";

export default function CreateCategoryForm({ loadCategory }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const { create } = useCategory();

  const resetAndCloseModal = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const handleSubmitBtn = async (values) => {
    const res = await create(
      {
        name: values.name,
      },
      form,
    );

    if (res) {
      resetAndCloseModal();
      await loadCategory();
    }
  };

  return (
    <>
      <BaseCreateButton
        onClick={() => setIsModalOpen(true)}
        text="Tạo danh mục mới"
      />

      <BaseModal
        open={isModalOpen}
        onOk={() => form.submit()}
        onCancel={resetAndCloseModal}
        title="Tạo danh mục mới"
        okText="Tạo mới"
      >
        <Form form={form} layout="vertical" onFinish={handleSubmitBtn}>
          <Form.Item
            label="Tên danh mục"
            name="name"
            rules={[
              { required: true, message: "Tên danh mục không được để trống" },
            ]}
          >
            <Input placeholder="Nhập tên danh mục..." />
          </Form.Item>
        </Form>
      </BaseModal>
    </>
  );
}
