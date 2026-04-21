import { useState } from "react";
import { Form, Input } from "antd";
import BaseModal from "../../../../components/common/BaseModal.jsx";
import BaseCreateButton from "../../../../components/common/BaseCreateButton.jsx";
import { useCategory } from "../hooks/useCategory.js";
import UploadImage from "../../../../components/common/ImageUpload.jsx";
import { useImageUpload } from "../../../../hooks/useImageUpload.js";

export default function CreateCategoryForm({ loadCategory }) {
  const [isOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm();
  const { create } = useCategory();

  const { preview, handleChangeFile, resetImage, uploading, logoValidator } =
    useImageUpload(form, {
      type: "category",
      fieldName: "icon",
      fieldId: "iconId",
    });

  const reset = () => {
    form.resetFields();
    resetImage();
    setIsOpen(false);
  };

  const handleSubmit = async (values) => {
    const res = await create(values, form);
    if (res) {
      reset();
      await loadCategory();
    }
  };

  return (
    <>
      <BaseCreateButton onClick={() => setIsOpen(true)} text="Tạo danh mục" />

      <BaseModal
        open={isOpen}
        onOk={() => form.submit()}
        onCancel={reset}
        okText="Tạo mới"
        title="Tạo danh mục"
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Tên danh mục"
            name="name"
            rules={[{ required: true, message: "Không được để trống" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Icon"
            name="icon"
            rules={[{ validator: logoValidator }]}
          >
            <UploadImage
              preview={preview}
              uploading={uploading}
              onChange={handleChangeFile}
            />
          </Form.Item>

          <Form.Item name="iconId" hidden>
            <Input />
          </Form.Item>
        </Form>
      </BaseModal>
    </>
  );
}
