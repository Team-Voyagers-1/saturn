import React, { useState } from "react";
import {
  Card,
  Col,
  Row,
  Typography,
  Modal,
  Input,
  Button,
  Form,
  message,
} from "antd";

const { Title } = Typography;

// Unique keys for form field names
const roles =["Product Owner", "Scrum Master", "Dev Lead", "BA Lead", "QA Lead"];

const Config: React.FC = () => {
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      // Map each role to its corresponding email_id
      const payload = roles.map((role) => ({
        role,
        email_id: values[role], // each role has a unique key
      }));

      console.log("Submitted:", payload);

      // Example API call
      // await axios.post("http://localhost:8000/api/config/set-users/", payload);

      message.success("Roles updated successfully");
      form.resetFields();
      setIsUserModalVisible(false);
    } catch (err) {
      message.error("Please enter valid email IDs for all roles");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <Title level={2} style={{ textAlign: "center" }}>
        Configuration Settings
      </Title>

      <Row gutter={24} justify="center" style={{ marginTop: 30 }}>
        <Col span={6}>
          <Card
            title="User"
            bordered
            hoverable
            onClick={() => setIsUserModalVisible(true)}
          >
            Configure User Settings
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Sub Task" bordered hoverable>
            Configure Sub Task Settings
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Field" bordered hoverable>
            Configure Field Settings
          </Card>
        </Col>
      </Row>

      <Modal
        title="Configure User Roles"
        open={isUserModalVisible}
        onCancel={() => setIsUserModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          {roles.map((role) => (
            <Row key={role} gutter={16} align="middle" style={{ marginBottom: 16 }}>
              <Col span={6}>
                <strong>{role}</strong>
              </Col>
              <Col span={18}>
                <Form.Item
                  name={role}
                  rules={[
                    { required: true, message: `Enter email for ${role}` },
                    { type: "email", message: "Enter a valid email" },
                  ]}
                >
                  <Input placeholder={`Enter ${role} email`} />
                </Form.Item>
              </Col>
            </Row>
          ))}

          <Form.Item style={{ textAlign: "center", marginTop: 24 }}>
            <Button type="primary" onClick={handleSubmit}>
              Set
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Config;
