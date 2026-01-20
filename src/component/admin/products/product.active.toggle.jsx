import { Tag, Switch, Popconfirm } from "antd";
import { updateProductAPI } from "../../../services/api.services.js";
import { useContext, useState } from "react";
import { NotifyContext } from "../../context/notify.context.jsx";

const ProductActiveToggle = ({ record, loadProducts }) => {
    const { api } = useContext(NotifyContext);
    const [loading, setLoading] = useState(false);

    const handleToggleActive = async () => {
        try {
            setLoading(true);
            await updateProductAPI(record.id, {
                isActive: !record.isActive,
            });

            api.success({
                message: "Thành công",
                description: record.isActive
                    ? "Sản phẩm đã được ngừng bán"
                    : "Sản phẩm đã được bật bán",
            });

            loadProducts();
        } catch (error) {
            api.error({
                message: "Thất bại",
                description: error?.message || "Không thể cập nhật trạng thái",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
                alignItems: "center",
            }}
        >
            {record.isActive ? (
                <Tag color="green" style={{ fontWeight: 600 }}>
                    Đang bán
                </Tag>
            ) : (
                <Tag color="red" style={{ fontWeight: 600 }}>
                    Ngừng bán
                </Tag>
            )}

            <Popconfirm
                title={
                    record.isActive
                        ? "Ngừng bán sản phẩm này?"
                        : "Bật bán lại sản phẩm này?"
                }
                okText="Xác nhận"
                cancelText="Hủy"
                onConfirm={handleToggleActive}
            >
                <Switch
                    size="small"
                    checked={record.isActive}
                    loading={loading}
                />
            </Popconfirm>
        </div>
    );
};

export default ProductActiveToggle;
