import { Modal, Descriptions, Divider, Empty } from "antd";
import dayjs from "dayjs";

const CategoryDetail = ({ dataDetail, setDataDetail, openDetail, setOpenDetail }) => {
    const handleClose = () => {
        setDataDetail(null);
        setOpenDetail(false);
    };

    if (!dataDetail) return (
        <Modal
            title="Chi tiết danh mục"
            open={openDetail}
            onCancel={handleClose}
            footer={null}
            width={600}
            centered
            maskClosable={false}
        >
            <Empty />
        </Modal>
    );

    return (
        <Modal
            title={<div style={{ textAlign: "center", fontWeight: 600 }}>Chi tiết danh mục</div>}
            open={openDetail}
            onCancel={handleClose}
            footer={null}
            width={600}
            centered
            maskClosable={false}
            styles={{ body: { paddingBottom: 56 } }}
        >
            <Descriptions
                column={1}
                bordered
                size="small"
                labelStyle={{ fontWeight: 600, width: 140 }}
            >
                <Descriptions.Item label="ID">{dataDetail.id}</Descriptions.Item>
                <Descriptions.Item label="Tên danh mục">{dataDetail.name}</Descriptions.Item>
                <Descriptions.Item label="Mô tả">{dataDetail.description || "N/A"}</Descriptions.Item>
            </Descriptions>

            {dataDetail.image && (
                <>
                    <Divider>Hình ảnh</Divider>
                    <div style={{ textAlign: "center" }}>
                        <img
                            src={`${import.meta.env.VITE_BACKEND_URL}/images/category/${dataDetail.image}`}
                            alt={dataDetail.name}
                            style={{ maxHeight: 180, maxWidth: "100%", objectFit: "contain" }}
                        />
                    </div>
                </>
            )}

            {dataDetail.createdAt && dataDetail.updatedAt && (
                <div style={{ position: "absolute", right: 24, bottom: 16, fontSize: 14, color: "#999", textAlign: "right" }}>
                    <div>Tạo: {dayjs(dataDetail.createdAt).format("DD/MM/YYYY HH:mm")}</div>
                    <div>Cập nhật: {dayjs(dataDetail.updatedAt).format("DD/MM/YYYY HH:mm")}</div>
                </div>
            )}
        </Modal>
    );
};

export default CategoryDetail;
