import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Table, Button, Popconfirm, Tooltip } from "antd";
import { useContext, useState } from "react";
import { deleteProductGroupAPI } from "../../../services/api.services.js";
import { NotifyContext } from "../../context/notify.context.jsx";
import ProductGroupActiveToggle from "./productGroup.active.toggle.jsx";
import ProductGroupDetail from "./productGroup.detail.jsx";
import UpdateProductGroupForm from "./productGroup.update.jsx";

const ProductGroupTable = ({
    dataGroups,
    loadGroups,
    current,
    pageSize,
    total,
    setCurrent,
    setPageSize,
}) => {
    const [openDetail, setOpenDetail] = useState(false);
    const [dataDetail, setDataDetail] = useState(null);
    const [dataUpdate, setDataUpdate] = useState(null);
    const [openUpdate, setOpenUpdate] = useState(false);

    const { api } = useContext(NotifyContext);

    const handleDelete = async (id) => {
        try {
            const res = await deleteProductGroupAPI(id);
            api.success({
                message: "Thành công",
                description: res?.message,
            });
            loadGroups();
        } catch (error) {
            api.error({
                message: "Thất bại",
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
            title: <div style={{ fontWeight: 600 }}>Tên nhóm</div>,
            dataIndex: "name",
            align: "center",
            render: (text) => <span style={{ fontWeight: 500 }}>{text}</span>,
        },
        {
            title: <div style={{ fontWeight: 600 }}>Danh mục</div>,
            dataIndex: ["category", "name"],
            align: "center",
            render: (name) => (
                <span
                    style={{
                        padding: "4px 12px",
                        borderRadius: 12,
                        fontSize: 13,
                        fontWeight: 500,
                        backgroundColor: "#f0f5ff",
                        color: "#2f54eb",
                        border: "1px solid #adc6ff",
                    }}
                >
                    {name}
                </span>
            ),
        },
        {
            title: <div style={{ fontWeight: 600 }}>Thương Hiệu</div>,
            dataIndex: ["brand", "name"],
            align: "center",
            render: (name) => (
                <span
                    style={{
                        padding: "4px 12px",
                        borderRadius: 12,
                        fontSize: 13,
                        fontWeight: 500,
                        backgroundColor: "#f0f5ff",
                        color: "#2f54eb",
                        border: "1px solid #adc6ff",
                    }}
                >
                    {name}
                </span>
            ),
        },
        {
            title: <div style={{ fontWeight: 600 }}>Trạng thái</div>,
            align: "center",
            render: (_, record) => (
                <ProductGroupActiveToggle
                    record={record}
                    loadGroups={loadGroups}
                />
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

                    <Tooltip
                        title={
                            record.isActive
                                ? "Chỉnh sửa"
                                : "Sản phẩm đã ngừng bán"
                        }
                    >
                        <Button
                            icon={<EditOutlined />}
                            disabled={!record.isActive}
                            style={{
                                backgroundColor: "#fff7e6",
                                color: "#fa8c16",
                                border: "1px solid #ffd591",
                                borderRadius: 8,
                                opacity: record.isActive ? 1 : 0.5,
                            }}
                            onClick={() => {
                                if (!record.isActive) return;
                                setDataUpdate(record);
                                setOpenUpdate(true);
                            }}
                        />
                    </Tooltip>

                    {record.isActive && (
                        <Popconfirm
                            title="Xóa sản phẩm"
                            description="Bạn có chắc chắn muốn xóa sản phẩm này?"
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
                    )}
                </div>
            ),
        },
    ];
    return (
        <>
            <div
                style={{
                    border: "1px solid #f0f0f0",
                    borderRadius: 16,
                    overflow: "hidden",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                }}
            >
                <Table
                    columns={columns}
                    dataSource={dataGroups}
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
                        showTotal: (t) => `Tổng ${t} nhóm sản phẩm`,
                    }}
                    scroll={{ x: 1200 }}
                />
            </div>

            <ProductGroupDetail
                openDetail={openDetail}
                setOpenDetail={setOpenDetail}
                dataDetail={dataDetail}
                setDataDetail={setDataDetail}
            />

            <UpdateProductGroupForm
                openUpdate={openUpdate}
                setOpenUpdate={setOpenUpdate}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadGroups={loadGroups}
            />
        </>
    );
};

export default ProductGroupTable;
