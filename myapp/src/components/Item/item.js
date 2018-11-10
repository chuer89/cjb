import React from 'react'
import PropTypes from 'prop-types'
import {Form} from 'antd';

const FormItem = Form.Item;

const Item = ({
                label = '',
                children,
              }) => {
  const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 14},
  };
  return (
    <>
      <FormItem
        {...{...formItemLayout, label}}
      >
        {children}
      </FormItem>
    </>
  )
}

Item.propTypes = {
  label: PropTypes.string,
  children: PropTypes.element.isRequired,
}

export default Item
