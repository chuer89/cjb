import React from 'react';
import App from '../../app';
import { Breadcrumb, Form, Input, Button, Select, Upload, Icon, message } from 'antd';
import style from './add.less';
import { Link } from 'dva/router';
import _ from 'lodash';
import services from '../../../services/';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

class CourseAddForm extends React.Component {
  state = {
    tag: [{ name: '自定义', code: -1 }],

    tagValue: '',
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

  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  render() {
    let { tag, tagValue } = this.state;
    let { form, handerAdd, tagTypeData } = this.props;
    const { getFieldDecorator } = form;
    let self = this;

    let handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          let fileId = [];
          let param = {};
          let tag = values.tags;

          _.forEach(values.fileFile, (item) => {
            let { response } = item;
            let id = _.get(response, 'data.id');
            id && fileId.push(id);
          });

          if (values.tags === '-1') {
            tag = values.tagOwn;
          }

          _.extend(param, values, {
            fileId: fileId.join(','),
            fileFile: '',
            tag,
            tags: '',
            tagOwn: '',
          });

          handerAdd(param);
        }
      });
    }

    const formItemLayout = {
      labelCol: {
        sm: { span: 6 },
      },
      wrapperCol: {
        sm: { span: 15 },
      },
    };

    let handleChange = (value) => {
      self.save({
        tagValue: _.toString(value),
      });
    }

    let renderTag = '';
    if (_.isArray(tagTypeData)) {
      renderTag = tagTypeData.map((item, index) => {
        let code = '-1';
        let name = '自定义';
        if (item.code) {
          name = item.name;
          code = item.name;
        }

        return (
          <Option key={code}>{name}</Option>
        )
      });
    }

    let renderOwnTag = '';
    if (tagValue === '-1') {
      renderOwnTag = (
        <FormItem {...formItemLayout} label="自定义课程体系">
          {getFieldDecorator('tagOwn', {
            rules: [{
              required: true, message: '请输入课程体系',
            }],
          })(
            <Input placeholder="请输入课程体系" autoComplete="off" maxLength="32" />
          )}
        </FormItem>
      )
    }

    const fileProps = {
      name: 'file',
      multiple: true,
      action: services.addImg,
      data: {
        type: 6,
      },
      // accept: '.ppt,.pptx,.mp4,.flv.avi',
    };

    return (
      <div>
        <div>
          <Form onSubmit={handleSubmit}>
            <FormItem {...formItemLayout} label="课程体系">
              {getFieldDecorator('tags', {
                rules: [{
                  required: true, message: '请选择课程体系',
                }],
              })(
                <Select
                  allowClear={true}
                  style={{ width: 320 }}
                  placeholder="请选择课程体系"
                  onChange={handleChange}
                >
                  {renderTag}
                </Select>
              )}
            </FormItem>
            {renderOwnTag}
            <FormItem {...formItemLayout} label="课程讲师">
              {getFieldDecorator('teacher', {
                rules: [{
                  required: true, message: '请输入课程讲师',
                }],
              })(
                <Input placeholder="请输入课程讲师" autoComplete="off" maxLength="32" style={{ width: 320 }} />
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="资料上传">
              {getFieldDecorator('fileFile', {
                rules: [{
                  required: true, message: '请上传资料',
                }],
                getValueFromEvent: self.normFile,
                valuePropName: 'fileList',
              })(
                <Upload.Dragger {...fileProps}>
                  <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                  </p>
                  <p className="ant-upload-text">单击或拖动文件到该区域上传</p>
                  <p className="ant-upload-hint">支持单个或批量上传</p>
                </Upload.Dragger>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="课程描述">
              {getFieldDecorator('desc', {
                rules: [{
                  required: true, message: '请输入课程描述',
                  min: 5, message: '请至少输入5个字符'
                }],
              })(
                <TextArea rows={4} maxLength={300} placeholder="请至少输入5个字符" style={{ width: 420 }} />
              )}
            </FormItem>
            <div className={style.submitBtnBox}>
              <Button type="primary" htmlType="submit" size="large" style={{ marginRight: '24px' }}>添加</Button>
              <Link to="/course/config">
                <Button size="large">取消</Button>
              </Link>
            </div>
          </Form>
        </div>
      </div>
    )
  }
}

const WrappedCourseAddForm = Form.create()(CourseAddForm);

const CourseAdd = ({ dispatch, course }) => {
  let { tagTypeData } = course;
  let listPath = '/course/config';
  let handerAdd = (param) => {
    services.addTrainLibrary(param).then(({ data }) => {
      if (data.msg === 'success') {
        message.success('上传成功');
        dispatch(routerRedux.push({
          pathname: listPath,
        }))
      } else {
        message.error(data.msg);
      }
    })
  };

  let formOpt = {
    tagTypeData,
    handerAdd,
  }

  return (
    <App>
      <div style={{ paddingBottom: '12px' }}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to={listPath}>课程管理</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>课程添加</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className={style.addBox}>
        <div className={style.titleBox}>添加课程</div>
        <WrappedCourseAddForm {...formOpt} />
      </div>
    </App>
  );
};

export default connect((({ course }) => ({
  course,
})))(CourseAdd);