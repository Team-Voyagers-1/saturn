import React, { useState } from "react";
import { Form, Input, Button, message, Card, Typography, Select } from "antd";
import axios from "axios";

const { Title } = Typography;

interface FormValues {
  username: string;
  useremail:  string;
  password: string;
}

const { Option } = Select;


const Register: React.FC = ({messageApi}) => {
  
  const [loading, setLoading] = useState(false);
  
  const [selectedRole, setSelectedRole] =  useState<string | undefined>(undefined);
 
  const handleRoleChange = (value: string) => {
    setSelectedRole(value);
  };

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'User registered',
    });
  };
  const error = (errorMessage) => {
    messageApi.open({
      type: 'error',
      content: errorMessage,
    });
  };
 
  const onFinish = async (values: FormValues) => {
    setLoading(true);
    try {
      console.log(values);
      const res = await axios.post(
        "http://127.0.0.1:8000/api/users/register/",
        values,
      );
      success();
      setTimeout(()=>{ window.location.href= "/main";},1000)
     

    } catch (err: any) {

      error(err.response.data.error);
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
            rules={[{ required: true , message: "Please input your username!"}]}>
            <Input />
          </Form.Item>
          <Form.Item
              name="role"
              label="Role"
              rules={[{ required: true, message: 'Please select a role' }]}
            >
                
              <Select placeholder="Select a role" onChange={handleRoleChange}>
                 <Option value="Admin">Admin</Option>
                 <Option value="Product Owner">Product Owner</Option>
                 <Option value="Scrum Master">Scrum Master</Option>
                 <Option value="BA Lead">Business Analyst</Option>
                 <Option value="Dev Lead">Dev Lead</Option>
                 <Option value="QA Lead">QA Lead</Option>

              </Select>
          </Form.Item>
          {selectedRole === "Admin" && (
          <Form.Item
            name="useremail"
            label="Useremail"
            rules={[{ required: true, type: "email", message: "Please input a valid email!" }]}>
            <Input />
          </Form.Item>)}
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true , message: "Please input your password!"}]}>
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
