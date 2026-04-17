import { UploadOutlined } from "@ant-design/icons";
import { useRef } from "react";

export default function UploadImage({
  preview,
  onChange,
  label = "Upload ảnh",
}) {
  const inputRef = useRef(null);

  const handleChange = (e) => {
    onChange(e);
    // ✅ Reset input sau khi chọn để có thể chọn lại
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <>
      <div style={{ textAlign: "center", marginBottom: 12 }}>
        <label
          style={{
            padding: "10px 20px",
            background: "#1677ff",
            color: "#fff",
            borderRadius: 6,
            cursor: "pointer",
            display: "inline-block",
          }}
        >
          <UploadOutlined /> {label}
          <input
            ref={inputRef}
            type="file"
            hidden
            accept="image/*"
            onChange={handleChange}
          />
        </label>
      </div>

      {preview && (
        <div
          style={{
            marginTop: 12,
            height: 200,
            border: "1px dashed #ccc",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={preview}
            alt="preview"
            style={{ maxHeight: "100%", maxWidth: "100%" }}
          />
        </div>
      )}
    </>
  );
}
