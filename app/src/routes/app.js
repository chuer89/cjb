import { Layout, Menu, Icon } from 'antd';
import { connect } from 'dva';
import React from 'react';
import style from './app.less';

const { Header, Content, Footer, Sider } = Layout;

class App extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  render() {
    let { children } = this.props;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className={style.logo} />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <Icon type="desktop" />
              <span>工作台</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="pie-chart"/>
              <span>仪表盘</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="user" />
              <span>员工档案</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            匠 ©2018
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default connect()(App);