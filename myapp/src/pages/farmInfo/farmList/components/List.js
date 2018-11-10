import {Row, Col} from 'antd';
import Card from './Card';
import styles from './List.less';

const colProps = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 8,
  xl: 6,
  xxl: 4,
};

const renderList = (list) => {
  return list.map((item, index) => (
    <Col key={index} {...colProps}>
      <Card {...item} />
    </Col>
  ));
};

const List = ({list}) => {
  return (
    <Row
    className={styles.listContainer}
      gutter={24}
      type="flex">
      {list&&list.length?
        renderList(list)
      :<p className={styles.noData}>暂无数据</p>}
    </Row>
  );
};

export default List;
