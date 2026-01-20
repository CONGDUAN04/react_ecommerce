import { Modal, Descriptions, Divider, Card, Row, Col, Empty } from "antd";
import dayjs from "dayjs";

const ColorDetail = ({ dataDetail, setDataDetail, openDetail, setOpenDetail }) => {
    const handleClose = () => {
        setDataDetail(null);
        setOpenDetail(false);
    };

    return (
        <Modal
            title={<div style={{ textAlign: "center", fontWeight: 600 }}>Chi tiết màu sắc</div>}
            open={openDetail}
            onCancel={handleClose}
            footer={null}
            width={720}
            centered
            styles={{ body: { paddingBottom: 56 } }} // chừa chỗ cho info hệ thống
        >
            {!dataDetail ? (
                <Empty />
            ) : (
                <>
                    <Descriptions
                        column={1}
                        bordered
                        size="small"
                        labelStyle={{ fontWeight: 600, width: 140 }}
                    >
                        <Descriptions.Item label="ID">{dataDetail.id}</Descriptions.Item>
                        <Descriptions.Item label="Màu sắc">{dataDetail.color}</Descriptions.Item>
                        <Descriptions.Item label="Sản phẩm">{dataDetail.product?.name || "N/A"}</Descriptions.Item>
                    </Descriptions>

                    {/* ===== Hình ảnh ===== */}
                    {dataDetail.image && (
                        <>
                            <Divider>Hình ảnh</Divider>
                            <div style={{ textAlign: "center" }}>
                                <img
                                    src={`${import.meta.env.VITE_BACKEND_URL}/images/color/${dataDetail.image}`}
                                    alt={dataDetail.color}
                                    style={{ maxHeight: 180, maxWidth: "100%", objectFit: "contain" }}
                                />
                            </div>
                        </>
                    )}

                    {/* ===== Dung lượng ===== */}
                    <Divider>Dung lượng ({dataDetail.storages?.length || 0})</Divider>

                    {dataDetail.storages?.length > 0 ? (
                        <Row gutter={[16, 16]}>
                            {dataDetail.storages.map((s) => (
                                <Col key={s.id} xs={24} sm={12} md={8}>
                                    <Card size="small" style={{ textAlign: "center" }}>
                                        <div style={{ fontWeight: 600 }}>{s.name}</div>
                                        <div style={{ color: "#d4380d", fontWeight: 600, margin: "4px 0" }}>
                                            {s.price?.toLocaleString("vi-VN")}₫
                                        </div>
                                        <div style={{ fontSize: 12, color: "#888" }}>
                                            Tồn: {s.quantity} · Bán: {s.sold || 0}
                                        </div>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    ) : (
                        <Empty description="Chưa có dung lượng nào" />
                    )}

                    {/* ===== Thông tin hệ thống (góc phải) ===== */}
                    {dataDetail.createdAt && dataDetail.updatedAt && (
                        <div style={{ position: "absolute", right: 24, bottom: 16, fontSize: 14, color: "#999", textAlign: "right" }}>
                            <div>Tạo: {dayjs(dataDetail.createdAt).format("DD/MM/YYYY HH:mm")}</div>
                            <div>Cập nhật: {dayjs(dataDetail.updatedAt).format("DD/MM/YYYY HH:mm")}</div>
                        </div>
                    )}
                </>
            )}
        </Modal>
    );
};

export default ColorDetail;
