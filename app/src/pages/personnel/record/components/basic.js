import React from 'react';
import style from './basic.less';
import common from '@common';
import _ from 'lodash';
import { Card } from 'antd';
import {
  educationObj, genderObj, contractTypeObj, marryMapObj,
  rankTypeObj, invitationChannelObj, statusMapObj
} from '@components/addUser/config'

// 基本信息
class Basic extends React.Component {
  state = {

    invitationChannelObj, // 应聘渠道
    rankTypeObj, // 岗位

    // 性别
    gender: genderObj,

    // 学历
    education: educationObj,

    // 婚姻
    marry: marryMapObj,

    // 生育情况
    bear: { '1': '是', '0': '否' },

    // 合同类型
    contractType: contractTypeObj,

    // 在职状态
    status: statusMapObj,

    warningSele: { // 预警信息
      '0': '正常', '1': '身份证', '2': '健康证', '3': '劳动合同',
    },
  }

  render() {
    let { userDetails, defaultHead } = this.props;
    let { gender, education, marry, contractType, status, bear } = this.state;

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

    let listData = [{
      title: '个人信息',
      data: [{
        label: '学历', value: education[userDetails.education] || '--',
      }, {
        label: '年龄', value: userDetails.age
      }, {
        label: '出生日期', value: common.format(userDetails.birthday) || '--',
      }, {
        label: '身份证', value: userDetails.idcard || '--',
      }, {
        label: '身份证地址', value: userDetails.idcardAddr || '--'
      }, {
        label: '籍贯', value: userDetails.nativePlace || '--'
      }, {
        label: '学校', value: userDetails.school || '--'
      }, {
        label: '专业', value: userDetails.major || '--'
      }, {
        label: '开户银行', value: userDetails.bank || '--'
      }, {
        label: '银行卡号', value: userDetails.bankCard || '--',
      }, {
        label: '身份证到期时间', value: common.format(userDetails.idcardTime) || '--'
      }, {
        label: '健康证到期时间', value: common.format(userDetails.healthCertificateTime) || '--'
      }, {
        label: '保险过期时间', value: common.format(userDetails.insuranceTime) || '--'
      }]
    }, {
      title: '职位信息',
      data: [{
        label: '岗位名称', value: userDetails.positionName || '--',
      }, {
        label: '所在部门', value: userDetails.deptName || '--'
      }, {
        label: '入职时间', value: common.format(userDetails.joinTime) || '--'
      }, {
        label: '转正时间', value: common.format(userDetails.positiveTime) || '--'
      }, {
        label: '工作年限', value: userDetails.workAge || '--',
      }, {
        label: '职级', value: rankTypeObj[userDetails.type] || '--'
      }, {
        label: '薪水', value: userDetails.salary || '--'
      }, {
        label: '在职状态', value: status[userDetails.status] || '--'
      }, {
        label: '离职时间', value: common.format(userDetails.resignationTime) || '--'
      }, {
        label: '离职原因', value: userDetails.resignationReason || '--'
      }]
    }, {
      title: '家庭状况',
      data: [{
        label: '婚姻状况', value: marry[userDetails.marry] || '--',
      }, {
        label: '是否生育', value: bear[userDetails.bear] || '--'
      }, {
        label: '紧急联系人', value: userDetails.emergencyContact || '--'
      }, {
        label: '紧急联系人手机', value: userDetails.emergencyContactPhone || '--'
      }, {
        label: '与紧急联系人关系', value: userDetails.emergencyContactRelation || '--'
      }, {
        label: '现居地址', value: userDetails.location || '--'
      }]
    }, {
      title: '合同信息',
      data: [{
        label: '合同主体', value: userDetails.contractSubject || '--'
      }, {
        label: '合同类型', value: contractType[userDetails.contractType] || '--'
      }, {
        label: '合同开始时间', value: common.format(userDetails.contractStarttime) || '--'
      }, {
        label: '合同结束时间', value: common.format(userDetails.contractEndtime) || '--'
      }]
    }, {
      title: '其他信息',
      data: [{
        label: '推荐人', value: userDetails.referrer || '--'
      }, {
        label: '推荐人门店', value: userDetails.referrerStore || '--'
      }, {
        label: '应聘渠道', value: invitationChannelObj[userDetails.applyChannel] || '--'
      }, {
        label: '特长', value: userDetails.specialty || '--',
      }, {
        label: '备注', value: userDetails.remark || '--'
      }]
    }]

    // 离职
    if (userDetails.status === '3') {}
    // 内推
    if (_.toString(userDetails.applyChannel) === '1') {}

    return (
      <div>
        <div className={style.firstBox}>
          <div className={style.firstItemHead}>
            <img className={style.headImg} src={defaultHead} alt="" />
          </div>
          <div className={style.firstItem} style={{ width: '70%' }}>{renderImportant}</div>
        </div>
        <div>
          {
            listData.map((item, index) => {
              return (
                <Card title={item.title} key={index} bordered={false}>
                  <div className={style.box}>
                    {
                      item.data.map((item, index) => {
                        return (
                          <div key={index} className={style.item}>
                            <span className={style.key}>{item.label}</span>
                            <span className={style.value}>{item.value}</span>
                          </div>
                        )
                      })
                    }
                  </div>
                </Card>
              )
            })
          }
        </div>
      </div>
    );
  }
};

export default Basic;