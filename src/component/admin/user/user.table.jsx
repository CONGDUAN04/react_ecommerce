import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Table, Image, Button, Popconfirm, Tooltip } from "antd";
import { useContext, useState } from "react";
import UserDetail from "./user.detail";
import UpdateUserForm from "./user.update";
import { deleteUserAPI } from "../../../services/api.services";
import { NotifyContext } from "../../context/notify.context";

export const UserTable = (props) => {
    const { dataUser, loadUser } = props;
    const [dataDetail, setDataDetail] = useState(null);
    const [openDetail, setOpenDetail] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);
    const [openUpdate, setOpenUpdate] = useState(false);
    const { api, contextHolder } = useContext(NotifyContext);
    const handleDelete = async (id) => {
        try {
            const res = await deleteUserAPI(id);
            api.success({
                message: "Thành Công",
                description: res?.message,
            });
            await loadUser();
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
            dataIndex: "avatar",
            width: 110,
            align: "center",
            render: (avatar, record) => (
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Image
                        width={56}
                        height={56}
                        style={{
                            objectFit: "cover",
                            borderRadius: 14,
                            border: "1px solid #e6e6e6",
                            backgroundColor: "#fafafa",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                        }}
                        src={
                            avatar
                                ? `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${avatar}`
                                : undefined
                        }
                        fallback="https://via.placeholder.com/56?text=User"
                        preview={{
                            mask: (
                                <div
                                    style={{
                                        fontSize: 12,
                                        fontWeight: 500,
                                    }}
                                >
                                    Xem
                                </div>
                            ),
                        }}
                        alt={record.username}
                    />
                </div>
            ),
        },
        {
            title: <div style={{ fontWeight: 600 }}>Email</div>,
            dataIndex: "username",
            width: 280,
            align: "center",
            render: (text) => (
                <Tooltip title={text}>
                    <span
                        style={{
                            padding: "6px 16px",
                            borderRadius: 999,
                            fontSize: 13,
                            fontWeight: 500,
                            backgroundColor: "#f5f5f5",
                            border: "1px solid #d9d9d9",
                            color: "#262626",
                            display: "inline-block",
                            maxWidth: 240,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                    >
                        {text}
                    </span>
                </Tooltip>
            ),
        },
        {
            title: <div style={{ fontWeight: 600 }}>Thao tác</div>,
            width: 170,
            align: "center",
            fixed: "right",
            render: (_, record) => (
                <div
                    style={{
                        display: "flex",
                        gap: 10,
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
                                borderRadius: 10,
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
                                borderRadius: 10,
                            }}
                            onClick={() => {
                                setDataUpdate(record);
                                setOpenUpdate(true);
                            }}
                        />
                    </Tooltip>

                    <Popconfirm
                        title="Xóa người dùng"
                        description="Bạn có chắc chắn muốn xóa người dùng này?"
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
                                    border: "1px solid #ffccc7",
                                    borderRadius: 10,
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
                    dataSource={dataUser}
                    rowKey="id"
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showTotal: (total) => `Tổng ${total} người dùng`,
                    }}
                    scroll={{ x: 1200 }}
                />
            </div>
            <UserDetail
                dataDetail={dataDetail}
                setDataDetail={setDataDetail}
                openDetail={openDetail}
                setOpenDetail={setOpenDetail}
            />
            <UpdateUserForm
                openUpdate={openUpdate}
                setOpenUpdate={setOpenUpdate}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadUser={loadUser} />
        </>
    );
};