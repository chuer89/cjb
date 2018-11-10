import { Component } from 'react';
import { input, Popover } from 'antd';
// import ReactDOM from 'react-dom'
import styles from './Edit.less';
import lodash from 'lodash';
// import 'emoji-mart/css/emoji-mart.css';
import { Emoji } from './Emoji';
// import { Picker } from 'emoji-mart';


const { TextArea } = input;

class Edit extends Component {
  constructor (props) {
    super(props);
    this.state = {
      textValue: '',
    };
  }

  onChangeText = (e) => {
    this.setState({ textValue: e.target.value });
  }

  onPressEnter = (e) => {
    if (!e.shiftKey) {
      const { onSendMsg, currentFarm, inform } = this.props;
      let custom;
      if (currentFarm && currentFarm.farm) {
        const { farm } = currentFarm;
        delete farm.type;
        const customObj = {
          farmId: farm.id,
          orderNo: currentFarm.orderNo,
          inform: inform + '',
          ...farm,
        };
        custom = currentFarm.orderNo ? JSON.stringify(customObj) : '';
      }
      if (lodash.trimStart(this.state.textValue)) {
        onSendMsg({ type: 'Text', data: { text: this.state.textValue, custom } });
        setTimeout(() => {
          this.setState({ textValue: '' });
        }, 0);
      }
      setTimeout(() => {
        this.setState({ textValue: '' });
      }, 0);
    }
  }

  onSendMsgButton = () => {
    // const { currentFarm = {}, inform} = this.props;
    // let custom;
    // if (currentFarm && currentFarm.farm) {
    //   const { farm } = currentFarm;
    //   delete farm.type;
    //   const customObj = {
    //     farmId: farm.id,
    //     orderNo: currentFarm.orderNo,
    //     inform: inform + '',
    //     ...farm,
    //   };
    //   custom = currentFarm.orderNo ? JSON.stringify(customObj) : '';
    //   const content = { msgType: 9, content: { ...customObj, value: '感谢您的咨询，为了能给您提供更好的服务，请上传您的购买资质信息。' }};
      // dispatch({ type: 'chat/sendAudit', payload: { type: 'custom', data: { content: JSON.stringify(content), custom } } });
    // }
  }

  onClickFile = () => {
    const { onSendMsg, currentFarm = {}, inform } = this.props;
    let custom;
    if (currentFarm && currentFarm.farm) {
      const { farm } = currentFarm;
      delete farm.type;
      const customObj = {
        farmId: farm.id,
        orderNo: currentFarm.orderNo,
        inform: inform + '',
        ...farm,
      };
      custom = currentFarm.orderNo ? JSON.stringify(customObj) : '';
    }
    this.inputFile.onchange = () => {
      onSendMsg({ data: { fileInput: this.inputFile, custom } });
    };
    this.inputFile.click();
  }

  onTapEmoji = (value) => {
    this.setState({
      textValue: this.state.textValue + value,
      visible: false,
    }, () => {
      this.textearea.focus();
    });
  }

  render () {
    const { textValue, visible } = this.state;
    const { currentFarm = '' } = this.props;

    const emojiProps = {
      onTapEmoji: this.onTapEmoji,
    };

    const emojiPopProps = {
      content: <Emoji {...emojiProps} />,
      visible,
      trigger: 'click',
      placement: "topLeft",
      onVisibleChange: (visible) => {
        this.setState({ visible });
      },
    };

    return (
      <div className={styles["chart-input"]}>
        <div className={styles["chart-opera"]}>
          <div className={styles["chart-groups"]}>
            <div className={styles["icon-item"]}>
              <Popover {...emojiPopProps} arrowPointAtCenter >
                <i className="iconfont">&#xe652;</i>
              </Popover>
            </div>
            <div className={styles["icon-item"]} onClick={this.onClickFile}><i className="iconfont">&#xe661;</i></div>
            <input ref={node => this.inputFile = node } multiple="multiple" type="file" name="file" id="uploadFile" className={styles.inputFile} />
          </div>
          {currentFarm && currentFarm.orderStatus === 10 && currentFarm.farm && currentFarm.farm.status === 20 && <div className={styles["chart-invite"]} onClick={this.onSendMsgButton}>邀请提交资料</div>}
        </div>
        <div className={styles["chart-input-textarea"]}>
          <TextArea
            ref={node => this.textearea = node}
            value={textValue}
            onChange={this.onChangeText}
            onPressEnter={this.onPressEnter}
            maxLength="500"
           />
        </div>
      </div>
    );
  }
}

export default Edit;
