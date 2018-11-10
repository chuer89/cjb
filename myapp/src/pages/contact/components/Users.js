import RemarkList from './RemarkList';
import { Tabs, Select, Divider } from 'antd';
import classnames from 'classnames';
import { SEX } from '../config';
import styles from './styles.less';

const TabPane = Tabs.TabPane;
const { Option } = Select;


const userViews = [
  { key: 'realName', desc: '姓名', icon: require('assets/contact/ic_xm.png') },
  { key: 'sex', desc: '性别', icon: require('assets/contact/ic_xb.png'), render: sex => SEX[sex] },
  { key: 'mobile', desc: '电话', icon: require('assets/contact/ic_dh.png') },
  { key: 'email', desc: '邮箱', icon: require('assets/contact/ic_yx.png') },
  { key: 'address', desc: '地址', icon: require('assets/contact/ic_wz.png') },
  { key: 'companyName', desc: '公司', icon: require('assets/contact/ic_gs.png') },
  { key: 'companyPosition', desc: '职位', icon: require('assets/contact/ic_zw.png') },
  { key: 'registerTime', desc: '入驻时间', icon: require('assets/contact/ic_rzptsj.png'), render: time => new Date(time).format('yyyy-MM-dd hh:mm:ss') },
  { key: 'publishedFarmNum', desc: '发布农场', icon: require('assets/contact/ic_fbncsl.png'), render: num => (num || 0) + '(个)' },
];

const farmReleaseViews = [
  { key: 'address', className: 'w2', desc: '地址', icon: '&#xe663;' },
  { key: 'area', className: 'w2', desc: '面积', icon: '&#xe658;', render: (area, unit) => area + unit },
  { key: 'unitPrice', className: 'w2', desc: '单价', icon: '&#xe651;', render: (price, unit) => {
    return (price || 0) + (unit || '');
  } },
  { key: 'totalPrice', className: 'w2', desc: '总价', icon: '&#xe668;', render: (price, unit) => { return price + unit } },
  { key: 'typeDesc', className: 'w2', desc: '类型', icon: '&#xe657;' },
  { key: 'statusDesc', className: 'w2', desc: '状态', icon: '&#xe69f;' },
]

// 他的订阅
const subscribViews = [
  { key: 'cityDesc', desc: '农场地址：', icon: '&#xe663;' },
  { key: 'areaLimit', desc: '面积范围：', icon: '&#xe658;' },
  { key: 'priceLimit', desc: '价格范围：', icon: '&#xe651;' },
  { key: 'farmTypeDesc', desc: '农场类型：', icon: '&#xe657;' },
];

