import { Descriptions, Empty } from "antd";
import BaseModal from "../../../../components/common/BaseModal.jsx";
import ImagePreviewItem from "../../../../components/common/ImagePreviewItem.jsx";
import { formatDateTime } from "../../../../utils/formatDate.js";

export default function CategoryDetail({
  dataDetail,
  setDataDetail,
  openDetail,
  setOpenDetail,
}) {
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
    >
      {!dataDetail ? (
        <Empty />
      ) : (
        <Descriptions column={1} bordered>
          <Descriptions.Item label="ID">{dataDetail.id}</Descriptions.Item>
          <Descriptions.Item label="Tên">{dataDetail.name}</Descriptions.Item>
          <Descriptions.Item label="Slug">{dataDetail.slug}</Descriptions.Item>

          <Descriptions.Item label="Icon">
            <ImagePreviewItem
              src={`${dataDetail.icon}?t=${dataDetail.updatedAt}`}
              variant="icon"
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
