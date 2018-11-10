import {Card, Button, Tooltip} from 'antd';
import {ImageLazy} from 'components';
import styles from './Card.less';
import { request} from 'utils'
import {api} from 'config';
const {defaultImg} = api;


const MyCard = ({farmName, img, totalPrice, area, onPublish, onView, unitCode}) => {
  const imageLazyProps = {
    src: img,
    // defaultSrc: config.dashboard,
    style: {
      background: '#e3e3e3',
      height: '140px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    defaultSrc: defaultImg,
    defaultImgStyle: {width: '100px'},
  };

  return (
    <Card
      className={styles.card}
      cover={<ImageLazy {...imageLazyProps} />}
    >
      <Tooltip title={farmName}>
        <p title={farmName} className={styles.title}>{farmName}</p>
      </Tooltip>
      <p className={styles.price}>{`${unitCode} ${totalPrice || 0}`}</p>
      <div className={styles.grayGroup}>
        <div style={{visibility: area ? 'visible' : 'hidden'}} className={styles.grayGroupItem}>
          <i className="iconfont">&#xe658;</i>
          <span>{area}</span>
        </div>
      </div>
      <div className={styles.btnGroup}>
        <Button onClick={onPublish} type="primary">发布农场</Button>
        <Button onClick={onView}>原始数据</Button>
      </div>
    </Card>
  );
};

export default MyCard;
