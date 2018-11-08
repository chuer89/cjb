import { Layout, Menu, Icon, BackTop, Popover, LocaleProvider } from 'antd';
import { connect } from 'dva';
import React from 'react';
import style from './index.less';
import Link from 'umi/link';
import DeptSele from '@components/seleDept/';
import _ from 'lodash';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import { Helmet } from "react-helmet";

const { Header, Content, Footer, Sider } = Layout;

class App extends React.Component {
  state = {
    collapsed: false,

    defaultSelectedKeys: ['/personnel/workbench'],
    selectedKeys: [],

    defaultSelectedKeysNav: ['user-console'],
    selectedKeysNav: [],

    deptData: [], // 筛选部门信息
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
    let { collapsed, defaultSelectedKeys, defaultSelectedKeysNav } = this.state;
    let { moduleName, pathname } = app;
    let { userInfo, dept, myMenus } = user;
    let { userType } = userInfo;

    let selectedKeys = [pathname] || defaultSelectedKeys;
    let selectedKeysNav = [moduleName] || defaultSelectedKeysNav;

    let menusIndex = _.findIndex(myMenus, { key: moduleName });
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
          <i className={'iconfont ' + style.menusIconFont} dangerouslySetInnerHTML={{ __html: item.icon }}></i>
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

    let renderDeptSele = '';
    if (userType !== 1) {
      renderDeptSele = (
        <div className={style.headerItem} style={{ margin: '0 28px 0 28px' }}>
          <DeptSele {...deptOpt} />
        </div>
      )
    }

    return (
      <LocaleProvider locale={zh_CN}>
        <Layout>
          <Helmet>
            <link rel="shortcut icon" href={require('../assets/favicon.ico')} />
          </Helmet>
          <Header className={style.headerBox}>
            <div className={style.headerItem}>
              <div className={style.logo}>
                <img src={require('../assets/logo.png')} alt="" />
                <span>餐匠帮运营系统</span>
              </div>
            </div>
            {renderDeptSele}
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
              style={{ position: 'fixed', height: '90vh' }}
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
                餐匠帮 ©2018
          </Footer>
            </Layout>
          </Layout>
        </Layout>
      </LocaleProvider>
    );
  }
}

const LayoutRender = ({ app, user, structure, location, children }) => {
  let elementProps = {
    app,
    user,
    structure,
    children,
  }
  const { pathname } = location;

  let renderChilder = (
    <App {...elementProps} />
  );

  if (pathname === '/login' || pathname === '/register' || pathname === '/initstructure' || pathname === '/404') {
    renderChilder = (
      <div>{children}</div>
    )
  }

  return (
    <div>{renderChilder}</div>
  )
}


export default connect((({ app, user, structure }) => ({
  app,
  user,
  structure,
})))(LayoutRender);