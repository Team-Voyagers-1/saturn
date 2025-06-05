import React, { useState } from 'react';
import { Button,Modal,Typography, Layout, Menu, theme,Card, Row, Col ,Flex, MenuProps, message  } from 'antd';
import Login from './Login'; 
import Register from './Register';

const { Header, Content,Sider } = Layout;

const { Title } = Typography;

type MenuItem = Required<MenuProps>['items'][number];

const items : MenuItem[] =[
    {
        label:"ABOUT US",
        key:'mail'
    }
]


const Main: React.FC = () => {
  const handleLogout = () => {
    localStorage.removeItem("user_id");
    window.location.href = "/login";
  };

  const [messageApi, contextHolder] = message.useMessage();
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
        <Title level={2} style={{ color: '#ffffff',paddingTop:10,paddingRight : 10, textAlign: "center" }} >VOYEGERS</Title>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['0']}
          items={items}
          style={{ flex: 1, minWidth: 0 , justifyContent: 'end' }}
        />
        <Flex gap="small" wrap>
        
          <Modal
       closable={{ 'aria-label': 'Custom Close Button' }}
        open={isLoginModalVisible}
        onCancel={handleCancel}
        footer = {null}
        
      >
        <Login />
      </Modal>
  
          <Modal
       closable={{ 'aria-label': 'Custom Close Button' }}
        open={isRegistermodalVisible}
        onCancel={handleCancel}
        footer = {null}
      >
        <Register messageApi={messageApi}/>
      </Modal>
      </Flex>
      </Header>
               <div style={{ padding: ' 48px' }}>  
          <Layout
          style={{ padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG ,minHeight :"550px"}}
        >

      <Content style={{ padding: '48px' }}>
      {contextHolder}
        <Layout
                  style={{ padding: '24px 24px', background: colorBgContainer, borderRadius: borderRadiusLG, alignItems : 'center' }}
                >
                   
  <h1 style={{fontSize : '50px',paddingBottom : '20px'}}>Storycraft.Ai</h1>
    <Flex gap="small" wrap>
    <Button type="primary" onClick={handleLogin}  style={{ fontSize: '18px', height: '48px', padding: '0 24px' }}>
            Login
          </Button>
          <Button type="primary" onClick={handleRegister}  style={{ fontSize: '18px', height: '48px', padding: '0 24px' }}>
            Register
          </Button>
          </Flex>
     </Layout>
      
      </Content>
      </Layout>
       </div>
    </Layout>

  );
};

export default Main;

