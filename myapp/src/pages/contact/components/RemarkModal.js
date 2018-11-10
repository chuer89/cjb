import React, { Component } from 'react';
import { Modal, Form, Input, message } from 'antd';
import { EnhanceModal } from 'components';
import ReactQuill from 'react-quill'; // ES6
import styles from './styles.less';
import { Uploader, UploadField } from '@navjobs/upload';
import { api } from 'config';
import _ from 'lodash';
import 'react-quill/dist/quill.snow.css';

class RemarkModal extends Component {
  state = {
    text: '',
    visible: false,
    edit: false,
    remarkLength: 0,
    delta: null,
    spinning: false,
  }

  UNSAFE_componentWillReceiveProps({ visible }) {
    if(visible && this.props.visible !== visible) {
      this.setState({
        visible,
      }, () => {
        if (this.props.titleReadOnly) {
          const { defaultTitle } = this.props;
          this.props.form.setFieldsValue({
            title: defaultTitle,
          });
        }
        const { selectedRemarkId } = this.props;
        if(selectedRemarkId) {
          const remarkInfo = _.filter(this.props.remarkList, ["id", selectedRemarkId])[0];
          !this.props.titleReadOnly && this.props.form.setFieldsValue({
            title: remarkInfo.title,
          });
          let remarkData = [];
          try {
            remarkData = JSON.parse(remarkInfo.remark);
          } catch (e) {
            message.error(e);
          }
          const renderDelta = remarkData.reduce((arr, item, index) => {
            if (item.type === 1) {
              arr[index] = `<img class="quill-img" src="${item.value}" alt="" />`;
            } else {
              arr[index] = `<p>${item.value.replace(/[\n]/g, '<br />')}</p>`;
            }
            return arr;
          }, []);
          this.setState({ text: renderDelta.join(''), edit: true })
        } else {
          const { defaultTitle } = this.props;
          this.props.form.setFieldsValue({
            title: defaultTitle,
          });
          this.setState({ text: '', remarkLength: 0, delta: null, edit: false });
        }
      })
    }
  }

  hanleModalConfirm = () => {
    Modal.confirm({
      title: '当前编辑的信息还未保存，是否要退出',
      onOk: () => {
        this.setState({ visible: false })
      },
    });
  }

  handleQuillChange = (value, delta, source, editor) => {
    const content = editor.getContents();
    let remarkLength = editor.getLength();
    remarkLength = remarkLength > 0 ? remarkLength - 1 : 0;
    this.setState({ text: value, remarkLength, delta: content });
  }

  handleUpLoad = (e, onFiles) => {
    const files = e.target.files;
    if (files[0].size > 1024 * 1024 * 2) {
      message.error('文件大小不能超过2m');
      return false;
    }
    onFiles(e.target.files);
    this.setState({ spinning: true });
  }

  render () {
    const { confirmLoading, form, title, selectedRemarkId } = this.props;
    const { getFieldDecorator, validateFields } = form;

    const { visible } = this.state;

    const modalProps = {
      visible,
      title: selectedRemarkId ? this.state.edit ? `查看${title}`: `编辑${title}` : `新增${title}`,
      width: 708,
      // form,
      confirmLoading,
      maskClosable: false,
      okText: !this.state.edit ? '保存' : '编辑',
      onCustomCancel: () => {
        if(!this.state.edit) {
          this.hanleModalConfirm()
        } else {
          this.setState({
            visible: false,
          })
        }
      },
      onOk: () => {
        if(this.state.edit) {
          this.setState({ edit: false })
          return false;
        }
        validateFields((errors, values) => {
          if(errors) {
            const errorMsg = errors[Object.keys(errors)[0]].errors[0].message;
            message.error(errorMsg);
            return false;
          }

          const { remarkLength, delta } = this.state;
          console.log(delta, remarkLength);
          if(!delta || remarkLength === 0) {
            message.error('正文不能为空');
            return false;
          }
          if (remarkLength > 500) {
            message.error('正文长度不能大于500字符');
            return false;
          }
          const { ops } = delta;
          const remark = ops.reduce((arr, item, index) => {
            if (item.insert.image) {
              arr[index] = { type: 1, value: item.insert.image };
            } else {
              arr[index] = { type: 2, value: item.insert };
            }
            return arr;
          }, []);
          console.log(remark);
          if(this.props.selectedRemarkId) {
            this.props.editRemark({id: this.props.selectedRemarkId,  title: values.title, remark: JSON.stringify(remark)})
          } else {
            this.props.addRemark({ title: values.title, remark: JSON.stringify(remark)})
          }
        })
      }
    }

    const modules = {
      toolbar: [],
    };

    const upLoadProps = {
      request: {
        fileName: 'file',
        url: api.base.upLoadImg,
        method: 'POST',
      },
      fileName: 'file',
      uploadOnSelection: true,
      onComplete: ({ response, status }) => {
        if (status === 200) {
          const quill = this.Quill.getEditor();
          const index = quill.getSelection() ? quill.getSelection().index : 0;
          quill.insertEmbed(index, 'image', response.content);
          document.getElementById('uploadImg').value = '';
        } else {
          message.error('系统异常，稍后再试');
        }
        this.setState({ spinning: false });
      },
    };

    return (
      <div>
        <EnhanceModal {...modalProps} >
          <div className={styles["modal-quill-container"]}>
          {!this.state.edit && <div className="modal-textarea-actions">
            <Uploader { ...upLoadProps }>
              {({ onFiles }) => (
                  <UploadField
                    // onFiles={onFiles}
                    uploadProps={{
                      id: 'uploadImg',
                      accept: '.jpg, .png, jpeg, .gif',
                    }}
                    onChange={(e) => {
                      this.handleUpLoad(e, onFiles)
                    }}
                  >
                    <i className="iconfont">&#xe66b;</i>
                  </UploadField>
              )}
            </Uploader>
          </div>}
            {getFieldDecorator('title', {
              rules: [
                { required: true, message: '标题必填' },
                { max: 30, message: '标题不能超过30字符' }
              ],
            })(<Input className="modal-textarea-title" placeholder="标题" autoComplete='off' disabled={this.props.titleReadOnly ? true : this.state.edit} />)}

            <ReactQuill
              className="quill-editor-box"
              ref={node => this.Quill = node}
              value={this.state.text}
              readOnly={this.state.edit}
              placeholder={"请输入备注内容"}
              modules={modules}
              onChange={this.handleQuillChange}
            />
          <div className="quill-text-count">
            <span>{this.state.remarkLength}</span>/<span>500</span>{this.state.remarkLength > 500 && <span className="error-text">正文长度不能超过500字</span>}
          </div>
          </div>
        </EnhanceModal>
      </div>
    )
  }
}

export default Form.create()(RemarkModal);