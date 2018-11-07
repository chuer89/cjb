import React from 'react';
import style from './picture.less';

// 员工画像
class Picture extends React.Component {
  state = {

  }

  render() {
    let { portrayalImg } = this.props;
    let { idcardFront, idcardReverse, healthCertificateFront,
      healthCertificateReverse, contract } = portrayalImg;
    let data = [{
      title: '身份证采集', imgList: [idcardFront || {}, idcardReverse || {}],
    }, {
      title: '健康证采集', imgList: [healthCertificateFront || {}, healthCertificateReverse || {}],
    }, {
      title: '合同采集', imgList: contract || [],
    }];
    let renderData = data.map((item, index) => {
      return (
        <div key={index} className={style.box}>
          <h3 className={style.title}>{item.title}</h3>
          <div className={style.itemBox}>
            {
              item.imgList.map((item, imgIndex) => {
                if (!item.path) {
                  return '';
                }
                return (
                  <div className={style.imgBox} key={imgIndex}>
                    <img src={item.path} alt=""/>
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