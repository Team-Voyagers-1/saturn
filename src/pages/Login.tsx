import React from "react";
import { Form, Input, Button, message, Card, Typography } from "antd";
import axios from "axios";

const { Title } = Typography;

interface LoginFormValues {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const onFinish = async (values: LoginFormValues) => {
    try {
      const res = await axios.post("http://localhost:8000/api/login/", values);
      message.success(res.data.message);
      localStorage.setItem("user_id", res.data.user_id);
      window.location.href = "/";
    } catch (err: any) {
      message.error(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}>
      <Card title={<Title level={3}>Login</Title>} style={{ width: 400 }}>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
