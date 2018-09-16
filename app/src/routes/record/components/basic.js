import React from 'react';
// import { Row, Col } from 'antd';
import style from './basic.less';

// 基本信息
class Basic extends React.Component {
  state = {

  }

  render() {
    let importantData = [{
      label: '姓名', value: '张三'
    }, {
      label: '性别', value: '男'
    }, {
      label: '电话', value: '13922229382'
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
      label: '学历', value: '大学'
    }, {
      label: '年龄', value: '23'
    }, {
      label: '出生日期', value: '2016-08-10'
    }, {
      label: '身份证', value: '51089239293837272'
    }, {
      label: '银行卡号', value: '302928919282849393'
    }, {
      label: '婚姻状况', value: '已婚'
    }, {
      label: '特长', value: '游泳、涉嫌'
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

    let headImg = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536430268198&di=4e617a9e23a3239bc4ed40ba0ecbaa2d&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201408%2F08%2F20140808143427_y8P3S.jpeg';

    return (
      <div>
        <div className={style.firstBox}>
          <div className={style.firstItemHead}>
            <img className={style.headImg} src={headImg} alt=""/>
          </div>
          <div className={style.firstItem}>{renderImportant}</div>
        </div>
        <div className={style.box}>{renderData}</div>
      </div>
    );
  }
};

export default Basic;