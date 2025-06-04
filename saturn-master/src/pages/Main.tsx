import React, { useState } from 'react';
import { Button,Modal,Typography, Layout, Menu, theme,Card, Row, Col ,Flex, MenuProps  } from 'antd';
import Login from './Login'; 
import Register from './Register';

const { Header, Content,Sider } = Layout;

const { Title } = Typography;

type MenuItem = Required<MenuProps>['items'][number];

const items : MenuItem[] =[
    {
        label:"about us",
        key:'mail'
    }
]


const Main: React.FC = () => {
  const handleLogout = () => {
    localStorage.removeItem("user_id");
    window.location.href = "/login";
  };

 
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  
  const [isRegistermodalVisible, setIsRegistermodalVisible] = useState(false);
 
  const handleLogin = () => {
    setIsLoginModalVisible(true);
  };
  const handleCancel = () => {
    setIsLoginModalVisible(false);
    setIsRegistermodalVisible(false);
  }
const handleRegister =()=>{
    setIsRegistermodalVisible(true);
}

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
     <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Title level={2} style={{ color: '#ffffff',paddingTop:10,paddingRight : 10, textAlign: "center" }} >Logo</Title>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['0']}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
        <Flex gap="small" wrap>
        <Button type="primary" onClick={handleLogin}>
          Login
        </Button>
          <Modal
       closable={{ 'aria-label': 'Custom Close Button' }}
        open={isLoginModalVisible}
        onCancel={handleCancel}
      >
        <Login />
      </Modal>
      <Button type="primary" onClick={handleRegister}>
          Register
        </Button>
          <Modal
       closable={{ 'aria-label': 'Custom Close Button' }}
        open={isRegistermodalVisible}
        onCancel={handleCancel}
      >
        <Register />
      </Modal>
      </Flex>
      </Header>
               <div style={{ padding: ' 48px' }}>  
          <Layout
          style={{ padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG ,minHeight :"550px"}}
        >

      <Content style={{ padding: '48px' }}>
        <Layout
                  style={{ padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG }}
                >
                    <Flex gap ="medium" wrap >
  <h1 >Team voyagers</h1>
      <p >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
     
</Flex>
     </Layout>
      
      </Content>
      </Layout>
       </div>
    </Layout>

  );
};

export default Main;

