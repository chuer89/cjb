import { Component } from 'react';
import styles from './styles.less';
import RemarkModal from './RemarkModal';

class RemarkList extends Component {
  state = {
    visible: false,
    selectedRemarkId: '',
  };

  addRemarkModal = () => {
    this.setState({
      visible: Symbol(''),
      selectedRemarkId: '',
    });
  };

  handleEditModal = (id) => {
    this.setState({
      visible: Symbol(''),
      selectedRemarkId: id,
    });
  };

  render () {
    const {
      title, remarkList = [], userInfo,
      titleReadOnly, defaultTitle
    } = this.props;

    const {
      visible,
      selectedRemarkId,
    } = this.state;

    const modalProps = {
      visible,
      selectedRemarkId,
      defaultTitle,
      titleReadOnly,
      ...this.props
    };

    return (
      <div className={styles.mark}>
        <RemarkModal {...modalProps} />
        <div className={styles.header}>
          <div className={styles.title}>{title}</div>
          {
            remarkList.length === 1 && titleReadOnly ?
            <div className={styles.action} onClick={this.handleEditModal.bind(this, remarkList[0].id)}>查看</div> :
            <div className={styles.action} onClick={this.addRemarkModal}>新增</div>
          }
        </div>
        <div className={styles.list}>
          <ul>
            { remarkList.length > 0 && remarkList.map(item => <li key={item.id} onClick={this.handleEditModal.bind(this, item.id)}>{titleReadOnly ? defaultTitle : item.title}</li>) }
          </ul>
        </div>
      </div>
    );
  }
};

export default RemarkList;