import { useEffect } from "react";
import { Form, Input } from "antd";
import BaseModal from "../../../../components/common/BaseModal.jsx";
import { useBrand } from "../hooks/useBrand.js";
import { useImageUpload } from "../../../../hooks/useImageUpload.js";
import UploadImage from "../../../../components/common/ImageUpload.jsx";

export default function UpdateBrandForm({
  openUpdate,
  setOpenUpdate,
  dataUpdate,
  setDataUpdate,
  loadBrand,
}) {
  const [form] = Form.useForm();
  const { update } = useBrand();

  const {
    preview,
    handleChangeFile,
    setPreviewFromUrl,
    resetImage,
    uploading,
    logoValidator,
  } = useImageUpload(form, {
    type: "brand",
    fieldName: "logo",
    fieldId: "logoId",
  });

  useEffect(() => {
    if (!dataUpdate?.id) return;

    form.setFieldsValue({
      id: dataUpdate.id,
      name: dataUpdate.name,
      logo: dataUpdate.logo,
      logoId: dataUpdate.logoId,
    });

    if (dataUpdate.logo && !preview) {
      setPreviewFromUrl(dataUpdate.logo);
    }
  }, [dataUpdate]);

  const reset = () => {
    form.resetFields();
    resetImage();
    setDataUpdate(null);
    setOpenUpdate(false);
  };

  const handleSubmit = async (values) => {
    const res = await update(dataUpdate.id, values, form);
    if (res) {
      reset();
      await loadBrand();
    }
  };

  return (
    <BaseModal
      open={openUpdate}
      onOk={() => form.submit()}
      onCancel={reset}
      title="Cập nhật thương hiệu"
      okText="Cập nhật"
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="ID" name="id">
          <Input disabled />
        </Form.Item>

        <Form.Item
          label="Tên thương hiệu"
          name="name"
          rules={[{ required: true, message: "Không được để trống" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Logo"
          name="logo"
          rules={[{ validator: logoValidator }]}
        >
          <UploadImage
            preview={preview}
            uploading={uploading}
            onChange={handleChangeFile}
          />
        </Form.Item>

        <Form.Item name="logoId" hidden>
          <Input />
        </Form.Item>
      </Form>
    </BaseModal>
  );
}
