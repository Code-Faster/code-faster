import { Link, Outlet, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';
import 'antd/dist/antd.variable.min.css';
import {
  ConfigProvider,
  Typography,
  Avatar,
  Button,
  Col,
  Layout,
  Menu,
  Row,
  Space,
  Tooltip,
} from 'antd';
import {
  QuestionCircleTwoTone,
  ProjectOutlined,
  ControlOutlined,
  ArrowUpOutlined,
  GithubOutlined,
  PlusSquareOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';
import icon from '../../assets/icon.svg';
import LoginPage from './pages/Login';
import ProjectPage from './pages/Project';
import RegisterPage from './pages/Login/Register';
import HelloPage from './pages/Hello';
import CustomizePage from './pages/Customize';
import PlusPage from './pages/Plus';
import DocsPage from './pages/Docs';
import TemplatePage from './pages/Template';
import TemplateDatabase from './dbModel/Template';

const { Header, Sider, Content } = Layout;
const { Text } = Typography;
/**
 *
 * @returns
 */
const App = () => {
  /**
   * 潘通2022年流行色
   */
  const bgColor = '#6667AB';
  useEffect(() => {
    // eslint-disable-next-line promise/catch-or-return
    TemplateDatabase.templates.count().then((count: number) => {
      // 添加默认模版路径
      if (count === 0) {
        TemplateDatabase.templates.add({
          /** 模版名称 */
          templateName: 'Springboot_Dubbo_Nacos',
          /** 项目路径 */
          templateDir: 'string',
          /** 作者 */
          owner: 'Code Faster',
          /** 语言类型 1、Java 2、JavaScript */
          type: 1,
          /** 简介 */
          description: 'springboot + dubbo + nacos 微服务项目',
        });
        TemplateDatabase.templates.add({
          /** 模版名称 */
          templateName: 'React_AntDesignPro',
          /** 项目路径 */
          templateDir: 'string',
          /** 作者 */
          owner: 'Code Faster',
          /** 语言类型 1、Java 2、JavaScript */
          type: 2,
          /** 简介 */
          description: 'React + AntDesignPro 实现中后台前端开发',
        });
      }
      return count;
    });
    ConfigProvider.config({
      theme: {
        primaryColor: bgColor,
      },
    });
    return () => {};
  }, []);
  return (
    <Layout style={{ height: '100%' }}>
      <Header className="uDrag" style={{ height: 48 }}>
        <Row style={{ height: 48, lineHeight: '48px' }}>
          <Col span={23} />
          <Col span={1}>
            <Space>
              <Tooltip title="发现新版本">
                <Button
                  type="default"
                  size="small"
                  icon={<ArrowUpOutlined />}
                  style={{ boxShadow: 'none' }}
                />
              </Tooltip>
              <Tooltip title="帮助与客服">
                <Button
                  type="default"
                  size="small"
                  icon={<QuestionCircleTwoTone color={bgColor} />}
                  style={{ boxShadow: 'none' }}
                />
              </Tooltip>
            </Space>
          </Col>
        </Row>
      </Header>
      <Layout>
        <Sider>
          <Row style={{ padding: '5px 0' }}>
            {/* <Avatar
              style={{ backgroundColor: '#f56a00', verticalAlign: 'middle' }}
              size="large"
            >
              Code Faster
            </Avatar> */}
            <Col style={{ paddingLeft: 20, paddingTop: 5 }}>
              <Avatar style={{ backgroundColor: '#f56a00' }} src={icon} />
            </Col>
            <Col style={{ paddingLeft: 15 }}>
              <Text style={{ color: '#fff' }}>Code Faster</Text>
              <br />
              <Text style={{ color: '#ddd', fontSize: 12 }} type="secondary">
                0.0.1
              </Text>
            </Col>
          </Row>
          <Menu defaultSelectedKeys={['1']} mode="inline" theme="dark">
            <Menu.Item key="1" icon={<ProjectOutlined />}>
              <Link to="/">项目</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<ControlOutlined />}>
              <Link to="/customize">自定义</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<PlusSquareOutlined />}>
              <Link to="/plus">插件市场</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<AppstoreOutlined />}>
              <Link to="/template">模版市场</Link>
            </Menu.Item>
            {/*  <Menu.Item key="3" icon={<BugOutlined />}>
              测试
            </Menu.Item>
            <Menu.Item key="4" icon={<CloudUploadOutlined />}>
              部署
            </Menu.Item> */}
            <Menu.Item key="5" icon={<GithubOutlined />}>
              <Link to="/docs">学习Code Faster</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Content
          style={{
            borderTopLeftRadius: '8px',
            background: '#fff',
            overflow: 'hidden',
            padding: '8px',
            boxSizing: 'border-box',
          }}
        >
          <Outlet />
          <Routes>
            <Route path="/" element={<HelloPage />} />
            <Route path="login" element={<LoginPage />}>
              <Route path="register" element={<RegisterPage />} />
            </Route>
            <Route path="project" element={<ProjectPage />} />
            <Route path="customize" element={<CustomizePage />} />
            <Route path="plus" element={<PlusPage />} />
            <Route path="docs" element={<DocsPage />} />
            <Route path="template" element={<TemplatePage />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
