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
  Select,
  message,
  Space,
} from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";

const { Title } = Typography;
const roles = ["Product Owner", "Scrum Master", "Dev Lead", "BA Lead", "QA Lead"];

const Config: React.FC = () => {
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);
  const [isSubTaskModalVisible, setIsSubTaskModalVisible] = useState(false);
  const [userForm] = Form.useForm();
  const [subTaskForm] = Form.useForm();

  const handleUserSubmit = async () => {
    try {
      const values = await userForm.validateFields();
      const payload = roles.map((role) => ({
        role,
        email_id: values[role],
      }));

      console.log("User Roles Payload:", payload);
      message.success("Roles updated successfully");
      userForm.resetFields();
      setIsUserModalVisible(false);
    } catch (err) {
      message.error("Please enter valid email IDs for all roles");
    }
  };

  const handleSubTaskSubmit = async () => {
    try {
      const values = await subTaskForm.validateFields();
      const payload = values.subtasks.map((task: any) => ({
        summary: task.summary,
        assignee: task.assignee,
        sla: task.sla,
      }));

      console.log("Sub Task Payload:", payload);
      message.success("Sub tasks saved successfully");
      subTaskForm.resetFields();
      setIsSubTaskModalVisible(false);
    } catch (err) {
      message.error("Please fill all Sub Task fields correctly");
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
          <Card
            title="Sub Task"
            bordered
            hoverable
            onClick={() => setIsSubTaskModalVisible(true)}
          >
            Configure Sub Task Settings
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Field" bordered hoverable>
            Configure Field Settings
          </Card>
        </Col>
      </Row>

      {/* User Roles Modal */}
      <Modal
        title="Configure User Roles"
        open={isUserModalVisible}
        onCancel={() => setIsUserModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        <Form form={userForm} layout="vertical">
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
            <Button type="primary" onClick={handleUserSubmit}>
              Set
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Sub Task Modal */}
      <Modal
        title="Configure Sub Tasks"
        open={isSubTaskModalVisible}
        onCancel={() => setIsSubTaskModalVisible(false)}
        footer={null}
        destroyOnClose
        width={750}
      >
        <Form form={subTaskForm} layout="vertical" name="subtask_form">
          <Form.List name="subtasks">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "summary"]}
                      rules={[{ required: true, message: "Enter Summary" }]}
                    >
                      <Input placeholder="Summary" style={{ width: 200 }} />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, "assignee"]}
                      rules={[{ required: true, message: "Select Assignee" }]}
                    >
                      <Select placeholder="Assignee" style={{ width: 160 }}>
                        {roles.map((role) => (
                          <Select.Option key={role} value={role}>
                            {role}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, "sla"]}
                      rules={[{ required: true, message: "Enter SLA" }]}
                    >
                      <Input placeholder="SLA" style={{ width: 120 }} />
                    </Form.Item>

                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                    style={{ width: "150px"}}
                  >
                    Add Sub Task
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.Item style={{ textAlign: "center", marginTop: 24 }}>
            <Button type="primary" onClick={handleSubTaskSubmit}>
              Set
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Config;
