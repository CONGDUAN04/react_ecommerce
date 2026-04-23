import { useState, useEffect } from "react";
import { Form, Input, Select } from "antd";
import BaseModal from "../../../../components/common/BaseModal.jsx";
import BaseCreateButton from "../../../../components/common/BaseCreateButton.jsx";
import { useUser } from "../hooks/useUser.js";
import { useRole } from "../../role/hooks/useRole.js";
import { useImageUpload } from "../../../../hooks/useImageUpload.js";
import UploadImage from "../../../../components/common/ImageUpload.jsx";

export default function CreateUserForm({ loadUser }) {
  const [isOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm();
  const [roles, setRoles] = useState([]);

  const { create } = useUser();
  const { getAll: getAllRoles } = useRole();

  const { preview, handleChangeFile, resetImage, uploading, logoValidator } =
    useImageUpload(form, {
      type: "user",
      fieldName: "avatar",
      fieldId: "avatarId",
    });

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
    const res = await create(values, form);
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
    </>
  );
}
