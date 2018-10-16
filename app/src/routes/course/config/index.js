import React from 'react';
import App from '../../app';
import { Card, Checkbox, Modal } from 'antd';
import style from './index.less';
import { connect } from 'dva';
import SearchConfig from './components/search';

const confirm = Modal.confirm;

class CourseConfig extends React.Component {
  state = {
  }

  handerDel() {
    confirm({
      title: '确定要删除吗?',
      content: '删除后不可恢复',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  render() {
    let { course, dispatch } = this.props;
    let { tagTypeData, classTypeData, tag, classType, listData } = course;
    let self = this;

    let handerSearch = () => {
      dispatch({
        type: 'course/getTrainLibraryAllClass'
      });
    }

    // 搜索参数
    let searchOpt = {
      tagTypeData,
      classTypeData,
      tag,
      classType,
      handerDel: self.handerDel,
      handerName(className) {
        dispatch({
          type: 'course/save',
          payload: {
            className,
          }
        });
        handerSearch();
      },
      handerTag(tag) {
        dispatch({
          type: 'course/save',
          payload: {
            tag,
          }
        });
        handerSearch();
      },
      handerType(classType) {
        dispatch({
          type: 'course/save',
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
        let path = 'ppt';
        if (item.suffix !== '.ppt' || item.suffix !== '.pptx') {
          path = 'video';
        }
        let img = require('../../../assets/course/' + path + '.jpg');
        return (
          <div key={index} className={style.listItem}>
            <Card
              hoverable={true}
              title={item.tag}
              bodyStyle={{ padding: 0 }}
              cover={<img className={style.cover} src={img} alt="" />}
              extra={<Checkbox></Checkbox>}>
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

export default connect((({ course }) => ({
  course,
})))(CourseConfig);