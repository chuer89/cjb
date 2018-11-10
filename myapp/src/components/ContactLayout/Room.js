import { Component } from 'react';
// import ReactDOM from 'react-dom'
import { source } from 'config';
import classnames from 'classnames';
import styles from './Room.less';
import { transMsgTime, converFileSize } from 'utils';
import Lightbox from 'react-images';
import lodash from 'lodash';
import { buildEmoji } from './Emoji';
// import IdealImage from 'react-ideal-image';
// import lqip from 'lqip.macro';
// import Image from 'react-lazy-image';

var _$encode = function (_map, _content) {
  _content = '' + _content;
  if (!_map || !_content) {
      return _content || '';
  }
  return _content.replace(_map.r, function ($1) {
      var _result = _map[!_map.i ? $1.toLowerCase() : $1];
      return _result != null ? _result : $1;
  });
};
const _$escape = (function () {
  var _reg = /<br\/?>$/,
      _map = {
          r: /\<|\>|\&|\r|\n|\s|\'|\"/g,
          '<': '&lt;', '>': '&gt;', '&': '&amp;', ' ': '&nbsp;',
          '"': '&quot;', "'": '&#39;', '\n': '<br/>', '\r': '',
      };
  return function (_content) {
      _content = _$encode(_map, _content);
      return _content.replace(_reg, '<br/><br/>');
  };
})();

class Room extends Component {
  constructor (props) {
    super(props);
    this.listNode = null;
    this.state = {
      lightboxIsOpen: false,
      currentImage: 0,
      pageScroll: false,
      audio: null,
      audioPlay: false,
    };
  }


  componentDidUpdate () {
    this.pageScrollTop();
    this.listNode.addEventListener("scroll", (e) => {
      const { scrollDesc, loading } = this.props;
      const target = e.target;
      // console.log(e, target.scrollTop, target.scrollHeight, target.offsetTop, target.offsetHeight, target.clientHeight, target.clientTop);
      if (target.scrollTop < 100 && scrollDesc && loading.effects['contact/getMoreMsgs']) {

      }
    })
  }

  pageScrollTop = () => {
    const { scrollTop } = this.props;
    console.log(scrollTop);
    if (scrollTop !== 9999) { return false }
    this.listNode && (this.listNode.scrollTop = 9999);
  }

  closeLightbox = () => {
    this.setState({
      lightboxIsOpen: false,
    });
  }

  openLightBox = (id) => {
    const currentImage = lodash.findIndex(this.imgGroups, ["id", id]);
    this.setState({
      lightboxIsOpen: true,
      currentImage,
      pageScroll: false,
    });
  }

  gotoPrevious = () => {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }

  gotoNext = () => {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }

  resendMsg = (msg) => {
    const { dispatch } = this.props;
    dispatch({ type: 'chat/resendMsg', payload: { msg } });
  }


  audioPlay = ({ url, id, dur }) => {
    if (!!window.Audio) {
      const { audioPlay } = this.state;
      if (!audioPlay) {
        this.setState({
          audio: id,
          audioPlay: true,
          pageScroll: false,
        }, () => {
          new window.Audio(url + '?audioTrans&type=mp3').play();
        });
        setTimeout(() => {
          this.setState({
            audioPlay: false,
          });
        }, dur);
      }
    }
  }

