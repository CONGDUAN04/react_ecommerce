import { useState } from "react";
import { Form, Input, Select } from "antd";
import BaseModal from "../../../../components/common/BaseModal.jsx";
import BaseCreateButton from "../../../../components/common/BaseCreateButton.jsx";
import { useUser } from "../hooks/useUser.js";
import { useRole } from "../../role/hooks/useRole.js";
import { useImageUpload } from "../../../../hooks/useImageUpload.js";
import UploadImage from "../../../../components/common/ImageUpload.jsx";
import { useEffect } from "react";

export default function CreateUserForm({ loadUser }) {
  const [isOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm();
  const [roles, setRoles] = useState([]);

  const { create } = useUser();
  const { getAll: getAllRoles } = useRole();
  const { preview, handleChangeFile, resetImage } = useImageUpload(
    form,
    "avatar",
    "avatars",
  );

  useEffect(() => {
    if (!isOpen) return;
    const loadRoles = async () => {
      const res = await getAllRoles();
      setRoles(res?.data || []);
    };
    loadRoles();
  }, [isOpen]);

  const reset = () => {
    form.resetFields();
    resetImage();
    setIsOpen(false);
    setRoles([]);
  };

  const handleSubmit = async (values) => {
    const payload = {
      username: values.username,
      fullName: values.fullName,
      phone: values.phone,
      roleId: values.roleId,
      avatar: values.avatar,
    };

    const res = await create(payload, form);

    if (res) {
      reset();
      await loadUser();
    }
  };

  return (
    <>
      <BaseCreateButton onClick={() => setIsOpen(true)} text="Tạo người dùng" />

      <BaseModal
        open={isOpen}
        onOk={() => form.submit()}
        onCancel={reset}
        title="Tạo người dùng"
        okText="Tạo mới"
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Email"
            name="username"
            rules={[{ required: true, message: "Vui lòng nhập email" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Họ tên"
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
            rules={[{ required: true, message: "Vui lòng chọn role" }]}
          >
            <Select
              options={roles.map((r) => ({
                label: r.name,
                value: r.id,
              }))}
            />
          </Form.Item>

          {/* ✅ giống Brand */}
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
    </>
  );
}
