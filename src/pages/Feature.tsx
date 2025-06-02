import React, { useState } from "react";
import {
  Typography,
  Button,
  Modal,
  Form,
  Input,
  Upload,
  Select,
  message,
} from "antd";
import { useLocation } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const { Title } = Typography;

const CreateFeature: React.FC = () => {
  const location = useLocation();
  const data = location.state;

  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const showEpic = !data.epic;
  const showStory = data.epic;

  const initialType = showEpic ? "Epic" : showStory ? "Story" : undefined;

  const handleOpen = () => {
    setModalVisible(true);
    form.setFieldsValue({ type: initialType });
  };

  const handleClose = () => {
    setModalVisible(false);
    form.resetFields();
  };

  const onFinish = async (values: any) => {
    const formData = new FormData();
    formData.append("handle", data.handle);

    if(showEpic){
            formData.append("epic", values.file.file);
    }else{
            formData.append("story", values.file.file);
    }

    try {
      setLoading(true);
      const res = await axios.post("http://127.0.0.1:8000/api/widgets/update/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      message.success(res.data.message);
      handleClose();
    } catch (err: any) {
      message.error(err.response?.data?.error || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20, position: "relative" }}>

      <Button
        type="primary"
        style={{ position: "absolute", top: 10, right: 10 }}
        onClick={handleOpen}
      >
        Upload
      </Button>


      <Title level={2} style={{ textAlign: "center" }}>
        {data.name}
      </Title>


      <Modal
        title="Upload Feature"
        open={modalVisible}
        onCancel={handleClose}
        footer={null}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ type: initialType }}
        >
          <Form.Item
            label="Select Type"
            name="type"
            rules={[{ required: true, message: "Please select a type" }]}
          >
            <Select placeholder="Select type">
              <Select.Option value="Epic">Epic</Select.Option>
              <Select.Option value="Story">Story</Select.Option>
              <Select.Option value="Details">Details</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Upload File"
            name="file"
            valuePropName="file"
            getValueFromEvent={(e) => e && e.fileList?.[0] && { file: e.fileList[0] }}
            rules={[{ required: true, message: "Please select a file" }]}
          >
            <Upload beforeUpload={() => false} maxCount={1}>
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateFeature;
