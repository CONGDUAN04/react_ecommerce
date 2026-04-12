import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Table, Image, Button, Popconfirm, Tooltip } from "antd";
import { useContext, useState } from "react";
import ProductDetail from "./product.detail";
import UpdateProductForm from "./product.update";
import { deleteProductAPI } from "../../../../services/api.services.js";
import { NotifyContext } from "../../context/notify.context.jsx";
import ProductActiveToggle from "./product.active.toggle.jsx";

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

    const { api } = useContext(NotifyContext);

    const handleDelete = async id => {
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
            title: "STT",
            width: 60,
            align: "center",
            render: (_, __, index) =>
                (current - 1) * pageSize + index + 1,
        },

        {
            title: "ID",
            dataIndex: "id",
            width: 70,
            align: "center",
            render: id => `#${id}`,
        },

        {
            title: "Hình ảnh",
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
                    }}
                    src={
                        thumbnail
                            ? `${import.meta.env.VITE_BACKEND_URL}/images/product/${thumbnail}`
                            : null
                    }
                    alt={record.name}
                    fallback="https://via.placeholder.com/60"
                />
            ),
        },
        {
            title: "Sản phẩm",
            align: "center",
            render: (_, record) =>
                `${record.productGroup?.name || ""} ${record.name}`,
        },


        {
            title: "Phiên bản",
            dataIndex: "name",
            align: "center",
        },

        {
            title: "Dòng máy",
            align: "center",
            render: (_, record) => record.productGroup?.name || "-",
        },
        {
            title: "Tổng tồn kho",
            dataIndex: "quantity",
            align: "center",
        },


        {
            title: "Trạng thái",
            align: "center",
            render: (_, record) => (
                <ProductActiveToggle record={record} loadProducts={loadProducts} />
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
