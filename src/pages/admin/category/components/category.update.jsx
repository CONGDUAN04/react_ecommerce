import { useEffect } from "react";
import { Form, Input } from "antd";
import BaseModal from "../../../../components/common/BaseModal.jsx";
import { useCategory } from "../hooks/useCategory.js";
import { useImageUpload } from "../../../../hooks/useImageUpload.js";
import UploadImage from "../../../../components/common/ImageUpload.jsx";

export default function UpdateCategoryForm({
  openUpdate,
  setOpenUpdate,
  dataUpdate,
  setDataUpdate,
  loadCategory,
}) {
  const [form] = Form.useForm();
  const { update } = useCategory();

  const {
    preview,
    handleChangeFile,
    setPreviewFromUrl,
    resetImage,
    uploading,
    logoValidator,
  } = useImageUpload(form, {
    type: "category",
    fieldName: "icon",
    fieldId: "iconId",
  });

  useEffect(() => {
    if (!dataUpdate?.id) return;

    form.setFieldsValue({
      id: dataUpdate.id,
      name: dataUpdate.name,
      icon: dataUpdate.icon,
      iconId: dataUpdate.iconId,
    });

    if (dataUpdate.icon && !preview) {
      setPreviewFromUrl(dataUpdate.icon);
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
      await loadCategory();
    }
  };

  return (
    <BaseModal
      open={openUpdate}
      onOk={() => form.submit()}
      onCancel={reset}
      title="Cập nhật danh mục"
      okText="Cập nhật"
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="ID" name="id">
          <Input disabled />
        </Form.Item>

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
  );
}
