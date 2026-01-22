import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Table, Button, Popconfirm, Tooltip } from "antd";
import { useContext, useState } from "react";
import UpdateStorageForm from "./storage.update";
import { deleteStorageAPI } from "../../../services/api.services";
import { NotifyContext } from "../../context/notify.context";
import StorageDetail from "./storage.detail";
export const StorageTable = (props) => {
    const {
        dataStorage,
        loadStorage,
        current,
        pageSize,
        total,
        setCurrent,
        setPageSize
    } = props;
    const [dataUpdate, setDataUpdate] = useState(null);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [dataDetail, setDataDetail] = useState(null);
    const [openDetail, setOpenDetail] = useState(false);
    const { api, contextHolder } = useContext(NotifyContext);
    const formatPrice = (value) => {
        if (!value && value !== 0) return "";
        return Number(value).toLocaleString("vi-VN");
    };
    const handleDelete = async (id) => {
        try {
            const res = await deleteStorageAPI(id);
            api.success({
                message: "Thành Công",
                description: res?.message,
            });
            await loadStorage();
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
            title: <div style={{ fontWeight: 600 }}>Mã sản phẩm</div>,
            dataIndex: "sku",
            width: 160,
            align: "center",
            render: (sku) => (
                <span
                    style={{
                        padding: "4px 10px",
                        borderRadius: 6,
                        fontSize: 12,
                        fontWeight: 600,
                        backgroundColor: "#fafafa",
                        border: "1px dashed #d9d9d9",
                        color: "#262626",
                        fontFamily: "monospace",
                    }}
                >
                    {sku}
                </span>
            ),
        },
        {
            title: <div style={{ fontWeight: 600 }}>Dung lượng</div>,
            dataIndex: "name",
            width: 200,
            align: "center",
            render: (text) => (
                <span
                    style={{
                        padding: "4px 14px",
                        borderRadius: 999,
                        fontWeight: 600,
                        fontSize: 13,
                        backgroundColor: "#fafafa",
                        border: "1px solid #d9d9d9",
                        color: "#262626",
                    }}
                >
                    {text}
                </span>
            ),
        },
        {
            title: <div style={{ fontWeight: 600 }}>Giá tiền</div>,
            dataIndex: "price",
            width: 160,
            align: "center",
            render: (price) => (
                <span
                    style={{
                        padding: "4px 12px",
                        borderRadius: 999,
                        fontWeight: 600,
                        fontSize: 13,
                        backgroundColor: "#f6ffed",
                        color: "#135200",
                        border: "1px solid #b7eb8f",
                    }}
                >
                    {formatPrice(price)} đ
                </span>
            ),
        },
        {
            title: <div style={{ fontWeight: 600 }}>Số lượng</div>,
            dataIndex: "quantity",
            width: 120,
            align: "center",
            render: (quantity) => {
                const isLow = quantity <= 5;
                return (
                    <span
                        style={{
                            padding: "4px 12px",
                            borderRadius: 999,
                            fontWeight: 600,
                            fontSize: 13,
                            backgroundColor: isLow ? "#fff7e6" : "#e6f4ff",
                            color: isLow ? "#ad2102" : "#0958d9",
                            border: `1px solid ${isLow ? "#ffd591" : "#91caff"}`,
                        }}
                    >
                        {quantity}
                    </span>
                );
            },
        },
        {
            title: <div style={{ fontWeight: 600 }}>Màu</div>,
            dataIndex: ["color", "id"],
            width: 120,
            align: "center",
            render: (id) => (
                <span
                    style={{
                        padding: "4px 10px",
                        borderRadius: 999,
                        fontSize: 12,
                        fontWeight: 600,
                        backgroundColor: "#f9f0ff",
                        color: "#531dab",
                        border: "1px solid #d3adf7",
                    }}
                >
                    #{id}
                </span>
            ),
        },
        {
            title: <div style={{ fontWeight: 600 }}>Thao tác</div>,
            width: 150,
            align: "center",
            fixed: "right",
            render: (_, record) => (
                <div
                    style={{
                        display: "flex",
                        gap: 8,
                        justifyContent: "center",
                    }}
                >
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
                                setOpenUpdate(true);
                                setDataUpdate(record);
                            }}
                        />
                    </Tooltip>

                    <Popconfirm
                        title="Xóa dung lượng"
                        description="Bạn có chắc chắn muốn xóa dung lượng này?"
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
            <div
                style={{
                    margin: 0,
                    border: "1px solid #f0f0f0",
                    borderRadius: 16,
                    overflow: "hidden",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                }}
            >
                <Table
                    columns={columns}
                    dataSource={dataStorage}
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
                        showTotal: (t) => `Tổng ${t} dung lượng`,
                    }}
                    scroll={{ x: 1200 }}
                />

            </div>
            <StorageDetail
                openDetail={openDetail}
                setOpenDetail={setOpenDetail}
                dataDetail={dataDetail}
                setDataDetail={setDataDetail}
            />
            <UpdateStorageForm
                openUpdate={openUpdate}
                setOpenUpdate={setOpenUpdate}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadStorage={loadStorage} />
        </>
    );
};
