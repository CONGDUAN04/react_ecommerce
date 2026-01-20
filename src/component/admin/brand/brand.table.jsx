import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Table, Image, Button, Popconfirm, Tooltip } from "antd";
import { useContext, useState } from "react";
import UpdateBrand from "./brand.update";
import { NotifyContext } from "../../context/notify.context";
import { deleteBrandAPI } from "../../../services/api.services";
import BrandDetail from "./brand.detail";

export const BrandTable = (props) => {
    const { dataBrand, loadBrand, current, pageSize, total, setCurrent, setPageSize } = props;
    const [openDetail, setOpenDetail] = useState(false);
    const [dataDetail, setDataDetail] = useState(null);
    const [isModalUpdateOpen, setIsModalUpdateModal] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);
    const { api } = useContext(NotifyContext);
    const handleDelete = async (id) => {
        try {
            const res = await deleteBrandAPI(id);
            api.success({
                message: "Thành công",
                description: res?.message,
            });
            await loadBrand();
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
            dataIndex: "imageBrand",
            width: 100,
            align: "center",
            render: (imageBrand, record) => (
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
                        imageBrand
                            ? `${import.meta.env.VITE_BACKEND_URL}/images/brand/${imageBrand}`
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
            title: <div style={{ fontWeight: 600 }}>Tên thương hiệu</div>,
            dataIndex: "name",
            width: 250,
            align: "center",
            render: (text) => (
                <span
                    style={{
                        fontWeight: 500,
                        fontSize: 14,
                        color: "#262626",
                    }}
                >
                    {text}
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
                                setIsModalUpdateModal(true);
                            }}
                        />
                    </Tooltip>

                    <Popconfirm
                        title="Xóa thương hiệu"
                        description="Bạn có chắc chắn muốn xóa thương hiệu này?"
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
                    dataSource={dataBrand}
                    rowKey="id"
                    pagination={{
                        current,
                        pageSize,
                        total,
                        showSizeChanger: true,
                        showTotal: (total) => `Tổng ${total} thương hiệu`,
                        onChange: (page, size) => {
                            setCurrent(page);
                            setPageSize(size);
                        },
                    }}
                    scroll={{ x: 1200 }}
                />

            </div>
            <BrandDetail
                openDetail={openDetail}
                setOpenDetail={setOpenDetail}
                dataDetail={dataDetail}
                setDataDetail={setDataDetail} />
            <UpdateBrand
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateModal={setIsModalUpdateModal}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadBrand={loadBrand}
            />
        </>
    );
};