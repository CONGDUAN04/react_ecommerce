import { Modal, Descriptions, Divider } from "antd";
import dayjs from "dayjs";

const UserDetail = ({ dataDetail, setDataDetail, openDetail, setOpenDetail }) => {
    const handleClose = () => {
        setDataDetail(null);
        setOpenDetail(false);
    };

    return (
        <Modal
            title={<div style={{ textAlign: "center", fontWeight: 600 }}>Chi tiết người dùng</div>}
            open={openDetail}
            onCancel={handleClose}
            footer={null}
            width={600}
            centered
            maskClosable={false}
            styles={{ body: { paddingBottom: 56 } }}
        >
            {!dataDetail ? (
                <div>Chưa có dữ liệu</div>
            ) : (
                <>
                    <Descriptions column={1} bordered size="middle" labelStyle={{ fontWeight: 600 }}>
                        <Descriptions.Item label="Email:">{dataDetail.username}</Descriptions.Item>
                        <Descriptions.Item label="Tên:">{dataDetail.fullName}</Descriptions.Item>
                        <Descriptions.Item label="Số điện thoại">{dataDetail.phone}</Descriptions.Item>
                        <Descriptions.Item label="Phân quyền">{dataDetail.role?.name || "N/A"}</Descriptions.Item>
                        <Descriptions.Item label="Phân loại tài khoản">{dataDetail.accountType}</Descriptions.Item>
                    </Descriptions>

                    <Divider />
                    {dataDetail.avatar ? (
                        <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
                            <img
                                style={{ maxHeight: 200, maxWidth: "100%", objectFit: "contain", borderRadius: 6 }}
                                src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataDetail.avatar}`}
                                alt={dataDetail.fullName}
                            />
                        </div>
                    ) : (
                        <div style={{ textAlign: "center", padding: "40px 20px", color: "#999" }}>Chưa có ảnh</div>
                    )}

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

export default UserDetail;