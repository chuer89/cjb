// import lodash from 'lodash';
import { Spin, Icon } from 'antd';
import { transTime } from 'utils';
import classnames from 'classnames';
import { source } from 'config'
import styles from './Relation.less';

const Relation = ({
  list, nimLoadFinish, selectedKey, searchKey = '',
  onChangeMenu, nimDisconnect,
}) => {
  const getLists = ({
    list, selectedKey,
    // chartListSelectedKey, chartSearchList, chartSearchValues,
  }) => {
    if(list.length) {
      return list.map((item) => {
        const isSelected = item.uid === selectedKey ? true : false;
        return (
          <div
            className={classnames(styles['chart-list-item'], { [styles['chart-item-selected']]: isSelected})}
            key={item.id}
            uid={item.uid}
            onClick={onChangeMenu.bind(this, item.uid, item.accType)}
            >
              <div className={styles.avator}>
                {item.avatar ?
                <img src={item.avatar} alt=""/>
                : <img src={source.sessionAvatar} alt=""/>
                }
              </div>
              <div className={styles['chart-content']}>
                <div className={styles.user}>
                  <div className={styles.name}>{item.isAuthAgent === 2 ? <i className="iconfont" style={{color: '#009E00'}}>&#xe6a0;</i> : ''}<span>{item.nick || '未知用户'}</span>{!!item.unread && <i className="red-tips" style={{marginLeft: '5px'}}>{item.unread}</i>}</div>
                  <div className={styles.time}>{transTime(item.updateTime)}</div>
                </div>
                <div className={styles.message}>{item.pushContent || item.msg || ''}</div>
              </div>
          </div>
        );
      });
    }
    return nimLoadFinish ? <div className={styles.noResult}>暂无联系人</div> : '';
  };

  // const searchObj = searchKey ? { nick: searchKey} : {};
  if (searchKey) {
    list = list.reduce((arr, item) => {
      if (item.nick.includes(searchKey)) {
        arr.push(item);
      }
      return arr;
    }, []);
  }
  let lists = getLists({
    list,
    selectedKey,
  });

  return (
    <div className={styles['lists']}>
      {<Spin spinning={!Boolean(nimLoadFinish)} tips="正在加载联系人" >
        <div className={styles['container']}>
          {nimDisconnect && <div className={styles['reconnect']}><Icon type="loading" style={{fontSize: '16px', fontWeight: 'bold'}} /><span>正在重新加载...</span></div>}
          {lists}
        </div>
      </Spin>}
    </div>
  );
};

export default Relation;