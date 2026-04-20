import { useState } from "react";
import { Form, Input } from "antd";
import BaseModal from "../../../../components/common/BaseModal.jsx";
import BaseCreateButton from "../../../../components/common/BaseCreateButton.jsx";
import { useBrand } from "../hooks/useBrand.js";
import UploadImage from "../../../../components/common/ImageUpload.jsx";
import { useImageUpload } from "../../../../hooks/useImageUpload.js";

export default function CreateBrandForm({ loadBrand }) {
  const [isOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm();

  const { create } = useBrand();
  const { preview, handleChangeFile, resetImage, uploading } = useImageUpload(
    form,
    {
      type: "brand",
      fieldName: "logo",
      fieldId: "logoId",
    },
  );

  const reset = () => {
    form.resetFields();
    resetImage();
    setIsOpen(false);
  };

  const handleSubmit = async (values) => {
    const payload = {
      name: values.name,
      logo: values.logo,
      logoId: values.logoId,
    };

    const res = await create(payload, form);
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
        onOk={() => {
          form.submit();
        }}
        onCancel={reset}
        okText="Tạo mới"
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

          <Form.Item label="Logo">
            <UploadImage
              preview={preview}
              uploading={uploading}
              onChange={handleChangeFile}
              label="Upload logo"
            />
          </Form.Item>

          <Form.Item
            name="logo"
            rules={[{ required: true, message: "Vui lòng chọn logo" }]}
            hidden
          >
            <Input />
          </Form.Item>

          <Form.Item name="logoId" hidden>
            <Input />
          </Form.Item>
        </Form>
      </BaseModal>
    </>
  );
}
