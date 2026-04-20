import { UploadOutlined } from "@ant-design/icons";
import { useRef } from "react";
import { Spin } from "antd";

export default function UploadImage({
  preview,
  onChange,
  uploading,
  label = "Upload ảnh",
  disabled = false,
}) {
  const inputRef = useRef(null);

  const handleChange = (e) => {
    onChange(e);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
      }}
    >
      <label
        style={{
          padding: "10px 18px",
          background: disabled ? "#ccc" : "#1677ff",
          color: "#fff",
          borderRadius: 8,
          cursor: disabled ? "not-allowed" : "pointer",
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontSize: 14,
          opacity: disabled ? 0.6 : 1,
        }}
      >
        <UploadOutlined />
        {label}
        <input
          ref={inputRef}
          type="file"
          hidden
          accept="image/*"
          onChange={handleChange}
          disabled={disabled}
        />
      </label>

      {preview && (
        <div
          style={{
            position: "relative",
            width: 180,
            height: 180,
            borderRadius: 12,
            overflow: "hidden",
            background: "#f5f5f5",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={preview}
            alt="preview"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

          {uploading && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(255,255,255,0.6)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 6,
              }}
            >
              <Spin size="small" />
              <span style={{ fontSize: 12 }}>Đang tải...</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
