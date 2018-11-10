import { EnhanceModal } from 'components'
import { Input, Form } from 'antd'

const { TextArea } = Input
const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    sm: { span: 6 },
  },
  wrapperCol: {
    sm: { span: 15 },
  },
}

const CloseDeal = ({
  form,
  modalProps: {
    visible,
    handerclose,
    confirmLoading,
    handerSubmit,
    orderItem,
  },
}) => {
  const { getFieldDecorator } = form
  const { buyerName, buyerMobile, serviceTypeDesc } = orderItem

  const modalAttr = {
    title: '关闭交易订单',
    visible,
    onCancel: handerclose,
    form,
    confirmLoading,
    width: 600,
    onOk(values) {
      handerSubmit(values)
    }
  }

  return (
    <EnhanceModal {...modalAttr}>
      <Form>
        <FormItem {...formItemLayout} label="真实姓名">
          {getFieldDecorator('buyerName')(
            <span>{buyerName}</span>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="手机号">
          {getFieldDecorator('buyerMobile')(
            <span>{buyerMobile}</span>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="商品类型">
          {getFieldDecorator('serviceTypeDesc')(
            <span>{serviceTypeDesc}</span>
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="备注">
          {getFieldDecorator('comment', {
            rules: [{
              required: true, message: '请输入备注',
            }],
          })(
            <TextArea maxLength="500" autosize={{ minRows: 3, maxRows: 3 }} />
          )}
        </FormItem>
      </Form>
    </EnhanceModal>
  )
}

export default Form.create()(CloseDeal)