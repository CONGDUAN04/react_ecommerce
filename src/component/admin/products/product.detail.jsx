import {
    Modal,
    Descriptions,
    Divider,
    Card,
    Row,
    Col,
    Empty,
    Typography,
} from "antd";
import dayjs from "dayjs";

const ProductDetail = ({
    dataDetail,
    setDataDetail,
    openDetail,
    setOpenDetail,
}) => {
    const handleClose = () => {
        setDataDetail(null);
        setOpenDetail(false);
    };
    return (
        <Modal
            title={
                <div style={{ textAlign: "center", fontWeight: 600 }}>
                    Chi tiết sản phẩm
                </div>
            }
            open={openDetail}
            onCancel={handleClose}
            footer={null}
            width={720}
            centered
            styles={{
                body: { paddingBottom: 56 }, // chừa chỗ cho info hệ thống
            }}
        >
            {!dataDetail ? (
                <Empty />
            ) : (
                <>
                    {/* ===== Thông tin sản phẩm ===== */}
                    <Descriptions
                        column={1}
                        bordered
                        size="small"
                        labelStyle={{ fontWeight: 600, width: 140 }}
                    >
                        <Descriptions.Item label="ID">
                            {dataDetail.id}
                        </Descriptions.Item>

                        <Descriptions.Item label="Tên sản phẩm">
                            {dataDetail.name}
                        </Descriptions.Item>
                        <Descriptions.Item label="Slug">
                            <span style={{ color: "#555", fontFamily: "monospace" }}>
                                {dataDetail.slug || "N/A"}
                            </span>
                        </Descriptions.Item>

                        <Descriptions.Item label="Thương hiệu">
                            {dataDetail.brand?.name || "N/A"}
                        </Descriptions.Item>

                        <Descriptions.Item label="Danh mục">
                            {dataDetail.category?.name || "N/A"}
                        </Descriptions.Item>

                        <Descriptions.Item label="Tồn kho">
                            {dataDetail.quantity}
                        </Descriptions.Item>

                        <Descriptions.Item label="Đã bán">
                            {dataDetail.sold || 0}
                        </Descriptions.Item>

                        <Descriptions.Item label="Mô tả">
                            {dataDetail.description || "N/A"}
                        </Descriptions.Item>
                    </Descriptions>

                    {/* ===== Ảnh đại diện (không có biến thể) ===== */}
                    {!dataDetail.colors?.length && (
                        <>
                            <Divider>Hình ảnh</Divider>
                            <div style={{ textAlign: "center" }}>
                                <img
                                    src={
                                        dataDetail.thumbnail
                                            ? `${import.meta.env.VITE_BACKEND_URL}/images/product/${dataDetail.thumbnail}`
                                            : "https://via.placeholder.com/300?text=No+Image"
                                    }
                                    alt={dataDetail.name}
                                    style={{
                                        maxHeight: 220,
                                        maxWidth: "100%",
                                        objectFit: "contain",
                                    }}
                                />
                            </div>
                        </>
                    )}

                    {/* ===== Biến thể màu ===== */}
                    <Divider>
                        Biến thể ({dataDetail.colors?.length || 0})
                    </Divider>

                    {dataDetail.colors?.length > 0 ? (
                        dataDetail.colors.map((color) => (
                            <Card
                                key={color.id}
                                size="small"
                                title={`Màu: ${color.color}`}
                                style={{ marginBottom: 16 }}
                            >
                                {/* Ảnh màu */}
                                <div
                                    style={{
                                        textAlign: "center",
                                        marginBottom: 12,
                                    }}
                                >
                                    <img
                                        src={
                                            color.image
                                                ? `${import.meta.env.VITE_BACKEND_URL}/images/color/${color.image}`
                                                : "https://via.placeholder.com/150?text=No+Image"
                                        }
                                        alt={color.color}
                                        style={{
                                            maxHeight: 120,
                                            maxWidth: "100%",
                                            objectFit: "contain",
                                        }}
                                    />
                                </div>

                                {/* ===== Dung lượng ===== */}
                                {color.storages?.length > 0 ? (
                                    <Row gutter={[16, 16]}>
                                        {color.storages.map((s) => (
                                            <Col
                                                key={s.id}
                                                xs={24}
                                                sm={12}
                                                md={8}
                                            >
                                                <Card
                                                    size="small"
                                                    hoverable
                                                    style={{
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            fontWeight: 600,
                                                        }}
                                                    >
                                                        {s.name}
                                                    </div>

                                                    <div
                                                        style={{
                                                            color: "#d4380d",
                                                            fontWeight: 600,
                                                            margin: "4px 0",
                                                        }}
                                                    >
                                                        {s.price?.toLocaleString(
                                                            "vi-VN"
                                                        )}
                                                        ₫
                                                    </div>

                                                    <div
                                                        style={{
                                                            fontSize: 12,
                                                            color: "#888",
                                                        }}
                                                    >
                                                        Tồn: {s.quantity} · Bán:{" "}
                                                        {s.sold || 0}
                                                    </div>
                                                </Card>
                                            </Col>
                                        ))}
                                    </Row>
                                ) : (
                                    <Empty description="Không có dung lượng" />
                                )}
                            </Card>
                        ))
                    ) : (
                        <Empty description="Không có biến thể màu" />
                    )}

                    {/* ===== Thông tin hệ thống (góc phải) ===== */}
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
                        <div>
                            Tạo:{" "}
                            {dayjs(dataDetail.createdAt).format(
                                "DD/MM/YYYY HH:mm"
                            )}
                        </div>
                        <div>
                            Cập nhật:{" "}
                            {dayjs(dataDetail.updatedAt).format(
                                "DD/MM/YYYY HH:mm"
                            )}
                        </div>
                    </div>
                </>
            )}
        </Modal>
    );
};

export default ProductDetail;
