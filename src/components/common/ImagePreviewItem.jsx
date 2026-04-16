import { Image } from "antd";

export default function ImagePreviewItem({
  src,
  size = 160, // default đẹp hơn
}) {
  if (!src) return "N/A";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "16px 0",
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          border: "1px dashed #d9d9d9",
          borderRadius: 12,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#fafafa",
          overflow: "hidden",
        }}
      >
        <Image
          src={src}
          preview={{ mask: "Xem ảnh" }}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
          }}
        />
      </div>
    </div>
  );
}
