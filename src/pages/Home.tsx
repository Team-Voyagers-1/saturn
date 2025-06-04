import React, { useEffect, useState } from "react";
import { Button,Typography, Layout, Menu, theme,Card, Row, Col ,Flex, Modal,message, Spin  } from 'antd';
import { PlusOutlined } from "@ant-design/icons";
import CreateFeature from "./CreateFeature";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const { Header, Content,Sider } = Layout;

const { Title } = Typography;
const { Meta } = Card;

const items = Array.from({ length: 4 }).map((_, index) => ({
  key: index + 1,
  label: `nav ${index + 1}`,
}));

const Home: React.FC = () => {
  const {token: { colorBgContainer, borderRadiusLG },} = theme.useToken();
  const [messageApi, contextHolder] = message.useMessage();
  const [isCreateFeature,setIsCreateFeature ] = useState(false);
  const [loading, setLoading] = useState(false);
  const [featureHandle, setFeatureHandle] = useState('');
  const [featureList, setFeatureList] = useState([]);
  const userRole = localStorage.getItem("user_role");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllFeatures = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/widgets/all-features/'); 
        setFeatureList(res.data);
        message.success(res.data.message);
      } catch (err : any) {
        message.error(err.response?.data?.error || "Failed to load features")
      } finally {
        setLoading(false);
      }
    };
  fetchAllFeatures();
  }, []);

  const handleFeatureClick = async(handle : string) => {
    setLoading(true);
    setFeatureHandle(handle);
    try{
       if (!featureHandle) {
        message.error('Feature handle not found.');
        setLoading(false);
        return;
      }
       const res = await axios.get(`http://127.0.0.1:8000/api/widgets/feature-details/?handle=${featureHandle}`);
       navigate(`/${featureHandle}`, { state: res.data });
    }
    catch(err: any){
    message.error(err.response?.data?.error || "Failed to load Feature Details");
    }finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    window.location.href = "/main";
  };

  const handleCreateFeature = ()=> {
    setIsCreateFeature(true);
  };

    const handleCancel = ()=> {
    setIsCreateFeature(false);
  };

   if (loading) {
    return <Spin tip="Loading cards..." size="large" />;
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
          {contextHolder}
            <Flex gap="middle" align="start" vertical>
              <Row gutter={16}>
                {(userRole === "admin" || userRole ==="productOwner") && (
                <Col span={8}>  
                  <Card style={{ width: 240, height:260}} title="Create Feature">
                    <Button type="link" onClick={handleCreateFeature}>
                      <PlusOutlined style={{ fontSize: '60px',justifyContent : "center"} }/>
                    </Button>
                    <Modal closable={{ 'aria-label': 'Custom Close Button' }}
                          open={isCreateFeature}
                          onCancel={handleCancel}
                          footer = {null} >
                      <CreateFeature messageApi={messageApi}/>
                    </Modal>
                  </Card>
                </Col>
              )}
              
              { featureList.map((feature)=>(
                <Col span={8}>  
                  <Card
                    hoverable
                    onClick={()=>handleFeatureClick(feature.handle)}
                    style={{ width: 240, padding : 20 }}>
                      <Meta title={feature?.name} description={feature?.handle} />
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

