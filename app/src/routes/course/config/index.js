import React from 'react';
import App from '../../app';
import { Card, Checkbox, Modal } from 'antd';
import style from './index.less';
import { connect } from 'dva';
import SearchConfig from './components/search';
import _ from 'lodash';

import Designate from './components/designate';

const confirm = Modal.confirm;

class CourseConfig extends React.Component {
  state = {

  }

  handerDel() {
    let { course, dispatch } = this.props;
    let { checkedList } = course;
    confirm({
      title: '确定要删除吗?',
      content: '删除后不可恢复',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        let fidArr = [];
        _.forEach(checkedList, (item) => {
          let fid = item.fid;
          if (fid) {
            fidArr.push(fid);
          }
        });
        dispatch({
          type: 'course/deleteMoreClass',
          payload: {
            fidstr: fidArr.join(','),
          }
        });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  render() {
    let { course, dispatch, structure } = this.props;
    let { tagTypeData, classTypeData, tag, classType, 
      listData, checkedList, visibleDesignate, seleDeptIndex } = course;
    let self = this;

    let handerSearch = () => {
      dispatch({
        type: 'course/getTrainLibraryAllClass'
      });
    }

    let handerCheck = (e, item) => {
      let checked = e.target.checked;
      let id = '' + item.id ;
      if (checked) {
        checkedList[id] = item;
      } else {
        delete checkedList[id];
      }
      dispatch({
        type: 'course/save',
        payload: {
          checkedList,
        }
      });
    }

    // 搜索参数
    let searchOpt = {
      tagTypeData,
      classTypeData,
      tag,
      classType,
      disabled: _.isEmpty(checkedList),
      handerDel() {
        self.handerDel.call(self)
      },
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
      },
      handerOpenDesignate() {
        dispatch({
          type: 'course/save',
          payload: {
            visibleDesignate: true,
          }
        });
      },
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
        return (
          <div key={index} className={style.listItem}>
            <Card
              hoverable={true}
              title={item.filename || item.tag}
              bodyStyle={{ padding: 0 }}
              cover={<img className={style.cover} src={img} alt="" />}
              extra={<Checkbox onChange={(e) => { handerCheck(e, item) }}></Checkbox>}>
            </Card>
          </div>
        )
      });
    }

    let designateAttr = {
      visible: visibleDesignate,
      structure,
      onCancel() {
        dispatch({
          type: 'course/save',
          payload: {
            visibleDesignate: false,
          }
        });
      },
      handleOk() {
        let fidArr = [];
        let tidArr = [];
        _.forEach(checkedList, (item) => {
          let fid = item.fid;
          let tid = item.tid;
          if (fid) {
            fidArr.push(fid);
          }
          if (tid) {
            tidArr.push(tid);
          }
        });

        dispatch({
          type: 'course/addTrainStorePositionRef',
          payload: {
            fidstr: fidArr.join(','),
            tidstr: tidArr.join(','),
            index: seleDeptIndex,
          }
        });
      },
      handleChange(value) {
        let seleDeptIndex = _.last(value);
        dispatch({
          type: 'course/save',
          payload: {
            seleDeptIndex,
          }
        });
      },
    }

    return (
      <App>
        <div>
          <Designate {...designateAttr} />
        </div>
        <div><SearchConfig {...searchOpt} /></div>
        <div className={style.listBox}>{renderList}</div>
      </App>
    )
  }
}

export default connect((({ course, structure }) => ({
  course,
  structure,
})))(CourseConfig);