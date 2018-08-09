import { Layout, Menu, Icon } from 'antd';
import { connect } from 'dva';
import React from 'react';
import style from './app.less';
import NProgress from 'nprogress';
import { Link } from 'dva/router';

const { Header, Content, Footer, Sider } = Layout;

NProgress.start();

class App extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    let { children } = this.props;
    let contentHeight = document.body.clientHeight - 64 - 60;

    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className={style.logo} />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Link to="/index">
                <Icon type="desktop" />
                <span>工作台</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/dashboard">
                <Icon type="pie-chart" />
                <span>仪表盘</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="copy" />
              <span>员工档案</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <div className={style.headerBox}>
              <div className={style.headerItem}>
                <Icon
                  className={style.trigger}
                  type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                  onClick={this.toggle}
                />
              </div>
              <div className={style.headerItem + ' ' + style.userHeader}>
                <span className={style.userInfo}>
                  <Icon type="user" /><span>蒙扎特</span>
                </span>
              </div>
            </div>

          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: contentHeight }}>
            {children}
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