const Users = ({
  userInfo, publishFarmList, subscribes, remarkUserList,
  activeTabKey, tabsChange,
  publishFarmSelect, onChangePublishFarm,
  confirmLoading, addRemark, editRemark,
}) => {

  const tabsProps = {
    defaultActiveKey: 'user',
    activeKey: activeTabKey,
    size: "small",
    onChange: tabsChange
  }

  // 用户信息
  const userViewsRender = userInfo ? userViews.map( ({icon, desc, key, render}, index) =>
    (userInfo[key] !== undefined && userInfo[key] !== '') && <div className={styles.line} key={index}>
      {/* <i className="iconfont" dangerouslySetInnerHTML={{__html: icon}}></i> */}
      <img src={icon} alt=""/>
      <span className={classnames({ "w2": desc.length === 2 })} dangerouslySetInnerHTML={{__html: desc}}></span>
      ：<span className={styles.value}>{render ? render(userInfo[key]) : userInfo[key]}</span>
    </div>
  ) : '';

  // 发布的农场
  const farmReleaseRender = () => {
    function getDetail (index) {
      if(publishFarmList.length === 0) {
        return '';
      }
      const data = publishFarmList[index];
      return farmReleaseViews.map(({key, desc, icon, render, className}, index) =>
      data[key] !== undefined && <div className={styles.line} key={index}>
            <i className="iconfont" dangerouslySetInnerHTML={{__html: icon}}></i>
            <span className={className} dangerouslySetInnerHTML={{__html: desc}}></span>：
            <span className={styles.value}>{render ? render(data[key], data[`${key}Unit`]) : data[key]}</span>
          </div>
      );
    }
    const selectProps = {
      value: publishFarmList.length ? 0 : '',
      notFoundContent: '暂无发布农场',
      onChange (e) {
        onChangePublishFarm(e);
      },
    }

    return (
      <div>
      <Select {...selectProps} style={{ width: "100%", marginTop: 10 }} >
        {publishFarmList.map((item, index) => <Option key={index} value={index}>{item.farmName}</Option>)}
      </Select>
        <div>
          {getDetail(publishFarmSelect)}
        </div>
      </div>
    )
  }

  // 他的订阅
  const subRender = () => {
    if(!subscribes) {
      return false;
    }
    return (
      subscribViews.map(({key, desc, icon, render}, index) => {
        if (key === 'areaLimit') {
          const { maxArea, minArea, areaCodeDesc  } = subscribes
          let areaRender = '';
          if (maxArea && minArea) {
            areaRender = `${minArea}-${maxArea}(${areaCodeDesc})`
          } else if (maxArea) {
            areaRender = `${maxArea}(${areaCodeDesc})以下`
          } else if (minArea) {
            areaRender = `${minArea}(${areaCodeDesc})以上`
          } else {
            return '';
          }
          return <div className={styles.line} key={index}>
                <i className="iconfont" dangerouslySetInnerHTML={{__html: icon}}></i>
                <span className={styles.key} dangerouslySetInnerHTML={{__html: desc}}></span>
                <span className={styles.value}>{areaRender}</span>
              </div>
        }
        if (key === 'priceLimit') {
          const { maxPrice, minPrice, unitCodeDesc  } = subscribes
          let areaRender = '';
          if (maxPrice && minPrice) {
            areaRender = `${minPrice}-${maxPrice}(${unitCodeDesc})`
          } else if (maxPrice) {
            areaRender = `${maxPrice}(${unitCodeDesc})以下`
          } else if (minPrice) {
            areaRender = `${minPrice}(${unitCodeDesc})以上`
          } else {
            return '';
          }
          return <div className={styles.line} key={index}>
                <i className="iconfont" dangerouslySetInnerHTML={{__html: icon}}></i>
                <span className={styles.key} dangerouslySetInnerHTML={{__html: desc}}></span>
                <span className={styles.value}>{areaRender}</span>
              </div>
        }

        return subscribes[key] && <div className={styles.line} key={index}>
          <i className="iconfont" dangerouslySetInnerHTML={{__html: icon}}></i>
          <span className={styles.key} dangerouslySetInnerHTML={{__html: desc}}></span>
          <span className={styles.value}>{subscribes[key]}</span>
        </div>
        }
      )
    )
  }

  const tabs = [
    { index: 'user', desc: '个人信息', render: userViewsRender },
    { index: 'farmList', desc: '发布的农场', render: farmReleaseRender() },
    { index: 'sub', desc: '他的订阅', render: subRender() },
  ];

  const userTab = <Tabs {...tabsProps}>{tabs.map(({index, desc, render = ''}) => <TabPane tab={desc} key={index}>{render}</TabPane>)}</Tabs>;
  const remarkListProps = {
    title: '用户备注',
    remarkList: remarkUserList,
    confirmLoading,
    titleEdit: false,
    userInfo,
    addRemark,
    editRemark,
    titleReadOnly: true,
    defaultTitle: userInfo && (userInfo.realName || userInfo.mobile),
  }

  return (
    <div className={styles.users}>
      <div className={styles.sales}>
        <div className={styles.name}>
          用户信息
        </div>
        {userTab}
      </div>
      <Divider style={{ borderTop: '1px solid #E4E6EA', margin: 0 }} />
      <RemarkList {...remarkListProps} />
    </div>
  )
}

export default Users;