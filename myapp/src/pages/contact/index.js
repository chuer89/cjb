import { connect } from 'dva';
import { Component } from 'react';
import { Row, Col, Spin, Divider, Input, Icon } from 'antd';
import { ContactLayout } from 'components';
import { Header, Users, Detail } from './components';
import styles from './styles.less';

const { Relation, Room, Edit } = ContactLayout;

class Contact extends Component {
  state = {
    userName: '',
  }

  UNSAFE_componentWillMount () {
    console.log('componentDidMount');
    console.log(this.props);
    const { globalActions, callbacks } = this.props;
    globalActions.createNim(callbacks);
  }

  componentDidMount () {
    console.log('componentDidMount');
  }

  handleSearchList = (value) => {
    const { globalActions } = this.props;
    globalActions.onUpdateState({ searchKey: value })
  }

  emitEmpty = () => {
    this.userNameInput.focus();
    this.setState({ userName: '' });
    this.handleSearchList('');
  }

  onChangeUserName = (e) => {
    if (e.target.value.length <= 30) {
      this.setState({ userName: e.target.value });
      this.handleSearchList(e.target.value);
    }
  }

  render () {
    const { actions, loading } = this.props;
    const { sessionList, disconnect, loadFinish, searchKey } = this.props.contactGlobal;
    const {
      uid, inInfo, outInfo, currentMsgs, scrollDesc, scrollTop,
      userInfo, userCustom, custom, publishFarmList, subscribes,
      activeTabKey, publishFarmSelect, remarkUserList,  remarkFarmList, confirmLoading,
      farmDetail,
     } = this.props.contact;
    const { userName } = this.state;

    const relationProps = {
      list: sessionList,
      nimLoadFinish: loadFinish,
      selectedKey: uid,
      searchKey,
      nimDisconnect: disconnect,
      onChangeMenu (uid, accType) {
        actions.onUpdateState({ uid, sessionId: `${uid}@${accType}`, activeTabKey: 'user' })
        actions.onChangeLocalMsgs();
      },
    }

    const roomProps = {
      inInfo, outInfo,
      currentMsgs,
      scrollDesc,
      scrollTop,
      loading,
      onFetchMoreData(data) {
        actions.onFetchMoreData(data);
      }
    }

    const editProps = {
      onSendMsg(data) {
        actions.onSendMsg(data);
      },
    }

    // 头部信息展示
    const headerProps = {
      userInfo, userCustom, custom, farmDetail,
    }

    const detailProps = {
      farmDetail,
      userInfo,
      remarkFarmList,
      confirmLoading,
      addRemark: actions.addRemarkFarm,
      editRemark: actions.updateRemarkFarm,
    }

    // 用户模块展示
    const usersProps = {
      userInfo, publishFarmList, subscribes, remarkUserList, confirmLoading,
      activeTabKey, publishFarmSelect,
      addRemark: actions.addRemarkUser,
      editRemark: actions.updateRemarkUser,
      tabsChange(key) {
        const tabsEventMap = {
          user() {
            actions.fetchUserInfo();
          },
          farmList() {
            actions.fetchPublishFarms();
          },
          sub() {
            actions.fetchSubscribes();
          }
        }
        actions.onUpdateState({ activeTabKey: key })
        tabsEventMap[key]();
      },
      onChangePublishFarm(params) {
        actions.onUpdateState({ publishFarmSelect: params })
      }
    }

    const suffix = userName ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;

    return (
      <Spin spinning={loading.effects["contact/getCurrentMsgs"] || false}>
      <div className={styles["contact"]}>
        <div className={styles["contact-menu"]}>
          <div className={styles["search-input-container"]}>
            <Input
              placeholder="搜索姓名"
              className={styles["search-input"]}
              prefix={<i className="iconfont iconfont-search">&#xe66e;</i>}
              suffix={suffix}
              value={searchKey}
              onChange={this.onChangeUserName}
              ref={node => this.userNameInput = node}
            />
          </div>
          <Relation {...relationProps} />
        </div>
        {uid ? <div className={styles["chatroom-wrap"]}>
          <Row className={styles["chatroom-container"]} gutter={24}>
            <Col className={styles["chatroom-module"]} span={16}>
              <div className="gutter-box">
                <div className="chartroom">
                  <Header {...headerProps} />
                  <Room {...roomProps} />
                  <Edit {...editProps} />
                </div>
              </div>
            </Col>
            <Col className={styles["chatroom-module"]} span={8} style={{paddingLeft: '4px'}}>
              <div className="gutter-box">
                <div id="js_buyerList" className="buyerList">
                  <Users {...usersProps} />
                  <Detail {...detailProps} />
                  {/* {farmList.length > 0 ? <FarmList {...farmListProps} /> : ''} */}
                  {/* <Divider style={{ borderTop: '1px solid #E4E6EA', margin: 0 }} />
                  <Divider style={{ borderTop: '1px solid #E4E6EA', margin: 0 }} />
                  <Remark {...remarkProps} /> */}
                </div>
              </div>
            </Col>
          </Row>
        </div> : ''}
     </div>
     </Spin>
    )
  }
}

const mapStateToProps = ({ contactGlobal, contact, loading }) => {
  return { contactGlobal, contact, loading };
};

const mapDispatchToProps = (dispatch) => {
  return {
    callbacks: {
      onmsg (msgs) {
        dispatch({ type: 'contactGlobal/onmsg', payload: msgs })
      },
      onsessions (sessions) {
        dispatch({ type: 'contactGlobal/onsessions', payload: sessions })
      },
      onupdatesession (sessions) {
        dispatch({ type: 'contactGlobal/onupdatesession', payload: sessions })
      },
      onconnect (data) {
        dispatch({ type: 'contactGlobal/onconnect', payload: data })
      },
      onwillreconnect (data) {
        dispatch({ type: 'contactGlobal/onwillreconnect', payload: data })
      },
      ondisconnect (data) {
        dispatch({ type: 'contactGlobal/ondisconnect', payload: data })
      },
      onsyncdone () {
        dispatch({ type: 'contactGlobal/onsyncdone' })
      },
      onMergeMsgs (data) {
        dispatch({ type: 'contact/mergeCurrentMsgs', paylaod: data })
      },
      onUpdatePendingMsg (data) {
        dispatch({ type: 'contact/updatePendingMsg', paylaod: data })
      }
    },
    globalActions: {
      createNim (callbacks) {
        dispatch({ type: 'contactGlobal/createNim', payload: callbacks });
      },
      onUpdateState (data) {
        dispatch({ type: 'contactGlobal/updateState', payload: data })
      },
    },
    actions: {
      onUpdateState (data) {
        dispatch({ type: 'contact/updateState', payload: data })
      },
      onChangeLocalMsgs () {
        dispatch({ type: 'contact/getCurrentMsgs' })
      },
      onFetchMoreData (data) {
        dispatch({ type: 'contact/getMoreMsgs', payload: data });
      },
      onSendMsg (data) {
        dispatch({ type: 'contact/sendMsg', payload: data })
      },
      fetchUserInfo() {
        dispatch({ type: 'contact/getPublishFarms' })
      },
      fetchPublishFarms() {
        dispatch({ type: 'contact/getPublishFarms' })
      },
      fetchSubscribes() {
        dispatch({ type: 'contact/getSubscribes' })
      },
      updateRemarkUser(data) {
        dispatch({ type: 'contact/updateRemarkUser', payload: data })
      },
      addRemarkUser(data) {
        console.log(data);
        dispatch({ type: 'contact/addRemarkUser', payload: { ...data } })
      },
      updateRemarkFarm(data) {
        dispatch({ type: 'contact/updateRemarkFarm', payload: data })
      },
      addRemarkFarm(data) {
        dispatch({ type: 'contact/addRemarkFarm', payload: data })
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact)