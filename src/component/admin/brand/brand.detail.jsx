import { Modal, Descriptions, Divider, Empty } from "antd";
import dayjs from "dayjs";

const BrandDetail = ({ dataDetail, setDataDetail, openDetail, setOpenDetail }) => {
    const handleClose = () => {
        setDataDetail(null);
        setOpenDetail(false);
    };

    if (!dataDetail) {
        return (
            <Modal
                title="Chi tiết thương hiệu"
                open={openDetail}
                onCancel={handleClose}
                footer={null}
                width={600}
                centered
            >
                <Empty />
            </Modal>
        );
    }

    return (
        <Modal
            title={
                <div style={{ textAlign: "center", fontWeight: 600 }}>
                    Chi tiết thương hiệu
                </div>
            }
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
                <Descriptions.Item label="ID">
                    {dataDetail.id}
                </Descriptions.Item>

                <Descriptions.Item label="Tên thương hiệu">
                    {dataDetail.name}
                </Descriptions.Item>
            </Descriptions>

            {dataDetail.imageBrand && (
                <>
                    <Divider>Hình ảnh</Divider>
                    <div style={{ textAlign: "center" }}>
                        <img
                            src={`${import.meta.env.VITE_BACKEND_URL}/images/brand/${dataDetail.imageBrand}`}
                            alt={dataDetail.name}
                            style={{
                                maxHeight: 180,
                                maxWidth: "100%",
                                objectFit: "contain",
                            }}
                        />
                    </div>
                </>
            )}

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
            )}
        </Modal>
    );
};

export default BrandDetail;
