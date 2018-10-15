import React from 'react';
import style from './search.less';
import { Input, Button } from 'antd';
import { Link } from 'dva/router';

const Search = Input.Search;

class SearchConfig extends React.Component {
  state = {
    type: [{
      name: '全部', code: '', isActive: true,
    }, {
      name: 'PPT', code: '1'
    }, {
      name: '视频', code: '2'
    }],

    tag: [{
      name: '全部', code: '', isActive: true,
    }, {
      name: '入职培训', code: '1'
    }, {
      name: '店长晋级', code: '2'
    }]
  }

  render() {
    let { type, tag } = this.state;

    let renderType = type.map((item) => {
      let cssName = style.itemType;
      if (item.isActive) {
        cssName += ' ' + style.itemTypeActive;
      }
      return (
        <div className={cssName} key={item.code}>
          {item.name}
        </div>
      )
    });
    let renderTag = tag.map((item) => {
      let cssName = style.itemType;
      if (item.isActive) {
        cssName += ' ' + style.itemTypeActive;
      }
      return (
        <div className={cssName} key={item.code}>
          {item.name}
        </div>
      )
    });

    return (
      <div className={style.box}>
        <div className={style.searchBox}>
          <Search
            placeholder="请输入课程名称或讲师名称"
            onSearch={value => console.log(value)}
            enterButton
          />
        </div>
        <div className={style.itemBox}>
          <div className={style.itemLabel}>类型：</div>
          {renderType}
        </div>
        <div className={style.itemBox} style={{ overflow: 'hidden' }}>
          <div className={style.itemLabel}>体系：</div>
          {renderTag}
          <div className={style.operateBox}>
            <Link to="/course/config/add"><Button type="primary">上传</Button></Link>
            <Button type="primary" style={{ margin: '0 24px' }}>删除</Button>
            <Button type="primary">指派</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default SearchConfig;