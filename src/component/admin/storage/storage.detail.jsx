import { Modal, Descriptions, Divider, Card, Row, Col, Empty, Typography } from "antd";
import dayjs from "dayjs";

const StorageDetail = ({ dataDetail, setDataDetail, openDetail, setOpenDetail }) => {
    const handleClose = () => {
        setDataDetail(null);
        setOpenDetail(false);
    };

    if (!dataDetail) return null;

    const color = dataDetail.color;

    return (
        <Modal
            title={<div style={{ textAlign: "center", fontWeight: 600 }}>Chi tiết dung lượng</div>}
            open={openDetail}
            onCancel={handleClose}
            footer={null}
            width={720}
            centered
            styles={{ body: { paddingBottom: 56 } }}
        >
            {/* ===== Thông tin storage ===== */}
            <Descriptions
                column={1}
                bordered
                size="small"
                labelStyle={{ fontWeight: 600, width: 140 }}
            >
                <Descriptions.Item label="ID">{dataDetail.id}</Descriptions.Item>

                <Descriptions.Item label="SKU">
                    <span
                        style={{
                            fontFamily: "monospace",
                            fontWeight: 500,
                            color: "#262626",
                        }}
                    >
                        {dataDetail.sku || "N/A"}
                    </span>
                </Descriptions.Item>


                <Descriptions.Item label="Tên dung lượng">
                    {dataDetail.name}
                </Descriptions.Item>

                <Descriptions.Item label="Giá">
                    {dataDetail.price?.toLocaleString("vi-VN")}₫
                </Descriptions.Item>
                <Descriptions.Item label="Tồn kho">{dataDetail.quantity}</Descriptions.Item>
                <Descriptions.Item label="Đã bán">{dataDetail.sold || 0}</Descriptions.Item>
            </Descriptions>


            {/* ===== Thông tin màu ===== */}
            {color && (
                <>
                    <Divider>Màu</Divider>
                    <Descriptions column={1} bordered size="small" labelStyle={{ fontWeight: 600 }}>
                        <Descriptions.Item label="Tên màu">{color.color}</Descriptions.Item>
                        <Descriptions.Item label="Hình ảnh">
                            {color.image ? (
                                <img
                                    src={`${import.meta.env.VITE_BACKEND_URL}/images/color/${color.image}`}
                                    alt={color.color}
                                    style={{ maxHeight: 120, maxWidth: "100%", objectFit: "contain" }}
                                />
                            ) : (
                                "Không có hình"
                            )}
                        </Descriptions.Item>
                        <Descriptions.Item label="Sản phẩm">{color.productId || "N/A"}</Descriptions.Item>
                    </Descriptions>
                </>
            )}

            {/* ===== Thông tin hệ thống ===== */}
            {dataDetail.createdAt && dataDetail.updatedAt && (
                <div
                    style={{
                        position: "absolute",
                        right: 24,
                        bottom: 16,
                        fontSize: 14,
                        color: "#999",
                        textAlign: "right",
                    }}
                >
                    <div>Tạo: {dayjs(dataDetail.createdAt).format("DD/MM/YYYY HH:mm")}</div>
                    <div>Cập nhật: {dayjs(dataDetail.updatedAt).format("DD/MM/YYYY HH:mm")}</div>
                </div>
            )}
        </Modal>
    );
};

export default StorageDetail;
