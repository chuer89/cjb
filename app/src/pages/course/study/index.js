// 档案管理列表
import React from 'react';
import { connect } from 'dva';
import { Table, Button, Input, Select } from 'antd';
import style from './index.less';
import Link from 'umi/link';

const Option = Select.Option;

class RecordList extends React.Component {
  constructor(props) {
    super(props);
    let { officeWebUrl } = props.app;
    this.state = {
      statusData: [
        { value: '全部', code: '' },
        { value: '待完成', code: '0' },
        { value: '已完成', code: '1' }
      ],

      columns: [{
        title: '课程名称', dataIndex: 'name'
      }, {
        title: '老师', dataIndex: 'teacher'
      }, {
        title: '学习状态', dataIndex: 'learnStatus', render(learnStatus, item) {
          return (
            <span>{learnStatus ? '已完成' : '待完成'}</span>
          )
        }
      }, {
        title: '课程类型', dataIndex: 'suffix',
        render(suffix) {
          return (
            <span>{suffix.indexOf('ppt') >= 0 ? 'PPT' : '视频'}</span>
          )
        }
      }, {
        title: '体系', dataIndex: 'tag'
      }, {
        title: '操作', key: 'show', render(item) {
          let openUrl = item.allow_path;
          if (item.suffix === '.ppt' || item.suffix === '.pptx') {
            openUrl = officeWebUrl + item.allow_path;
          }
          return (
            <a href={openUrl} target="_blank">预览</a>
          )
        }
      }]
    }
  }

  save(payload) {
    if (this._isMounted) {
      this.setState(payload);
    }
  }

  render() {
    let { courseStudy, dispatch, structure: {
      positionStructure
    } } = this.props;
    let { searchParam, dataSource } = courseStudy;
    const { statusData, columns } = this.state;

    let handerChangeSearch = (key, value) => {
      searchParam[key] = value;
      dispatch({
        type: 'courseStudy/save',
        payload: {
          searchParam,
        }
      })
    }
    let resetSearch = () => {
      dispatch({
        type: 'courseStudy/save',
        payload: {
          searchParam: {},
        }
      });

      dispatch({
        type: 'courseStudy/getList',
        payload: {
          // page: firstPage,
        }
      })
    }
    let handerSearch = () => {
      dispatch({
        type: 'courseStudy/getList',
        payload: {
          // page: firstPage,
        }
      })
    }

    // 状态筛选
    let renderSeleStatus = statusData.map((item) => {
      return (
        <Option value={item.code} key={item.code}>{item.value}</Option>
      )
    });

    let renderSelePosition = '';
    if (!_.isEmpty(positionStructure)) {
      let arrPosition = [];
      _.forEach(positionStructure, (item) => {
        arrPosition.push({
          value: item.name,
          code: item.id,
        })
      })
      let optionPostion = arrPosition.map((item) => {
        return (
          <Option value={item.code} key={item.code}>{item.value}</Option>
        )
      });
      renderSelePosition = (
        <div className={style.searchItem}>
          <span>岗位：</span>
          <Select value={searchParam.pid || ''} style={{ width: 120 }} onChange={(e) => { handerChangeSearch('pid', e) }}>
            <Option value="">全部</Option>
            {optionPostion}
          </Select>
        </div>
      )
    }

    let tableOpt = {
      rowKey: 'uid',
      dataSource: dataSource || [],
      columns,
      locale: {
        emptyText: '暂无数据'
      },
      pagination: false,
    }

    return (
      <div>
        <div className={style.content}>
          <div className={style.searchBox}>
            <div className={'clearfix'}>
              <div className={style.searchItem}>
                <span>学习状态：</span>
                <Select value={searchParam.learnStatus || ''} style={{ width: 120 }} onChange={(e) => { handerChangeSearch('learnStatus', e) }}>
                  {renderSeleStatus}
                </Select>
              </div>
              {renderSelePosition}
              <div className={style.searchItem}>
                <Button type="primary" onClick={handerSearch} style={{ 'marginRight': '15px' }}>查询</Button>
                <Button onClick={resetSearch}>重置</Button>
              </div>
            </div>
          </div>
          <Table {...tableOpt} />
        </div>
      </div>
    )
  }
}

export default connect((({ courseStudy, structure, app }) => ({
  courseStudy,
  structure,
  app,
})))(RecordList);
