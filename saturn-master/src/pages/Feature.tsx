import React, { useState } from "react";
import {
  Typography,
  Button,
  Modal,
  Form,
  Upload,
  Select,
  message,
  Input,
  Card,
  Row,
  Col,
  Layout,
  Menu,
  theme
} from "antd";

import { useLocation, useNavigate } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const { Title } = Typography;
const { Header, Content, Sider } = Layout;
const items = Array.from({ length: 4 }).map((_, index) => ({
  key: index + 1,
  label: `nav ${index + 1}`,
}));

const CreateFeature: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;
  const [file, setFile] = useState<File | null>(null);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [modalVisible, setModalVisible] = useState(false);
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [statusForm] = Form.useForm();

  const [showEpic, setShowEpic] = useState(!data.epic_sheet);
  const [showStory, setShowStory] = useState(!!data.epic_sheet);

  const initialType = showEpic ? "Epic" : showStory ? "Story" : undefined;

  const handleOpen = () => {
    setModalVisible(true);
    form.setFieldsValue({ type: initialType });
  };

  const handleClose = () => {
    setModalVisible(false);
    form.resetFields();
  };

  const handleStatusOpen = () => {
    setStatusModalVisible(true);
  };

  const handleStatusClose = () => {
    setStatusModalVisible(false);
    statusForm.resetFields();
  };

  const onPanelClick = async (type: string) => {
    try {
      await axios.post("http://127.0.0.1:8000/api/stories/get-stories/", {
        user_id: localStorage.getItem("user_id"),
        handle: data.handle,
        issue_type: type,
      });
      message.success(`${type} panel clicked!`);
    } catch (err: any) {
      message.error("Failed to send panel click event");
    }
  };

  const onFinish = async (values: any) => {
    const formData = new FormData();
    formData.append("handle", data.handle);

    if (showEpic) {
      formData.append("epic_sheet", file);
    } else {
      formData.append("story_sheet", file);
    }

    try {
      setLoading(true);

      const res = await axios.post("http://127.0.0.1:8000/api/widgets/update_feature/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (!res.data.epic_sheet) {
        setShowEpic(true);
        setShowStory(false);
      } else {
        setShowEpic(false);
        setShowStory(true);
      }

      message.success(res.data.message);
      handleClose();
    } catch (err: any) {
      message.error(err.response?.data?.error || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const onStatusSubmit = async (values: any) => {
    try {
      await axios.post("http://127.0.0.1:8000/api/widgets/status_update/", {
        handle: data.handle,
        status: values.status,
        comments: values.comments,
      });
      message.success("Status updated successfully");
      handleStatusClose();
    } catch (err: any) {
      message.error("Failed to update status");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    window.location.href = "/main";
  };

  const handleGenerate = async (type: "epic" | "story") => {
    try {
      if (type === "epic") {
        await axios.post(`http://127.0.0.1:8000/api/stories/generate-epics/`, {
          handle: data.handle,
        });
      } else {
        await axios.post(`http://127.0.0.1:8000/api/stories/generate-stories/`, {
          handle: data.handle,
        });
      }

      message.success(`${type.charAt(0).toUpperCase() + type.slice(1)} generated successfully`);
    } catch (err: any) {
      message.error(err.response?.data?.error || `Failed to generate ${type}`);
    }
  };

  const handleSetConfigs = () => {
    navigate("/config");
  };

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Title level={2} style={{ color: '#ffffff', paddingTop: 10, paddingRight: 10, textAlign: "center" }}>Home Page</Title>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
        <Button type="primary" onClick={handleLogout}>
          Logout
        </Button>
      </Header>
      <div style={{ padding: '48px' }}>
        <Layout
          style={{ padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG }}
        >
          <Sider style={{ background: colorBgContainer }} width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
              items={items}
            />
          </Sider>
          <Content style={{ padding: '48px' }}>
            <div style={{ padding: 20, position: "relative" }}>
              <Button
                type="primary"
                style={{ position: "absolute", top: 10, right: 100 }}
                onClick={handleSetConfigs}
              >
                Set Configs
              </Button>
              <Button
                type="primary"
                style={{ position: "absolute", top: 10, right: 10 }}
                onClick={handleOpen}
              >
                Upload
              </Button>

              <Title level={2} style={{ textAlign: "center" }}>{data.name}</Title>

              <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginBottom: "20px" }}>
                <Button type="primary" onClick={() => handleGenerate("epic")}>Generate Epic</Button>
                <Button type="primary" onClick={() => handleGenerate("story")}>Generate Story</Button>
              </div>

              <Row gutter={16} justify="center" style={{ marginTop: 20 }}>
                <Col span={6}><Card hoverable onClick={() => onPanelClick("Feature")}>Epic</Card></Col>
                <Col span={6}><Card hoverable onClick={() => onPanelClick("Story")}>Story</Card></Col>
                <Col span={6}><Card hoverable onClick={() => onPanelClick("File")}>File</Card></Col>
              </Row>

              <Button type="primary" block onClick={handleStatusOpen} style={{ display: "block", margin: "20px auto", width: "120px" }}>Update</Button>

              <Modal title="Upload Feature" open={modalVisible} onCancel={handleClose} footer={null} destroyOnClose>
                <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{ type: initialType }}>
                  <Form.Item label="Select Type" name="type" rules={[{ required: true, message: "Please select a type" }]}> 
                    <Select placeholder="Select type">
                      {showEpic && <Select.Option value="Epic">Epic</Select.Option>}
                      {showStory && <Select.Option value="Story">Story</Select.Option>}
                      <Select.Option value="Details">Details</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label="Upload File" name="file" valuePropName="file" rules={[{ required: true, message: "Please select a file" }]}> 
                    <Upload beforeUpload={(file) => { setFile(file); return false; }} maxCount={1}>
                      <Button icon={<UploadOutlined />}>Select File</Button>
                    </Upload>
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} block>Submit</Button>
                  </Form.Item>
                </Form>
              </Modal>

              <Modal open={statusModalVisible} onCancel={handleStatusClose} footer={null} destroyOnClose>
                <Form form={statusForm} layout="vertical" onFinish={onStatusSubmit}>
                  <Form.Item label="Status" name="status" rules={[{ required: true, message: "Please select a status" }]}> 
                    <Select placeholder="Select status">
                      <Select.Option value="Approved">Approved</Select.Option>
                      <Select.Option value="In Review">In Review</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label="Comments" name="comments" rules={[{ required: true, message: "Please enter comments" }]}> 
                    <Input.TextArea rows={3} placeholder="Enter your comments here" />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" block>Submit</Button>
                  </Form.Item>
                </Form>
              </Modal>
            </div>
          </Content>
        </Layout>
      </div>
    </Layout>
  );
};

export default CreateFeature;