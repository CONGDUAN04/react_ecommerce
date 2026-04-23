import { Divider, Button, Form, Input, Row, Col } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { getAccountAPI, loginUserAPI } from "../../services/api.auth.js";
import { useContext } from "react";
import { NotifyContext } from "../../contexts/notify.context.jsx";
import { useAuth } from "../../hooks/useAuth.js";
import { useLoading } from "../../hooks/useLoading.js";
import "../../styles/login.css";
import { handleApiError, handleApiSuccess } from "../../utils/apiHandler.js";

const LoginPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { setUser, callAuth } = useAuth();
  const { api } = useContext(NotifyContext);
  const { loading } = useLoading();

  const onFinish = async (values) => {
    if (loading) return;

    try {
      const res = await callAuth(
        () => loginUserAPI(values.email, values.password),
        { showLoading: false },
      );

      const token = res?.data?.access_token;
      if (!token) throw new Error("Token không hợp lệ");

      localStorage.setItem("access_token", token);

      const userRes = await callAuth(() => getAccountAPI(), {
        showLoading: false,
      });

      const user = userRes?.data;
      if (!user) throw new Error("Không lấy được user");

      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));

      handleApiSuccess(api, "Đăng nhập thành công!");
      const role = user?.role?.name;

      navigate(role === "ADMIN" || role === "SUPER_ADMIN" ? "/admin" : "/");
    } catch (err) {
      handleApiError(api, err, form);
    }
  };

  return (
    <div className="login-container">
      <Row
        justify="center"
        align="middle"
        style={{ minHeight: "100vh", width: "100%" }}
      >
        <Col
          xs={24}
          sm={20}
          md={14}
          lg={10}
          xl={8}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div className="login-box">
            <h2 className="login-title">Đăng nhập</h2>
            <p className="login-subtitle">Chào mừng bạn trở lại 👋</p>

            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              disabled={loading}
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Email không được để trống!" },
                  { type: "email", message: "Email không đúng định dạng!" },
                ]}
              >
                <Input size="large" placeholder="example@gmail.com" autoFocus />
              </Form.Item>

              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[
                  { required: true, message: "Mật khẩu không được để trống!" },
                  { min: 6, message: "Mật khẩu tối thiểu 6 ký tự!" },
                ]}
              >
                <Input.Password size="large" placeholder="Nhập mật khẩu" />
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="login-btn"
                block
              >
                Đăng nhập
              </Button>
            </Form>

            <Divider />

            <div className="login-footer">
              Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default LoginPage;
