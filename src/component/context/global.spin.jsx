import { useContext } from "react";
import { Spin } from "antd";
import { LoadingContext } from "../context/loading.context.jsx";

const GlobalSpin = ({ children }) => {
    const { loading } = useContext(LoadingContext);

    return (
        <Spin spinning={loading} size="large" tip="Đang tải..." style={{ minHeight: '100vh' }}>
            {children}
        </Spin>
    );
};

export default GlobalSpin;
