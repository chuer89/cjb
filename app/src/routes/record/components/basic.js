import React from 'react';
// import { Row, Col } from 'antd';
import style from './basic.less';

// 基本信息
class Basic extends React.Component {
  state = {
    // 性别
    gender: {
      '1': '男', '2': '女', '0': '未知',
    },

    // 学历
    education: {
      '1': '大学', '2': '高中', '3': '初中', '4': '其他',
    },

    // 婚姻
    marry: {
      '1': '已婚', '0': '未婚',
    }
  }

  render() {
    let { userDetails, defaultHead } = this.props;
    let { gender, education, marry } = this.state;

    let importantData = [{
      label: '姓名', value: userDetails.name,
    }, {
      label: '性别', value: gender[userDetails.gender] || '--',
    }, {
      label: '电话', value: userDetails.phone,
    }];
    let renderImportant = importantData.map((item, index) => {
      return (
        <div key={index}>
          <span className={style.key}>{item.label}</span>
          <span className={style.value}>{item.value}</span>
        </div>
      )
    });

    let data = [{
      label: '学历', value: education[userDetails.education] || '--',
    }, {
      label: '年龄', value: '缺字段'
    }, {
      label: '出生日期', value: 'xx'
    }, {
      label: '身份证', value: userDetails.idcard || '--',
    }, {
      label: '银行卡号', value: userDetails.bankCard || '--',
    }, {
      label: '婚姻状况', value: marry[userDetails.marry] || '--',
    }, {
      label: '特长', value: userDetails.specialty || '--',
    }];
    
    let isOdd = false;
    let renderData = data.map((item, index) => {
      let itemClass = style.item;
      if (index % 2 === 0) {
        if (isOdd) {
          isOdd = false;
        } else {
          isOdd = true;
        }
      }
      if (isOdd) {
        itemClass += ' ' + style.oddItem;
      }
      
      return (
        <div key={index} className={itemClass}>
          <span className={style.key}>{item.label}</span>
          <span className={style.value}>{item.value}</span>
        </div>
      )
    });

    return (
      <div>
        <div className={style.firstBox}>
          <div className={style.firstItemHead}>
            <img className={style.headImg} src={defaultHead} alt=""/>
          </div>
          <div className={style.firstItem}>{renderImportant}</div>
        </div>
        <div className={style.box}>{renderData}</div>
      </div>
    );
  }
};

export default Basic;