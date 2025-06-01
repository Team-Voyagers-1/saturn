import React, { useState } from "react";
import { Button,Typography, Layout, Menu, theme,Card, Row, Col ,Flex, Modal  } from 'antd';
import { PlusOutlined } from "@ant-design/icons";
import CreateFeature from "./CreateFeature";

const { Header, Content,Sider } = Layout;

const { Title } = Typography;
const { Meta } = Card;

const items = Array.from({ length: 4 }).map((_, index) => ({
  key: index + 1,
  label: `nav ${index + 1}`,
}));


const Home: React.FC = () => {
  const handleLogout = () => {
    localStorage.removeItem("user_id");
    window.location.href = "/main";
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [isCreateFeature,setIsCreateFeature ] = useState(false);

  const handleCreateFeature = ()=> {
    setIsCreateFeature(true);
  };

    const handleCancel = ()=> {
    setIsCreateFeature(false);
  };

  const handleFeatureClick = () => {
    window.location.href = "/feature";
  }

  return (
     <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Title level={2} style={{ color: '#ffffff',paddingTop:10,paddingRight : 10, textAlign: "center" }} >Home Page</Title>
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
               <div style={{ padding: ' 48px' }}>  
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
  

        
            <Flex gap="middle" align="start" vertical>
              <Row gutter={16}>
                <Col span={8}>  
                <Card 
            style={{ width: 240, height:260}}
           title="Create Feature"
          >
            <Button type="link" onClick={handleCreateFeature}>
           <PlusOutlined style={{ fontSize: '60px',justifyContent : "center"} }/>
           </Button>
           <Modal
       closable={{ 'aria-label': 'Custom Close Button' }}
        open={isCreateFeature}
        onCancel={handleCancel}
      >
       <CreateFeature/>
      </Modal>
          </Card>
          </Col>
                {Array.from({ length: 15 }, (_, index) => (
                <Col span={8}>  
                <Card
            hoverable
            onClick={handleFeatureClick}
            style={{ width: 240, padding : 20 }}
            cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
          >
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
          </Col>
   
          ))}
              
          </Row>
          
           </Flex>
         
         
         
      
      </Content>
      </Layout>
       </div>
    </Layout>

  );
};

export default Home;

