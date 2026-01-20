import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Table, Image, Button, Popconfirm, Tooltip } from "antd";
import ProductDetail from "./product.detail";
import { useContext, useState } from "react";
import UpdateProductForm from "./product.update";
import { deleteProductAPI } from "../../../services/api.services";
import { NotifyContext } from "../../context/notify.context";

const ProductTable = ({
    dataProducts,
    loadProducts,
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

    const { api, contextHolder } = useContext(NotifyContext);

    const handleDelete = async (id) => {
        try {
            const res = await deleteProductAPI(id);
            api.success({
                message: "Thành công",
                description: res?.message,
            });
            loadProducts();
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
            title: <div style={{ fontWeight: 600 }}>Hình ảnh</div>,
            dataIndex: "thumbnail",
            width: 100,
            align: "center",
            render: (thumbnail, record) => (
                <Image
                    style={{
                        maxWidth: 60,
                        maxHeight: 60,
                        objectFit: "contain",
                        borderRadius: 12,
                        border: "1px solid #f0f0f0",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.06)",
                    }}
                    src={
                        thumbnail
                            ? `${import.meta.env.VITE_BACKEND_URL}/images/product/${thumbnail}`
                            : null
                    }
                    alt={record.name}
                    fallback="https://via.placeholder.com/60?text=No+Image"
                    preview={{
                        mask: (
                            <div
                                style={{
                                    background: "rgba(0,0,0,0.5)",
                                    fontSize: 12,
                                    color: "#fff",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "100%",
                                }}
                            >
                                Xem
                            </div>
                        ),
                    }}
                />
            ),
        },
        {
            title: <div style={{ fontWeight: 600 }}>Tên sản phẩm</div>,
            dataIndex: "name",
            align: "center",
            render: (text) => (
                <span style={{ fontWeight: 500 }}>{text}</span>
            ),
        },
        {
            title: <div style={{ fontWeight: 600 }}>Mô tả</div>,
            dataIndex: "description",
            ellipsis: true,
            align: "center",
        },
        {
            title: <div style={{ fontWeight: 600 }}>Số lượng</div>,
            dataIndex: "quantity",
            align: "center",
            render: (quantity) => {
                const isLow = quantity <= 5;
                const isMedium = quantity > 5 && quantity <= 20;

                let colorStyle = {};

                if (isLow) {
                    // Đỏ - Cảnh báo hết hàng
                    colorStyle = {
                        color: "#cf1322",
                        backgroundColor: "#fff1f0",
                        border: "1px solid #ffccc7",
                    };
                } else if (isMedium) {
                    // Vàng cam - Cảnh báo sắp hết
                    colorStyle = {
                        color: "#d46b08",
                        backgroundColor: "#fff7e6",
                        border: "1px solid #ffd591",
                    };
                } else {
                    // Xanh lá - Còn nhiều hàng
                    colorStyle = {
                        color: "#389e0d",
                        backgroundColor: "#f6ffed",
                        border: "1px solid #b7eb8f",
                    };
                }

                return (
                    <span
                        style={{
                            padding: "4px 12px",
                            borderRadius: 16,
                            fontWeight: 600,
                            fontSize: 13,
                            minWidth: 48,
                            display: "inline-block",
                            ...colorStyle,
                        }}
                    >
                        {quantity}
                    </span>
                );
            },
        },
        {
            title: <div style={{ fontWeight: 600 }}>Đã bán</div>,
            dataIndex: "sold",
            align: "center",
            render: (sold) => (
                <span
                    style={{
                        padding: "4px 12px",
                        borderRadius: 16,
                        fontWeight: 600,
                        fontSize: 13,
                        color: "#1677ff",
                        backgroundColor: "#e6f4ff",
                        border: "1px solid #91caff",
                        minWidth: 48,
                        display: "inline-block",
                    }}
                >
                    {sold || 0}
                </span>
            ),
        },
        {
            title: <div style={{ fontWeight: 600 }}>Hãng</div>,
            dataIndex: ["brand", "name"],
            align: "center",
            render: (name) => (
                <span
                    style={{
                        padding: "4px 14px",
                        borderRadius: 16,
                        fontSize: 13,
                        fontWeight: 500,
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        color: "#fff",
                        border: "none",
                        display: "inline-block",
                        whiteSpace: "nowrap",
                        boxShadow: "0 2px 8px rgba(102, 126, 234, 0.15)",
                    }}
                >
                    {name}
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
                        alignItems: "center",
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
                                setDataUpdate(record);
                                setOpenUpdate(true);
                            }}
                        />
                    </Tooltip>

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
                </div>
            ),
        },
    ];

    return (
        <>
            {contextHolder}
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
                    dataSource={dataProducts}
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
                        showTotal: (t) => `Tổng ${t} sản phẩm`,
                    }}
                    scroll={{ x: 1200 }}
                />
            </div>

            <ProductDetail
                openDetail={openDetail}
                setOpenDetail={setOpenDetail}
                dataDetail={dataDetail}
                setDataDetail={setDataDetail}
            />

            <UpdateProductForm
                openUpdate={openUpdate}
                setOpenUpdate={setOpenUpdate}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadProducts={loadProducts}
            />
        </>
    );
};

export default ProductTable;
