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
  const { name, mobileRegion, mobile, serviceTypeDesc } = orderItem

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

  return (
    <EnhanceModal {...modalAttr}>
      <Form>
        <FormItem {...formItemLayout} label="商品类型">
          {getFieldDecorator('serviceTypeDesc')(
            <span>{serviceTypeDesc}</span>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="真实姓名">
          {getFieldDecorator('name')(
            <span>{name}</span>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="手机号">
          {getFieldDecorator('mobile')(
            <span>+{mobileRegion} {mobile}</span>
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