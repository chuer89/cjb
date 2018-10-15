import React from 'react';
import App from '../../app';
import { Breadcrumb, Form, Input, Button, Select } from 'antd';
import style from './add.less';
import { Link } from 'dva/router';

const FormItem = Form.Item;
const Option = Select.Option;

class CourseAddForm extends React.Component {
  state = {
    tag: [],
  }

  UNSAFE_componentWillMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  save(payload) {
    if (this._isMounted) {
      this.setState(payload);
    }
  }

  render() {
    let { tag } = this.state;
    let { form } = this.props;
    const { getFieldDecorator } = form;

    let handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {

        }
      });
    }

    let handleChange = (value) => {
      console.log(value, 'val')
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
      <div>
        <div>
          <Form onSubmit={handleSubmit}>
            <FormItem {...formItemLayout} label="课程讲师">
              {getFieldDecorator('tags', {
                rules: [{
                  required: true, message: '请输入课程讲师',
                }],
              })(
                <Select
                  allowClear={true}
                  style={{ width: '100%' }}
                  placeholder="课程体系"
                  onChange={handleChange}
                >
                  {
                    tag.map((item, index) => {
                      <Option key={index}>{item.name}</Option>
                    })
                  }
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="课程讲师">
              {getFieldDecorator('teacher', {
                rules: [{
                  required: true, message: '请输入课程讲师',
                }],
              })(
                <Input placeholder="请输入课程讲师" autoComplete="off" maxLength="32" />
              )}
            </FormItem>
            <FormItem>
              <div className={style.submitBtnBox}>
                <Button block type="primary" htmlType="submit" size="large">添加</Button>
              </div>
            </FormItem>
          </Form>
        </div>
      </div>
    )
  }
}

const WrappedCourseAddForm = Form.create()(CourseAddForm);

const CourseAdd = () => {
  return (
    <App>
      <div style={{ paddingBottom: '12px' }}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/course/config">课程管理</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>课程添加</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className={style.addBox}>
        <div className={style.titleBox}>添加课程</div>
        <WrappedCourseAddForm />
      </div>
    </App>
  );
};

export default CourseAdd;