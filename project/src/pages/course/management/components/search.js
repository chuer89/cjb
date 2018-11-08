import React from 'react';
import style from './search.less';
import { Input, Button } from 'antd';
import Link from 'umi/link';

const Search = Input.Search;

class SearchConfig extends React.Component {
  state = {
  }

  render() {
    let { tagTypeData, classTypeData, disabled, handerOpenDesignate,
      handerTag, tag, handerType, classType, handerName, handerDel } = this.props;

    let renderType = classTypeData.map((item) => {
      let cssName = style.itemType;
      if (item.code === classType) {
        cssName += ' ' + style.itemTypeActive;
      }
      return (
        <div className={cssName} key={item.code} onClick={() => {handerType(item.code)}}>
          {item.name}
        </div>
      )
    });
    let renderTag = tagTypeData.map((item) => {
      let cssName = style.itemType;
      let value = item.code;
      if (value) {
        value = item.name;
      }

      if (tag === value) {
        cssName += ' ' + style.itemTypeActive;
      }
      
      return (
        <div className={cssName} key={item.code} onClick={() => {handerTag(value)}}>
          {item.name}
        </div>
      )
    });

    return (
      <div className={style.box}>
        <div className={style.searchBox}>
          <Search
            placeholder="请输入课程名称或讲师名称"
            onSearch={value => handerName(value)}
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
            <Link to="/course/management/add"><Button type="primary">上传</Button></Link>
            <Button type="primary" disabled={disabled} onClick={handerDel} style={{ margin: '0 24px' }}>删除</Button>
            <Button type="primary" onClick={handerOpenDesignate} disabled={disabled}>指派</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default SearchConfig;