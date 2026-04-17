import { Descriptions, Empty } from "antd";
import BaseModal from "../../../../components/common/BaseModal.jsx";
import { formatDateTime } from "../../../../utils/formatDate.js";

export default function RoleDetail({ dataDetail, openDetail, setOpenDetail }) {
  const handleClose = () => setOpenDetail(false);

  return (
    <BaseModal
      open={openDetail}
      onCancel={handleClose}
      title="Chi tiết role"
      footer={null}
    >
      {!dataDetail ? (
        <Empty />
      ) : (
        <Descriptions column={1} bordered size="middle">
          <Descriptions.Item label="ID">{dataDetail.id}</Descriptions.Item>

          <Descriptions.Item label="Tên">{dataDetail.name}</Descriptions.Item>

          <Descriptions.Item label="Mô tả">
            {dataDetail.description || "—"}
          </Descriptions.Item>

          <Descriptions.Item label="Số user">
            {dataDetail._count?.users ?? 0}
          </Descriptions.Item>

          <Descriptions.Item label="Ngày tạo">
            {formatDateTime(dataDetail.createdAt)}
          </Descriptions.Item>

          <Descriptions.Item label="Cập nhật">
            {formatDateTime(dataDetail.updatedAt)}
          </Descriptions.Item>
        </Descriptions>
      )}
    </BaseModal>
  );
}