  renderMsgType = (data, index) => {
    const headerStyle = data.flow === 'in' ? styles["msg-you"]: styles["msg-me"];
    const file = data.file;
    const userAvatar = this.props[data.flow + 'Info'].avatar;
    const avatarContent = userAvatar ? (<img className={styles["msg-avator"]} src={userAvatar} alt=""/>) : (<img className={styles["msg-avator"]} src={source.roomUserAvatar} alt=""/>);
    const MSG_STATUS = {
      fail: <i className={classnames('iconfont', styles["icon-font"])} onClick={this.resendMsg.bind(this, data)}>&#xe654;</i>,
      pending: <img className={styles["icon-loading"]} src={source.loadingIcon} alt=""/>,
      success: <i></i>,
    };
    // data.status = 'fail';
    const loadingIcon = data.status && MSG_STATUS[data.status] ? MSG_STATUS[data.status] : <img className={styles["icon-loading"]} src={source.loadingIcon} alt=""/>;
    switch (data.type) {
      case 'text':
        let TEXT_TYPE;
        if (data.custom) {
          try {
            TEXT_TYPE = JSON.parse(data.custom, 10).TEXT_TYPE;
          } catch (e) {
            // message.error(e);
          }
          if (TEXT_TYPE === 1) {
            return '';
          } else if (TEXT_TYPE === 2) {
            return <p className="u-msgTime">{decodeURIComponent(data.text).replace(/\n/g, '<br />')}</p>;
          }
        }
        return (
          <div key={index} className={headerStyle}>
            {avatarContent}
            <span className={styles["msg-content"]}  dangerouslySetInnerHTML={{__html: buildEmoji(decodeURIComponent(data.text).replace(/\n/g, '<br />'))}}>
            </span>
            {loadingIcon}
          </div>
        );
      case 'image':
        return (
          <div key={index} className={headerStyle}>
            {avatarContent}
            <span className={classnames(styles["msg-content"], styles["msg-grey"])}>
            {Boolean(file.url)
            ? <img src={file.url} alt={file.name} onClick={this.openLightBox.bind(this, data.idClient)} onLoad={() => {
              //  this.pageScrollTop();
            }} />
            : <img src={source.imgDefault} alt="" style={{ width: '112px', height: '112px' }} />
            }
            </span>
            {loadingIcon}
          </div>
        );
      case 'audio':
        const { audio, audioPlay } = this.state;
        return (
          <div key={index} className={headerStyle}>
            {avatarContent}
            <span className={classnames(styles["msg-content"], styles["msg-grey"])} onClick={this.audioPlay.bind(this, { dur: file.dur, url: file.url, id: data.idClient })}>
            <div className="u-audio j-mbox">
              <div className={classnames("j-play", "playAudio", { "audio-active": audio === data.idClient && !!audioPlay })} data-dur={file.dur} data-src={file.url}>
                <img className="audio-end" src={source.audio} alt=""/>
                <img className="audio-playing" src={source.audioPlay} alt=""/>
              </div>
              </div>
            {loadingIcon}
            </span>
            <b className="j-duration">{Math.floor((file.dur) / 1000)}''</b>
          </div>
        );
      case 'video':
      case 'file':
        /* eslint-disable */
        const url = file.url ? _$escape(file.url) : '';

        const extensionName = {
          'xls': '&#xe650;',
          'xlsx': '&#xe650;',
          'doc': '&#xe660;',
          'zip': '&#xe666;',
          'rar': '&#xe666;',
          'video': '&#xe662;',
          'other': '&#xe666;', // 其他未知
        };
        const extensionColor =  {
          other: '#999',
          doc: '#1d7bea',
          zip: '#999',
          rar: '#999',
          video: '#999',
        };
        const extensionIcon = extensionName[file.ext] || extensionName['other'];
        return (
          <div key={index} className={headerStyle}>
            {avatarContent}
            <a href={file.url + '?download=' + encodeURI(_$escape(file.name))} target="_blank" >
              <span className={classnames(styles["msg-content"], styles["msg-grey"])}>
                <div className={styles["msg-file"]}>
                    {/* {config[`icon${file.ext}`] ? <img src={config[`icon${file.ext}`]} alt=""/> : <img src={config.iconzip} alt=""/>} */}
                  <i className="iconfont" dangerouslySetInnerHTML={{__html: extensionIcon}} style={{ fontSize: '48px', marginRight: '8px', display: 'block', color: extensionColor[file.ext] || extensionColor['other'], lineHeight: 'initial' }}></i>
                  <div className={styles["file-content"]}>
                    <div className={styles["file-name"]}>
                      {file.name}
                    </div>
                    <div className={styles["file-tips"]}>
                      <span>{converFileSize(file.size)}</span><span>{file.ext}</span>{file.progress ? <span>{file.progress}</span> : ''}
                    </div>
                  </div>
                </div>
              </span>
            </a>
            {loadingIcon}
          </div>
        );
      case 'custom':
        let parseContent = {};
        try {
          parseContent = JSON.parse(data.content, 10);
        } catch (e) {
          // message.error(e);
        }
        const { msgType, content } = parseContent;
        // let customContent = farmContent || FARM_CONTENT;
        // if (customContent) {
        //   return (
        //     <div key={index} className={headerStyle}>
        //       {avatarContent}
        //       <div className={styles["msg-content"]}>
        //         <a href={customContent.firstImgUrl}><img src={customContent.firstImgUrl} alt=""/>{customContent.farmName}</a>
        //       </div>
        //     </div>
        //   );
        // }
        if (msgType === 9) {
          return (
            <div key={index} className={headerStyle}>
              {avatarContent}
              <div className={classnames(styles["msg-content"], styles["msg-content-common"])}>
                <div className={styles["msg-custom"]}>
                  <div>感谢您的咨询，为了能给您提供更好的服务</div>
                  <div>请上传您的购买资质信息</div>
                </div>
                <div className={styles["msg-action"]}><span>去上传</span></div>
              </div>
            </div>
          );
        } else if (msgType === 8 && content) {
          const { farmId, farmName, firstImgUrl = '', address, area, areaUnit = '', unitPrice, unitPriceUnit = '', totalPrice, totalPriceUnit = '', typeDesc } = content;
          return (
            <div key={index} className={headerStyle}>
              {avatarContent}
              <div className={classnames(styles["msg-content"], styles["msg-content-common"])}>
                <div className={styles["msg-custom"]}>
                  <div className={styles.title}>
                    {firstImgUrl && <i style={{
                      backgroundImage: `url(${firstImgUrl.split('?')[0]}?x-oss-process=image/resize,w_48)`,
                    }}></i> }
                    <span>{farmName}</span>
                  </div>
                  <ul>
                    <li><div>地址：</div><div>{address}</div></li>
                    <li><div>面积：</div>{area + areaUnit}</li>
                    <li><div>单价：</div>{unitPrice + unitPriceUnit}</li>
                    <li><div>总价：</div>{totalPrice + totalPriceUnit}</li>
                    <li><div>类型：</div>{typeDesc}</li>
                  </ul>
                </div>
                <div className={styles["msg-action"]}><a href={farmId} target="_blank"><span>查看详细资料</span></a></div>
              </div>
            </div>
          );
        }
        return (
          <div key={index} className={headerStyle}>
            {avatarContent}
            <div className={styles["msg-content"]}>
              自定义消息
            </div>
          </div>
        );
      default:
        return '';
    }
  }

