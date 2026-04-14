import { Descriptions, Empty } from "antd";
import BaseModal from "../../../../components/common/BaseModal.jsx";
import dayjs from "dayjs";

const CategoryDetail = ({
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
    <BaseModal
      open={openDetail}
      onCancel={handleClose}
      title="Chi tiết danh mục"
      footer={null}
      width={600}
    >
      {!dataDetail ? (
        <Empty />
      ) : (
        <>
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label="ID">{dataDetail.id}</Descriptions.Item>
            <Descriptions.Item label="Tên">{dataDetail.name}</Descriptions.Item>
            <Descriptions.Item label="Mô tả">
              {dataDetail.description || "N/A"}
            </Descriptions.Item>
          </Descriptions>

          <div style={{ marginTop: 12, textAlign: "right", color: "#999" }}>
            <div>
              Tạo: {dayjs(dataDetail.createdAt).format("DD/MM/YYYY HH:mm")}
            </div>
            <div>
              Cập nhật: {dayjs(dataDetail.updatedAt).format("DD/MM/YYYY HH:mm")}
            </div>
          </div>
        </>
      )}
    </BaseModal>
  );
};

export default CategoryDetail;
