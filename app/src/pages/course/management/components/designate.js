// 指派
import { Modal, Form, Checkbox } from 'antd';
import DeptSele from '@components/seleDept/';

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;

const Designate = ({ visible, onCancel, handleOk, handleChange, form, structure: {
  positionStructure
}, userType }) => {
  // let deptOpt = {
  //   structure,
  //   userType,
  //   onChange: handleChange,
  //   getPopupContainerId: 'js_sele_designate',
  // }
  // <DeptSele {...deptOpt} />
  // <div id="js_sele_designate"></div>

  const { getFieldDecorator, validateFields } = form;

  let options = [];
  _.forEach(positionStructure, (item) => {
    options.push({
      label: item.name,
      value: item.id,
    })
  })

  let handleSubmit = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        handleOk(values.position.join(','))
      }
    })
  }

  const formItemLayout = {
    labelCol: {
      sm: { span: 6 },
    },
    wrapperCol: {
      sm: { span: 15 },
    },
  };

  return (
    <Modal
      title="课程指派"
      width={500}
      destroyOnClose={true}
      visible={visible}
      centered={true}
      onOk={handleSubmit}
      onCancel={onCancel}>
      <div style={{ padding: '20px 0 20px 50px' }}>
        <Form>
          <FormItem {...formItemLayout} label="选择岗位">
            {getFieldDecorator('position', {
              rules: [{
                required: true, message: '请选择岗位',
              }],
            })(
              <CheckboxGroup options={options} />
            )}
          </FormItem>
        </Form>
      </div>
    </Modal>
  )
}

export default Form.create()(Designate);
