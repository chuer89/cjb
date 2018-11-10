import React, { Component} from 'react'
import { Input, Form, Modal, Button} from 'antd'
import PropTypes from 'prop-types'
import styles from './EditModal.less'

const { TextArea } = Input
const FormItem = Form.Item

const formStyles = {
  width: '400px',
}

class EditModalContent extends Component {
  render ({
    form: {
      getFieldDecorator,
      getFieldValue,
      validateFields,
    },
    visible,
    dispatchContent,
    onCancel,
    loading,
    effectsType,
    placeholder,
    title,
  } = this.props) {
    const onOk = () => {
      validateFields((error) => {
        if(error) {
          console.log('error')
        } else {
          const value = getFieldValue('value')
          dispatchContent(value)
        }
      })
    }
    return (
      <Modal
      width="600px"
      title="操作"
      maskClosable="false"
      bodyStyle= {{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      destroyOnClose
      onCancel={onCancel}
      className={styles.editcontainer}
      footer={[
         <Button key="back" onClick={onCancel}>取消</Button>,
         <Button key="submit" type="primary" loading={loading.effects[effectsType]} onClick={onOk}>
           确定
         </Button>,
       ]}
      visible={visible}>

        <Form style={formStyles}>
          <p className={styles.title}>{title}</p>
          <FormItem>
            {getFieldDecorator('value', {
              rules: [
                {
                  max: 500,
                  message: '最多500字',
                },
                {
                  required: true,
                  message: placeholder || '请输入原因',
                },
              ],
            })(
              <TextArea
                placeholder={placeholder || '请输入原因'}
                autosize={{ minRows: 8, maxRows: 8 }} />
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

EditModalContent.propTypes = {
  form: PropTypes.object.isRequired,
  visible: PropTypes.bool.isRequired,
  dispatchContent: PropTypes.func,
  onCancel: PropTypes.func,
  loading: PropTypes.object,
  effectsType: PropTypes.string,
  placeholder: PropTypes.string,
  title: PropTypes.string,
}

export default Form.create()(EditModalContent)
