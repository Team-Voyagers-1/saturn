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
    Radio,
    Divider,
    Layout
  } from "antd";
  import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
  import { getFieldConfig } from "../fieldDictionary";
  import { useLocation } from "react-router-dom";
  import axios from "axios";


  const { Title } = Typography;
  const { Option } = Select;
  const { Header, Content,Sider } = Layout;

  const roles = ["Product Owner", "Scrum Master", "Dev Lead", "BA Lead", "QA Lead"];

  const Config: React.FC = () => {
    const location = useLocation();
    const handle = location.state?.handle;
    console.log("handleee",handle);

    const [isUserModalVisible, setIsUserModalVisible] = useState(false);
    const [isSubTaskModalVisible, setIsSubTaskModalVisible] = useState(false);
    const [isFieldModalVisible, setIsFieldModalVisible] = useState(false);
    const [selectedFieldType, setSelectedFieldType] = useState<"Epic" | "Story">("Epic");

    const [userForm] = Form.useForm();
    const [subTaskForm] = Form.useForm();
    const [fieldForm] = Form.useForm();

    const handleUserSubmit = async () => {
      try {
        const values = await userForm.validateFields();
        const payload = roles.map((role) => ({
          role,
          email_id: values[role],
        }));
        await axios.post(`http://127.0.0.1:8000/api/configs/role-config/`, {
          handle: handle,
          role_config: payload
        });
        console.log("User Roles Payload:", payload);
        message.success("Roles updated successfully");
        userForm.resetFields();
        setIsUserModalVisible(false);
      } catch {
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
        await axios.post(`http://127.0.0.1:8000/api/configs/subtask-config/`, {
          handle: handle,
          subtask_config : payload
        });
        console.log("Sub Task Payload:", payload);
        message.success("Sub tasks saved successfully");
        subTaskForm.resetFields();
        setIsSubTaskModalVisible(false);
      } catch {
        message.error("Please fill all Sub Task fields correctly");
      }
    };

  

    const handleFieldSubmit = async () => {
      try {
        const values = await fieldForm.validateFields();
    
        await axios.post(`http://127.0.0.1:8000/api/configs/field-config/`, {
          handle: handle,
          field_config: values.fields.map((f: any) => ({
            field_name: f.key,
            field_value: f.value,
          }))
        });
     
        message.success("Field configuration saved");
        fieldForm.resetFields();
        setIsFieldModalVisible(false);
      } catch {
        message.error("Please fill all fields");
      }
    };
    

    const currentFields = getFieldConfig(selectedFieldType.toLowerCase() as "epic" | "story");

    return (
      <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Title level={2} style={{ color: '#ffffff',paddingTop:10,paddingRight : 10, textAlign: "center" }}>
          Configuration Settings
        </Title>
      </Header>
  
<Content style={{ padding: '48px' }}>
        <Row gutter={24} justify="center" style={{ marginTop: 30 }}>
          <Col span={6}>
            <Card title="User" bordered hoverable onClick={() => setIsUserModalVisible(true)}>
              Configure User Settings
            </Card>
          </Col>
          <Col span={6}>
            <Card title="Sub Task" bordered hoverable onClick={() => setIsSubTaskModalVisible(true)}>
              Configure Sub Task Settings
            </Card>
          </Col>
          <Col span={6}>
            <Card title="Field" bordered hoverable onClick={() => setIsFieldModalVisible(true)}>
              Configure Field Settings
            </Card>
          </Col>
        </Row>
        </Content>

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
                            <Option key={role} value={role}>
                              {role}
                            </Option>
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
                      style={{ width: "150px" }}
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

        {/* Field Config Modal */}
        <Modal
          title="Configure Fields"
          open={isFieldModalVisible}
          onCancel={() => setIsFieldModalVisible(false)}
          footer={null}
          destroyOnClose
          width={800}
        >
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <Radio.Group
              value={selectedFieldType}
              onChange={(e) => setSelectedFieldType(e.target.value)}
            >
              <Radio.Button value="Epic">Epic</Radio.Button>
              <Radio.Button value="Story">Story</Radio.Button>
            </Radio.Group>
          </div>

          <Divider />

          <Form form={fieldForm} layout="vertical" name="field_config_form">
            <Form.List name="fields">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space key={key} style={{ display: "flex", marginBottom: 8 }} align="baseline">
                      <Form.Item
                        {...restField}
                        name={[name, "key"]}
                        rules={[{ required: true, message: "Select field name" }]}
                      >
                        <Select placeholder="Field Name" style={{ width: 180 }}>
                          {currentFields.map((f) => (
                            <Option key={f.key} value={f.key}>
                              {f.key}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>

                      <Form.Item
                        noStyle
                        shouldUpdate={(prev, curr) => prev.fields !== curr.fields}
                      >
                        {() => {
                          const selectedKey = fieldForm.getFieldValue(["fields", name, "key"]);
                          const selectedField = currentFields.find((f) => f.key === selectedKey);

                          if (!selectedField) {
                            return (
                              <Form.Item name={[name, "value"]}>
                                <Input placeholder="Select a field name first" disabled />
                              </Form.Item>
                            );
                          }

                          return selectedField.type === "enum" ? (
                            <Form.Item
                              {...restField}
                              name={[name, "value"]}
                              rules={[{ required: true, message: "Select field value" }]}
                            >
                              <Select placeholder="Field Value" style={{ width: 180 }}>
                                {selectedField.values.map((v) => (
                                  <Option key={v} value={v}>
                                    {v}
                                  </Option>
                                ))}
                              </Select>
                            </Form.Item>
                          ) : (
                            <Form.Item
                              {...restField}
                              name={[name, "value"]}
                              rules={[{ required: true, message: "Enter field value" }]}
                            >
                              <Input placeholder="Field Value" style={{ width: 180 }} />
                            </Form.Item>
                          );
                        }}
                      </Form.Item>

                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}

                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      icon={<PlusOutlined />}
                      style={{ width: "160px" }}
                    >
                      Add Field
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>

            <Form.Item style={{ textAlign: "center", marginTop: 24 }}>
              <Button type="primary" onClick={handleFieldSubmit}>
                Set
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        </Layout>
    );
  };

  export default Config;
