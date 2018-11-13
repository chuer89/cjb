import React from 'react';
import { Card, Table, Button, message } from 'antd';
import AddModule from './addPosition';
import _ from 'lodash';
import services from '@services';
import moment from 'moment';
import style from './table.less';

// 职位调整记录
class PositionRecord extends React.Component {
  state = {
    visibleAdd: false,
  }

  UNSAFE_componentWillMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  save(payload) {
    if (this._isMounted) {
      this.setState(payload);
    }
  }

  render() {
    let { positionRecord, uid, upSalaryList, positionData, showAdd } = this.props;
    let { visibleAdd } = this.state;
    let self = this;

    const salaryRecordColumns = [{
      title: '申请调整时间', dataIndex: 'createTime', render: (time) => {
        return (
          <span>{moment(time).format('YYYY-MM-DD')}</span>
        )
      }
    }, {
      title: '调整前', dataIndex: 'beforeName',
    }, {
      title: '调整后', dataIndex: 'afterName',
    }, {
      title: '原因', dataIndex: 'remark', render: (remark) => {
        return (
          <p className={style.seasonBox} title={remark}>{remark}</p>
        )
      }
    }];

    let addOpt = {
      visible: visibleAdd,
      positionData,
      onCancel() {
        self.save({
          visibleAdd: false,
        });
      },
      callBack(param) {
        _.extend(param, {
          uid,
        });
        services.updateUserPosition(param).then(({data}) => {
          if (data.msg === 'success') {
            message.success('添加成功');
            self.save({
              visibleAdd: false,
            });
            upSalaryList();
          } else {
            message.error(data.msg);
          }
        });
      },
    }

    let handerOpenAdd = () => {
      self.save({
        visibleAdd: true,
      })
    }

    let renderExtra = (
      <div>
        <Button onClick={handerOpenAdd}>添加</Button>
      </div>
    )
    if (!showAdd) {
      renderExtra = '';
    }
    let tableOpt = {
      dataSource: positionRecord,
      rowKey: 'id',
      columns: salaryRecordColumns,
      pagination: false,
      locale: {
        emptyText: '暂无数据'
      }
    }

    return (
      <div>
        <AddModule {...addOpt} />
        <Card title="职位调整记录" extra={renderExtra}>
          <Table {...tableOpt} />
        </Card>
      </div>
    );
  }
};

export default PositionRecord;