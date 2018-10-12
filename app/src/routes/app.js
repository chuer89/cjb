import { Layout, Menu, Icon, BackTop, Popover } from 'antd';
import { connect } from 'dva';
import React from 'react';
import style from './app.less';
import { Link } from 'dva/router';
import DeptSele  from '../components/seleDept/';
import _ from 'lodash';

const { Header, Content, Footer, Sider } = Layout;

class App extends React.Component {
  state = {
    collapsed: false,

    defaultSelectedKeys: ['/index'],
    selectedKeys: [],

    menus: [{
      path: '/personnel/index', icon: 'desktop', name: '工作台',
    }, {
      path: '/personnel/dashboard', icon: 'pie-chart', name: '仪表盘',
    }, {
      path: '/personnel/record', icon: 'copy', name: '员工档案',
    }],

    // 后台配置
    deployMenus: [{
      path: '/deploy/store', icon: 'hdd', name: '门店管理',
    }, {
      path: '/deploy/section', icon: 'team', name: '部门管理',
    }],

    defaultSelectedKeysNav: ['1'],
    selectedKeysNav: [],
    // 顶部导航
    topNav: [{
      key: '1', name: '人事管理', path: '/personnel/index'
    }, {
      key: '2', name: '培训资料', path: '/personnel/index',
    }, {
      key: '3', name: '后台配置', path: '/deploy/store'
    }],

    deptData: [], // 筛选部门信息
  }

  UNSAFE_componentWillMount() {
    this._isMounted = true;

    let { defaultSelectedKeys, defaultSelectedKeysNav } = this.state;
    let { pathname, moduleName } = this.props.app;
    let selectedKeys = [pathname] || defaultSelectedKeys;

    let selectedKeysNav = [moduleName] || defaultSelectedKeysNav;

    this.save({
      selectedKeys,
      selectedKeysNav,
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  save(payload) {
    if (this._isMounted) {
      this.setState(payload);
    }
  }

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  render() {
    let { children, app, user, structure } = this.props;
    let contentHeight = document.body.clientHeight - 64 - 60;
    let { menus, selectedKeys, topNav, selectedKeysNav, deployMenus, collapsed } = this.state;
    let { moduleName } = app;
    let { userInfo, dept } = user;
    let { userType } = userInfo;

    let menusData = menus;
    if (moduleName === '3') {
      menusData = deployMenus;
    }

    // 菜单组件
    let renderMenus = menusData.map((item) => {
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

    const userMenus = (
      <div>
        <div className={style.logout}>
          <Link to="/login">
            <Icon type="logout" theme="outlined" />退出
          </Link>
        </div>
      </div>
    );

    // 顶部导航菜单
    let renderTopNav = topNav.map((item, index) => {
      return (
        <Menu.Item key={item.key}>
          <Link to={item.path}>{item.name}</Link>
        </Menu.Item>
      )
    });

    // 选择部门
    let handerChangeDept = (value) => {
      console.log(value, 'xuanzhong')
      let dept = _.last(value);
      localStorage.setItem('dept', dept);
      // window.location.reload();
    }
    
    // 默认部门
    let defaultValue = [];
    let deptSplit = [];
    if (dept) {
      deptSplit = dept.split('.');
      _.forEach(deptSplit, (item) => {
        let _last = _.last(defaultValue) || '';
        defaultValue.push((_last && _last + '.') + item);
      });
    }
    let deptOpt = {
      structure,
      userType,
      onChange: handerChangeDept,
      defaultValue,
    }

    return (
      <Layout>
        <Header className={style.headerBox}>
          <div className={style.headerItem}>
            <div className={style.logo}>匠</div>
          </div>
          <div className={style.headerItem} style={{ margin: '0 28px 0 28px' }}>
            <DeptSele {...deptOpt}/>
          </div>
          <div className={style.headerItem}>
            <Menu
              theme="dark"
              mode="horizontal"
              selectedKeys={selectedKeysNav}
              style={{ lineHeight: '64px' }}
            >{renderTopNav}</Menu>
          </div>
          <div style={{ 'float': 'right' }}>
            <Popover content={userMenus} placement="bottomRight">
              <span className={style.userInfo}>
                <Icon type="user" /><span>{userInfo.username || ''}</span>
              </span>
            </Popover>
          </div>
        </Header>
        <Layout style={{ 'paddingTop': '65px' }}>
          <Sider
            theme="light"
            collapsible
            collapsed={collapsed}
            onCollapse={this.onCollapse}
            style={{ position: 'fixed', height: '100vh' }}
          >
            <Menu mode="inline" selectedKeys={selectedKeys}>
              {renderMenus}
            </Menu>
          </Sider>
          <Layout style={{ marginLeft: collapsed ? '80px' : '200px' }}>
            <Content style={contentStyle}>
              {children}
              <BackTop />
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              匠 ©2018
          </Footer>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default connect((({ app, user, structure }) => ({
  app,
  user,
  structure,
})))(App);