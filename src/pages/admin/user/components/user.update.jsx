import { useEffect, useState } from "react";
import { Form, Input, Select } from "antd";
import BaseModal from "../../../../components/common/BaseModal.jsx";
import { useUser } from "../hooks/useUser.js";
import { useRole } from "../../role/hooks/useRole.js";
import { useImageUpload } from "../../../../hooks/useImageUpload.js";
import UploadImage from "../../../../components/common/ImageUpload.jsx";

export default function UpdateUserForm({
  openUpdate,
  setOpenUpdate,
  dataUpdate,
  setDataUpdate,
  loadUser,
}) {
  const [form] = Form.useForm();
  const [roles, setRoles] = useState([]);

  const { update } = useUser();
  const { getAll: getAllRoles } = useRole();

  const {
    preview,
    handleChangeFile,
    resetImage,
    setPreviewFromUrl,
    uploading,
    logoValidator,
  } = useImageUpload(form, {
    type: "user",
    fieldName: "avatar",
    fieldId: "avatarId",
  });

  // load roles
  useEffect(() => {
    if (!openUpdate) return;

    const loadRoles = async () => {
      const res = await getAllRoles();
      setRoles(res?.data || []);
    };

    loadRoles();
  }, [openUpdate]);

  // fill data
  useEffect(() => {
    if (!dataUpdate?.id) return;

    form.setFieldsValue({
      username: dataUpdate.username,
      fullName: dataUpdate.fullName,
      phone: dataUpdate.phone,
      roleId: dataUpdate.role?.id,
      avatar: dataUpdate.avatar,
      avatarId: dataUpdate.avatarId,
    });

    if (dataUpdate.avatar && !preview) {
      setPreviewFromUrl(dataUpdate.avatar);
    }
  }, [dataUpdate]);

  const reset = () => {
    form.resetFields();
    resetImage();
    setDataUpdate(null);
    setOpenUpdate(false);
    setRoles([]);
  };

  const handleSubmit = async (values) => {
    const payload = { ...values };
    console.log("Payload gửi lên:", payload); // ← Debug ở đây
    console.log("Avatar:", payload.avatar);
    console.log("AvatarId:", payload.avatarId);
    if (Number(payload.roleId) === Number(dataUpdate.role?.id)) {
      delete payload.roleId;
    }

    const res = await update(dataUpdate.id, payload, form);
    console.log("========== RESPONSE API ==========");
    console.log("Full response:", res);
    console.log("Data trong response:", res?.data);
    console.log("Avatar trong response:", res?.data?.avatar);
    console.log("AvatarId trong response:", res?.data?.avatarId);

    if (res) {
      reset();
      await loadUser();
    }
  };

  return (
    <BaseModal
      open={openUpdate}
      onOk={() => form.submit()}
      onCancel={reset}
      title="Cập nhật người dùng"
      okText="Cập nhật"
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Email" name="username">
          <Input disabled />
        </Form.Item>

        <Form.Item
          label="Họ và tên"
          name="fullName"
          rules={[{ required: true, message: "Không được để trống" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          name="phone"
          rules={[{ required: true, message: "Không được để trống" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Phân quyền"
          name="roleId"
          rules={[{ required: true, message: "Không được để trống" }]}
        >
          <Select
            options={roles.map((r) => ({
              label: r.name,
              value: r.id,
            }))}
          />
        </Form.Item>

        <Form.Item
          label="Avatar"
          name="avatar"
          rules={[{ validator: logoValidator }]}
        >
          <UploadImage
            preview={preview}
            uploading={uploading}
            onChange={handleChangeFile}
          />
        </Form.Item>

        <Form.Item name="avatarId" hidden>
          <Input />
        </Form.Item>
      </Form>
    </BaseModal>
  );
}
