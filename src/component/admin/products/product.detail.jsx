import { Modal, Descriptions, Divider, Empty, Row, Col, Card, Tag } from "antd";
import dayjs from "dayjs";

const ProductDetail = ({ dataDetail, setDataDetail, openDetail, setOpenDetail }) => {
    const handleClose = () => {
        setDataDetail(null);
        setOpenDetail(false);
    };

    return (
        <Modal
            title={<div style={{ textAlign: "center", fontWeight: 600 }}>Chi tiết sản phẩm</div>}
            open={openDetail}
            onCancel={handleClose}
            footer={null}
            width={760}
            centered
        >
            {!dataDetail ? (
                <Empty />
            ) : (
                <>
                    <Descriptions column={1} bordered size="small" labelStyle={{ fontWeight: 600, width: 150 }}>
                        <Descriptions.Item label="ID">{dataDetail.id}</Descriptions.Item>
                        <Descriptions.Item label="Tên sản phẩm">{dataDetail.name}</Descriptions.Item>
                        <Descriptions.Item label="Slug">{dataDetail.slug}</Descriptions.Item>
                        <Descriptions.Item label="Nhóm sản phẩm">{dataDetail.productGroup?.name}</Descriptions.Item>
                        <Descriptions.Item label="Thương hiệu">{dataDetail.productGroup?.brand?.name}</Descriptions.Item>
                        <Descriptions.Item label="Danh mục">{dataDetail.productGroup?.category?.name}</Descriptions.Item>
                        <Descriptions.Item label="Tổng tồn kho">{dataDetail.quantity}</Descriptions.Item>
                        <Descriptions.Item label="Mô tả">{dataDetail.description || "N/A"}</Descriptions.Item>
                    </Descriptions>

                    <Divider>Màu sắc ({dataDetail.colors?.length || 0})</Divider>

                    {dataDetail.colors?.length > 0 ? (
                        <Row gutter={[16, 16]} justify="center">
                            {dataDetail.colors.map((c) => (
                                <Col key={c.id} xs={12} sm={8} md={6}>
                                    <Card
                                        size="small"
                                        hoverable
                                        style={{
                                            textAlign: "center",
                                            height: "100%",
                                            borderRadius: 12
                                        }}
                                    >
                                        <img
                                            src={`${import.meta.env.VITE_BACKEND_URL}/images/color/${c.image}`}
                                            alt={c.color}
                                            style={{
                                                width: "100%",
                                                height: 140,
                                                objectFit: "contain",
                                                marginBottom: 8
                                            }}
                                        />

                                        <div style={{ fontWeight: 600 }}>{c.color}</div>

                                        <div style={{ color: "#d4380d", fontSize: 13 }}>
                                            {c.price?.toLocaleString("vi-VN")}đ
                                        </div>

                                        <div style={{ fontSize: 12, color: "#888", marginTop: 4 }}>
                                            Tồn: {c.quantity} · Bán: {c.sold || 0}
                                        </div>

                                        {/* STATUS */}

                                        <div style={{ marginTop: 6 }}>
                                            {c.quantity === 0 && <Tag color="red">Hết hàng</Tag>}
                                            {c.quantity > 0 && c.quantity < 5 && <Tag color="orange">Sắp hết</Tag>}
                                            {c.quantity >= 5 && <Tag color="green">Còn hàng</Tag>}
                                        </div>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    ) : (
                        <Empty description="Chưa có màu nào" />
                    )}


                    <div
                        style={{
                            marginTop: 16,
                            fontSize: 13,
                            color: "#999",
                            textAlign: "right"
                        }}
                    >
                        <div>Tạo: {dayjs(dataDetail.createdAt).format("DD/MM/YYYY HH:mm")}</div>
                        <div>Cập nhật: {dayjs(dataDetail.updatedAt).format("DD/MM/YYYY HH:mm")}</div>
                    </div>
                </>
            )}
        </Modal>
    );
};

export default ProductDetail;
