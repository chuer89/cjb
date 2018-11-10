import styles from './UpModal.less';
import PropTypes from 'prop-types';
import {Button, Icon} from 'antd';

const UpModal = (props) => {
  const {icon, message, onOk, onCancel} = props;
  return (
    <div className={styles.publishModal}>
      <div className={styles.publishModalContent}>
        {icon}
        <p>{message}</p>
        {onOk && <Button onClick={onOk}>确认</Button>}
        {onCancel && <Icon onClick={onCancel} className={styles.close} type="close" style={{fontSize: '18px'}} />}
      </div>

    </div>
  );
};
UpModal.propTypes = {
  icon: PropTypes.element,
  message: PropTypes.string,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};


export default UpModal;
