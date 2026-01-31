import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Table, Image, Button, Popconfirm, Tooltip } from "antd";
import { useContext, useState } from "react";
import ColorDetail from "./color.detail";
import UpdateColorForm from "./color.update";
import { NotifyContext } from "../../context/notify.context";
import { deleteColorAPI } from "../../../services/api.services";

export const ColorTable = (props) => {
    const { dataColor,
        loadColor,
        current,
        pageSize,
        total,
        setCurrent,
        setPageSize, } = props;
    const [openDetail, setOpenDetail] = useState(false);
    const [dataDetail, setDataDetail] = useState(null);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);
    const { api, contextHolder } = useContext(NotifyContext);
    const handleDelete = async (id) => {
        try {
            const res = await deleteColorAPI(id);
            api.success({
                message: "Thành Công",
                description: res?.message,
            });
            await loadColor();
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
                    {(current - 1) * pageSize + index + 1}
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
                            ? `${import.meta.env.VITE_BACKEND_URL}/images/color/${image}`
                            : null
                    }
                    alt={record.color}
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
            title: <div style={{ fontWeight: 600 }}>Màu sắc</div>,
            dataIndex: "color",
            width: 200,
            align: "center",
            render: (text) => (
                <span style={{
                    padding: "4px 14px",
                    borderRadius: 999,
                    fontWeight: 600,
                    fontSize: 13,
                    backgroundColor: "#fafafa",
                    border: "1px solid #d9d9d9",
                    color: "#262626",
                }}>
                    {text}
                </span>
            ),
        },
        {
            title: <div style={{ fontWeight: 600 }}>Số lượng tồn</div>,
            dataIndex: "quantity",
            width: 200,
            align: "center",
            render: (text) => (
                <span style={{
                    padding: "4px 14px",
                    borderRadius: 999,
                    fontWeight: 600,
                    fontSize: 13,
                    backgroundColor: "#fafafa",
                    border: "1px solid #d9d9d9",
                    color: "#262626",
                }}>
                    {text}
                </span>
            ),
        },
        {
            title: <div style={{ fontWeight: 600 }}>Giá</div>,
            dataIndex: "price",
            width: 200,
            align: "center",
            render: (price) => {
                const formatted = new Intl.NumberFormat("vi-VN").format(price);

                return (
                    <span style={{
                        padding: "4px 14px",
                        borderRadius: 999,
                        fontWeight: 600,
                        fontSize: 13,
                        backgroundColor: "#fafafa",
                        border: "1px solid #d9d9d9",
                        color: "#262626",
                    }}>
                        {formatted}đ
                    </span>
                );
            },
        },

        {
            title: <div style={{ fontWeight: 600 }}>Phiên bản</div>,
            dataIndex: "product",
            width: 300,
            align: "center",
            render: (product) => (
                <div style={{ lineHeight: 1.4 }}>
                    <div style={{
                        fontWeight: 600,
                        fontSize: 14,
                        color: "#262626",
                    }}>
                        {product?.name}
                    </div>
                    <div style={{
                        fontSize: 12,
                        color: "#8c8c8c",
                    }}>
                        ID: #{product?.id}
                    </div>
                </div>
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
                        title="Xóa màu sắc"
                        description="Bạn có chắc chắn muốn xóa màu này?"
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
            {contextHolder}
            <div style={{
                margin: 0,
                border: "1px solid #f0f0f0",
                borderRadius: 16,
                overflow: "hidden",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
            }}>
                <Table
                    columns={columns}
                    dataSource={dataColor}
                    rowKey="id"
                    pagination={{
                        current,
                        pageSize,
                        total,
                        showSizeChanger: true,
                        onChange: (page, size) => {
                            setCurrent(page);
                            setPageSize(size);
                        },
                        showTotal: (t) => `Tổng ${t} màu sản phẩm`,
                    }}
                    scroll={{ x: 1200 }}
                />
            </div>
            <ColorDetail
                dataDetail={dataDetail}
                setDataDetail={setDataDetail}
                openDetail={openDetail}
                setOpenDetail={setOpenDetail}
            />
            <UpdateColorForm
                loadColor={loadColor}
                openUpdate={openUpdate}
                setOpenUpdate={setOpenUpdate}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
            />
        </>
    );
};