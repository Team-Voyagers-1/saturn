import React, { useState } from "react";
import { Form, Input, Button, message, Card, Typography, Select } from "antd";
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
      console.log(values);
      const res = await axios.post(
        "http://127.0.0.1:8000/api/users/register/",
        values,
      );
      message.success(res.data.message);
      window.location.href = "/login";
    } catch (err: any) {
      message.error(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
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
          <Form.Item
              name="role"
              label="Role"
              rules={[{ required: true, message: 'Please select a role' }]}>
              <Select placeholder="Select a role">
                 <Option value="admin">Admin</Option>
                 <Option value="productOwner">Product Owner</Option>
                 <Option value="scrumMaster">Scrum Master</Option>
                 <Option value="businessAnalyst">Business Analyst</Option>
                 <Option value="devLead">Dev Lead</Option>
              </Select>
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
