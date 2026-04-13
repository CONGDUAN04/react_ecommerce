import { Divider, Button, Form, Input, Row, Col } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { registerUserAPI } from "../../services/api.auth.js";
import { useContext } from "react";
import { NotifyContext } from "../../contexts/notify.context.jsx";
import { useAuth } from "../../hooks/useAuth.js";
import { useLoading } from "../../hooks/useLoading.js";
import "../../styles/register.css";
import { handleApiError, handleApiSuccess } from "../../utils/apiHandler.js";

const RegisterPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { callAuth } = useAuth();
  const { api } = useContext(NotifyContext);
  const { loading } = useLoading();
  console.log("API PAGE:", api);
  const onFinish = async (values) => {
    if (loading) return;

    try {
      await callAuth(() => registerUserAPI(values), {
        showLoading: false, // ❗ dùng button loading
      });

      handleApiSuccess(api, "Đăng ký thành công 🎉");

      setTimeout(() => {
        navigate("/login");
      }, 500);
    } catch (err) {
      console.log("OUTER CATCH:", err);
      handleApiError(api, err, form);
    }
  };

  return (
    <div className="register-container">
      <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
        <Col xs={24} sm={20} md={14} lg={10} xl={8}>
          <div className="register-box">
            <h2 className="register-title">Đăng ký tài khoản</h2>
            <p className="register-subtitle">Tạo tài khoản mới 🎉</p>

            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              disabled={loading}
            >
              <Form.Item
                label="Họ và tên"
                name="fullName"
                rules={[
                  { required: true, message: "Không được để trống" },
                  { min: 3, message: "Ít nhất 3 ký tự" },
                ]}
              >
                <Input size="large" placeholder="Nguyễn Văn A" />
              </Form.Item>

              <Form.Item
                label="Email"
                name="username"
                rules={[
                  { required: true, message: "Không được để trống" },
                  { type: "email", message: "Email không đúng định dạng!" },
                ]}
              >
                <Input size="large" placeholder="example@gmail.com" />
              </Form.Item>

              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[
                  { required: true, message: "Không được để trống" },
                  { min: 6, message: "Ít nhất 6 ký tự" },
                ]}
              >
                <Input.Password size="large" placeholder="Nhập mật khẩu" />
              </Form.Item>

              <Form.Item
                label="Xác nhận mật khẩu"
                name="confirmPassword"
                dependencies={["password"]}
                rules={[
                  { required: true, message: "Xác nhận mật khẩu" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("Mật khẩu không khớp"));
                    },
                  }),
                ]}
              >
                <Input.Password size="large" placeholder="Nhập lại mật khẩu" />
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="register-btn"
                block
              >
                Đăng ký
              </Button>
            </Form>

            <Divider />

            <div className="register-footer">
              Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default RegisterPage;
