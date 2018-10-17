import React from 'react';
import App from '../../app';
import { Card } from 'antd';
import style from './index.less';
import { connect } from 'dva';
import SearchConfig from './components/search';

const { Meta } = Card;

class CourseSummary extends React.Component {
  state = {
  }

  render() {
    let { courseSummary, dispatch } = this.props;
    let { tagTypeData, classTypeData, tag, classType, listData } = courseSummary;

    let handerSearch = () => {
      dispatch({
        type: 'courseSummary/getNowClass'
      });
    }

    // 搜索参数
    let searchOpt = {
      tagTypeData,
      classTypeData,
      tag,
      classType,
      handerName(className) {
        dispatch({
          type: 'courseSummary/save',
          payload: {
            className,
          }
        });
        handerSearch();
      },
      handerTag(tag) {
        dispatch({
          type: 'courseSummary/save',
          payload: {
            tag,
          }
        });
        handerSearch();
      },
      handerType(classType) {
        dispatch({
          type: 'courseSummary/save',
          payload: {
            classType,
          }
        });
        handerSearch();
      }
    }

    let renderList = (
      <div className={style.emptyData}>暂无数据</div>
    );

    if (!_.isEmpty(listData)) {
      renderList = listData.map((item, index) => {
        let path = 'video';
        if (item.suffix === '.ppt' || item.suffix === '.pptx') {
          path = 'ppt';
        }
        let img = require('../../../assets/course/' + path + '.jpg');

        let renderDesc = (
          <div className={style.descBox}>{item.desc}</div>
        )
        return (
          <div key={index} className={style.listItem}>
            <Card
              hoverable={true}
              bodyStyle={{ padding: 12 }}
              cover={<img className={style.cover} src={img} alt="" />}
            >
              <Meta
                title={item.tag}
                description={renderDesc}
                className={style.descBox}
              />
            </Card>
          </div>
        )
      });
    }

    return (
      <App>
        <div><SearchConfig {...searchOpt} /></div>
        <div className={style.listBox}>{renderList}</div>
      </App>
    )
  }
}

export default connect((({ courseSummary }) => ({
  courseSummary,
})))(CourseSummary);