import React from 'react';
import { Row, Col, Card, Table } from 'antd';
import _ from 'lodash';
import style from './expression.less';

const { Meta } = Card;

// 个人成长
class Expression extends React.Component {
  state = {

  }

  render() {

    const dataSource = [{
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号'
    }, {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号'
    }];

    const columns = [{
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    }, {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    }];

    let data = [{
      title: '工资调整记录',
      isLoading: false,
      dataSource,
      columns,
    }, {
      title: '奖惩记录',
      isLoading: true,
      dataSource,
      columns,
    }];

    let renderData = data.map((item, index) => {
      return (
        <div key={index} className={style.itemBox}>
          <Card title={item.title} loading={item.isLoading}>
            <Table dataSource={item.dataSource} columns={item.columns} />
          </Card>
        </div>
      )
    });

    return (
      <div>{renderData}</div>
    );
  }
};

export default Expression;