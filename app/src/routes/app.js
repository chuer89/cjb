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

    defaultSelectedKeysNav: ['user-console'],
    selectedKeysNav: [],

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
    let { selectedKeys, selectedKeysNav, collapsed } = this.state;
    let { moduleName } = app;
    let { userInfo, dept, myMenus } = user;
    let { userType } = userInfo;

    let menusIndex = _.findIndex(myMenus, {key: moduleName});
    let menusData = [];
    if (myMenus[menusIndex]) {
      menusData = myMenus[menusIndex].children;
    }

    // console.log(myMenus, menusIndex, menusData)

    // 菜单组件
    let renderMenus = menusData.map((item) => {
      let renderIcon = (
        <Icon type={item.icon} />
      )
      if (item.isFont) {
        renderIcon = (
          <i className={'iconfont ' + style.menusIconFont} dangerouslySetInnerHTML = {{ __html: item.icon }}></i>
        )
      }
      return (
        <Menu.Item key={item.path}>
          <Link to={item.path}>{renderIcon}<span>{item.name}</span></Link>
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
    let renderTopNav = myMenus.map((item, index) => {
      return (
        <Menu.Item key={item.key}>
          <Link to={item.path}>{item.name}</Link>
        </Menu.Item>
      )
    });

    // 选择部门
    let handerChangeDept = (value) => {
      // console.log(value, 'xuanzhong')
      let dept = _.last(value);
      localStorage.setItem('dept', dept);
      window.location.reload();
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