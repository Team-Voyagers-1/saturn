import React from "react";
import { Button, Typography } from "antd";

const { Title } = Typography;

const Home: React.FC = () => {
  const handleLogout = () => {
    localStorage.removeItem("user_id");
    window.location.href = "/login";
  };

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <Title level={2}>Welcome to the Home Page</Title>
      <Button type="primary" danger onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default Home;
