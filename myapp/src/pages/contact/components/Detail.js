import React, { Component } from 'react';
// import { Divider } from 'antd';
// import RemarkList from './RemarkList';
import Link from 'umi/link'
import styles from './styles.less';

const userViews = [
  { index: 'realName', className: '', desc: '卖家中介', icon: '&#xe656;' },
  { index: 'sex', className: 'w2', desc: '性别', icon: '&#xe664;' },
  // { index: 'address', desc: '地 址', icon: '&#xe663;' },
  { index: 'publishedFarmNum', className: '', desc: '发布农场', icon: '&#xe653;', render: (num = 0) => num + '(个)' },
  { index: 'createTime', className: '', desc: '入驻时间', icon: '&#xe65c;', render: (t) => new Date(t).format('yyyy-MM-dd hh:mm:ss') },
  { index: 'mobile', className: 'w2', desc: '电话', icon: '&#xe64f;' },
];

class Detail extends Component {
  render () {
    const {
      farmDetail, remarkFarmList, userInfo, confirmLoading,
      addRemark, editRemark,
    } = this.props;

    if(!farmDetail) {
      return '';
    }

    const { farm = {} } = farmDetail;

    const {
      address, typeDesc, id, farmName, farmNo, isSale,
      area, areaUnit,
      unitPrice, unitPriceUnit,
      totalPrice, totalPriceUnit,
      statusDesc,
    } = farm;

    const getFarms = () => {
      return <div>
          <h3>{farmName}</h3>
          <div className={styles.line}>
            <i className="iconfont">&#xe663;</i>
            <span className='w2'>农场编号</span>：
            <span className={styles.value}>{farmNo}</span>
          </div>
          <div className={styles.line}>
            <i className="iconfont">&#xe663;</i>
            <span className='w2'>地址</span>：
            <span className={styles.value}>{address && address.length > 50 ? address.substring(0, 50) + '...' : address}</span>
          </div>
          <div className={styles.line}>
            <i className="iconfont">&#xe658;</i>
            <span className='w2'>面积</span>：
            <span className={styles.value}>{area + areaUnit}</span>
          </div>
          <div className={styles.line}>
            <i className="iconfont">&#xe651;</i>
            <span className='w2'>单价</span>：
            <span className={styles.value}>{unitPrice + unitPriceUnit}</span>
          </div>
          <div className={styles.line}>
            <i className="iconfont">&#xe668;</i>
            <span className='w2'>总价</span>：
            <span className={styles.value}>{totalPrice + totalPriceUnit}</span>
          </div>
          <div className={styles.line}>
            <i className="iconfont">&#xe657;</i>
            <span className='w2'>类型</span>：
            <span className={styles.value}>{typeDesc}</span>
          </div>
          <div className={styles.line}>
            <i className="iconfont">&#xe657;</i>
            <span className='w2'>状态</span>：
            <span className={styles.value}>{statusDesc}</span>
          </div>
          <div className={styles.line}>
          {/* eslint-disable */}
          <Link to={`farmInfo/details?id=${id}&isSale=${isSale}`}>点击查看农场详细介绍</Link>
          {/* <a href={farmDetail + id} target="_blank" ></a> */}
          </div>
        </div>
    }

    const remarkProps = {
      title: '农场备注',
      remarkList: remarkFarmList,
      confirmLoading,
      addRemark,
      editRemark,
      defaultTitle: `${userInfo.realName}-${farm.farmName}`,
    }

    return (
      <div className={styles.users} style={{marginTop: '0', marginBottom: '16px'}}>
        <div className={styles.sales}>
          <div className={styles.name}>
            农场
          </div>
        {getFarms()}
        </div>
        {/* <Divider style={{ borderTop: '1px solid #E4E6EA', margin: 0 }} /> */}
        {/* <RemarkList {...remarkProps} /> */}
      </div>
    )
  }
}
export default Detail;