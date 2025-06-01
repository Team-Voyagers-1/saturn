import React from "react";
import { Typography } from "antd";

const { Title } = Typography;

const CreateFeature: React.FC = () => {
 
  return (
    <div>
    <Title level={2} style={{paddingTop:10,paddingRight : 10, textAlign: "center" }} >Feature Details Page</Title>
    </div>
  );
};

export default CreateFeature;