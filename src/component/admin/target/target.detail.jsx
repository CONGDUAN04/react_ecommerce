import { Modal, Descriptions, Divider, Empty } from "antd";
import dayjs from "dayjs";

const TargetDetail = ({ dataDetail, setDataDetail, openDetail, setOpenDetail }) => {
    const handleClose = () => {
        setDataDetail(null);
        setOpenDetail(false);
    };

    return (
        <Modal
            title={<div style={{ textAlign: "center", fontWeight: 600 }}>Chi tiết mục tiêu</div>}
            open={openDetail}
            onCancel={handleClose}
            footer={null}
            width={520}
            centered
            styles={{ body: { paddingBottom: 56 } }}
        >
            {!dataDetail ? (
                <Empty />
            ) : (
                <>
                    <Descriptions column={1} bordered size="small" labelStyle={{ fontWeight: 600, width: 140 }}>
                        <Descriptions.Item label="ID">{dataDetail.id}</Descriptions.Item>
                        <Descriptions.Item label="Tên mục tiêu">{dataDetail.name}</Descriptions.Item>
                        <Descriptions.Item label="Mô tả">{dataDetail.description || "N/A"}</Descriptions.Item>
                    </Descriptions>

                    <Divider />

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

export default TargetDetail;
