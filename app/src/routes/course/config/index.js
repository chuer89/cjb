import React from 'react';
import App from '../../app';
import { Card, Checkbox } from 'antd';
import style from './index.less';

import SearchConfig from './components/search';

class CourseConfig extends React.Component {
  state = {
    list: [{
      name: '课程知道'
    }, {
      name: '特殊那些两地分居', suffix: 'mp4'
    }, {
      name: '这里是两地分居撒的发送开家阿斯顿发阿斯顿发就卡是对方'
    }]
  }

  render() {
    let { list } = this.state;

    let renderList = list.map((item, index) => {
      let path = 'ppt';
      if (item.suffix !== 'ppt') {
        path = 'video';
      }
      let img = require('../../../assets/course/' + path + '.jpg');
      return (
        <div key={index} className={style.listItem}>
          <Card
            hoverable={true}
            title={item.name}
            bodyStyle={{ padding: 0 }}
            cover={<img className={style.cover} src={img} alt="" />}
            extra={<Checkbox></Checkbox>}>
          </Card>
        </div>
      )
    });

    return (
      <App>
        <div><SearchConfig /></div>
        <div className={style.listBox}>{renderList}</div>
      </App>
    )
  }
}

export default CourseConfig;