import { Divider, Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { getAccountAPI, loginUserAPI } from "../../services/api.auth.js";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth.context.jsx";
import { NotifyContext } from "../../contexts/notify.context.jsx";
import "../../styles/login.css";

const LoginPage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { setUser } = useContext(AuthContext);
    const { api, contextHolder } = useContext(NotifyContext);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const res = await loginUserAPI(values.email, values.password);
            const token = res?.data?.access_token;

            if (!token) throw new Error("No access token returned");

            localStorage.setItem("access_token", token);

            const userRes = await getAccountAPI();
            const user = userRes?.data?.user || null;

            setUser(user);
            localStorage.setItem("user", JSON.stringify(user));

            api.success({
                message: "Đăng nhập thành công",
                description: res?.message || "Chào mừng bạn trở lại!",
                duration: 1.5,
            });

            setTimeout(() => {
                if (user?.role?.name === "ADMIN") navigate("/admin");
                else navigate("/");
            }, 800);

        } catch (error) {
            if (error.response?.data?.errors && error.response.data.errors.length > 0) {
                const formErrors = error.response.data.errors.map(err => ({
                    name: err.field.replace('body.', ''),
                    errors: [err.message],
                }));
                form.setFields(formErrors);
            } else {
                const errorMessage = error.response?.data?.message ||
                    error.message ||
                    "Đã có lỗi xảy ra";
                api.error({
                    message: "Thất Bại",
                    description: errorMessage,
                    duration: 3,
                });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="login-container">
                <div className="login-box">
                    <h2 className="login-title">Đăng nhập</h2>
                    <p className="login-subtitle">Chào mừng bạn trở lại 👋</p>
                    <Form form={form} layout="vertical" onFinish={onFinish}>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: "Email không được để trống!" },
                                { type: "email", message: "Email không đúng định dạng!" },
                            ]}
                        >
                            <Input size="large" placeholder="example@gmail.com" />
                        </Form.Item>
                        <Form.Item
                            label="Mật khẩu"
                            name="password"
                            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
                        >
                            <Input.Password
                                size="large"
                                placeholder="Nhập mật khẩu"
                                onKeyDown={(e) => e.key === "Enter" && form.submit()}
                            />
                        </Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-btn"
                            loading={loading}
                        >
                            Đăng nhập
                        </Button>
                    </Form>
                    <Divider />
                    <div className="login-footer">
                        Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;