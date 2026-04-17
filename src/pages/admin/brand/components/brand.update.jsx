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

  const { preview, handleChangeFile, setPreviewFromUrl, resetImage } =
    useImageUpload(form, "logo", "brands");

  useEffect(() => {
    if (!dataUpdate?.id) return;

    form.setFieldsValue({
      id: dataUpdate.id,
      name: dataUpdate.name,
      logo: dataUpdate.logo,
    });

    if (dataUpdate.logo) {
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
    const payload = {
      name: values.name,
      logo: values.logo,
    };

    await update(dataUpdate.id, payload, form);
    await loadBrand();
    reset();
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
          rules={[{ required: true, message: "Vui lòng chọn logo" }]}
        >
          <UploadImage
            preview={preview}
            onChange={handleChangeFile}
            label="Upload logo"
          />
        </Form.Item>
      </Form>
    </BaseModal>
  );
}
