import { Modal } from "antd";

const BaseModal = ({
  open,
  onCancel,
  onOk,
  title,
  children,
  okText = "Lưu",
  cancelText = "Hủy",
  width = 600,
  footer = undefined,
}) => {
  return (
    <Modal
      title={
        typeof title === "string" ? (
          <div style={{ textAlign: "center", fontWeight: 600 }}>{title}</div>
        ) : (
          title
        )
      }
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      okText={okText}
      cancelText={cancelText}
      centered
      maskClosable={false}
      width={width}
      footer={footer}
    >
      {children}
    </Modal>
  );
};

export default BaseModal;
