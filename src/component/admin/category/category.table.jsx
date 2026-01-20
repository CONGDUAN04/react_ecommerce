import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Table, Image, Tag, Button, Popconfirm, Tooltip } from "antd";
import { deleteCategoryAPI } from "../../../services/api.services";
import { useContext, useState } from "react";
import { NotifyContext } from "../../context/notify.context";
import UpdateCategoryForm from "./category.update";
import CategoryDetail from "./category.detail";

export const CategoryTable = (props) => {
    const { dataCategories, loadCategory, current, pageSize, total, setCurrent, setPageSize } = props;
    const [openDetail, setOpenDetail] = useState(false);
    const [dataDetail, setDataDetail] = useState(null);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);
    const { api } = useContext(NotifyContext);
    const handleDelete = async (id) => {
        try {
            const res = await deleteCategoryAPI(id);
            api.success({
                message: "Thành Công",
                description: res?.message,
            });
            await loadCategory();
        } catch (error) {
            api.error({
                message: "Thất Bại",
                description: error?.message,
            });
        }
    };
    const columns = [
        {
            title: <div style={{ fontWeight: 600 }}>STT</div>,
            width: 60,
            align: "center",
            render: (_, __, index) => (
                <span style={{ fontWeight: 500, color: "#8c8c8c" }}>
                    {index + 1}
                </span>
            ),
        },
        {
            title: <div style={{ fontWeight: 600 }}>ID</div>,
            dataIndex: "id",
            width: 70,
            align: "center",
            render: (id) => (
                <span style={{ color: "#1677ff", fontWeight: 600, fontSize: 13 }}>
                    #{id}
                </span>
            ),
        },
        {
            title: <div style={{ fontWeight: 600 }}>Hình ảnh</div>,
            dataIndex: "image",
            width: 100,
            align: "center",
            render: (image, record) => (
                <Image
                    style={{
                        maxWidth: 56,
                        maxHeight: 56,
                        objectFit: "contain",
                        borderRadius: 12,
                        border: "1px solid #f0f0f0",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.06)",
                    }}
                    src={
                        image
                            ? `${import.meta.env.VITE_BACKEND_URL}/images/category/${image}`
                            : null
                    }
                    alt={record.name}
                    fallback="https://via.placeholder.com/56?text=No+Image"
                    preview={{
                        mask: (
                            <div style={{
                                background: "rgba(0,0,0,0.5)",
                                fontSize: 12,
                                color: "#fff",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100%",
                            }}>
                                Xem
                            </div>
                        ),
                    }}
                />
            ),
        },
        {
            title: <div style={{ fontWeight: 600 }}>Tên danh mục</div>,
            dataIndex: "name",
            width: 260,
            align: "center",
            render: (text) => (
                <span style={{
                    fontWeight: 600,
                    fontSize: 14,
                    color: "#262626",
                }}>
                    {text}
                </span>
            ),
        },
        {
            title: <div style={{ fontWeight: 600 }}>Mô tả</div>,
            dataIndex: "description",
            width: 260,
            align: "center",
            ellipsis: { showTitle: false },
            render: (text) => (
                <Tooltip title={text}>
                    <span style={{
                        color: "#8c8c8c",
                        fontSize: 13,
                        lineHeight: 1.5,
                    }}>
                        {text}
                    </span>
                </Tooltip>
            ),
        },
        {
            title: <div style={{ fontWeight: 600 }}>Thao tác</div>,
            width: 150,
            align: "center",
            fixed: "right",
            render: (_, record) => (
                <div style={{
                    display: "flex",
                    gap: 8,
                    justifyContent: "center",
                }}>
                    <Tooltip title="Xem chi tiết">
                        <Button
                            icon={<EyeOutlined />}
                            style={{
                                backgroundColor: "#e6f4ff",
                                color: "#1677ff",
                                border: "1px solid #91caff",
                                borderRadius: 8,
                            }}
                            onClick={() => {
                                setDataDetail(record);
                                setOpenDetail(true);
                            }}
                        />
                    </Tooltip>

                    <Tooltip title="Chỉnh sửa">
                        <Button
                            icon={<EditOutlined />}
                            style={{
                                backgroundColor: "#fff7e6",
                                color: "#fa8c16",
                                border: "1px solid #ffd591",
                                borderRadius: 8,
                            }}
                            onClick={() => {
                                setDataUpdate(record);
                                setOpenUpdate(true);
                            }}
                        />
                    </Tooltip>

                    <Popconfirm
                        title="Xóa danh mục"
                        description="Bạn có chắc chắn muốn xóa danh mục này?"
                        okText="Xóa"
                        cancelText="Hủy"
                        okButtonProps={{ danger: true }}
                        onConfirm={() => handleDelete(record.id)}
                    >
                        <Tooltip title="Xóa">
                            <Button
                                icon={<DeleteOutlined />}
                                danger
                                style={{
                                    backgroundColor: "#fff1f0",
                                    color: "#ff4d4f",
                                    border: "1px solid #ffccc7",
                                    borderRadius: 8,
                                }}
                            />
                        </Tooltip>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    return (
        <>
            <div style={{
                margin: 0,
                border: "1px solid #f0f0f0",
                borderRadius: 16,
                overflow: "hidden",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
            }}>
                <Table
                    columns={columns}
                    dataSource={dataCategories}
                    rowKey="id"
                    pagination={{
                        current,
                        pageSize,
                        total,
                        showSizeChanger: true,
                        showTotal: (total) => `Tổng ${total} danh mục`,
                        onChange: (page, size) => {
                            setCurrent(page);
                            setPageSize(size);
                        },
                    }}
                    scroll={{ x: 1200 }}
                />

            </div>
            <CategoryDetail
                openDetail={openDetail}
                setOpenDetail={setOpenDetail}
                dataDetail={dataDetail}
                setDataDetail={setDataDetail}
            />
            <UpdateCategoryForm
                loadCategory={loadCategory}
                openUpdate={openUpdate}
                setOpenUpdate={setOpenUpdate}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
            />
        </>
    );
};