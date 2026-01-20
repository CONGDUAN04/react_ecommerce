import { Card, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined, ShoppingOutlined, ArrowRightOutlined } from "@ant-design/icons";

const Dashboard = ({ dataDashboard }) => {
    const cardData = [
        {
            title: "Tổng người dùng",
            count: dataDashboard.countUser ?? 0,
            icon: <UserOutlined />,
            link: "/admin/users",
            color: "#1890ff",
        },
        {
            title: "Tổng sản phẩm",
            count: dataDashboard.countProduct ?? 0,
            icon: <ShoppingOutlined />,
            link: "/admin/products",
            color: "#52c41a",
        },
    ];

    return (
        <div style={{ padding: 24 }}>
            <Card style={{ borderRadius: 16, marginBottom: 24 }}>
                <p style={{ color: "#8c8c8c", fontSize: 14, marginBottom: 24 }}>
                    Tổng quan hệ thống
                </p>

                <Row gutter={[16, 16]}>
                    {cardData.map((card, index) => (
                        <Col key={index} xs={24} sm={12} md={12} lg={8} xl={6}>
                            <Card
                                hoverable
                                style={{
                                    borderRadius: 12,
                                    height: "100%",
                                    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                                }}
                                bodyStyle={{ padding: 24 }}
                            >
                                <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
                                    <div
                                        style={{
                                            width: 48,
                                            height: 48,
                                            borderRadius: 12,
                                            background: `${card.color}15`,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: 24,
                                            color: card.color,
                                            marginRight: 12,
                                        }}
                                    >
                                        {card.icon}
                                    </div>
                                    <div>
                                        <div style={{ fontSize: 14, color: "#8c8c8c" }}>{card.title}</div>
                                        <div style={{ fontSize: 26, fontWeight: 600 }}>
                                            {card.count.toLocaleString()}
                                        </div>
                                    </div>
                                </div>

                                <Link to={card.link} style={{ color: card.color, fontWeight: 500 }}>
                                    Xem chi tiết <ArrowRightOutlined />
                                </Link>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Card>

            <Card style={{ borderRadius: 16, textAlign: "center" }}>
                <h3 style={{ marginBottom: 8 }}>Chào mừng đến với Admin Dashboard</h3>
                <p style={{ color: "#8c8c8c" }}>
                    Sử dụng menu bên trái để quản lý người dùng, sản phẩm và các chức năng khác
                </p>
            </Card>
        </div>
    );
};

export default Dashboard;
