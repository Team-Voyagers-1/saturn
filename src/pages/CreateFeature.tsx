import React, { useState } from "react";
import { Form, Input, Button, message,Typography, Upload } from "antd";
import axios from "axios";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface FormValues {
  name: string;
  file: File;
}

const CreateFeature: React.FC = ({messageApi}) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();


  const error = (errorMessage) => {
    messageApi.open({
      type: 'error',
      content: errorMessage,
    });
  };

  const onFinish = async (values: FormValues) => {
    setLoading(true);
    if (!file) {
          message.error("Please upload a file.");
          return;
    }
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("file", file);
      const res = await axios.post(
        "http://127.0.0.1:8000/api/widgets/upload/",
        formData,
      );
      const featureHandle  = "new-feature";
      navigate(`/${featureHandle}`, { state: res.data });
      form.resetFields();
    } catch (err: any) {
      error(err.response?.data?.error || "Failed to create Feature");
    } finally {
      setLoading(false);
    }
  };

   const onFileChange = (values :FormValues, newFile: File ) => {
    // Only single file to be uploaded
     setLoading(true);
     values.file=newFile;
     setLoading(false);
  };

  return (
    <Form
      form={form}
      name="CreateFeature"
      layout="vertical"
      onFinish={onFinish}
      style={{ maxWidth: 400 }}
    >
          <Form.Item
        label="Feature name"
        name="name"
        rules={[
          { required: true, message: 'Please input your name!' } ]}
      >
        <Input placeholder="Enter your name" />
      </Form.Item>
      <Form.Item
        label="Upload File"
        required
      >
        <Upload
          beforeUpload={(file) => {
              setFile(file);
              return false;
          }}
          maxCount={1}
        >
          <Button icon={<UploadOutlined />}>Select File</Button>
        </Upload>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateFeature;
