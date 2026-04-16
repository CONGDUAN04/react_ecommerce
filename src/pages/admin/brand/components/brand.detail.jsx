import { Descriptions, Empty } from "antd";
import BaseModal from "../../../../components/common/BaseModal.jsx";
import ImagePreviewItem from "../../../../components/common/ImagePreviewItem.jsx";

export default function BrandDetail({ dataDetail, openDetail, setOpenDetail }) {
  const handleClose = () => {
    setOpenDetail(false);
  };

  return (
    <BaseModal
      open={openDetail}
      onCancel={handleClose}
      title="Chi tiết thương hiệu"
      footer={null}
    >
      {!dataDetail ? (
        <Empty />
      ) : (
        <Descriptions column={1} bordered size="middle">
          <Descriptions.Item label="ID">{dataDetail.id}</Descriptions.Item>

          <Descriptions.Item label="Tên">{dataDetail.name}</Descriptions.Item>

          <Descriptions.Item label="Slug">{dataDetail.slug}</Descriptions.Item>

          <Descriptions.Item label="Logo">
            <ImagePreviewItem src={dataDetail.logo} />
          </Descriptions.Item>
        </Descriptions>
      )}
    </BaseModal>
  );
}
