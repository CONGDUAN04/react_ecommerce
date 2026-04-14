import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const BaseCreateButton = ({
  onClick,
  text = "Tạo mới",
  style = {},
  wrapperStyle = {},
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        marginBottom: 16,
        ...wrapperStyle,
      }}
    >
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={onClick}
        size="large"
        style={{
          height: 42,
          padding: "0 24px",
          borderRadius: 8,
          fontSize: 15,
          fontWeight: 500,
          boxShadow: "0 2px 4px rgba(24, 144, 255, 0.2)",
          ...style,
        }}
      >
        {text}
      </Button>
    </div>
  );
};

export default BaseCreateButton;
