import { Image } from "antd";

export default function ImagePreviewItem({
  src,
  size,
  variant = "logo", // logo | icon
}) {
  if (!src) return "N/A";

  const finalSize = size || (variant === "icon" ? 60 : 160);

  return (
    <div
      style={{ display: "flex", justifyContent: "center", padding: "12px 0" }}
    >
      <div
        style={{
          width: finalSize,
          height: finalSize,
          border: "1px dashed #d9d9d9",
          borderRadius: variant === "icon" ? 8 : 12,
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
