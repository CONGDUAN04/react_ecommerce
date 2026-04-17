import { useState } from "react";
import { Form, Input } from "antd";
import BaseModal from "../../../../components/common/BaseModal.jsx";
import BaseCreateButton from "../../../../components/common/BaseCreateButton.jsx";
import { useBrand } from "../hooks/useBrand.js";
import { useImageUpload } from "../../../../hooks/useImageUpload.js";
import UploadImage from "../../../../components/common/ImageUpload.jsx";

export default function CreateBrandForm({ loadBrand }) {
  const [isOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm();

  const { create } = useBrand();
  const { preview, handleChangeFile, resetImage } = useImageUpload(
    form,
    "logo",
    "brands",
  );

  const reset = () => {
    form.resetFields();
    resetImage();
    setIsOpen(false);
  };

  const handleSubmit = async (values) => {
    const res = await create(values, form);

    if (res) {
      reset();
      await loadBrand();
    }
  };

  return (
    <>
      <BaseCreateButton
        onClick={() => setIsOpen(true)}
        text="Tạo thương hiệu"
      />

      <BaseModal
        open={isOpen}
        onOk={() => form.submit()}
        onCancel={reset}
        title="Tạo thương hiệu"
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Tên thương hiệu"
            name="name"
            rules={[{ required: true, message: "Tên không được để trống" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Avatar"
            name="avatar"
            valuePropName="value"
            rules={[{ required: true, message: "Vui lòng chọn avatar" }]}
          >
            <UploadImage
              preview={preview}
              onChange={handleChangeFile}
              label="Upload avatar"
            />
          </Form.Item>
        </Form>
      </BaseModal>
    </>
  );
}
