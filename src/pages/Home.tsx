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
      <Header style={{ display: 'flex', alignItems: 'center', justifyContent:'space-between' }}>
        <div className="demo-logo" />
        <Title level={2} style={{ color: '#ffffff',paddingTop:10,paddingRight : 10, textAlign: "center", fontSize: "30px"  }} >HOME</Title>
        
        <Button type="primary" onClick={handleLogout} style={{justifySelf: 'end'}}>
          Logout
        </Button>
      </Header>
               <div style={{ padding: ' 48px' }}>  
          <Layout
          style={{ padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG }}
        >
    
         <Content style={{ padding: '48px', alignItems: 'center', justifyContent:'space-between'}}>
          {contextHolder}
          <Row gutter={[16, 16]}>
                {(userRole === "Admin" || userRole ==="Product Owner") && (
                <Col span={8}>  
                  <Card style={{ width: 240, height:150}} title="Create Feature">
                    <Button type="link" onClick={handleCreateFeature}>
                      <PlusOutlined style={{ fontSize: '40px',justifyContent : "center"} }/>
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
                    style={{ width: 240, height:150, padding : 20,justifyContent : "center" }}>
                      <Meta title={feature?.name.toUpperCase()} />
                  </Card>
                </Col>
              ))}
              </Row>
          
         </Content>
      </Layout>
       </div>
    </Layout>

  );
};

export default Home;

