import React from 'react';
// import { Card } from 'antd';
// import _ from 'lodash';
import style from './picture.less';

// 个人成长
class Picture extends React.Component {
  state = {

  }

  render() {
    let headImg = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536430268198&di=4e617a9e23a3239bc4ed40ba0ecbaa2d&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201408%2F08%2F20140808143427_y8P3S.jpeg';
    let data = [{
      title: '身份证采集', imgList: [{}, {}]
    }, {
      title: '健康证采集', imgList: [{}]
    }, {
      title: '合同采集', imgList: [{}]
    }, {
      title: '其他', imgList: [{}]
    }];
    let renderData = data.map((item, index) => {
      return (
        <div key={index} className={style.box}>
          <h3 className={style.title}>{item.title}</h3>
          <div className={style.itemBox}>
            {
              item.imgList.map((img, imgIndex) => {
                return (
                  <div className={style.imgBox} key={imgIndex}>
                    <img src={headImg} alt=""/>
                  </div>
                )
              })
            }
          </div>
        </div>
      )
    })

    return (
      <div>{renderData}</div>
    );
  }
};

export default Picture;