  render () {
    const { currentMsgs, scrollDesc, farmList = [], onFetchMoreData } = this.props;
    const localMsgs = currentMsgs;
    // if (localMsgs.length) {
    //   return '';
    // }
    const renderList = localMsgs ? localMsgs.map((item, index) => {
      let timeRender = '';
      const { time, custom } = item;
      if (index === 0) {
        timeRender = <p className="u-msgTime">{transMsgTime(time)}</p>;
      } else {
        if (time - localMsgs[index - 1].time > 5 * 60 * 1000) {
          timeRender = <p className="u-msgTime">{transMsgTime(time)}</p>;
        }
      }

      let chatRender;

      try {
        if (index > 0 && item.flow === 'in') {
          const currentCustom = JSON.parse(custom, 10);
          const lastCustom = JSON.parse(localMsgs[index - 1].custom);
          if (currentCustom.orderNo && lastCustom.orderNo !== currentCustom.orderNo) {
            const farmInfo = lodash.filter(farmList, { orderNo: currentCustom.orderNo });
            farmInfo.length && (chatRender = <div className="u-chatFarm-wrap"><p className="u-chatFarm">{`买家正在通过${farmInfo[0].farm.farmName}进行咨询`}</p></div>);
          }
        }
      } catch (e) {}

      return (
        <div key={index}>
          <div>{timeRender}</div>
          {chatRender && <div>{chatRender}</div>}
          {this.renderMsgType(item, index)}
        </div>
      );
    }) : '';
    this.imgGroups = lodash.filter(localMsgs, ["type", "image"]).reduce((arr, item, index) => {
      arr[index] = { src: item.file.url, id: item.idClient, caption: item.file.name };
      return arr;
    }, [])
    const imgPreviewBox = <Lightbox
      images={this.imgGroups}
      currentImage={this.state.currentImage}
      isOpen={this.state.lightboxIsOpen}
      onClickPrev={this.gotoPrevious}
      onClickNext={this.gotoNext}
      onClose={this.closeLightbox}
    />
    return (
      <div ref={node => this.listNode = node} className={styles["chartroom-container"]}>
        {this.imgGroups.length > 0 && imgPreviewBox}
        <div className={styles["chartroom-msg-list"]}>
          {scrollDesc ? <div className="u-load-more"><span onClick={() => {
            // console.log(this.listNode.scrollHeight);
            onFetchMoreData({ scrollTop: this.listNode.scrollHeight})
          }}>加载更多记录</span></div>: ''}
          {renderList}
        </div>
      </div>
    );
  }
}

export default Room;