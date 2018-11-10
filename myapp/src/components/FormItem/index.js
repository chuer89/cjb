import React from 'react'
import PropTypes from 'prop-types'
import { ItemType } from 'components'
import { Form, Row, Col, Button } from 'antd'
import styles from './index.less'
import _ from 'lodash'

const BtnProps = {
  style: {
    paddingRight: '13px',
    float: 'right',
  },
}
const FormItem = ({
  queryCondition,
  form,
  onSave,
  onCancel,
  containerStyle,
}) => {
  const {
    getFieldDecorator,
    getFieldsValue,
    resetFields,
    validateFieldsAndScroll,
    validateFields
  } = form;
  const handlerSave = () => {
    validateFields((errors, values) => {
      if (!errors) {
        // 保存
        const data = getFieldsValue()
        const { time } = data
        if (time && time.length) {
          // fields.createTime = [createTime[0].format('YYYY-MM-DD'), createTime[1].format('YYYY-MM-DD')]
          data.startDate = time[0].format('YYYY-MM-DD')
          data.endDate = time[1].format('YYYY-MM-DD')
        }
        onSave(data)
      } else {
        console.log('验证不通过!')
      }
    });
  }

  // 取消
  const handlerCancel = () => {
    _.isFunction(onCancel) && onCancel()
  }

  return (<>
    <div className={styles.container} style={containerStyle} id="js_filter_box">
      <Row type="flex" gutter={24} justify="start">
        <ItemType {...{
          queryCondition,
          form,
        }} />
      </Row>
    </div>
    <div style={{marginTop:'20px'}}>
      <Row gutter={24} type="flex" justify="center">
        <Col {...BtnProps}>
          <Button className="btn-diy-size" type="primary" onClick={handlerSave}>
            保存
          </Button>
        </Col>
        <Col {...BtnProps}>
          <Button className="btn-diy-size" onClick={handlerCancel}>
            取消
          </Button>
        </Col>
      </Row>
    </div>
  </>)
}

FormItem.propTypes = {
  selectCondition: PropTypes.object,
  form: PropTypes.object,
  queryCondition: PropTypes.array,
  onSave: PropTypes.func,
}
export default Form.create()(FormItem)
