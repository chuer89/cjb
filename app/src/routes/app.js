import { Layout, Menu, Icon } from 'antd';
import { connect } from 'dva';
import React from 'react';
import style from './app.less';
import NProgress from 'nprogress';
import { Link } from 'dva/router';

const { Header, Content, Footer, Sider } = Layout;

class App extends React.Component {
  state = {
    collapsed: false,

    defaultSelectedKeys: ['/index'],
    selectedKeys: [],

    menus: [{
      path: '/index',
      icon: 'desktop',
      name: '工作台',
    }, {
      path: '/dashboard',
      icon: 'pie-chart',
      name: '仪表盘',
    }, {
      path: '/record',
      icon: 'copy',
      name: '员工档案',
    }]
  }

  UNSAFE_componentWillMount() {
    let { defaultSelectedKeys } = this.state;
    let { pathname } = this.props.app;
    let selectedKeys = [pathname] || defaultSelectedKeys;

    this.setState({
      selectedKeys,
    });

    NProgress.start();
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    let { children } = this.props;
    let contentHeight = document.body.clientHeight - 64 - 60;
    let { menus, selectedKeys } = this.state;

    // 菜单组件
    let renderMenus = menus.map((item) => {
      return (
        <Menu.Item key={item.path}>
          <Link to={item.path}>
            <Icon type={item.icon} />
            <span>{item.name}</span>
          </Link>
        </Menu.Item>
      )
    });

    // 内容样式
    let contentStyle = {
      // margin: '24px 16px', 
      padding: 24, 
      // background: '#fff', 
      minHeight: contentHeight,
    }

    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className={style.logo} />
          <Menu theme="dark" mode="inline" selectedKeys={selectedKeys}>
            {renderMenus}
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
          <Content style={contentStyle}>
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

export default connect((({ app }) => ({
  app,
})))(App);