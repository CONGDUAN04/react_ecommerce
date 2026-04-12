import { Modal, Descriptions, Divider, Card, Row, Col, Empty } from "antd";
import dayjs from "dayjs";

const ProductGroupDetail = ({ dataDetail, setDataDetail, openDetail, setOpenDetail }) => {
    const handleClose = () => {
        setDataDetail(null);
        setOpenDetail(false);
    };

    return (
        <Modal
            title={<div style={{ textAlign: "center", fontWeight: 600 }}>Chi tiết nhóm sản phẩm</div>}
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
                    <Descriptions column={1} bordered size="small" labelStyle={{ fontWeight: 600, width: 140 }}>
                        <Descriptions.Item label="ID">{dataDetail.id}</Descriptions.Item>
                        <Descriptions.Item label="Tên nhóm">{dataDetail.name}</Descriptions.Item>
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
                        <Descriptions.Item label="Số sản phẩm">
                            {dataDetail.products?.length || 0}
                        </Descriptions.Item>
                    </Descriptions>

                    <Divider>Sản phẩm ({dataDetail.products?.length || 0})</Divider>

                    {dataDetail.products?.length > 0 ? (
                        <Row gutter={[16, 16]}>
                            {dataDetail.products.map((p) => (
                                console.log(p),
                                <Col key={p.id} xs={24} sm={12} md={8}>
                                    <Card size="small" hoverable style={{ textAlign: "center" }}>
                                        <div style={{ fontWeight: 600 }}>ID: {p.id}</div>
                                        <div style={{ fontWeight: 600 }}>{p.name}</div>
                                        <div style={{ fontSize: 12, color: "#888", marginTop: 4 }}>
                                            Tồn: {p.quantity ?? 0} · {p.isActive ? "Đang bán" : "Ngừng bán"}
                                        </div>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    ) : (
                        <Empty description="Không có sản phẩm trong nhóm" />
                    )}

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
                </>
            )}
        </Modal>
    );
};

export default ProductGroupDetail;
