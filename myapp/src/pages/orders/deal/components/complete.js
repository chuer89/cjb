import { EnhanceModal } from 'components'
import { Input, Form, InputNumber } from 'antd'

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

const CompleteDeal = ({
  form,
  modalProps: {
    visible,
    handerclose,
    confirmLoading,
    handerSubmit,
    orderItem,
  },
}) => {
  const { getFieldDecorator } = form;
  const { buyerName, buyerMobile, serviceTypeDesc } = orderItem

  const modalAttr = {
    title: '请确认该意向订单相关信息',
    visible,
    onCancel: handerclose,
    form,
    confirmLoading,
    width: 600,
    onOk(values) {
      handerSubmit(values)
    }
  }

  const paidPriceAttr = {
    placeholder: '请输入订单实付金额（元）',
    maxLength: 8,
    style: { width: 300 },
    max: 50000000,
    min: 0,
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

        <FormItem {...formItemLayout} label="订单实付金额">
          {getFieldDecorator('paidPrice', {
            rules: [
              { required: true, message: '请输入订单实付金额' },
            ],
          })(
            <InputNumber {...paidPriceAttr} />
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="备注">
          {getFieldDecorator('comment')(
            <TextArea maxLength="500" autosize={{ minRows: 3, maxRows: 5 }} />
          )}
        </FormItem>
      </Form>
    </EnhanceModal>
  )
}

export default Form.create()(CompleteDeal)