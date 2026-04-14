import { Button, Tooltip, Popconfirm } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const BaseActionButtons = ({
  record,
  onView,
  onEdit,
  onDelete,
  deleteTitle = "Xóa",
  deleteDescription = "Bạn có chắc chắn muốn xóa?",
}) => {
  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Tooltip title="Xem chi tiết">
        <Button
          icon={<EyeOutlined />}
          style={{
            backgroundColor: "#e6f4ff",
            color: "#1677ff",
            border: "1px solid #91caff",
            borderRadius: 8,
          }}
          onClick={() => onView(record)}
        />
      </Tooltip>

      <Tooltip title="Chỉnh sửa">
        <Button
          icon={<EditOutlined />}
          style={{
            backgroundColor: "#fff7e6",
            color: "#fa8c16",
            border: "1px solid #ffd591",
            borderRadius: 8,
          }}
          onClick={() => onEdit(record)}
        />
      </Tooltip>

      <Popconfirm
        title={deleteTitle}
        description={deleteDescription}
        okText="Xóa"
        cancelText="Hủy"
        okButtonProps={{ danger: true }}
        onConfirm={() => onDelete(record)}
      >
        <Tooltip title="Xóa">
          <Button
            icon={<DeleteOutlined />}
            danger
            style={{
              backgroundColor: "#fff1f0",
              color: "#ff4d4f",
              border: "1px solid #ffccc7",
              borderRadius: 8,
            }}
          />
        </Tooltip>
      </Popconfirm>
    </div>
  );
};

export default BaseActionButtons;
