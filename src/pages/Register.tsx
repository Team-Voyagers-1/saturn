import React, { useState } from "react";
import { Form, Input, Button, message, Card, Typography } from "antd";
import axios from "axios";

const { Title } = Typography;

interface FormValues {
  username: string;
  password: string;
}

const Register: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: FormValues) => {
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:8000/api/register/",
        values,
      );
      message.success(res.data.message);
    } catch (err: any) {
      message.error(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}>
      <Card title={<Title level={3}>Register</Title>} style={{ width: 400 }}>
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
          <Button type="primary" htmlType="submit" loading={loading} block>
            Register
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
