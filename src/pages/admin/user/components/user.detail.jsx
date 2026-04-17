import { Descriptions, Empty, Tag } from "antd";
import BaseModal from "../../../../components/common/BaseModal.jsx";
import ImagePreviewItem from "../../../../components/common/ImagePreviewItem.jsx";
import { formatDateTime } from "../../../../utils/formatDate.js";
export default function UserDetail({ dataDetail, openDetail, setOpenDetail }) {
  const handleClose = () => {
    setOpenDetail(false);
  };

  return (
    <BaseModal
      open={openDetail}
      onCancel={handleClose}
      title="Chi tiết người dùng"
      footer={null}
    >
      {!dataDetail ? (
        <Empty />
      ) : (
        <Descriptions column={1} bordered size="middle">
          <Descriptions.Item label="ID">{dataDetail.id}</Descriptions.Item>
          <Descriptions.Item label="Email">
            {dataDetail.username}
          </Descriptions.Item>
          <Descriptions.Item label="Họ và tên">
            {dataDetail.fullName}
          </Descriptions.Item>
          <Descriptions.Item label="Số điện thoại">
            {dataDetail.phone || "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Role">
            <Tag color="blue">{dataDetail.role?.name || "N/A"}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Loại tài khoản">
            <Tag color="purple">{dataDetail.accountType || "N/A"}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Avatar">
            <ImagePreviewItem
              src={`${dataDetail.avatar}?t=${dataDetail.updatedAt}`}
            />
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
