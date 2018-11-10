import { Modal, Button, Spin, message } from 'antd';
import lodash from 'lodash';
import { Component } from 'react';
import './Remark.less';
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css';
import classnames from 'classnames';


class RemarkModal extends Component {
  constructor (props) {
    super(props);
    this.state = {
      remarkLoading: false,
      spinning: false,
      title: '编辑内容',
      remark: '',
      remarkData: [],
      text: '',
      editStatus: true,
      modalVisible: false,
      currentLength: 0,
    };
  }

  UNSAFE_componentWillReceiveProps ({value }) {
    if(value) {
      let remarkData = [];
      try {
        remarkData = JSON.parse(value);
      } catch (e) {
        message.error(e);
      }
      this.setState({remarkData});
      const renderDelta = remarkData.reduce((arr, item, index) => {
        if (parseInt(item.type, 10) === 1) {
          arr[index] = `<p><img class="quill-img" src="${item.value}" alt="" /></p>`;
        } else {
          arr[index] = `<p>${item.value.replace(/[\n]/g, '<br />')}</p>`;
        }
        return arr;
      }, []);
      this.setState({ text: renderDelta.join(''), editStatus: true });
    }
  }

  handleOk = () => {
      let remark = '';
      if (!this.deltaData) {
        this.deltaData =this.Quill.getEditor().getContents();
      }

      if(!this.deltaData) {
        message.error('正文不能为空');
        return false;
      }
      if(this.deltaData) {
        const { ops } = this.deltaData;
        const remarkLength = ops.reduce((sum, item) => {
          if (!item.insert.image) {
            sum += lodash.trim(item.insert).length;
          } else {
            sum += 1;
          }
          return sum;
        }, 0)
        remark = ops.reduce((arr, item, index) => {
          if (item.insert.image) {
            arr[index] = { type: 1, value: item.insert.image };
          } else {
            arr[index] = { type: 2, value: item.insert };
          }
          return arr;
        }, []);
      };
      if (remark.length) {
        this.triggerChange(remark)
        this.handleCancel()
        this.setState({value: remark})
      }
    // });
  }

  handleCancel = () => {
    this.props.onCancel && this.props.onCancel()
  }

  // eslint-disable-next-line
  handleChange = (value, delta, source, editor) => {
    this.deltaData = editor.getContents();
    let currentLength = editor.getLength();
    currentLength = currentLength > 0 ? currentLength - 1 : 0;
    this.setState({ text: value, currentLength: currentLength });
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

  handleEdit = () => {
    this.setState({ editStatus: false });
  }

  closeSpinning = () => {
    this.setState({ spinning: false });
  }

  showSmModal = () => {
    this.setState({
      modalVisible: true,
    });
  }

  handleModalOk = () => {
    this.setState({
      modalVisible: false,
      visible: false,
    });
  }

  handleModalCancel = () => {
    this.setState({
      modalVisible: false,
    });
  }

  triggerChange = (value) => {
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(JSON.stringify(value));
    }
  }

  render () {
    const {
      remarkLoading, userInfo, currentFarm, selectedRemark, remarkList,visible,value
    } = this.props;

    const modules = {
      toolbar: [],
    };

    const {remarkData} = this.state;
      return (
        <div>
          <div onClick={() => {
            this.props.onClick && this.props.onClick();
          }} style={{width: '100%', height: '208px', border: '1px solid #e5e5e5',borderRadius: '3px',overflow: 'auto'}}>
            {Array.isArray(remarkData) && remarkData.map(({type, value}, index) => {
              let dom = '';
              if(parseInt(type, 10) === 1) {
                dom = <div  key={index}><img style={{width: '100%'}} src={value} alt="img"/></div>;
              }else if(parseInt(type,10) === 2) {
                dom = <p  key={index}>{value}</p>;
              }
              return dom;
            })}
          </div>
          <Modal
           visible={visible}
           title={this.state.title}
           onCancel={this.handleCancel}
           confirmLoading={remarkLoading}
           maskClosable={false}
           width={888}
           wrapClassName="remark-modal"
           footer={[
             <Button key="save" type="primary" loading={remarkLoading} onClick={this.handleOk}>保存</Button>
           ]}
          >
          <Modal
              visible={this.state.modalVisible}
              wrapClassName="vertical-center-modal"
              onCancel={this.handleModalCancel}
              width={420}
              footer={[
                <Button key="cancel" onClick={this.handleModalCancel}>取消</Button>,
                <Button key="confirm" type="primary" onClick={this.handleModalOk}>确定</Button>,
              ]}
          >
            <p style={{ margin: '30px 0', textAlign: 'center' }}>当前编辑的信息还未保存，是否要退出</p>
          </Modal>
          <Spin spinning={this.state.spinning}>
            <div className={classnames("modal-textarea")}>
              <div>
                <ReactQuill
                  className="quill-editor-box"
                  ref={node => this.Quill = node}
                  value={this.state.text}
                  placeholder={"请输入内容"}
                  modules={modules}
                  onChange={this.handleChange}
                />
              </div>
            </div>
          </Spin>
        </Modal>
      </div>
    )
  }
}

export default RemarkModal;
