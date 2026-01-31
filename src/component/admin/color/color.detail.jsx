import { Modal, Descriptions, Divider, Empty, Tag } from "antd";
import dayjs from "dayjs";

const ColorDetail = ({ dataDetail, setDataDetail, openDetail, setOpenDetail }) => {
    const handleClose = () => {
        setDataDetail(null);
        setOpenDetail(false);
    };

    const renderStatus = () => {
        if (dataDetail.quantity === 0) return <Tag color="red">Hết hàng</Tag>;
        if (dataDetail.quantity < 5) return <Tag color="orange">Sắp hết</Tag>;
        return <Tag color="green">Còn hàng</Tag>;
    };

    return (
        <Modal
            title={<div style={{ textAlign: "center", fontWeight: 600 }}>Chi tiết màu sắc</div>}
            open={openDetail}
            onCancel={handleClose}
            footer={null}
            width={720}
            centered
            styles={{ body: { paddingBottom: 56 } }}
        >
            {!dataDetail ? (
                <Empty />
            ) : (
                <>
                    {/* ===== BASIC INFO ===== */}

                    <Descriptions
                        column={1}
                        bordered
                        size="small"
                        labelStyle={{ fontWeight: 600, width: 140 }}
                    >
                        <Descriptions.Item label="ID">
                            {dataDetail.id}
                        </Descriptions.Item>

                        <Descriptions.Item label="Màu sắc">
                            {dataDetail.color}
                        </Descriptions.Item>

                        <Descriptions.Item label="Sản phẩm">
                            {`${dataDetail.product?.productGroup?.name || ""} ${dataDetail.product?.name || ""}`}
                        </Descriptions.Item>

                        <Descriptions.Item label="Trạng thái">
                            {renderStatus()}
                        </Descriptions.Item>
                    </Descriptions>

                    {/* ===== IMAGE ===== */}

                    {dataDetail.image && (
                        <>
                            <Divider>Hình ảnh</Divider>

                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <img
                                    src={`${import.meta.env.VITE_BACKEND_URL}/images/color/${dataDetail.image}`}
                                    alt={dataDetail.color}
                                    style={{
                                        maxHeight: 180,
                                        maxWidth: "100%",
                                        objectFit: "contain"
                                    }}
                                />
                            </div>
                        </>
                    )}

                    {/* ===== SELL INFO ===== */}

                    <Divider>Thông tin bán</Divider>

                    <Descriptions column={1} bordered size="small">
                        <Descriptions.Item label="Giá">
                            {dataDetail.price?.toLocaleString("vi-VN")}₫
                        </Descriptions.Item>

                        <Descriptions.Item label="Tồn kho">
                            {dataDetail.quantity}
                        </Descriptions.Item>

                        <Descriptions.Item label="Đã bán">
                            {dataDetail.sold || 0}
                        </Descriptions.Item>
                    </Descriptions>

                    {/* ===== TIME ===== */}

                    <div
                        style={{
                            position: "absolute",
                            right: 24,
                            bottom: 16,
                            fontSize: 13,
                            color: "#999",
                            textAlign: "right"
                        }}
                    >
                        <div>
                            Tạo: {dayjs(dataDetail.createdAt).format("DD/MM/YYYY HH:mm")}
                        </div>

                        <div>
                            Cập nhật: {dayjs(dataDetail.updatedAt).format("DD/MM/YYYY HH:mm")}
                        </div>
                    </div>
                </>
            )}
        </Modal>
    );
};

export default ColorDetail;
