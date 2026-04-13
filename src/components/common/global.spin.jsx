// src/components/common/GlobalSpin.jsx
import { useLoading } from "../../hooks/useLoading";
import { Spin } from "antd";

const GlobalSpin = ({ children }) => {
  const { loading } = useLoading();

  return (
    <>
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(255,255,255,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <Spin size="large" tip="Đang tải..." />
        </div>
      )}
      {children}
    </>
  );
};

export default GlobalSpin;
