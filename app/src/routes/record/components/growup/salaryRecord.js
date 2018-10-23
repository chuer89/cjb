import React from 'react';
import { Card, Table, Button, message } from 'antd';
import AddModule from './addSalary';
import _ from 'lodash';
import services from '../../../../services/';
import moment from 'moment';
import style from './table.less';

// 个人成长
class salaryRecord extends React.Component {
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
    let { salaryRecord, uid, upSalaryList } = this.props;
    let { visibleAdd } = this.state;
    let self = this;
    
    _.forEach(salaryRecord, (item) => {

      // dataSource.push({

      // })
    })

    console.log(salaryRecord, 'list')

    const salaryRecordColumns = [{
      title: '生效时间', dataIndex: 'time', render: (time) => {
        return (
          <span>{moment(time).format('YYYY-MM-DD')}</span>
        )
      }
    }, {
      title: '调整前', dataIndex: 'salaryBefore',
    }, {
      title: '调整后', dataIndex: 'salaryAfter',
    }, {
      title: '调整幅度', dataIndex: 'range', render: () => {
        return (
          <span>22%</span>
        )
      }
    }, {
      title: '原因', dataIndex: 'reason', render: (reason) => {
        return (
          <p className={style.seasonBox} title={reason}>{reason}</p>
        )
      }
    }];

    let addOpt = {
      visible: visibleAdd,
      onCancel() {
        self.save({
          visibleAdd: false,
        });
      },
      callBack(param) {
        _.extend(param, {
          uid,
        });
        services.addUserSalaryRecord(param).then(({data}) => {
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
    let tableOpt = {
      dataSource: salaryRecord,
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
        <Card title="工资调整记录" extra={renderExtra}>
          <Table {...tableOpt} />
        </Card>
      </div>
    );
  }
};

export default salaryRecord;