/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import {ItemType} from 'components'
import {Form, Row, Col, Button} from 'antd'
import styles from './Filter.less'

const BtnProps = {
  style: {
    paddingRight: '13px',
    float: 'right',
  },
}

const Filter = ({
                  queryCondition,
                  form,
                  onSearch,
                  onReset
                }) => {
  const {
    getFieldDecorator,
    getFieldsValue,
    resetFields,
  } = form;

  const handlerSearch = () => {
    const data = getFieldsValue();
    onSearch(data)
  }
  const handlerReset = () => {
    resetFields();
    onReset && onReset();
  }
  return (
    <div className={styles.fiterContainer} id="js_filter_box">
      <Row gutter={24}>
        <ItemType {...{
          queryCondition,
          form,
        }}/>
      </Row>
      <Row gutter={24} type="flex" justify="end">
        <Col {...BtnProps}>
          <Button className="btn-diy-size" type="primary" onClick={handlerSearch}>
            查询
          </Button>
        </Col>
        <Col {...BtnProps}>
          <Button className="btn-diy-size" onClick={handlerReset}>
            重置
          </Button>
        </Col>
      </Row>
    </div>
  )
}

Filter.propTypes = {
  selectCondition: PropTypes.object,
  form: PropTypes.object,
  queryCondition: PropTypes.array,
  onSearch: PropTypes.func,
  onReset: PropTypes.func,
}
export default Form.create()(Filter)
