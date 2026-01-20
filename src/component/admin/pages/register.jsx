import { Divider, Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { registerUserAPI } from "../../../services/api.services.js";
import { useContext, useState } from "react";
import { NotifyContext } from "../../context/notify.context.jsx";
import "../styles/register.css";

const RegisterPage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { api, contextHolder } = useContext(NotifyContext);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            console.log("Dữ liệu gửi lên:", values);
            const res = await registerUserAPI(values);

            api.success({
                message: "Đăng ký thành công",
                description: res?.message || "Chào mừng bạn đến với hệ thống!",
                duration: 1.5,
            });

            setTimeout(() => {
                navigate("/login");
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
            {contextHolder}
            <div className="register-container">
                <div className="register-box">
                    <h2 className="register-title">Đăng ký tài khoản</h2>
                    <Form form={form} layout="vertical" onFinish={onFinish}>
                        <Form.Item
                            label="Họ và tên"
                            name="fullName"
                            rules={[
                                { required: true, message: "Họ và tên không được để trống" },
                            ]}
                        >
                            <Input size="large" placeholder="Nguyễn Văn A" />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="username"
                            rules={[
                                { required: true, message: "Email không được để trống" },
                                { type: "email", message: "Email không đúng định dạng!" }
                            ]}
                        >
                            <Input size="large" placeholder="example@gmail.com" />
                        </Form.Item>

                        <Form.Item
                            label="Mật khẩu"
                            name="password"
                            rules={[
                                { required: true, message: "Mật khẩu không được bỏ trống" },
                                { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" }
                            ]}
                        >
                            <Input.Password size="large" placeholder="Nhập mật khẩu" />
                        </Form.Item>

                        <Form.Item
                            label="Xác nhận mật khẩu"
                            name="confirmPassword"
                            dependencies={['password']}
                            rules={[
                                { required: true, message: "Vui lòng xác nhận mật khẩu" },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password size="large" placeholder="Nhập lại mật khẩu" />
                        </Form.Item>

                        <Button
                            type="primary"
                            htmlType="submit"
                            className="register-btn"
                            loading={loading}
                        >
                            Đăng ký
                        </Button>
                    </Form>

                    <Divider />

                    <div className="register-footer">
                        Đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RegisterPage;