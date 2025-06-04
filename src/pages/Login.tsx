import React from "react";
import { Form, Input, Button, message, Card, Typography } from "antd";
import axios from "axios";

const { Title } = Typography;

interface LoginFormValues {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = async (values: LoginFormValues) => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/users/login/", values);
      message.success(res.data.message);
      localStorage.setItem("user_id", res.data.user_id);
      localStorage.setItem("user_role",res.data.role);
      window.location.href = "/home";
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || "Login failed";
      if (errorMessage === "Invalid credentials") {
            form.setFields([
              {
                name: "password",
                errors: ["Incorrect username or password"],
              },
            ]);
        console.log("Fields error:", form.getFieldsError());
      } else {
            message.error(errorMessage);
      }
    }
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
      <Card title={<Title level={3}>Login</Title>} style={{ width: 400 }}>
        <Form form={form} layout="vertical" onFinish={onFinish} validateTrigger="onSubmit">
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
