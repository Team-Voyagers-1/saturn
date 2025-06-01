import React, { useState } from "react";
import { Form, Input, Button, message,Typography, Upload } from "antd";
import axios from "axios";
import { UploadOutlined } from "@ant-design/icons";

interface FormValues {
  name: string;
  file: File;
}

const CreateFeature: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values: FormValues) => {
    setLoading(true);
    if(values.file === null){
        message.error('Please upload a file.');
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:8000/api/create/",
        values,
      );
      message.success(res.data.message);
      window.location.href = "/feature";
      form.resetFields();
    } catch (err: any) {
      message.error(err.response?.data?.error || "Failed to create Feature");
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
        label="Name"
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
          beforeUpload={() => false}
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
