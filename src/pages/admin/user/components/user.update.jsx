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

  const { preview, handleChangeFile, resetImage, setPreviewFromUrl } =
    useImageUpload(form, "avatar", "avatars");

  // ✅ load roles khi mở modal
  useEffect(() => {
    if (!openUpdate) return;

    const loadRoles = async () => {
      const res = await getAllRoles();
      setRoles(res?.data || []);
    };

    loadRoles();
  }, [openUpdate]);

  // ✅ fill data (FIX dependency)
  useEffect(() => {
    if (!dataUpdate?.id) return;

    form.setFieldsValue({
      username: dataUpdate.username,
      fullName: dataUpdate.fullName,
      phone: dataUpdate.phone,
      roleId: dataUpdate.role?.id,
      avatar: dataUpdate.avatar,
    });

    if (dataUpdate.avatar) {
      setPreviewFromUrl(dataUpdate.avatar);
    }
  }, [dataUpdate]); // ✅ fix giống Brand

  // ✅ reset sạch
  const reset = () => {
    form.resetFields();
    resetImage();
    setDataUpdate(null);
    setOpenUpdate(false);
    setRoles([]);
  };

  // ✅ submit (KHÔNG thêm ?t=)
  const handleSubmit = async (values) => {
    const payload = {
      fullName: values.fullName,
      phone: values.phone,
      roleId: values.roleId,
      avatar: values.avatar, // ✅ giữ sạch
    };

    await update(dataUpdate.id, payload, form);
    await loadUser();
    reset();
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
  );
}
