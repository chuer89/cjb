import React from 'react';
import style from './basic.less';
import common from '../../../common';

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
    },

    // 合同类型
    contractType: {
      '1': '固定期限', '2': '非固定期限', '3': '试用'
    },

    // 在职状态
    status: {
      '1': '试用', '2': '在职', '3': '离职'
    }
  }

  render() {
    let { userDetails, defaultHead } = this.props;
    let { gender, education, marry, contractType, status } = this.state;

    let importantData = [{
      label: '姓名', value: userDetails.name || '--',
    }, {
      label: '性别', value: gender[userDetails.gender] || '--',
    }, {
      label: '电话', value: userDetails.phone || '--',
    }];
    let renderImportant = importantData.map((item, index) => {
      return (
        <div key={index}>
          <span className={style.key} style={{ width: '17%' }}>{item.label}</span>
          <span className={style.value}>{item.value}</span>
        </div>
      )
    });

    let data = [{
      label: '学历', value: education[userDetails.education] || '--',
    }, {
      label: '年龄', value: userDetails.age
    }, {
      label: '出生日期', value: userDetails.birthday,
    }, {
      label: '身份证', value: userDetails.idcard || '--',
    }, {
      label: '银行卡号', value: userDetails.bankCard || '--',
    }, {
      label: '婚姻状况', value: marry[userDetails.marry] || '--',
    }, {
      label: '特长', value: userDetails.specialty || '--',
    }, {
      label: '紧急联系人', value: userDetails.emergencyContact || '--'
    }, {
      label: '紧急联系人手机', value: userDetails.emergencyContactPhone || '--'
    }, {
      label: '薪水', value: userDetails.salary || '--'
    }, {
      label: '入职时间', value: common.format(userDetails.joinTime) || '--'
    }, {
      label: '在职状态', value: status[userDetails.status] || '--'
    }, {
      label: '合同类型', value: contractType[userDetails.contractType] || '--'
    }, {
      label: '身份证到期时间', value: common.format(userDetails.idcardTime) || '--'
    }, {
      label: '应聘渠道', value: userDetails.applyChannel || '--'
    }, {
      label: '推荐人', value: userDetails.referrer || '--'
    }, {
      label: '转正时间', value: common.format(userDetails.positiveTime) || '--'
    }];

    if (userDetails.status === '3') {
      data = data.concat([
        {
          label: '离职时间', value: common.format(userDetails.resignationTime) || '--'
        }, {
          label: '离职原因', value: userDetails.resignationReason || '--'
        }
      ]);
    }

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
            <img className={style.headImg} src={defaultHead} alt="" />
          </div>
          <div className={style.firstItem} style={{ width: '70%' }}>{renderImportant}</div>
        </div>
        <div className={style.box}>{renderData}</div>
      </div>
    );
  }
};

export default Basic;